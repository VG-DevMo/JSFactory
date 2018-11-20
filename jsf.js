
/*******************************************************************************
* framework classes
*******************************************************************************/

class jsf {

    /**
    * returns an instance of jsfXHTTP
    */
    static get xhttp () {
      return new jsfXHTTP();
    }

    /**
    * returns an instance of jsfHTML
    */
    static get html () {
      return new jsfHTML();
    }

    /**
    * returns an instance of jsfMath
    */
    static get math () {
      return new jsfMath();
    }

    /**
    * returns an instance of jsfUtil
    */
    static get util () {
      return new jsfUtil();
    }

    /**
    * returns an instance of jsfCookie
    */
    static get cookie () {
      return new jsfCookie();
    }

    /**
    * returns an instance of jsfJson
    */
    static get json () {
      return new jsfJson();
    }

    /**
    * returns an instance of jsfBrowser
    */
    static get browser () {
      return new jsfBrowser();
    }

}


/**
* jsfxHTTP constants
**/
const _POST = 'POST';
const _GET = 'GET';
const _SET = 'SET';

class jsfXHTTP {

  /**
  * @param {string} path php-file path
  * @param {array} data xhttp-request data
  * @param {function} success function which will be executed on success
  * @param {function} error function which will be executed on error
  * @param {function} stateChanged function which will be executed by a state change
  */
  post (path, data, success, error, stateChanged) {

      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.status == 200) {
          if (typeof success !== undefined && typeof success == 'function') {
              if(this.resonseText != '' || this.response != '') {
                return success(this);
              }
          }

        } else if (this.status == 4) {
          if (typeof error !== undefined && typeof error == 'function') {
            return error(this);
          }

        } else {
          if (typeof stateChanged !== undefined && typeof stateChanged == 'function') {
            return stateChanged(this);
          }
        }

      };

      var requestString = '';

      jsf.util.foreach(data, function(e, i) {
        if (i != 0) {
          requestString += '&';
        }
        requestString += e.toString();
      });

      xhttp.open(_POST, path, true);
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhttp.send(requestString);

  }

  /**
  * @param {string} url data-url
  * @param {function} success function which will be executed on success
  * @param {function} error function which will be executed on error
  * @param {function} stateChanged function which will be executed by a state change
  */
  get (url, success, error, stateChanged) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.status == 200) {
        if (typeof success !== undefined && typeof success == 'function') {
          if(this.resonseText != '' || this.response != '') {
            return success(this);
          }
        }

      } else if (this.status == 4) {
        if (typeof error !== undefined && typeof error == 'function') {
          return error(this);
        }

      } else {
        if (typeof stateChanged !== undefined && typeof stateChanged == 'function') {
          return stateChanged(this);
        }

      }
    };

    xhttp.open(_GET, url, true);
    xhttp.send();

  }

  set () {

  }

}


class jsfHTML {

  constructor() {
    this.odom = new jsfDOM();
    this.oevent = new jsfEvent();
  }

  get dom () {
    return this.odom;
  }

  get event () {
    return this.oevent;
  }

}


class jsfDOM {

  /**
  * @param {string} id html-element id
  */
  byId (id) {
    return new jsfElement(id);
  }

}


class jsfEvent {

  /**
  * @param {function} func function wich will be executed
  */
  onDocumentLoad (func) {
    if (typeof func == 'function') {
      window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false); // Listener entfernen, da nicht mehr benötigt
        return func();
      }, false);
    } else {
      console.error('you have to add a function!');
    }
  }

  /**
  * @param {string} event Event which will be added to the object
  * @param {function} func function which will be executed when the event is triggered
  */
  addEventListener (event, func) {
    if (typeof func == 'funtion' && typeof event == 'string') {
      if(this.htmlObject !== null) {
        this.htmlObject.addEventListener(event, function eventF (e) {
          return func();
        }, false);
      } else {
        window.addCustomEventListener(event, function eventF (e) {
          return func(e);
        });
      }
    } else {

    }
  }
}


class jsfMath {



}


class jsfUtil {

    
  /**
  * @param condition condition which is asserted
  */
  assert(condition) {
    if(!condition) {
      throw new Error('Assertion failed');
    }
  }
    
  /**
  * @param {array} array
  * @param {function} func
  */
  foreach(array, func) {
    for (var i=0; i<array.length; i++) {
      func(array[i], i);
    }
  }

  /**
  * @param {integer} ms milliseconds have to wait
  */
  wait(ms) {
    var start = new Date().getTime();
    for(var i=0; i<1e7; i++) {
      if((new Date().getTime() - start) > ms) {
        break;
      }
    }
  }

  /**
  * @param {string} x string which have to be checked
  */
  isNumeric(x) {
    var r = true;
    var a = Array.from(x);

    for (var i = 0; i < a.length; i++) {
      var s = a[i];
      var z = parseInt(s, 10);
      if (isNaN(z)) {
        if (s !== ".") {
          r = false;
        }
      }
    }
    if (r) {
      var p = false;
      for (var i = 0; i < a.length; i++) {
        var s = a[i];
          if (s == '.') {
            if (p) {
              r = false;
            } else {
              p = true;
            }
          }
        }
      }
     return r;
  }


}

class jsfJson {

  /**
  * @param {string} jsonString
  */
  parse(jsonString) {
    return JSON.parse(jsonString);
  }

  /**
  * @param {object} jsonObject
  */
  stringify(jsonObject) {
    return JSON.stringify(jsonObject);
  }

}

class jsfCookie {

