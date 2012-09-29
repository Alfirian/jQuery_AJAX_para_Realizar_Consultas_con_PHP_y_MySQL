<?php
// Script para ejecutar AJAX

// Insertar y actualizar tabla de usuarios

sleep(3);

$salidaJson = array("respuesta" => "error",
					"mensaje" => "Primera prueba de jQuery AJAX",
					"contenido" => "Ya podemos continuar con el siguiente capítulo");


echo json_encode($salidaJson);
?>