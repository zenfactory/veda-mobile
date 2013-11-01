// Debug Global 
debug = false;

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
		return responseObj
	}

	// Check query status for success
	if (responseObj.status >= 200)
	{
		// Turn the response text into a json object before returning it 	
		var responseObj = $.parseJSON(responseObj.responseText);
		return responseObj;
	}
	else
	{
		// Return error status
		return responseObj.status
		
	}


}
