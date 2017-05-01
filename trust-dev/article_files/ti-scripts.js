"use strict";

$(function () {
	// tooltip config
	$(".ti-tooltip--badge").each(function(i, elm) {
		var text = $(elm).attr("data-title");
		var span = $("<div>").text(text);
		var target = $("<div>").addClass("tooltip-data");
		var offsetRight = $(elm).offset().left + $(elm).outerWidth() + (text.length * 7);
		var windowWidth = $(window).outerWidth();
		target.width(text.length * 7);
		if(offsetRight > windowWidth) {
			target.removeClass("right").addClass("left");
		} else {
			target.removeClass("left").addClass("right");
		}
		target.append(span);
		$(elm).append(target);
	})

	// social share modal
	$("[data-toggle-modal]").click(function(e) {
		e.preventDefault();
		var $target = $(this).next();
		if($target.hasClass('share-icon--modal')) {
			$target.addClass("open");
		}
	});

	$(".share-icon--modal").click(function(e)  {
		$(this).removeClass('open');
	});

	$("[data-scroll]").click(function(e) {
		var attr = $(e.target).attr('href');
		if (typeof attr === typeof undefined && attr === false) {
			e.preventDefault();
			console.log(e.target);
		}
		var target = $($(this).attr("data-scroll"));
		$("html, body").animate({
			scrollTop: target.offset().top
		}, 700);
	});

	$("[data-toggle]").each(function(){
		$(this).on("click", function(e){
			e.preventDefault();
			var target = $($(this).attr("data-toggle"));
			target.toggleClass("open");
		});
	});

	$("[data-toggler]").each(function () {
		$(this).click(function (e) {
			e.preventDefault();
			var pclass = $(this).attr("data-toggler");
			var parent = $(this).closest("." + pclass);
			var parentUl = parent.parent( "ul" );

			parentUl.find("[data-toggler]").parent( "li" ).not( parent ).removeClass( "open" );
			parent.toggleClass("open");
		});
	});

	$("[data-toggle-target]").each(function () {
		$(this).click(function (e) {
			var pclass = $(this).attr("data-toggle-target");
			e.preventDefault();
			var parent = $(pclass);
			parent.toggleClass("open");
			$(this).toggleClass("open");
		});
	});

	$("[data-hide]").each(function(){
		$(this).click(function (e) {
			e.preventDefault();
			var elm = $(this).attr("data-hide");
			if(elm.indexOf(" ") != -1) {
				var el = elm.split(" ");
				$(el).each(function(){
					if( $(this).hasClass("open") ) {
						$(this).removeClass("open");
					}
				});
			} else {
				if( $(elm).hasClass("open") ) {
					$(elm).removeClass("open");
				}
			}
		});
	});

	stickyNavbar();
	fixBodyHeight();
	profileCarousel();
	new tiTypeahead($("#id_ti_typeahead"));
	new tiTypeahead($("#id_ti_typeahead_small"));
});

function enableSlideShowDismiss() {
	$(document).on("keydown.stream--carousel-syn", function(e) {slideShowDismiss(e);});
}

function disableSlideShowDismiss() {
	$(document).off("keydown.stream--carousel-syn", function(e) {slideShowDismiss(e);});
}

function slideShowDismiss(e) {
	var self = $(".stream--carousel-syn"),
		icon = self.find(".glyphicon-resize-small");
	if(e.which == "27" && self.hasClass("full-slide-show")) {
		e.preventDefault();
		self.removeClass("full-slide-show");
		icon.removeClass("glyphicon-resize-small").addClass("glyphicon-resize-full");
		$("body").css("overflow-y", "initial");
		expandSlideShow = !expandSlideShow;
	}
}


