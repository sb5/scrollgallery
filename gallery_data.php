<?php


echo $_SERVER['PHP_SELF'];
  


function loadImages(){ 

$number = 4;
$img_dir = '/images/';//change here
$dir = $_SERVER['DOCUMENT_ROOT'].$img_dir;
$scan = scandir($dir);
$imgCount=0;
$json = '{"directory":"'.$img_dir.'","total_count":"';//start it
if(!$_SESSION['img_list']){


foreach($scan as $candidate){

if(preg_match('/.+\.(jpeg|jpg|gif|png|JPG)$/',$candidate)){

$imgCount++;
$_SESSION['img_list'][] = $candidate;

}
}
}
$json .= $imgCount;
 $json .= '","image_array":';


 $current_ones = $_SESSION['img_list'];

foreach($current_ones as $k=>$v){
             $imgArray[] = array('id'=>$k, 'imgUrl'=>$v);
            }
          $a = json_encode($imgArray);
 
        
          $json .= $a;
     $json .= '}';
    echo $json;
   
            }
            
     
     
loadImages();
            




?>
