// Debug Global 
debug = false;

/////////////////////////////////
// Defines / Includes
/////////////////////////////////

// Constants
restServices = new Object();
//restServices.uri = "/data/material/";
restServices.uri = "/data/material/CHW_Training/";

// Instantiate quiz uri list container
quizPaths = new Array();

/////////////////////////////////
// Application Member Functions 
/////////////////////////////////

// Function to make a request to the URI 
// Paramaters: 
// 	- dataObj: 
//				must include 
//					the uri of the request
//				may also include:
//					the request method, defaults to GET	
//					quiz answer data
function apiRequest(uri, method, data)
{
	// Debug
	debugOut(dataObj);

	var dataObj = new Object();
	dataObj.uri = uri;
	dataObj.method = method;

	// Make request to API proxy
	responseObj = $.ajax(
	{
		url: "http://veda-mobile.zenfactory.org/proxy.php",
		async: false,
		data: dataObj
	});

	// Debug
	debugOut(responseObj);

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

// Debug Function (writes to browser console)
function debugOut(data)
{
	if (debug)
	{
		console.log(data)
	}
}

// Non conditional debug output
function dbo(data)
{
	console.log(data);
}

function getUris(restServiceUri)
{
	var response = apiRequest(restServiceUri, "GET")
	if (typeof(response) != "undefined" && typeof(response.children) != "undefined" && parseInt(response.children.length, 10) >= 1)
	{
		for (var x in response.children)
		{
			if (typeof(response.children[x].path) != "undefined")
			{
				var responseUriArray = response.children[x].path.split('/');
				if (responseUriArray.length != "10")
				{
					getUris(response.children[x].path);
				}
				else
				{
					quizPaths.push(buildQuizUri(response.children[x].path.split('/')));
				}
			}
		}
	}
}

function buildQuizUri(contentArray)
{
	var ndx = parseInt(contentArray.length, 10) - parseInt(2, 10);
	contentArray[ndx] = "quiz";
	contentArray.pop();

	// Instantiate quiz uri string
	var quizUri = "/";

	// Loop through the uri components and rebuild the uri
	for (var x in contentArray)
	{
		if (x != 0)
		{
			quizUri += contentArray[x] + "/";
		}
	}

	return quizUri;
}

/////////////////////////////////
// Application Logic
/////////////////////////////////

// Pull all the quiz URI's
//getUris(restServices.uri);

// Instantiate quiz data object
//var quizData = new Object();

// Loop through the quiz uri's
//for (var x in quizPaths)
//{
	//var sectionData = apiRequest(quizPaths[x], "GET");
	//quizData[x] = sectionData;
//}
