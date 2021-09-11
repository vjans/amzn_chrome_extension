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

			console.log("INJECTED FOREGROUND CSS.")

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

/*
chrome.runtime.sendMessage() => send message to all scripts
chrome.tabs.sendMessage() => send script to tab in foreground
*/

chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
	if(request.message === 'get_name'){
		chrome.storage.local.get('name', data => {
			if(chrome.runtime.lastError){
				sendResponse({
					message: 'fail'
				});
				return;
			}
			sendResponse({
				message: 'success',
				payload: data.name
			});
		});
		return true;
	} else if (request.message === 'change_name'){
		chrome.storage.local.set(
			{name:request.payload},
			() => {
				if(chrome.runtime.lastError){
					sendResponse({message:'fail'});return;
				}
				
				sendResponse({message:'success'});
			});
		return true;
	}
});
