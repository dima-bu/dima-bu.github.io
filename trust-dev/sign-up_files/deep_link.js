function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
		uaindex = userAgent.indexOf( 'OS ' );
		if ( uaindex > -1 ){
			userOSver = userAgent.substr( uaindex + 3, 3 ).replace( '_', '.' );
			if (userOSver >= 9.0){
				return 'iOS';
			}else{
				return 'iOS';
			}
		} else{
			return 'iOS';
		}
	}else if( userAgent.match( /Android/i ) ){
		return 'Android';
	}else{
		return 'unknown';
	}
}

function checkMobileApp(ti_app_title, ti_app_author, site_relative_url, append_to_selector, uuid, type, id){

	var smartbanner = true;
	var url = '';
	var android_url = '';
	var path = window.location.pathname;

	if (path == '/'){
		url = "trustedinsight:///STREAM/";
		android_url = "trustedinsight://STREAM/";
	}else if (path == '/platform-dashboard/'){
		url = "trustedinsight:///STREAM/";
		android_url = "trustedinsight://STREAM/";
	}else if(path == '/sign-up/'){
		url = "trustedinsight:///SIGN-UP/";
		android_url = "trustedinsight://SIGN-UP/";
	}else if(path == '/contacts/'){
		url = "trustedinsight:///CONTACTS/";
		android_url = "trustedinsight://CONTACTS/";
	}else if(path == '/profile/bookmarks/'){
		url = "trustedinsight:///BOOKMARKS/";
		android_url = "trustedinsight://BOOKMARKS/";
	}else if(path == '/account/settings/'){
		url = "trustedinsight:///ACCOUNT/";
		android_url = "trustedinsight://ACCOUNT/";
	}else if(path == '/profile/edit/'){
		url = "trustedinsight:///ACCOUNT/EDIT/";
		android_url = "trustedinsight://ACCOUNT/EDIT/";
	}else if(path == '/notifications/'){
		url = "trustedinsight:///NOTIFICATIONS/";
		android_url = "trustedinsight://NOTIFICATIONS/";
	}else if(path == '/phone-number/'){
		url = "trustedinsight:///PHONENUMBER/";
		android_url = "trustedinsight://PHONENUMBER/";
	}else if(path == '/people/'){
		url = "trustedinsight:///SEARCH/";
		android_url = "trustedinsight://SEARCH/";
	}else if(path.indexOf('/investment-firm-profile/') == 0 && uuid != ''){
		url = "trustedinsight:///FIRM/"+uuid+"/";
		android_url = "trustedinsight://FIRM/"+uuid+"/";
	}else if(path.indexOf('/investment-professional/') == 0 && uuid != ''){
		url = "trustedinsight:///PROFILE/"+uuid+"/";
		android_url = "trustedinsight://PROFILE/"+uuid+"/";
	}else if(path.indexOf('/investment-news/') == 0 && uuid != ''){
		url = "trustedinsight:///NEWS/"+uuid+"/";
		android_url = "trustedinsight://NEWS/"+uuid+"/";
	}else if(path.indexOf('/investment-jobs/') == 0 && uuid != ''){
		url = "trustedinsight:///JOB/"+uuid+"/";
		android_url = "trustedinsight://JOB/"+uuid+"/";
	}else if(path.indexOf('/institutional-investor-event/') == 0 && uuid != ''){
		url = "trustedinsight:///EVENT/"+uuid+"/";
		android_url = "trustedinsight://EVENT/"+uuid+"/";
	}else if(path.indexOf('/rankings/') == 0 && uuid != ''){
		url = "trustedinsight:///RANKING/"+uuid+"/";
		android_url = "trustedinsight://RANKING/"+uuid+"/";
	}else if(path.indexOf('/syndicates/') == 0 && uuid != ''){
		url = "trustedinsight:///SYNDICATE/"+uuid+"/";
		android_url = "trustedinsight://SYNDICATE/"+uuid+"/";
	}else if(path.indexOf('/search-and-hire/') == 0 && uuid != ''){
		url = "trustedinsight:///SNH/"+uuid+"/";
		android_url = "trustedinsight://SNH/"+uuid+"/";
	}else if(path.indexOf('/chat/') == 0 && uuid != ''){
		if (type != '' && id != '' && typeof type != 'undefined' && typeof id != 'undefined'){
			url = "trustedinsight:///CHAT/"+uuid+"/?type="+type+"&id="+id;
			android_url = "trustedinsight://CHAT/"+uuid+"/?type="+type+"&id="+id;
		}else{
			url = "trustedinsight:///CHAT/"+uuid+"/";
			android_url = "trustedinsight://CHAT/"+uuid+"/";
		}
	}else{
		smartbanner = false;
	}

	var userAgent = getMobileOperatingSystem();
	if (userAgent == 'Android'){
		url = android_url;
	}
	
	if (smartbanner == true){
		$.smartbanner({
			title: ti_app_title,
			author: ti_app_author,
			url: url,
			appendToSelector: append_to_selector,
			layer: false
		});
	}
}