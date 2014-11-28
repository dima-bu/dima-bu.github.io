
$(document).ready(function() {
  
/*POPUP*/

var section_title = $("h1").html();
$('.fancybox').fancybox({
				padding : ( [85, 97, 75, 97]),
                                nextEffect  : 'fade',
                                width:100,
                                height: 100,
				nextSpeed  : 0,
				prevEffect : 'fade',
				prevSpeed  : 0,
                                afterLoad : function() {
					this.title = (this.index + 1) + '/' + this.group.length + (this.title ? ' - ' + this.title : '');
				},
                                closeBtn: true,
                                tpl: {
	wrap     : '<div class="fancybox-wrap" tabIndex="-1"><h2>Nana Hernandez Getashvili</h2><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
	image    : '<img class="fancybox-image" src="{href}" alt="" />',
	iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
	error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
	closeBtn : '<div class="fancybox-item fancybox-close sl_dark current-section current-section_top" href="javascript:;"><a><span>Назад в раздел «' + section_title + '»</span></a></div>',
	next     : '<a class="fancybox-nav fancybox-next" href="javascript:;"></a>',
	prev     : '<a  class="fancybox-nav fancybox-prev" href="javascript:;"></a>'
}
				
			});
                        
                        
 /*SLIDER*/



});

