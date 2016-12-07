<?php
header('Access-Control-Allow-Origin: *');
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->contentType('application/json');

$app->get('/getactiveusers(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getactiveusers();
    echo $result;
});
$app->get('/getpendingtasks(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getpendingtasks();
    echo $result;
});
$app->post('/saveNewSprint(/)', function() {
    require 'projects/agil/post_function.php';
    $result = saveNewSprint();
    echo $result;
});

$app->post('/newuser(/)', function() {
    require 'projects/agil/post_function.php';
    $result = newuser();
    echo $result;
});
$app->post('/newUserToProject(/)', function() {
    require 'projects/agil/post_function.php';
    $result = newUserToProject();
    echo $result;
});
$app->post('/modifyTask(/)', function() {
    require 'projects/agil/post_function.php';
    $result = modifyTask();
    echo $result;
});
$app->post('/saveStatusTask(/)', function() {
    require 'projects/agil/post_function.php';
    $result = saveStatusTask();
    echo $result;
});
$app->post('/updateUserToProject(/)', function() {
    require 'projects/agil/post_function.php';
    $result = updateUserToProject();
    echo $result;
});
$app->post('/updateUserToSprint(/)', function() {
    require 'projects/agil/post_function.php';
    $result = updateUserToSprint();
    echo $result;
});
$app->post('/updateCRWAndEffort(/)', function() {
    require 'projects/agil/post_function.php';
    $result = updateCRWAndEffort();
    echo $result;
});
$app->post('/postCRWHistory(/)', function() {
    require 'projects/agil/post_function.php';
    $result = postCRWHistory();
    echo $result;
});
$app->post('/newTask(/)', function() {
    require 'projects/agil/post_function.php';
    $result = newTask();
    echo $result;
});
$app->post('/newStory(/)', function() {
    require 'projects/agil/post_function.php';
    $result = newStory();
    echo $result;
});

$app->get('/getuser(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getuser();
    echo $result;
});
$app->get('/getUsers(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getUsers();
    echo $result;
});
$app->get('/getVelocity(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getVelocity();
    echo $result;
});
$app->get('/getUserToProject(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getUserToProject();
    echo $result;
});
$app->get('/getCRWAndEffort(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getCRWAndEffort();
    echo $result;
});
$app->get('/getsprint(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getsprint();
    echo $result;
});
$app->get('/getcard(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getcard();
    echo $result;
});
$app->get('/getdetailsprint(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getdetailsprint();
    echo $result;
});
$app->get('/getSprintStartDateAndDuration(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getSprintStartDateAndDuration();
    echo $result;
});
$app->get('/getSprintTasksDuration(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getSprintTasksDuration();
    echo $result;
});

$app->post('/setTaskDuration(/)', function() {
  require 'projects/agil/post_function.php';
  $result = setTaskDuration();
  echo $result;
});

$app->get('/getCRWHistory(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getCRWHistory();
    echo $result;
});
$app->run();
?>
