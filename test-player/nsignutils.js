var utilsVersion = "2.3.4";

///////// PLAYER NETIPSDK ///////////////////////////////////////////////////////////
//
// Register NETIPSDK when template is in Electron player (it has problems injecting netipSDK with iframe)
//
///////////////////////////////////////////////////////////////////////////////////
try {
	if (window.netipSDK) {
		window.nsignSDK = window.netipSDK;
	} else if (window.nsignSDK) {
		window.netipSDK = window.nsignSDK;
	}

	if (!window.nsignSDK) {
	  if (window.parent && (window.parent.netipSDK || window.parent.nsignSDK)) {
      window.netipSDK = (window.parent.netipSDK) ? window.parent.netipSDK : window.parent.nsignSDK;
      window.nsignSDK = window.netipSDK;
    }
	}
} catch (exc) {
	console.log("Exception trying to access nsignSDK or parent frame (is this a virtual player?");
}

/////////// INPUT EVENTS (HID) //////////////////////////////////////////////////////////
//
// Default runBarcode callback function, override it to react to input events or conditions...
//
/////////////////////////////////////////////////////////////////////////////////////
window.runBarcode = function (event) {
    window.debugMessages.show("Received event (HID): " + event, "INFO");
    window.debugMessages.show("No callback registered for HID inputs" , "WARNING");
}

/////////// INPUT EVENTS (RS232/USB) //////////////////////////////////////////////////////////
//
// Default receiveEvent callback function, override it to react to RS232 events...
//
/////////////////////////////////////////////////////////////////////////////////////
window.receiveEvent = function(id, data) {
  window.debugMessages.show("Received RS232 data: " + JSON.parse(data));
  try{
    var obj = JSON.parse(data);
    window.debugMessages.show("Fetched RS232/USB data: " + obj, "INFO");
    window.debugMessages.show("No callback registered for RS232/USB input events" , "WARNING");

    /*
    var str1 = obj.response;
    var raw = atob(str1);
    var hexbytesarray = raw.split('').map(function (c) { return c.charCodeAt(0).toString(16); })
    var bytesarray = raw.split('').map(function (c) { return c.charCodeAt(0); })
    console.log(bytesarray);
    */

  } catch (e) {
    window.debugMessages.show("Received RS232/USB data: Error parsing RS232 data... " + e, "ERROR");
  }
}

///////// SHOW TEMPLATE VERSION ///////////////////////////////////////////////////////////
//
// Singleton to show debug messages as an overlay in templates and console.log as well
// LEVELS: "NONE", "ERROR", "WARNING", "INFO", "VERBOSE"
// USAGE:
//////////////////////////////////////////////////////////////////////////////////////////
window.showVersion = function (version, showDuringMsec, fontSize) {
  if ((!version) || (version.length <= 0))
    return;

  if ((showDuringMsec !== undefined) && (showDuringMsec <= 0))
    return;

  this.versionPanel = document.createElement("div");
  this.versionPanel.id= "_versionPanel_";
  this.versionPanel.style.position = "absolute";
  this.versionPanel.style.left = "0px";
  this.versionPanel.style.top = "0px";
  this.versionPanel.style.transition = "opacity 1s";
  this.versionPanel.style.opacity = "1";
  this.versionPanel.style.color = "white";
  this.versionPanel.style.backgroundColor = "rgba(0,0,0,0.6)";
  this.versionPanel.style.borderRadius = "10px";
  this.versionPanel.style.padding = "20px";
  this.versionPanel.style.zIndex = "99";
  this.versionPanel.style.fontSize = (fontSize && fontSize.length>0) ? fontSize : '2.4vw';
  this.versionPanel.innerHTML = "<div>Applet version: " + version + "</div><div>Utils version: " + utilsVersion + "</div>";

  document.body.appendChild(this.versionPanel);

  var timeoutMsec = 10000;
  if ((showDuringMsec !== undefined) && (showDuringMsec > 0)) {
    timeoutMsec = showDuringMsec;
  }

  if (timeoutMsec > 0) {
    window.setTimeout(function() {
      this.versionPanel.style.opacity = "0";
    }, timeoutMsec);
  }
}

