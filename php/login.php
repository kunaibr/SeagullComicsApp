<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if(isset($_GET["nome"]) || isset($_GET["senha"]) ){
	if( !empty($_GET["nome"])  || !empty($_GET["senha"])  ){
        $conexao = new mysqli("localhost", "root", "", "seagull");
        
		$nome= mysqli_real_escape_string($conexao,$_GET["nome"]);
        $senha= mysqli_real_escape_string($conexao, $_GET["senha"]);
        
		$query="SELECT * FROM usuario where nome='$nome' and senha='$senha'  ";
        $result = $conexao->query($query);
        
    $outp = "";
		if( $rs=$result->fetch_array()) {
			if ($outp != "") {$outp .= ",";}
			$outp .= '{"codigo":"'  . $rs["iduser"] . '",';
            $outp .= '"email":"'   . $rs["email"]        . '",';
            $outp .= '"nome":"'   . $rs["nome"]        . '",';
            $outp .= '"status":"'   . $rs["stats"]        . '",';
            $outp .= '"hqs":"'   . $rs["listahq"]        . '",';
            $outp .= '"senha":"'. $rs["senha"]     . '"}';
            
            
            
            $outp ='{"msg": {"logado": "sim", "texto": "logado com sucesso!"}, "dados": '.$outp.'}';
            
		}else{
            
            $outp ='{"msg": {"logado": "nao", "texto": "login ou senha invalidos!"}, "dados": {'.$outp.'}}';
           
            
        }
      
		//$conn->close();
       
        echo utf8_encode($outp);
        
        
	}
}
?>