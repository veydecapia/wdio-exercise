

class LoginScreen {


    get usernameLbl(){
        return $('id=com.magenic.appiumtesting.maqsregistrydemo:id/userNameLabel')
    }

    private get usernameTxtbox(){
        return $('id=com.magenic.appiumtesting.maqsregistrydemo:id/userNameField')
    }

    private get passwordTxtbox(){
        return $('id:com.magenic.appiumtesting.maqsregistrydemo:id/passwordField')
    }

    private get loginBtn(){
        return $('id:com.magenic.appiumtesting.maqsregistrydemo:id/loginButton')
    }

    get welcomeLbl(){
        return $('id:com.magenic.appiumtesting.maqsregistrydemo:id/welcomeLabel')
    }

    /**
     * Logins to the DEMO MAQS mobile application 
     * using a username and a password.
     * @param {string} username
     * @param {string} password 
     */
    submitLoginForm = async (
        username: string,
        password: string
    ) => {
        await this.usernameTxtbox.setValue(username)
        await this.passwordTxtbox.setValue(password)

        //Only works on Android for now as per the documentation
        await browser.hideKeyboard()
        await this.loginBtn.click()
    }

    
    
}


export default new LoginScreen()