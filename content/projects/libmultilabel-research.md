---
title: LibMultiLabel Text Classification
order: 2
tags: Python | LibMultiLabel | Machine Learning | Recommender Systems | Research
---
Research on reducing memory usage in extreme multi-label text classification (XMC) models through tree-based label partitioning and weight matrix thresholding. The work investigated how different pruning strategies affect model performance, and why their effects differ across label frequency distributions.

## What Is Extreme Multi-Label Classification?

Multi-label classification is the problem of assigning one or more labels to a given input. A news article might belong to both "politics" and "economics." A medical record might carry dozens of ICD billing codes simultaneously. What makes a problem *extreme* is the scale of the label space — XMC benchmarks commonly have tens of thousands to hundreds of thousands of distinct labels.

This scale creates challenges that don't exist in ordinary classification. Models must be expressive enough to distinguish fine-grained labels, yet practical enough to train and serve efficiently. Memory, prediction speed, and label imbalance all become first-class concerns rather than afterthoughts.

## The Core Problem: Why XMC Models Get So Large

Standard multi-label classification relies on a **one-vs-rest (OVR)** strategy. The idea is straightforward: train one binary classifier per label, where each classifier learns to distinguish its label from all other labels. Given a new instance, run it through every classifier and collect the labels whose classifiers fire above a threshold.

OVR is effective. It treats each label independently, which means it can model a label's decision boundary without interference from other labels. For modest label spaces this is perfectly fine.

The problem is that OVR scales poorly. If there are 670,000 labels — as in the Amazoncat-670K dataset — the model needs 670,000 classifiers. Each classifier is a weight vector over the feature space, which in text classification can itself have hundreds of thousands of dimensions. The resulting weight matrix can require gigabytes of memory just to store, let alone load and evaluate at inference time. For production deployment, or even for research on commodity hardware, this is a serious obstacle.

## Tree-Based Approach

Tree-based methods apply a divide-and-conquer strategy to bring OVR back within reach. The core insight is that for any given input, the vast majority of labels are irrelevant — and a hierarchical structure can eliminate large portions of the label space early, before expensive classifiers ever run.

**Building the tree.** Before training classifiers, labels are partitioned into groups based on similarity. K-means clustering is applied to label vectors, grouping semantically related labels together into disjoint subsets. These subsets become the children of the root node. The same process is applied recursively at each node, splitting its label subset further until each leaf node contains a single label.

**Training classifiers.** Each internal node gets a classifier that learns to route an input toward the correct child node — effectively predicting which label cluster is most relevant. Each leaf node's classifier is a standard OVR binary classifier for its single label.

**Prediction.** At inference time, the model traverses the tree from root to leaf. At each node, the node's classifier scores all child branches and selects the most promising one. Entire subtrees of irrelevant labels are skipped without ever evaluating their classifiers. By the time prediction reaches a leaf, the search space has been narrowed from hundreds of thousands of labels down to one.

**Why this helps.** Consider a test instance that is only relevant to 4 out of 100 labels. Under flat OVR, all 100 classifiers run. Under a tree-based approach with good label grouping, the model might need to evaluate just 3–4 nodes across the entire traversal — corresponding to maybe 10–15 classifiers in total — to arrive at the correct labels. At scale with 670,000 labels, this reduction in active classifiers is what makes the approach computationally viable.

## Datasets

The research used four standard XMC benchmarks that span a wide range of label space sizes and data volumes, allowing experiments to test whether findings generalize or are specific to a particular scale.

| Dataset        | Classes   | Train     | Test    | Features |
|----------------|-----------|-----------|---------|----------|
| Eurlex         | 3,956     | 15,449    | 3,865   | 186,104  |
| Wiki10-31K     | 30,938    | 14,146    | 6,616   | 104,374  |
| Amazoncat-13K  | 159       | 7,395     | —       | 1,836    |
| Amazoncat-670K | 670,091   | 490,449   | 153,025 | 135,909  |

