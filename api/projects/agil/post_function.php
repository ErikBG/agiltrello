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
  column_state,
  sprint_id
  ) VALUES (
  :task_title,
  :task_description,
  :task_duration,
  :task_deadline,
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
  $stmt->bindParam("task_column", $payload->task_column);
  $stmt->bindParam("task_sprint", $payload->task_sprint);
  $stmt->execute();
  $currentTask = $db->lastInsertId();
  $response = array(
    "task_current_id" => $currentTask );
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

function modifyTask() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  UPDATE task
  SET owner= :new_owner,column_state= :change_column, deadline= :new_deadline
  WHERE Id= :id_task;";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("new_owner", $payload->name_employee);
  $stmt->bindParam("id_task", $payload->task_id);
  $stmt->bindParam("change_column", $payload->column_state);
  $stmt->bindParam("new_deadline", $payload->deadline);

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
  daily_capacity = ?,
  days_per_sprint = ?
  WHERE user_id = ? AND project_id = ?;";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam(1, $payload->daily_capacity);
  $stmt->bindParam(2, $payload->days_per_sprint);
  $stmt->bindParam(3, $payload->user_id);
  $stmt->bindParam(4, $payload->project_id);
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

function updateUserToSprint() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  UPDATE user_sprint SET
  team_id = ?
  WHERE user_id = ? AND project_id = ? AND sprint_id = ?;";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam(1, $payload->team_id);
  $stmt->bindParam(2, $payload->user_id);
  $stmt->bindParam(3, $payload->project_id);
  $stmt->bindParam(4, $payload->sprint_id);
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

function postCRWHistory() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT t.sprint_id, us.team_id 
  INTO @sprint_id, @team_id
  FROM task t
  JOIN user_sprint us ON t.owner = us.user_id
  AND t.sprint_id = us.sprint_id
  WHERE t.id = ?;
  SET @crw = (SELECT SUM(t.crw) as crw FROM task t
  JOIN user_sprint us ON t.owner = us.user_id
  WHERE t.sprint_id = @sprint_id AND us.sprint_id = @sprint_id AND us.team_id = @team_id);
  INSERT INTO crw_history
  (sprint_id, team_id, date, crw)
  VALUES
  (@sprint_id, @team_id, curdate(), @crw)
  ON DUPLICATE KEY UPDATE
  crw = @crw;";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam("1", $payload->task_id);
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
  crw = :crw,
  effort = :effort
  WHERE id = :task_id;
  SELECT t.sprint_id, us.team_id 
  INTO @sprint_id, @team_id
  FROM task t
  JOIN user_sprint us ON t.owner = us.user_id
  AND t.sprint_id = us.sprint_id
  WHERE t.id = :task_id;
  SET @crw = (SELECT SUM(t.crw) as crw FROM task t
  JOIN user_sprint us ON t.owner = us.user_id
  WHERE t.sprint_id = @sprint_id AND us.sprint_id = @sprint_id AND us.team_id = @team_id);
  INSERT INTO crw_history
  (sprint_id, team_id, date, crw)
  VALUES
  (@sprint_id, @team_id, curdate(), @crw)
  ON DUPLICATE KEY UPDATE
  crw = @crw;";
try {
  $db = getConnection();
  $stmt = $db->prepare($sql);
  $stmt->bindParam('crw', $payload->crw);
  $stmt->bindParam('effort', $payload->effort);
  $stmt->bindParam('task_id', $payload->task_id);
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
