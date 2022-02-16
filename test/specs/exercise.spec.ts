import HomePage from "../pages/home.page";
import data from "../data/exercise.data.json";
import { waitForPageToLoad } from "../shared/utils";


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


    it(`Should search for the topic ${data.topic}`, async () => {
        //Arrange
        await HomePage.expandBtnPerform()

        //Act
        await HomePage.startTopic(data.topic)
        await waitForPageToLoad()
        await HomePage.lectureHeading.waitForDisplayed()

        //Assert
        const text = (await HomePage.lectureHeading.getText()).trim()
        expect(text).toBe(data.topic)
    });


    it('Should navigate back to previous page', async () => {
        //Act
        await browser.back()

        //Act
        await browser.back()
        await waitForPageToLoad()
        await (await HomePage.h2Element("Get started now!")).waitForDisplayed()

        //Assert
        expect(await browser.getUrl()).toBe(data.courseUrl)
    });


    it(`Should select ${data.currency}`, async () => {
        //Act
        const element = await HomePage.h3Element(data.currency)
        await element.scrollIntoView({
            block: "end", 
            inline: "nearest", 
            behavior: "smooth"
        })
        await element.click()

        //Assert
        const priceText = await HomePage.activeProductPrice.getText()
        expect(priceText).toBe('£15')
    });


    it('Should enroll in course', async () => {
        //Act
        await HomePage.enrollCourseBtn.click()

        //Assert
        const expectedText = 'Processing...'
        await browser.waitUntil(
           async () => (await HomePage.enrollCourseBtn.getText() === expectedText),
           {
               timeout: 3000,
               timeoutMsg: `Expected text to be changed to ${expectedText}`
           }
        )

        const text = await HomePage.enrollCourseBtn.getText()
        expect(text).toBe(expectedText)
        expect(await HomePage.enrollCourseBtn.isEnabled()).toBe(false)
        
        await waitForPageToLoad()
        expect(browser).toHaveUrlContaining('checkout')
    });


    describe.only('Checkout - Verify Required Error', () => {
        it('Email', () => {
            browser.maximizeWindow()
            browser.url('https://sso.teachable.com/secure/673/checkout/1310108/automation-architect-in-selenium-7-live-projects')

            
        });

    });
        
        
});