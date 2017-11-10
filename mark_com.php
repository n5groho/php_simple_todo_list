<?php
//Login details
require_once 'login.php';
//Connect database
$db_server = mysql_connect($db_hostname, $db_username, $db_password);
if (!$db_server) die ('Unable to connect to MySQL: ' . mysql_error());
mysql_select_db($db_database) or die ('Unable to select database: ' . mysql_error());

//Creating new id
$query = 'SELECT * FROM tasks';
$result = mysql_query($query);
if (!$result) die ('Database access failed: ' . mysql_error());
//Id from list class
$id = $_POST['id'];
//Change from todo to complete
$query = "UPDATE tasks SET status='complete' WHERE id='$id'";

if (!mysql_query($query, $db_server)) {
	echo "DELETE failed: $query<br />" .
	mysql_error() . "<br /><br />";	
}
?>