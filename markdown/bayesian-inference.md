# Bayesian Inference

Visualization coming soon...

## Theory

### Main Idea
Bayesian Inference is a statistical method that updates the probability of a hypothesis as more evidence becomes available.

In this context, a hypothesis can be:
- A binary label in classification tasks
  - e.g. classifying whether or not to trust an alarm that predicts sun explosions with high accuracy. 
- Parameter estimation
  - e.g. commute time to work
  -  This is useful because it quantifies uncertainty of parameter estimation.
- A set of parameters in regression tasks
  - e.g. predicting the feature weights of a linear regressor that predicts house prices. Note that the weights will actually be a PDF and the predicted value will also be a PDF.
  - This is useful because it also quantifies uncertainty of parameter estimation.

We will go through an example or two for each of these applications later. 

The basic idea is that we assume that the data is generated from the prior belief of our parameter. We then calculate the probability distribution of our parameter conditioned on our data using baye's theorem which acts as an update to our prior belief. 

### Maximum Likelihood Estimator vs Bayesian Inference
Recall Maximum Likelihood Estimation:

$$\hat{\theta} = \argmax_{\theta} P(x|\theta)$$

In MLE, $\theta$ is unknown but deterministic (frequentist view).
- By deterministic I mean that there is only one $\theta$.
- Trying to find $\hat{\theta}$ using MLE is synonomous with asking "What parameters best explain the observed data?"

Bayesian Inference, on the other hand, views $\theta$ as a random variable (Bayesian view) even though it is actually deterministic.
- We can reconcile this with the fact that our random sample is, as the name implies, random which causes $\theta$ to act as a random variable.
- Instead of estimating a single parameter, we estimate an distribution to give a sort of confidence to our estimate. 
- Estimating the distribution of $\theta$ given our data is synonomous to asking "What should we believe about the parameter(s) given the data and our prior knowledge?"

### Relationship to Baye's Theorem

This estimated distribution of $\theta$ is actually just the posterior distribution acquired through Baye's Theorem. 

$$P(\theta|D)=\frac{P(D|\theta)P(\theta)}{P(D)}$$

Where:  

$P(\theta|D)$ - Posterior Distribution
- i.e. the conditional probability density function (PDF) for $\theta$ given the data $D$.  

$P(D|\theta)$ - Likelihood
- i.e. the conditional PDF for the data $D$ given our belief of what $\theta$ is.

$P(\theta)$ - Prior
- i.e. the PDF for our prior belief of what $\theta$ is.

$P(D)$ - Marginal Distribution
- i.e. the PDF for the data
- It is equivalent to $\int_{-\infty}^{\infty} P(D|\theta)P(\theta) \, d\theta$ (Law of total probability)

The marginal distribution actually isn't required for bayesian inference. 
- This is because our data is fixed and $P(D)$ doesn't depend on $\theta$. Therefore, it is a constant and we can imply: 

$$
\frac{P(D|\theta)P(\theta)}{\int_{-\infty}^{\infty} P(D|\theta)P(\theta) \, d\theta} \propto P(D|\theta)P(\theta) \implies \boxed{P(\theta|D) \propto P(D|\theta)P(\theta)}
$$

You can think of the posterior distribution as a weighted sum of the likelihood and the prior. As $n \rightarrow \infty$ (*i.e.* we get infinite data) the importance of the prior decreases. If $n$ is close to 0, then the prior will have more influence. 

### Why is Bayesian Inference helpful?

In the context of deciding to trust a given classifier with low error that detects an event with low probability (which is itself a binary classification task), Bayesian Inference can be extremely useful because it helps us to balance two conflicting views:  
1. Trust the classifier because it has low error.
2. Don't trust because the probability of a given event is so low.

Consider the following example:

**Example - Binary Classification**  
We have a device that detects if the sun explodes with high accuracy. 

We are given:  

---
$\alpha \rightarrow$ Represents the error of the device. It is known and fixed (*e.g.* $\alpha=.0001$)  
$\theta \in \{0,1\} \rightarrow$ indicates if the sun explodes (*i.e.* $X=1$ if it explodes)  
$X \in \{0,1\} \rightarrow$ indicates if the alarm on the device fires (*i.e.* $X=1$ if it fires and predicts that the sun is exploding)  
$P(x=\theta|\theta) = 1 - \alpha \rightarrow$ the probability that the prediction is correct  
$P(x=\theta|1-\theta) = \alpha \rightarrow$ the probability that the prediction is incorrect

