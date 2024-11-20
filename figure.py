import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from scipy.stats import multivariate_normal

# Define mean vector (mu) and covariance matrix (Sigma)
mu = np.array([0, 0])  # Center of the distribution
Sigma = np.array([[1, 0.5], [0.5, 1]])  # Covariance matrix controlling shape

# Create grid and multivariate normal distribution
x1, x2 = np.mgrid[-3:3:.1, -3:3:.1]
pos = np.dstack((x1, x2))
rv = multivariate_normal(mu, Sigma)
z = rv.pdf(pos)

# Plotting
fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(x1, x2, z, cmap="viridis", edgecolor="none", alpha=0.7)

# Add labels and text
ax.set_xlabel('$x_1$')
ax.set_ylabel('$x_2$')
ax.set_zlabel('$P(x_1, x_2)$')
ax.text2D(0.05, 0.95, r"$\mu$ controls center", transform=ax.transAxes)
ax.text2D(0.05, 0.90, r"$\Sigma$ controls the shape", transform=ax.transAxes)

plt.show()
