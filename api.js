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

getUris(restServices.uri);
dbo(quizPaths);

/*
// Instantiate new data object
var dataObj = new Object();                                                                                                                                                 

// Define uri to get sections from
dataObj.uri = restServices.uri;

// Define the request method (defaults to get)
dataObj.method = "GET";

// Make the request
var response = apiRequest(restServices.uri, "GET");

// Dump request to browser
debugOut(response);

// Instantiate quiz uri list container
var quizUris = new Array();

// Loop through the response's "children" object
for (var x in response.children)
{
	// Dump debug to browser
	debugOut(x);
	debugOut(response.children[x]);

	// Find the CHW Training data child
	if (response.children[x].name == "CHW Training")
	{
		// Dump debug to browser
		debugOut(response.children[x].path);

		// Define the URI of the course we need data for 
		var courseUri = response.children[x].path;

		// Make request
		var courseResponse = apiRequest(response.children[x].path, "GET")

		// dump debug to browser
		debugOut(courseResponse);

		// Loop through course response children 
		for (var x in courseResponse.children)
		{
			// Dump debug to browser
			debugOut(courseResponse.children[x]);
		
			// Check that we are working with an active module
			if (courseResponse.children[x].name == "CHW Training")
			{
				var chapterResponse = apiRequest(courseResponse.children[x].path, "GET");

				// Dump debug to browser
				debugOut(chapterResponse);

				// Loop through subjects 
				for (var x in chapterResponse.children)
				{
					// Dump debug to browser
					debugOut(chapterResponse.children[x].path);
					var chapterDataResponse = apiRequest(chapterResponse.children[x].path, "GET");

					// Dump debug to browser
					debugOut(chapterDataResponse);

					// Loop through courses 
					for (var x in chapterDataResponse.children)
					{
						// Dump debug to browser
						debugOut(chapterDataResponse.children[x]);
						var sectionResponse = apiRequest(chapterDataResponse.children[x].path, "GET");

						// Dump debug to browser
						debugOut(sectionResponse)

						// Loop through lesson object
						for (var x in sectionResponse.children)
						{
							var quizDataUriArray = sectionResponse.children[x].path.split('/');
							var ndx = parseInt(quizDataUriArray.length, 10) - parseInt(2, 10);
							quizDataUriArray[ndx] = "quiz";
							quizDataUriArray.pop();

							// Dump debug to browser
							debugOut(quizDataUriArray);

							// Instantiate quiz uri string
							var quizUri = "/";


							// Loop through the uri components and rebuild the uri
							for (var x in quizDataUriArray)
							{
								if (x != 0)
								{
									quizUri += quizDataUriArray[x] + "/";
								}

								// Dump debug to browser
								debugOut(quizUri);
							
							}
							quizUris.push(quizUri);
						}
					}
				}
			}
		}
	}
}

// Dump debug to browser
debugOut(quizUris);
*/
