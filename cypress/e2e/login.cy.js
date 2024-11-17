import IndexPage from "../page_object/indexPage"
import LoginPage from "../page_object/loginPage"

const Login = new LoginPage()
const Index = new IndexPage()

const credential = {
  'valid-username': 'standard_user',
  'invalid-username': 'invalid_user',
  'valid-password': 'secret_sauce',
  'invalid-password': 'secreet_sauce',
  'empty-data': ' '
}

describe('User Login', () => {
  beforeEach('User Access Login Dashboard', () => {
    Index.visitDashboard()
  })
  it('Valid Credential - Test 01 - Hardy Aja', () => {
    Login.inputUsername(credential["valid-username"])
    Login.inputPassword(credential["valid-password"])
    Login.loginSubmit()
    Login.loginAssertion('Swag Labs')
  })
  it.skip('Invalid Credential - Test 01 - Hardy Aja', () => {
    Login.inputUsername(credential["valid-username"])
    Login.inputPassword(credential["invalid-password"])
    Login.loginSubmit()
    Login.loginAssertion('Epic sadfacse: Username and password do not match any user in this service')
  })
  it('Empty Credential - Test 01 - Hardy Aja', () => {
    Login.inputUsername(credential["empty-data"])
    Login.inputPassword(credential["empty-data"])
    Login.loginSubmit()
    Login.loginAssertion('Epic sadface: Username and password do not match any user in this service')
  })
})