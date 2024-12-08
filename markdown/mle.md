# Maximum Likelihood Estimation (MLE)

%%%

#### How to Use the Visualization

1. **Adjust $\theta^*$ (the true parameter)**: Use the slider to change the parameter.
2. **Generate Samples**: Click the button to simulate coin flips.
3. **Observe Likelihood and Log-Likelihood**: Watch how plots change as you adjust the parameters and generate more samples.
4. **Observe the estimated parameter at the top ($\hat{\theta}$)**: This is the x value where the max log-likelihood and max likelihood values occur.

**Things to Note**

- The scale on the y-axis of the likelihood plot gets extremely small as the number of samples increases. 
- The likelihood plot moves around a lot more than the log-likelihood plot.
- The maximum occurs at the same place in both plots leading to the same parameter estimate.

## Theory

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
\nabla \ell(\theta) = \frac{4}{\theta} - \frac{1}{1-\theta} = 0
$$
$$
\implies \hat{\theta} = \frac{4}{5}
$$

#### Log-Odds

Using MLE to estimate the parameters for problems with closed-form solutions like this works fine, but we can loosen the constraints of our optimization problem by estimating something called the log-odds instead. 

First, why is estimating the log-odds useful? 
- **Unconstrained Optimization**: Estimating the log-odds is advantagous because we aren't confined to the range $[0, 1]$. $\theta$ is because it's a probability. 
- **Improved Numerical Stability**: This is particularly useful when $\theta$ approaches 0 or 1 because the log of probabilites parameterized by $\theta$ can be undefined depending on the distribution. For example, if $\theta$ is 0 or 1 in a Bernoulli distribution (like in the biased coin example), the log-likelihood is undefined.  

I will show you how to do this for the biased coin problem (or any Bernoulli distribution for that matter) but keep in mind that this can be applied to more complicated distributions.

Given $\{x_i\}_{i=1}^n$ where $x_i \in \{0, 1\}$, i.i.d. samples drawn from a Bernoulli distribution:

$$
P(X = x) =
\begin{cases} 
\frac{\exp(w)}{1 + \exp(w)} \triangleq \theta
& \text{if } x = 1, \\
\frac{1}{1 + \exp(w)} \triangleq 1 - \theta
& \text{if } x = 0.
\end{cases}
$$

We can actually re-write this using a single equation which makes optimization even easier. 

$$
P(X = x) = \frac{\exp(wx)}{1 + \exp(w)}
$$

We are mapping some equation using a set of weights $w$ (our log-odds) to the same range as $\theta$ and assume they are equal. As mentioned earlier, this is a nice trick (used in a lot of proofs) because we don't need to worry about the constraint $\theta \in [0, 1]$.  

Notice that if x = 1, the equation is $P(X = 1) = \frac{\exp(w)}{1 + \exp(w)}$ and if x = 0, it is $P(X = 0) = \frac{1}{1 + \exp(w)}$. These are the same equations used in our distribution definition earlier. 

%%%

Also notice that this is a valid probability distribution because both $P(X=1)$ and $P(X=0)$ will sum to 1 and are always positive. 

Now, let's try to estimate $w$. 

$$
\ell(\theta) = \sum_{i=1}^n \log(P(x_i \mid \theta)) 
$$
$$
= \sum_{i=1}^n \left[ x_i w - \log\left(1 + \exp(w)\right) \right]
= \left( \sum_{i=1}^n x_i \right) w - n \log\left(1 + \exp(w)\right)
$$
$$
= n \left( \bar{x}w - \log\left(1 + \exp(w)\right) \right)
$$

Where $\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$

Now that we have the log-likelihood function, we calculate the gradient, set it to 0, and then solve for $\hat{w}$. 

$$
\nabla \ell(\hat{w}) = n \left( \bar{x}\hat{w} - \log\left(1 + \exp(\hat{w})\right) \right) = 0 
$$
$$
\implies \hat{w} = \log\left(\frac{\bar{x}}{1 - \bar{x}}\right)
$$

