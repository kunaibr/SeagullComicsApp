<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
$host = "mysql:host=localhost;dbname=seagull";
$usuario = "root";
$senha = "";
try {
	$conexao = new PDO($host, $usuario, $senha);


	$sql = $conexao->prepare('SELECT * FROM `noticias`');

		$sql->execute();

		$dados = "[";

		while($lista = $sql->fetch()){
			if ($dados != "[") {
				$dados .= ",";
			}
			$dados .= '{"codigo": "'.$lista["idnoticias"].'",';
			$dados .= '"data": "'.$lista["datacolocada"].'",';
			$dados .= '"titulo": "'.$lista["titulodanoticia"].'",';
            $dados .= '"resumo": "'.$lista["resumodanoticia"].'",';
            $dados .= '"texto": "'.$lista["textodanoticia"].'",';
            $dados .= '"idadm": "'.$lista["idadm"].'",';
            $dados .= '"imagem": "'.$lista["imagem"].'"}';
		}
		$dados .= "]";
		echo utf8_encode($dados);



} catch (Exception $ex) {
	echo "erro ao listar: ". $ex->getMessage();
};