---

If the alarm fires ($x=1$) should we believe it?

One might initially think yes due to the extremely low error, but this can be misleading. 
Because the probability of the sun actually exploding is so small, a small error rate may not be enough. 
- The classifier might be good at classifying when the sun hasn't exploded but not so great at detecting when it has exploded.

<!-- || Predicted Explosion | Predicted Negative |
|-|-|-|
| **Actual Explosion** | $.000000001\%$ | FN |
| **Actual Negative** | FP | $99.999999999999999\%$ |

<small>row-wise normalization of a confusion matrix. Represents </small> -->

Let's try to decide using MLE:

$$
\hat{\theta} = \argmax_{\theta \in \{0, 1\}} P(x=1|\theta)
$$


$$
P(x=1|\theta)=\begin{cases}
    \alpha & \text{if } \theta = 0 \\
    1 - \alpha & \text{if } \theta = 1
\end{cases}\\
$$

We have two choices in this case. Because we've already established that $\alpha$ is small we know that MLE will output $\hat{\theta}=1$ because $1-\alpha > \alpha$.

Now let's try with Bayesian Inference:

**Step 1:** Decide on prior probability
$$
P(\theta) = \begin{cases}
    10^{-100000} \triangleq \beta \text{  if } \theta = 1\\
    \approx 1 - \beta \text{ if } \theta = 0
\end{cases}
$$

**Step 2:** Calculate posterior probability
$$
P(\theta|x=1)=\frac{P(x=1|\theta)P(\theta)}{P(\theta)} \propto P(x=1|\theta)P(\theta) = 
\begin{cases}
    \alpha(1-\beta) & \text{if } \theta = 0 \\
    (1 - \alpha)\beta & \text{if } \theta = 1
\end{cases}
$$

<small>Notice that the output distribution will be the same type of distribution as both the likelihood and prior. In this case they are all Bernoulli distributions.</small>

In this case we could decide to trust the output by calculating
$$
\hat{\theta}=\argmax_{\theta}P(\theta|x=1)
$$
Where we trust it if $\hat{\theta}=1$ and we don't otherwise. We trust the device $\iff$
$$
(1-\alpha)\beta > \alpha(1-\beta)\\
\implies \frac{\beta}{1-\beta} > \frac{\alpha}{1-\alpha} \\
\implies \beta > \alpha\\
$$ 

In our case $\beta \approx 0$ and $\alpha=.0001$ so we should not trust the alarm if it outputs $x=1$.

---

Now let's look at a more complicated example

**Example - Parameter Estimation**

You moved to a new apartment and your friend told you that the commute time is $30\pm10$ munutes (prior)

You also drove yourself a few times and found the times $D=\{25, 45, 30, 50\}$

Your task is to predict the commute time. 

Let's start with some definitions:

---
$\theta \rightarrow$ prior belief of the communte time  
$\theta \sim \mathcal{N}(\mu_0, \sigma_0^2) \implies P(\theta) = \mathcal{N}(\mu_0, \sigma_0^2) \rightarrow$ this is the prior distribution  
$\mu_0 = 30 \rightarrow$ the mean of the prior  
$\sigma_0=10 \rightarrow$ variance of the prior  
$\xi_i \sim \mathcal{N}(0, 1) \rightarrow$  This is used to simulate noise in our datapoints   
$\sigma_1=5 \text{ (or something else)} \rightarrow$ the variance of the datapoints  
$D=\{x_1, \dots, x_n\} \rightarrow$ our datapoints  
$x_i= \theta + \sigma_1 \xi_i \implies P(x_i|\theta) = \mathcal{N}(\theta, \sigma_1^2)
\rightarrow$ This is the likelihood of the data given our prior belief  
$\mathcal{N}(\theta, \sigma_1^2) = \frac{1}{\sqrt{2\pi}\sigma_1}\exp(-\frac{(x_i - \theta)^2}{2\sigma_1^2}) \propto \exp(-\frac{(x_i - \theta)^2}{2\sigma_1^2}) \rightarrow$ Proportional because the normalization constant doesn't change during inference. *i.e.* It's not dependent on $\theta$.  
$P(\theta |D)=\mathcal{N}(\mu_p, \sigma_p^2) \rightarrow$ our posterior distribution.  

---

We've already decided on a prior so now we just calculate the posterior distribution. 

$$
P(\theta | D) = \frac{P(D|\theta)P(\theta)}{P(D)} \propto P(D|\theta)P(\theta) = 
\prod_{i=1}^{n} P(x_i|\theta)P(\theta) \\
$$

