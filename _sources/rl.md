# Hands-On RL

This is a small segment of our course "Probability for ML and GenAI"

## The Environment - Gridworld

GridWorld is a simple 2D grid-based environment where an agent moves around trying to reach certain goal states while avoiding negative outcomes. Think of it like a board game where you're trying to reach treasure chests while avoiding traps, but the agent learns the optimal path through trial and error rather than being explicitly programmed.


### The Implementation

Here's a complete Python implementation of a GridWorld environment:

```python
class GridWorld:
    def __init__(self):
        self.grid_size = (5, 8) 
        self.terminal_rewards = {
            (0, 3): 3,
            (1, 5): 20,
            (4, 2): -10
        }
        self.actions = ["up", "down", "left", "right"]
        self.action_effects = {
            "up": (-1, 0),
            "down": (1, 0),
            "left": (0, -1),
            "right": (0, 1),
        }
        self.start_pos = (2, 0)
        self.current_pos = self.start_pos
    
    def reset(self):
        self.current_pos = self.start_pos
        return self.current_pos
    
    def is_valid_position(self, pos):
        row, col = pos
        return 0 <= row < self.grid_size[0] and 0 <= col < self.grid_size[1]
    
    def step(self, action):
        if action not in self.actions:
            raise ValueError(f"Invalid action: {action}")
        
        delta = self.action_effects[action]
        next_pos = (self.current_pos[0] + delta[0], self.current_pos[1] + delta[1])
        
        if not self.is_valid_position(next_pos):
            next_pos = self.current_pos
        
        self.current_pos = next_pos
        reward = self.terminal_rewards.get(self.current_pos, 0)
        done = self.current_pos in self.terminal_rewards
        
        return self.current_pos, reward, done
```

<a href="https://topmate.io/ajay_shenoy/1600761" style="background-color: #3498db; color: white; padding: 8px 15px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 14px;">Download full code</a>

Join the upcoming live cohort where we explain these concepts in great detail:

<div style="width: 100%; margin: 10px 0;">
  <a href="https://topmate.io/ajay_shenoy/1566632" style="background-color: #D13B56; color: white; padding: 10px; text-decoration: none; font-weight: bold; border-radius: 10px; display: block; text-align: center; font-size: 22px; font-family: sans-serif; width: 100%; box-sizing: border-box;">
    Enroll Now &nbsp;→
  </a>
</div>

### Example 

````{tab-set}
```{tab-item} Grid Structure
- The environment is a 5×8 grid (5 rows, 8 columns)
- States are represented as (row, column) coordinates.
- The agent starts at position (2, 0), which is the middle-left of the grid.
```
```{tab-item} Terminal State and Reward 
Three special positions act as terminal states where episodes end:
- **(0, 3)**: Small positive reward of +3
- **(1, 5)**: Large positive reward of +20 (the "treasure")
- **(4, 2)**: Negative reward of -10 (the "trap")
```

```{tab-item} Actions
The agent can perform four actions: up, down, left, and right. 
- **Up**: Move one row up (-1, 0)
- **Down**: Move one row down (+1, 0)
- **Left**: Move one column left (0, -1)
- **Right**: Move one column right (0, +1)
```

```{tab-item} Boundary Handling
If the agent tries to move outside the grid boundaries, it simply stays in its current position. This prevents the agent from "falling off" the world.
```
````

### How It Works

````{tab-set}
```{tab-item} Interface
The environment follows the standard reinforcement learning interface:

1. **Initialization**: Set up the grid, define terminal states, and place the agent at the starting position
2. **Reset**: Return the agent to the starting position for a new episode
3. **Step**: Execute an action, update the agent's position, calculate rewards, and determine if the episode is complete
```

```{tab-item} The step
Each call to `step()` returns three important pieces of information:
- **New Position**: Where the agent ended up after the action
- **Reward**: The immediate reward received (0 for most positions, positive/negative for terminal states)
- **Done**: Boolean indicating whether the episode has ended
```
````


## The Agent - Q-Learning
Now that we understand the GridWorld environment, let's explore how to create an intelligent agent that can learn to navigate it optimally. This agent uses Q-Learning, one of the most fundamental reinforcement learning algorithms, to discover the best actions to take in each state.

The agent builds what is called a Q-table, that is, a table that maps every state-action pair to an expected future reward.

### Agent Implementation

Here's a complete implementation of a Q-Learning agent designed to work with our GridWorld:

