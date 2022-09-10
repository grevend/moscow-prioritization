import * as core from '@actions/core'
import * as gh from '@actions/github'

const help = `# MoSCoW Prioritization

:exclamation: Don&apos;t forget to assign a label based on the MoSCoW prioritization.

Prioritization | Explanation
--- | ---
Must Have | Essential and non-negotiable requirements for the project.
Should Have | Not critical to the success of the project, but of high relevance. Should be taken into account in the project implementation, as long as no impairment of must requirements occurs.
Could Have | Of little relevance and is only taken into account if there is still capacity in addition to the requirements for must and should.
Won't Have (this time) | Low priority for the current planning stage, but will be prioritized again for the next release.
`
const complete = 'Excellent, the MoSCoW prioritization is finished! :label:'

const token = core.getInput('token', {required: true})
const octo = gh.getOctokit(token);

(async () => {
    try {
        const prNum = gh?.context?.payload?.pull_request?.number
        if (!prNum) {
            core.info('This action only works on pull requests!')
            return;
        }

        const {data: pr} = await octo.rest.pulls.get({
            ...gh.context.repo, pull_number: prNum
        })

        const hasLabel = pr.labels.some(({name: label}) => {
            switch (label) {
                case "Wont Have":
                case "Could Have":
                case "Should Have":
                case "Must Have":
                    return true
                default:
                    return false
            }
        })

        await octo.rest.issues.createComment({
            ...gh.context.repo, issue_number: prNum,
            body: hasLabel ? complete : help
        })
    } catch (error: any) {
        core.error(error);
        core.setFailed(error.message);
    }
})()