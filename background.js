chrome.runtime.onInstalled.addListener(()=>{
	chrome.storage.local.set({
		name: "Jack"
	});
});

chrome.storage.local.get('name',data=>{

});


//listener for current tab to inject foregorund js into page

chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) =>{
	if(changeInfo.status === 'complete' && /^http/.test(tab.url)){
		chrome.scripting.insertCSS({
			target:{tabId:tabId},
			files: ["./foreground_styles.css"]
		}).then(()=>{

			chrome.scripting.executeScript({
						target: {tabId: tabId},
						files: ["./foreground.js"]
					})
						.then(()=>{

							console.log("INJECTED FOREGROUND SCRIPT.");

						}).catch(err => console.log(err));


		});
		

	}

});