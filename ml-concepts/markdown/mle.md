## Theory

MLE works by finding the parameters that make the observed data most probable.
For a given set of observations and a statistical model, the MLE gives us the
parameters that maximize the likelihood function.

### Key Concepts

1. **Likelihood Function**: Measures how well a statistical model fits the observed data
2. **Parameter Estimation**: Process of finding the best parameters for our model
3. **Optimization**: Usually involves maximizing the log-likelihood function

### Mathematical Foundation

The likelihood function $L(\theta; x)$ represents the probability of observing the data x given the parameters θ. For a normal distribution, we have two parameters to estimate:

- μ (mean)
- σ (standard deviation)

The log-likelihood function for n independent observations from a normal distribution is:

$$
\ln L(\mu, \sigma; x) = -\frac{n}{2}\ln(2\pi) - \frac{n}{2}\ln(\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^n (x_i - \mu)^2
$$

### How to Use the Visualization

1. **Adjust the Mean**: Use the first slider to move the center of the distribution
2. **Change Standard Deviation**: The second slider controls the spread of the distribution
3. **Generate New Samples**: Click the button to create a new random sample
4. **Observe Log-Likelihood**: Watch how the log-likelihood value changes as you adjust parameters