# Soft Condorcet Optimization

Soft Condercet Optimization is a ranking scheme inspired by [social choice
theory](https://en.wikipedia.org/wiki/Social_choice_theory).

Similar to Elo ratings, it can be used to estimate the relative strength of a
set of players by looking at outcomes of competitions. In addition to pairwise
comparisons (as in, for example, chess), it also allows for race-type
competitions where more than two players are ranked in or on a single game or
task.


## The `sco` package

This repository contains an implementation of Soft Condercet Optimization in
TypeScript. It expects an array of game outcomes as input and returns a sorted
list of players and their estimated rating.


### Usage

TODO


### Limitations

The implementation only supports Stochastic Gradient Descent with a batch size
of 1 as the optimizer.


## References

```bibtex
@misc{lanctot2024softcondorcetoptimizationranking,
      title={Soft Condorcet Optimization for Ranking of General Agents}, 
      author={Marc Lanctot and Kate Larson and Michael Kaisers and Quentin Berthet and Ian Gemp and Manfred Diaz and Roberto-Rafael Maura-Rivero and Yoram Bachrach and Anna Koop and Doina Precup},
      year={2024},
      eprint={2411.00119},
      archivePrefix={arXiv},
      primaryClass={cs.MA},
      url={https://arxiv.org/abs/2411.00119}, 
}
```