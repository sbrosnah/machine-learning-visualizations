# Maximum Likelihood Estimation (MLE)

### Main Idea

Maximum Likelihood Estimation (MLE) is a statisitical method that estimates the parameters of a model or distribution my maximizing the likelihood function. The 
likelihood function is a function of the parameters where the probability of observing some fixed data given those parameters is quantified.  

### Quick Review

<u>Parametric Family:</u> A collection of distributions that are characterized by a common mathematical form and set of parameters, but differ based on values of those
parameters. 

Examples of parametric families include:
- Normal (Gaussian): $f(x \mid \mu, \sigma^2)$
- Exponential: $f(x \mid \lambda)$
- Gamma: $f(x \mid k, \theta)$
- Bernoulli: $f(x \mid \theta)$

<u>Closed-Form Solution:</u> Can be written explicitly in terms of known functions and operations. 

<u>Numerical Method:</u> Computational technique used to approximate solutions. 

### Illustative Example - Biased Coin
Assume we have a biased coin whose probability of heads is unknown. We can define a bernoulli distribution with parameter $\theta$ that models the probability of heads.  
$$
P(X = x) =
\begin{cases} 
\theta & \text{if } x = H, \\
1 - \theta & \text{if } x = T.
\end{cases}
$$

Problem: 
- Given a set of independent observations $HHHHT$ (our set and known observations), estimate $\theta$
- where $X$ is a random variable and $\theta$ is our unknown variable

We want to find the probability of observing the data given a parameter $\theta$. It may seem obvious that $\theta$ should be 4/5. However, we would like a more principled and general mathematical approach to deal with more complex models (other parametric families). 

For example, which is more likely? $\theta = .9$ or $\theta = .1$?  

If $\theta = .1$, then $P(HHHHT \mid \theta) = \theta^4(1-\theta) = (.1)^4(.9) \approx .00009$

If $\theta = .9$, then $P(HHHHT \mid \theta) = (.9)^4(.1) > .00009$

We can do this for every value $\theta \in [0, 1]$ and find the $\theta$ that maximizes $P(HHHHT \mid \theta)$. This is the maximum likelihood estimate.

$$
\hat{\theta} = \argmax_{\theta} \mathcal{L}(\theta) = \argmax_{\theta} = P(HHHHT \mid \theta) = \theta^4(1-\theta) 
$$

### Formal Definition

Parameter estimation by MLE solves problems where 
- Given a set of observations $\{x_i\}_{i=1}^n$
- where each observation is idependent and identically distributed (i.i.d.) following an unknown distribution $\mathbb{P}^*$ from a 
  </br><u>parametric family of distriputions</u>: $\{\mathbb{P}(\cdot \mid \theta) : \theta \in \Theta
\}$
- And you want to estemate the parameter $\theta$

The likelihood function is defined as:
$$
\mathcal{L}(\theta) = \mathbb{P}(x_1, \dots, x_n \mid \theta) = \prod_{i=1}^n \mathbb{P}(x_i \mid \theta)
$$

Recall that the probabilities are multiplied together because the samples are i.i.d.

Now that we have a likelihood function, we can reduce our parameter estimation problem to an optimization problem:
$$
\hat{\theta} = \argmax_{\theta} \mathcal{L}(\theta)
$$

As our dataset grows, the product of conditional probabilities becomes very small. To avoid the computational complexity associated with such small numbers, we can work with the log-likelihood instead. This works because the maximum of both functions occurs in the same location. 

Log-likelihood is defined as:
$$
\ell(\theta) = \log(\mathcal{L}(\theta)) = \log(\prod_{i=1}^n \mathbb{P}(x_i \mid \theta)) = \sum_{i=1}^n \log(\mathbb{P}(x_i \mid \theta))
$$

Thus, our new optimization function becomes:
$$
\hat{\theta} = \argmax_{\theta} \ell(\theta) = \argmax_{\theta} \sum_{i=1}^n \log(\mathbb{P}(x_i \mid \theta))
$$

Note: The likelihood and log-likelihood functions have the same maximum because both the log and linear functions monotonically increase, but the log function grows logarithmically slower rate than a regular linear function. Because of this slower rate of growth, maximizing the log is not only easier to compute because of the summation, but far more stable as the number of samples increases (see for yourself in the interactive visualization below).

There are cases where we can find a closed-form solution to the optimization problem, but in most cases, we must use a numerical method to find the maximum.  

### Biased Coin Continued...

So, going back to our biased coin example, we can find the maximum of the log-likelihood function: 

$$
\hat{\theta} = \argmax_{\theta} \ell(\theta) = \argmax_{\theta} \log(\mathcal{L}(\theta)) = \argmax_{\theta} \log(P(HHHHT \mid \theta)) 
= \argmax_{\theta} \log(\theta^4(1-\theta) )
= \argmax_{\theta} [4\log(\theta) + \log(1-\theta)]
$$

We then find where the gradient is 0:

$$
\nabla \ell(\theta) = \frac{4}{\theta} - \frac{1}{1-\theta} = 0  \\
\implies \hat{\theta} = \frac{4}{5}
$$

%%%

### How to Use the Visualization

1. **Adjust $\theta^*$ (the true parameter)**: Use the slider to change the parameter.
2. **Generate Samples**: Click the button to simulate coin flips.
3. **Observe Likelihood and Log-Likelihood**: Watch how plots change as you adjust the parameters and generate more samples.
4. **Observe the estimated parameter at the top ($\hat{\theta}$)**: This is the x value where the max log-likelihood and max likelihood values occur.

**Things to Note**

- The scale on the y-axis of the likelihood plot gets extremely small as the number of samples increases. 
- The likelihood plot moves around a lot more than the log-likelihood plot.
- The maximum occurs at the same place in both plots leading to the same parameter estimate.



<!-- %%%

### How to Use the Visualization

1. **Adjust the Mean**: Use the first slider to move the center of the distribution
2. **Change Standard Deviation**: The second slider controls the spread of the distribution
3. **Generate New Samples**: Click the button to create a new random sample
4. **Observe Log-Likelihood**: Watch how the log-likelihood value changes as you adjust parameters -->
