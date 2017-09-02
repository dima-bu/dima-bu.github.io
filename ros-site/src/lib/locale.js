import {I18n} from 'lib/react-redux-i18n'
import 'whatwg-fetch'
import React from 'react'
import EmojiApprove from './assets/emoji-approve.png'
import EmojiSmiling from './assets/emoji-smiling.png'
import EmojiWink from './assets/emoji-wink.png'
import EmojiSurprise from './assets/emoji-surprise.png'

export const tr = (word, format = false) => {
  let newText;

  if(format) {
    newText = formatText(I18n.t(word));
  } else {
    newText = I18n.t(word);
  }
  return newText;
};

export const formatText = (result) => {
  let replaces = [];
  replaces = result.match(/\/:emo-[A-Za-z]{3,8}/g);

  if (replaces && replaces.length) {
    replaces = replaces.map(mathItem => {
      return mathItem.split('-')[1]
    });
  }

  function flatMap(array, fn) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      var mapping = fn(array[i]);
      result = result.concat(mapping);
    }
    return result;
  }

  let i = 0;

  const getEmoji = (num) => {
    switch (num) {
      case "smiling":
        return <img height="24" width="24" className="emoji-img" src={EmojiSmiling} />
        break;
      case "wink":
        return <img height="24" width="24" className="emoji-img" src={EmojiWink} />
        break;
      case "surprise":
        return <img height="24" width="24" className="emoji-img" src={EmojiSurprise} />
        break;
      case "approve":
        return <img height="24" width="24" className="emoji-img" src={EmojiApprove} />
        break;
    }
  }

  if(replaces && replaces.length) {
    result = flatMap(result.split(/\/:emo-[A-Za-z]{3,8}/), function (part) {
      i = i +1;
      if(replaces.length >= i) {
        return [part, getEmoji(replaces[i-1])];
      } else {
        return part
      }
    });

    let newResult = [];

    result.forEach(item => {
      if ((typeof item) === 'string') {
        let res = flatMap(item.split('/n'), function (part) {
          return [part, <br />];
        });
        res.pop();

        res.forEach(item => {
          newResult.push(item);
        })

      } else {
        newResult.push(item)
      }
    });

    return newResult;
  } else {
   if (result) {
     let res = flatMap(result.split('/n'), function (part) {
       return [part, <br />];
     });
     res.pop();
     return res;
   }
  }
  return result;
};

export const jsonp = (url, callback) => {
  let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window[callbackName] = function(data) {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  let script = document.createElement('script');
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.body.appendChild(script);
}

export const jsonpPromise = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userLang = navigator.language || navigator.userLanguage;
      if (userLang.indexOf('ru') || userLang.indexOf('RU')) {
        resolve('ru')
      } else {
        resolve('en')
      }

    }, 0);

    // jsonp(url, data => {
    //  if (data && data['X-Appengine-Country']) {
    //    resolve(data['X-Appengine-Country'])
    //  } else {
    //    reject('jsonpPromise')
    //  }
    // })
  })
}

export const initTranslationsObject = () => {

  const promisses = []
  const locales = ['ru', 'en']

  locales.forEach((lang) => {
    promisses.push(new Promise((resolve, reject)=>{
      fetch(`./../../i18n/${lang}.json`).then((resp) => {
        let langObj = {
          lang: lang
        };
        langObj.vocabulary = require(`./../../i18n/${lang}.json`);
        resolve(langObj);
      }, ()=>{
        resolve({});
      });
    }))
  });

 // promisses.push(jsonpPromise('http://ajaxhttpheaders.appspot.com'))

  return Promise.all(promisses).then((values) => {
    return values;
  }, reason => {
    console.log('initTranslationsObject ERROR')
  });

};

