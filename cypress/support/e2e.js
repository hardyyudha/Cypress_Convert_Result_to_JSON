import './commands'

let testCounter = 0
const allTests = new Set()
const executedTests = new Set()

let report = {
    project: "0",
    date: new Date().toISOString().split('T')[0],
    summary: {
        totalTests: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        executionTime: "0 ms"
    },
    detailedResults: []
}

// Capture all test titles in `before` hook
before(() => {
    Cypress.mocha.getRunner().suite.eachTest(test => {
        allTests.add(test.title)
    })
    report.summary.totalTests = allTests.size // This line will set the Total Size value as Total Test Case ('it') in the Test Scenario
})

beforeEach(function () {
    // Track the current test being executed
    executedTests.add(this.currentTest.title)
})

afterEach(function () {
    testCounter++

    // Update counts based on test result
    if (this.currentTest.state === 'passed') {
        report.summary.passed++
    } else if (this.currentTest.state === 'failed') {
        report.summary.failed++
    }

    const testResult = {
        testCaseId: `TC-${testCounter}`,
        testCaseName: `${Cypress.currentTest.titlePath[0]} - ${this.currentTest.title}`,
        status: this.currentTest.state
            ? this.currentTest.state.charAt(0).toUpperCase() + this.currentTest.state.slice(1)
            : "Unknown",
        executionTime: this.currentTest.duration ? `${this.currentTest.duration} ms` : '0 ms',
        steps: [...Cypress.stepsLog],
        errorMessage: this.currentTest.state === 'failed' ? this.currentTest.err.message : null,
        screenshots: []
    }

    report.detailedResults.push(testResult)
    Cypress.stepCounter = 1
    Cypress.stepsLog.length = 0
})

after(() => {
    // Determine skipped tests
    const skippedTests = [...allTests].filter(test => !executedTests.has(test))
    report.summary.skipped = skippedTests.length

    // Finalize the report
    const fileName = Cypress.currentTest.titlePath[0] // Filename based on Test Scenario Name
    cy.task('consoleLog', fileName)
    cy.task('writeReport', { fileName, report })

    // Send the test report to the project to the Dashboard
    cy.readFile(`cypress/results/${fileName}.json`).then(reportContent => {
        cy.request({
            method: '',
            url: '', // URL of Test Case Management
            headers: {
                'Content-Type': 'application/json',
                'Acecept': 'application/json',
                'x-api-key': '' // Need the API Key from the Test Case Management Dashboard
            },
            body: reportContent
        }).then(response => {
            expect(response.status).to.eq(201)
            expect(response.body.success).to.eq('Automation has successfully saved.')
        })
    })
})
