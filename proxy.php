<?php

#################################
# Includes / Defines
#################################
DEFINE("API_HOST", "https://api.vedaproject.org");
require_once("Api.php");

#################################
# Application Logic
#################################

# Sanity
if (isset($_REQUEST) && isset($_REQUEST['uri']) && !empty($_REQUEST['uri']) && isset($_REQUEST['method']) && !empty($_REQUEST['method']))
{
	# Instantiate new API interface object
	$api = new Api();

	# Set data type 
	$api->setDataType("json");

	# Set data type 
	$api->setUri($_REQUEST['uri']);

	# Make request to API Server
	$response = $api->makeRequest();

	# Dump response to client 
	exit(json_encode($response));
}
