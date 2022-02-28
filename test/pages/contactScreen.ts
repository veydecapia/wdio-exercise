
class ContactScreen {

    get addBtn(){
        return $('~Create new contact')
    }

    get addAccountPopup(){
        return $('id=text')
    }

    get addAccountCancenBtn(){
        return $('id=left_button')
    }

    get contactsLbl(){
        return $('android=new UiSelector().text("Contacts")')
    }

    get firstNameTxtbox(){
        return $('android=new UiSelector().text("First name")')
    }

    get lastNameTxtbox(){
        return $('android=new UiSelector().text("Last name")')
    }
}

export default new ContactScreen()