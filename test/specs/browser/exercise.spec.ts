import HomePage from "../../pages/home.page";
import data from "../../data/exercise.data.json";
import CheckoutPage from "../../pages/checkout.page";
import { click, sendKeys, waitForDocumentToLoad } from "../../shared/utils";
import fs from 'fs';



describe('Search and Enroll Course', () => {

    it('Should navigate to the demo page', async () => {
        //Act
        await HomePage.open()
        await waitForDocumentToLoad()

        //Assert
        expect(browser).toHaveUrlContaining('demo.html')
        expect(browser).toHaveTitle('Welcome')
        expect(await HomePage.logo).toBeDisplayed()
    });


    it('Should list all Action name', async () => {
        //Arrange
        //TODO: Delete the actionNames.json file first
        let obj = await HomePage.getActionNames()

        //Act: Write to file
        fs.writeFile('./results/actionNames.json', 
                        JSON.stringify(obj, null, 4), (err) => {
            if(err){
                return console.error(err)
            }
        });

        //Assert
        //TODO: Add assertion. Verify if the file is created.
    });


    it(`Should retrieve the link from ${data.buttonName} and visit`,
         async () => {
        //Arrange: Get the link from the button
        const link = await HomePage.h2Element(data.buttonName)
                                .parentElement()
                                .getAttribute('href')
       
        //Act: Visit the link
        await browser.url(link)

        //Assert
        expect(link).toContain(data.url)
        expect(browser).toHaveUrlContaining('way2auto_jquery')
        
        //Check Dummy Registration Form if visible
        expect(await HomePage.registrationFormHeader).toBeDisplayed()
    });


    it('Should fill out registration form', async () => {
        //Act
        //TODO: Better to pass the input value instead
        await HomePage.fillOutRegistrationForm()
        await HomePage.alertForm.waitForDisplayed()
        
        //Assert
        expect(await HomePage.alertForm).toHaveText(data.alertText)
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
        expect(element).toBeDisplayedInViewport()
    });

    //TODO: Only runs smoothly when ran on headless chrome and firefox
    it(`Slide Carousel to view course: ${data.courseName}`, async () => {
        //Arrange
        await click(await HomePage.carouselSection)
        await HomePage.slideCourseIntoView(data.courseName)
        
        //Act
        await click(await HomePage.getStartedBtn)

        //Assert
        expect(browser).toHaveUrl(data.courseUrl)
    });


    it(`Should search for the topic ${data.topic}`, async () => {
        //Arrange
        await click(await HomePage.expandBtn)

        //Act
        await HomePage.startTopic(data.topic)
        await waitForDocumentToLoad()
        await (await HomePage.lectureHeading).waitForDisplayed()

        //Assert
        expect(await HomePage.lectureHeading).toHaveText(data.topic)
    });


    it('Should navigate back to previous page', async () => {
        //Act: First back will result to scrolling upo
        await browser.back()

        //Act: Second back will go back to the previous page
        await browser.back()
        await waitForDocumentToLoad()
        await (await HomePage.h2Element("Get started now!"))
                                        .waitForDisplayed()

        //Assert
        expect(browser).toHaveUrl(data.courseUrl)
    });


    it(`Should select ${data.currency}`, async () => {
        //Act
        const element = await HomePage.h3Element(data.currency)
        await element.scrollIntoView({
            block: "end", 
            inline: "nearest", 
            behavior: "smooth"
        })
        await click(element)

        //Assert
        expect(await HomePage.activeProductPrice).toHaveText('£15')
    });


    it('Should enroll in course', async () => {
        //Act
        await click(await HomePage.enrollCourseBtn)

        const expectedText = 'Processing...'
        await browser.waitUntil(
           async () => (await (await HomePage.enrollCourseBtn)
                                    .getText() === expectedText),
           {
               timeout: 3000,
               timeoutMsg: `Expected text to be changed to ${expectedText}`
           }
        )

        //Assert
        expect(await HomePage.enrollCourseBtn).toHaveText(expectedText)
        expect(await HomePage.enrollCourseBtn).toBeEnabled()
        
        await waitForDocumentToLoad()
        expect(browser).toHaveUrlContaining('checkout')

        await CheckoutPage.orderSummaryText.waitForDisplayed()
        expect(await CheckoutPage.orderSummaryText).toBeDisplayed()
    });


    describe('Checkout - Verify Required Error', async () => {

        it('Email', async () => {
            const element = await CheckoutPage.emailTxtbox
            const blurElement = await CheckoutPage.orderSummaryText

            //Act
            await click(element)
            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.isAlertDisplayed(element)).toBe(true)
            expect(await CheckoutPage.alertRequired(element)).toHaveText('Cannot be blank')
        });

        it('Name', async () => {
            const element = await CheckoutPage.nameTxtbox
            const blurElement = await CheckoutPage.emailTxtbox

            //Act
            await click(element)
            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.isAlertDisplayed(element)).toBe(true)
            expect(await CheckoutPage.alertRequired(element)).toHaveText('Cannot be blank')
        });

        it('Card Name', async () => {
            const element = await CheckoutPage.cardNameTxtbox
            const blurElement = await CheckoutPage.nameTxtbox

            //Act
            await click(element)
            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.isAlertDisplayed(element)).toBe(true)
            expect(await CheckoutPage.alertRequired(element)).toHaveText('Cannot be blank')
        });

        it('Card Number', async () => {
            //Switch to iFrame
            await browser.switchToFrame(await CheckoutPage.cardDetailsiFrame)
            const element = await CheckoutPage.cardNumberTxtbox
            
            //Act
            await sendKeys(element, '')
            // await element.clearValue() //TODO: Textbox not clearing

            //Switch to default frame
            await browser.switchToFrame(null) //OR we can use switchToParentFrame
            const blurElement = await CheckoutPage.nameTxtbox

            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.cardNumberAlert.isDisplayed()).toBe(true)
            expect(await CheckoutPage.cardNumberAlert).toHaveText('Cannot be blank')
        });

        it('Expiration Date', async () => {
            //Switch to iFrame
            await browser.switchToFrame(await CheckoutPage.expirationDateiFrame)
            const element = await CheckoutPage.cardExpireTxtbox
            
            //Act
            await sendKeys(element, '')

            //Switch to default frame
            await browser.switchToFrame(null) //OR we can use switchToParentFrame
            const blurElement = await CheckoutPage.nameTxtbox

            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.cardExpireAlert.isDisplayed()).toBe(true)
            expect(await CheckoutPage.cardExpireAlert).toHaveText('Cannot be blank')
        });


        it('CVC', async () => {
            //Switch to iFrame
            await browser.switchToFrame(await CheckoutPage.cvciFrame)
            const element = await CheckoutPage.cvcTxtbox
            
            //Act
            await sendKeys(element, '')

            //Switch to default frame
            await browser.switchToFrame(null) //OR we can use switchToParentFrame
            const blurElement = await CheckoutPage.nameTxtbox

            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.cvcAlert.isDisplayed()).toBe(true)
            expect(await CheckoutPage.cvcAlert).toHaveText('Cannot be blank')
        });


        it('Street Address', async () => {
            const element = await CheckoutPage.streetAddressTxtbox
            const blurElement = await CheckoutPage.cardNameTxtbox

            //Act
            await click(element)
            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.isAlertDisplayed(element)).toBe(true)
            expect(await CheckoutPage.alertRequired(element)).toHaveText('Cannot be blank')
        });


        it('City', async () => {
            const element = await CheckoutPage.cityTxtbox
            const blurElement = await CheckoutPage.cardNameTxtbox

            //Act
            await click(element)
            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.isAlertDisplayed(element)).toBe(true)
            expect(await CheckoutPage.alertRequired(element)).toHaveText('Cannot be blank')
        });


        it('Postal Code', async () => {
            const element = await CheckoutPage.postalCodeTxtbox
            const blurElement = await CheckoutPage.cardNameTxtbox

            //Act
            await click(element)
            //Blur
            await click(blurElement)

            //Assert
            expect(await CheckoutPage.isAlertDisplayed(element)).toBe(true)
            expect(await CheckoutPage.alertRequired(element)).toHaveText('Cannot be blank')
        });

    });
        
        
});