We can then use $\hat{w}$ to solve for $\hat{\theta}$ using the distribution definition from earlier.

$$
\hat{\theta} = \frac{\exp(\hat{w})}{1 + \exp(\hat{w})}
$$


### Example - MLE for a Gaussian Distribution

Given $ \{x_i\}_{i=1}^n $, i.i.d. draws from a Gaussian distribution:

$$
N(\mu, \sigma^2)
$$

The probability density function (PDF) is:

$$
P(x|\theta) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

Where $ \theta = (\mu, \sigma) $:
- $ \mu $: Mean
- $ \sigma^2 $: Variance

**PDF Properties**
- The exponent is scaled by $ -\frac{1}{2\sigma^2} $, to give us a positive constant factor.
- $ \frac{1}{\sqrt{2\pi}\sigma} $ is a normalization factor ensuring the integration over the PDF equals 1:
  $$
  \int P(x|\theta) dx = 1
  $$

%%%

We estimate $\mu$ and $\sigma$ jointly by finding $\hat{\mu}$ first and then using $\hat{\mu}$ to calculate $\hat{\sigma}$.  

$$
\ell(\theta) = \sum_{i=1}^n \log p(x_i | \theta) 
= \sum_{i=1}^n \left( \log\left(\frac{1}{(2\pi)^{1/2} \sigma}\right) - \frac{1}{2\sigma^2}(x_i - \mu)^2 \right)
$$

$$
= \boxed{-n \log(2\pi) - n \log \sigma - \frac{1}{2\sigma^2} \sum_{i=1}^n (x_i - \mu)^2}
$$

The only part of this equation that is dependent on $\mu$ is the last part. Because of this, if we find the $\hat{\mu}$ that minimizes this term, that will be the $\hat{\mu}$ that maximizes the log-likelihood. 

$$
\hat{\mu} = \underset{\mu}{\arg\min} \sum_{i=1}^n (x_i - \mu)^2
$$

To find the optimal $\hat{\mu}$, we calculate the gradient, set it to 0, and then solve for $\hat{\mu}$.

### Example - MLE in Regression

We are given $\{x_i, y_i\}_{i=1}^n$ i.i.d samples drawn from a Gaussian 

$$
P(y|x;\theta,\sigma)\sim\mathcal{N}(f(x; \theta), \sigma^2)
$$
Where $f$ is some function that estimates the mean and is parameterized by $\theta$.

Now, we must estimate $\theta$ and $\sigma$

#### Why does it make sense to model the regression task this way? 
//todo: insert pic here


We solve this by maximizing the conditional likelihood $P(y|x;\theta,\sigma^2)$ instead of the marginal likelihood.

$$
\ell(\theta, \sigma) = \sum_{i=1}^nlog(P(y_i|x_i;\theta,\sigma))
$$
$$
= \sum_{i=1}^n\left[-\frac{1}{2}log(2\pi)-log(\sigma^2)-\frac{1}{2\sigma^2}(y_i-f(x_i,\theta))^2\right] 
$$
$$
= -\frac{n}{2}log(2\pi)-n\log(\sigma^2)-\frac{n}{2\sigma^2}\sum_{i=1}^n(y_i-f(x_i,\theta))^2
$$

If we want the maximize the the likelihood function above with respect to $\theta$, notice that the only term in the summation that is dependent on $\theta$ is the last. Also, notice that the last term is negated, so if we want to maximize the log-likelihood, we should minimize this term. This means our optimization for $\theta$ reduces to:

$$
\argmax_{\theta}\ell(\theta, \sigma) \rightarrow \hat{\theta} = \argmin_{\theta}\sum_{i=1}^n(y_i-f(x_i,\theta))^2
$$

This is the Mean Squared Error (MSE). This is another explanation for why MSE is used for coefficient estimation in regression tasks.

