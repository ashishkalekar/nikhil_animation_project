<?php


// Connecting to dtabase
$servername = "localhost";
$username = "root";
$password = "root123";
$database = 'newadmin';


//Create a connection
$conn=mysqli_connect($servername,$username,$password,$database);


//Connect to the database
//$db = mysqli_select_db($con, $database);

//die if connection was not successfull
if (!$conn){
    die("Sorry we failed to connect: ". mysqli_connect_error());
}


?>
