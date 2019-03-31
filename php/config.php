<?php

define('DB_NAME','seagull');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_HOST','localhost');

$mysql = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
?>