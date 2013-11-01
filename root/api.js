// Debug Global 
debug = true;

// Function to make a request to the URI specified in parameter 1
function apiRequest(dataObj)
{
	// Debug
	if (debug)
	{
		console.log(dataObj);
	}

	// Make request to API proxy
	responseObj = $.ajax(
	{
		url: "http://veda-mobile.zenfactory.org/proxy.php",
		async: false,
		data: dataObj
	});

	// Debug
	if (debug)
	{
		return responseObj;
	}

	// Check query status for success
	if (responseObj.status >= 200)
	{	
		return responseObj.responseText;
	}


}
