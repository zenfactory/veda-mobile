<?php

############################
# Helper functions
############################

# Function to do basic sanity check
function sanity(&$var)
{
	# Do sanity check
	if (isset($var) && !empty($var))
	{
		# Return sane
		return true;
	}

	# Return unset / insane 
	return false;
}
