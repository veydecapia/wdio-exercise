import LoginScreen from '../../pages/loginScreen'



describe('Login Form', () => {

    beforeEach( async () => {
        //TODO: Open the app
        //Arrange
        await LoginScreen.usernameLbl.waitForDisplayed()
    });

    afterEach( async () => {
        //TODO: Close the app
        //Keycode for back button
        await browser.pressKeyCode(4)
    });
    
    it('Should login using a valid login', async () => {
        //Act
        await LoginScreen.submitLoginForm('Ted', '123')

        //Assert
        expect(LoginScreen.welcomeLbl).toBeDisplayedInViewport()
    });

    it('Should NOT login using invalid login', async() => {
        //Act
        await LoginScreen.submitLoginForm('Invalid', '123456789')

        //Assert
        expect(LoginScreen.alertLbl).toBeDisplayedInViewport()
        expect(LoginScreen.alertLbl).toHaveText('Invalid Credentials')
        
    });

    it('Should NOT login using invalid login - blank username and blank password', async () => {
        //Act
        await LoginScreen.submitLoginForm('', '')

        //Assert
        expect(LoginScreen.alertLbl).toBeDisplayedInViewport()
        expect(LoginScreen.alertLbl).toHaveText('Invalid Credentials')
    });


});