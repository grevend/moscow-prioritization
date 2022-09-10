# MoSCoW Prioritization

MoSCoW prioritization action to manage label-based requirements prioritization

## Usage

```yml
name: MoSCoW Prioritization

on:
  pull_request:
    types: [labeled, opened, unlabeled, reopened]
  pull_request_target:
    types: [labeled, opened, unlabeled, reopened]

jobs:
  check:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: grevend/moscow-prioritization@v1.0.0
        with:
          token: "${{ secrets.GITHUB_TOKEN }}"
```

_Note: This action requires access to the `GITHUB_TOKEN` to call GitHub's REST API_