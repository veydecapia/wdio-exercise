import ContactScreen from "../../pages/contactScreen";


describe('Android Native Contact App', () => {
    
    it('should add new contact', async () => {
        //Act
        await (await ContactScreen.addBtn).click()
        
        if(await ContactScreen.addAccountPopup.isDisplayed()){
            await ContactScreen.cancelAddAccountPopup.click()
        }

        //Assert
        expect(await ContactScreen.firstNameTxtbox).toBeDisplayedInViewport()
    });
});