To estimate $\sigma$, we just need to observe the terms in the log-likelihood that depend on $\sigma$ and use those in a simplified optimization function. The second and third terms depend on $\sigma$ and are negated so our optimization function becomes (We will find the optimal $\sigma^2$ for simplicity's sake: 

$$
\argmax_{\sigma^2}\ell(\hat{\theta}, \sigma) \rightarrow \hat{\sigma}^2=\argmin_{\sigma^2}\left[n\log(\sigma^2)+\frac{n}{2\sigma^2}\sum_{i=1}^n(y_i-f(x_i,\hat{\theta}))^2\right] 
$$
$$
= \frac{1}{n}\sum_{i=1}^n\left(y_i - f(x_i, \hat{\theta})\right)^2
$$
This is the average square loss. 

Just like we can use MLE in regression to predict continuous labels, we can also use MLE for classification via logistic regression. 

### Example - MLE For Logistic Regression

We are given $\{x_i, y_i\}_{i=1}^n$ where $y_i \in \{0, 1\}, s.t.$
$$
P(y|x;\theta) = \frac{\exp(yf(x,\theta))}{1 + \exp(f(x,\theta))}
$$

Estimate $\theta$.
$$
P(y=0|x;\theta) = \frac{1}{1 + \exp(f(x,\theta))}
$$

$$
P(y=1|x;\theta) = \frac{\exp(f(x,\theta))}{1 + \exp(f(x,\theta))}
$$

$$
\ell(\theta)=\sum_{i=1}^nlogP(y_i|x_i, \theta)=\sum_{i=1}^n\left[y_if(x_i, \theta)-\log(1+\exp(f(x_i, \theta)))\right]
$$

It is impossible to come up with a closed form solution for this, so we need to resort to numerical methods like gradient descent. 

### Evaluation Metrics and MLE
The Maximum Likelihood Estimator is a random variable as a function of the random data as noted below.
$$
\hat{\theta}=\hat{\theta}(x_1, x_2,\ldots,x_n)
$$
Where the samples are identically and independently distributed from the true distribution
$$
\{x_i\} \sim \rho(\cdot \mid \theta^*)
$$

Essentially, from an unknown parameter, observations are generated. Then, from those observations, the estimator is generated. 

$$
\theta^* \rightarrow \{x_i\}_{i=1}^2 \rightarrow \hat{\theta}
$$

Because $\hat{\theta}$ is a RV, we can try to understand its statistical behavior, which relates to the analysis of evaluation metrics like bias, variance, and mean squared error (MSE). 

<u>Bias</u>: Difference of expectation of MLE and the true parameter

$$
Bias(\hat{\theta}) = \mathbb{E}\left[\hat{\theta}(x_1, x_2,\ldots,x_n)\right] - \theta^* = \int_{-\infty}^\infty \hat{\theta}(x_1, x_2,\ldots,x_n)\prod_{i=1}^nP(x_i \mid \theta^*) \, dx - \theta^*
$$

If you don't understand the above equation, recall the definition of expectation: 

$$
\mathbb{E}[g(x)] = \int_{-\infty}^{\infty} g(x) f_x(x) \, dx
$$
Where 
- $g(x)$ is a function of R.V. $X$. In our case this is $\hat{\theta}(x_1, x_2,\ldots,x_n)$
- $f_x(x)$ is the PDF of the R.V. $X$.

In simple cases, we have solutions for the bias, but we don't for more complicated ones. 

<u>Variance</u>: The expected distance squared of the estimator from it's expected value. i.e. It measures the spread of the estimator $\hat{\theta}$ around its expected value. 
 - It helps to quantify how much $\hat{\theta}$ varies across different samples of data. 
$$
Var(\hat{\theta}) = \mathbb{E}_{\theta^*}\left[(\hat{\theta}(x_1, x_2,\ldots,x_n) - \mathbb{E}_{\theta^*}\left[\hat{\theta}(x_1, x_2,\ldots,x_n)\right])^2\right]
$$
Which means
$$
Var(\text{R.V.}) = \text{Expectation}\left[\text{R.V.} - \text{Expectation of R.V}\right]
$$

Bias vs. Variance:
- Bias measures the difference between the mean and the true parameter.
- Variance measures the fluctuation around the mean.
- We want both to be small. 

//TODO: Add images here

<u>Mean Squared Error (MSE)</u>: the expected distance squared of the estimator from its true value. 
- This is almost the same as variance. The only difference is that the expectation of the estimator $\hat{\theta}$ is replaced with the true parameter $\theta^*$.
- The MSE measures both the bias and the variance. Because we want both the bias and the variance to be small, we also want the MSE to be small. 

MSE Equation:
$$
\text{MSE}(\hat{\theta}) = \mathbb{E}_{\theta^*} \left[ \left( \hat{\theta}(X_1, \ldots, X_n) - \theta^* \right)^2 \right]
$$
Bias-Variance Decomposition of MSE:
$$
\text{MSE}(\hat{\theta}) = \left(\text{Bias}(\hat{\theta})\right)^2 + \text{Var}(\hat{\theta})
$$
Proof of Bias-Variance Decomposition:
1. Start with the simplified definition of MSE
$$
\text{MSE}(\hat{\theta}) = \mathbb{E}\left[ \left( \hat{\theta} - \theta^* \right)^2 \right]
$$
1. Subtract and add the expectation of the parameter (The same as adding 0).
$$
\mathbb{E}\left[ \left( \left(\hat{\theta} - \mathbb{E}(\hat{\theta})\right) + \left(\mathbb{E}(\hat{\theta}) - \theta^* \right) \right)^2 \right]
$$
1. Expand the polynomial and distribute the expectation.
$$
\mathbb{E}\left[ \left( \hat{\theta} - \mathbb{E}(\hat{\theta}) \right)^2 + \left( \mathbb{E}(\hat{\theta}) - \theta^* \right)^2 + 2 \left( \hat{\theta} - \mathbb{E}(\hat{\theta}) \right) \left( \mathbb{E}(\hat{\theta}) - \theta^* \right) \right]
$$
$$
=\mathbb{E}\left[ \left( \hat{\theta} - \mathbb{E}(\hat{\theta}) \right)^2\right] + \mathbb{E}\left[\left( \mathbb{E}(\hat{\theta}) - \theta^* \right)^2\right] + \mathbb{E}\left[2 \left( \hat{\theta} - \mathbb{E}(\hat{\theta}) \right) \left( \mathbb{E}(\hat{\theta}) - \theta^* \right) \right]
$$
- Notice that the first term is our the $\text{Var}(\hat{\theta})$ and the second term inside the expectation is $\text{Bias}(\hat{\theta})^2$. We can move the $\text{Bias}(\hat{\theta})^2$ outside of the expectation because it is a constant (It doesn't directly depend on $\hat{\theta}$).

Thus, we can change our equation to
$$
=\text{Var}(\hat{\theta}) +\text{Bias}(\hat{\theta})^2 + \mathbb{E}\left[2 \left( \hat{\theta} - \mathbb{E}(\hat{\theta}) \right) \left( \mathbb{E}(\hat{\theta}) - \theta^* \right) \right]
$$

4. The last thing we need to do is simplify the final term
$$
\mathbb{E}\left[2 \left( \hat{\theta} - \mathbb{E}(\hat{\theta}) \right) \left( \mathbb{E}(\hat{\theta}) - \theta^* \right) \right]
$$
- Note that the second term inside the expectation is the same constant discussed earlier, so we move it out of the expectation with other constants. 
$$
2\mathbb{E}\left[\left( \hat{\theta} - \mathbb{E}(\hat{\theta}) \right) \right]\left( \mathbb{E}(\hat{\theta}) - \theta^* \right)
$$
- The expectation can be distributed. The expectation of the expectation is just the expectation. 
$$
2\left( \mathbb{E}(\hat{\theta}) - \mathbb{E}(\hat{\theta}) \right)\left( \mathbb{E}(\hat{\theta}) - \theta^* \right)
$$
$$
=2 \cdot 0 \cdot \left( \mathbb{E}(\hat{\theta}) - \theta^* \right) = \boxed{0}
$$

Thus, 

$$
\text{MSE}(\hat{\theta}) = \text{Bias}(\hat{\theta})^2 + \text{Var}(\hat{\theta})
$$

And this is where the Bias-variance trade-off comes from. If the MSE is a constant and the bias goes up, the variance comes down and vis versa. 
We can find the best bias/variance tradoff point by minimizing MSE. 

If $\text{Bias}(\hat{\theta}) = 0$ we call our estimator $\hat{\theta}$ "unbiased".  
If $\text{MSE}(\hat{\theta}) \rightarrow 0 \text{ as } n \rightarrow \infty$ we call our estimator $\hat{\theta}$ "consistent".
If $\text{Bias}(\hat{\theta}) \rightarrow 0 \text{ as } n \rightarrow \infty$ our estimator $\hat{\theta}$ has an "asymtotic bias".  

**Relations**:
- unbiased $\not\leftrightarrow$ consistent 
- consistent $\rightarrow$ asymtotic bias
- unbiased $\rightarrow$ asymtotic bias

#### Example - Calculating MLE Evaluation Metrics For a Gaussian
For $\{x_i\}_{i=1}^n \sim \mathcal{N}(\mu, \sigma^2)$, MLE is 
$$
\hat{\mu} = \frac{1}{n}\sum_{i=1}^nx_i, \quad \hat{\sigma^2}=\frac{1}{n}\sum_{i=1}^n(x_i-\hat{\mu})^2
$$

$$
\text{Bias}(\hat{\mu}) 
= \mathbb{E}[\hat{\mu}] - \mu 
= \mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n x_i\right] - \mu 
= \frac{1}{n}\sum_{i=1}^n \mathbb{E}[x_i] - \mu 
= \mu - \mu 
= 0.
$$

$$
\text{Var}(\hat{\mu}) 
= \mathbb{E}\bigl[(\hat{\mu} - \mu)^2\bigr]
= \mathbb{E}\left[\left(\frac{1}{n}\sum_{i=1}^n x_i - \mu\right)^2\right]
= \mathbb{E}\left[\frac{1}{n^2}\left(\sum_{i=1}^n (x_i - \mu)\right)^2\right]
$$
$$
= \mathbb{E}\left[\frac{1}{n^2}\left(\sum_{i=1}^n 
(x_i - \mu)^2+ \sum_{\substack{i,j=1 \\ i \neq j}}^n (x_i - \mu)(x_j - \mu)\right)\right] 
$$
$$
= \frac{1}{n^2} \sum_{i=1}^n \mathbb{E}[(x_i - \mu)^2]
\;+\; \frac{1}{n^2} \sum_{\substack{i,j=1 \\ i \neq j}}^n \mathbb{E}[(x_i - \mu)(x_j - \mu)].
$$

Notice that the first term contains the variance inside the summation. 
The second summation is the producct of two independent events ($x_i$ and $x_j$ where the covariance = 0), so it will be 0. 
$$
\mathbb{E}\left[(x_i - \mu)(x_j - \mu)\right]  = 0
$$

We can sumplify the equation above further
$$
= \frac{1}{n^2} \sum_{i=1}^n \mathbb{E}[(x_i - \mu)^2] + 0
$$
$$
= \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}
$$

