<?php
header('Content-Type: text/xml');

$symbol = $_GET["symbol"];
$page = $_GET["page"];
$key = $_GET["key"];

$url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff3335d86b0b20f3caeda7567300ae66&text='.$symbol.'&page='.$page.'&format=rest';

$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);

?>


