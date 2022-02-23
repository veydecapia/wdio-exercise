
class LoginScreen {


    get usernameLbl(){
        return $('id=userNameLabel')
    }

    private get usernameTxtbox(){
        return $('id=userNameField')
    }

    private get passwordTxtbox(){
        return $('id=passwordField')
    }

    private get loginBtn(){
        return $('id=loginButton')
    }

    get welcomeLbl(){
        return $('id=welcomeLabel')
    }

    get alertLbl(){
        return $('id=alertTitle')
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
        // await sendKeys(await this.usernameTxtbox, username)
        // await sendKeys(await this.passwordTxtbox, password)
        await this.usernameTxtbox.setValue(username)
        await this.passwordTxtbox.setValue(password)


        //Only works on Android for now as per the documentation
        await browser.hideKeyboard()
        await this.loginBtn.click()
    }

    
    
}


export default new LoginScreen()