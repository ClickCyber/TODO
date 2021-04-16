<?php
if(isset($_POST['entities']))
{
   echo htmlentities($_POST['entintes']);
}
else
{
echo file_get_contents('index.html');
}
?>