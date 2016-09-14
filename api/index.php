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
$app->post('/newStory(/)', function() {
    require 'projects/agil/post_function.php';
    $result = newStory();
    echo $result;
});

$app->post('/getuser(/)', function() {
    require 'projects/agil/post_function.php';
    $result = getuser();
    echo $result;
});

$app->run();
?>
