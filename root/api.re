// Debug Global 
debug = true;

// Function to make a request to the URI specified in parameter 1
function apiRequest(uri, method, dataObj)
{

	// Add URI to data object
	dataObj.uri = uri;

	// Make request to API proxy
	responseObj = $.ajax(
	{
		type: method,
		data: dataObj,
		url: "proxy.php/"+uri,
	});

	// Debug
	if (debug)
	{
		console.log(responseObj);
	}
}
