<?php
$directory = 'img/topper/';
$fileCount = 0;

if (is_dir($directory)) {
    $files = scandir($directory);
    $fileCount = count(array_diff($files, array('.', '..')));
}

echo $fileCount;
?>