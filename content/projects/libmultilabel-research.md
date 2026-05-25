---
title: LibMultiLabel Text Classification
order: 3
tags: Python | Machine Learning | Research
---
Research on improving memory usage in extreme multi-label text classification models, with a focus on tree-based methods and thresholding strategies.

## Project Overview

This research examined methodologies for improving the memory usage of extreme multi-label text classification models. The work focused on understanding why these models become so large, how tree-based approaches reduce computational cost, and how thresholding weight matrices can improve efficiency.

## Why XMC Is Hard

Extreme multi-label classification creates a classifier for each label in very large label spaces. In a one-vs-rest setup, that means memory consumption can become extremely large because the number of classifiers scales directly with the number of labels.

## Tree-Based Approach

Tree-based methods reduce the cost of one-vs-rest classification by partitioning the label space into smaller subsets. Instead of evaluating every label independently, the model traverses a hierarchy of label groups, which makes prediction more efficient for large label sets.

## Datasets Used

| Dataset          | Classes   | Training Examples | Test Examples | Features |
|------------------|-----------|-------------------|---------------|----------|
| Eurlex           | 3,956     | 15,449            | 3,865         | 186,104  |
| Wiki10-31K       | 30,938    | 14,146            | 6,616         | 104,374  |
| Amazoncat-13K    | 159       | 7,395             | N/A           | 1,836    |
| Amazoncat-670K   | 670,091   | 490,449           | 153,025       | 135,909  |

## Thresholding Investigation

The research compared global thresholding and per-label thresholding for pruning weights in tree XMC models. One working hypothesis was that global thresholding removes many very small weights that often correspond to tail labels, while per-label thresholding may remove weights from more frequent labels and create a larger drop in model performance.

## Questions Explored

- How does thresholding affect the number of non-zero weights per label?
- Do tail labels suffer more from pruning than non-tail labels?
- Why does global thresholding appear to perform slightly better than per-label thresholding?
