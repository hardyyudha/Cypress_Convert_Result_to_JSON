class LoginPage {
    inputUsername(username){
        cy.logStep(`User input username: ${username}`)
        cy.get('[data-test="username"]', {timeout: 3000}).type(username)
    }
    inputPassword(password){
        cy.logStep(`User input password: ${password}`)
        cy.get('[data-test="password"]', {timeout: 3000}).type(password)
    }
    loginSubmit(){
        cy.logStep('User click login button')
        cy.get('[data-test="login-button"]', {timeout: 3000}).click()
    }
    loginAssertion(assertion){
        cy.logStep(`User should see: ${assertion}`)
        cy.contains(assertion, {timeout: 3000}).should('be.visible')
    }
}

export default LoginPage