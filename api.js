// Function to make a request to the URI specified in parameter 1
function apiRequest(uri, method, dataObj, successCallBack, failureCallback)
{
	responseObj = $.ajax(
	{
		type: method,
		data: dataObj,
		url: uri,
	});

	console.log(responseObj);
}
