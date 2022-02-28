import ContactScreen from "../../pages/contactScreen";


describe('Android Native Contact App', () => {

    beforeEach(() => {
        //TODO: Close the app if open, then open the app - FULL RESET
    });


    it('should load the contacts native app', async () => {
        
        //Assert
        expect(await ContactScreen.contactsLbl).toBeDisplayedInViewport()
        expect(await ContactScreen.addBtn).toBeDisplayedInViewport()
    });

    it.only('should add new contact', async () => {
        //Act
        await (await ContactScreen.addBtn).click()
        if(await ContactScreen.addAccountPopup.isDisplayed()){
            await ContactScreen.addAccountCancenBtn.click()
        }

        //Assert
        expect(await ContactScreen.firstNameTxtbox).toBeDisplayedInViewport()

        //TEST
        await (await ContactScreen.firstNameTxtbox).setValue('Satoshi')
        await (await ContactScreen.lastNameTxtbox).setValue('Nakamoto')

        await browser.hideKeyboard()

        expect(await ContactScreen.firstNameTxtbox).toHaveValue('Satoshi')
        expect(await ContactScreen.lastNameTxtbox).toHaveValue('Nakamoto')

    });
});