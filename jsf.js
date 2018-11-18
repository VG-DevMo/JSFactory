
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

}
