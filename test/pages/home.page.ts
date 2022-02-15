import BasePage from "./base.page";
import register from "../data/registration.json";


class HomePage extends BasePage{

    open = (): Promise<string> =>{
        return super.open('/demo.html');
    }

    get logo(){
        return $('img[src="demo/images/logo.png"]')
    }
    
    button = (buttonText: string) => {
        return $(`h2=${buttonText}`)
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

    get alert(){
        return $('#alert')
    }

    /**
     * Fill out the registration form based from
     * the registration.json data See test/data/registration.json
     */
    fillOutRegistrationForm = async () => {
        await this.nameTxtbox.setValue(register.name)
        await this.phoneTxtbox.setValue(register.phone)
        await this.emailTxtbox.setValue(register.email)
        await this.countryCbobox.selectByVisibleText(register.country)
        await this.cityTxtbox.setValue(register.city)
        await this.usernameTxtbox.setValue(register.username)
        await this.passwordTxtbox.setValue(register.password)
        
        //Click Submit Button
        await this.submitBtn.waitForClickable();
        await this.submitBtn.click()
    }

    

    getActionNames1 = async () => {

        /**
         * For each linkbox get heading text .linkbox h1
         * And get h2 text list .linkbox li h2
         */

        let category = {};
        let actions = [];

        $$('.linkbox').forEach( async category => {
            //Get Category name
            const text = await category.$('h1').getText();

            console.log(text);

            await category.$$('li h2').forEach( async action =>{
                const text = await action.getText();

                console.log(text);

                actions.push(text);
            })

            category[text] = actions;
            actions = [];
        })
            
        console.log(category)


        
    }


    getActionNames = () => {

        /**
         * For each linkbox get heading text .linkbox h1
         * And get h2 text list .linkbox li h2
         */

        let category = {};
        let actions = [];

        $$('.linkbox').forEach( async category => {
            //Get Category name
            const text = await category.$('h1').getText();

            console.log("Category: " + text);

            category.$$('li h2').forEach( async action =>{
                const text = await action.getText();

                console.log("Actions: " + text);

                actions.push(text);
            }).then(() => {
                category[text] = actions;
                actions = [];
            })

            
        }).then(() => {
            console.log(category)
        })
            
        


        
    }
}


export default new HomePage();