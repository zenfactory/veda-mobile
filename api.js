// Debug Global 
debug = false;

// Define Constants 
restServices = new Object();
restServices.uri = "/data/material/";


// Function to make a request to the URI 
// Paramaters: 
// 	- dataObj: 
//				must include 
//					the uri of the request
//				may also include:
//					the request method, defaults to GET	
//					quiz answer data
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

var dataObj = new Object();                                                                                                                                                 
dataObj.uri = "/data/material/CHW_Training/CHW_Training/CHW_Overview/CHW_Overview/CHW_Overview/quiz";
dataObj.method = "GET";
response = apiRequest(dataObj);
console.log(response);