function profileCarousel() {
	var item = $(".profile-carousel--item"),
		space = item.parent(),
		gutter = 30,
		delta = item.width();

		if(!space.hasClass("profile-carousel--space") || item.length == 0) {
			return;
		}

		space.width((delta + gutter) * item.length);

	var currentScroll = $(space.parent()).scrollLeft(),
		prevScroll = currentScroll;

	$(".slider--left").on("click", function(e){
		e.preventDefault();
		currentScroll = $(space.parent()).scrollLeft();
		$(space.parent()).animate({
			scrollLeft: (currentScroll - item.width())
		}, 400);
	});

	$(".slider--right").on("click", function(e){
		e.preventDefault();
		currentScroll = $(space.parent()).scrollLeft();
		$(space.parent()).animate({
			scrollLeft: (currentScroll + item.width())
		}, 400);
	});

	// $(space.parent()).on("mousewheel", function(event, delta = event.originalEvent.deltaY) {
	// 	this.scrollLeft += (delta);
	// 	currentScroll = $(this).scrollLeft();
	// 	if(prevScroll !== currentScroll) {
	// 		event.preventDefault();
	// 	}
	// 	prevScroll = currentScroll;
	// });
}

// $(window).on("resize", stickyNavbar());

function fixBodyHeight() {
	var docHeight = $(document).height(),
		bodyHeight = $("body").height(),
		footer = $("#id_footer_main"),
		winHeight = $(window).height();

		if(window.innerWidth < 768) {
			return;
		}

		if(docHeight < winHeight || (docHeight == winHeight && bodyHeight <= winHeight)) {
			$("body").css("height", "100vh");
			footer.css("position","absolute")
				  .css("bottom","0px")
				  .css("left","0px")
				  .css("right","0px");
		} else {
			$("body").css("height", "auto");
			footer.css("position","initial");
		}
}

function stickyNavbar() {
	var headTop = $(".ti-nav-top"),
		fixedTop = $("#navbar_header"),
		headMain = $(".ti-navbar"),
		leftPanel = $("#id_sidebarLeft > .ti-sidebar-left"),
		footer = $("#id_footer_main"),
		smartbanner = $("#smartbanner"),
		headWrap = $(".ti-header-wrap"),
		head = $("#main_navbar"),
		profileBriefBar = $("#id_profile_brief"),
		profileBriefBarReveal = $("#section_2"),
		prevScroll = window.scrollY || 0,
		smbanner = false;

	if(headTop.length == 0 || headMain.length == 0) {
		return;
	}

	if(smartbanner.length != 0) {
		smbanner = true;
	}

	if(profileBriefBar.length != 0) {
		if(prevScroll > profileBriefBarReveal.offset().top) {
			profileBriefBar.show();
			profileBriefBar.css("top", (headWrap.outerHeight() + 5));

		} else {
			profileBriefBar.css("top", (-profileBriefBar.outerHeight()));
		}
	}

	if(smbanner) {
		fixedTop.css("position", "relative");
		smartbanner.css("z-index", fixedTop.css("z-index") - 10);

		var sbHeight = smartbanner.outerHeight();
		headWrap.css("height", (sbHeight + fixedTop.outerHeight()));

		if(profileBriefBar.length != 0) {
			profileBriefBar.hide();
		}

		$(window).scroll(function(event) {
			var bodyScroll = window.scrollY;
			if(bodyScroll > sbHeight) {
				fixedTop.removeAttr("style");
			} else if (bodyScroll < (sbHeight - 50)) {
				fixedTop.css("position", "relative");
			}
		});
	} else {
		var footerHeight = footer.length != 0 ? footer.height() : 0;


		if(leftPanel.length > 0) {
			var leftPanelPosition = leftPanel.parent().offset(),
				lpTop = 77,
				lpLeft = leftPanelPosition.left + 15,
				hOff = window.innerHeight - footerHeight - lpTop - 30;
			leftPanel.css("width", (leftPanel.parent().outerWidth() - 15))
				 .css("height", hOff);
		}

		$(window).scroll(function(event) {
			var scrollY = window.scrollY || 0;
			if(scrollY > prevScroll) {
				headTop.css("top", (-headTop.height()));
				headMain.css("top", "0px");
				if(leftPanel.length > 0) { leftPanel.css("top", (lpTop - headTop.height())); }
				if(profileBriefBar.length != 0) {
					if(scrollY > profileBriefBarReveal.offset().top) {
						profileBriefBar.show();
						profileBriefBar.css("top", (headWrap.height() + 5 - headTop.height()));
					}
				}
			} else {
				headTop.css("top", "0px");
				headMain.css("top", headTop.height());
				if(leftPanel.length > 0){ leftPanel.css("top", (lpTop)); }
				if(profileBriefBar.length != 0) {
					if(scrollY < profileBriefBarReveal.offset().top) {
						profileBriefBar.css("top", (-profileBriefBar.height()));
					} else {
						profileBriefBar.css("top", (headWrap.height() + 5));
					}
				}
			}
			prevScroll = scrollY;
		});
	}


}

