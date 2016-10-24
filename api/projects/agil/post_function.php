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
  column_state,
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
    "task_current_id" => $currentTask);
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

function newUserToProject() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  INSERT INTO user_project (
  user_id,
  project_id,
  team_id,
  daily_capacity,
  days_per_sprint
  ) VALUES (
  :user_id,
  :project_id,
  :team_id,
  :daily_capacity,
  :days_per_sprint
);";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("user_id", $payload->user_id);
  $stmt->bindParam("project_id", $payload->project_id);
  $stmt->bindParam("team_id", $payload->team_id);
  $stmt->bindParam("daily_capacity", $payload->daily_capacity);
  $stmt->bindParam("days_per_sprint", $payload->days_per_sprint);
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

function updateUserToProject() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  UPDATE user_project SET
  team_id = ?,
  daily_capacity = ?,
  days_per_sprint = ?
  WHERE user_id = ? AND project_id = ?;";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam(1, $payload->team_id);
  $stmt->bindParam(2, $payload->daily_capacity);
  $stmt->bindParam(3, $payload->days_per_sprint);
  $stmt->bindParam(4, $payload->user_id);
  $stmt->bindParam(5, $payload->project_id);
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

function updateCRWAndEffort() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  UPDATE task SET
  crw = ?,
  effort = ?
  WHERE id = ?;";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam(1, $payload->crw);
  $stmt->bindParam(2, $payload->effort);
  $stmt->bindParam(3, $payload->task_id);
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
