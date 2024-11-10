# Soft Condorcet Optimization

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Soft Condorcet Optimization is a ranking scheme inspired by [social choice
theory](https://en.wikipedia.org/wiki/Social_choice_theory).

Similar to Elo ratings, it can be used to estimate the relative strength of a
set of players by looking at outcomes of competitions. In addition to pairwise
comparisons (as in, for example, chess), it also allows for race-type
competitions where more than two players are ranked in or on a single game or
task.


## The `sco` library

This repository contains an implementation of Soft Condorcet Optimization in
TypeScript. It expects the prior ratings of each player and an array of outcomes
as input and returns an updated set of ratings for each player.


### Usage

```ts
import { updateRatings } from "./src/sco.ts";

// Step 1: Initialize ratings. Ratings must be between 0 and 100.
// Ratings of players that are not mentioned are defaulted to 50.
const ratings = new Map([
    ["Alice", 65],
    ["Bob", 35],
    ["Charlie", 15],
]);

// Step 2: Generate rankings (as in a race, a lower rank is better).
const rankings = [
    [
        // Alice beats both Bob and Charlie,
        // Bob and Charlie tie.
        { player: "Alice", rank: 1 },
        { player: "Bob", rank: 2 },
        { player: "Charlie", rank: 2 },
    ],
    [
        // Players need not be sorted by rank, the array is automatically sorted.
        { player: "Alice", rank: 3 },
        { player: "Bob", rank: 1 },
        { player: "Charlie", rank: 4 },
        { player: "Dave", rank: 2 },
    ]
];

// Step 3: Update ratings using Stochastic Gradient Descent.
// A lower temperature leads to faster and potentially more unstable updates.
const learning_rate = 0.5;
const temperature = 1.0;

const updated_ratings = updateRatings(ratings, rankings, learning_rate, temperature);
```

## The `sco` commandline tool

The package also contains a commandline tool that can be used to calculate
ratings based on a `.jsonl` file containing rankings, one ranking per line.

```bash
$ cat <<EOF > rankings.jsonl
[{"player": "Alice", "rank": 1}, {"player": "Bob", "rank": 2}, {"player": "Charlie", "rank": 2}]
[{"player": "Alice", "rank": 3}, {"player": "Bob", "rank": 1}, {"player": "Charlie", "rank": 4}, {"player": "Dave", "rank": 2}]
EOF

$ ./sco rankings.jsonl --learning-rate 0.5 --temperature 1.0
{
  "Alice": 50.124119205271754,
  "Bob": 50.24569130995567,
  "Charlie": 49.50852481287547,
  "Dave": 50.12166467189711
}
```

You can build the tool using `deno compile main.ts`.

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
