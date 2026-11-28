#flashcards/automatica/01_01_state_equations

What is the formal definition of the state $\mathbf{x}(t_0)$ of a dynamical system?
?
It is the minimal vector $\{x_1(t_0), \dots, x_n(t_0)\}$ whose value at $t_0$, together with future inputs $\mathbf{u}(t)$ for $t \ge t_0$, uniquely determines $\mathbf{x}(t)$ and $\mathbf{y}(t)$ for all $t \ge t_0$.

---

What signals correspond to the state variables $\mathbf{x}(t)$ in an analog integrator block diagram?
?
The outputs of the $n$ scalar integrator blocks ($\int dt$), since each stores continuous-time memory.

---

In the LTI state-space model $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$, $\mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u}$, what are the dimensions of $\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D}$ for $n$ states, $m$ inputs, and $p$ outputs?
?
$\mathbf{A} \in \mathbb{R}^{n \times n}$, $\mathbf{B} \in \mathbb{R}^{n \times m}$, $\mathbf{C} \in \mathbb{R}^{p \times n}$, and $\mathbf{D} \in \mathbb{R}^{p \times m}$.

---

Which state-space matrix governs autonomous internal coupling between states when $\mathbf{u}(t) \equiv \mathbf{0}$?
?
The dynamic matrix $\mathbf{A} \in \mathbb{R}^{n \times n}$.

---

Which state-space matrix distributes external actuator inputs $\mathbf{u}(t)$ into state derivatives $\dot{\mathbf{x}}(t)$?
?
The input matrix $\mathbf{B} \in \mathbb{R}^{n \times m}$.

---

Which state-space matrix projects internal states $\mathbf{x}(t)$ onto measured sensor channels $\mathbf{y}(t)$?
?
The output matrix $\mathbf{C} \in \mathbb{R}^{p \times n}$.

---

What physical property causes the direct feedthrough matrix $\mathbf{D}$ to be zero in physical mechanical or electrical plants?
?
Finite inertia (mass, inductance, or capacitance), which prevents an instantaneous output jump under finite inputs (making the system strictly proper).

---

How many state variables does a translational multi-body system require for $k$ independent moving masses?
?
$n = 2k$ states: one position $p_i(t)$ and one velocity $\dot{p}_i(t)$ per mass.

---

How are phase variables defined when converting $y^{(n)} + a_{n-1}y^{(n-1)} + \dots + a_0 y = b_0 u$ into Frobenius companion form?
?
$x_1 = y, \; x_2 = \dot{y}, \; \dots, \; x_n = y^{(n-1)}$.

---

In Frobenius companion form, where do the ODE coefficients appear in $\mathbf{A}$ and with what signs and ordering?
?
Along the bottom row in ascending derivative order and negated: $\begin{bmatrix} -a_0 & -a_1 & \dots & -a_{n-1} \end{bmatrix}$.

---

What step is mandatory before reading companion coefficients from $c_n y^{(n)} + \dots + c_0 y = d_0 u$?
?
Divide the entire equation by $c_n$ so the leading $y^{(n)}$ coefficient is $1$.

---

If a scalar differential equation has non-zero coefficient $b_0$ on $u(t)$ in Frobenius companion form, what are $\mathbf{B}$ and $\mathbf{C}$?
?
$\mathbf{B} = \begin{bmatrix} 0 & \dots & 0 & b_0 \end{bmatrix}^T$ and $\mathbf{C} = \begin{bmatrix} 1 & 0 & \dots & 0 \end{bmatrix}$.

---

In a two-cart mechanical chain with coupling spring $k$ between $p_1$ and $p_2$, what sign does the spring force $k(p_2 - p_1)$ take on cart 1 versus cart 2?
?
$+k(p_2 - p_1)$ accelerates cart 1 forward, whereas $-k(p_2 - p_1)$ pulls cart 2 backward.
