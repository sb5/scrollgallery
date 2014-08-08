function showIt(id){ 
     $('#'+id).fadeIn(500);
    
    }

var Pics ={
rows: 4,
imgObj:{},
total:0,
page : 0,
end:false,
      
      


    

  t : function(){this.f();},
f: function(){alert('hiihihi');},

getPicsObject: function(){


       $.ajax({
       context:this,
      type: "POST",
      url: "gallery_datatwo.php",
   
      success: function(res) {
     
       // $("#result").append(res);
       a =  JSON.parse(res);
       this.imgObj = a;
   n = a.length;
this.showPics();  
this.total = a.total_count; 

this.getMore(this.total);  
                        }
                             });
   },
showPics: function(){

    num = this.page;

    nd = num+4;
    z = this.imgObj;
if(z){
//console.log('z'+z);
//console.log('n'+num);


       for(var i = num; i < nd; i++) {
       if(i==num){$("#result").append('<div class = "row">');}
    var obj = z.image_array[i];
	
 

    var row = i+1;
    //  $("#result").append('<div style = "outline:1px solid black;" class ="col-md-3 imgcontainer">'+obj.id+'</div>');
      $("#result").append('<div style = "outline:1px solid black;" class ="col-md-3 imgcontainer"><img id = "'+obj.id+'"  class = "profileImg img-rounded img-responsive" style = "display:none;" onload = "showIt('+obj.id+')" src = "/images/'+obj.imgUrl+'"/></div>');



if(i == nd){$("#result").append('</div>');}

}


}else{//console.log('no l');
}
       

},
scroller: function() {


     $('#loadMore').hide();






     if($(window).scrollTop() + $(window).height() > $(document).height()) {
//console.log('loadmore show');
      $('#loadMore').show();
    }
    if($(window).scrollTop() + $(window).height() == $(document).height() && this.end == false) {
console.log('end is'+this.end);
      $('#loadMore').fadeOut();
//console.log('loadmore fade');


     this.page= this.page+this.rows;

   this.page_num =this.page;

   console.log('page no '+ this.page);


      var loadedCount =  $('.profileImg').length;
     // //console.log('loadcaount '+ loadedCount ); 
      //console.log('total '+ this.total );





      if(loadedCount < this.total && loadedCount < (this.total-this.rows) ){
      console.log(loadedCount+'isless  than'+this.total+'and '+loadedCount+'is less than'+ (this.total-this.rows));
	this.showPics(this.page_num);

     
      }else{  this.end = true;

                 }

               }


             },
 getMore: function(total){
if(this.end == false){

   $( window ).scroll(this.scroller.bind(this));
}else{      $('#loadMore').css('display','block');
           $('#loadMore').html('<h3>no morepics :(</h3>');}
}


  };

Pics.getPicsObject();  
