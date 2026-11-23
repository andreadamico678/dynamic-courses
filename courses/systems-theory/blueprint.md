# Blueprint: Linear Systems Theory (Teoria dei Sistemi - UniCT)

---

> **Nota sulle Prove d'Esame:** A seguito di chiarimento ufficiale del docente (Prof. Arena), la prova in itinere di Teoria dei Sistemi è **UNICA** e si svolge a **fine corso** (metà/fine gennaio), comprendendo l'intero programma (Aree 1–8). Non è prevista alcuna prova parziale a metà semestre (novembre).

## PART I: STATE-SPACE MODELING, RESOLVENT & STABILITY DYNAMICS

- [x] Area 1: Continuous Time Dynamic State Models & Physical Systems
  - [x] Module: State Space Representations
    - [x] `chapters/01_state_models_and_block_diagrams/01_first_order_differential_state_equations.qmd` - State Differential Equations & Mechanical Multi-Body Realizations
    - [x] `chapters/01_state_models_and_block_diagrams/02_coordinate_basis_similarity_transformations.qmd` - Coordinate Transformations & System Invariants
  - [x] Module: Interconnected System Architectures
    - [x] `chapters/01_state_models_and_block_diagrams/03_block_diagram_algebra_reduction.qmd` - Block Diagram Algebra Reduction & Equivalence Rules

- [x] Area 2: Operational Laplace Transforms & State Resolvent Inversion
  - [x] Module: Complex Frequency Operator Methods
    - [x] `chapters/02_laplace_and_resolvent_methods/01_unilateral_laplace_transformation_primitives.qmd` - Unilateral Laplace Transform Primitives & Operational Theorems
    - [x] `chapters/02_laplace_and_resolvent_methods/02_partial_fraction_expansion_heaviside_residues.qmd` - Partial Fraction Residues & Distinct/Complex Conjugate Poles
  - [x] Module: Dynamic State Resolvent
    - [x] `chapters/02_laplace_and_resolvent_methods/03_state_resolvent_matrix_inversion.qmd` - State Resolvent Matrix Inversion $(sI - A)^{-1}$
    - [x] `chapters/02_laplace_and_resolvent_methods/04_transfer_function_matrix_invariants.qmd` - Transfer Function Matrix Invariance $W(s) = C(sI - A)^{-1}B + D$

- [x] Area 3: Dynamic Trajectories & Matrix Exponential Transitions
  - [x] Module: Transition Operator Synthesis
    - [x] `chapters/03_time_response_and_matrix_exponential/01_matrix_exponential_state_transition.qmd` - Matrix Exponential State Transitions $e^{At}$ & Cayley-Hamilton
  - [x] Module: Trajectory Resolution
    - [x] `chapters/03_time_response_and_matrix_exponential/02_free_state_response_evaluation.qmd` - Free State and Output Response Evaluation
    - [x] `chapters/03_time_response_and_matrix_exponential/03_lagrange_convolution_forced_response.qmd` - Lagrange Convolution Forced Response & Impulse Response $w(t)$

- [x] Area 4: System Stability Criteria & Routh
  - [x] Module: Internal Spectral Stability
    - [x] `chapters/04_system_stability_and_routh/01_linear_time_invariant_equilibrium_points.qmd` - Linear Time-Invariant Equilibrium Points
    - [x] `chapters/04_system_stability_and_routh/02_lyapunov_spectral_internal_stability.qmd` - Lyapunov Spectral Internal Stability & Multiplicities
  - [x] Module: Routh-Hurwitz Algebraic Stability
    - [x] `chapters/04_system_stability_and_routh/03_routh_hurwitz_tabular_array_construction.qmd` - Routh-Hurwitz Tabular Array Construction
    - [x] `chapters/04_system_stability_and_routh/04_singular_routh_table_zero_elements.qmd` - Singular Routh Tables (Zero Pivot & All-Zero Row)
    - [x] `chapters/04_system_stability_and_routh/05_parametric_feedback_gain_stability_bounds.qmd` - Parametric Stability Bounds via Routh
  - [x] Module: External Stability
    - [x] `chapters/04_system_stability_and_routh/06_bounded_input_bounded_output_stability.qmd` - Bounded-Input Bounded-Output (BIBO) Stability

---

## PART II: KALMAN STRUCTURE, STATE FEEDBACK & FREQUENCY ANALYSIS (COMPREHENSIVE EXAM TARGET)

- [x] Area 5: Harmonic Response & Frequency Analysis
  - [x] Module: Frequency Domain Characterization
    - [x] `chapters/05_harmonic_response_and_bode/01_asymptotic_bode_magnitude_diagrams.qmd` - Asymptotic Bode Magnitude Diagrams
    - [x] `chapters/05_harmonic_response_and_bode/02_exact_bode_phase_diagrams.qmd` - Exact Bode Phase Diagrams & Real Resonances
    - [x] `chapters/05_harmonic_response_and_bode/03_non_minimum_phase_singularity_dynamics.qmd` - Non-Minimum Phase Singularity Dynamics & RHP Zeros

- [x] Area 6: Kalman Structural Properties
  - [x] Module: Controllability and Observability Criteria
    - [x] `chapters/06_kalman_structural_properties/01_kalman_controllability_matrix_rank_criterion.qmd` - Kalman Controllability Matrix Rank Criterion
    - [x] `chapters/06_kalman_structural_properties/02_kalman_observability_matrix_rank_criterion.qmd` - Kalman Observability Matrix Rank Criterion
  - [x] Module: Subspace Decompositions
    - [x] `chapters/06_kalman_structural_properties/03_kalman_canonical_subspace_decomposition.qmd` - Kalman Canonical Subspace Decomposition
    - [x] `chapters/06_kalman_structural_properties/04_uncontrollable_mode_stabilizability_verification.qmd` - Stabilizability and Uncontrollable Mode Verification

- [x] Area 7: State Feedback Controller Synthesis
  - [x] Module: Pole Placement Synthesis
    - [x] `chapters/07_state_feedback_control/01_pole_placement_controllable_canonical_form.qmd` - Controllable Canonical Form Pole Placement
    - [x] `chapters/07_state_feedback_control/02_ackermann_state_feedback_gain_formula.qmd` - Ackermann State Feedback Gain Formula
  - [x] Module: Dominant Closed-Loop Pole Specifications
    - [x] `chapters/07_state_feedback_control/03_dominant_second_order_closed_loop_poles.qmd` - Dominant Second-Order Closed-Loop Dynamics ($-a \pm jb$, $\xi, \omega_n$)

- [x] Area 8: State Observer Synthesis & Dynamic Compensation
  - [x] Module: State Estimation Architecture
    - [x] `chapters/08_state_observers_and_compensation/01_luenberger_state_observer_architecture.qmd` - Luenberger Asymptotic State Observer Architecture
    - [x] `chapters/08_state_observers_and_compensation/02_dual_observer_gain_ackermann_synthesis.qmd` - Dual Observer Gain Ackermann Synthesis
  - [x] Module: Dynamic Compensation
    - [x] `chapters/08_state_observers_and_compensation/03_separation_principle_dynamic_compensator.qmd` - Separation Principle & Dynamic Output Feedback Compensator
