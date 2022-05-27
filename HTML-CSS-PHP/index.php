<?php
require __DIR__ . "/public/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);



if ((isset($uri[2]) && $uri[2] != 'streamerName' && $uri[2] != 'streamerDate') || !isset($uri[3])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}


include __DIR__ . "/Controller/Api/StreamerController.php";

$objFeedController = new StreamerController();
if ($uri[2] == 'streamerName') {
    $objFeedController->listAction($uri[3], "name");
}
if ($uri[2] == 'streamerDate') {
    $objFeedController->listAction($uri[3], "date");
}
