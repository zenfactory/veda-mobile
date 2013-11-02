<?php

#################################
# Includes / Defines
#################################

#################################
# Application Logic
#################################

# Sanity
if (isset($_REQUEST) && isset($_REQUEST['uri']) && !empty($_REQUEST['uri']) && isset($_REQUEST['method']) && !empty($_REQUEST['method']))
{
	# TODO: clean request vars

	# Instantiate new CURL interface object
	$ch = curl_init();

	# Set Curl request options
	curl_setopt($ch, CURLOPT_URL, "https://api.vedaproject.org{$_REQUEST['uri']}");
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0 );
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0 );
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	# Make curl request and get response
	$response = curl_exec($ch);

	# Dump response to client 
	exit($response);
}
