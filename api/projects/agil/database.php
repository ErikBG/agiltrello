<?php
    function getConnection() {
		$dbhost="mysql.hostinger.mx";
    	$dbuser="u368147453_admin";
    	$dbpass="@dM1nistrador";
    	$dbname="u368147453_agil";
      /*$dbhost="localhost";
      $dbuser="";
      $dbpass="";
      $dbname="agil_db";*/

    	$dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    	$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	return $dbConnection;
    }
?>
