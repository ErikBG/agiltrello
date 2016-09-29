<?php
require 'database.php';

function newuser() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  INSERT INTO user (
  user_name,
  user_lastname,
  user_email,
  user_password
  ) VALUES (
  :name,
  :last_name,
  :email,
  :password
);";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("name", $payload->name);
  $stmt->bindParam("last_name", $payload->last_name);
  $stmt->bindParam("email", $payload->email);
  $stmt->bindParam("password", $payload->password);
  $stmt->execute();
  $response = array(
    "success" => "ok");
  } catch (PDOException $e) {
    $response = array(
      "error" => $e->getmessage()
    );
  }
  return json_encode($response);
}

function newStory() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  INSERT INTO user_story (
  id,
  deadline,
 description,
  duration
 
  ) VALUES (
  :id,
  :deadline,
  :description,
  :duration
);";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("id", $payload->id);
  $stmt->bindParam("deadline", $payload->deadline);
  $stmt->bindParam("duration", $payload->duration);
  $stmt->bindParam("description", $payload->description);

  $stmt->execute();
  $response = array(
    "success" => "ok");
  } catch (PDOException $e) {
    $response = array(
      "error" => $e->getmessage()
    );
  }
  return json_encode($response);
}


?>
