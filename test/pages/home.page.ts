import BasePage from "./base.page";
import register from "../data/registration.json";
import { click, waitForDocumentToLoad, sendKeys } from "../shared/utils";


class HomePage extends BasePage{

    open = (): Promise<string> =>{
        return super.open('/demo.html');
    }

    get logo(){
        return $('img[src="demo/images/logo.png"]')
    }

    private get registrationForm(){
        return $('#load_box')
    }

    get registrationFormHeader(){
        return this.registrationForm
                    .$('h3=Dummy Registration Form')
    }

    private get nameTxtbox(){
        return $('input[name="name"]')
    }

    private get phoneTxtbox(){
        return $('input[name="phone"]')
    }

    private get emailTxtbox(){
        return $('input[name="email"')
    }
    
    private get countryCbobox(){
        return $('select[name="country"')
    }

    private get cityTxtbox(){
        return $('input[name="city"')
    }
    
    private get usernameTxtbox(){
        return this.registrationForm.$('input[name="username"]')
    }

    private get passwordTxtbox(){
        return this.registrationForm.$('input[name="password"]')
    }

    private get submitBtn(){
        return this.registrationForm.$('input.button[value="Submit"]')
    }

    get alertForm(){
        return $('#alert')
    }


    /**
     * @description
     * Fill out the registration form based from
     * the registration.json data 
     * See: test/data/registration.json
     */
    fillOutRegistrationForm = async ():Promise<void> => {

        //Handle Android and Hide keyboard when shown
        if(browser.isAndroid){ 
            if(await browser.isKeyboardShown()) await browser.hideKeyboard()
            await this.nameTxtbox.doubleClick()
        }

        await sendKeys(await this.nameTxtbox, register.name)
        await sendKeys(await this.phoneTxtbox, register.phone)
        await sendKeys(await this.emailTxtbox, register.email)
        await (await this.countryCbobox).selectByVisibleText(register.country)

        //Handle Android and Hide keyboard when shown
        if(browser.isAndroid){ 
            if(await browser.isKeyboardShown()) await browser.hideKeyboard()
            await this.nameTxtbox.doubleClick()
        }

        await sendKeys(await this.cityTxtbox, register.city)
        await sendKeys(await this.usernameTxtbox, register.username)
        await sendKeys(await this.passwordTxtbox, register.password)

        //Click Submit Button
        await click(await this.submitBtn)
    }


    goToLinkButton = async (
        text: string
    ): Promise<void> => {
        const element = await this.registrationForm.$(`=${text}`)

        await click(element)
        await waitForDocumentToLoad()
    }

    private get rightArrowBtn(){
        return $('.fas.fa-angle-right')
    }

    get carouselSection(){
        return $('.pp-info-box-carousel-wrap')
    }

    private get activeSlide(){
        return this.carouselSection
                    .$('.swiper-slide.swiper-slide-active')
    }

    private get infoBoxTitle(){
        return this.activeSlide
                    .$('.pp-info-box-title')
    }

    /**
     * @description
     * Slides the carousel until the desired course is in view
     * Clicks next slide rightArrowBtn (>)
     * @param {string} courseName Exact course text to be viewed
     */
    slideCourseIntoView = async (
        courseName: string
    ): Promise<void> => {

        //*RECURSIVE IMPLEMENTATION 
        /**
         * Below is the recursive implementation on slide course
         * Apparently, only runs smoothly on headless mode in chrome
         * Otherwise, it's working on other browser
         */
        const text =  await (await this.infoBoxTitle).getText()

        console.log("Infobar Title: " + text)

        if(text !== courseName){
            await (await this.rightArrowBtn).click()
            
            //Interval of  100ms before checking again
            await browser.pause(100)
            
            await this.slideCourseIntoView(courseName)
        }
    }

    get getStartedBtn(){
        return this.activeSlide.$('a')
    }

    get expandBtn(){
        return $('.fa.fa-chevron-down')
    }

    get lectureHeading(){
        return $('#lecture_heading')
    }

    startTopic = async (
        text: string
    ): Promise<void> => {
        const element = await $(`*=${text}`)

        await element.scrollIntoView({
                                        block: "end", 
                                        inline: "nearest", 
                                        behavior: "smooth"
                                    })

        await element.$('.lecture-start').click()
    }


    h2Element = (
        text: string
    ) => {
        return $(`h2*=${text}`)
    }

    h3Element = (
        text: string
    ) => {
        return $(`h3*=${text}`)
    }

    get activeProductPrice(){
        return $('.active .product-price .default-product-price')
    }

    get enrollCourseBtn(){
        return $('#enroll-button')
    }









    //===========================================

    // getActionNames1 = async () => {

    //     /**
    //      * For each linkbox get heading text .linkbox h1
    //      * And get h2 text list .linkbox li h2
    //      */

    //     let category = {};
    //     let actions = [];

    //     $$('.linkbox').forEach( async category => {
    //         //Get Category name
    //         const text = await category.$('h1').getText();

    //         console.log(text);

    //         await category.$$('li h2').forEach( async action =>{
    //             const text = await action.getText();

    //             console.log(text);

    //             actions.push(text);
    //         })

    //         category[text] = actions;
    //         actions = [];
    //     })
            
    //     console.log(category)


        
    // }


    // getActionNames = () => {

    //     /**
    //      * For each linkbox get heading text .linkbox h1
    //      * And get h2 text list .linkbox li h2
    //      */

    //     let category = {};
    //     let actions = [];

    //     $$('.linkbox').forEach( async category => {
    //         //Get Category name
    //         const text = await category.$('h1').getText();

    //         console.log("Category: " + text);

    //         category.$$('li h2').forEach( async action =>{
    //             const text = await action.getText();

    //             console.log("Actions: " + text);

    //             actions.push(text);
    //         }).then(() => {
    //             category[text] = actions;
    //             actions = [];
    //         })

            
    //     }).then(() => {
    //         console.log(category)
    //     })
    // }
}


export default new HomePage();