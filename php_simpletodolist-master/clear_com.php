<?php
//Login details
require_once 'login.php';
//Connect database
$db_server = mysql_connect($db_hostname, $db_username, $db_password);
if (!$db_server) die ('Unable to connect to MySQL: ' . mysql_error());
mysql_select_db($db_database) or die ('Unable to select database: ' . mysql_error());
//Clear
if ($_POST['clear'] == 'yes') {
	//Deleting from database
	$query = "DELETE FROM tasks WHERE status = 'complete'";
	if (!mysql_query($query, $db_server)) {
	echo "DELETE failed: $query<br />" .
	mysql_error() . "<br /><br />";	
	}
}


?>