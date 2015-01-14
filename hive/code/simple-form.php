<?php
  $error = $_FILES['file']['error'];
  switch($error) {
    case 0 :
      $error = 'нет';
      break;    
    case 1 : case 2 :
      $error = 'слишком большой файл';
      break;
    case 3 :
      $error = 'файл загружен частично';
      break;
    case 4 :
      $error = 'файл не был загружен';
  }  
?>
 

Файл <?=$_FILES['userfile']['name']; ?> отпрален<br />