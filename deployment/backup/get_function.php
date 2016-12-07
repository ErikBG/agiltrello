<?php
require 'database.php';
function getactiveusers() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  u.Id as user_id,u.user_name as user_name,u.user_lastname as user_lastname,up.capacity as totalperuser
  FROM
  user as u
  INNER JOIN user_project as up  ON u.Id=up.user_id";
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
function getpendingtasks() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  id,title,duration
  FROM
  task
  WHERE column_state='backlog'";
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

function getVelocity() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $project_id = $_GET['projectId'];
  $sql = "
	SELECT
	t.sprint_id,
	us.team_id,
	SUM(t.duration) as velocity
	FROM
	task as t
	INNER JOIN user_sprint AS us ON t.owner = us.user_id AND t.sprint_id = us.sprint_id
	WHERE t.column_state = 'finished' AND t.project_id = ".$project_id."
	GROUP BY t.sprint_id, us.team_id;";
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

function getUserToProject() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $user_id = $_GET['userId'];
  $project_id = $_GET['projectId'];
  $sprint_id = $_GET['sprintId'];
  $sql = "
	SELECT
	up.user_id,
	up.project_id,
	us.team_id,
	up.capacity,
	up.monday,
	up.tuesday,
	up.wednesday,
	up.thursday,
	up.friday,
	up.saturday,
	up.sunday
	FROM
	user_project AS up
	INNER JOIN user_sprint AS us ON up.user_id = us.user_id AND up.project_id AND us.project_id
	WHERE up.user_id = ".$user_id." AND up.project_id = ".$project_id."  AND us.sprint_id = ".$sprint_id."";
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

function getUsers() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sql = "
  SELECT
  Id,user_name, user_password
  FROM
  user
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

function getdetailsprint() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $id_sprint = $_GET['id_sprint'];
  $sql = "
  SELECT t.id, t.title, t.description, t.duration, t.deadline, u.user_name as owner, t.column_state, t.sprint_id, t.project_id, t.crw, t.effort FROM `task` as t
  LEFT JOIN user as u ON t.owner = u.id
  WHERE t.sprint_id=".$id_sprint."";
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

function getSprintStartDateAndDuration() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sprint_id = $_GET['sprintId'];
  $sql = "
  SELECT start_date, (DATEDIFF(end_date, start_date)+1) as duration FROM sprint WHERE id = ".$sprint_id.";";
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

function getSprintTasksDuration() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sprint_id = $_GET['sprintId'];
  $team_id = $_GET['teamId'];
  $sql = "
  SELECT SUM(up.capacity) as total_duration FROM user_sprint us
  JOIN user_project up ON us.user_id = up.user_id
  WHERE us.sprint_id = ".$sprint_id." AND us.team_id = ".$team_id.";";
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

function getCRWHistory() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $sprint_id = $_GET['sprintId'];
  $team_id = $_GET['teamId'];
  $sql = "
  SELECT crw, date FROM crw_history
  WHERE sprint_id = ".$sprint_id."
  AND team_id = ".$team_id."
  ORDER BY date ASC;";
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

function getCRWAndEffort() {
  $request = \Slim\Slim::getInstance()->request();
  $payload = json_decode($request->getBody());
  $task_id = $_GET['taskId'];
  $sql = "
  SELECT
  crw,
  effort
  FROM
  task
  WHERE id = ".$task_id."";
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
