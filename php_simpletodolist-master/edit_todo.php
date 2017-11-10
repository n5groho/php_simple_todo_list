<?php
//Login details
require_once 'login.php';
//Connect database
$db_server = mysql_connect($db_hostname, $db_username, $db_password);
if (!$db_server) die ('Unable to connect to MySQL: ' . mysql_error());
mysql_select_db($db_database) or die ('Unable to select database: ' . mysql_error());

if (isset($_POST['name']) && isset($_POST['id'])) {
	$id = (string) $_POST['id'];
	$name = (string) $_POST['name'];

	$query = "UPDATE tasks SET name='$name' WHERE id='$id'";

	$result = mysql_query($query);
	if (!$result) die ("Database access failed: " . mysql_error());
}
?>