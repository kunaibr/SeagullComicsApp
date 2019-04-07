<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
$host = "mysql:host=localhost;dbname=seagull";
$usuario = "root";
$senha = "";
try {
	$conexao = new PDO($host, $usuario, $senha);


	$sql = $conexao->prepare('SELECT * FROM `slides`');

		$sql->execute();

		$dados = "[";

		while($lista = $sql->fetch()){
			if ($dados != "[") {
				$dados .= ",";
			}
			$dados .= '{"codigo": "'.$lista["idslide"].'",';
			$dados .= '"imagem": "'.$lista["image"].'",';
			$dados .= '"titulo": "'.$lista["titulo"].'",';
			$dados .= '"texto": "'.$lista["textoslide"].'",';
			$dados .= '"data": "'.$lista["dataslide"].'",';
			$dados .= '"idadm": "'.$lista["idadm"].'",';
			
            $dados .= '"link": "'.$lista["link"].'"}';
		}
		$dados .= "]";
		echo utf8_encode($dados);



} catch (Exception $ex) {
	echo "erro ao listar: ". $ex->getMessage();
};