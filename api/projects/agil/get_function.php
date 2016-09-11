<?php
require 'database.php';
function getcareers() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  Id,name
  FROM
  career
  ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    if (count($result)) {
      $response = $result;
    } else {
      $response = array(
        "error" => 'No rows found'
      );
    }
  } catch (PDOException $e) {
    $response = array(
      "error" => $e->getMessage()
    );
  }
  return json_encode($response);
}

function getsubjectsearch() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  Id,name
  FROM
  subject
  ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    if (count($result)) {
      $response = $result;
    } else {
      $response = array(
        "error" => 'Students not found'
      );
    }
  } catch (PDOException $e) {
    $response = array(
      "error" => $e->getMessage()
    );
  }
  return json_encode($response);
}


function getnamestudents() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  id,CONCAT(name,' ',last_name) AS name
  FROM
  student
  ";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    if (count($result)) {
      $response = $result;
    } else {
      $response = array(
        "error" => 'Students not found'
      );
    }
  } catch (PDOException $e) {
    $response = array(
      "error" => $e->getMessage()
    );
  }
  return json_encode($response);
}


function getsubjects() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $idc = $_GET['idc'];
  $ns = $_GET['ns'];
  $sql = "
  SELECT s.name,s.id
  FROM career c
  INNER JOIN career_subject cs
  ON c.id=cs.id_career
  INNER JOIN subject s
  ON cs.id_subject=s.id
  WHERE s.semester= ".$ns."
  AND c.id=".$idc."";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    if (count($result)) {
      $response = $result;
    } else {
      $response = array(
        "error" => 'Subjects not found'
      );
    }
  } catch (PDOException $e) {
    $response = array(
      "error" => $e->getMessage()
    );
  }
  return json_encode($response);
}

function getuser(){
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());

    try {
    $db = getConnection();
    $sql="CALL get_user('$payload->user', '$payload->password');";
      $stmt = $db->prepare($sql);
      $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    if (count($result)) {
      $response = array(
        "Status" => TRUE
      );
    } else {
    $response = array(  "Error" => "Error");
  }} catch (PDOException $e) {
    $response = array(
      "error" => $e->getMessage()
    );
  }
  return json_encode($response);
}






?>