Because we know the exponent in the Gaussian is proportional to the actual PDF of the Gaussian we can say
$$
\prod_{i=1}^{n} P(x_i|\theta)P(\theta) \propto [\prod_{i=1}^{n}\exp(-\frac{(x_i - \theta)^2}{2\sigma_1^2})]\exp(-\frac{(\mu_0 - \theta)^2}{2\sigma_0^2})
$$

We then move the product inside of the exponent

$$
=\exp(-[\sum_{i=1}^{n}\frac{(x_i - \theta)^2}{2\sigma_1^2}]-\frac{(\mu_0 - \theta)^2}{2\sigma_0^2})
$$

We then assume that we can write the term inside the exponent as some quadratic function

$$
=\exp(-\frac{1}{2}(A - 2B\theta+C))
$$
Where   
$A=\sum_{i=1}^{n}\frac{1}{\sigma_1^2}+\frac{1}{\sigma_0^2} = \boxed{\frac{n}{\sigma_1^2}+\frac{1}{\sigma_0^2}}$  
$B=\sum_{i=1}^{n}\frac{x_i}{\sigma_1^2}+\frac{\mu_0}{\sigma_0^2}$  
$C = \text{Some constant we don't care about}$

Then we do some more rearranging and we will find

$$
=\exp(-\frac{1}{2}A(\theta-\frac{B}{A})^2 + C)
$$

Which is in the same form as the exponent we determined was proportional to the likelihood Gaussian. Therefore we can deduce that 

$$
\mathcal{N}(\frac{B}{A}, \frac{1}{A}) = \mathcal{N}(\mu_p, \sigma_p^2)
= P(\theta | D) \\
$$

We just found:
- The posterior is proportional to the exponent of some quadratic function.
- By rearranging the quadratic function, we see that it is a Gaussian with mean $\frac{B}{A}$ and variance $\frac{1}{A}$. 
- This is our posterior distribution.

Recall earlier when I said that the posterior distribution is like a weighted sum of the likelihood with the prior. I said that as $n \rightarrow \infty$ the prior distribution would become less and less relevant. We can illustrate this mathematically. 

We know

$$
\mu_p = \frac{B}{A} = \frac{[\sum_{i=1}^n\frac{x_i}{\sigma_1^2}] + \frac{\mu_0}{\sigma_0^2}}
{\frac{n}{\sigma_1^2}+\frac{1}{\sigma_0^2}}
$$
$$
\sigma_p^2=\frac{1}{A}=(\frac{n}{\sigma_1^2} + \frac{1}{\sigma_0^2})^{-1}
$$

First, consider when we have no data.

$$
\mu_p = \frac{[\sum_{i=1}^n\frac{x_i}{\sigma_1^2}] + \frac{\mu_0}{\sigma_0^2}}
{\frac{n}{\sigma_1^2}+\frac{1}{\sigma_0^2}}=\mu_0\\

\sigma_p^2=(\frac{n}{\sigma_1^2} + \frac{1}{\sigma_0^2})^{-1}=\sigma_0^2
$$

Next, consider when $n$ is really large.
$$
\mu_p = \frac{[\sum_{i=1}^n\frac{x_i}{\sigma_1^2}] + \frac{\mu_0}{\sigma_0^2}}
{\frac{n}{\sigma_1^2}+\frac{1}{\sigma_0^2}} \approx \frac{[\sum_{i=1}^nx_i] + 0}{n} = \text{Empirical Mean}
$$
$$
\sigma_p^2=(\frac{n}{\sigma_1^2} + \frac{1}{\sigma_0^2})^{-1} \approx (\frac{n}{\sigma_1^2})^{-1} \approx \frac{1}{n}
$$

In this example, we estimated the posterior probability distribution of communte time parameterized by $\mu_p$ and $\sigma_p^2$.

This idea of parameter estimation for the posterior distribution of some value can be extended to linear regression.

**Example - Bayesian Linear Regression** 

Given data points $\{x_i, y_i\}_{i=1}^n \triangleq D$, our task is to find $\theta \text{ s.t. } y \approx x^T\theta + b$ or $\tilde{x}^T\tilde{\theta}$ when $b$ is incorporated into $\tilde{\theta}$.

So how do we estimate $\tilde{\theta}$?  
Recall that in regular linear regression we use the Least Squares objective function.
$$
\hat{\theta} = \argmin_{\theta}\sum_{i=1}^n(y_i - x_i^T\theta)^2
$$

This approach is deterministic estimation. We may also want to know the uncertainty of our estimation. We can use Bayesian Inference for this!

To do this, we follow the same steps we've been following in the previous examples with a few caveats:
1. Treat $\theta$ as a random variable
2. Assume a prior: This you can decide yourself if you have prior knowledge, or you can set a default prior.   
$P(\theta)= \mathcal{N}(\mu_0, \sigma_0^2)$  
Typical default parameters are $\mu_0=0$ and $\sigma_0^2=\text{some large number}$
3. Calculate the likelihood by assuming a Gaussian model  
<br>
$y_i = x_i^T\theta+\sigma_1\xi_i$  
<br>
where   
$\sigma_1$: variance of the data  
$\xi_i = \mathcal{N}(0, 1)$: Gaussian noise  

<br>

By the chain rule we know  
$P(\{y_i, x_i\} | \theta) = P(y_i|x_i,\theta)P(x_i)$  

Notice that $P(x_i)$ isn't dependent on $\theta$. i.e. $\theta$ decides how you generate y_i and is the independent variable, not x_i. Therefore, instead of using the joint probability, we can use the conditional probability when calculating the likelihood. 

$P(\{y_i, x_i\} | \theta) \propto P(y_i|x_i,\theta)$

Using this knowledge, let's work out all the math to calculate the likelihood. 


$$
P(\theta | D) = \frac{P(D|\theta)P(\theta)}{P(D)} \propto P(D|\theta)P(\theta) = 
[\prod_{i=1}^{n} P(\{x_i, y_i\}|\theta)]P(\theta) \\
= [\prod_{i=1}^{n} P(x_i|y_i, \theta)P(x_i)]P(\theta)\\
\propto [\prod_{i=1}^{n} P(x_i|y_i, \theta)]P(\theta)\\
\propto [\prod_{i=1}^{n} \exp(-\frac{(y_i-x_i^T\theta)^2}{2\sigma_1^2})]
\exp(-\frac{(\theta - \mu_0)^2}{2\sigma_0^2})\\
=  \exp(-[\sum_{i=1}^{n}\frac{(y_i-x_i^T\theta)^2}{2\sigma_1^2}]-\frac{(\theta - \mu_0)^2}{2\sigma_0^2})\\
$$

Just like in the previous example, the equation inside the exponent is a quadratic function of $\theta$.

$$
=\exp(-\frac{1}{2}\theta^TA-2B^T\theta+C)
$$

Because of this, we can conclude that the posterior distribution will be a Gaussian parameterized as follows:

$$
P(y|x, \theta) = \mathcal{N}(A^{-1}B, A^{-1})
$$
Where  
$$
A = [\sum_{i=1}^n\frac{x_ix_i^T}{\sigma_1^2}]+\frac{I}{\sigma_0^2} \\
B= [\sum_{i=1}^n\frac{y_ix_i^T}{\sigma_1^2}]+\frac{\mu_0}{\sigma_0^2} \\
\mu_p=A^{-1}B\\
\sigma_p=A^{-1}\\
$$

If you work the math out, you will se the same properties as in the previous example that if we have no data, our posterior is the prior and that as $n \rightarrow \infty$ the prior becomes negligable and we move toward the empirical means.

### Conclusion

In summary, Bayesian Inference provides a powerful framework for making probabilistic predictions and quantifying uncertainty. Unlike traditional Maximum Likelihood Estimation (MLE), which seeks a single best-fit parameter, Bayesian Inference treats parameters as random variables, allowing us to capture the uncertainty in our estimates. By combining prior beliefs with observed data using Bayes' theorem, Bayesian Inference produces a posterior distribution that reflects both our prior knowledge and new evidence.

Through examples in binary classification, parameter estimation, and Bayesian linear regression, we explored how Bayesian methods incorporate prior knowledge and dynamically update beliefs as more data becomes available. This approach is especially useful in cases with limited data, where prior information significantly informs predictions. As the dataset grows, Bayesian Inference gradually relies more on the observed data, diminishing the influence of prior beliefs.

Bayesian Inference is a versatile tool that enhances predictive modeling by providing a confidence interval around predictions, helping to assess the reliability of predictions even in complex scenarios with low-probability events. This capacity for uncertainty quantification makes Bayesian approaches particularly valuable in fields where decision-making under uncertainty is crucial, from scientific research to real-world applications like risk assessment and financial forecasting.