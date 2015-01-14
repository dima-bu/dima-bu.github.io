<html>
<head>
<title>Результат формы отправления резюме</title>

</head>
<body>


<?php
require '/var/www/vhosts/u0042357.plsk.regruhosting.ru/httpdocs/hivecompany.com/class/PHPMailerAutoload.php';
$_tmp=rand(1000,9999);
$uploaddir = '/var/www/vhosts/u0042357.plsk.regruhosting.ru/httpdocs/hivecompany.com/resume/';

$uploadfile = $uploaddir.$_tmp."_".basename($_FILES['userfile']['name']);

echo '<h3>';
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo "Спасибо\n ";
} else {
    echo "<span style='color:red'>Ваше резюме не отправлено - попробуйте еще\n</span>";
}
echo '</h3><div class="popup-title js-popup-close">Ваша заявка успешно отправлена!</div> <div class="simple-btn aftersubmit js-popup-close">НЕ ЗА ЧТО</div><a class="close-btn js-popup-close"></a>';

file_put_contents($uploadfile.".info", "[name]\n".$_POST["name"]."\n"."[role]\n".$_POST["role"]."\n", FILE_APPEND | LOCK_EX);

$mail = new PHPMailer;
$mail->CharSet = "UTF-8";
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
$mail->Debugoutput = 'html';
$mail->Host = 'smtp.yandex.ru';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = "resume_from_site@hivecompany.com";
$mail->Password = "csVZFjlRb7";
$mail->setLanguage('ru');
$mail->setFrom('resume_from_site@hivecompany.com', 'New resume from site');
$mail->WordWrap = 250;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML


$mail->addAddress("resume_from_site@hivecompany.com", "");

//$mail->addAddress("dimabuhal@gmail.com", "");

$mail->Subject = "Резюме на ".$_POST["role"]." от ".$_POST["name"]."";
$mail->Body    = "
<html>
<body>
<h1>".$_POST["name"]."</h1>
<h2>".$_POST["role"]."</h2>
</body>
</html>
";


if (is_file($uploadfile))
{
	$infofile=pathinfo($uploadfile);
    $mail->addAttachment($uploadfile, $_POST["name"].".".$infofile['extension']);
}

if (!$mail->send())
{
	$echo="sendfile=fail;";
}
else
{
	$echo="sendfile=ok;";
}
unset($mail);

?>

</body>
<html>