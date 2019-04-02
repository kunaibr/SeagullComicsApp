<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-type, Authorization, X-Requested-with"); 
header("Content-type: application/json; charset=utf-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['aksi']=="add_register"){
    //$senhaUser = mdS($postjson['senha']);

    $query = mysqli_query($mysql, "INSERT INTO usuario SET 
    nome = '$postjson[nome]',
    senha = '$postjson[senha]',
    email = '$postjson[email]',
    stats = 'Ativo',
    listahq =''
     ");

     if($query) $result = json_encode(array("sucess"=>true, 'msg'=>'Cadatrado com'));
     else $result = json_encode(array("sucess"=>true, 'msg'=>'erro, porfavor tente novamente'));

     echo $result; 
}

?>