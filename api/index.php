<?php
header('Access-Control-Allow-Origin: *');
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->contentType('application/json');


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
$app->post('/updateUserToProject(/)', function() {
    require 'projects/agil/post_function.php';
    $result = updateUserToProject();
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
$app->get('/getUserToProject(/)', function() {
    require 'projects/agil/get_function.php';
    $result = getUserToProject();
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

$app->run();
?>
