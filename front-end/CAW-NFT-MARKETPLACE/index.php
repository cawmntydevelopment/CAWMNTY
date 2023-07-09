<?php 
// 🚨 Sistem Bilgileri 🚨 //
ob_start(); session_start(); setlocale(LC_ALL, 'en_US.UTF-8');

// 👁️ PHP hata kodları gösterme 👁️ //
// ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

// 🌊 Ana dosya yolu 🌊 //
define('V_PATH', './back/');

// 🕸️ Fonksiyonlar ve Bağlantı dosyası 🕸️ //
include_once(V_PATH."config.php"); include_once(V_PATH."function.php");

// URL için ayırma işlemi //
if(isset($_SERVER['REQUEST_URI'])){$syf=substr($_SERVER['REQUEST_URI'],1);}
$ysyf=explode('/',$syf,5); $_sayfa=$ysyf[0]; $_sekme1=$ysyf[1]; $_sekme2=$ysyf[2]; $_sekme3=$ysyf[3]; $_sekme4=$ysyf[4];

// 🌈 Bütün işlerimlerin index.php üzerinde dönmesi, ve sayfalar arası bağlantılar. 🌈 //
if(isset($_sayfa) && !empty($_sayfa))
{if(file_exists(realpath(V_PATH.'page/')."/".$_sayfa.".php"))
{include(realpath(V_PATH.'page/')."/".$_sayfa.".php");}else
{include(realpath(V_PATH.'page/').'/_redirect_404.php');}}else
{include(realpath(V_PATH.'page/').'/_index.php');}

?>