function tiTypeahead(el) {
	// input element
	this.input = el;

	// default options
	this.options = {
		url: "/autocomplete/search-beta/?q=",
		minLength: 2,
		append: $("#show_typeahead")
	};

	// default classes
	this.classes = {
		wraper: "ti-typeahead",
		wraperBody: "ti-typeahead-body",
		bodyResult: "body--results",
		result: "ti-typeahead-results",
		links: "ti-typeahead-links",
		img: "image",
		txt: "text",
		opt: "opt",
		muted: "muted",
		active: "active",
		footer: "ti-typeahead-footer"
	};

	this.footerHref = [
		"/investment-jobs/?q=",
		"/investment-news/?q=",
		"/institutional-investor-events/?q=",
		"/firms/?q=",
		"/investment-rankings-directory/?q=",
		"/search-and-hire/?q=",
		"/syndicates/?q=",
		"/people/?q="
	];

	this.footerLinks = [
		$('<a>Jobs</a>'),
		$('<a>News</a>'),
		$('<a>Events</a>'),
		$('<a>Firms</a>'),
		$('<a>Rankings</a>'),
		$('<a>Search & Hire</a>'),
		$('<a>Syndicates</a>'),
		$('<a>People</a>')
	];

	this.footerList = [
		$("<li>").addClass(this.classes.opt).addClass(this.classes.muted),
		$("<li>").addClass(this.classes.opt),
		$("<li>").addClass(this.classes.opt),
		$("<li>").addClass(this.classes.opt),
		$("<li>").addClass(this.classes.opt),
		$("<li>").addClass(this.classes.opt),
		$("<li>").addClass(this.classes.opt),
		$("<li>").addClass(this.classes.opt),
		$("<li>").addClass(this.classes.opt)
	];

	// default elements
	this.elm = {
		main: $("<div>"),
		innerBody: $("<div>"),
		innerBodyResult: $("<div>").addClass(this.classes.bodyResult),
		cont: $("<div>").addClass("container ti-container"),
		header: $("<div>"),
		row: $("<div>").addClass("row"),
		footer: $("<div>")
	};

	// capture these keys
	this.keys = {
		ESC: 27,
		EN: 13
	}

	// track ajax current request
	this.currentRequest = "";

	// track error status
	this.error = false;

	// initialize
	this.init();
}

