
class ContactScreen {

    get addBtn(){
        return $('~Create new contact')
    }

    get addAccountPopup(){
        return $('id=text')
    }

    get cancelAddAccountPopup(){
        return $('id=left_button')
    }

    get firstNameTxtbox(){
        return $('android=new UiSelector().text("First name")')
    }
}

export default new ContactScreen()