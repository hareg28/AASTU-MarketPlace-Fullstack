<?php
require '../backend/PHPMailer-master/src/PHPMailer.php';
require '../backend/PHPMailer-master/src/SMTP.php';
require '../backend/PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'dawitgetachew808@gmail.com';
    $mail->Password   = 'zpgg ogvm ozzw rfpj'; // Replace with App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('dawitgetachew808@gmail.com', 'AASTU Marketplace');
    $mail->addAddress('ey.mazi233@gmail.com'); // Replace with recipient email

    $mail->isHTML(true);
    $mail->Subject = 'Test Email';
    $mail->Body    = '<p>This is a test email from PHPMailer.</p>';
    $mail->AltBody = 'This is a test email from PHPMailer.';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
 finally {
    echo base64_encode("\ndawitgetachew808@gmail.com\n") . PHP_EOL;
    echo "\n";
    echo base64_encode("\nzpgg ogvm ozzw rfpj") . PHP_EOL;
    echo "\n";
}

?>