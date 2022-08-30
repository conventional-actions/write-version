import * as core from '@actions/core'
import {paths, unmatchedPatterns} from '@conventional-actions/toolkit'
import {writeVersion} from './version'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    const patterns = paths(config.outputPaths)
    core.debug(`patterns = ${patterns}`)

    const unmatched = unmatchedPatterns(config.outputPaths)
    core.debug(`unmatched = ${unmatched}`)

    for (const path of unmatched) {
      core.error(`Path ${path} is unmatched`)
    }

    if (unmatched.length) {
      core.setFailed('Some paths were unmatched')
      return
    }

    for (const path of patterns) {
      await writeVersion(path, config.version, config.selector, config.format)
    }

    core.info('Updated versions')
    return
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