tiTypeahead.prototype = {
	onKeyPress: function(e) {
		var self = this;
		var opt = this.options;

		// hide autocomplete when ESC pressed
		if(e.which === self.keys.ESC) {
			e.preventDefault();
			self.hideTypeahead();
			self.disableKillerFn();
			return;
		}

		// prevent form submit callback()
		if(e.which === self.keys.EN) {
			// e.preventDefault();
		}

		// break callback() when less characters
		if(e.target.value.length < self.options.minLength) {
			self.hideTypeahead();
			return;
		}

		// setup ajax
		var ajaxSettings = {
			url: opt.url + e.target.value,
			type: "GET"
		}

		// abort panding ajax response
		if(self.currentRequest !== "" && self.currentRequest.pipe()) {
			self.currentRequest.abort();
		}

		// remove default autocomplete from element
		self.input.attr("autocomplete", "off");

		// ajax callback()
		self.currentRequest = $.ajax(ajaxSettings).done(function(data){
			self.clear();
			self.formatData(e.target.value, data);
			self.enableKillerFn();
		}).fail(function (jqXHR, textStatus, errorThrown){
			self.showError();
		});
	},

	showError: function(err) {
		var self = this;

		if(self.error) {
			return;
		}

		if(err !== "error") {
			return
		}

		self.clear();

		var div = $("<div>"),
			result = $("<div>").addClass(self.classes.result),
			elm = $("<div>").addClass("col-sm-12");

		var nosugg = $("<div>").addClass("text-center").text("Something went wrong.");
		result.append(nosugg);
		div.append(result);
		elm.append(div);
		self.elm.row.append(elm);
		self.showTypeahead();

		self.error = true;
	},

	formatData: function(q, response) {
		// abort when no response
		if( response === "undefined" ) {
			return;
		}

		var self = this,
			opt = this.options,
			elm = this.elm,
			data = $.parseJSON(response),
			cols = {
				col1: $("<div>").addClass("col-sm-4"),
				col2: $("<div>").addClass("col-sm-4"),
				col3: $("<div>").addClass("col-sm-4"),
				col4: $("<div>").addClass("col-sm-4"),
				col5: $("<div>").addClass("col-sm-4"),
				col6: $("<div>").addClass("col-sm-4"),
				col7: $("<div>").addClass("col-sm-4"),
				col8: $("<div>").addClass("col-sm-4")
			};

		var buffer = 0,
			bufferLength = 3;

		// structure autocomplete
		if( data.news.length != 0 && buffer < bufferLength) {
			cols.col1.append($("<span>").addClass(self.classes.opt).html("News &#160&#160&#160"));
			cols.col1.append($("<a>").attr("href", "/investment-news/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.news.length; i++) {
				self.createSuggestions(data.news[i], q, cols.col1);
			}
			elm.row.append(cols.col1);
			self.footerList[2].addClass('hidden');
			buffer++;
		}
		if( data.jobs.length != 0 && buffer < bufferLength) {
			cols.col2.append($("<span>").addClass(self.classes.opt).html("Jobs &#160&#160&#160"));
			cols.col2.append($("<a>").attr("href", "/investment-jobs/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.jobs.length; i++) {
				self.createSuggestions(data.jobs[i], q, cols.col2);
			}
			elm.row.append(cols.col2);
			self.footerList[1].addClass('hidden');
			buffer++;
		}
		if( data.firms.length != 0 && buffer < bufferLength) {
			cols.col3.append($("<span>").addClass(self.classes.opt).html("Firms &#160&#160&#160"));
			cols.col3.append($("<a>").attr("href", "/firms/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.firms.length; i++) {
				self.createSuggestions(data.firms[i], q, cols.col3);
			}
			elm.row.append(cols.col3);
			self.footerList[4].addClass('hidden');
			buffer++;
		}
		if( data.profiles.length != 0 && buffer < bufferLength) {
			cols.col4.append($("<span>").addClass(self.classes.opt).html("People &#160&#160&#160"));
			cols.col4.append($("<a>").attr("href", "/people/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.profiles.length; i++) {
				self.createSuggestions(data.profiles[i], q, cols.col4);
			}
			elm.row.append(cols.col4);
			self.footerList[8].addClass('hidden');
			buffer++;
		}
		if( data.rankings.length != 0 && buffer < bufferLength) {
			cols.col5.append($("<span>").addClass(self.classes.opt).html("Rankings &#160&#160&#160"));
			cols.col5.append($("<a>").attr("href", "/investment-rankings-directory/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.rankings.length; i++) {
				self.createSuggestions(data.rankings[i], q, cols.col5);
			}
			elm.row.append(cols.col5);
			self.footerList[5].addClass('hidden');
			buffer++;
		}
		if( data.events.length != 0 && buffer < bufferLength) {
			cols.col6.append($("<span>").addClass(self.classes.opt).html("Events &#160&#160&#160"));
			cols.col6.append($("<a>").attr("href", "/institutional-investor-events/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.events.length; i++) {
				self.createSuggestions(data.events[i], q, cols.col6);
			}
			elm.row.append(cols.col6);
			self.footerList[3].addClass('hidden');
			buffer++;
		}
		if( data.snh.length != 0 && buffer < bufferLength) {
			cols.col7.append($("<span>").addClass(self.classes.opt).html("Search & Hires &#160&#160&#160"));
			cols.col7.append($("<a>").attr("href", "/search-and-hire/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.snh.length; i++) {
				self.createSuggestions(data.snh[i], q, cols.col7);
			}
			elm.row.append(cols.col7);
			self.footerList[6].addClass('hidden');
			buffer++;
		}
		if( data.syndicates.length != 0 && buffer < bufferLength) {
			cols.col8.append($("<span>").addClass(self.classes.opt).html("Syndicates &#160&#160&#160"));
			cols.col8.append($("<a>").attr("href", "/syndicates/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
			for(var i = 0; i < data.syndicates.length; i++) {
				self.createSuggestions(data.syndicates[i], q, cols.col8);
			}
			elm.row.append(cols.col8);
			self.footerList[7].addClass('hidden');
			buffer++;
		}

		// no results
		if( buffer == 0 ) {
			var col12 = $("<div>").addClass("col-sm-12");
			self.createSuggestions(null, q, col12);
			elm.row.append(col12);
		}

		self.updateFooterLink(q);

		// show typeahead after formating all data
		self.showTypeahead();
	},

	createSuggestions: function(data, q, elm) {
		var self = this,
			opt = this.options;

		var div = $("<div>"),
			result = $("<div>").addClass(self.classes.result);

		if(data === null) {
			var nosugg = $("<div>").addClass("text-center").text("No result found");
			result.append(nosugg);
			div.append(result);
			elm.append(div);
			return;
		}

		var a = $("<a>").attr("href", data.url).addClass(self.classes.links);

		var imageWrap = $("<div>").addClass(self.classes.img),
			image = $("<img>").attr("src", data.imageUrl);
			imageWrap.append(image);

		var index, subStr, sugg, titleWrap, addInfo, description, text;

		if ( data.title.toLowerCase().search(q.toLowerCase()) != -1 ) {
			index = data.title.toLowerCase().search(q.toLowerCase());
			subStr = data.title.substring(index, (index + q.length));
			sugg = data.title.replace(subStr, "<strong>" + subStr + "</strong>");

			titleWrap = $("<div>").addClass(self.classes.txt),
			addInfo = $("<span>").addClass(self.classes.muted).html(" &#8226 " + data.additionInfo),
			//description = $("<div>").addClass("font-small").addClass(self.classes.muted).html(data.description);

			text = $("<span>").html(sugg);
			text.append(addInfo);
			//text.append(description);

			titleWrap.append(text);
		}
		else if ( data.description.toLowerCase().search(q.toLowerCase()) != -1 ) {
			var trTxt = self.truncateDescription(q, data.description, 20, 20);
			index = data.description.toLowerCase().search(q.toLowerCase());
			subStr = data.description.substring(index, (index + q.length));
			sugg = trTxt.replace(subStr, "<strong>" + subStr + "</strong>");

			titleWrap = $("<div>").addClass(self.classes.txt),
			addInfo = $("<span>").addClass(self.classes.muted).html(" &#8226 " + data.additionInfo),
			description = $("<div>").addClass("font-small").addClass(self.classes.muted).html(sugg);

			text = $("<span>").html(data.title);
			text.append(addInfo);
			text.append(description);

			titleWrap.append(text);
		} else {
			titleWrap = $("<div>").addClass(self.classes.txt),
			addInfo = $("<span>").addClass(self.classes.muted).html(" &#8226 " + data.additionInfo),
			description = $("<div>").addClass("font-small").addClass(self.classes.muted).html(data.description);

			text = $("<span>").html(data.title);
			text.append(addInfo);
			text.append(description);

			titleWrap.append(text);
		}

		result.append(imageWrap);
		result.append(titleWrap);
		a.append(result);
		div.append(a);
		elm.append(div);
	},

	truncateDescription: function (q, str, min_lmt, max_lmt) {
		var index = str.toLowerCase().search(q.toLowerCase());

		if ( index == -1 ) {
			return str;
		}

		var minIndex = index - min_lmt,
			maxIndex = index + max_lmt + q.length,
			finalIndexMin, finalIndexMax;

		if ( minIndex > 0 ) {
			var splitLocationMin = str.indexOf( ' ', minIndex )

				if ( splitLocationMin != -1 ) {
					finalIndexMin = splitLocationMin;
				} else {
					finalIndexMin = 0;
				}
		} else {
			finalIndexMin = 0;
		}

		if ( maxIndex < str.length ) {
			var splitLocationMax = str.indexOf( ' ', maxIndex );
			
			if ( splitLocationMax != -1 ) {
				finalIndexMax = splitLocationMax;
			} else {
				finalIndexMax = str.length;
			}
		} else {
			finalIndexMax = str.length;
		}

		return str.substring(finalIndexMin, finalIndexMax).replace(/^\s\s*/, '');
	},

	createContainer: function() {
		var self = this,
			elm = this.elm,
			opt = this.options;

		// container elements
		elm.main.addClass(self.classes.wraper).hide();
		elm.innerBody.addClass(self.classes.wraperBody);
		elm.innerBodyResult.append(elm.header);
		elm.innerBodyResult.append(elm.row);
		elm.innerBody.append(elm.innerBodyResult);
		elm.innerBody.append(self.createFooter());
		elm.cont.append(elm.innerBody);
		elm.main.append(elm.cont);
		opt.append.append(elm.main);
	},

	createFooter: function() {
		var self = this;
		var footer = $("<div>").addClass(self.classes.footer);
		var ul = $("<ul>");

		for( var i = 0, j = 0; i <= self.footerLinks.length; i++ ) {
			if( i < 1 ) {
				self.footerList[i].text("Search in:");
			} else {
				self.footerLinks[j].attr('href', self.footerHref[j]);
				self.footerList[i].append(self.footerLinks[j]);
				j++;
			}
			ul.append(self.footerList[i]);
		}

		footer.append(ul);

		return footer;
	},

	updateFooterLink: function(q) {
		var s = this;

		for( var i = 0; i < s.footerLinks.length; i++ ) {
			s.footerLinks[i].attr("href", (s.footerHref[i] + q));
		}
	},

	showTypeahead: function() {
		// show autocomplete
		this.elm.main.show();
	},

	hideTypeahead: function() {
		// hide autocomplete
		this.elm.main.hide();
	},

	clear: function() {
		// clear old results
		this.elm.row.html("");
	},

	onBlur: function(e) {
		this.disableKillerFn();
	},

	killerFn: function(e) {
		var self = this;
		if (!$(e.target).closest('.' + self.options.wraper).length) {
			self.hideTypeahead();
		}
	},

	enableKillerFn: function () {
		var self = this;
		$(document).on('click', function(e) { self.killerFn(e) });
	},

	disableKillerFn: function() {
		var self = this;
		$(document).off('click', function(e) { self.killerFn(e) });
	},

	init: function() {
		var self = this;
		self.createContainer();
		self.input.on("keyup", function(e){ self.onKeyPress(e) });
		self.input.on("blur", function(e){ self.onBlur(e) });
	}
}

function setMenuState() {
	var local_keys = LOCAL_STORAGE.getItem('toggle-items');
	var new_local_keys = [];
	var path = window.location.pathname;

	if ( path === "/" ) {
		LOCAL_STORAGE.removeItem('toggle-items');
		return;
	}

	if ( local_keys !== null ) {
		local_keys = local_keys.split(',') || local_keys;
		if($("[data-cache]").length !== 0) {
			$("[data-cache]").each(function(index, element) {
				for ( var i = 0; i < local_keys.length; i++ ) {
					if( $(element).attr('data-cache') == local_keys[i] && !$(element).hasClass('open') ) {
						new_local_keys.push( $(element).attr('data-cache') );
						$(element).addClass('open');
						$(element).parent().addClass('open');
					}
				}
			});
		}
	} else {
		if($("[data-cache]").length !== 0) {
			$("[data-cache]").each(function(i, element) {
				if( $(element).parent('li').hasClass('open') ) {
					new_local_keys.push( $(element).attr('data-cache') );
				}
			});
			LOCAL_STORAGE.setItem('toggle-items', new_local_keys);
		}
	}
}