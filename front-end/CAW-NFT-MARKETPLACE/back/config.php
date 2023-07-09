<?php 

// ℹ️ Sistem Bilgilerini içeri aktarma. ℹ️ //
include_once(V_PATH."site_info.php");

// Tagler //
define('WEB_URL',$url);
define('WEB_NAME',$project_name);
define('WEB_SLOGAN',$slogan); 
define('API_URL',$api_url); 
define('WEB_TITLE',$project_name.' - '.$slogan);

// 🌏 Database bağlantı bilgieri 🌏 //
$server = $database_server; 
$username = $database_username; 
$password = $database_password; 
$db = $database_name;

// 🌏 Database bağlantısı 🌏 //
if($is_database) {
    $mysqli = mysqli_connect($server,$username,$password, $db);
    $mysqli->query("SET CHARACTER SET utf8");
}

// 💅 HTTPS Yöneldirmesi. 💅 // 
if (substr($_SERVER['HTTP_HOST'], 0, 4) == 'www.') {die(header("Location:".WEB_URL.$_SERVER['REQUEST_URI']));}
if($_SERVER['HTTPS']!="on"){die(header("Location:".WEB_URL.$_SERVER['REQUEST_URI'])); }



?>