As $n \rightarrow \infty$, $\text{MSE}(\hat{\mu}) \rightarrow 0 \implies$ consistent
$\text{Bias}(\hat{\mu})=0 \implies$ unbiased

Now let's quickly analyze $\hat{\sigma}^2$
$$\mathbb{E}[\hat{\sigma}^2] \neq \hat{\sigma}^2$$ so our estimator is <u>biased</u>. 
However, it is asymtotically unbiased because $\text{Bias}(\hat{\sigma}^2) \rightarrow 0, \quad n \rightarrow \infty$.
$\text{Var}(\hat{\sigma}^2) \rightarrow 0, \quad n \rightarrow \infty$, and 
$\text{MSE}(\hat{\sigma}^2) \rightarrow 0, \quad n \rightarrow \infty$, so it is consistent. 

**Side Note**:
It is possible to have find an unbiased estimator for $\hat{\sigma}^2$. Consider the following alternative estimator $\hat{\text{S}}^2$. It is a sample statistic in place of the population parameter that incorporates Bessel's correction ($n - 1$ instead of $n$) to 
compensate for the fact that $\hat{\mu}$ is an estimate from the sample and not the true mean. Without it, the sample variance would systematically underestimate the true variance:
$$
\hat{\text{S}}^2 = \left(\frac{1}{n-1}\right) \sum_{i=1}^{n} (x_i - \hat{\mu})^2 \implies \mathbb{E}[\hat{S}^2] = \sigma^2
$$
Which is <u>unbiased</u>.

