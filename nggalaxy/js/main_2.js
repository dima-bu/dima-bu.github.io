
$(document).ready(function() {
  
/*GALLERY*/  
  
  $(".photo-list img").click(function() {
	// see if same thumb is being clicked
	if ($(this).parent('.img-greywrapper').hasClass("active")) { return; }
 
	// calclulate large image's URL based on the thumbnail URL (flickr specific)
	var url = $(this).attr("alt");
 
	// get handle to element that wraps the image and make it semi-transparent
	var wrap = $("#big_photo").fadeTo("medium", 0.5);
 
	// the large image from www.flickr.com
	var img = new Image();
 
	// call this function after it's loaded
	img.onload = function() {
 
		// make wrapper fully visible
		wrap.fadeTo("fast", 1);
 
		// change the image
		wrap.find("img").attr("src", url);
 
	};
 
	// begin loading the image from www.flickr.com
	img.src = url;
 
	// activate item
	$(".img-greywrapper").removeClass("active");
	$(this).parent('.img-greywrapper').addClass("active");
 
// when page loads simulate a "click" on the first image

}).filter(":first").click();

/*END GALLERY*/  


/*FIXED MENU*/
  // jQuery(document).ready(function($) {
  //               jQuery(window).scroll(function() {
  //                  /* alert ($('.main_menu').offset().top);*/

  //               if (  jQuery(window).scrollTop() > 200 )
  //               {  
  //               $('.main_menu__vertical').fadeIn();
  //               } 
  //               else
  //               {
  //               $('.main_menu__vertical').fadeOut();
  //               }             
  //           });

  //           });
    jQuery(document).ready(function($) {
				$(window).resize(function() {
					  $('#mainmenu-vertical').css('width', $( "#main-wrapper").width());
					  $('#mainmenu-vertical').css('padding-left', $("#main-wrapper").offset().left+2 ); 
				});					
				
				
                jQuery(window).scroll(function() {
                   /* alert ($('.main_menu').offset().top);*/
                var h = jQuery(window).scrollTop();
                
//                h1 = h - 22;

 				if (  jQuery(window).scrollTop() > 200 )

 				{ 					// $('#mainmenu-vertical').animate({  	top: h1   }, 0, function() {   // Animation complete. 
//  });
 					$('#mainmenu-vertical').css('width', $( "#main-wrapper").width());
					$('#mainmenu-vertical').css('padding-left', $("#main-wrapper").offset().left+2 ); 
//					alert ($("#main-wrapper").offset().left);
//					alert ($("#main-wrapper").position().left );
					
					
					$('#mainmenu-vertical').fadeIn('fast');
					

 				}

 				else 
 				{
					 $('#mainmenu-vertical').hide(); //alert (1);
 				}

            });

            });
/* END FIXED MENU*/  


});

