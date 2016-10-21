<?php
require 'database.php';
function newTask() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  INSERT INTO task (
  title,
  description,
  duration,
  deadline,
  owner,
  column,
  sprint_id
  ) VALUES (
  :task_title,
  :task_description,
  :task_duration,
  :task_deadline,
  :task_owner,
  :task_column,
  :task_sprint
);";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("task_title", $payload->task_title);
  $stmt->bindParam("task_description", $payload->task_description);
  $stmt->bindParam("task_duration", $payload->task_duration);
  $stmt->bindParam("task_deadline", $payload->task_deadline);
  $stmt->bindParam("task_owner", $payload->task_owner);
  $stmt->bindParam("task_column", $payload->task_column);
  $stmt->bindParam("task_sprint", $payload->task_sprint);
  $stmt->execute();
  $currentTask = $db->lastInsertId();
  $response = array(
    "success" => "ok");
  } catch (PDOException $e) {
    $response = array(
      "error" => $e->getmessage()
    );
  }
  return json_encode($response);
}


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
  title,
  as_i,
  want,
  so_that,
  acceptance_criteria
  ) VALUES (
  :title,
  :as_i,
  :want,
  :so_that,
  :acceptance_criteria
);";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("title", $payload->title);
  $stmt->bindParam("as_i", $payload->as_i);
  $stmt->bindParam("want", $payload->want);
  $stmt->bindParam("so_that", $payload->so_that);
  $stmt->bindParam("acceptance_criteria", $payload->acceptance_criteria);
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