///////// PARSE EDITABLES IN TEMPLATE ///////////////////////////////////////////////////////////
// Return an object with keys-values (parsing value according to type: data-boolean, data-number, data-json, normal string)
// from data text editables, or key-src in case of videos and images
////////////////////////////////////////////////////////////////////////////////////////////
window.parseEditables = function() {
  var editablesObject = {};

  var elements = document.querySelectorAll('[data-editable]')
  for (var i=0; i < elements.length; ++i) {
    var id = elements[i].id;
    if ((!id) || (id.length <= 0)) {
      window.debugMessages.show("Found data-editable tag without id...discarding", "WARNING");
      continue;
    }

    if ((elements[i].tagName.toLowerCase() === 'img') || (elements[i].tagName.toLowerCase() === 'video')) {
      var value = elements[i].src.trim();
      // In player, empty sources are filled with own page address (weird behavior)
      if (value.indexOf('.html') >=0) {
        value = "";
      }
      editablesObject[id] = {tagName: elements[i].tagName, src: value, class: elements[i].className};
      window.debugMessages.show("Setting (MEDIA) " + id + " --> " + value, "INFO");
    } else {
      if (elements[i].hasAttribute('data-boolean')) {
        var value = elements[i].innerHTML.trim().toLowerCase();
        if ((value !== 'true') && (value !== 'false')) {
          window.debugMessages.show("Found boolean field (" + id + ") with invalid type, discarding...", "WARNING");
          continue;
        }
        editablesObject[id] =  (value === 'true');
        window.debugMessages.show("Read (BOOLEAN) " + id + " --> " + value, "INFO");

      } else if (elements[i].hasAttribute('data-number')) {
        var number = parseFloat(elements[i].innerHTML);
        if (isNaN(number)) {
          window.debugMessages.show("Found number field (" + id + ") with invalid type, discarding...", "WARNING");
          continue;
        }
        editablesObject[id] = (parseInt(number) == number) ? parseInt(number) : number;
        window.debugMessages.show("Read (NUMBER) " + id + " --> " + number, "INFO");
      } else if (elements[i].hasAttribute('data-json')) {
        var value = elements[i].innerHTML.trim();
        var valueObject = {};
        try {
          valueObject = JSON.parse(value);
          editablesObject[id] = valueObject;
          window.debugMessages.show("Read (JSON) " + id + " --> " + value, "INFO");
        } catch (error) {
          window.debugMessages.show("Found JSON field (" + id + ") with invalid syntax, discarding...: " + error, "WARNING");
        }
      } else {
        editablesObject[id] = elements[i].innerHTML.trim();
        window.debugMessages.show("Read " + id + " --> " + elements[i].innerHTML, "INFO");
      }
    }
  }

  /*
  // TODO: remove JQuery dependency (better to not include JQuery if Vue present, and avoid include order related problems)
  $('[data-editable]').each(function(index) {
    var tagName = $(this).prop('tagName');
    var id = $(this).attr('id');
    if ((!id) || (id.length <= 0)) {
      window.debugMessages.show("Found data-editable tag without id...discarding", "WARNING");
      return;
    }

    // TEXT EDITABLES
    if  (( tagName.toLowerCase() !== 'img') && ( tagName.toLowerCase() !== 'video')) {
      if (typeof $(this).attr('data-boolean') !== typeof undefined) {
        var value = $(this).html().trim().toLowerCase();
        if ((value !== 'true') && (value !== 'false')) {
          window.debugMessages.show("Found boolean field (" + id + ") with invalid type, discarding...", "WARNING");
          return;
        }
        editablesObject[id] =  (value === 'true');
        window.debugMessages.show("Read (BOOLEAN) " + id + " --> " + value, "INFO");

      } else if (typeof $(this).attr('data-number') !== typeof undefined) {
        var number = parseFloat($(this).html());
        if (isNaN(number)) {
          window.debugMessages.show("Found number field (" + id + ") with invalid type, discarding...", "WARNING");
          return;
        }
        editablesObject[id] = (parseInt(number) == number) ? parseInt(number) : number;
        window.debugMessages.show("Read (NUMBER) " + id + " --> " + number, "INFO");
      } else if (typeof $(this).attr('data-json') !== typeof undefined) {
        var value = $(this).html().trim();
        var valueObject = {};
        try {
          valueObject = JSON.parse(value);
        } catch (error) {
          window.debugMessages.show("Found JSON field (" + id + ") with invalid syntax, discarding...: " + error, "WARNING");
        }
        window.debugMessages.show("Read (JSON) " + id + " --> " + value, "INFO");

      } else {
        editablesObject[id] = $(this).html().trim();
        window.debugMessages.show("Read " + id + " --> " + $(this).html(), "INFO");
      }
    // IMAGE OR VIDEO
    } else {
      var value = $(this).attr('src').trim();
      // In player, empty sources are filled with own page address (weird behavior)
      if (value.indexOf('.html') >=0) {
        value = "";
      }
      editablesObject[id] = value;
      window.debugMessages.show("Setting (MEDIA) " + id + " --> " + value, "INFO");
    }
  });
  */

  return editablesObject;
}


