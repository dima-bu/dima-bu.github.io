import MainWidget from './main-widget.jsx';
//import Map from './app/map/map.js';
//import Context from './app/sdk/context.js';
import '!style!css!less!./less/style.less';
//import config from './skin/skin.conf.js'
//import Logger from './app/sdk/logger.js';

//Map.createMap([55.016667, 82.916667]);

//var keys = window.location.search
//    .substring(1)
//    .replace(/\&amp;/g, '&')
//    .split("&");
//
//var params = {};
//
//for(var i = 0; i < keys.length; i++) {
//    var parse = keys[i].split('=');
//    params[parse[0]] = parse[1]
//}
//
//if(params.skin) {
//
//    let xhr = new XMLHttpRequest();
//    xhr.open("GET", 'skin/'+params.skin+'/custom.css', false);
//    xhr.onload = function(resp) {
//        if(this.status == 200) {
//            var a = document.createElement('link');
//            document.body.appendChild(a);
//            a.rel = 'stylesheet';
//            a.href = 'skin/'+params.skin+'/custom.css'
//        }  else {
//
//        }
//    };
//    xhr.onerror = function(e) {
//        console.log(e)
//    };
//    xhr.send();
//
//    let xhrICO = new XMLHttpRequest();
//    xhrICO.open("GET", 'skin/'+params.skin+'/favicon.ico', false);
//    xhrICO.onload = function(resp) {
//        if(this.status == 200) {
//            var linkICO = document.getElementById('ico');
//            linkICO.href = 'skin/'+params.skin+'/favicon.ico'
//        }  else {
//
//        }
//    };
//    xhrICO.onerror = function(e) {
//      console.log(e)
//    };
//    xhrICO.send();
//
//    if (config[params.skin] && config[params.skin].title) {
//        var pageTitle  = document.getElementById('page-title');
//        pageTitle.innerHTML = config[params.skin].title;
//    }
//
//}

//Context.getContext().then(()=>{
//    Map.createMap([ Context.getCenter()[1], Context.getCenter()[0]]);
//});
