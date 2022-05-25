import * as core from '@actions/core'
import {deletePreview} from './request-preview'

async function run(): Promise<void> {
  try {
    const application: string = core.getInput('application', {required: true})
    const branch: string = core.getInput('branch', {required: true})
    const releaseNameLength: string = core.getInput('release-name-length')

    await deletePreview(application, branch, releaseNameLength)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