///////// DEBUG MESSAGES ///////////////////////////////////////////////////////////
//
// Singleton to show debug messages as an overlay in templates and console.log as well
// LEVELS: "NONE", "ERROR", "WARNING", "INFO", "VERBOSE"
// USAGE:
//    - call debugMessages.init() once with log level and other optional parameters
//    - display a message with debugMessages.show(message, severity)
//
// COMMENTS:
//    - does not need JQuery to work
//    - do not forget to place it BEFORE your scripts!
///////////////////////////////////////////////////////////////////////////////////
window.debugMessages = {
  initialized: false,
  debugMessages: [],
  debugMessageTimer: 0,
  debugMessagesPanel: null,
  showDuringMsec: 5000,
  maxMessages: 5,
  fontSize: '1.2vw',
  lastId: 0,
  logLevel: 1,
  alwaysShowConsoleLog: false,
  levels: ["NONE", "ERROR", "WARNING", "INFO", "VERBOSE"],
  colors: {"ERROR": "red", "WARNING": 'orange', "INFO": 'blue', "VERBOSE": 'gray'},

  init: function(logLevelName, options) {
    this.logLevel = (this.levels.indexOf(logLevelName) >= 0) ? this.levels.indexOf(logLevelName) : 1;
    if (options && options.showDuringMsec !== undefined)
      this.showDuringMsec = options.showDuringMsec;
    if (options && options.maxMessages)
      this.maxMessages = options.maxMessages;
    if (options && options.fontSize)
      this.fontSize = options.fontSize;

		if (options && options.alwaysShowConsoleLog) {
			this.alwaysShowConsoleLog = options.alwaysShowConsoleLog;
		}

    console.log("Debug messages panel set to: " + this.levels[this.logLevel]);
    this.initialized = true;

    if ((this.logLevel > 0) && (this.showDuringMsec > 0)) {
      this.debugMessagesPanel = document.getElementById("_debugMessagesPanel_");
      if (!this.debugMessagesPanel) {
        this.debugMessagesPanel = document.createElement("div");
        this.debugMessagesPanel.id= "_debugMessagesPanel_";
        this.debugMessagesPanel.style.position = "absolute";
        this.debugMessagesPanel.style.left = "0px";
        this.debugMessagesPanel.style.bottom = "0px";
        this.debugMessagesPanel.style.opacity = "0";
        this.debugMessagesPanel.style.color = "white";
        this.debugMessagesPanel.style.backgroundColor = "rgba(250,250,250,0.9)";
        this.debugMessagesPanel.style.borderRadius = "10px";
        this.debugMessagesPanel.style.transition = "opacity 1s";
        this.debugMessagesPanel.style.padding = "20px";
        this.debugMessagesPanel.style.zIndex = "99";
        this.debugMessagesPanel.style.fontSize = this.fontSize;

        document.body.appendChild(this.debugMessagesPanel);
      }
    }

		if (this.alwaysShowConsoleLog) {
			console.log("LOG LEVEL set to: " + logLevelName);
			return;
		}

    this.show("LOG LEVEL set to: " + logLevelName, "INFO");
  },
  removeAllChildNodes: function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  },
  updateMessages: function() {
    var _self = this;

    if (_self.debugMessages.length > 0) {
      _self.removeAllChildNodes(_self.debugMessagesPanel);
      for (var i=0;i<_self.debugMessages.length;++i) {
        var newMessage = document.createElement('div');
        newMessage.innerHTML = _self.debugMessages[i].message;
        newMessage.style.color = _self.debugMessages[i].color;
        newMessage.style.fontWeight = (_self.debugMessages[i].color === 'red') ? 'bold' : 'normal';
        newMessage.style.textShadow = "0px 0px 1px black";

        this.debugMessagesPanel.appendChild(newMessage);
      }
      this.debugMessagesPanel.style.opacity = 1;
    } else {
      this.debugMessagesPanel.style.opacity = 0;
      setTimeout(function(){
        _self.removeAllChildNodes(_self.debugMessagesPanel);
      },1000);
    }
  },
	error: function (message) {
		var _self = this;
		return _self.show(message, "ERROR");
	},
	warning: function (message) {
		var _self = this;
		return _self.show(message, "WARNING");
	},
	info: function (message) {
		var _self = this;
		return _self.show(message, "INFO");
	},
	verbose: function (message) {
		var _self = this;
		return _self.show(message, "VERBOSE");
	},
  show: function(message, messageSeverity) {
    var _self = this;
    var severity = messageSeverity;
    if (!severity)
      severity = "INFO";

		if (this.levels.indexOf(severity) > this.logLevel) {
      if (_self.alwaysShowConsoleLog) {
        console.log("[" + severity + "] " + message);
      }
      return;
    }

    if (!_self.initialized) {
      var logLevel = "ERROR";
      var element = document.getElementById("logLevel");
      if ((element) && (element.innerHTML.trim().length > 0)) {
        logLevel = element.innerHTML.trim();
      }
      _self.init(logLevel);
    }

    console.log("[" + severity + "] " + message);

    _self.debugMessages.push({id: _self.lastId, timestamp: new Date().getTime(), message: message, color: this.colors[severity]});
    _self.lastId++;

    if (_self.debugMessages.length > _self.maxMessages ) {
      _self.debugMessages.splice(0, _self.debugMessages.length - _self.maxMessages);
    }

    this.updateMessages();
    setTimeout(function() {
      var now = new Date().getTime();
      _self.debugMessages = _self.debugMessages.filter(function(element) {
        return (now - element.timestamp < _self.showDuringMsec);
      });
      _self.updateMessages();
    }, (_self.showDuringMsec) ? _self.showDuringMsec : 4000);
  }
}
///////// GET PLAYER INFO ///////////////////////////////////////////////////////////
//
// Function to get all player related info through netipSDK
// showInfo set to true will display info in debug info panel (if log set to INFO at least)
//
//
///////////////////////////////////////////////////////////////////////////////////
window.showPlayerInfo = function(showInfo) {
  if ((!window.nsignSDK) && (!window.netipSDK)) {
    window.debugMessages.show("NsignSDK and NetipSDK not found...running on player?", "WARNING");
    return;
  }

  var playerId = (window.nsignSDK !== undefined) ? window.nsignSDK.getPlayerId() : window.netipSDK.getPlayerId();
  if (showInfo)
    window.debugMessages.show("NsignSDK (or NetipSDK) running on player ID: " + playerId, "INFO");
}

