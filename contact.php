<?php
// contact.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    
    // Ganti 'your-email@example.com' dengan alamat email kamu yang asli
    $to = "egiwidiantar@gmail.com";
    $headers = "From: $name <$email>" . "\r\n" .
              "Reply-To: $email" . "\r\n" .
              "X-Mailer: PHP/" . phpversion();
    
    $mail_sent = mail($to, $subject, $message, $headers);
    
    if ($mail_sent) {
        echo "success";
    } else {
        echo "error";
    }
}
?>