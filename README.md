# MoSCoW Prioritization

MoSCoW prioritization action to manage label-based requirements prioritization

## Usage

```yml
name: MoSCoW Prioritization

on:
  pull_request_target:
    types: [ labeled, opened, unlabeled, reopened ]

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref }}
  cancel-in-progress: true

permissions:
  contents: read
  issues: write
  pull-requests: write

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: grevend/moscow-prioritization@v1.1.0
        with:
          token: '${{ secrets.GITHUB_TOKEN }}'
```

_Note: This action requires access to the `GITHUB_TOKEN` to call GitHub's REST API_

### All options

Input | Description | Default
--- | --- | ---
token | The workflows `GITHUB_TOKEN` secret |
wont-have-label | Label to expect on low-priority PRs | `wont have`
could-have-label | Label to expect on PRs of little relevance | `could have`
should-have-label | Label to expect on non-critical PRs | `should have`
must-have-label | Label to expect on essential PRs | `must have`
fail-if-missing-label | Unprioritized PRs should fail the action | `true`