window.mobileCheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

///////// GET API BASE PATH ///////////////////////////////////////////////////////////
//
// Function to get NsignTv API base path for requests and other purposes
// - environment: LOCAL, INT, PROD or undefined (default value is for PROD environment)
//
///////////////////////////////////////////////////////////////////////////////////
window.getApiBasePath = function (environment, secure) {
  var domain = '';
  var env = environment.toUpperCase();
  var protocol = (secure || (secure === undefined)) ? 'https' : 'http';
  if (env) {
    if ((env.indexOf('DEV') >= 0) || (env.indexOf('LOCAL') >= 0)) {
      // LOCAL
      return protocol + "://api.nsign.local";
    } else if (env.indexOf('INT') >= 0) {
      // INT
      return protocol + "://integration-api.nsign.tv";
    } else {
      // PROD
      return protocol + "://api.nsign.tv";
    }
  } else {
      return protocol + "://api.nsign.tv";
  }
}


///////// REPORT IOT BIG QUERY DATA ///////////////////////////////////////////////////////////
//
// Function to report BIGQUERY event to platform, using playerId
// - customerId
// - customerApiToken: authorization token from Symfony API
// - eventObject: event object to report (required fields: eventValue, eventAction, eventCategory; optional: eventInfo, eventLabel, eventLastDate, eventLastTime, counter, iotId, iotCategory )
// - environment: DEV, PROD
// - directMode: true to use BigQuery direct writting, false or undefined to use JSON deferred objects (may take minutes to be available in BigQuery requests)
///////////////////////////////////////////////////////////////////////////////////
window.reportBigQueryData = function (customerId, customerApiToken, eventObject, environment, directMode) {
  var domain = "https://us-east1-netipbox-core-production.cloudfunctions.net";
  var apiBaseURL = domain + "/iot-push/bigquery/1";

  var currentDatetime = new Date();
  var reportObject = JSON.parse(JSON.stringify(eventObject));

  return new Promise (function (resolve,reject) {
		if (directMode) {
	    var env = (environment && (environment.length > 0)) ? environment : 'PROD';
	    domain = window.getApiBasePath(env);
	    apiBaseURL = domain +  "/stateless/iot";
	  } else {
	    if (environment && (environment === 'DEV')) {
	      return reject("Error: reporting to " + environment + " is not implemented yet.");
	    }
	  }

    if  ((!reportObject.eventValue) ||
    (!reportObject.eventAction) || (reportObject.eventAction.length <= 0) ||
    (!reportObject.eventCategory) || (reportObject.eventCategory.length <= 0)) {
      return reject("Error: missing parameters... (eventAction, eventValue, eventCategory)");
    }

    reportObject.eventDate = currentDatetime.toISOString();
    reportObject.eventTime = currentDatetime.getTime();
    reportObject.customerId = customerId;

    if (!reportObject.eventLastDate) {
      reportObject.eventLastDate = currentDatetime.toISOString();
      reportObject.eventLastTime = currentDatetime.getTime();
      reportObject.counter = 1;
    }

    if ((window.nsignSDK && (window.nsignSDK.getPlayerId())) || (window.netipSDK && (window.netipSDK.getPlayerId()))) {
      reportObject.playerId = (window.nsignSDK !== undefined) ? window.nsignSDK.getPlayerId() : window.netipSDK.getPlayerId();
      reportObject.iotCategory = "PLAYER";
      if (window.nsignSDK.getConfig || window.netipSDK.getConfig) {
        var playerConfig = (window.nsignSDK !== undefined) ? window.nsignSDK.getConfig() : window.netipSDK.getConfig();
        if (playerConfig && playerConfig.length > 0) {
          try {
            var jsonPlayer = JSON.parse(playerConfig);
            if (jsonPlayer && jsonPlayer.apk && jsonPlayer.apk.name)
              reportObject.playerName = jsonPlayer.apk.name;

          } catch (error) {
            window.debugMessages.show ("ERROR parsing JSON player config file: " + error, "WARNING");
          }
        }
      }
    } else if (!reportObject.iotId) {
        if (!reportObject.playerId) {
          // Only fill in info if not yet filled...with random token...
          var devToken = localStorage.getItem('NsignUniqueDeviceToken');
          if (!devToken) {
            devToken = new Date().getTime();
            localStorage.setItem('NsignUniqueDeviceToken', devToken);
          }
          reportObject.iotId = devToken;
        }
    }

    if ((reportObject.iotId) && (!reportObject.iotCategory)) {
      reportObject.iotCategory = (window.mobileCheck()) ? "MOBILE" : "PC/OTHER";
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.debugMessages.show("(BigQuery) Data reported OK", "VERBOSE");
            return resolve(true);
        } else if (xhttp.readyState == 4) {
            window.debugMessages.show("(BigQuery): Error reporting data (" + xhttp.status + "): " + xhttp.statusText, "WARNING");
            return reject(new Error("Error reporting BQ Data (" + xhttp.status + "): " + xhttp.statusText));
        }
    }

    window.debugMessages.show("Request: " + apiBaseURL, "INFO");
    xhttp.open("POST", apiBaseURL, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("X-Customer-Id", customerId);
    xhttp.setRequestHeader("Authorization", "Nsign " + customerApiToken);
    window.debugMessages.show("Analytics report object: " +  JSON.stringify(reportObject), "VERBOSE");
    xhttp.send(JSON.stringify(reportObject));
  });
}

