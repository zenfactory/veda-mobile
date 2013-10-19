<?php

#################################
# Includes / Defines
#################################
require_once("Api.php");
DEFINE("API_HOST", "api.vedaproject.org");

#################################
# Application Logic
#################################

# Sanity
if (isset($_REQUEST) && isset($_REQUEST['requestObj']) && !empty($_REQUEST['requestObj']))
{
	# Extract Request Object from PHP's global $_REQUEST variable
	$requestObj = $_REQUEST['requestObj'];

	# Sanity
	if (isset($requestObj->uri) && !empty($requestObj->uri))
	{
	}

	# Instantiate new API interface object
	$api = new API();

	$api->setUri
}
