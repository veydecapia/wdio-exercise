import HomePage from "../pages/home.page";
import data from "../data/exercise.data.json";



describe('Search and Enroll Course', () => {

    it('Should navigate to the demo page', async () => {
        //Arrange
        await HomePage.open()

        //Assert
        expect(browser).toHaveUrlContaining('demo.html')
        expect(browser).toHaveTitle('Welcome')

        expect(await HomePage.logo.isDisplayed()).toBe(true)
    });

    it.skip('Should list all Action name', async () => {
        await HomePage.getActionNames()
    });


    it(`Should retrieve the link from ${data.buttonName} 
                        and visit`, async () => {
        //Arrange: Get the link from the button
        const link = await HomePage.button(data.buttonName)
                                .parentElement()
                                .getAttribute('href')
       
        //Act: Visit the link
        await browser.url(link)
        

        //Assert
        expect(link).toBe(data.url)
        expect(browser).toHaveUrlContaining('way2auto_jquery')
        
        //Check Dummy Registration Form if visible
        expect(await HomePage.registrationFormHeader
                                .isDisplayed()).toBe(true)
                                
    });


    it('Should fill out registration form', async () => {
        // await browser.url('/way2auto_jquery/index.php')

        //Act
        await HomePage.fillOutRegistrationForm()
        await HomePage.alert.waitForDisplayed()

        //Assert
        expect(await HomePage.alert.getText())
                                .toBe(data.alertText)
    });
        
        
});