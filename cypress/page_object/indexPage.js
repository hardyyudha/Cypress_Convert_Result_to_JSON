class IndexPage {
    visitDashboard() {
        cy.logStep('User visit dashboard page')
        cy.visit('/')
    }
}

export default IndexPage