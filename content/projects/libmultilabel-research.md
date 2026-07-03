---
title: Thresholding Study in Extreme Multi-Label Classification
order: 2
tags: Python | LibMultiLabel | Machine Learning | Recommender Systems | Research
---

An investigation into memory-performance tradeoffs in extreme multi-label classification (XMC), where label spaces reach hundreds of thousands of categories. We compare global and per-label weight matrix pruning strategies across four benchmark datasets, finding that global thresholding consistently preserves more predictive signal at equivalent sparsity levels.

## Introduction

Multi-label classification is the problem of learning a machine learning classifier where each input may be associated with any number of labels. When the label space reaches an extreme scale - tens of thousands to hundreds of thousands of distinct labels — the problem is known as extreme multi-label classification (XMC). At this scale, naive approaches become computationally intractable; purpose-built XMC methods address this through divide-and-conquer, recursively partitioning the label space into smaller subproblems. Linear models are the natural choice for each subproblem: they are simpler, faster, and easier to tune than neural networks, which require hardware acceleration even at moderate scale.

Linear XMC methods, however, face a memory bottleneck. Storing a weight vector for each of hundreds of thousands of labels produces matrices that can require several gigabytes, making deployment on commodity hardware impractical. A standard remedy is thresholding — zeroing out weights below a magnitude cutoff to produce sparse matrices. The effectiveness of this approach depends critically on how the threshold is chosen, and as this work demonstrates, the appropriate choice varies across datasets and labels. This study investigates the tradeoff between model performance and memory cost under different thresholding schemes, with the aim of understanding what makes a threshold choice principled.


## The Core Problem: Why XMC Models Get So Large

The standard approach to multi-label classification is the one-vs-rest (OVR) strategy, in which a separate binary classifier is trained for each label. Each classifier learns to distinguish its associated label from all others, and at inference time, a new instance is evaluated against every classifier in the set, with labels whose classifiers exceed a confidence threshold returned as predictions.

OVR has well-understood advantages: because each label's decision boundary is modeled independently, classifiers do not interfere with one another, and the approach is straightforward to implement and parallelize. For label spaces of modest size, these properties make OVR a natural and effective baseline.

The difficulty arises at extreme scale. A dataset such as Amazoncat-670K contains 670,091 distinct labels, requiring an equal number of classifiers. Since each classifier is represented as a weight vector over the input feature space — which in text classification may itself span hundreds of thousands of dimensions — the resulting weight matrix can require several gigabytes of storage, presenting a substantial obstacle to both research-scale experimentation on commodity hardware and practical deployment in memory-constrained environments.

## Tree-Based Approach

