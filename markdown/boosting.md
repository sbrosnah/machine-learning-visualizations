Recall PAC-Learning

- $\delta$: Probability of failure
- $\epsilon$: Accuracy parameter

Requirement

- For any choice of $\epsilon, \delta$, $A$ should output with probability $\geq 1 - \delta$ an $\epsilon$-accurate classifier.
  
- $A$ is allowed to run in time $\text{poly}(\frac{1}{\epsilon}, \frac{1}{\delta})$ and with the number of samples $\text{poly}(\frac{1}{\epsilon}, \frac{1}{\delta})$.

  - If you want a higher accuracy (smaller $\epsilon$), the term $\frac{1}{\epsilon}$ gets larger, indicating more runtime and samples needed.

  - If you want a higher confidence (lower $\delta$), you also need more computation and samples.

Imagine you have an algorithm that outputs an $\epsilon$-accurate classifier with probability 5%.

How can we use $A$ to obtain a standard PAC learner?

By running $A$ a large number of times and increasing the probability of success to $1 - \delta$.

Let’s say we run $A$ $t$ times.

$$
\Pr[A \text{ fails to output an } \epsilon\text{-accurate classifier}] = (0.95)^t
$$

We make $(0.95)^t$ very small by choosing $t$ to be:

$$
O(\log \frac{1}{\delta})
$$

- We then "test" these $t$ classifiers generated during the trials to see if any of them are good classifiers.

- Amplifying the probability of success isn’t difficult:
  - Bound probability of failure:
    $$
    0.95^t < \delta \implies \ln(0.95) \cdot t < \ln(\delta) \implies t > \frac{\ln(\delta)}{\ln(0.95)}
    $$
    Simplifying:
    $$
    t > \frac{\ln(\frac{1}{\delta})}{\ln(0.95)} \implies t > \frac{\ln(\frac{1}{\delta})}{0.0513}
    $$

Thus, $t$ grows proportionally to $\log(\frac{1}{\delta})$.

Now that we know how to improve the probability of failure, we need to look at how to improve the accuracy parameter.
