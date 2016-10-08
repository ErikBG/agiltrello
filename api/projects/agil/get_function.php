<?php
require 'database.php';
function getsprint() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  id,name
  FROM
  sprint
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
function getcard() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  id,title
  FROM
  user_story
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
?>
