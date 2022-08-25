# write-version

A GitHub Action for writing a version to a file.

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/write-version@v1
  with:
    version: ${{steps.version.outputs.version}}
```

Supported file formats include YAML (.yml and .yaml extension) and JSON (.json extension). Any unknown file extension
is written as a plain-text file.

### Inputs

| Name          | Default        | Description                                                                |
|---------------|----------------|----------------------------------------------------------------------------|
| `output_path` | `package.json` | paths to write version to                                                  |
| `version`     | required       | the version to write                                                       |
| `selector`    | `version`      | the jsonpath selector of the version field to write                        |
| `format`      | N/A            | the format to use if the extension of the `output_path` is not recognized. |

### Outputs

No outputs

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - id: version
        name: Determine next version
        uses: conventional-actions/next-version@v1
      - uses: conventional-actions/write-version@v1
        with:
          version: ${{steps.version.outputs.version}}
          output-path: |
            package.json
            VERSION
      - uses: conventional-actions/write-version@v1
        with:
          version: "${{steps.version.outputs.version-major-only}}.${{steps.version.outputs.version-minor-only}}.${{steps.version.outputs.version-patch-only}}"
          selector: info.version
          output-path: manifest.yaml
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