#### Consistent Consistency in MLE
One thing to note is that Maximum Likelihood Estimation is almost always consistent. Why? 

The short answer is that the distribution of the observations becomes more and more similar to population distribution. 
However, we can give a more rigorous proof be relating MLE to Kullback-Leibler (KL) Divergence. If you don't know what this is, it is a metric used to compare 2 different distributions.
$$
\mathrm{KL}(q \parallel p) = \mathbb{E}_{q}\big[\log q(x) - \log p(x)\big] = \mathbb{E}_{q}\big[\log \left(\frac{q(x)}{p(x)}\right)\big].
$$
Where $q$ is the true population distribution and $p$ is our model's distribution. 

KL Divergence has the following properties:
- $KL(q \parallel p) \geq 0$ for any $q$ and $p$.
- $KL(q \parallel p) = 0$ if and only if $q = p$.
- $KL(q \parallel p) = 
\begin{cases} 
\sum_x q(x) \left( \log \frac{q(x)}{p(x)} \right) & \text{If } x \text{ is discrete} \\[10pt]
\int q(x) \log \frac{q(x)}{p(x)} \, dx & \text{If } x \text{ is continuous}
\end{cases}$
- $KL(q \parallel p) \neq KL(p \parallel q)$

Let's prove that $KL(q \parallel p) \geq 0$ for any $q$ and $p$.

