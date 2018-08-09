/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/consts.js
const BTN_TITLE = 'Feedback';
const FORM_NAME = 'Имя';
const FORM_EMAIL = 'Электронная почта';
const FORM_BTN = 'Отправить';
const FORM_TEXT = 'Ошибка';

const Const = {
    BTN_TITLE: BTN_TITLE,
    FORM_NAME: FORM_NAME,
    FORM_EMAIL: FORM_EMAIL,
    FORM_BTN: FORM_BTN,
    FORM_TEXT: FORM_TEXT
};

/* harmony default export */ var consts = (Const);

// CONCATENATED MODULE: ./src/feedback.js


class feedback_FeedbackSD {
    constructor() {
        this.params = {
            initDomId:'',
            endpoint : '',
            initBtn : null,
            initBtnTitle : consts.BTN_TITLE,
            doc: {},
            isInit: false
        };
    }

    checkParams(params) {

        if (params && params.id) {
            this.params.initDomId = params.id;
        } else {
            console.log('check id');
            return false;
        }

        if (params && params.initBtnTitle) {
            this.params.initBtnTitle = params.initBtnTitle;
        }

        if (params && params.endpoint) {
            this.params.endpoint = params.endpoint;
        } else {
            console.log('check endpoint');
            return false;
        }

        return true;
    }

    getFormTemplate() {
        var html = [
            '<div class="fbSD_form_wrapper">',
            '<a id="closeBtn" class="close_btn">X</a>',
            '<div>',
            '<label id="nameFeedbackFormLabel">'+consts.FORM_NAME+'</label>',
            '<input type="text" id="nameFeedbackForm" name="name"/>',
            '</div>',
            '<div>',
            '<label>' + consts.FORM_EMAIL + '</label>',
            '<input type="text" id="emailFeedbackForm" name="email"/>',
            '</div>',
            '<div>',
            '<label>' + consts.FORM_TEXT + '</label>',
            '<textarea name="textError" id="textFeedbackForm" rows="3"></textarea>',
            '</div>',
            '<button type="submit" id="formSubmit">'+ consts.FORM_BTN +'</button>',
            '</div>',
        ].join('');
        return html;
    }

    init(params, dom) {

        if (dom) {
            this.params.doc = dom.window.document;
        } else {
            this.params.doc = window.document;
        }

        if (this.checkParams(params)) {
            const initDom = this.params.doc.getElementById(params.id);
            if (initDom) {
                this.params.initBtn = this.params.doc.createElement('button');
                //.setAttribute('buttonId', 'buttonId');
                this.params.initBtn.innerHTML = this.params.initBtnTitle;
                initDom.appendChild(this.params.initBtn);
                this.initOnBtnClick();
            }

        } else {
            console.log('Not initialized');
        }
    }

    initOnBtnClick() {
        this.params.initBtn.onclick = this.loadForm.bind(this);
    }


    initOnFormClick() {
        const submitBtn = this.params.doc.getElementById('formSubmit');
        submitBtn.onclick = this.sendForm.bind(this);
    }

    getFormValues() {
        const nameFeedbackForm = document.getElementById('nameFeedbackForm').value;
        const emailFeedbackForm = document.getElementById('emailFeedbackForm').value;
        const textFeedbackForm = document.getElementById('textFeedbackForm').value;

        if (nameFeedbackForm && textFeedbackForm) {
            return {
                name: nameFeedbackForm,
                email: emailFeedbackForm ? emailFeedbackForm  : '',
                text: textFeedbackForm};
        }

        return {name: '', email: '', text: ''};
    }

    sendForm(e, req) {

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        let reqObject = {};

        if (req) {
            reqObject = req;
        } else {
            reqObject = this.getFormValues();
        }

        let xhr = new XMLHttpRequest();
        let body = 'name=' + encodeURIComponent(reqObject.name) +
            '&email=' + encodeURIComponent(reqObject.email)+
            '&text=' + encodeURIComponent(reqObject.text);

        xhr.open('POST', this.params.endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        return false;
    }

    initEndPoint(endpoint){
        this.params.endpoint = endpoint;
    }

    loadForm() {
        if (this.params.isInit === true) {
            return false;
        }
        let formWrapper = this.params.doc.createElement('form');
        formWrapper.setAttribute('id', 'formId');
        formWrapper.innerHTML = this.getFormTemplate();
        let initDom = this.params.doc.getElementById(this.params.initDomId);
        initDom.appendChild(formWrapper);
        this.initOnFormClick();
        this.initOnCloseClick();
        this.params.isInit = true;
    }

    initOnCloseClick() {
        const closeBtn = this.params.doc.getElementById('closeBtn');
        closeBtn.onclick = this.closeForm.bind(this);
    }

    closeForm(){
        const formNode = this.params.doc.getElementById('formId');
        while (formNode.hasChildNodes()) {
            formNode.removeChild(formNode.lastChild);
        }
        formNode.remove();
        this.params.isInit = false;
    }
}

// CONCATENATED MODULE: ./src/index.js

const feedbackSD = new feedback_FeedbackSD();
Object.freeze(feedbackSD);
window.feedbackSD = feedbackSD;
/* harmony default export */ var src = __webpack_exports__["default"] = (feedbackSD);





/***/ })
/******/ ]);