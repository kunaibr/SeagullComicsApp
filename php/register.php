
<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-type, Authorization, X-requested-with"); 
header("Content-type: application/json; charset=utf-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['aksi']=="add_register"){
    // $senhaUser = mdS($postjson['senha']);

    $query = mysqli_query($mysqli, "INSERT INTO usuario SET 
    nome ='$postjson[nome]',
    senha ='$postjson[senha]',
    email ='$postjson[nome]',
    stats ='Ativo',
    listahq ='',
     ");

     if($query) $result = json_encode(array("sucess"=>true));
     else $result = json_encode(array("sucess"=>true, 'msg'=>'erro, porfavor tente novamente'));

     echo $result; 
}

?>