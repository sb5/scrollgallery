function showIt(id){
 $('#'+id).fadeIn(500);

}

var Pics ={
  rows: 4,
  imgHeight:200,
  imgObj:{},
  total:0,
  page : 0,
  end:false,
  row_num:0,

  startRow:function(){
    $("#result").append('<div class = "row" id= "row'+this.row_num+'">');
  this.loopThru();
  },
  loopThru:function(){
  
  num = this.page;


  nd = num+4; 
  for(var i = num; i < nd; i++) {


 if(i==num){}
 var obj = z.image_array[i];




    $("#row"+this.row_num).append('<div class ="col-md-3 imgcontainer"><img id = "'+obj.id+'"  class = "profileImg img-rounded img-responsive" style = "display:none;" onload = "showIt('+obj.id+')" src = "/images/2014_conf/'+obj.imgUrl+'"/></div>');



    if(i == nd){$("#result").append('</div>');}

  }
  },
  endRow:function(){
  $("#result").append('</div>');this.row_num++;
  },
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
    z = this.imgObj;
 	ht = $(window).height();
    if(z){  numRows = Math.floor(ht/this.imgHeight);
    for(x=1;x<=numRows;x++){
		this.startRow();

		this.endRow();
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






var loadedCount =  $('.profileImg').length;
   





      if(loadedCount < this.total && loadedCount < (this.total-this.rows) ){
        console.log(loadedCount+'isless  than'+this.total+'and '+loadedCount+'is less than'+ (this.total-this.rows));
        this.showPics(this.page);


      }else{  this.end = true;this.noMore();

      }

    }





  }},
  getMore: function(total){


   $( window ).scroll(this.scroller.bind(this));

 }


};

Pics.getPicsObject();
