import HomePage from "../pages/home.page";
import data from "../data/exercise.data.json";
import homePage from "../pages/home.page";



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
        //TODO: Better to pass the input value instead
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


    it(`Scroll to ${data.headerText}`, async () => {
        const element = await $(`h2=${data.headerText}`)

        //Arrange
        await element.waitForDisplayed()

        //Act
        await element.scrollIntoView()

        //Assert
        expect(await element.isDisplayedInViewport()).toBe(true)
    });


    it(`Slide Carousel to view course ${data.courseName}`, async () => {
        //Arrange
        await HomePage.carouselSection.click()
        await HomePage.scrollCourseIntoView(data.courseName)

        //Act
        await HomePage.getStartedBtn.click()

        //Assert
        //TODO: Check why toHaveUrl negative test is not working
        expect(await browser.getUrl()).toBe(data.courseUrl)
    });


    it.only(`Should search for the topic ${data.topic}`, async () => {
        await browser.maximizeWindow()
        await browser.url('https://www.selenium-tutorial.com/p/automation-architect-in-selenium-7-live-projects')
        
        //Arrange
        await HomePage.expandBtnPerform()

        //Act
        await HomePage.startTopic(data.topic)

        //Assert
        expect((await HomePage.lectureHeading.getText()).trim())
                                        .toBe(data.topic);
    });
        
        
});