///////// GET IOT BIG QUERY DATA ///////////////////////////////////////////////////////////
//
// Function to query BIGQUERY data from a specific view or table
// - customerId
// - customerApiToken: authorization token from Symfony API
// - viewName: specific BigQuery view or table name to query
// - environment: DEV, PROD
///////////////////////////////////////////////////////////////////////////////////
// TODO: customerId is still needed?
window.getBigQueryDataFromView = function (viewName, customerId, customerApiToken, environment, queryParameters) {
  var env = (environment && (environment.length > 0)) ? environment : 'PROD';
  var domain = window.getApiBasePath(env);


  var queryParams =  {"select": "*", "limit": "1000"};
  if (queryParameters) {
      var keys = Object.keys(queryParameters);
      for (var i=0; i < keys.length; ++i) {
          queryParams[keys[i]] = queryParameters[keys[i]];
      }
  }

  var queryString = encodeURIComponent(JSON.stringify(queryParams));
  // VERSION FOR API TOKEN CUSTOMER
  // var queryUrl = domain +  '/stateless/bi/query/dataset/' + customerId + '/table/' + viewName + '?q=' + queryString;

  // VERSION FOR API TOKEN CUSTOMER OR ANY CHILD CUSTOMER (DATASET FOR THAT CUSTOMER MUST EXIST)
  var queryUrl = domain +  '/stateless/bi/query/customer/' + customerId + '/dataset/' + customerId + '/table/' + viewName + '?q=' + queryString;


  // window.debugMessages.show("(BigQuery) Query URL:" + queryUrl, "VERBOSE");

  return new Promise (function (resolve,reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.debugMessages.show("(BigQuery) Data queried OK", "INFO");
            window.debugMessages.show("(BigQuery) Data received:" + xhttp.responseText, "VERBOSE");

            return resolve(xhttp.responseText);
        } else if (xhttp.readyState == 4) {
            window.debugMessages.show("(BigQuery): Error querying data (" + xhttp.status + "): " + xhttp.statusText, "WARNING");
            return reject(new Error("Error querying BQ Data (" + xhttp.status + "): " + xhttp.statusText));
        }
    }

    window.debugMessages.show("Request: " + queryUrl, "VERBOSE");
    xhttp.open("GET", queryUrl, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhttp.setRequestHeader("X-Customer-Id", customerId);
    xhttp.setRequestHeader("Authorization", "Nsign " + customerApiToken);
    xhttp.send();
  });
}

