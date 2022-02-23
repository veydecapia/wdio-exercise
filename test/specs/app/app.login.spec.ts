import loginScreen from '../../pages/loginScreen';
import LoginScreen from '../../pages/loginScreen'



describe('Login Form', () => {
    
    it('Should login using a valid login', async () => {
        //Arrange
        await LoginScreen.usernameLbl.waitForDisplayed()

        //Act
        await LoginScreen.submitLoginForm('Ted', '123')

        //Assert
        expect(LoginScreen.welcomeLbl).toBeDisplayedInViewport()
    });

    it('Should NOT login using invalid login', () => {
        //Arrange
        
        //Act

        //Assert
        
    });

    it('Should NOT login using invalid login - blank username and blank password', () => {
        //Arrange
        
        //Act

        //Assert
        
    });


});