First, recall Jensen's Inequality. 

As a quick refresher of Jensen's Inequality, consider a case where we are given the PDF of $q$ where where $X$ is a discrete R.V. with only 2 possible points.

$$
q(x) = \frac{\delta x_1 + \delta x_2}{2}
$$

If some function over this distribution $q$ is convex, then $\mathbb{E}_q[f(x)] \geq f\left(\mathbb{E}_q[x]\right)$. This is known as Jensen's Inequality. 

%%%

This can be generalized to a distribution $q$ with more than 2 points. We will use this in our proof. 

Now, consider the KL divergence formula.

$$
\mathrm{KL}(q \parallel p) = \mathbb{E}_{q}\big[\log \left(\frac{q(x)}{p(x)}\right)\big].
$$

We know that the log function is concave down, but we want it to be convex so that we can apply Jensen's inequality. We 
want to use Jensen's inequality because it will allow us to put a lower bound on the equation. 

We can make the equation convex by negating the log and swapping the numerator and denominator.

$$
\mathrm{KL}(q \parallel p) = \mathbb{E}_{q}\big[\log \left(\frac{q(x)}{p(x)}\right)\big] = \mathbb{E}_{q}\big[-\log \left(\frac{p(x)}{q(x)}\right)\big].
$$

%%%

Now we can apply Jensen's Inequality.

