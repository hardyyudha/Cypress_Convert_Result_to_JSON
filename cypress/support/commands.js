Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.stepCounter = 1
Cypress.stepsLog = []

Cypress.Commands.add('logStep', (description) => {
    const stepIndex = Cypress.stepCounter++
    Cypress.stepsLog.push({ step: stepIndex, description, status: 'Passed' })
})
Cypress.on('fail', (err, runnable) => {
    const lastStep = Cypress.stepsLog[Cypress.stepsLog.length - 1]
    if (lastStep) {
        lastStep.status = 'Failed'
    }
    throw err
})