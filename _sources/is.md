# Importance Sampling
Imagine you run a taco restaurant chain and want to expand from Mysore to Bangalore. You've observed that customers in these cities have dramatically different preferences - Mysore customers love budget-friendly tacos, while Bangalore customers prefer premium nachos and quesadillas.
The challenge: how do you estimate potential revenue in Bangalore without actually operating there yet? You could build separate simulation models for each city, but what if you want to leverage your existing Mysore data to predict Bangalore performance? This is a classic problem in computational statistics where we need to estimate outcomes for one scenario using data from another.

Observation: Mysore people are 4 times more likely to order Taco, 2 times more likely to order Burrito than Bangalore people. 
Bangalore people are 2 times more likely to order Quesadilla, and 3 times more likely to order Nachos.

## Basic Monte Carlo Simulation

The foundation of this analysis lies in Monte Carlo simulation, a computational technique that uses random sampling to estimate numerical results. The `TacoSales` class begins by establishing the problem parameters in its initialization method.

```python
class TacoSales:
    def __init__(self):
        self.items = ["Taco", "Burrito", "Quesadilla", "Nachos"]
        self.prices = [80, 120, 180, 250]
        self.mysore_probs = [0.4, 0.3, 0.15, 0.15]
        self.bangalore_probs = [0.1, 0.15, 0.30, 0.45]
        self.importance_weights = self.get_importance_weights()
```
<a href="https://topmate.io/ajay_shenoy/1605804" style="background-color: #3498db; color: white; padding: 8px 15px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 14px;">Download full code</a>


The system models four menu items with distinct prices and probability distributions for two different markets: Mysore and Bangalore. Notice how customer preferences differ significantly between cities - Mysore customers favor cheaper items (40% probability for tacos), while Bangalore customers prefer premium options (45% probability for nachos).

The core simulation method implements a straightforward Monte Carlo approach:

```python
def simulate_sales(self, probs, n_samples=1000):
    sales = []
    for _ in range(n_samples):
        item_idx = np.random.choice(len(self.items), p=probs)
        sales.append(self.prices[item_idx])
    avg_sale = np.mean(sales)
    return avg_sale
```

This method estimates the expected revenue per sale by repeatedly sampling from the probability distribution. Mathematically, we're approximating:

$$E[X] = \sum_{i=1}^{n} x_i \cdot p_i$$

where $x_i$ represents the price of item $i$ and $p_i$ is its selection probability. The Monte Carlo estimate converges to this true expected value as the number of samples increases.

Join the upcoming live cohort where we explain these concepts in great detail:

<div style="width: 100%; margin: 10px 0;">
  <a href="https://topmate.io/ajay_shenoy/1566632" style="background-color: #D13B56; color: white; padding: 10px; text-decoration: none; font-weight: bold; border-radius: 10px; display: block; text-align: center; font-size: 22px; font-family: sans-serif; width: 100%; box-sizing: border-box;">
    Enroll Now &nbsp;→
  </a>
</div>

## Step 2: Importance Sampling Implementation

While direct simulation works well when we can easily sample from the target distribution, real-world scenarios often present challenges. What if we want to estimate Bangalore sales patterns but only have access to Mysore customer data? This is where importance sampling becomes invaluable.

The importance weights are calculated to bridge the gap between the two distributions:

```python
def get_importance_weights(self):
    return [
        b_prob / m_prob
        for b_prob, m_prob in zip(self.bangalore_probs, self.mysore_probs)
    ]
```

These weights represent the likelihood ratio between the target distribution (Bangalore) and the proposal distribution (Mysore). The weight for item $i$ is:

$$w_i = \frac{p_i^{(target)}}{p_i^{(proposal)}} = \frac{p_i^{(bangalore)}}{p_i^{(mysore)}}$$

The importance sampling estimator is implemented in the following method:

```python
def simulate_bangalore_from_mysore(self, n_samples=1000):
    weighted_sales = []
    for _ in range(n_samples):
        item_idx = np.random.choice(len(self.items), p=self.mysore_probs)
        weighted_sale = self.prices[item_idx] * self.importance_weights[item_idx]
        weighted_sales.append(weighted_sale)
    avg_weighted_sale = np.mean(weighted_sales)
    return avg_weighted_sale
```

This technique allows us to estimate the expected value under the Bangalore distribution while sampling from the Mysore distribution. The mathematical foundation is:

$$E_{target}[X] = E_{proposal}\left[X \cdot \frac{p_{target}(X)}{p_{proposal}(X)}\right]$$

By weighting each sample by its importance ratio, we correct for the bias introduced by sampling from the wrong distribution. This approach is particularly powerful when the target distribution is difficult to sample from directly, or when we want to reuse existing simulation infrastructure for multiple scenarios.

The comparison method validates this approach by running all three estimators and comparing their results, demonstrating how importance sampling can effectively bridge different market conditions using a single simulation framework.

Join the upcoming live cohort where we explain these concepts in great detail:

<div style="width: 100%; margin: 10px 0;">
  <a href="https://topmate.io/ajay_shenoy/1566632" style="background-color: #D13B56; color: white; padding: 10px; text-decoration: none; font-weight: bold; border-radius: 10px; display: block; text-align: center; font-size: 22px; font-family: sans-serif; width: 100%; box-sizing: border-box;">
    Enroll Now &nbsp;→
  </a>
</div>

---
📅 **CALENDAR**
![Alt text description](/_static/probability_july_light_background.png)