///////// REPORT IOT DATA (OLD) ///////////////////////////////////////////////////////////
//
// Function to report IOT event to platform, using playerId
// - historicalMode (true, false) and environment (INT, PREPROD, PROD as default) are optional
// - All other arguments are required
// - eventValue can be a plain value, an object or an array
//
///////////////////////////////////////////////////////////////////////////////////
window.reportIOTData = function (customerApiKey, eventType, eventLabel, eventValue, historicalMode, environment) {
  return new Promise (function(resolve,reject) {
    var sdk = (window.nsignSDK !== undefined) ? window.nsignSDK : window.netipSDK;
    if ((customerApiKey.trim().length <= 0) || (eventType.trim().length <= 0) || (eventLabel.trim().length <= 0) || (!eventValue)) {
      window.debugMessages.show("(IOT): missing or invalid parameters","WARNING");
      return reject("Error reporting IOT Data: missing or invalid parameters");
    } else if ((!sdk) || (!sdk.getPlayerId())) {
      window.debugMessages.show("(IOT): NETIPSDK and NSIGNSDK not found or invalid player ID, running on player?","WARNING");
      return reject("Error reporting IOT Data: NETIPSDK and NSIGNSDK not found or invalid player ID, running on player?");
    }

    var isHistoricalMode = false;
    if (historicalMode) {
      isHistoricalMode = historicalMode;
    }

    var iOTApiUrl = "https://platform.nsign.tv/";
    if (environment && environment.trim().length > 0) {
      if (environment.trim().indexOf("INT") >= 0) {
        iOTApiUrl = "https://integration.nsign.tv/";
      } else if (environment.trim().indexOf("PREPROD") >= 0) {
        iOTApiUrl = "https://preprod.nsign.tv/";
      }
    }

    var reportObject = {
      historicalMode: isHistoricalMode,
      document: {
        eventType: eventType,
        eventLabel: eventLabel,
        eventValue: eventValue,
        playerId: sdk.getPlayerId(),
      }
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.debugMessages.show("(IOT) Data reported OK", "VERBOSE");
            return resolve(true);
        } else if (xhttp.readyState == 4) {
            window.debugMessages.show("(IOT): Error reporting IOT Data (" + xhttp.status + "): " + xhttp.statusText,"WARNING");
            return reject(new Error("Error reporting IOT Data (" + xhttp.status + "): " + xhttp.statusText));
        }
    }

    window.debugMessages.show("Request: " + iOTApiUrl + customerApiKey + "/iotSaveEvent", "INFO");
    xhttp.open("POST", iOTApiUrl + customerApiKey + "/iotSaveEvent", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(reportObject));
  });
};

