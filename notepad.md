# Heading 1
## Heading 2
### Heading 3

*italic* or _italic_<br>
**bold** or __bold__<br>
***bold italic*** or ___bold italic___<br>
~~strikethrough~~<br>

* Item 1
* Item 2
  * Nested item
    * Further nested

1. First item
2. Second item
   1. Nested item

[Link text](URL)<br>
![Image alt text](image-URL)

> Quote text

> Multiple lines</br>
hello

>> Nested quotes

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |

---
***
___

\* Not italic \*

- [x] Completed task
- [ ] Uncompleted task
  - [x] Nested completed subtask

Here's a sentence with a footnote[^1].

[^1]: This is the footnote text.


$$
S = \frac{1}{16\pi G} \int d^4x \sqrt{-g} \left(R - 2\Lambda + \mathcal{L}_\text{matter}\right) + \oint_{\partial M} d^3x \sqrt{|h|} \frac{\epsilon}{8\pi G} K + \sum_{i=1}^{n} \frac{\partial^2 f(x_i)}{\partial x^2} \begin{pmatrix} 
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

Line with two spaces at end  
Next line

Line followed by backslash\
Next line

[//]: # (This is a comment that won't appear in the output)

```javascript {.class1 .class2}
// Code with syntax highlighting and classes
function hello() {
  console.log('Hello');
}
```

<details>
<summary>Click to expand</summary>

Content inside the expandable section
</details>


<br>

### Main Idea
Bayesian Inference is a statistical method that updates the probability of a hypothesis as more evidence becomes available.

In this context, a hypothesis can be:
- A binary label in classification tasks
  - e.g. classifying whether or not to trust an alarm predicts sun explosions with high accuracy. 
- A set of parameters in regression tasks
  - e.g. predicting the feature weights of a linear regressor that predicts house prices. Note that the weights will actually be a PDF and the predicted value will also be a PDF.
- A single parameter in parameter estimation
  - e.g. commute time to work

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
$\theta \rightarrow time$  
$\theta \sim \mathcal{N}(\mu_0, \sigma_0^2) \implies P(\theta) = \mathcal{N}(\mu_0, \sigma_0^2) \rightarrow$ this is the prior  
$\mu_0 = 30$  
$\sigma_0=10$  
$\xi_i \sim \mathcal{N}(0, 1) \rightarrow$  This is used to simulate noise   
$\sigma_1=5 \text{ (or something else. It could be anything)}$  
$D=\{x_1, \dots, x_n\}$  
$x_i= \theta + \sigma_1 \xi_i \implies P(x_i|\theta) \sim \mathcal{N}(\theta, \sigma_1^2)
\rightarrow$ This is the likelihood  
$\mathcal{N}(\theta, \sigma_1^2) = \frac{1}{\sqrt{2\pi}\sigma_1}\exp(-\frac{(x_i - \theta)^2}{2\sigma_1^2}) \propto \exp(-\frac{(x_i - \theta)^2}{2\sigma_1^2}) \rightarrow$ Proportional because the normalization constant doesn't change during inference. *i.e.* It's not dependent on $\theta$.

---

We've already decided on a prior so now we just calculate the posterior distribution. 

$$
P(\theta | D) = \frac{P(D|\theta)P(\theta)}{P(D)} \propto P(D|\theta)P(\theta) = 
\prod_{i=1}^{n} P(x_i|\theta)P(\theta) \\
$$

Because we know the exponent in the gaussian is proportional to the actual PDF of the Gaussian we can say
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

Then we do some more rearranc