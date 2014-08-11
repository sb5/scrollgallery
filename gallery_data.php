<?php



  


function loadImages(){ 

$number = 4;
$dir = $_SERVER['DOCUMENT_ROOT'].'/shop/images';
$scan = scandir($dir);
$imgCount=0;
$json = '{"total_count":"';//start it
if(!$_SESSION['img_list']){


foreach($scan as $candidate){

if(preg_match('/.+\.(jpeg|jpg|gif|png)$/',$candidate)){

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
