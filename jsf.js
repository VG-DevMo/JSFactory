
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
  * @param data xhttp-request data
  * @param {function} success function which will be executed on success
  * @param {function} error function which will be executed on error
  * @param {function} stateChanged function which will be executed by a state change
  */
  post (path, data, success, error, stateChanged) {

      var allreadySuccessed = false;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.status == 200) {
          if (typeof success !== undefined && typeof success == 'function') {
            if(!allreadySuccessed) {
              allreadySuccessed = true;
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

      xhttp.open(_POST, path, true);
      xhttp.send();

  }

  /**
  * @param {string} url data-url
  * @param {function} success function which will be executed on success
  * @param {function} error function which will be executed on error
  * @param {function} stateChanged function which will be executed by a state change
  */
  get (url, success, error, stateChanged) {

    var allreadySuccessed = false;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.status == 200) {
        if (typeof success !== undefined && typeof success == 'function') {
          if(!allreadySuccessed) {
            allreadySuccessed = true;
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

  get dom () {
    return new jsfDOM();
  }

  get event () {
    return new jsfEvent();
  }

}


class jsfDOM {

  /**
  * @param {string} id html-element id
  */
  byId (id) {
    return document.getElementById(id);
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
  * @param {array} array
  * @param {function} func
  */
  foreach(array, func) {
    for (var i=0; i<array.length; i++) {
      func(array[i]);
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

    }
  }

  /**
  * @param val value which will be removed from list
  */
  removeVal(val) {

  }

  /**
  * @param index value which will be removed by index
  */
  removeIndex(index) {

  }

  /**
  * @param val returns if list containing element
  */
  contains(val) {
    this.foreach(function(e) {
      if(e.toString() == val.toString()) {
        return true;
      }
    });
    return false;
  }

  /**
  * @param {function} func function which will be executed on looping
  */
  foreach(func) {
    if(typeof func == 'function') {
      for(var i=0; i<this.data.length; i++) {
        func(this.data[i]);
      }
    }
  }

}