```python
class Agent:
    def __init__(self, env):
        self.grid_size = env.grid_size
        self.actions = env.actions
        self.learning_rate = 0.05  # α 
        self.discount_factor = 0.9  # γ 
        self.epsilon = 0.1  # ε 
        self.q_table = self.initialize_q_table()
    
    def initialize_q_table(self):
        q_table = {}
        for row in range(self.grid_size[0]):
            for col in range(self.grid_size[1]):
                q_vals = {action: 0.0 for action in self.actions}
                q_table[(row, col)] = q_vals
        return q_table
    
    def choose_action(self, state):
        if random.random() < self.epsilon:
            return random.choice(self.actions)
        return self.get_best_action(state)
    
    def get_best_action(self, state):
        q_values = self.q_table.get(state)
        best_action = random.choice(
            [action 
             for action, q_val in q_values.items() 
             if q_val == max(q_values.values())]
        )
        return best_action
    
    def update_q_table(self, state, action, reward, next_state):
        """
        Q(s,a) -> Q(s,a) + α [r + γ * max(Q(s',a')) - Q(s,a)]
        """
        current_q = self.q_table[state][action]
        next_q_values = self.q_table.get(next_state)
        max_next_q = max(next_q_values.values())
        new_q = current_q + self.learning_rate * (
            reward + self.discount_factor * max_next_q - current_q
        )
        self.q_table[state][action] = new_q
```

## Understanding the Key Components

````{tab-set}
```{tab-item} Hyperparameters

The agent uses three crucial hyperparameters that control how it learns:

**Learning Rate (α = 0.05)**: This determines how much the agent updates its Q-values with each new experience. A smaller value means the agent learns more conservatively, incorporating new information slowly. A larger value makes the agent adapt quickly but might cause instability.

**Discount Factor (γ = 0.9)**: This represents how much the agent values future rewards compared to immediate ones. A value of 0.9 means future rewards are worth 90% of their face value, encouraging the agent to consider long-term consequences rather than just immediate gains.

**Epsilon (ε = 0.1)**: This controls the exploration-exploitation trade-off. With ε = 0.1, the agent will explore (take random actions) 10% of the time and exploit (take the best known action) 90% of the time.

```
```{tab-item} Q-Table

The Q-table is the heart of the agent's knowledge. It's a comprehensive map that stores the expected future reward for taking each possible action in each possible state. Initially, all Q-values start at zero, representing the agent's complete ignorance about the environment.

For our 5×8 GridWorld with 4 actions, the Q-table contains 160 entries (40 states × 4 actions). Each entry represents the agent's current best estimate of how good it is to take a specific action from a specific position.

```
```{tab-item} Selecting Actions

The `choose_action` method implements an epsilon-greedy strategy, one of the most common approaches to the exploration-exploitation dilemma:

- **Exploration (ε of the time)**: The agent chooses a completely random action, potentially discovering new strategies or better paths
- **Exploitation (1-ε of the time)**: The agent chooses what it currently believes is the best action based on its Q-table

This balance is crucial because pure exploitation would cause the agent to get stuck in suboptimal strategies, while pure exploration would prevent it from using what it has learned.
```

```{tab-item} Learning

The `update_q_table` method implements the core Q-Learning update rule, often called the Bellman equation for Q-Learning:

$$Q(s,a) \leftarrow Q(s,a) + \alpha [r + \gamma \times \max_{a'}(Q(s',a')) - Q(s,a)]$$

This equation updates the Q-value based on:
- **Current Q-value**: What the agent currently thinks about this state-action pair
- **Immediate reward (r)**: What reward was actually received
- **Future potential (γ × max(Q(s',a')))**: The discounted maximum Q-value of the next state
- **Learning rate (α)**: How much to adjust based on this new experience

```

````



## How the Agent Learns

The learning process follows this cycle:

1. **Observe** the current state
2. **Choose** an action using epsilon-greedy strategy
3. **Execute** the action in the environment
4. **Receive** reward and observe the new state
5. **Update** the Q-table based on the experience
6. **Repeat** until the episode ends

Over many episodes, the Q-values converge to represent the true expected returns for each state-action pair, allowing the agent to make increasingly optimal decisions.

For a lot more insights, join our live cohort. 

<div style="width: 100%; margin: 10px 0;">
  <a href="https://topmate.io/ajay_shenoy/1566632" style="background-color: #D13B56; color: white; padding: 10px; text-decoration: none; font-weight: bold; border-radius: 10px; display: block; text-align: center; font-size: 22px; font-family: sans-serif; width: 100%; box-sizing: border-box;">
    Enroll Now &nbsp;→
  </a>
</div>

---
📅 **CALENDAR**
![Alt text description](/_static/probability_july_light_background.png)