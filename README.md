# ssss-hhhh-lll-t

## Cell Automaton (SHL assessment) — JavaScript solution

A colony of eight cells in a straight line. Every day each cell looks at its two
neighbours: if both neighbours are the same (both active or both inactive) the
cell becomes inactive, otherwise it becomes active. The end cells have only one
neighbour and the missing one counts as inactive. All cells update
simultaneously.

That is, for each cell: `next[i] = left XOR right` (a neighbour outside the
colony is `0`).

### Files

| Path | Purpose |
| --- | --- |
| `solution.js` | Solution: `simulate()` / `solve()` plus a stdin→stdout CLI |
| `solution.test.js` | Test suite (Node's built-in test runner) |

### Input / Output

```
input   line 1: 1 0 0 0 0 1 0 0      (eight space-separated 0/1 values)
        line 2: 1                    (number of days)
output  0 1 0 0 1 0 1 0              (eight space-separated 0/1 values)
```

The compact form `10000100` is accepted for the first line as well.

### Run

```bash
# sample run
echo "1 0 0 0 0 1 0 0
1" | node solution.js

# full test suite
npm test
```
