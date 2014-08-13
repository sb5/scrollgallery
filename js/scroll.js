function showIt(id){
 $('#'+id).fadeIn(500);

}

var Pics ={
  rows: 4,
  imgObj:{},
  total:0,
  page : 0,
  end:false,






  noMore : function(){ $('#loadMore').css('display','block');
  $('#loadMore').html('<h3>no morepics :(</h3>');},


    getPicsObject: function(){


     $.ajax({
       context:this,
       type: "POST",
       url: "gallery_data.php",

       success: function(res) {

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

for(var i = num; i < nd; i++) {
 if(i==num){$("#result").append('<div class = "row">');}
 var obj = z.image_array[i];



 var row = i+1;
    $("#result").append('<div class ="col-md-3 imgcontainer"><img id = "'+obj.id+'"  class = "profileImg img-rounded img-responsive" style = "display:none;" onload = "showIt('+obj.id+')" src = "/shop/images/'+obj.imgUrl+'"/></div>');



    if(i == nd){$("#result").append('</div>');}

  }


}


},
scroller: function() {

  if(this.end == false){
   $('#loadMore').hide();






   if($(window).scrollTop() + $(window).height() > $(document).height()) {

$('#loadMore').show();
}
if($(window).scrollTop() + $(window).height() == $(document).height() && this.end == false) {
  console.log('end is'+this.end);
  $('#loadMore').fadeOut();



this.page= this.page+this.rows;

this.page_num =this.page;




var loadedCount =  $('.profileImg').length;
   





      if(loadedCount < this.total && loadedCount < (this.total-this.rows) ){
        console.log(loadedCount+'isless  than'+this.total+'and '+loadedCount+'is less than'+ (this.total-this.rows));
        this.showPics(this.page_num);


      }else{  this.end = true;

      }

    }





  }else{this.noMore();}},
  getMore: function(total){


   $( window ).scroll(this.scroller.bind(this));

 }


};

Pics.getPicsObject();