Eurlex contains legal documents from the EU labeled with subject matter codes. Wiki10-31K is drawn from Wikipedia articles annotated with tags. The Amazoncat datasets contain product descriptions labeled with category tags, with the 670K variant representing one of the largest publicly available XMC benchmarks.

## The Weight Matrix and Why It Still Needs Pruning

Even after switching to a tree-based approach, the model's weight matrices remain large. Each node in the tree holds a classifier, and those classifiers collectively span the full feature space. For high-dimensional text data, the combined weight storage across all tree nodes can still be substantial.

Thresholding is a post-training pruning technique that zeros out weights below a magnitude cutoff, converting dense weight matrices into sparse ones. Sparse matrices require far less memory and can be computed over more efficiently — which is particularly valuable at inference time when the model needs to be loaded repeatedly or deployed on constrained hardware.

The tradeoff is accuracy: removing weights means losing some predictive signal. The research focused on understanding how different thresholding strategies balance that tradeoff.

## Comparing Two Thresholding Strategies

Two strategies were evaluated for deciding which weights to remove:

**Global thresholding** sets a single magnitude cutoff across all weight matrices in the entire model. Any weight — from any label's classifier, at any level of the tree — that falls below the cutoff is zeroed out. The threshold value is chosen to achieve a target sparsity level for the model as a whole.

**Per-label thresholding** applies the cutoff independently within each label's classifier. Each label gets its own threshold chosen to achieve the target sparsity for that label specifically. This means every label loses the same *proportion* of its weights, regardless of those weights' absolute magnitudes.

Global thresholding consistently outperformed per-label thresholding across the benchmark datasets, which was a non-obvious result. The two strategies remove the same total number of weights — they differ only in *which* weights get removed.

## Why Global Thresholding Wins: The Tail-Label Hypothesis

The leading explanation centers on the **long-tail distribution** of XMC label frequencies. In every XMC benchmark, a small number of labels appear very frequently across training examples, while the vast majority of labels appear only a handful of times. This is an intrinsic property of these datasets, not an artifact of how they were collected.

Tail labels — those with very few training examples — produce classifiers with generally small weights. There is not enough signal in the training data to push weights to large magnitudes. Head labels, by contrast, have abundant training signal and tend to produce classifiers with larger, more confident weights.

This asymmetry is critical to understanding the thresholding results:

- **Global thresholding** sets a single cutoff across all labels. Because tail label weights are systematically smaller, global thresholding ends up removing a disproportionate share of weights from tail label classifiers. Head label classifiers — whose weights are larger — are largely unaffected.

- **Per-label thresholding** ignores this asymmetry. It removes a fixed proportion of weights from every label equally, including head labels. Pruning head label weights has an outsized negative effect on metrics because head labels dominate the evaluation data.

The result is that global thresholding inadvertently protects the weights that matter most for performance, while per-label thresholding treats all labels as equally important and ends up damaging the classifiers that carry the most predictive weight.

## Investigating the Hypothesis

To move from hypothesis to evidence, the investigation defined the following measurements:

**Non-zero weight count (nnz) per label.** Before and after thresholding, counting the number of remaining non-zero weights in each label's classifier provides a direct measure of how much each label was affected by pruning.

**Variance in nnz change across labels.** High variance in the per-label nnz difference would confirm that global thresholding removes weights unevenly — concentrating pruning on certain labels (the expected tail labels) while leaving others intact. Low variance would suggest pruning is spread uniformly, which would undermine the tail-label hypothesis.

**Nnz change for tail vs. non-tail labels.** Segmenting labels by training frequency and measuring the average nnz loss in each group provides a direct test of whether tail labels absorb more of the pruning under global thresholding. If the average nnz drop for tail labels significantly exceeds that of head labels, the hypothesis holds.

Together, these measurements form a diagnostic that can confirm whether the performance gap between global and per-label thresholding is structurally explained by label frequency, or whether another factor is at play.
