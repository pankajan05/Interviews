<?php

session_start();

if(isset($_POST['submit'])) {

	include 'db.inc.php';

	$uid = mysqli_real_escape_string($con,$_POST['name']);
	$pass = mysqli_real_escape_string($con,$_POST['password']);

	//Error handler

	if(empty($uid) || empty($pass)){
		header("Location:../index.php?message=empty");
		exit();
	}else{
		$sql="SELECT * FROM user WHERE username = '$uid'";
		$result = mysqli_query($con,$sql);
		$resultCheck = mysqli_num_rows($result);

		if($resultCheck <= 0){
					header("Location:login.php?message=user not exist");
					exit();
		}else{
			if($row = mysqli_fetch_assoc($result)){
				//De-hashing
				$hpass = password_verify($pass, $row['password']);

				if($hpass == false ){
						header("Location:login.php?message=password error");
						exit();
					}else{
						$_SESSION['login'] = true;

						header("Location:index.php?message=success");
						exit();
					}
				}	
			}
		}

}else{
	header("Location:../index.php?message=login error");
	exit();
}

?>