import {parseMultiInput} from '@conventional-actions/toolkit'
import * as core from '@actions/core'

type Config = {
  outputPaths: string[]
  format: string
  version: string
  selector: string
}

export async function getConfig(): Promise<Config> {
  let outputPaths = parseMultiInput(core.getInput('output_path'))
  if (!outputPaths || !outputPaths.length) {
    outputPaths = ['package.json']
  }

  return {
    outputPaths,
    format: core.getInput('format') || '',
    version: core.getInput('version', {required: true}) || '',
    selector: core.getInput('selector') || 'version'
  }
}