$$
\mathbb{E}_q\left[-\log\left(\frac{p(x)}{q(x)}\right)\right] \geq -\log\left(\mathbb{E}_q\left[\frac{p(x)}{q(x)}\right]\right)
$$
$$
= -\log(\sum_xp(x)) = -\log(1) = \boxed{0}
$$

Therefore,

$$
\mathrm{KL}(q \parallel p) \geq 0.
$$

Now we will prove $KL(q \parallel p) = 0 \iff q = p$.

The inequality in Jensen's inequality must be an equality for this to happen. 

This would mean that $\mathbb{E}_q[f(x)] \geq f\left(\mathbb{E}_q[x]\right)$ where $f$ is the convex function. The only way for this to happen is if all the points in the distribution ($x_1$ and $x_2$ in the graph above where the distribution only has 2 points) don't have a gap 
between them so that the point getween them isn't lower. 

If $x_1$ and $x_2$ are equal in our earlier example (or any corresponding poiints between the distributions), we can imply that $\frac{p(x)}{q(x)}$ is a constant. 
This implies $p(x) = \text{constant} \cdot q(x) \implies \sum_xp(x) = \text{constant}\sum_xq(x) \implies p=q$

**Relating KL-Divergence to MLE**

$\text{MLE} \iff \text{KL}$

Assume $q$ is the data distribution geven and p is the "model". Consider if p wer part of some parametric family. 

$$
P_\theta, \quad \theta \in \Theta
$$

Our learning problem becomes 

$$
\min_\theta KL(q \parallel P_\theta) \iff \min_\theta \mathbb{E}_q\left[\log q(x) - \log P_\theta(x)\right]
$$

Notice that $\log q(x)$  is not dependent on $\theta$, so our learning problem is actually.

$$
\max_\theta \mathbb{E}_q\left[\log P_\theta(x)\right]
$$

This is the same thing as the average log-likelihood because this is the average on $q$ (the data distribution) where $\{x_i\} \sim q$. 

$$
\approx \max_\theta \frac{1}{n} \sum_{i=1}^n \log P_\theta(x_i) = \max_\theta \sum_{i=1}^n \log P_\theta(x_i)
$$

Maximizing the average log-likelihood is the same thing as maximizing the MLE. 

### Conclusion

Maximum Likelihood Estimation (MLE) is a powerful and foundational statistical method for parameter estimation. By leveraging the principle of maximizing the likelihood function, MLE provides a systematic approach to infer the parameters of a model based on observed data. Its versatility is evident as it is applicable to a wide range of parametric families, from simple cases like a biased coin to more complex scenarios such as regression tasks or Gaussian distributions.

Throughout this blog post, we explored key aspects of MLE:

1. **Formal Definition**: Understanding how MLE transforms parameter estimation into an optimization problem using likelihood or log-likelihood functions.
2. **Examples**: From a biased coin to Gaussian and regression problems, these examples illustrated how MLE operates across different scenarios.
3. **Evaluation Metrics**: Metrics like bias, variance, and MSE provide insights into the behavior and reliability of MLE estimators.
4. **Log-Odds and Numerical Methods**: The flexibility of working with log-odds and the necessity of numerical solutions for complex models.
5. **Consistency of MLE**: Demonstrating the nearly universal consistency of MLE, supported by a rigorous connection to Kullback-Leibler (KL) divergence.

#### Takeaways:
- MLE is intuitive and adaptable, making it a go-to method for parameter estimation across various domains.
- Despite its power, MLE is not without limitations. It assumes that the chosen model accurately represents the underlying data distribution, and it can be sensitive to outliers or model misspecification.
- The bias-variance tradeoff and consistency properties highlight the importance of understanding the behavior of MLE estimators, especially as sample sizes grow.

#### Practical Implications:
Whether you're building predictive models, designing experiments, or analyzing data, MLE provides a strong statistical foundation. Its principles extend beyond traditional parametric models and are central to many machine learning algorithms.

By mastering MLE, you unlock a tool that combines theoretical rigor with practical applicability, empowering you to tackle a wide array of problems with confidence.