<?php

  $destino="info@jhardsystex.com";
  $nombre= $_POST["nombre"];
  $tel= $_POST["tel"];
  $correo= $_POST["correo"];
  $mensaje= $_POST["mensaje"];
  $contenido ="nombre: " . $nombre . "\ntel: " . $tel . "\ncorreo: " .$correo . "\nmensaje: " . $mensaje;

  mail($destino,"contacto", $contenido);
  header("location: index.html")


?>