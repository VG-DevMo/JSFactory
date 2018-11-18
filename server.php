<?php
  if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
          case 'test' : test($_POST);break;
    }
  }

  function test($data) {
    $message = 'Hallo ' . $data['name'] . ' wie geht es dir? Liest Du gerne? Wenn ja habe Ich hier einen Buch Vorschlag für Dich:';
    echo $message;
  }

?>