Tree-based methods reduce the time complexity of training and prediction by recursively partitioning the label space into progressively smaller subproblems. Rather than training a single classifier over all labels simultaneously, the method decomposes the problem into a hierarchy of smaller classification tasks, each of which is tractable on its own. The construction and training procedure described here follows the approach introduced in Bonsai ([Khandagale et al., 2020](https://arxiv.org/pdf/1904.08249)).

**Metalabels and tree structure.** The central abstraction is the *metalabel* — a grouping of labels into a single higher-level unit. A metalabel may contain either original labels or other metalabels, forming a recursive nesting. Given a label set $\mathcal{L} = \{1, \ldots, L\}$, any non-empty subset $m \subseteq \mathcal{L}$ constitutes a metalabel, and the collection of all metalabels at a given level of partitioning forms the children of a tree node. The full label space is organized as a tree where each internal node is a metalabel, leaf nodes correspond to individual labels, and the root encompasses $\mathcal{L}$ entirely. An instance $\mathbf{x}$ is said to be associated with metalabel $m$ if there exists some label $i \in m$ such that $\mathbf{x}$ is associated with $i$.

**Tree construction.** Let $\mathbf{X} \in \mathbb{R}^{N \times d}$ denote the training feature matrix and $\mathbf{Y} \in \{0,1\}^{N \times L}$ the binary label matrix. Each label $i$ is assigned an embedding vector by summing the feature vectors of all training instances associated with it, then normalizing to unit length:

$$v_i = \frac{(\mathbf{Y}^\top \mathbf{X})_i}{\|(\mathbf{Y}^\top \mathbf{X})_i\|_2}$$

Here $(\mathbf{Y}^\top \mathbf{X})_i \in \mathbb{R}^d$ is the $i$-th row of the $L \times d$ matrix $\mathbf{Y}^\top \mathbf{X}$, which accumulates the feature vectors of every instance carrying label $i$. Normalizing to the unit sphere means Euclidean distance between embeddings is equivalent to cosine dissimilarity, so labels that tend to appear in similar documents will be geometrically close and naturally cluster together.

Partitioning proceeds recursively. At each node containing a label subset $S$, $K$-means clustering is applied to $\{v_i\}_{i \in S}$, producing $K$ disjoint subsets $T_1, \ldots, T_K$. Each subset becomes a child node, and the same procedure is applied to each child in turn. Recursion terminates when either $|S| < K$ or the node depth exceeds a user-defined maximum, at which point the remaining labels are assigned directly as leaf nodes. The resulting tree has branching factor $K$ and depth at most $\log_K L$ for a balanced partition.

The structure for an eight-label set with $K = 3$ might look like the following, where internal nodes are metalabels and leaves are individual labels:

<figure style="text-align:center;margin:2rem 0">
<svg viewBox="0 0 560 265" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:520px;font-size:15px;font-family:inherit">
  <line x1="230" y1="36" x2="50" y2="108" stroke="currentColor" stroke-width="1"/>
  <line x1="230" y1="36" x2="230" y2="108" stroke="currentColor" stroke-width="1"/>
  <line x1="230" y1="36" x2="410" y2="108" stroke="currentColor" stroke-width="1"/>
  <line x1="410" y1="134" x2="320" y2="208" stroke="currentColor" stroke-width="1"/>
  <line x1="410" y1="134" x2="410" y2="208" stroke="currentColor" stroke-width="1"/>
  <line x1="410" y1="134" x2="500" y2="208" stroke="currentColor" stroke-width="1"/>
  <text x="230" y="32" text-anchor="middle" fill="currentColor">root</text>
  <text x="50" y="122" text-anchor="middle" font-weight="bold" fill="currentColor">9</text>
  <text x="50" y="141" text-anchor="middle" fill="currentColor">1, 2</text>
  <text x="230" y="122" text-anchor="middle" font-weight="bold" fill="currentColor">10</text>
  <text x="230" y="141" text-anchor="middle" fill="currentColor">3, 4</text>
  <text x="410" y="122" text-anchor="middle" font-weight="bold" fill="currentColor">11</text>
  <text x="320" y="222" text-anchor="middle" font-weight="bold" fill="currentColor">12</text>
  <text x="320" y="241" text-anchor="middle" fill="currentColor">5, 6</text>
  <text x="410" y="222" text-anchor="middle" font-weight="bold" fill="currentColor">13</text>
  <text x="410" y="241" text-anchor="middle" fill="currentColor">7</text>
  <text x="500" y="222" text-anchor="middle" font-weight="bold" fill="currentColor">14</text>
  <text x="500" y="241" text-anchor="middle" fill="currentColor">8</text>
</svg>
<figcaption style="font-size:0.875rem;margin-top:0.75rem;opacity:0.65">Figure 1: A possible tree with eight labels.</figcaption>
</figure>

**Classifier training.** Once the tree structure is fixed, a linear classifier is trained at each internal node. Given a node with children $\{C_1, \ldots, C_K\}$, the classifier is a $K$-class problem: for an input $\mathbf{x}$, it predicts which child $C_k$ contains the correct labels. Leaf node classifiers are standard one-vs-rest binary classifiers over individual labels. Because each node's classifier is trained independently, training across nodes at the same tree depth can be fully parallelized.

**Prediction via beam search.** Exhaustive traversal of the full tree at inference time would recover optimal labels but reintroduce the computational cost the tree was designed to avoid. Instead, prediction proceeds via beam search with width $b$: a set of $b$ candidate nodes is maintained at each level, the classifiers for all candidates are evaluated, and the top-$b$ scoring children — across all candidates — are carried forward. Denoting the score of a path through nodes $n_1, n_2, \ldots$ as the product of classifier confidences along that path, beam search approximates:

$$\hat{y} = \underset{i \in \mathcal{L}}{\arg\max} \prod_{n \in \text{path}(i)} s(n \mid \mathbf{x})$$

where $s(n \mid \mathbf{x})$ is the classifier score assigned to node $n$ given input $\mathbf{x}$. This greedy procedure does not guarantee globally optimal label selection, but in practice recovers high-quality predictions while evaluating only $O(b \cdot K \cdot \log_K L)$ classifiers — a substantial reduction from the $O(L)$ evaluations required by flat OVR.

## The Weight Matrix and Why It Still Needs Pruning

Even following the adoption of a tree-based architecture, the aggregate weight storage of the model remains substantial. Each internal and leaf node of the tree maintains its own classifier, and the collective weight matrices across all nodes span the full dimensionality of the input feature space. For high-dimensional text representations, this can still amount to considerable memory overhead.

Thresholding is a post-training pruning technique in which weights falling below a specified magnitude cutoff are zeroed out, converting weight matrices into further sparse representations. Sparse matrices admit more compact storage and can be operated on more efficiently during inference, making thresholding a natural complement to tree-based methods in resource-constrained settings. The tradeoff is a potential loss of predictive signal: weights that fall below the threshold may nonetheless encode meaningful discriminative information, and their removal can degrade model performance to a degree that depends on both the threshold value and the distribution of weight magnitudes.

## Comparing Two Thresholding Strategies

Two pruning strategies were evaluated and compared across the benchmark datasets.

**Global thresholding** applies a single magnitude cutoff uniformly across all weight matrices in the model. Any weight, regardless of which label's classifier it belongs to or where in the tree hierarchy that classifier resides, is zeroed out if its magnitude falls below the threshold. The cutoff value is selected to achieve a target aggregate sparsity level across the full model.

**Per-label thresholding** applies the cutoff independently within each label's classifier, with each label receiving a threshold calibrated to achieve the target sparsity for that label in isolation. Under this scheme, every label loses the same *proportion* of its weights, irrespective of the absolute magnitudes involved.

## Datasets

Experiments were conducted on four standard XMC benchmarks, selected to span a wide range of label space sizes and data volumes and thereby assess whether findings generalize across scales rather than being specific to a single regime.

| Dataset        | Classes   | Train     | Test    | Features |
|----------------|-----------|-----------|---------|----------|
| Eurlex         | 3,956     | 15,449    | 3,865   | 186,104  |
| Wiki10-31K     | 30,938    | 14,146    | 6,616   | 104,374  |
| Amazoncat-13K  | 159       | 7,395     | —       | 1,836    |
| Amazoncat-670K | 670,091   | 490,449   | 153,025 | 135,909  |

Eurlex consists of legal documents from the European Union annotated with subject matter codes. Wiki10-31K is derived from Wikipedia articles annotated with topical tags. The Amazoncat datasets contain product descriptions labeled with catalog categories, with the 670K variant representing one of the largest publicly available XMC benchmarks.



<!-- 
## Why Global Thresholding Wins: The Tail-Label Hypothesis

The most plausible explanation for this performance gap centers on the long-tail distribution that characterizes label frequencies in XMC datasets. In every benchmark examined, a small proportion of labels — head labels — appear frequently across training examples and thus receive abundant supervision signal. The majority of labels — tail labels — appear only a small number of times, leaving their classifiers with limited signal from which to learn.

This asymmetry has a direct consequence for the magnitude distribution of classifier weights. Head label classifiers, trained on many examples, tend to produce weights of larger absolute magnitude, reflecting higher classifier confidence. Tail label classifiers, trained on few examples, tend to produce weights of smaller magnitude, as the available signal is insufficient to drive weights to large values.

Global thresholding, by applying a uniform cutoff, inadvertently exploits this asymmetry. Because tail label weights are systematically smaller, a disproportionate share of the removed weights belongs to tail label classifiers, while head label classifiers — whose weights exceed the threshold — are largely preserved. Per-label thresholding, by contrast, removes a fixed proportion from every label's classifier regardless of magnitude, including from the head label classifiers whose weights carry the most predictive value. The performance cost of pruning these high-confidence weights accounts for the observed gap between the two strategies.

## Investigating the Hypothesis

To evaluate this explanation empirically, a set of diagnostic measurements was defined around the distribution of pruning effects across labels.

**Non-zero weight count (nnz) per label.** By measuring the number of remaining non-zero weights in each label's classifier before and after thresholding, it is possible to characterize directly how much pruning each label experienced and whether this varies systematically across the label population.

**Variance in nnz change across labels.** If global thresholding concentrates pruning on tail labels while leaving head labels relatively intact, the distribution of per-label nnz changes should exhibit high variance. A uniform distribution — low variance — would suggest that pruning is spread evenly across labels and would weaken the tail-label hypothesis as an explanation for the observed performance differences.

**Nnz change for tail vs. non-tail labels.** Segmenting labels by training frequency and comparing the average nnz loss across groups provides a direct test of the hypothesis. A significantly larger average nnz reduction for tail labels than for head labels under global thresholding would constitute evidence that the performance advantage of global thresholding is structurally linked to the long-tail distribution of label frequencies.

Together, these measurements constitute a diagnostic framework for determining whether the performance gap between the two thresholding strategies is explained by label frequency structure, or whether alternative explanations warrant further investigation. -->
