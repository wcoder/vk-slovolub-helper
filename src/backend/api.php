<?php

header('access-control-allow-origin: *');
header('content-type: application/json; charset=utf-8');

$url = 'http://www.ckii.ru/Home/GetWords?';

$chars = $_GET['word'];
$length = $_GET['length'];
$callback = $_GET['callback'];

/*$chars = 'ожсьнаэтдйшфпл';
$length = 7;
$callback = 'aaa';*/



if (isset($chars, $length, $callback)) {
	$params = http_build_query(array(
		'word' => $chars,
		'definition' => '',
		'searchType' => 'SetOfLetters',
		'minLetter' => $length,
		'maxLetter' => $length,
		'searchInFound' => 'false',
		'searchDictionary' => 'Simple', //CrossAndDefinition
		'areDublicatesAvailable' => 'false',
	));

	$url .= $params;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	//curl_setopt($ch, CURLOPT_POST, 1);
	//curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36',
		'X-Requested-With: XMLHttpRequest',
	));
	$response = curl_exec($ch);

	echo $callback . '(' . json_encode(array(
		'error' => false,
		'data' => $response,
	)) . ')';
} else {
	echo json_encode(array(
		'error' => true,
		'message' => 'Не переданы переменные!',
	));
}