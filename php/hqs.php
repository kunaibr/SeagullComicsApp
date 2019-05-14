<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
$host = "mysql:host=localhost;dbname=seagull";
$usuario = "root";
$senha = "";
try {
	$conexao = new PDO($host, $usuario, $senha);


	$sql = $conexao->prepare('SELECT * FROM `hq`');

		$sql->execute();

		$dados = "[";

		while($lista = $sql->fetch()){
			if ($dados != "[") {
				$dados .= ",";
			}
			$dados .= '{"codigo": "'.$lista["idhq"].'",';
			$dados .= '"titulo": "'.$lista["titulodahq"].'",';
            $dados .= '"edicao": "'.$lista["numerodaedicao"].'",';
            $dados .= '"descricao": "'.$lista["descricao"].'",';
			$dados .= '"idadm": "'.$lista["idadm"].'",';
			$dados .= '"imagem": "'.$lista["imagem"].'",';
			$dados .= '"preco": "'.$lista["preco"].'",';
            $dados .= '"comprado": "'.$lista["comprado"].'"}';
		}
		$dados .= "]";
		echo utf8_encode($dados);

} catch (Exception $ex) {
	echo "erro ao listar: ". $ex->getMessage();
};