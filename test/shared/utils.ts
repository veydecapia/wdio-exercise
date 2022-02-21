const DOCUMENT_READY_STATE = {
    COMPLETE: 'complete',
    INTERACTIVE: 'interactive',
    LOADING: 'loading',
};


export const waitForDocumentToLoad = async (): Promise<void> => {
    await browser.waitUntil( 
        async () => (await browser.execute(() => 
                document.readyState) === DOCUMENT_READY_STATE.COMPLETE),
            {
                timeout: 30000,
                timeoutMsg: 'Page unable to load successfully!'
            })
}


export const click = async (
    element:  WebdriverIO.Element,
    timeout?: number
): Promise<void> => {
    await element
            .waitForDisplayed({
                timeout: timeout,
                timeoutMsg: 'Element not Displayed!'
            })

    await element
            .scrollIntoView({
               block: "end", 
               inline: "nearest", 
               behavior: "smooth"
           })

    await element
            .waitForClickable({
                timeout: timeout,
                timeoutMsg: 'Element not Clickable!'
            })

    await element.click()
}



export const sendKeys = async (
    element: WebdriverIO.Element,
    text: string,
    timeout?: number
): Promise<void> => {

    if(browser.isAndroid){ 
        // if(await browser.isKeyboardShown()) await browser.hideKeyboard()
        // await element.doubleClick()
        await browser.touchAction({action: 'moveTo', element: element})
        await browser.touchAction({action: 'tap', element: element})
    }

    await element
        .waitForDisplayed({
            timeout: timeout,
            timeoutMsg: 'Element not Displayed!'
        })

    await element
        .scrollIntoView({
            block: "end", 
            inline: "nearest", 
            behavior: "smooth"
        })

    await element
        .waitForEnabled({
            timeout: timeout,
            timeoutMsg: 'Element is Disabled!'
        })

    //TODO: Add wait until isDisplayedInViewPort?
    await element.setValue(text)
}