


export const waitForPageToLoad = async (): Promise<void> => {
    await browser.waitUntil(() => 
            browser.execute(() => 
                document.readyState === 'complete'),
       {
           timeout: 30000,
           timeoutMsg: 'Page unable to load successfully!'
       })
}