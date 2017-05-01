import {I18n} from 'react-redux-i18n';
import 'whatwg-fetch';

export const tr = (word) => {
  return I18n.t(word);
};

export const initTranslationsObject = () => {

  const promisses = [];
  const locales = ['ru', 'en'];

  locales.forEach((lang)=>{
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

  return Promise.all(promisses).then((values) => {
    return values;
  }, reason => {
    console.log('initTranslationsObject ERROR')
  });

};

