# MoSCoW Prioritization

MoSCoW prioritization action to manage label-based requirements prioritization

## Usage

```yml
name: MoSCoW Prioritization

on:
  pull_request_target:
    types: [labeled, opened, unlabeled, reopened]

permissions:
  contents: read
  issues: read
  pull-requests: read

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: grevend/moscow-prioritization@v2.0.2
```

_Note: This action requires access to the `GITHUB_TOKEN` to call GitHub's REST
API_

### All options

| Input                 | Description                                | Default               | Availability |
| --------------------- | ------------------------------------------ | --------------------- | ------------ |
| token                 | The workflows `GITHUB_TOKEN` secret        | `${{ github.token }}` | `>v1.0.0`    |
| wont-have-label       | Label to expect on low-priority PRs        | `wont have`           | `>v1.1.0`    |
| could-have-label      | Label to expect on PRs of little relevance | `could have`          | `>v1.1.0`    |
| should-have-label     | Label to expect on non-critical PRs        | `should have`         | `>v1.1.0`    |
| must-have-label       | Label to expect on essential PRs           | `must have`           | `>v1.1.0`    |
| fail-if-missing-label | Unprioritized PRs should fail the action   | `true`                | `deprecated` |
