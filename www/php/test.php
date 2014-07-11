<!DOCTYPE html>
<html>
  <head>
    <title>New - 2014-07-11T01:18:45</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  </head>
  <body>
    <form method="post" action="?test456=success">
      <input type="text" name="test123" value="success">
      <input type="submit" name="submit" value="submit">
    </form>
<?php
  echo "Real GET: ".$_GET['test456'];
  echo "<br />";
  echo "Faux POST: ".$_POST['test123'];

?>
<pre>
GET
<?php
print_r($_GET);
?>
</pre>
<br /<br />
<pre>
POST
<?php
print_r($_POST);
?>
</pre>
  </body>
</html>