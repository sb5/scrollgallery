<?php


function loadImages(){ 

$number = 4;
$img_dir = '/images/2014_conf';//change here
$dir = $_SERVER['DOCUMENT_ROOT'].$img_dir;
$scan = scandir($dir);
$imgCount=0;
$json = '{"directory":"'.$img_dir.'","total_count":"';//start it



foreach($scan as $candidate){

if(preg_match('/.+\.(jpeg|jpg|gif|png|JPG)$/',$candidate)){


   $imgArray[] = array('id'=>$imgCount, 'imgUrl'=>$candidate);
$imgCount++;
}
}

$json .= $imgCount;
 $json .= '","image_array":';



          $a = json_encode($imgArray);
 
        
          $json .= $a;
     $json .= '}';
    echo $json;
   
            }
            
     
     
loadImages();
            




?>
