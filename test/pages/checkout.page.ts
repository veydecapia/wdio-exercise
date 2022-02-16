import BasePage from "./base.page";


class CheckoutPage extends BasePage{

    get orderSummaryText(){
        return $('span=Order Summary')
    }

    get emailTxtbox(){
        return $('#email')
    }

    get nameTxtbox(){
        return $('#username')
    }

    get cardNameTxtbox(){
        return $('#cardName')
    }

    get cardDetailsiFrame(){
        return $('iframe[title="Secure card number input frame"]')
    }

    //This object is within an iFrame
    get cardNumberTxtbox(){
        return $('input[name="cardnumber"]')
    }

    get cardNumberAlert(){
        return $('#cardNumber')
                        .nextElement()
                        .$('[role="alert"]')
    }

    get expirationDateiFrame(){
        return $('iframe[title="Secure expiration date input frame"]')
    }

    get cardExpireTxtbox(){
        return $('input[name="exp-date"]')
    }

    get cardExpireAlert(){
        return $('#cardExpiration')
                            .nextElement()
                            .$('[role="alert"]')
    }


    get cvciFrame(){
        return $('iframe[title="Secure CVC input frame"]')
    }

    get cvcTxtbox(){
        return $('input[name="cvc"]')
    }

    get cvcAlert(){
        return $('#cardCvc')
                            .nextElement()
                            .$('[role="alert"]')
    }


    get streetAddressTxtbox(){
        return $('#billingStreetAddressLine1')
    }

    get cityTxtbox(){
        return $('#billingCity')
    }

    get postalCodeTxtbox(){
        return $('#billingPostalCode')
    }
    


    alertRequired = (
        element: WebdriverIO.Element
    ) => {
        return element.parentElement()
                        .nextElement()
                        .$('[role="alert"]')
    }

    isAlertDisplayed = async (
        element: WebdriverIO.Element
    ): Promise<boolean> => {
        const alert = await this.alertRequired(element)
        return await alert.isDisplayed()
    }


}

export default new CheckoutPage();