///////// DOGET: HTTP/HTTPS/FTP //////////////////////////////////////////////////////////////////////
//
// Function to perform GET request to given URL, using NETIPSDK or NSIGNSDK if necessary (potentially blocked ports)
// Note: for FTP data fetching with user, provide dataURL with this form: ftp://username:password@address:port/file
// Async, always returns resolved or rejected promise
/////////////////////////////////////////////////////////////////////////////////////////////////////
window.doGet = function(dataURL, avoidCacheinHTTPRequests) {
  return new Promise (function(resolve,reject) {
    if (!dataURL || (dataURL.trim().length <= 0)) {
      window.debugMessages.show ("Request: data URL is empty", "WARNING");
      return reject("Request: data URL is empty");
    }

    var blockedPorts = [1, 7, 9, 11, 13, 15, 17, 19, 20, 21, 22, 23, 25, 37, 42, 43, 53, 77, 79, 87, 95, 101, 102, 103, 104, 109, 110, 111, 113, 115, 117, 119, 123, 135, 139, 143, 179, 389, 427, 465, 512, 513, 514, 515, 526, 530, 531, 532, 540, 548, 556, 563, 587, 601, 636, 993, 995, 2049, 3659, 4045, 6000, 6665, 6666, 6667, 6668, 6669, 6697];
    var port = 80;
    var arrayMatches = dataURL.match(/:(?<port>[0-9]+)/g);
    if (arrayMatches && (arrayMatches.length > 0)) {
      port = arrayMatches[0].replace(":", "");
      port = parseInt(port);
    }

		var isFtpRequest = (dataURL.trim().indexOf("ftp://") >= 0);
    var sdk = (window.nsignSDK !== undefined) ? window.nsignSDK : window.netipSDK;

		// Default value for avoidCacheinHTTPRequests is true
		if ((!isFtpRequest) && (avoidCacheinHTTPRequests || (avoidCacheinHTTPRequests === undefined))) {
			var timestamp = new Date().getTime();
			dataURL = dataURL + "?" + timestamp;
		}


		// Standard request: request to HTTP or HTTPS and no blocked port problem
		if ((blockedPorts.indexOf(port) < 0) && !isFtpRequest) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
					if (xhttp.readyState == 4 && xhttp.status == 200) {
						window.debugMessages.show("Fetched data: " + xhttp.responseText, "VERBOSE");
						return resolve(xhttp.responseText);
					} else if (xhttp.readyState == 4) {
						window.debugMessages.show("Error fetching data from  " + dataURL, "ERROR");
						return reject("Error fetching data from  " + dataURL);
					}
			}

			window.debugMessages.show ('Request: ' + dataURL, "INFO");
			xhttp.open("GET", dataURL, true);
			xhttp.send();
		} else {
			var data = null;
			if (isFtpRequest) {
				// FTP request
				if (!sdk) {
					var message = "Error fetching FTP data from  " + dataURL + ": no NsignSDK found (not running on a player?)";
					window.debugMessages.show(message, "ERROR");
					return reject(message);
				}

				var bloadPathFtp = {
            url: dataURL,
            headers: {
                charset: "ISO-8859-1"
            }
        };
				data = window.netipSDK.getDataFromUrl(JSON.stringify(bloadPathFtp));
			} else {
				// HTTP through any blocked port
				if (!sdk) {
					var message = "Error fetching data natively from  " + dataURL + ": no NsignSDK found (not running on a player?)";
					window.debugMessages.show(message, "ERROR");
					return reject(message);
				}

				data = sdk.getDataFromUrl( JSON.stringify({url: dataURL}));
			}

			window.debugMessages.show("Fetched data: " + data, "VERBOSE");
      return resolve(data);
		}

		/*
    if ((blockedPorts.indexOf(port) >= 0) && sdk) {
      window.debugMessages.show ("Warning, service port may be blocked in Chrome browsers, falling back to NETIPSDK or NSIGNSDK to resolve request...", "WARNING");

      var data = sdk.getDataFromUrl( JSON.stringify({url: dataURL + "?" + timestamp}));
      window.debugMessages.show("Fetched data: " + data, "VERBOSE");
      return resolve(data);
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.debugMessages.show("Fetched data: " + xhttp.responseText, "VERBOSE");
            return resolve(xhttp.responseText);
          } else if (xhttp.readyState == 4) {
            window.debugMessages.show("Error fetching data from  " + dataURL + "?" + timestamp, "ERROR");
            return reject("Error fetching data from  " + dataURL + "?" + timestamp);
          }
      }

      window.debugMessages.show ('Request: ' + dataURL + "?" + timestamp, "INFO");
      xhttp.open("GET", dataURL + "?" + timestamp, true);
      xhttp.send();
    }
		*/
  });
}
