
            jQuery(document).ready(function($) {
                    if ( $.browser.msie & parseInt($.browser.version, 10) == 9 || parseInt($.browser.version, 10) == 8 || parseInt($.browser.version, 10) == 7)
                     {

                        $('#see_more_pic').click(function () {
                                $('<li class="fl_l w_33"></li><li class="fl_l w_33"></li><li class="fl_l w_33"></li>').appendTo("#architecture-gallary");
                                $("#architecture-gallary li").eq(-3).load("/interior.html #architecture-gallary li:nth-child(1) .img-blackwrapper");
                                $("#architecture-gallary li").eq(-2).load("/interior.html #architecture-gallary li:nth-child(2) .img-blackwrapper");
                                $("#architecture-gallary li").eq(-1).load("/interior.html #architecture-gallary li:nth-child(3) .img-blackwrapper");
                                $('#architecture-gallary').animate({
                                            height: "+=270"
                                          }, 1500 );
                                return false;
                        })

                    } else  {

                        $('#see_more_pic').click(function () {
                                $('<li class="fl_l w_33"></li><li class="fl_l w_33"></li><li class="fl_l w_33"></li>').appendTo("#architecture-gallary");
                                $("#architecture-gallary li").eq(-3).load("/interior.html #architecture-gallary li:nth-child(1) .img-blackwrapper");
                                $("#architecture-gallary li").eq(-2).load("/interior.html #architecture-gallary li:nth-child(2) .img-blackwrapper");
                                $("#architecture-gallary li").eq(-1).load("/interior.html #architecture-gallary li:nth-child(3) .img-blackwrapper");
                                $('#architecture-gallary').css('height', $('#architecture-gallary').height()+275);
                                return false;
                            })


                            };

            })
