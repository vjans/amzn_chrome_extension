chrome.runtime.onInstalled.addListener(()=>{
	chrome.storage.local.set({
		name: "Jack"
	});
});


//listener for current tab to inject foregorund js into page

/*
function check_if_product_page(){
	return document.documentElement.outerHTML.contains("exports_desktop_qualifiedBuybox_buyNow_feature_div");
}
function is_product_page(tab){
	console.log(document);
	return true;
}

*/



chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) =>{
	if(changeInfo.status === 'complete' && /^http/.test(tab.url)){
		if(true){ //document.documentElement.outerHTML.contains("exports_desktop_qualifiedBuybox_buyNow_feature_div")
			console.log("AI YA YAY");
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

		}else{
			console.log("You're fired bud");
		}
		
		

	}

});

/*
chrome.runtime.sendMessage() => send message to all scripts
chrome.tabs.sendMessage() => send script to tab in foreground
*/





chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
	if(request.message === 'get_product'){
		chrome.storage.local.get('products', data => {
			if(chrome.runtime.lastError){
				sendResponse({
					message: 'fail'
				});
				return;
			}
			sendResponse({
				message: 'success',
				payload: data
			});
		});
		return true;
	}else if (request.message === 'save_product'){

		//gets local storage dict, adds product to it and then saves it
		//idk any better way to do this 
		//js sucks
		//help

		//todo: add check for duplicates

		//get all products from local storage and save in res
		chrome.storage.local.get('products', function(result){
			var res = result.products; 
			var id = Math.random().toString(36).substr(2, 5);
			//add payload to dictionary (with random id)
			res[id] = request.payload;
			//update google storage
			console.log("DICT AFTER ADD:");
			console.log(res);
		

			chrome.storage.local.set(
			{"products":res},
			() => {
				if(chrome.runtime.lastError){
					sendResponse({message:'fail'});return;
				}
				
				sendResponse({message:'success'});
			});

		});

		
		return true;
	}
});
