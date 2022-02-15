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
        // await HomePage.getActionNames()
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
        //Act
        await HomePage.fillOutRegistrationForm()
        await HomePage.alert.waitForDisplayed()
        
        //Assert
        expect(await HomePage.alert.getText())
        .toBe(data.alertText)
    });
    
    
    it('Go to Explore Lifetime Membership Page', async () => {
        //Act
        await HomePage.goToLinkButton('EXPLORE LIFETIME MEMBERSHIP');

        //Assert
        expect(browser).toHaveUrlContaining('lifetime-membership-club')
        expect(browser).toHaveTitleContaining('Lifetime Membership Club')
    });

    it.only(`Scroll to ${data.headerText}`, async () => {
        await browser.maximizeWindow()
        await browser.url('/lifetime-membership-club/')

        const element = $(`h2=${data.headerText}`)

        //Arrange
        await element.waitForDisplayed()

        //Act
        await element.scrollIntoView()

        //Assert
        expect(await element.isDisplayedInViewport()).toBe(true)
    });

    it.only(`Slide Carousel to view course ${data.courseName}`, async () => {
        //Arrange
        await HomePage.carouselSection.click()
        await HomePage.scrollCourseIntoView(data.courseName)

        //Act
        await HomePage.getStartedBtn.click()

        //Assert
        expect(browser).toHaveUrl(data.courseUrl)
    });
        
        
});