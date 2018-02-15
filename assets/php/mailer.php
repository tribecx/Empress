<?php
if($_POST['send'] == 'SEND'){

$to      = 'orlando_arias@ucol.mx';
$subject = $_POST['mail']; 
$message = $_POST['mail']; 
'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message);
}
?>