  /**
  * @param {string} UD_NAME name of cookie which will be removed
  */
  delete(UD_NAME) {
    if (this.exist(UD_NAME)) {
      document.cookie = UD_NAME + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  /**
  * @param {string} UD_NAME check if this cookie exists
  */
  exist(UD_NAME) {
    var val = this.read(UD_NAME);
    if (val == undefined) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * @param {string} UD_NAME name of cookie
  * @param {string} UD_VALUE value of cookie
  * expiry-date is set to a year in this function
  */
  create(UD_NAME, UD_VALUE) {
    var UD_DATUM = new Date();
    UD_DATUM.setTime(UD_DATUM.getTime() + (UD_DELETE*24*60*60*50));

    var UD_DELETE = UD_DATUM.toUTCString();

    var CookieDate = new Date;
    CookieDate.setFullYear(CookieDate.getFullYear() +1);

    document.cookie = UD_NAME + '=' + UD_VALUE + ';' + "expires=" + CookieDate.toUTCString()  + ';';

  }

  /**
  * @param {string} UD_OBJECT name of cookie which have to be read
  */
  read(UD_OBJECT) {
    var UD_ELEMENT = UD_OBJECT + "=";

    var UD_COOKIE_ARRAY = document.cookie.split(";");

    for(var i=0; i<UD_COOKIE_ARRAY.length;i++) {
      var UD_COOKIE_ELEMENT = UD_COOKIE_ARRAY[i];

      while(UD_COOKIE_ELEMENT.charAt(0) === ' ') {
        UD_COOKIE_ELEMENT = UD_COOKIE_ELEMENT.substring(1);
      }

      if(UD_COOKIE_ELEMENT.indexOf(UD_ELEMENT) === 0) {
        return UD_COOKIE_ELEMENT.substring(UD_ELEMENT.length, UD_COOKIE_ELEMENT.length);
      }
    }
  }

}

class jsfElement {

  constructor(id) {
    this.get = document.getElementById(id);
  }

}

class jsfBrowser {

    /**
    * goes back in browser history
    */
    goBack() {
      window.history.back();
    }

    /**
    * got to index of browser history
    */
    goToIndex(i) {
      window.history.go(i);
    }

    /**
    * get browser language
    */
    getLanguage() {
      var userLang = navigator.language || navigator.userLanguage;
    }

    /**
    * check if browser is mobile
    */
    isMobile() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

    /**
    * check if browser is mobile/tablet
    */
    isMobileOrTablet() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

    /***************************************************************************
    * following methods are successfully tested in:
    ****************************************************************************
    *   Firefox   0.8 - 61
    *   Chrome    1.0 - 68
    *   Opera     8.0 - 34
    *   Safari    3.0 - 10
    *   IE          6 - 11
    ***************************************************************************/

    /**
    * testing if browser is Opera
    */
    isOpera() {
      return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    }

    /**
    * testing if browser is firefox
    */
    isFirefox() {
      return (typeof InstallTrigger !== 'undefined');
    }

    /**
    * testing if browser is safari
    */
    isSafari() {
      return (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)));
    }

    /**
    * testing if browser is InternetExplorer
    */
    isInternetExplorer() {
      return (/*@cc_on!@*/false || !!document.documentMode);
    }

    /**
    * testing if browser is chrome
    */
    isChrome() {
      return (!!window.chrome && !!window.chrome.webstore);
    }

    getBrowser() {
      if(this.isOpera()) {
        return 'opera';
      } else if(this.isFirefox()) {
        return 'firefox';
      } else if(this.isSafari()) {
        return 'safari';
      } else if(this.isInternetExplorer()) {
        return 'internet explorer';
      } else if(this.isChrome()) {
        return 'chrome';
      } else {
        return 'framework unknown browser';
      }
    }

}

/*******************************************************************************
* other premade classes
*******************************************************************************/

/**
* constants for jsfList-types
**/
const _FUNC = 'function';
const _OBJECT = 'object';
const _STRING = 'string';
const _NUMBER = 'number';
const _ARRAY = 'array';

class jsfList {

  /**
  * @param {string} type used type for this list
  */
  constructor(type) {
    this.permissibleType = type;
    this.data = [];
  }

  /**
  * @param value check if
  */
  checkType(value) {
    if(typeof this.permissibleType === typeof value) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * @param val value which will be added (if same type)
  */
  add(val) {
    if(this.checkType(val)) {
      this.data.push(val);
    } else {
      return new Error('parameter: false val');
    }
  }

  /**
  * @param val value which will be removed from list
  */
  removeVal(val) {
    var a = [];

    this.foreach(function(e, i) {
      if (e != val) {
        a.push(e);
      }
    });

    this.data = a;

  }

  /**
  * @param index value which will be removed by index
  */
  removeIndex(index) {
    var a = [];

    this.foreach(function(e, i) {
      if (i != index) {
        a.push(e);
      }
    });

    this.data = a;
  }

  /**
  * @param val returns if list containing element
  */
  contains(val) {
    var re = false;
    this.foreach(function(e) {
      if(e.toString() == val.toString()) {
        re = true;
      }
    });
    return re;
  }

  /**
  * @param {numeric} index
  */
  index(index) {
    return this.data[index];
  }

  /**
  * @param {function} func function which will be executed on looping
  */
  foreach(func) {
    if(typeof func == 'function') {
      for(var i=0; i<this.data.length; i++) {
        func(this.data[i], i);
      }
    }
  }
    
}


/*******************************************************************************
* function-pool
*******************************************************************************/
/**
* @param {condition} condition condition which is asserted
*/
function assert (condition) {
    /* call framework assert-method */
    jsf.util.assert(condition);
}
    
