---
layout: post
title: "Activation Functions"
date: 2024-08-23
author: Ajay Shenoy
estimated_reading_time: 30
---

# Introduction to Activation Functions in Neural Networks

Activation functions are a crucial component of neural networks, playing a vital role in the learning process and the network's ability to model complex patterns. They introduce non-linearity into the network, allowing it to learn and perform more complex tasks.

## What are Activation Functions?

In simple terms, an activation function decides whether a neuron should be activated or not by calculating the weighted sum and further adding bias to it. Mathematically, if we denote the input as $x$, weights as $w$, and bias as $b$, the activation function $f$ is applied to the linear combination:

$$ y = f(wx + b) $$

## Why are they important?

1. **Non-linearity**: They help the network to make sense of complicated, non-linear relationships in the data.
2. **Gradient Propagation**: They allow backpropagation by providing derivable non-linear functions.
3. **Normalization**: Some activation functions help to normalize the output of each neuron.

## Common Activation Functions

1. **Sigmoid**: Maps input to a value between 0 and 1.
   $$ f(x) = \frac{1}{1 + e^{-x}} $$

2. **ReLU (Rectified Linear Unit)**: Returns 0 for negative values, and the input value for positive values.
   $$ f(x) = \max(0, x) $$

3. **Tanh**: Similar to sigmoid, but maps inputs to values between -1 and 1.
   $$ f(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}} $$

4. **Leaky ReLU**: A variant of ReLU that allows small negative values when the input is less than zero.
   $$ f(x) = \begin{cases} 
      x & \text{if}\ x > 0 \\
      \alpha x & \text{otherwise}
   \end{cases} $$
   where $\alpha$ is a small constant, typically 0.01.

## Derivatives of Activation Functions

The derivatives of activation functions are crucial for the backpropagation algorithm used in training neural networks:

1. **Sigmoid**: $f'(x) = f(x)(1 - f(x))$
2. **ReLU**: $f'(x) = \begin{cases} 1 & \text{if}\ x > 0 \\ 0 & \text{otherwise} \end{cases}$
3. **Tanh**: $f'(x) = 1 - f(x)^2$
4. **Leaky ReLU**: $f'(x) = \begin{cases} 1 & \text{if}\ x > 0 \\ \alpha & \text{otherwise} \end{cases}$

## Choosing the Right Activation Function

The choice of activation function depends on the specific requirements of your neural network and the problem you're trying to solve. Factors to consider include the type of layer, the nature of your data, and the specific task at hand.

Understanding activation functions and their mathematical properties is key to designing effective neural networks and interpreting their behavior. As you delve deeper into neural networks, you'll encounter more complex activation functions and learn how to use them effectively in different scenarios.