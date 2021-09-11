//the popup is what opens when you click the icon on the top right

chrome.runtime.sendMessage({
message:"get_name"
}, response => {
	if(response.message === 'success'){
		document.querySelector('div').innerHTML = `Hello ${response.payload}`;
	}
}

);