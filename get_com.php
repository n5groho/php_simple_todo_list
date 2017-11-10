<?php
//Login details
require_once 'login.php';
//Connect database
$db_server = mysql_connect($db_hostname, $db_username, $db_password);
if (!$db_server) die ('Unable to connect to MySQL: ' . mysql_error());
mysql_select_db($db_database) or die ('Unable to select database: ' . mysql_error());

//MySQL query
$query = "SELECT * FROM tasks where status = 'complete'";

//Getting result from MySQL query
$result = mysql_query($query);
if (!$result) die ('Database access failed: ' . mysql_error());

$numrows = mysql_num_rows($result);

//Array for JSON
$arr = array();
$arr2 = array();

for ($i; $i < $numrows; ++$i) {
	$row = mysql_fetch_row($result);
	$arr['id'] = $row[0];
	$arr['name'] = $row[1];
	$arr['status'] = $row[2];
	array_push($arr2, $arr);
}

$json = json_encode($arr2);

echo $json;
?>