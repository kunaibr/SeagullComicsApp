<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
$host = "mysql:host=localhost;dbname=seagull";
$usuario = "root";
$senha = "";
try {
	$conexao = new PDO($host, $usuario, $senha);


	$sql = $conexao->prepare('SELECT * FROM `paginas`');

		$sql->execute();

		$dados = "[";

		while($lista = $sql->fetch()){
			if ($dados != "[") {
				$dados .= ",";
			}
			$dados .= '{"codigo": "'.$lista["idpaginas"].'",';
			$dados .= '"numero": "'.$lista["numerodapagina"].'",';
			$dados .= '"idhq": "'.$lista["idhq"].'",';
            $dados .= '"imagem": "'.$lista["link"].'"}';
		}
		$dados .= "]";
		echo utf8_encode($dados);

} catch (Exception $ex) {
	echo "erro ao listar: ". $ex->getMessage();
};