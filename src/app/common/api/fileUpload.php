<?php

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        $image=basename($_FILES['file']['name']);
        $image=str_replace(' ','|',$image);

        $tmppath="images/".$image;

                if(move_uploaded_file($_FILES['file']['tmp_name'],$tmppath))
                {
                 echo "success";
                }
                else
                {
                 echo "fail";
                }

        move_uploaded_file($_FILES['file']['tmp_name'], 'app/assets/userUploads/' . $_FILES['file']['name']);
        echo "Uploaded";
    }

?>