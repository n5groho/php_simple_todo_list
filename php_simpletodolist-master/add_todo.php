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
//Getting unused id for storing newid
$newid = 1;
$i = 0;
while ($newid == mysql_result($result, $i, 0)) {
	$newid++;
	$i++;
}

//MySQL query
if (isset($_POST['name'])) {
	$id = (string) $newid;
	$name = (string) $_POST['name'];
	$status = 'todo';

	$query = "INSERT INTO tasks VALUES('$id', '$name', '$status')";
	if (!mysql_query($query, $db_server)) {
		echo "INSERT failed: $query<br />" .
		mysql_error() . "<br /><br />";	
	}
}
?>