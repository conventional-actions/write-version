import * as core from '@actions/core'
import {parseInputFiles, paths, unmatchedPatterns} from './utils'
import {writeVersion} from './version'

async function run(): Promise<void> {
  try {
    let outputPaths = parseInputFiles(core.getInput('output_path'))
    core.debug(`outputPaths = ${outputPaths}`)

    const format = core.getInput('format')
    core.debug(`format = ${format}`)

    const version = core.getInput('version', {required: true})
    core.debug(`version = ${version}`)

    const selector = core.getInput('selector') || 'version'
    core.debug(`selector = ${selector}`)

    if (!outputPaths || !outputPaths.length) {
      outputPaths = ['package.json']
    }

    const patterns = paths(outputPaths)
    core.debug(`patterns = ${patterns}`)

    const unmatched = unmatchedPatterns(outputPaths)
    core.debug(`unmatched = ${unmatched}`)

    for (const path of unmatched) {
      core.error(`Path ${path} is unmatched`)
    }

    if (unmatched.length) {
      core.setFailed('Some paths were unmatched')
      return
    }

    for (const path of patterns) {
      await writeVersion(path, version, selector, format)
    }

    core.info('Updated versions')
    return
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
