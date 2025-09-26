

//@target illustrator
//@targetengine main
//(c) www.illustratorscripts.com





/*



MIT License

Copyright (c) 2025 Aivaras Gontis  www.illustratorscripts.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


This project includes code snippets from other authors. Thanks to the open-source community!

*/



///@include ~/jsxutils/utils.jsx
///@include ~/jsxutils/ai.jsx
///@include ~/jsxutils/geom.jsx


// BEGIN INCLUDE: ~/jsxutils/json2.jsx
//  json2.js
//  2016-05-01
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file is provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
  JSON = {};
}

(function () {
  "use strict";

  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three =
    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_escapable =
    /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var rx_dangerous =
    /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? "0" + n : n;
  }

  function this_value() {
    return this.valueOf();
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function () {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            "-" +
            f(this.getUTCMonth() + 1) +
            "-" +
            f(this.getUTCDate()) +
            "T" +
            f(this.getUTCHours()) +
            ":" +
            f(this.getUTCMinutes()) +
            ":" +
            f(this.getUTCSeconds()) +
            "Z"
        : null;
    };

    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }

  var gap;
  var indent;
  var meta;
  var rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    rx_escapable.lastIndex = 0;
    return rx_escapable.test(string)
      ? '"' +
          string.replace(rx_escapable, function (a) {
            var c = meta[a];
            return typeof c === "string"
              ? c
              : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + string + '"';
  }

  function str(key, holder) {
    // Produce a string from holder[key].

    var i; // The loop counter.
    var k; // The member key.
    var v; // The member value.
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (
      value &&
      typeof value === "object" &&
      typeof value.toJSON === "function"
    ) {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value) {
      case "string":
        return quote(value);

      case "number":
        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is "object", we might be dealing with an object or an array or
      // null.

      case "object":
        // Due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v =
            partial.length === 0
              ? "[]"
              : gap
              ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
              : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v =
          partial.length === 0
            ? "{}"
            : gap
            ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
            : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== "function") {
    meta = {
      // table of character substitutions
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    };
    JSON.stringify = function (value, replacer, space) {
      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      var i;
      gap = "";
      indent = "";

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }

        // If the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === "string") {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (
        replacer &&
        typeof replacer !== "function" &&
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }

      // Make a fake root object containing our value under the key of "".
      // Return the result of stringifying the value.

      return str("", { "": value });
    };
  }

  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {
      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {
        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        var k;
        var v;
        var value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }

      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      rx_dangerous.lastIndex = 0;
      if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with "()" and "new"
      // because they can cause invocation, and "=" because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
      // replace all simple value tokens with "]" characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or "]" or
      // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

      if (
        rx_one.test(
          text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
        )
      ) {
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = eval("(" + text + ")");

        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError("JSON.parse");
    };
  }
})();
// END INCLUDE: ~/jsxutils/json2.jsx
// BEGIN INCLUDE: ~/jsxutils/settings.jsx
//must have JSON!

//usage:
//var settings=new Settings(dialog, File($.fileName).name);
//! this should be either copied to main code or this passed:
//var settings=new Settings(dialog, File($.fileName).name);

function Settings(panel, scriptName, defaultSettings) {
	this.panel = panel;

	var sets = this;

	//! if overwriteing close function, dont forget to save
	if (panel.window)
		panel.window.onClose = function () {
			sets.save();
		}

	this.scriptName = scriptName || File($.fileName).name;
	this.settings = defaultSettings || {};
	this.fileURL = Folder.userData + "/" + this.scriptName + "_settings.json"
	this.file = new File(this.fileURL);

	this.updateUI = function () {
		this.iterateUI(this.panel, true, this.settings)
	}
	this.updateSettings = function () {
		this.iterateUI(this.panel, false, this.settings)

	}
	this.load = function () {
		var s = this.readTXT(this.file) || "";
		this.settings = s ? JSON.parse(s) : {};
	}
	this.save = function () {
		this.updateSettings();
		this.saveTXT(this.file, JSON.stringify(this.settings))
	}
	this.saveTXT = function (file, txt) {
		var file = file.constructor == "File" ? file : new File(file);
		if (file.open("w")) {
			file.write(txt);
			file.close();
		}
	}

	this.readTXT = function (file) {
		var file = file.constructor == "File" ? file : new File(file);

		if (!file.exists) {
			return ""
		}

		file.open('r');
		var str = file.read();
		file.close();
		return str;
	}
	//should be universal dialog settings ave func.
	//iterates dialog window, collects all interesting properties and pushes them into collection
	//OR if shouldSet is set, sets them
	//theres some code to bind it to parent, in case names repeats,but its not needed

	this.iterateUI = function (panel, shouldSet, collection, parentName) {
		var INTERESTING = ["EditText", "Checkbox", "ListBox"];
		var INTERESTING_VARS = ["text", "value", "selection"];
		collection = collection || {};
		parentName = parentName || ((panel.properties) ? panel.properties.name : "__");
		for (k in panel) {

			if (k == "parent" || k == "window") continue;
			var o = panel[k];
			if (k == "listbox1") {
				log("---------");
			}
			if (typeof o == "object" && o != null && o.children) {
				var type = o.reflect.name;
				var interest = INTERESTING.indexOf(type)
				if (interest >= 0) {
					//log("-");
					//  log(o.reflect.name, k);
					//log(o[INTERESTING_VARS[interest]])
					switch (type) {
						case "ListBox":
							//we collect indices only to avoid json overrun
							if (shouldSet) {
								if (collection[k])
									o[INTERESTING_VARS[interest]] = collection[k];
							} else {
								var selection = o[INTERESTING_VARS[interest]];
								collection[k] = [];
								if (selection)
									for (var i = 0; i < selection.length; i++) {
										var oo = selection[i];
										collection[k].push(oo.index)
									}
							}
							break;
						default:
							if (shouldSet) {
								if (collection[k])
									o[INTERESTING_VARS[interest]] = collection[k];
							} else {
								collection[k] = o[INTERESTING_VARS[interest]];
							}
					}
				} else if (o.children.length)
					this.iterateUI(o, shouldSet, collection, k)

			}
		}
		return collection
	}
	//
	this.load();
	this.updateUI();
}
// END INCLUDE: ~/jsxutils/settings.jsx
// BEGIN INCLUDE: ~/jsxutils/SliderText.jsx
//expects sllider and textedit as an input
//type options: ROUND, SMART HALF_NEGATIVE


function SliderText(slider, txt, current, type, options) {
    var that = this;

    current = parseFloat(current);
    //slider.value = current;
    if (current)
        txt.text = "" + current;
    
    onChange(txt);



    slider.onChange = slider.onChanging = function () {
        //! this is slider's this
        switch (type) {
            case "ROUND": txt.text = Math.round(this.value); break;
            case "SMART": txt.text = this.value; break;
            case "HALF_NEGATIVE": txt.text = this.value - this.maxvalue / 2; break;
            default: txt.text = this.value;
        }
        //taip pat isskirstyt kaip tf
        options && options.onSliderChange && options.onSliderChange(this)
    }
    function onChange(dis) {
        var sliderAtEnd = slider.value == slider.maxvalue;
        if (type == "SMART") {
            var zero = countZerosAfterDecimal(dis.text);
            if (zero == -1) {
                slider.minvalue = 1;
                if (sliderAtEnd)
                    slider.maxvalue = parseInt(dis.text);
                else
                    slider.maxvalue = getNumberLength(parseInt(dis.text)) * 10;
            } else {
                slider.minvalue = 0
                if (sliderAtEnd)
                    slider.maxvalue = parseFloat(dis.text);
                else
                    slider.maxvalue = Math.pow(0.1, (zero))
            }
            slider.value = parseFloat(dis.text);

        } else if (type == "HALF_NEGATIVE") {
            slider.value = slider.maxvalue / 2 + parseFloat(dis.text);
        } else {
            slider.value = parseFloat(dis.text);

        }

    }
    txt.onChange = function () {
        onChange(this);
    }
    txt.onChanging = function () {
        options && options.onTFChanging && options.onTFChanging(this);
        onChange(this);
    }

}
//no fucking clue why 2
function SliderText2(slider, txt, txt2, current, current2, type) {
    //settings ROUND, SMART 
    current = parseFloat(current);
    current2 = parseFloat(current2);

    if (current)
        txt.text = "" + current;
    if (current2)
        txt2.text = "" + current2;

    slider.value = parseFloat( txt.text );//what about ROUND?
    var ratio = current2 / current;

    slider.onChange = slider.onChanging = function () {
        //! this is slider's this
        switch (type) {
            case "ROUND":
                txt.text = Math.round(this.value);
                txt2.text = Math.round(this.value * ratio);
                break;
            case "SMART":
                txt.text = this.value;
                txt2.text = this.value * ratio;
                break;
            default:
                txt.text = this.value;
                txt2.text = this.value * ratio;
        }
    }

    txt.onChange = txt.onChanging = function () {
        var sliderAtEnd = slider.value == slider.maxvalue;
        if (type == "SMART") {
            var zero = countZerosAfterDecimal(this.text);
            if (zero == -1) {
                slider.minvalue = 1;
                if (sliderAtEnd)
                    slider.maxvalue = parseInt(this.text);
                else
                    slider.maxvalue = getNumberLength(parseInt(this.text)) * 10;
            } else {
                slider.minvalue = 0
                if (sliderAtEnd)
                    slider.maxvalue = parseFloat(this.text);
                else
                    slider.maxvalue = Math.pow(0.1, (zero))
            }
        } else if (type == "ROUND") {
            slider.value = parseFloat(this.text);
            txt2.text = Math.round(parseFloat(this.text) * ratio);
            txt.text = Math.round(parseFloat(this.text));

        } else {

            slider.value = parseFloat(this.text);
            txt2.text = parseFloat(this.text) * ratio;
        }
    }
    txt2.onChange = txt2.onChanging = function () {
        var sliderAtEnd = slider.value == slider.maxvalue;
        if (type == "SMART") {
            var zero = countZerosAfterDecimal(this.text);
            if (zero == -1) {
                slider.minvalue = 1;
                if (sliderAtEnd)
                    slider.maxvalue = parseInt(this.text);
                else
                    slider.maxvalue = getNumberLength(parseInt(this.text)) * 10;
            } else {
                slider.minvalue = 0
                if (sliderAtEnd)
                    slider.maxvalue = parseFloat(this.text);
                else
                    slider.maxvalue = Math.pow(0.1, (zero))
            }
        } else if (type == "ROUND") {
            slider.value = parseFloat(this.text);
            txt2.text = Math.round(parseFloat(this.text) * ratio);
            txt.text = Math.round(parseFloat(this.text));

        } else {

            slider.value = parseFloat(this.text);
            txt2.text = parseFloat(this.text) * ratio;
        }
    }
}
function getNumberLength(number) {
    // Handle special cases
    if (number === 0) {
        return 1;
    }

    // Calculate the number length in decimal base
    var abs = Math.abs(number);
    var log = Math.log(abs) / Math.log(10);
    var length = Math.floor(log) + 1;

    return length;
}
function countZerosAfterDecimal(number) {
    // Convert the number to a string
    var numberString = number.toString();

    // Find the index of the decimal point
    var decimalIndex = numberString.indexOf('.');

    // If there is no decimal point or it's the last character, return 0
    if (decimalIndex === -1 || decimalIndex === numberString.length - 1) {
        return -1;
    }

    // Count the number of zeros after the decimal point
    var zeroCount = 0;
    for (var i = decimalIndex + 1; i < numberString.length; i++) {
        if (numberString.charAt(i) === '0') {
            zeroCount++;
        } else {
            break;
        }
    }

    return zeroCount;
}
// END INCLUDE: ~/jsxutils/SliderText.jsx
// BEGIN INCLUDE: ~/jsxutils/AddLink.jsx
function addLink(parent, string, callBack_OR_URL, options) {
	options = options || {};
	const myColorOn = options.colorOn || [.2, .6, .95, 1];
	const myColorOff = options.colorOff || [.3, .6, .8, 1];
	var gUrl = parent.add('group');
	var st = gUrl.add('statictext', void 0, string);
	var ln = gUrl.add('group');
	gUrl.orientation = 'stack';
	st.alignment = ['center', 'top'];
	ln.alignment = ['center', 'bottom'];
	ln.preferredSize = { width: ln.graphics.measureString(string)[0], height: 1 };
	st.graphics.foregroundColor = st.graphics.newPen(0, myColorOn, 1);
	st.graphics.disabledForegroundColor = st.graphics.newPen(0, myColorOff, 1);
	st.enabled = false;
	ln.graphics.backgroundColor = ln.graphics.newBrush(0, myColorOn);
	ln.visible = false;
	var t = function (ev) {
		var st = this.children[0];
		var ln = this.children[1];
		switch (ev.type) {
			case 'mouseover':
			case 'mousemove':
				st.enabled = true;
				ln.visible = true;
				break;
			case 'mouseout':
				st.enabled = false;
				ln.visible = false;
				break;
			case 'mousedown':
				if ('target' != ev.eventPhase) break;
				if (typeof callBack == "function") callBack_OR_URL()
				else getUrl(callBack_OR_URL);


			default: ;
		}
	};
	gUrl.addEventListener('mouseover', t);
	gUrl.addEventListener('mousemove', t);
	gUrl.addEventListener('mouseout', t);
	gUrl.addEventListener('mousedown', t);

	return gUrl
}

//should be structured
/*
	parent group
		-group to click

	then another group is added:
	
	parent group
		-group to click
		->inserted here

*/
function addLinkG(parentGroup, group, callBack_OR_URL, options) {
	parentGroup.orientation = "stack";
	options = options || {};
	const myColorOn = options.colorOn || [.4, .9, .1, .1];
	const myColorOff = options.colorOff || [.3, .6, .8, 1];
	var gUrl = parentGroup

	var ln = gUrl.add('group');
	//gUrl.orientation = 'stack';
	//st.alignment = ['center', 'top'];
	ln.alignment = ['center', 'center'];
	group.alignment = ['center', 'center'];
	//ln.preferredSize = 
	ln.preferredSize = { width: group.preferredSize.width, height: group.preferredSize.height + 10 }
	//ln.preferredSize = { width:group.width,height:group.height}


	ln.graphics.backgroundColor = ln.graphics.newBrush(0, myColorOn);
	ln.visible = false;
	var t = function (ev) {
		var st = this.children[0];
		var ln = this.children[1];
		switch (ev.type) {
			case 'mouseover':
			case 'mousemove':
				st.enabled = true;
				ln.visible = true;
				break;
			case 'mouseout':
				//	st.enabled = false;
				ln.visible = false;
				break;
			case 'mousedown':
				if ('target' != ev.eventPhase) break;
				if (typeof callBack == "function") callBack_OR_URL()
				else getUrl(callBack_OR_URL);


			default: ;
		}
	};
	gUrl.addEventListener('mouseover', t);
	gUrl.addEventListener('mousemove', t);
	gUrl.addEventListener('mouseout', t);
	gUrl.addEventListener('mousedown', t);

	return gUrl
}
function getUrl(url) {
	try {
		var URL = new File(Folder.temp + "/temp.html");
		URL.open("w");
		URL.writeln('<html><HEAD><meta HTTP-EQUIV="REFRESH" content="0; url=' + url + '/"></HEAD></HTML>');
		URL.close();
		URL.execute();
	} catch (e) {
		alert("Error, can not open " + url);
	};
}


// END INCLUDE: ~/jsxutils/AddLink.jsx
 
// BEGIN INCLUDE: Triangulator4.jsx
/*//////////////////////////////////


this is a standalone version of triangulator with extra path and lab colors


/*//////////////////////////////////




/////////////////////////////////////// Color stuff

var L = 20;
var A = 10;
var B = 10;
var LAB_COLOR_A = [100, 0, 0];

var trianglesStroked = true;

function getNextColor(l, a, b) {
  l = l || L;
  a = a || A;
  b = b || B;

  var color = new LabColor();
  var sign = Math.random() > .5 ? 1 : -1;
  color.l = limit(l * Math.random() * sign + LAB_COLOR_A[0], 0, 100);
  color.a = limit(a * Math.random() + LAB_COLOR_A[1], -128, 127);
  color.b = limit(b * Math.random() + LAB_COLOR_A[2], -128, 127);
  return color;
}
function getBaseColor(path) {
  var WHITE = c = new RGBColor(); c.red = 255; c.green = 255; c.blue = 255;
  var doc = app.activeDocument;
  var color = path.fillColor || WHITE;
  var sourceSpace = doc.documentColorSpace == DocumentColorSpace.CMYK ? ImageColorSpace.CMYK : ImageColorSpace.RGB;
  var components = extractColorComponents(color);
  try {
    LAB_COLOR_A = app.convertSampleColor(sourceSpace, components, ImageColorSpace.LAB, ColorConvertPurpose.previewpurpose);
  } catch (e) { };
}
function extractColorComponents(color) {
  switch (color.typename) {
    case "RGBColor": return [color.red, color.green, color.blue];
    case "CMYKColor": return [color.cyan, color.magenta, color.yellow, color.black];
    case "LabColor": return [color.l, color.a, color.b];
    case "GrayColor": return [color.gray];
    default: return [0, 0, 0]; // fallback
  }
}
function limit(val, min, max) {
  if (val < min) return min
  if (val > max) return max
  return val
}

//////////////////////


function triangulator(selectedItem, layer, topPathForAdditionalPoints, numPoints) {

  getBaseColor(selectedItem);

  var holes = [];
  var outerPath = null;

  /** converts compounds to holes/outer paths */
  if (selectedItem.constructor.name == "CompoundPathItem") {
    for (p = 0; p < selectedItem.pathItems.length; p++) {
      /** ignore small holes */
      if (Math.abs(selectedItem.pathItems[p].area) < 30)
        continue;
      holes.push(flattenPath(selectedItem.pathItems[p]));
    };
    if (holes.length == 1 && outerPath == null) {
      outerPath = holes[0];
      holes = [];
    } else {
      var minx = holes[0][0][0];
      var outer = 0;
      for (p = 0; p < holes.length; p++) {
        for (q = 0; q < holes[p].length; q++) {
          if (holes[p][q][0] < minx) {
            minx = holes[p][q][0];
            outer = p;
          };
        };
      };
      outerPath = holes[outer];
      holes.splice(outer, 1);
    };
  } else /** or just one path */
    outerPath = flattenPath(selectedItem);

  if (!outerPath) {
    alert("Bad path");
    return;
  };

  var pathA = cutHolesInPath(outerPath, holes);
  var points = [];

  if (topPathForAdditionalPoints && topPathForAdditionalPoints.constructor.name == "PathItem")
    points = getPointsOfPath(topPathForAdditionalPoints);

  if (numPoints)
    addPointsToPoly(numPoints, pathA, selectedItem.geometricBounds, points);

  points = points.concat(pathA);
  showMessage("Calculating triangles");

  var triangles = Delaunay.triangulate(points);
  /** change data format */
  var triangles2 = [];

  for (var i = 0; i < triangles.length; i += 3) {
    var triangle = [triangles[i], triangles[i + 1], triangles[i + 2]];
    triangles2.push(triangle);
  };
  showMessage("Drawing triangles");
  drawTriangles2(triangles2, points, pathA, layer);

};


function addPointsToPoly(count, pathA, B, points) {
  points = points || [];
  var w = (B[2] - B[0]);
  var h = (B[3] - B[1]);
  var ERR = 10000;
  if (count)
    do {
      var x = B[0] + Math.random() * w;
      var y = B[1] + Math.random() * h;
      if (pointInsidePoly([x, y], pathA)) {
        points.push([x, y]);
        count--;
      };
      ERR--;
    } while (count && ERR);
  return points
}


function getPointsOfPath(selectedItem, pathA) {

  pathA = pathA || [];
  var len = selectedItem.pathPoints.length;
  for (var i = 0; i < len; i++) {
    //var x = selectedItem.pathPoints[i].anchor[0];
    //var y = selectedItem.pathPoints[i].anchor[1];
    pathA.push(selectedItem.pathPoints[i].anchor);
  }
  return pathA;

}

function userExit(){
  if(ScriptUI.environment.keyboardState.keyName=="Escape"){
    log("User exit");
    showMessage("User exit");
    return true;
  }
  return false;
}

function drawTriangles2(triangles, points, outerPath, layer) {


  // Construct a map from point indices to arrays of adjacent triangles
  // indexas - taskas, taskas turi masyva trikampiu kurie eina per ji
  var adj = {};
  for (var i = 0; i < triangles.length; i++) {

    //kampu taskai
    var a = triangles[i][0];
    var b = triangles[i][1];
    var c = triangles[i][2];
    //jei kampas neturi dezutes, sukuriam jam
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];
    if (!adj[c]) adj[c] = [];
    //i ta kampa padedam trikampio nr
    adj[a].push(i);
    adj[b].push(i);
    adj[c].push(i);


  }

  var processedPoints = {}
  var processedTriangles = {}
  var l = points.length;


  for (var i = 0; i < l; i++) {
    if (userExit()) break;
    showProgress(progressBigC, progressBigTotal, i, l);

    var toContinue = false;
    //pick random point
    var p = ~~(Math.random() * l);
    if (processedPoints[p])
      continue;

    processedPoints[p] = true;

    //kazkur bugas, nzn, jau velu krc
    if (!adj[p]) continue;
    //check all triangles around that point, make sure all unprocessed
    for (var j = 0; j < adj[p].length; j++) {

      var triangle = triangles[adj[p][j]];
      //even one triangle processed, we break out
      if (processedTriangles[triangle]) {
        toContinue = true
        break;
      }

      processedTriangles[triangle] = true;
      var a = triangle[0];
      var b = triangle[1];
      var c = triangle[2];
      var v = points[p];

      var trianglePoints = [points[a], points[b], points[c]]
      var cc = calculateTriangleCentroid(trianglePoints);

      if (!pointInsidePoly(cc, outerPath))
        continue;


      var angle = Math.atan2(cc[1] - v[1], cc[0] - v[0])
      angle = Math.abs(angle)

      trianglePoints.push(trianglePoints[0]);
      drawOneTriangle(trianglePoints, angle, layer);
    }
  }
  //REMAINING TRIANGLES
  //return;
  for (var i = 0; i < triangles.length; i++) {
    if (userExit()) break;

    var triangle = triangles[i];
    if (processedTriangles[triangle])
      continue;
    var a = triangle[0];
    var b = triangle[1];
    var c = triangle[2];
    var trianglePoints = [points[a], points[b], points[c]]
    var cc = calculateTriangleCentroid(trianglePoints);
    if (!pointInsidePoly(cc, outerPath))
      continue;

    trianglePoints.push(trianglePoints[0]);
    drawOneTriangle(trianglePoints, Math.random() * 2, layer)



  }

}

function drawOneTriangle(trianglePoints, angle, layer) {
  var BLACK_RGB = new RGBColor();
  var drawnPath = layer.pathItems.add();
  //rem last point
  trianglePoints.pop()
  drawnPath.setEntirePath(trianglePoints);
  drawnPath.filled = true;
  drawnPath.fillColor = getNextColor(-L * angle, A, B);
  if (drawnPath.stroked = trianglesStroked)
    drawnPath.stokeColor = BLACK_RGB;
  drawnPath.closed = true;
}


function curve4(x1, y1,   //Anchor1
  x2, y2,   //Control1
  x3, y3,   //Control2
  x4, y4,   //Anchor2
  nSteps   // Flattening value
) {
  var pointList = new Array();
  var dx1 = x2 - x1;
  var dy1 = y2 - y1;
  var dx2 = x3 - x2;
  var dy2 = y3 - y2;
  var dx3 = x4 - x3;
  var dy3 = y4 - y3;

  var subdiv_step = 1.0 / (nSteps + 1);
  var subdiv_step2 = subdiv_step * subdiv_step;
  var subdiv_step3 = subdiv_step * subdiv_step * subdiv_step;

  var pre1 = 3.0 * subdiv_step;
  var pre2 = 3.0 * subdiv_step2;
  var pre4 = 6.0 * subdiv_step2;
  var pre5 = 6.0 * subdiv_step3;

  var tmp1x = x1 - x2 * 2.0 + x3;
  var tmp1y = y1 - y2 * 2.0 + y3;

  var tmp2x = (x2 - x3) * 3.0 - x1 + x4;
  var tmp2y = (y2 - y3) * 3.0 - y1 + y4;

  var fx = x1;
  var fy = y1;

  var dfx = (x2 - x1) * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
  var dfy = (y2 - y1) * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;

  var ddfx = tmp1x * pre4 + tmp2x * pre5;
  var ddfy = tmp1y * pre4 + tmp2y * pre5;

  var dddfx = tmp2x * pre5;
  var dddfy = tmp2y * pre5;

  var step = nSteps;

  pointList.push([x1, y1]);	// Start Here
  while (step--) {
    fx += dfx;
    fy += dfy;
    dfx += ddfx;
    dfy += ddfy;
    ddfx += dddfx;
    ddfy += dddfy;
    pointList.push([fx, fy]);
  }
  //    pointList.push ([x4, y4]); // Last step must go exactly to x4, y4
  return pointList;
}

function flattenPath(obj) {
  var newpath = new Array();
  var curveList;
  var pt, nextpt;
  var isFlattened = false;

  if (!obj.hasOwnProperty("pathPoints"))
    return null;

  for (pt = 0; pt < obj.pathPoints.length; pt++) {
    nextpt = pt + 1;
    if (nextpt == obj.pathPoints.length)
      nextpt = 0;
    if (obj.pathPoints[pt].anchor[0] == obj.pathPoints[pt].rightDirection[0] && obj.pathPoints[pt].anchor[1] == obj.pathPoints[pt].rightDirection[1] &&
      obj.pathPoints[nextpt].anchor[0] == obj.pathPoints[nextpt].leftDirection[0] && obj.pathPoints[nextpt].anchor[1] == obj.pathPoints[nextpt].leftDirection[1]) {
      newpath.push(obj.pathPoints[pt].anchor);
    } else {
      isFlattened = true;
      curveList = curve4(obj.pathPoints[pt].anchor[0], obj.pathPoints[pt].anchor[1],
        obj.pathPoints[pt].rightDirection[0], obj.pathPoints[pt].rightDirection[1],
        obj.pathPoints[nextpt].leftDirection[0], obj.pathPoints[nextpt].leftDirection[1],
        obj.pathPoints[nextpt].anchor[0], obj.pathPoints[nextpt].anchor[1],
        2);
      newpath = newpath.concat(curveList);
    }
  }
  //	Make path round
  //	newpath.push (newpath[0]);
  return newpath;
}


//from Jongware
function cutHolesInPath(path, holes) {
  if (getWinding(path) < 0)
    path.reverse();

  //	Remove holes by joining them with the outer edge
  if (holes.length) {
    for (hh = 0; hh < holes.length; hh++) {
      var h = holes[hh];
      if (getWinding(h) > 0)
        h.reverse();

      var maxpt = 0;
      for (i = 1; i < h.length; i++) {
        if (h[i][0] > h[maxpt][0] || (h[i][0] == h[maxpt][0] && h[i][1] < h[maxpt][1]))
          maxpt = i;
      }
      while (maxpt > 0) {
        h.push(h.shift());
        maxpt--;
      }
    }
    holes.sort(function (a, b) { if (a[0][0] > b[0][0]) return -1; if (a[0][0] < b[0][0]) return 1; return (a[0][1] < b[0][1]) ? 1 : -1; });
    for (hh = 0; hh < holes.length; hh++) {
      var h = holes[hh];
      var maxpt = 0;

      for (i = 1; i < h.length; i++)
        if (h[i][0] > h[maxpt][0] || (h[i][0] == h[maxpt][0] && h[i][1] < h[maxpt][1]))
          maxpt = i;

      var d2 = null;
      var closestpt;
      for (i = 0; i < path.length; i++) {
        if (path[i][0] > h[maxpt][0]) {
          if (d2 == null) {
            d2 = ClosestPointOnLine(h[maxpt], [path[i], path[(i + 1) % path.length]])[1];
            closestpt = i;
          } else {
            var dd2 = ClosestPointOnLine(h[maxpt], [path[i], path[(i + 1) % path.length]])[1];
            if (dd2 < d2) {
              d2 = dd2;
              closestpt = i;
            }
          }
        }
      }

      path.splice(closestpt, 0, [path[closestpt][0], path[closestpt][1] + 0.1]);
      closestpt++;
      h.splice(maxpt, 0, [h[maxpt][0], h[maxpt][1]]);

      h[maxpt][1] -= 0.1;
      for (var i = maxpt; i >= 0; i--) {
        path.splice(closestpt, 0, h[i]);
      }
      for (var i = h.length - 1; i > maxpt; i--) {
        path.splice(closestpt, 0, h[i]);
      }
    }
  }

  return path
}
function getWinding(path) {
  //    Return area of a simple (ie. non-self-intersecting) polygon.
  //    Will be negative for counterclockwise winding.
  var i, next;
  var accum = 0;
  for (i = 0; i < path.length - 1; i++) {
    next = i + 1;
    accum += path[next][0] * path[i][1] - path[i][0] * path[next][1];
  }
  next = 0;
  accum += path[next][0] * path[i][1] - path[i][0] * path[next][1];
  return accum / 2;
}
function calculateTriangleCentroid(tri) {
  //util_inspect_properties(tri)  
  var centerX = (tri[0][0] + tri[1][0] + tri[2][0]) / 3;
  var centerY = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
  return [centerX, centerY];
}

function pointInsidePoly(pt, poly) {
  for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
    ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
      && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
      && (c = !c);

  return c;
}




/////////////////////////////////// misc


Array.prototype.indexOf = function (searchElement, fromIndex) {
  var startIndex = fromIndex || 0;
  var length = this.length;

  for (var i = startIndex; i < length; i++) {
    if (this[i] == searchElement) {
      return i;
    }
  }

  return -1;
};

// Compute the distance from segment Line to Pt
// Returns [ Point, Distance ]
function ClosestPointOnLine(pt, line) {
  var X1 = line[0][0], Y1 = line[0][1];
  var X2 = line[1][0], Y2 = line[1][1];
  var px = pt[0], py = pt[1];

  var dx = X2 - X1;
  var dy = Y2 - Y1;

  var nx, ny;

  if (dx == 0 && dy == 0) {
    // It's a point not a line segment.
    // dx = px - X1
    // dy = py - Y1
    // distance = Sqr(dx * dx + dy * dy)
    nx = X1;
    ny = Y1;
  } else {
    // Calculate the t that minimizes the distance.
    var t = ((px - X1) * dx + (py - Y1) * dy) / (dx * dx + dy * dy);

    // See if this represents one of the segment's
    // end points or a point in the middle.
    if (t <= 0) {
      nx = X1;
      ny = Y1;
    } else if (t >= 1) {
      nx = X2;
      ny = Y2;
    } else {
      nx = X1 + t * dx;
      ny = Y1 + t * dy;
    }
  }

  dx = px - nx;
  dy = py - ny;

  return [[nx, ny], Math.sqrt(dx * dx + dy * dy)];
}


function getRGBFromColor(color) {

  if (color.typename == "RGBColor") {
    return [color.red, color.green, color.blue];
  } else if (color.typename == "GrayColor") {
    return [color.gray, color.gray, color.gray];
  } else if (color.typename == "CMYKColor") {
    var cyan = color.cyan / 100;
    var magenta = color.magenta / 100;
    var yellow = color.yellow / 100;
    var black = color.black / 100;

    var red = 1 - Math.min(1, cyan * (1 - black) + black);
    var green = 1 - Math.min(1, magenta * (1 - black) + black);
    var blue = 1 - Math.min(1, yellow * (1 - black) + black);

    return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
  } else {
    return [0, 0, 0];
  }
}
function getRGBColorFromArray(rgbArray) {
  var red = rgbArray[0];
  var green = rgbArray[1];
  var blue = rgbArray[2];

  red = range(red, 0, 255);
  green = range(green, 0, 255);
  blue = range(blue, 0, 255);

  var rgbColor = new RGBColor();
  rgbColor.red = red;
  rgbColor.green = green;
  rgbColor.blue = blue;
  return rgbColor;
}
function range(v, d, u) {
  if (v > u) v = u;
  if (v < d) v = d;
  return v;
}
function rgbToHsl(color) {
  var r = color.red / 255;
  var g = color.green / 255;
  var b = color.blue / 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100)
  };
}
function hslToRgb(h, s, l) {
  var chroma = (1 - Math.abs((2 * l / 100) - 1)) * (s / 100);
  var hueSegment = h / 60;
  var x = chroma * (1 - Math.abs((hueSegment % 2) - 1));
  var r1, g1, b1;
  if (hueSegment >= 0 && hueSegment < 1) {
    r1 = chroma;
    g1 = x;
    b1 = 0;
  } else if (hueSegment >= 1 && hueSegment < 2) {
    r1 = x;
    g1 = chroma;
    b1 = 0;
  } else if (hueSegment >= 2 && hueSegment < 3) {
    r1 = 0;
    g1 = chroma;
    b1 = x;
  } else if (hueSegment >= 3 && hueSegment < 4) {
    r1 = 0;
    g1 = x;
    b1 = chroma;
  } else if (hueSegment >= 4 && hueSegment < 5) {
    r1 = x;
    g1 = 0;
    b1 = chroma;
  } else {
    r1 = chroma;
    g1 = 0;
    b1 = x;
  }
  var m = (l / 100) - (chroma / 2);
  var r = Math.round((r1 + m) * 255);
  var g = Math.round((g1 + m) * 255);
  var b = Math.round((b1 + m) * 255);
  return [r, g, b];
}

function variateOneLIGHTNESS(p, l, a, b) {
  p.filled = true;
  p.fillColor = getNextColor(l, a, b)
}
// function variateOneLIGHTNESS(p, h, cc) {
//   c = p.fillColor;
//   c = getRGBFromColor(c);
//   ///!!!
//   c = getRGBColorFromArray(cc ? cc : c);
//   c = rgbToHsl(c);
//   p.filled = true;
//   p.fillColor = getRGBColorFromArray(hslToRgb(c.hue + h[0] * Math.random() - h[0] / 2, c.saturation + h[1] * Math.random() - h[1] / 2, c.lightness + h[2]));
// }

var Delaunay;

(function () {
  "use strict";

  var EPSILON = 1.0 / 1048576.0;

  function supertriangle(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
      ymin = Number.POSITIVE_INFINITY,
      xmax = Number.NEGATIVE_INFINITY,
      ymax = Number.NEGATIVE_INFINITY,
      i, dx, dy, dmax, xmid, ymid;

    for (i = vertices.length; i--;) {
      if (vertices[i][0] < xmin) xmin = vertices[i][0];
      if (vertices[i][0] > xmax) xmax = vertices[i][0];
      if (vertices[i][1] < ymin) ymin = vertices[i][1];
      if (vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
      [xmid - 20 * dmax, ymid - dmax],
      [xmid, ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid - dmax]
    ];
  }

  function circumcircle(vertices, i, j, k) {
    var x1 = vertices[i][0],
      y1 = vertices[i][1],
      x2 = vertices[j][0],
      y2 = vertices[j][1],
      x3 = vertices[k][0],
      y3 = vertices[k][1],
      fabsy1y2 = Math.abs(y1 - y2),
      fabsy2y3 = Math.abs(y2 - y3),
      xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
      throw new Error("Eek! Coincident points!");

    if (fabsy1y2 < EPSILON) {
      m2 = -((x3 - x2) / (y3 - y2));
      mx2 = (x2 + x3) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc = (x2 + x1) / 2.0;
      yc = m2 * (xc - mx2) + my2;
    }

    else if (fabsy2y3 < EPSILON) {
      m1 = -((x2 - x1) / (y2 - y1));
      mx1 = (x1 + x2) / 2.0;
      my1 = (y1 + y2) / 2.0;
      xc = (x3 + x2) / 2.0;
      yc = m1 * (xc - mx1) + my1;
    }

    else {
      m1 = -((x2 - x1) / (y2 - y1));
      m2 = -((x3 - x2) / (y3 - y2));
      mx1 = (x1 + x2) / 2.0;
      mx2 = (x2 + x3) / 2.0;
      my1 = (y1 + y2) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
      yc = (fabsy1y2 > fabsy2y3) ?
        m1 * (xc - mx1) + my1 :
        m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return { i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy };
  }

  function dedup(edges) {
    var i, j, a, b, m, n;

    for (j = edges.length; j;) {
      b = edges[--j];
      a = edges[--j];

      for (i = j; i;) {
        n = edges[--i];
        m = edges[--i];

        if ((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2);
          edges.splice(i, 2);
          break;
        }
      }
    }
  }

  Delaunay = {
    triangulate: function (vertices, key) {
      var n = vertices.length,
        i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

      /* Bail if there aren't enough vertices to form any triangles. */
      if (n < 3)
        return [];

      /* Slice out the actual vertices from the passed objects. (Duplicate the
       * array even if we don't, though, since we need to make a supertriangle
       * later on!) */
      vertices = vertices.slice(0);

      if (key)
        for (i = n; i--;)
          vertices[i] = vertices[i][key];

      /* Make an array of indices into the vertex array, sorted by the
       * vertices' x-position. Force stable sorting by comparing indices if
       * the x-positions are equal. */
      indices = new Array(n);

      for (i = n; i--;)
        indices[i] = i;

      indices.sort(function (i, j) {
        var diff = vertices[j][0] - vertices[i][0];
        return diff !== 0 ? diff : i - j;
      });

      /* Next, find the vertices of the supertriangle (which contains all other
       * triangles), and append them onto the end of a (copy of) the vertex
       * array. */
      st = supertriangle(vertices);
      vertices.push(st[0], st[1], st[2]);

      /* Initialize the open list (containing the supertriangle and nothing
       * else) and the closed list (which is empty since we havn't processed
       * any triangles yet). */
      open = [circumcircle(vertices, n + 0, n + 1, n + 2)];
      closed = [];
      edges = [];

      /* Incrementally add each vertex to the mesh. */
      for (i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        /* For each open triangle, check to see if the current point is
         * inside it's circumcircle. If it is, remove the triangle and add
         * it's edges to an edge list. */
        for (j = open.length; j--;) {
          /* If this point is to the right of this triangle's circumcircle,
           * then this triangle should never get checked again. Remove it
           * from the open list, add it to the closed list, and skip. */
          dx = vertices[c][0] - open[j].x;
          if (dx > 0.0 && dx * dx > open[j].r) {
            closed.push(open[j]);
            open.splice(j, 1);
            continue;
          }

          /* If we're outside the circumcircle, skip this triangle. */
          dy = vertices[c][1] - open[j].y;
          if (dx * dx + dy * dy - open[j].r > EPSILON)
            continue;

          /* Remove the triangle and add it's edges to the edge list. */
          edges.push(
            open[j].i, open[j].j,
            open[j].j, open[j].k,
            open[j].k, open[j].i
          );
          open.splice(j, 1);
        }

        /* Remove any doubled edges. */
        dedup(edges);

        /* Add a new triangle for each edge. */
        for (j = edges.length; j;) {
          b = edges[--j];
          a = edges[--j];
          open.push(circumcircle(vertices, a, b, c));
        }
      }

      /* Copy any remaining open triangles to the closed list, and then
       * remove any triangles that share a vertex with the supertriangle,
       * building a list of triplets that represent triangles. */
      for (i = open.length; i--;)
        closed.push(open[i]);
      open.length = 0;

      for (i = closed.length; i--;)
        if (closed[i].i < n && closed[i].j < n && closed[i].k < n)
          open.push(closed[i].i, closed[i].j, closed[i].k);

      /* Yay, we're done! */
      return open;
    },
    contains: function (tri, p) {
      /* Bounding box test first, for quick rejections */
      if (p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0] ||
        p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0] ||
        p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1] ||
        p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1])
        return null;

      var a = tri[1][0] - tri[0][0],
        b = tri[2][0] - tri[0][0],
        c = tri[1][1] - tri[0][1],
        d = tri[2][1] - tri[0][1],
        i = a * d - b * c;

      /* Degenerate tri. */
      if (i === 0.0)
        return null;

      var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
        v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

      /* If we're outside the tri, fail */
      if (u < 0.0 || v < 0.0 || (u + v) > 1.0)
        return null;

      return [u, v];
    },
  };

  if (typeof module !== "undefined")
    module.exports = Delaunay;
})();

function execBT(func, params_, onResult_) {
  func = (typeof func == "function") ? func.toSource() : '(' + func + ')';

  var bt = new BridgeTalk;
  bt.target = "illustrator";

  var par = params_ ? params_.toSource() : "";
  bt.body = func + "(" + par + ");"
  if (onResult_) bt.onResult = onResult_;
  bt.send();
}



//sita ensamone reikaling nes selekcijos indeksas yra upside down
//jeigu 2 selektinti, paleidziam antra kaip popildomu tasku patha

function main() {

  var doc = activeDocument;
  var s = doc.selection;
  var lay = doc.layers.add();

  if (s.length == 1)
    triangulator(s[0], lay);
  else {
    triangulator(s[1], lay, s[0]);

  }
};

main()// END INCLUDE: Triangulator4.jsx
// BEGIN INCLUDE: voronoi01_forTriangulatorPro.jsx


/*//////////////////////////////////

bisk skiriasi nuo standalono
veikia lab spalvos
yra pridedami taskai
//po cutinimo glithcai buna, fixas
//slepiam visus lejerius kuriu nekutinam!
/*/////////////////////////////////


/*!
Author: Raymond Hill (rhill@raymondhill.net)
File: rhill-voronoi-core.js
Version: 0.96
Date: May 26, 2011
Description: This is my personal Javascript implementation of
Steven Fortune's algorithm to compute Voronoi diagrams.

Copyright (C) 2010,2011 Raymond Hill
https://github.com/gorhill/Javascript-Voronoi

Licensed under The MIT License
http://en.wikipedia.org/wiki/MIT_License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*****

Portions of this software use, depend, or was inspired by the work of:

  "Fortune's algorithm" by Steven J. Fortune: For his clever
  algorithm to compute Voronoi diagrams.
  http://ect.bell-labs.com/who/sjf/

  "The Liang-Barsky line clipping algorithm in a nutshell!" by Daniel White,
  to efficiently clip a line within a rectangle.
  http://www.skytopia.com/project/articles/compsci/clipping.html

  "rbtree" by Franck Bui-Huu
  https://github.com/fbuihuu/libtree/blob/master/rb.c
  I ported to Javascript the C code of a Red-Black tree implementation by
  Franck Bui-Huu, and further altered the code for Javascript efficiency
  and to very specifically fit the purpose of holding the beachline (the key
  is a variable range rather than an unmutable data point), and unused
  code paths have been removed. Each node in the tree is actually a beach
  section on the beachline. Using a tree structure for the beachline remove
  the need to lookup the beach section in the array at removal time, as
  now a circle event can safely hold a reference to its associated
  beach section (thus findDeletionPoint() is no longer needed). This
  finally take care of nagging finite arithmetic precision issues arising
  at lookup time, such that epsilon could be brought down to 1e-9 (from 1e-4).
  rhill 2011-05-27: added a 'previous' and 'next' members which keeps track
  of previous and next nodes, and remove the need for Beachsection.getPrevious()
  and Beachsection.getNext().

*****

History:

0.96 (26 May 2011):
  Returned diagram.cells is now an array, whereas the index of a cell
  matches the index of its associated site in the array of sites passed
  to Voronoi.compute(). This allowed some gain in performance. The
  'voronoiId' member is still used internally by the Voronoi object.
  The Voronoi.Cells object is no longer necessary and has been removed.

0.95 (19 May 2011):
  No longer using Javascript array to keep track of the beach sections of
  the beachline, now using Red-Black tree.

  The move to a binary tree was unavoidable, as I ran into finite precision
  arithmetic problems when I started to use sites with fractional values.
  The problem arose when the code had to find the arc associated with a
  triggered Fortune circle event: the collapsing arc was not always properly
  found due to finite precision arithmetic-related errors. Using a tree structure
  eliminate the need to look-up a beachsection in the array structure
  (findDeletionPoint()), and allowed to bring back epsilon down to 1e-9.

0.91(21 September 2010):
  Lower epsilon from 1e-5 to 1e-4, to fix problem reported at
  http://www.raymondhill.net/blog/?p=9#comment-1414

0.90 (21 September 2010):
  First version.

*****

Usage:

  var sites = [{x:300,y:300}, {x:100,y:100}, {x:200,y:500}, {x:250,y:450}, {x:600,y:150}];
  // xl, xr means x left, x right
  // yt, yb means y top, y bottom
  var bbox = {xl:0, xr:800, yt:0, yb:600};
  var voronoi = new Voronoi();
  // pass an object which exhibits xl, xr, yt, yb properties. The bounding
  // box will be used to connect unbound edges, and to close open cells
  result = voronoi.compute(sites, bbox);
  // render, further analyze, etc.

Return value:
  An object with the following properties:

  result.edges = an array of unordered, unique Voronoi.Edge objects making up the Voronoi diagram.
  result.cells = an array of Voronoi.Cell object making up the Voronoi diagram. A Cell object
	might have an empty array of halfedges, meaning no Voronoi cell could be computed for a
	particular cell.
  result.execTime = the time it took to compute the Voronoi diagram, in milliseconds.

Voronoi.Edge object:
  lSite: the Voronoi site object at the left of this Voronoi.Edge object.
  rSite: the Voronoi site object at the right of this Voronoi.Edge object (can be null).
  va: an object with an 'x' and a 'y' property defining the start point
	(relative to the Voronoi site on the left) of this Voronoi.Edge object.
  vb: an object with an 'x' and a 'y' property defining the end point
	(relative to Voronoi site on the left) of this Voronoi.Edge object.

  For edges which are used to close open cells (using the supplied bounding box), the
  rSite property will be null.

Voronoi.Cell object:
  site: the Voronoi site object associated with the Voronoi cell.
  halfedges: an array of Voronoi.Halfedge objects, ordered counterclockwise, defining the
	polygon for this Voronoi cell.

Voronoi.Halfedge object:
  site: the Voronoi site object owning this Voronoi.Halfedge object.
  edge: a reference to the unique Voronoi.Edge object underlying this Voronoi.Halfedge object.
  getStartpoint(): a method returning an object with an 'x' and a 'y' property for
	the start point of this halfedge. Keep in mind halfedges are always countercockwise.
  getEndpoint(): a method returning an object with an 'x' and a 'y' property for
	the end point of this halfedge. Keep in mind halfedges are always countercockwise.

TODO: Identify opportunities for performance improvement.
TODO: Let the user close the Voronoi cells, do not do it automatically. Not only let
	  him close the cells, but also allow him to close more than once using a different
	  bounding box for the same Voronoi diagram.
*/

/*global Math */

function Voronoi() {
	this.edges = null;
	this.cells = null;
	this.beachsectionJunkyard = [];
	this.circleEventJunkyard = [];
}

Voronoi.prototype.reset = function () {
	if (!this.beachline) {
		this.beachline = new this.RBTree();
	}
	// Move leftover beachsections to the beachsection junkyard.
	if (this.beachline.root) {
		var beachsection = this.beachline.getFirst(this.beachline.root);
		while (beachsection) {
			this.beachsectionJunkyard.push(beachsection); // mark for reuse
			beachsection = beachsection.rbNext;
		}
	}
	this.beachline.root = null;
	if (!this.circleEvents) {
		this.circleEvents = new this.RBTree();
	}
	this.circleEvents.root = this.firstCircleEvent = null;
	this.edges = [];
	this.cells = [];
};

Voronoi.prototype.sqrt = Math.sqrt;
Voronoi.prototype.abs = Math.abs;
Voronoi.prototype.EPSILON = 1e-9;
Voronoi.prototype.equalWithEpsilon = function (a, b) { return this.abs(a - b) < 1e-9; };
Voronoi.prototype.greaterThanWithEpsilon = function (a, b) { return a - b > 1e-9; };
Voronoi.prototype.greaterThanOrEqualWithEpsilon = function (a, b) { return b - a < 1e-9; };
Voronoi.prototype.lessThanWithEpsilon = function (a, b) { return b - a > 1e-9; };
Voronoi.prototype.lessThanOrEqualWithEpsilon = function (a, b) { return a - b < 1e-9; };

// ---------------------------------------------------------------------------
// Red-Black tree code (based on C version of "rbtree" by Franck Bui-Huu
// https://github.com/fbuihuu/libtree/blob/master/rb.c

Voronoi.prototype.RBTree = function () {
	this.root = null;
};

Voronoi.prototype.RBTree.prototype.rbInsertSuccessor = function (node, successor) {
	var parent;
	if (node) {
		// >>> rhill 2011-05-27: Performance: cache previous/next nodes
		successor.rbPrevious = node;
		successor.rbNext = node.rbNext;
		if (node.rbNext) {
			node.rbNext.rbPrevious = successor;
		}
		node.rbNext = successor;
		// <<<
		if (node.rbRight) {
			// in-place expansion of node.rbRight.getFirst();
			node = node.rbRight;
			while (node.rbLeft) { node = node.rbLeft; }
			node.rbLeft = successor;
		}
		else {
			node.rbRight = successor;
		}
		parent = node;
	}
	// rhill 2011-06-07: if node is null, successor must be inserted
	// to the left-most part of the tree
	else if (this.root) {
		node = this.getFirst(this.root);
		// >>> Performance: cache previous/next nodes
		successor.rbPrevious = null;
		successor.rbNext = node;
		node.rbPrevious = successor;
		// <<<
		node.rbLeft = successor;
		parent = node;
	}
	else {
		// >>> Performance: cache previous/next nodes
		successor.rbPrevious = successor.rbNext = null;
		// <<<
		this.root = successor;
		parent = null;
	}
	successor.rbLeft = successor.rbRight = null;
	successor.rbParent = parent;
	successor.rbRed = true;
	// Fixup the modified tree by recoloring nodes and performing
	// rotations (2 at most) hence the red-black tree properties are
	// preserved.
	var grandpa, uncle;
	node = successor;
	while (parent && parent.rbRed) {
		grandpa = parent.rbParent;
		if (parent === grandpa.rbLeft) {
			uncle = grandpa.rbRight;
			if (uncle && uncle.rbRed) {
				parent.rbRed = uncle.rbRed = false;
				grandpa.rbRed = true;
				node = grandpa;
			}
			else {
				if (node === parent.rbRight) {
					this.rbRotateLeft(parent);
					node = parent;
					parent = node.rbParent;
				}
				parent.rbRed = false;
				grandpa.rbRed = true;
				this.rbRotateRight(grandpa);
			}
		}
		else {
			uncle = grandpa.rbLeft;
			if (uncle && uncle.rbRed) {
				parent.rbRed = uncle.rbRed = false;
				grandpa.rbRed = true;
				node = grandpa;
			}
			else {
				if (node === parent.rbLeft) {
					this.rbRotateRight(parent);
					node = parent;
					parent = node.rbParent;
				}
				parent.rbRed = false;
				grandpa.rbRed = true;
				this.rbRotateLeft(grandpa);
			}
		}
		parent = node.rbParent;
	}
	this.root.rbRed = false;
};

Voronoi.prototype.RBTree.prototype.rbRemoveNode = function (node) {
	// >>> rhill 2011-05-27: Performance: cache previous/next nodes
	if (node.rbNext) {
		node.rbNext.rbPrevious = node.rbPrevious;
	}
	if (node.rbPrevious) {
		node.rbPrevious.rbNext = node.rbNext;
	}
	node.rbNext = node.rbPrevious = null;
	// <<<
	var parent = node.rbParent,
		left = node.rbLeft,
		right = node.rbRight,
		next;
	if (!left) {
		next = right;
	}
	else if (!right) {
		next = left;
	}
	else {
		next = this.getFirst(right);
	}
	if (parent) {
		if (parent.rbLeft === node) {
			parent.rbLeft = next;
		}
		else {
			parent.rbRight = next;
		}
	}
	else {
		this.root = next;
	}
	// enforce red-black rules
	var isRed;
	if (left && right) {
		isRed = next.rbRed;
		next.rbRed = node.rbRed;
		next.rbLeft = left;
		left.rbParent = next;
		if (next !== right) {
			parent = next.rbParent;
			next.rbParent = node.rbParent;
			node = next.rbRight;
			parent.rbLeft = node;
			next.rbRight = right;
			right.rbParent = next;
		}
		else {
			next.rbParent = parent;
			parent = next;
			node = next.rbRight;
		}
	}
	else {
		isRed = node.rbRed;
		node = next;
	}
	// 'node' is now the sole successor's child and 'parent' its
	// new parent (since the successor can have been moved)
	if (node) {
		node.rbParent = parent;
	}
	// the 'easy' cases
	if (isRed) { return; }
	if (node && node.rbRed) {
		node.rbRed = false;
		return;
	}
	// the other cases
	var sibling;
	do {
		if (node === this.root) {
			break;
		}
		if (node === parent.rbLeft) {
			sibling = parent.rbRight;
			if (sibling.rbRed) {
				sibling.rbRed = false;
				parent.rbRed = true;
				this.rbRotateLeft(parent);
				sibling = parent.rbRight;
			}
			if ((sibling.rbLeft && sibling.rbLeft.rbRed) || (sibling.rbRight && sibling.rbRight.rbRed)) {
				if (!sibling.rbRight || !sibling.rbRight.rbRed) {
					sibling.rbLeft.rbRed = false;
					sibling.rbRed = true;
					this.rbRotateRight(sibling);
					sibling = parent.rbRight;
				}
				sibling.rbRed = parent.rbRed;
				parent.rbRed = sibling.rbRight.rbRed = false;
				this.rbRotateLeft(parent);
				node = this.root;
				break;
			}
		}
		else {
			sibling = parent.rbLeft;
			if (sibling.rbRed) {
				sibling.rbRed = false;
				parent.rbRed = true;
				this.rbRotateRight(parent);
				sibling = parent.rbLeft;
			}
			if ((sibling.rbLeft && sibling.rbLeft.rbRed) || (sibling.rbRight && sibling.rbRight.rbRed)) {
				if (!sibling.rbLeft || !sibling.rbLeft.rbRed) {
					sibling.rbRight.rbRed = false;
					sibling.rbRed = true;
					this.rbRotateLeft(sibling);
					sibling = parent.rbLeft;
				}
				sibling.rbRed = parent.rbRed;
				parent.rbRed = sibling.rbLeft.rbRed = false;
				this.rbRotateRight(parent);
				node = this.root;
				break;
			}
		}
		sibling.rbRed = true;
		node = parent;
		parent = parent.rbParent;
	} while (!node.rbRed);
	if (node) { node.rbRed = false; }
};

Voronoi.prototype.RBTree.prototype.rbRotateLeft = function (node) {
	var p = node,
		q = node.rbRight, // can't be null
		parent = p.rbParent;
	if (parent) {
		if (parent.rbLeft === p) {
			parent.rbLeft = q;
		}
		else {
			parent.rbRight = q;
		}
	}
	else {
		this.root = q;
	}
	q.rbParent = parent;
	p.rbParent = q;
	p.rbRight = q.rbLeft;
	if (p.rbRight) {
		p.rbRight.rbParent = p;
	}
	q.rbLeft = p;
};

Voronoi.prototype.RBTree.prototype.rbRotateRight = function (node) {
	var p = node,
		q = node.rbLeft, // can't be null
		parent = p.rbParent;
	if (parent) {
		if (parent.rbLeft === p) {
			parent.rbLeft = q;
		}
		else {
			parent.rbRight = q;
		}
	}
	else {
		this.root = q;
	}
	q.rbParent = parent;
	p.rbParent = q;
	p.rbLeft = q.rbRight;
	if (p.rbLeft) {
		p.rbLeft.rbParent = p;
	}
	q.rbRight = p;
};

Voronoi.prototype.RBTree.prototype.getFirst = function (node) {
	while (node.rbLeft) {
		node = node.rbLeft;
	}
	return node;
};

Voronoi.prototype.RBTree.prototype.getLast = function (node) {
	while (node.rbRight) {
		node = node.rbRight;
	}
	return node;
};

// ---------------------------------------------------------------------------
// Cell methods

Voronoi.prototype.Cell = function (site) {
	this.site = site;
	this.halfedges = [];
};

Voronoi.prototype.Cell.prototype.prepare = function () {
	var halfedges = this.halfedges,
		iHalfedge = halfedges.length,
		edge;
	// get rid of unused halfedges
	// rhill 2011-05-27: Keep it simple, no point here in trying
	// to be fancy: dangling edges are a typically a minority.
	while (iHalfedge--) {
		edge = halfedges[iHalfedge].edge;
		if (!edge.vb || !edge.va) {
			halfedges.splice(iHalfedge, 1);
		}
	}
	// rhill 2011-05-26: I tried to use a binary search at insertion
	// time to keep the array sorted on-the-fly (in Cell.addHalfedge()).
	// There was no real benefits in doing so, performance on
	// Firefox 3.6 was improved marginally, while performance on
	// Opera 11 was penalized marginally.
	halfedges.sort(function (a, b) { return b.angle - a.angle; });
	return halfedges.length;
};

// ---------------------------------------------------------------------------
// Edge methods
//

Voronoi.prototype.Vertex = function (x, y) {
	this.x = x;
	this.y = y;
};

Voronoi.prototype.Edge = function (lSite, rSite) {
	this.lSite = lSite;
	this.rSite = rSite;
	this.va = this.vb = null;
};

Voronoi.prototype.Halfedge = function (edge, lSite, rSite) {
	this.site = lSite;
	this.edge = edge;
	// 'angle' is a value to be used for properly sorting the
	// halfsegments counterclockwise. By convention, we will
	// use the angle of the line defined by the 'site to the left'
	// to the 'site to the right'.
	// However, border edges have no 'site to the right': thus we
	// use the angle of line perpendicular to the halfsegment (the
	// edge should have both end points defined in such case.)
	if (rSite) {
		this.angle = Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x);
	}
	else {
		var va = edge.va,
			vb = edge.vb;
		// rhill 2011-05-31: used to call getStartpoint()/getEndpoint(),
		// but for performance purpose, these are expanded in place here.
		this.angle = edge.lSite === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y)
			: Math.atan2(va.x - vb.x, vb.y - va.y);
	}
};

Voronoi.prototype.Halfedge.prototype.getStartpoint = function () {
	return this.edge.lSite === this.site ? this.edge.va : this.edge.vb;
};

Voronoi.prototype.Halfedge.prototype.getEndpoint = function () {
	return this.edge.lSite === this.site ? this.edge.vb : this.edge.va;
};

// this create and add an edge to internal collection, and also create
// two halfedges which are added to each site's counterclockwise array
// of halfedges.
Voronoi.prototype.createEdge = function (lSite, rSite, va, vb) {
	var edge = new this.Edge(lSite, rSite);
	this.edges.push(edge);
	if (va) {
		this.setEdgeStartpoint(edge, lSite, rSite, va);
	}
	if (vb) {
		this.setEdgeEndpoint(edge, lSite, rSite, vb);
	}
	this.cells[lSite.voronoiId].halfedges.push(new this.Halfedge(edge, lSite, rSite));
	this.cells[rSite.voronoiId].halfedges.push(new this.Halfedge(edge, rSite, lSite));
	return edge;
};

Voronoi.prototype.createBorderEdge = function (lSite, va, vb) {
	var edge = new this.Edge(lSite, null);
	edge.va = va;
	edge.vb = vb;
	this.edges.push(edge);
	return edge;
};

Voronoi.prototype.setEdgeStartpoint = function (edge, lSite, rSite, vertex) {
	if (!edge.va && !edge.vb) {
		edge.va = vertex;
		edge.lSite = lSite;
		edge.rSite = rSite;
	}
	else if (edge.lSite === rSite) {
		edge.vb = vertex;
	}
	else {
		edge.va = vertex;
	}
};

Voronoi.prototype.setEdgeEndpoint = function (edge, lSite, rSite, vertex) {
	this.setEdgeStartpoint(edge, rSite, lSite, vertex);
};

// ---------------------------------------------------------------------------
// Beachline methods

// rhill 2011-06-07: For some reasons, performance suffers significantly
// when instanciating a literal object instead of an empty ctor
Voronoi.prototype.Beachsection = function () {
};

// rhill 2011-06-02: A lot of Beachsection instanciations
// occur during the computation of the Voronoi diagram,
// somewhere between the number of sites and twice the
// number of sites, while the number of Beachsections on the
// beachline at any given time is comparatively low. For this
// reason, we reuse already created Beachsections, in order
// to avoid new memory allocation. This resulted in a measurable
// performance gain.
Voronoi.prototype.createBeachsection = function (site) {
	var beachsection = this.beachsectionJunkyard.pop();
	if (!beachsection) {
		beachsection = new this.Beachsection();
	}
	beachsection.site = site;
	return beachsection;
};

// calculate the left break point of a particular beach section,
// given a particular sweep line
Voronoi.prototype.leftBreakPoint = function (arc, directrix) {
	// http://en.wikipedia.org/wiki/Parabola
	// http://en.wikipedia.org/wiki/Quadratic_equation
	// h1 = x1,
	// k1 = (y1+directrix)/2,
	// h2 = x2,
	// k2 = (y2+directrix)/2,
	// p1 = k1-directrix,
	// a1 = 1/(4*p1),
	// b1 = -h1/(2*p1),
	// c1 = h1*h1/(4*p1)+k1,
	// p2 = k2-directrix,
	// a2 = 1/(4*p2),
	// b2 = -h2/(2*p2),
	// c2 = h2*h2/(4*p2)+k2,
	// x = (-(b2-b1) + Math.sqrt((b2-b1)*(b2-b1) - 4*(a2-a1)*(c2-c1))) / (2*(a2-a1))
	// When x1 become the x-origin:
	// h1 = 0,
	// k1 = (y1+directrix)/2,
	// h2 = x2-x1,
	// k2 = (y2+directrix)/2,
	// p1 = k1-directrix,
	// a1 = 1/(4*p1),
	// b1 = 0,
	// c1 = k1,
	// p2 = k2-directrix,
	// a2 = 1/(4*p2),
	// b2 = -h2/(2*p2),
	// c2 = h2*h2/(4*p2)+k2,
	// x = (-b2 + Math.sqrt(b2*b2 - 4*(a2-a1)*(c2-k1))) / (2*(a2-a1)) + x1

	// change code below at your own risk: care has been taken to
	// reduce errors due to computers' finite arithmetic precision.
	// Maybe can still be improved, will see if any more of this
	// kind of errors pop up again.
	var site = arc.site,
		rfocx = site.x,
		rfocy = site.y,
		pby2 = rfocy - directrix;
	// parabola in degenerate case where focus is on directrix
	if (!pby2) {
		return rfocx;
	}
	var lArc = arc.rbPrevious;
	if (!lArc) {
		return -Infinity;
	}
	site = lArc.site;
	var lfocx = site.x,
		lfocy = site.y,
		plby2 = lfocy - directrix;
	// parabola in degenerate case where focus is on directrix
	if (!plby2) {
		return lfocx;
	}
	var hl = lfocx - rfocx,
		aby2 = 1 / pby2 - 1 / plby2,
		b = hl / plby2;
	if (aby2) {
		return (-b + this.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
	}
	// both parabolas have same distance to directrix, thus break point is midway
	return (rfocx + lfocx) / 2;
};

// calculate the right break point of a particular beach section,
// given a particular directrix
Voronoi.prototype.rightBreakPoint = function (arc, directrix) {
	var rArc = arc.rbNext;
	if (rArc) {
		return this.leftBreakPoint(rArc, directrix);
	}
	var site = arc.site;
	return site.y === directrix ? site.x : Infinity;
};

Voronoi.prototype.detachBeachsection = function (beachsection) {
	this.detachCircleEvent(beachsection); // detach potentially attached circle event
	this.beachline.rbRemoveNode(beachsection); // remove from RB-tree
	this.beachsectionJunkyard.push(beachsection); // mark for reuse
};

Voronoi.prototype.removeBeachsection = function (beachsection) {
	var circle = beachsection.circleEvent,
		x = circle.x,
		y = circle.ycenter,
		vertex = new this.Vertex(x, y),
		previous = beachsection.rbPrevious,
		next = beachsection.rbNext,
		disappearingTransitions = [beachsection],
		abs_fn = Math.abs;

	// remove collapsed beachsection from beachline
	this.detachBeachsection(beachsection);

	// there could be more than one empty arc at the deletion point, this
	// happens when more than two edges are linked by the same vertex,
	// so we will collect all those edges by looking up both sides of
	// the deletion point.
	// by the way, there is *always* a predecessor/successor to any collapsed
	// beach section, it's just impossible to have a collapsing first/last
	// beach sections on the beachline, since they obviously are unconstrained
	// on their left/right side.

	// look left
	var lArc = previous;
	while (lArc.circleEvent && abs_fn(x - lArc.circleEvent.x) < 1e-9 && abs_fn(y - lArc.circleEvent.ycenter) < 1e-9) {
		previous = lArc.rbPrevious;
		disappearingTransitions.unshift(lArc);
		this.detachBeachsection(lArc); // mark for reuse
		lArc = previous;
	}
	// even though it is not disappearing, I will also add the beach section
	// immediately to the left of the left-most collapsed beach section, for
	// convenience, since we need to refer to it later as this beach section
	// is the 'left' site of an edge for which a start point is set.
	disappearingTransitions.unshift(lArc);
	this.detachCircleEvent(lArc);

	// look right
	var rArc = next;
	while (rArc.circleEvent && abs_fn(x - rArc.circleEvent.x) < 1e-9 && abs_fn(y - rArc.circleEvent.ycenter) < 1e-9) {
		next = rArc.rbNext;
		disappearingTransitions.push(rArc);
		this.detachBeachsection(rArc); // mark for reuse
		rArc = next;
	}
	// we also have to add the beach section immediately to the right of the
	// right-most collapsed beach section, since there is also a disappearing
	// transition representing an edge's start point on its left.
	disappearingTransitions.push(rArc);
	this.detachCircleEvent(rArc);

	// walk through all the disappearing transitions between beach sections and
	// set the start point of their (implied) edge.
	var nArcs = disappearingTransitions.length,
		iArc;
	for (iArc = 1; iArc < nArcs; iArc++) {
		rArc = disappearingTransitions[iArc];
		lArc = disappearingTransitions[iArc - 1];
		this.setEdgeStartpoint(rArc.edge, lArc.site, rArc.site, vertex);
	}

	// create a new edge as we have now a new transition between
	// two beach sections which were previously not adjacent.
	// since this edge appears as a new vertex is defined, the vertex
	// actually define an end point of the edge (relative to the site
	// on the left)
	lArc = disappearingTransitions[0];
	rArc = disappearingTransitions[nArcs - 1];
	rArc.edge = this.createEdge(lArc.site, rArc.site, undefined, vertex);

	// create circle events if any for beach sections left in the beachline
	// adjacent to collapsed sections
	this.attachCircleEvent(lArc);
	this.attachCircleEvent(rArc);
};

Voronoi.prototype.addBeachsection = function (site) {
	var x = site.x,
		directrix = site.y;

	// find the left and right beach sections which will surround the newly
	// created beach section.
	// rhill 2011-06-01: This loop is one of the most often executed,
	// hence we expand in-place the comparison-against-epsilon calls.
	var lArc, rArc,
		dxl, dxr,
		node = this.beachline.root;

	while (node) {
		dxl = this.leftBreakPoint(node, directrix) - x;
		// x lessThanWithEpsilon xl => falls somewhere before the left edge of the beachsection
		if (dxl > 1e-9) {
			// this case should never happen
			// if (!node.rbLeft) {
			//	rArc = node.rbLeft;
			//	break;
			//	}
			node = node.rbLeft;
		}
		else {
			dxr = x - this.rightBreakPoint(node, directrix);
			// x greaterThanWithEpsilon xr => falls somewhere after the right edge of the beachsection
			if (dxr > 1e-9) {
				if (!node.rbRight) {
					lArc = node;
					break;
				}
				node = node.rbRight;
			}
			else {
				// x equalWithEpsilon xl => falls exactly on the left edge of the beachsection
				if (dxl > -1e-9) {
					lArc = node.rbPrevious;
					rArc = node;
				}
				// x equalWithEpsilon xr => falls exactly on the right edge of the beachsection
				else if (dxr > -1e-9) {
					lArc = node;
					rArc = node.rbNext;
				}
				// falls exactly somewhere in the middle of the beachsection
				else {
					lArc = rArc = node;
				}
				break;
			}
		}
	}
	// at this point, keep in mind that lArc and/or rArc could be
	// undefined or null.

	// create a new beach section object for the site and add it to RB-tree
	var newArc = this.createBeachsection(site);
	this.beachline.rbInsertSuccessor(lArc, newArc);

	// cases:
	//

	// [null,null]
	// least likely case: new beach section is the first beach section on the
	// beachline.
	// This case means:
	//   no new transition appears
	//   no collapsing beach section
	//   new beachsection become root of the RB-tree
	if (!lArc && !rArc) {
		return;
	}

	// [lArc,rArc] where lArc == rArc
	// most likely case: new beach section split an existing beach
	// section.
	// This case means:
	//   one new transition appears
	//   the left and right beach section might be collapsing as a result
	//   two new nodes added to the RB-tree
	if (lArc === rArc) {
		// invalidate circle event of split beach section
		this.detachCircleEvent(lArc);

		// split the beach section into two separate beach sections
		rArc = this.createBeachsection(lArc.site);
		this.beachline.rbInsertSuccessor(newArc, rArc);

		// since we have a new transition between two beach sections,
		// a new edge is born
		newArc.edge = rArc.edge = this.createEdge(lArc.site, newArc.site);

		// check whether the left and right beach sections are collapsing
		// and if so create circle events, to be notified when the point of
		// collapse is reached.
		this.attachCircleEvent(lArc);
		this.attachCircleEvent(rArc);
		return;
	}

	// [lArc,null]
	// even less likely case: new beach section is the *last* beach section
	// on the beachline -- this can happen *only* if *all* the previous beach
	// sections currently on the beachline share the same y value as
	// the new beach section.
	// This case means:
	//   one new transition appears
	//   no collapsing beach section as a result
	//   new beach section become right-most node of the RB-tree
	if (lArc && !rArc) {
		newArc.edge = this.createEdge(lArc.site, newArc.site);
		return;
	}

	// [null,rArc]
	// impossible case: because sites are strictly processed from top to bottom,
	// and left to right, which guarantees that there will always be a beach section
	// on the left -- except of course when there are no beach section at all on
	// the beach line, which case was handled above.
	// rhill 2011-06-02: No point testing in non-debug version
	//if (!lArc && rArc) {
	//	throw "Voronoi.addBeachsection(): What is this I don't even";
	//	}

	// [lArc,rArc] where lArc != rArc
	// somewhat less likely case: new beach section falls *exactly* in between two
	// existing beach sections
	// This case means:
	//   one transition disappears
	//   two new transitions appear
	//   the left and right beach section might be collapsing as a result
	//   only one new node added to the RB-tree
	if (lArc !== rArc) {
		// invalidate circle events of left and right sites
		this.detachCircleEvent(lArc);
		this.detachCircleEvent(rArc);

		// an existing transition disappears, meaning a vertex is defined at
		// the disappearance point.
		// since the disappearance is caused by the new beachsection, the
		// vertex is at the center of the circumscribed circle of the left,
		// new and right beachsections.
		// http://mathforum.org/library/drmath/view/55002.html
		// Except that I bring the origin at A to simplify
		// calculation
		var lSite = lArc.site,
			ax = lSite.x,
			ay = lSite.y,
			bx = site.x - ax,
			by = site.y - ay,
			rSite = rArc.site,
			cx = rSite.x - ax,
			cy = rSite.y - ay,
			d = 2 * (bx * cy - by * cx),
			hb = bx * bx + by * by,
			hc = cx * cx + cy * cy,
			vertex = new this.Vertex((cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay);

		// one transition disappear
		this.setEdgeStartpoint(rArc.edge, lSite, rSite, vertex);

		// two new transitions appear at the new vertex location
		newArc.edge = this.createEdge(lSite, site, undefined, vertex);
		rArc.edge = this.createEdge(site, rSite, undefined, vertex);

		// check whether the left and right beach sections are collapsing
		// and if so create circle events, to handle the point of collapse.
		this.attachCircleEvent(lArc);
		this.attachCircleEvent(rArc);
		return;
	}
};

// ---------------------------------------------------------------------------
// Circle event methods

// rhill 2011-06-07: For some reasons, performance suffers significantly
// when instanciating a literal object instead of an empty ctor
Voronoi.prototype.CircleEvent = function () {
};

Voronoi.prototype.attachCircleEvent = function (arc) {
	var lArc = arc.rbPrevious,
		rArc = arc.rbNext;
	if (!lArc || !rArc) { return; } // does that ever happen?
	var lSite = lArc.site,
		cSite = arc.site,
		rSite = rArc.site;

	// If site of left beachsection is same as site of
	// right beachsection, there can't be convergence
	if (lSite === rSite) { return; }

	// Find the circumscribed circle for the three sites associated
	// with the beachsection triplet.
	// rhill 2011-05-26: It is more efficient to calculate in-place
	// rather than getting the resulting circumscribed circle from an
	// object returned by calling Voronoi.circumcircle()
	// http://mathforum.org/library/drmath/view/55002.html
	// Except that I bring the origin at cSite to simplify calculations.
	// The bottom-most part of the circumcircle is our Fortune 'circle
	// event', and its center is a vertex potentially part of the final
	// Voronoi diagram.
	var bx = cSite.x,
		by = cSite.y,
		ax = lSite.x - bx,
		ay = lSite.y - by,
		cx = rSite.x - bx,
		cy = rSite.y - by;

	// If points l->c->r are clockwise, then center beach section does not
	// collapse, hence it can't end up as a vertex (we reuse 'd' here, which
	// sign is reverse of the orientation, hence we reverse the test.
	// http://en.wikipedia.org/wiki/Curve_orientation#Orientation_of_a_simple_polygon
	// rhill 2011-05-21: Nasty finite precision error which caused circumcircle() to
	// return infinites: 1e-12 seems to fix the problem.
	var d = 2 * (ax * cy - ay * cx);
	if (d >= -2e-12) { return; }

	var ha = ax * ax + ay * ay,
		hc = cx * cx + cy * cy,
		x = (cy * ha - ay * hc) / d,
		y = (ax * hc - cx * ha) / d,
		ycenter = y + by;

	// Important: ybottom should always be under or at sweep, so no need
	// to waste CPU cycles by checking

	// recycle circle event object if possible
	var circleEvent = this.circleEventJunkyard.pop();
	if (!circleEvent) {
		circleEvent = new this.CircleEvent();
	}
	circleEvent.arc = arc;
	circleEvent.site = cSite;
	circleEvent.x = x + bx;
	circleEvent.y = ycenter + this.sqrt(x * x + y * y); // y bottom
	circleEvent.ycenter = ycenter;
	arc.circleEvent = circleEvent;

	// find insertion point in RB-tree: circle events are ordered from
	// smallest to largest
	var predecessor = null,
		node = this.circleEvents.root;
	while (node) {
		if (circleEvent.y < node.y || (circleEvent.y === node.y && circleEvent.x <= node.x)) {
			if (node.rbLeft) {
				node = node.rbLeft;
			}
			else {
				predecessor = node.rbPrevious;
				break;
			}
		}
		else {
			if (node.rbRight) {
				node = node.rbRight;
			}
			else {
				predecessor = node;
				break;
			}
		}
	}
	this.circleEvents.rbInsertSuccessor(predecessor, circleEvent);
	if (!predecessor) {
		this.firstCircleEvent = circleEvent;
	}
};

Voronoi.prototype.detachCircleEvent = function (arc) {
	var circle = arc.circleEvent;
	if (circle) {
		if (!circle.rbPrevious) {
			this.firstCircleEvent = circle.rbNext;
		}
		this.circleEvents.rbRemoveNode(circle); // remove from RB-tree
		this.circleEventJunkyard.push(circle);
		arc.circleEvent = null;
	}
};

// ---------------------------------------------------------------------------
// Diagram completion methods

// connect dangling edges (not if a cursory test tells us
// it is not going to be visible.
// return value:
//   false: the dangling endpoint couldn't be connected
//   true: the dangling endpoint could be connected
Voronoi.prototype.connectEdge = function (edge, bbox) {
	// skip if end point already connected
	var vb = edge.vb;
	if (!!vb) { return true; }

	// make local copy for performance purpose
	var va = edge.va,
		xl = bbox.xl,
		xr = bbox.xr,
		yt = bbox.yt,
		yb = bbox.yb,
		lSite = edge.lSite,
		rSite = edge.rSite,
		lx = lSite.x,
		ly = lSite.y,
		rx = rSite.x,
		ry = rSite.y,
		fx = (lx + rx) / 2,
		fy = (ly + ry) / 2,
		fm, fb;

	// get the line equation of the bisector if line is not vertical
	if (ry !== ly) {
		fm = (lx - rx) / (ry - ly);
		fb = fy - fm * fx;
	}

	// remember, direction of line (relative to left site):
	// upward: left.x < right.x
	// downward: left.x > right.x
	// horizontal: left.x == right.x
	// upward: left.x < right.x
	// rightward: left.y < right.y
	// leftward: left.y > right.y
	// vertical: left.y == right.y

	// depending on the direction, find the best side of the
	// bounding box to use to determine a reasonable start point

	// special case: vertical line
	if (fm === undefined) {
		// doesn't intersect with viewport
		if (fx < xl || fx >= xr) { return false; }
		// downward
		if (lx > rx) {
			if (!va) {
				va = new this.Vertex(fx, yt);
			}
			else if (va.y >= yb) {
				return false;
			}
			vb = new this.Vertex(fx, yb);
		}
		// upward
		else {
			if (!va) {
				va = new this.Vertex(fx, yb);
			}
			else if (va.y < yt) {
				return false;
			}
			vb = new this.Vertex(fx, yt);
		}
	}
	// closer to vertical than horizontal, connect start point to the
	// top or bottom side of the bounding box
	else if (fm < -1 || fm > 1) {
		// downward
		if (lx > rx) {
			if (!va) {
				va = new this.Vertex((yt - fb) / fm, yt);
			}
			else if (va.y >= yb) {
				return false;
			}
			vb = new this.Vertex((yb - fb) / fm, yb);
		}
		// upward
		else {
			if (!va) {
				va = new this.Vertex((yb - fb) / fm, yb);
			}
			else if (va.y < yt) {
				return false;
			}
			vb = new this.Vertex((yt - fb) / fm, yt);
		}
	}
	// closer to horizontal than vertical, connect start point to the
	// left or right side of the bounding box
	else {
		// rightward
		if (ly < ry) {
			if (!va) {
				va = new this.Vertex(xl, fm * xl + fb);
			}
			else if (va.x >= xr) {
				return false;
			}
			vb = new this.Vertex(xr, fm * xr + fb);
		}
		// leftward
		else {
			if (!va) {
				va = new this.Vertex(xr, fm * xr + fb);
			}
			else if (va.x < xl) {
				return false;
			}
			vb = new this.Vertex(xl, fm * xl + fb);
		}
	}
	edge.va = va;
	edge.vb = vb;
	return true;
};

// line-clipping code taken from:
//   Liang-Barsky function by Daniel White
//   http://www.skytopia.com/project/articles/compsci/clipping.html
// Thanks!
// A bit modified to minimize code paths
Voronoi.prototype.clipEdge = function (edge, bbox) {
	var ax = edge.va.x,
		ay = edge.va.y,
		bx = edge.vb.x,
		by = edge.vb.y,
		t0 = 0,
		t1 = 1,
		dx = bx - ax,
		dy = by - ay;
	// left
	var q = ax - bbox.xl;
	if (dx === 0 && q < 0) { return false; }
	var r = -q / dx;
	if (dx < 0) {
		if (r < t0) { return false; }
		else if (r < t1) { t1 = r; }
	}
	else if (dx > 0) {
		if (r > t1) { return false; }
		else if (r > t0) { t0 = r; }
	}
	// right
	q = bbox.xr - ax;
	if (dx === 0 && q < 0) { return false; }
	r = q / dx;
	if (dx < 0) {
		if (r > t1) { return false; }
		else if (r > t0) { t0 = r; }
	}
	else if (dx > 0) {
		if (r < t0) { return false; }
		else if (r < t1) { t1 = r; }
	}
	// top
	q = ay - bbox.yt;
	if (dy === 0 && q < 0) { return false; }
	r = -q / dy;
	if (dy < 0) {
		if (r < t0) { return false; }
		else if (r < t1) { t1 = r; }
	}
	else if (dy > 0) {
		if (r > t1) { return false; }
		else if (r > t0) { t0 = r; }
	}
	// bottom		
	q = bbox.yb - ay;
	if (dy === 0 && q < 0) { return false; }
	r = q / dy;
	if (dy < 0) {
		if (r > t1) { return false; }
		else if (r > t0) { t0 = r; }
	}
	else if (dy > 0) {
		if (r < t0) { return false; }
		else if (r < t1) { t1 = r; }
	}

	// if we reach this point, Voronoi edge is within bbox

	// if t0 > 0, va needs to change
	// rhill 2011-06-03: we need to create a new vertex rather
	// than modifying the existing one, since the existing
	// one is likely shared with at least another edge
	if (t0 > 0) {
		edge.va = new this.Vertex(ax + t0 * dx, ay + t0 * dy);
	}

	// if t1 < 1, vb needs to change
	// rhill 2011-06-03: we need to create a new vertex rather
	// than modifying the existing one, since the existing
	// one is likely shared with at least another edge
	if (t1 < 1) {
		edge.vb = new this.Vertex(ax + t1 * dx, ay + t1 * dy);
	}

	return true;
};

// Connect/cut edges at bounding box
Voronoi.prototype.clipEdges = function (bbox) {
	// connect all dangling edges to bounding box
	// or get rid of them if it can't be done
	var edges = this.edges,
		iEdge = edges.length,
		edge,
		abs_fn = Math.abs;

	// iterate backward so we can splice safely
	while (iEdge--) {
		edge = edges[iEdge];
		// edge is removed if:
		//   it is wholly outside the bounding box
		//   it is actually a point rather than a line
		if (!this.connectEdge(edge, bbox) || !this.clipEdge(edge, bbox) || (abs_fn(edge.va.x - edge.vb.x) < 1e-9 && abs_fn(edge.va.y - edge.vb.y) < 1e-9)) {
			edge.va = edge.vb = null;
			edges.splice(iEdge, 1);
		}
	}
};

// Close the cells.
// The cells are bound by the supplied bounding box.
// Each cell refers to its associated site, and a list
// of halfedges ordered counterclockwise.
Voronoi.prototype.closeCells = function (bbox) {
	// prune, order halfedges, then add missing ones
	// required to close cells
	var xl = bbox.xl,
		xr = bbox.xr,
		yt = bbox.yt,
		yb = bbox.yb,
		cells = this.cells,
		iCell = cells.length,
		cell,
		iLeft, iRight,
		halfedges, nHalfedges,
		edge,
		startpoint, endpoint,
		va, vb,
		abs_fn = Math.abs;

	while (iCell--) {
		cell = cells[iCell];
		// trim non fully-defined halfedges and sort them counterclockwise
		if (!cell.prepare()) {
			continue;
		}
		// close open cells
		// step 1: find first 'unclosed' point, if any.
		// an 'unclosed' point will be the end point of a halfedge which
		// does not match the start point of the following halfedge
		halfedges = cell.halfedges;
		nHalfedges = halfedges.length;
		// special case: only one site, in which case, the viewport is the cell
		// ...
		// all other cases
		iLeft = 0;
		while (iLeft < nHalfedges) {
			iRight = (iLeft + 1) % nHalfedges;
			endpoint = halfedges[iLeft].getEndpoint();
			startpoint = halfedges[iRight].getStartpoint();
			// if end point is not equal to start point, we need to add the missing
			// halfedge(s) to close the cell
			if (abs_fn(endpoint.x - startpoint.x) >= 1e-9 || abs_fn(endpoint.y - startpoint.y) >= 1e-9) {
				// if we reach this point, cell needs to be closed by walking
				// counterclockwise along the bounding box until it connects
				// to next halfedge in the list
				va = endpoint;
				// walk downward along left side
				if (this.equalWithEpsilon(endpoint.x, xl) && this.lessThanWithEpsilon(endpoint.y, yb)) {
					vb = new this.Vertex(xl, this.equalWithEpsilon(startpoint.x, xl) ? startpoint.y : yb);
				}
				// walk rightward along bottom side
				else if (this.equalWithEpsilon(endpoint.y, yb) && this.lessThanWithEpsilon(endpoint.x, xr)) {
					vb = new this.Vertex(this.equalWithEpsilon(startpoint.y, yb) ? startpoint.x : xr, yb);
				}
				// walk upward along right side
				else if (this.equalWithEpsilon(endpoint.x, xr) && this.greaterThanWithEpsilon(endpoint.y, yt)) {
					vb = new this.Vertex(xr, this.equalWithEpsilon(startpoint.x, xr) ? startpoint.y : yt);
				}
				// walk leftward along top side
				else if (this.equalWithEpsilon(endpoint.y, yt) && this.greaterThanWithEpsilon(endpoint.x, xl)) {
					vb = new this.Vertex(this.equalWithEpsilon(startpoint.y, yt) ? startpoint.x : xl, yt);
				}
				edge = this.createBorderEdge(cell.site, va, vb);
				halfedges.splice(iLeft + 1, 0, new this.Halfedge(edge, cell.site, null));
				nHalfedges = halfedges.length;
			}
			iLeft++;
		}
	}
};

// ---------------------------------------------------------------------------
// Top-level Fortune loop

// rhill 2011-05-19:
//   Voronoi sites are kept client-side now, to allow
//   user to freely modify content. At compute time,
//   *references* to sites are copied locally.
Voronoi.prototype.compute = function (sites, bbox) {
	// to measure execution time
	var startTime = new Date();

	// init internal state
	this.reset();

	// Initialize site event queue
	var siteEvents = sites.slice(0);
	siteEvents.sort(function (a, b) {
		var r = b.y - a.y;
		if (r) { return r; }
		return b.x - a.x;
	});

	// process queue
	var site = siteEvents.pop(),
		siteid = 0,
		xsitex = Number.MIN_VALUE, // to avoid duplicate sites
		xsitey = Number.MIN_VALUE,
		cells = this.cells,
		circle;

	// main loop
	for (; ;) {
		// we need to figure whether we handle a site or circle event
		// for this we find out if there is a site event and it is
		// 'earlier' than the circle event
		circle = this.firstCircleEvent;

		// add beach section
		if (site && (!circle || site.y < circle.y || (site.y === circle.y && site.x < circle.x))) {
			// only if site is not a duplicate
			if (site.x !== xsitex || site.y !== xsitey) {
				// first create cell for new site
				cells[siteid] = new this.Cell(site);
				site.voronoiId = siteid++;
				// then create a beachsection for that site
				this.addBeachsection(site);
				// remember last site coords to detect duplicate
				xsitey = site.y;
				xsitex = site.x;
			}
			site = siteEvents.pop();
		}

		// remove beach section
		else if (circle) {
			this.removeBeachsection(circle.arc);
		}

		// all done, quit
		else {
			break;
		}
	}

	// wrapping-up:
	//   connect dangling edges to bounding box
	//   cut edges as per bounding box
	//   discard edges completely outside bounding box
	//   discard edges which are point-like
	this.clipEdges(bbox);

	//   add missing edges in order to close opened cells
	this.closeCells(bbox);

	// to measure execution time
	var stopTime = new Date();

	// prepare return values
	var result = {
		cells: this.cells,
		edges: this.edges,
		execTime: stopTime.getTime() - startTime.getTime()
	};

	// clean up
	this.reset();

	return result;
};



var ACCURACY = 1;
var coloredCells = true;
var hsbColoredCells = true;
var strokedCells = false;
var drawCells = true;
var drawEdges = true;
var angleOffset = 30;
var angle = 60;
var saturation = 45;
var lightness = 70;
var doc

///processes all layer

var progressBigTotal
var progressBigC
function voronoi(helperLay, extraPoints, topPath) {

	progressBigTotal = + !!extraPoints + +cutOutside + +removeOutside + 1;
	progressBigC = 0;





	if (helperLay.pathItems.length)
		getBaseColor(helperLay.pathItems[0])

	var doc = activeDocument;
	var sites = getLayerPoints(helperLay);
	// var points = [];

	if (extraPoints) {
		addExtraPoints(helperLay, extraPoints, sites);
		showProgress(++progressBigC, progressBigTotal)
	}
	if (topPath) {
		getPointsOfPathXY(topPath, sites);
	}

	var bbox = { xl: 0, xr: doc.width, yt: -doc.height, yb: 0 };
	log("compute");

	var result = new Voronoi().compute(sites, bbox);
	log("compute done");


	var voronoiLay = drawVoronoiCells(doc, result);
	progressBigC++
	helperLay.move(voronoiLay, ElementPlacement.PLACEBEFORE);
	redraw();
	if (cutOutside) {
		showMessage("Cutting outside paths");
		var vis = rememberVis(doc);
		hideAllBut([helperLay, voronoiLay]);
		cutIt(helperLay);
		progressBigC++
		restoreVis(vis);
		log("cut outsidee done");
	} if (removeOutside) {
		showMessage("Removing outside paths");

		addPoints(helperLay, ACCURACY);
		remOutside(voronoiLay, helperLay);
		log("rem outsidee done");

		progressBigC++;
	}
	helperLay.remove();



	//removeClosePoints(voronoiLay.pathItems, 10);
	// selectPaths(voronoiLay.pathItems);
	//app.executeMenuCommand("Live Adobe Round Corners")


}
if (!Array.prototype.indexOf) Array.prototype.indexOf = (function (Object, max, min) {
	"use strict";
	return function indexOf(member, fromIndex) {
		if (this === null || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined");

		var that = Object(this),
			Len = that.length >>> 0,
			i = min(fromIndex | 0, Len);
		if (i < 0) i = max(0, Len + i);
		else if (i >= Len) return -1;

		if (member === void 0) {
			for (; i !== Len; ++i)
				if (that[i] === void 0 && i in that) return i; // undefined
		} else if (member !== member) {
			for (; i !== Len; ++i)
				if (that[i] !== that[i]) return i; // NaN
		} else
			for (; i !== Len; ++i)
				if (that[i] === member) return i; // all else

		return -1; // if the value was not found, then return -1
	};
})(Object, Math.max, Math.min);

function rememberVis(doc_) {
	var locks = [];
	doc_ = doc_ || activeDocument;
	for (var i = 0; i < doc_.layers.length; i++)
		locks[i] = doc_.layers[i].visible;
	return locks;
}
function restoreVis(locks, doc_) {
	doc_ = doc_ || activeDocument;
	for (var i = 0; i < doc_.layers.length; i++)
		doc_.layers[i].visible = locks[i]
}
function hideAllBut(leaveUnlocked, doc_) {
	doc_ = doc_ || activeDocument;
	for (var i = 0; i < doc_.layers.length; i++) {
		var lay = doc_.layers[i];
		lay.visible = leaveUnlocked.indexOf(lay) >= 0;
		//leaveUnlocked!=lay;
	}
}
function addExtraPoints(helperLay, extraPoints, sites) {
	var areas = [];
	var areaSum = 0;
	//  var largestArea = -1000000;
	for (var i = 0; i < helperLay.pathItems.length; i++) {
		var path = helperLay.pathItems[i];
		var n = path.note;
		if (n == "inner") continue;
		var area = helperLay.pathItems[i].area;
		area = Math.abs(area);
		//  if (area > largestArea) largestArea = area;
		areas[i] = area;
		areaSum += area;
	}
	for (var i = 0; i < helperLay.pathItems.length; i++) {
		var path = helperLay.pathItems[i]
		var n = path.note;
		if (n == "inner") continue;
		var pathA = getPointsOfPath(path);
		var numPoints = Math.round(areas[i] / areaSum * extraPoints);
		addPointsToPolyXY(numPoints, pathA, path.geometricBounds, sites);
	}
}
function selectPaths(paths) {
	app.activeDocument.selection = null;
	var len = paths.length;
	for (var i = 0; i < len; i++) paths[i].selected = true;
}
function removeClosePoints(items, N) {
	var plen = items.length;
	for (var i = 0; i < plen; i++) {
		var pts = items[i].pathPoints;
		var toRem = [];
		var len = pts.length;
		var NN = N * N;

		for (var j = 0; j < len; j++) {
			var a = pts[j].anchor;
			var b = pts[(j - 1 + len) % len].anchor;
			var dx = a[0] - b[0], dy = a[1] - b[1];
			if ((dx * dx + dy * dy) < NN) toRem.push(pts[j]);
		}

		var rlen = toRem.length;
		for (var r = 0; r < rlen; r++) toRem[r].remove();
	}
}
function addPoints(l, accuracy) {
	var paths = l.pathItems;
	for (var i = paths.length - 1; i >= 0; i--) {


		paths[i].selected = true;
	}
	for (var i = 0; i < accuracy; i++) {
		app.executeMenuCommand("Add Anchor Points2");
	};
	// log("--------")
	// for (var i = paths.length - 1; i >= 0; i--) {
	//   log(paths[i].pathPoints.length);
	// }
	doc.selection = null

}
function cutIt(layer) {
	var paths = layer.pathItems;
	for (var i = paths.length - 1; i >= 0; i--) {
		paths[i].hidden = true;
	}
	var c = 0;

	for (var i = paths.length - 1; i >= 0; i--) {
		//!
		//if (paths[i].note != "outer") continue;


		showProgress(progressBigC, progressBigTotal, c++, paths.length)

		app.selection = null;
		//var dup = paths[i].duplicate(layer, ElementPlacement.PLACEATBEGINNING);
		//have to redraw. web documents satrt with stroke default outsie whihc breaks
		//divide below.
		dup = replicatePath(paths[i], layer, ElementPlacement.PLACEATBEGINNING);
		dup.hidden = false;
		dup.selected = true;
		//paths[i].visible = true;
		redraw();
		app.executeMenuCommand("Knife Tool2");
		redraw();
		redraw();

		if (userExit()) break;

	}
	for (var i = paths.length - 1; i >= 0; i--) {
		paths[i].hidden = false;
	}
	app.selection = null;
};
function replicatePath(src, layer, placement) {
	var dst = layer.pathItems.add();
	dst.move(layer, placement);
	dst.closed = src.closed;
	dst.filled = src.filled;
	dst.stroked = src.stroked;
	dst.strokeWidth = src.strokeWidth;
	while (dst.pathPoints.length) dst.pathPoints[0].remove();
	for (var i = 0; i < src.pathPoints.length; i++) {
		var p = src.pathPoints[i];
		var np = dst.pathPoints.add();
		np.anchor = [p.anchor[0], p.anchor[1]];
		np.leftDirection = [p.leftDirection[0], p.leftDirection[1]];
		np.rightDirection = [p.rightDirection[0], p.rightDirection[1]];
		np.pointType = p.pointType;
	}
	return dst;
}
function processItem(item, helper, dontBreakCompound) {
	switch (item.typename) {
		case "TextFrame":
			var dup = item.duplicate(); // preserve original
			var outlinedGroup = dup.createOutline();
			var len = outlinedGroup.pageItems.length;
			for (var i = 0; i < len; i++) {
				processItem(outlinedGroup.pageItems[i], helper, dontBreakCompound);
			}
			outlinedGroup.remove(); // optional
			break;

		case "GroupItem":
			var len = item.pageItems.length;
			for (var i = 0; i < len; i++) {
				processItem(item.pageItems[i], helper, dontBreakCompound);
			}
			break;

		case "CompoundPathItem":

			// compounds like i or j can have no holes, just 2 items. this below deals with it.
			if (analyzeCp(item) == "separate") {
				len = item.pathItems.length;
				for (var i = 0; i < len; i++) {
					item.pathItems[i].duplicate(helper, ElementPlacement.PLACEATEND);
				}
			} else
				//called from triangulator pro, needed for triangulator!!!
				if (dontBreakCompound)
					item.duplicate(helper, ElementPlacement.PLACEATEND);
				else
					releaseCompound(item.duplicate(), helper);
			break;

		case "PathItem":
			item.duplicate(helper, ElementPlacement.PLACEATEND);
			break;
	}
}

// function flattenItem(group, helper) {
//   for (var i = group.pageItems.length - 1; i >= 0; i--) {
//     processItem(group.pageItems[i], helper);
//   }
//   group.remove();
// }

function releaseCompound(cp, helper) {
	var collection = classifyCompoundPath(cp)

	for (var i = cp.pathItems.length - 1; i >= 0; i--) {
		if (collection.outer[0] != i)
			cp.pathItems[i].note = "inner";
		cp.pathItems[i].move(helper, ElementPlacement.PLACEATEND);
	}
	cp.remove();
}

function addPointsToPolyXY(count, pathA, B, points) {
	points = points || [];
	var w = (B[2] - B[0]);
	var h = (B[3] - B[1]);
	var ERR = 10000;
	if (count)
		do {
			var x = B[0] + Math.random() * w;
			var y = B[1] + Math.random() * h;
			if (pointInsidePoly([x, y], pathA)) {
				points.push({ x: x, y: y });
				count--;
			};
			ERR--;
		} while (count && ERR);
	return points
}

function getLayerPoints(layer) {
	var list = [];
	var items = layer.pathItems;
	var itemsLen = items.length;
	for (var j = 0; j < itemsLen; j++) {
		var path = items[j];
		var points = path.pathPoints;
		var pointsLen = points.length;
		for (var i = 0; i < pointsLen; i++) {
			var a = points[i].anchor;
			list.push({ x: a[0], y: a[1] });
		}
	}
	return list;
}

function drawVoronoiCells(doc, result) {
	var layer = doc.layers.add();
	layer.name = "voronoi";

	var black = makeRGB(0, 0, 0);
	var white = makeRGB(255, 255, 255);

	var cells = result.cells;
	var cellsLen = cells.length;
	var step = angle / (cellsLen + 1);

	for (var i = 0; i < cellsLen; i++) {

		showProgress(progressBigC, progressBigTotal, i, cellsLen)

		var cell = cells[i];
		var halfedges = cell.halfedges;
		if (!halfedges || halfedges.length < 3) continue;

		var pts = [];
		var p0 = halfedges[0].getStartpoint();
		pts.push([p0.x, p0.y]);
		var hedgesLen = halfedges.length;
		for (var j = 0; j < hedgesLen; j++) {
			var p = halfedges[j].getEndpoint();
			pts.push([p.x, p.y]);
		}

		var path = layer.pathItems.add();
		path.setEntirePath(pts);
		if (strokedCells) {
			path.stroked = true;
			path.strokeColor = black;
		} else {
			path.stroked = false;
		}
		path.filled = true;
		path.closed = true;

		if (coloredCells) {
			path.fillColor = getNextColor();
		} else {
			path.fillColor = white;
		}

		if (userExit()) break;
	}
	return layer
}



function hslToRgb(h, s, l) {
	s /= 100;
	l /= 100;

	if (s === 0) {
		var gray = l * 255;
		return { r: gray, g: gray, b: gray };
	}

	var m2 = l <= 0.5 ? l * (1 + s) : l + s - l * s;
	var m1 = 2 * l - m2;
	h /= 360;

	return {
		r: hueToRgb(m1, m2, h + 1 / 3),
		g: hueToRgb(m1, m2, h),
		b: hueToRgb(m1, m2, h - 1 / 3)
	};
}

function hueToRgb(m1, m2, h) {
	if (h < 0) h += 1;
	if (h > 1) h -= 1;
	if (h * 6 < 1) return 255 * (m1 + (m2 - m1) * h * 6);
	if (h * 2 < 1) return 255 * m2;
	if (h * 3 < 2) return 255 * (m1 + (m2 - m1) * (2 / 3 - h) * 6);
	return 255 * m1;
}

function makeRGB(r, g, b) {
	var c = new RGBColor();
	c.red = r;
	c.green = g;
	c.blue = b;
	return c;
}

function classifyCompoundPath(cp) {

	var outer = [], holes = [];
	var paths = cp.pathItems;
	var len = paths.length;
	for (var i = 0; i < len; i++) {
		var p = paths[i];
		//shitty. not the best. but fast.
		//some cps can be weird.
		if (p.area > 0) {
			//if (i == 0) {
			outer.push(i);
		} else {
			holes.push(i);
		}
	}
	return { outer: outer, holes: holes };
}


function remOutside(inputLayer, clipLayer) {

	//var dLay = doc.layers.add();

	var clipPaths = clipLayer.pathItems;
	var inputPaths = inputLayer.pathItems;
	var filtered = filterPathsByArea(inputPaths, clipPaths);
	inputPaths = filtered[0]
	var susPaths = filtered[1];

	for (var i = susPaths.length - 1; i >= 0; i--)
		susPaths[i].remove();


	var clen = clipLayer.pathItems.length;
	var c = 0;
	//iterate all paths to be checked (voronois)
	for (var i = inputPaths.length - 1; i >= 0; i--) {

		showProgress(progressBigC, progressBigTotal, ++c, inputPaths.length)


		var path = inputPaths[i];

		//po cutinimo glithcai buna..
		if (path.pathPoints.length < 3) {
			// log("hackaround")
			path.remove();
			continue;
		}

		//var points = getPointsOfPath(path)
		//var pathCenter = centerOfPath(path);//)
		var pathCenter = getPointInPath(path, 0, .2)
		//drawCircle(pathCenter, 1, null, dLay)
		var toRem = 0;
		var cutPaths = 0;
		//iteruojam visus klipmaskus
		for (var j = 0; j < clen; j++) {
			var cp = clipPaths[j]
			if (cp.note != "inner") {
				cutPaths++;
				if (!pointInPath(pathCenter, cp)) {
					toRem++;
					continue;//??
					//break to next path
				}
				//inner path of clipping..not sure why needed.
			} else {
				if (pointInPath(pathCenter, cp)) {
					toRem = 0;
					path.remove();
					break;
				}
			}
			if (userExit()) break;
		}
		if (toRem && toRem == cutPaths) path.remove();
		if (userExit()) break;
	}
}
function userExit() {
	if (ScriptUI.environment.keyboardState.keyName == "Escape") {
		log("User exit");
		showMessage("User exit");
		return true;
	}
	return false;
}

function filterPathsByArea(inputPaths, clipPaths) {
	var maxClipArea = 0;
	var len = clipPaths.length;
	for (var i = 0; i < len; i++) {
		var area = Math.abs(clipPaths[i].area);
		if (area > maxClipArea) maxClipArea = area;
	}

	var goodPaths = [];
	var susPaths = [];
	len = inputPaths.length;
	for (var i = 0; i < len; i++) {
		if (Math.abs(inputPaths[i].area) <= maxClipArea) {
			goodPaths.push(inputPaths[i]);
		} else
			susPaths.push(inputPaths[i]);
	}

	return [goodPaths, susPaths];
}

function centerOfPath(path) {
	var pts = path.pathPoints;
	var sumX = 0, sumY = 0, len = pts.length;

	for (var i = 0; i < len; i++) {
		sumX += pts[i].anchor[0];
		sumY += pts[i].anchor[1];
	}

	return [sumX / len, sumY / len];
}
function pointInPath(xy, path) {
	var x = xy[0];
	var y = xy[1];
	var pts = path.pathPoints;
	var len = pts.length;
	var inside = false;
	var j = len - 1;

	// Ray casting algorithm
	for (var i = 0; i < len; i++) {
		var xi = pts[i].anchor[0];
		var yi = pts[i].anchor[1];
		var xj = pts[j].anchor[0];
		var yj = pts[j].anchor[1];

		// Ray casting test - if ray from point to right crosses segment
		if (((yi > y) !== (yj > y)) &&
			(x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
			inside = !inside;
		}

		j = i;
	}

	return inside;
}
function getPointsOfPath(selectedItem, pathA) {
	pathA = pathA || [];
	var len = selectedItem.pathPoints.length;
	for (var i = 0; i < len; i++) {
		pathA.push(selectedItem.pathPoints[i].anchor);
	}
	return pathA;

}
function getPointsOfPathXY(selectedItem, pathA) {
	pathA = pathA || [];
	var len = selectedItem.pathPoints.length;
	for (var i = 0; i < len; i++) {
		var an = selectedItem.pathPoints[i].anchor;
		pathA.push({ x: an[0], y: an[1] });
	}
	return pathA;

}
/////////////





function getPointInPath(path, vertexIndex, percentOffset) {
	var polygon = getPointsOfPath(path);
	vertexIndex = vertexIndex || 0;

	var n = polygon.length;
	var v = polygon[vertexIndex];
	var prev = polygon[(vertexIndex - 1 + n) % n];
	var next = polygon[(vertexIndex + 1) % n];

	// Edge vectors (from vertex outward)
	var edge1 = [prev[0] - v[0], prev[1] - v[1]];
	var edge2 = [next[0] - v[0], next[1] - v[1]];

	// Edge lengths
	var len1 = Math.sqrt(edge1[0] * edge1[0] + edge1[1] * edge1[1]);
	var len2 = Math.sqrt(edge2[0] * edge2[0] + edge2[1] * edge2[1]);

	// Normalize edges
	var norm1 = [edge1[0] / len1, edge1[1] / len1];
	var norm2 = [edge2[0] / len2, edge2[1] / len2];

	// Bisector direction (halfway between edges)
	var bisector = [norm1[0] + norm2[0], norm1[1] + norm2[1]];
	var bisectorLen = Math.sqrt(bisector[0] * bisector[0] + bisector[1] * bisector[1]);

	var perp = [bisector[0] / bisectorLen, bisector[1] / bisectorLen];

	var dist = Math.min(len1, len2) * percentOffset;

	var p = [v[0] + perp[0] * dist, v[1] + perp[1] * dist];
	if (pointInPath(p, path)) return p;

	var p = [v[0] - perp[0] * dist, v[1] - perp[1] * dist];
	if (pointInPath(p, path)) return p;
	//!!!
	//log("error finding point in path..");
	//drawPath(polygon, RED);
	return centerOfPath(path);
}


function analyzeCp(path) {

	var itemCount = path.pathItems.length;
	if (itemCount > 1) {
		// Check if it's holes or separate items
		var hasHoles = false;
		for (var i = 0; i < itemCount; i++) {
			if (path.pathItems[i].polarity === PolarityValues.NEGATIVE) {
				hasHoles = true;
				break;
			}
		}

		if (!hasHoles) {
			return "separate"; // Like letter "i" - dot and body
		} else {
			return "holes";    // Like letter "o" - outer ring with hole
		}
	}

}

// END INCLUDE: voronoi01_forTriangulatorPro.jsx
// BEGIN INCLUDE: dialog.jsx

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Triangulator Pro","preferredSize":[362,443],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"TabbedPanel","parentId":0,"style":{"enabled":true,"varName":"tabPanel","preferredSize":[325,197],"margins":10,"alignment":null,"selection":2}},"item-2":{"id":2,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":"trianglesT","text":"Triangles","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-3":{"id":3,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":"voronoiT","text":"Voronoi","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-4":{"id":4,"type":"Group","parentId":8,"style":{"enabled":true,"varName":"addPointsG","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-5":{"id":5,"type":"StaticText","parentId":4,"style":{"enabled":true,"varName":"extraPointsST","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Count:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"EditText","parentId":4,"style":{"enabled":true,"varName":"extraPointsT","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"20","justify":"left","preferredSize":[54,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Checkbox","parentId":4,"style":{"enabled":true,"varName":"extraPointsC","text":"Add points","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-8":{"id":8,"type":"Panel","parentId":13,"style":{"enabled":true,"varName":"extraPointsP","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Extra points","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-9":{"id":9,"type":"Group","parentId":8,"style":{"enabled":true,"varName":"topPathG","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-10":{"id":10,"type":"Checkbox","parentId":9,"style":{"enabled":true,"varName":"topPathC","text":"Use  top path for point coordinates","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-11":{"id":11,"type":"Progressbar","parentId":0,"style":{"enabled":true,"varName":"progressBar","preferredSize":[330,14],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"Button","parentId":13,"style":{"enabled":true,"varName":"createB","text":"Create","justify":"center","preferredSize":[0,80],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"extraPointsG","preferredSize":[0,0],"margins":[5,0,33,0],"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-14":{"id":14,"type":"Checkbox","parentId":18,"style":{"enabled":true,"varName":"voronoiDrawEdges","text":"Draw edges","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-16":{"id":16,"type":"Checkbox","parentId":18,"style":{"enabled":true,"varName":"voronoiCutOutside","text":"Cut outside","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-18":{"id":18,"type":"Group","parentId":22,"style":{"enabled":true,"varName":"voronoiSettingsG","preferredSize":[163,0],"margins":[31,0,0,0],"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-19":{"id":19,"type":"Checkbox","parentId":18,"style":{"enabled":true,"varName":"voronoiRandomizeFills","text":"Randomize fills","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-20":{"id":20,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":"statusT","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Select shape and press Create","justify":"left","preferredSize":[0,0],"alignment":"fill","helpTip":null}},"item-21":{"id":21,"type":"IconButton","parentId":23,"style":{"enabled":true,"varName":"buyMe","text":"","preferredSize":[120,130],"creationProps":{"style":"","toggle":false},"iconButtonStroke":false,"image":[""],"alignment":"center","helpTip":"Buy me a coffee"}},"item-22":{"id":22,"type":"Group","parentId":3,"style":{"enabled":true,"varName":"voronoiG","preferredSize":[300,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-23":{"id":23,"type":"Group","parentId":25,"style":{"enabled":true,"varName":"buyMeG","preferredSize":[129,176],"margins":[0,0,0,0],"orientation":"column","spacing":0,"alignChildren":["center","center"],"alignment":"top"}},"item-24":{"id":24,"type":"StaticText","parentId":23,"style":{"enabled":true,"varName":"buyMeT","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Enjoying the script?","justify":"center","preferredSize":[123,0],"alignment":null,"helpTip":null}},"item-25":{"id":25,"type":"Group","parentId":22,"style":{"enabled":true,"varName":"buyMeGO","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-26":{"id":26,"type":"Group","parentId":2,"style":{"enabled":true,"varName":"triangleG","preferredSize":[300,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-27":{"id":27,"type":"Group","parentId":26,"style":{"enabled":true,"varName":"triangleSettingsG","preferredSize":[163,0],"margins":[31,0,0,0],"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-28":{"id":28,"type":"Checkbox","parentId":27,"style":{"enabled":true,"varName":"triangleDrawEdges","text":"Draw edges","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-30":{"id":30,"type":"Checkbox","parentId":27,"style":{"enabled":true,"varName":"triangleRandomizeFills","text":"Randomize fills","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-31":{"id":31,"type":"Group","parentId":26,"style":{"enabled":true,"varName":"buyMeGO","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-32":{"id":32,"type":"Group","parentId":31,"style":{"enabled":true,"varName":"buyMeG","preferredSize":[129,176],"margins":[0,0,0,0],"orientation":"column","spacing":0,"alignChildren":["center","center"],"alignment":"top"}},"item-33":{"id":33,"type":"IconButton","parentId":32,"style":{"enabled":true,"varName":"buyMe","text":"","preferredSize":[120,130],"creationProps":{"style":"","toggle":false},"iconButtonStroke":false,"image":[""],"alignment":"center","helpTip":"Buy me a coffee"}},"item-34":{"id":34,"type":"StaticText","parentId":32,"style":{"enabled":true,"varName":"buyMeT","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Enjoying the script?","justify":"center","preferredSize":[123,0],"alignment":null,"helpTip":null}},"item-35":{"id":35,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"randomPanel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Random fill color variation","preferredSize":[324,132],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null},"collapsed":true},"item-36":{"id":36,"type":"Group","parentId":35,"style":{"enabled":true,"varName":"sliderG","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-37":{"id":37,"type":"StaticText","parentId":36,"style":{"enabled":true,"varName":"","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Darkness","justify":"left","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-38":{"id":38,"type":"Slider","parentId":36,"style":{"enabled":true,"varName":"slider0","preferredSize":[171,0],"alignment":null,"helpTip":null}},"item-39":{"id":39,"type":"EditText","parentId":36,"style":{"enabled":true,"varName":"sliderT0","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"30","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-40":{"id":40,"type":"Group","parentId":35,"style":{"enabled":true,"varName":"sliderG","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-41":{"id":41,"type":"StaticText","parentId":40,"style":{"enabled":true,"varName":"","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Green/Red","justify":"left","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-42":{"id":42,"type":"Slider","parentId":40,"style":{"enabled":true,"varName":"slider0","preferredSize":[171,0],"alignment":null,"helpTip":null}},"item-43":{"id":43,"type":"EditText","parentId":40,"style":{"enabled":true,"varName":"sliderT1","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"10","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-44":{"id":44,"type":"Group","parentId":35,"style":{"enabled":true,"varName":"sliderG","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-45":{"id":45,"type":"StaticText","parentId":44,"style":{"enabled":true,"varName":"","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Blue/Yellow","justify":"left","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-46":{"id":46,"type":"Slider","parentId":44,"style":{"enabled":true,"varName":"slider0","preferredSize":[171,0],"alignment":null,"helpTip":null}},"item-47":{"id":47,"type":"EditText","parentId":44,"style":{"enabled":true,"varName":"sliderT2","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"10","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-48":{"id":48,"type":"Checkbox","parentId":18,"style":{"enabled":true,"varName":"voronoiRemoveOutside","text":"Remove outside","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-49":{"id":49,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"helpLinkG","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["right","center"],"alignment":"fill"}},"item-50":{"id":50,"type":"StaticText","parentId":32,"style":{"enabled":true,"varName":"buyMeT","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Buy me a coffee!","justify":"center","preferredSize":[123,0],"alignment":null,"helpTip":null}},"item-51":{"id":51,"type":"StaticText","parentId":23,"style":{"enabled":true,"varName":"buyMeT","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Buy me a coffee!","justify":"center","preferredSize":[123,0],"alignment":null,"helpTip":null}},"item-53":{"id":53,"type":"DropDownList","parentId":55,"style":{"enabled":true,"varName":"cutAccDD","text":"DropDownList","listItems":"0, 1,2,3,4,5","preferredSize":[0,0],"alignment":null,"selection":1,"helpTip":null}},"item-54":{"id":54,"type":"StaticText","parentId":55,"style":{"enabled":true,"varName":"cutAccST","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Cut accuracy","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-55":{"id":55,"type":"Group","parentId":18,"style":{"enabled":true,"varName":"cutAccG","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}}},"order":[0,1,2,26,27,28,30,31,32,33,34,50,3,22,18,14,19,16,48,55,54,53,25,23,21,24,51,35,36,37,38,39,40,41,42,43,44,45,46,47,13,8,4,7,5,6,9,10,12,49,11,20],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":2}
*/ 

// PALETTE
// =======
var palette = new Window("palette"); 
    palette.text = "Triangulator Pro"; 
    palette.preferredSize.width = 362; 
    palette.preferredSize.height = 443; 
    palette.orientation = "column"; 
    palette.alignChildren = ["center","top"]; 
    palette.spacing = 10; 
    palette.margins = 16; 

// TABPANEL
// ========
var tabPanel = palette.add("tabbedpanel", undefined, undefined, {name: "tabPanel"}); 
    tabPanel.alignChildren = "fill"; 
    tabPanel.preferredSize.width = 325; 
    tabPanel.preferredSize.height = 197; 
    tabPanel.margins = 0; 

// TRIANGLEST
// ==========
var trianglesT = tabPanel.add("tab", undefined, undefined, {name: "trianglesT"}); 
    trianglesT.text = "Triangles"; 
    trianglesT.orientation = "column"; 
    trianglesT.alignChildren = ["left","top"]; 
    trianglesT.spacing = 10; 
    trianglesT.margins = 10; 

// TRIANGLEG
// =========
var triangleG = trianglesT.add("group", undefined, {name: "triangleG"}); 
    triangleG.preferredSize.width = 300; 
    triangleG.orientation = "row"; 
    triangleG.alignChildren = ["left","top"]; 
    triangleG.spacing = 10; 
    triangleG.margins = 0; 

// TRIANGLESETTINGSG
// =================
var triangleSettingsG = triangleG.add("group", undefined, {name: "triangleSettingsG"}); 
    triangleSettingsG.preferredSize.width = 163; 
    triangleSettingsG.orientation = "column"; 
    triangleSettingsG.alignChildren = ["left","center"]; 
    triangleSettingsG.spacing = 10; 
    triangleSettingsG.margins = [0,31,0,0]; 

var triangleDrawEdges = triangleSettingsG.add("checkbox", undefined, undefined, {name: "triangleDrawEdges"}); 
    triangleDrawEdges.text = "Draw edges"; 
    triangleDrawEdges.value = true; 

var triangleRandomizeFills = triangleSettingsG.add("checkbox", undefined, undefined, {name: "triangleRandomizeFills"}); 
    triangleRandomizeFills.text = "Randomize fills"; 
    triangleRandomizeFills.value = true; 

// BUYMEGO
// =======
var buyMeGO = triangleG.add("group", undefined, {name: "buyMeGO"}); 
    buyMeGO.orientation = "row"; 
    buyMeGO.alignChildren = ["center","center"]; 
    buyMeGO.spacing = 10; 
    buyMeGO.margins = 0; 

// BUYMEG
// ======
var buyMeG = buyMeGO.add("group", undefined, {name: "buyMeG"}); 
    buyMeG.preferredSize.width = 129; 
    buyMeG.preferredSize.height = 176; 
    buyMeG.orientation = "column"; 
    buyMeG.alignChildren = ["center","center"]; 
    buyMeG.spacing = 0; 
    buyMeG.margins = [0,0,0,0]; 
    buyMeG.alignment = ["center","top"]; 

var buyMe = buyMeG.add("iconbutton", undefined, undefined, {name: "buyMe", style: ""}); 
    buyMe.helpTip = "Buy me a coffee"; 
    buyMe.preferredSize.width = 120; 
    buyMe.preferredSize.height = 130; 
    buyMe.alignment = ["center","center"]; 

var buyMeT = buyMeG.add("statictext", undefined, undefined, {name: "buyMeT"}); 
    buyMeT.text = "Enjoying the script?"; 
    buyMeT.preferredSize.width = 123; 
    buyMeT.justify = "center"; 

var buyMeT1 = buyMeG.add("statictext", undefined, undefined, {name: "buyMeT1"}); 
    buyMeT1.text = "Buy me a coffee!"; 
    buyMeT1.preferredSize.width = 123; 
    buyMeT1.justify = "center"; 

// VORONOIT
// ========
var voronoiT = tabPanel.add("tab", undefined, undefined, {name: "voronoiT"}); 
    voronoiT.text = "Voronoi"; 
    voronoiT.orientation = "column"; 
    voronoiT.alignChildren = ["left","top"]; 
    voronoiT.spacing = 10; 
    voronoiT.margins = 10; 

// TABPANEL
// ========
tabPanel.selection = trianglesT; 

// VORONOIG
// ========
var voronoiG = voronoiT.add("group", undefined, {name: "voronoiG"}); 
    voronoiG.preferredSize.width = 300; 
    voronoiG.orientation = "row"; 
    voronoiG.alignChildren = ["left","top"]; 
    voronoiG.spacing = 10; 
    voronoiG.margins = 0; 

// VORONOISETTINGSG
// ================
var voronoiSettingsG = voronoiG.add("group", undefined, {name: "voronoiSettingsG"}); 
    voronoiSettingsG.preferredSize.width = 163; 
    voronoiSettingsG.orientation = "column"; 
    voronoiSettingsG.alignChildren = ["left","center"]; 
    voronoiSettingsG.spacing = 10; 
    voronoiSettingsG.margins = [0,31,0,0]; 

var voronoiDrawEdges = voronoiSettingsG.add("checkbox", undefined, undefined, {name: "voronoiDrawEdges"}); 
    voronoiDrawEdges.text = "Draw edges"; 
    voronoiDrawEdges.value = true; 

var voronoiRandomizeFills = voronoiSettingsG.add("checkbox", undefined, undefined, {name: "voronoiRandomizeFills"}); 
    voronoiRandomizeFills.text = "Randomize fills"; 
    voronoiRandomizeFills.value = true; 

var voronoiCutOutside = voronoiSettingsG.add("checkbox", undefined, undefined, {name: "voronoiCutOutside"}); 
    voronoiCutOutside.text = "Cut outside"; 
    voronoiCutOutside.value = true; 

var voronoiRemoveOutside = voronoiSettingsG.add("checkbox", undefined, undefined, {name: "voronoiRemoveOutside"}); 
    voronoiRemoveOutside.text = "Remove outside"; 
    voronoiRemoveOutside.value = true; 

// CUTACCG
// =======
var cutAccG = voronoiSettingsG.add("group", undefined, {name: "cutAccG"}); 
    cutAccG.orientation = "row"; 
    cutAccG.alignChildren = ["left","center"]; 
    cutAccG.spacing = 10; 
    cutAccG.margins = 0; 

var cutAccST = cutAccG.add("statictext", undefined, undefined, {name: "cutAccST"}); 
    cutAccST.text = "Cut accuracy"; 

var cutAccDD_array = ["0","1","2","3","4","5"]; 
var cutAccDD = cutAccG.add("dropdownlist", undefined, undefined, {name: "cutAccDD", items: cutAccDD_array}); 
    cutAccDD.selection = 1; 

// BUYMEGO1
// ========
var buyMeGO1 = voronoiG.add("group", undefined, {name: "buyMeGO1"}); 
    buyMeGO1.orientation = "row"; 
    buyMeGO1.alignChildren = ["center","center"]; 
    buyMeGO1.spacing = 10; 
    buyMeGO1.margins = 0; 

// BUYMEG1
// =======
var buyMeG1 = buyMeGO1.add("group", undefined, {name: "buyMeG1"}); 
    buyMeG1.preferredSize.width = 129; 
    buyMeG1.preferredSize.height = 176; 
    buyMeG1.orientation = "column"; 
    buyMeG1.alignChildren = ["center","center"]; 
    buyMeG1.spacing = 0; 
    buyMeG1.margins = [0,0,0,0]; 
    buyMeG1.alignment = ["center","top"]; 

var buyMe1 = buyMeG1.add("iconbutton", undefined, undefined, {name: "buyMe1", style: ""}); 
    buyMe1.helpTip = "Buy me a coffee"; 
    buyMe1.preferredSize.width = 120; 
    buyMe1.preferredSize.height = 130; 
    buyMe1.alignment = ["center","center"]; 

var buyMeT2 = buyMeG1.add("statictext", undefined, undefined, {name: "buyMeT2"}); 
    buyMeT2.text = "Enjoying the script?"; 
    buyMeT2.preferredSize.width = 123; 
    buyMeT2.justify = "center"; 

var buyMeT3 = buyMeG1.add("statictext", undefined, undefined, {name: "buyMeT3"}); 
    buyMeT3.text = "Buy me a coffee!"; 
    buyMeT3.preferredSize.width = 123; 
    buyMeT3.justify = "center"; 

// RANDOMPANEL
// ===========
var randomPanel = palette.add("panel", undefined, undefined, {name: "randomPanel"}); 
    randomPanel.text = "Random fill color variation"; 
    randomPanel.preferredSize.width = 324; 
    randomPanel.preferredSize.height = 132; 
    randomPanel.orientation = "column"; 
    randomPanel.alignChildren = ["left","top"]; 
    randomPanel.spacing = 10; 
    randomPanel.margins = 10; 

// SLIDERG
// =======
var sliderG = randomPanel.add("group", undefined, {name: "sliderG"}); 
    sliderG.orientation = "row"; 
    sliderG.alignChildren = ["left","center"]; 
    sliderG.spacing = 10; 
    sliderG.margins = 0; 

var statictext1 = sliderG.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Darkness"; 
    statictext1.preferredSize.width = 80; 

var slider0 = sliderG.add("slider", undefined, undefined, undefined, undefined, {name: "slider0"}); 
    slider0.minvalue = 0; 
    slider0.maxvalue = 100; 
    slider0.value = 50; 
    slider0.preferredSize.width = 171; 

var sliderT0 = sliderG.add('edittext {properties: {name: "sliderT0"}}'); 
    sliderT0.text = "30"; 
    sliderT0.preferredSize.width = 40; 

// SLIDERG1
// ========
var sliderG1 = randomPanel.add("group", undefined, {name: "sliderG1"}); 
    sliderG1.orientation = "row"; 
    sliderG1.alignChildren = ["left","center"]; 
    sliderG1.spacing = 10; 
    sliderG1.margins = 0; 

var statictext2 = sliderG1.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "Green/Red"; 
    statictext2.preferredSize.width = 80; 

var slider1 = sliderG1.add("slider", undefined, undefined, undefined, undefined, {name: "slider1"}); 
    slider1.minvalue = 0; 
    slider1.maxvalue = 100; 
    slider1.value = 50; 
    slider1.preferredSize.width = 171; 

var sliderT1 = sliderG1.add('edittext {properties: {name: "sliderT1"}}'); 
    sliderT1.text = "10"; 
    sliderT1.preferredSize.width = 40; 

// SLIDERG2
// ========
var sliderG2 = randomPanel.add("group", undefined, {name: "sliderG2"}); 
    sliderG2.orientation = "row"; 
    sliderG2.alignChildren = ["left","center"]; 
    sliderG2.spacing = 10; 
    sliderG2.margins = 0; 

var statictext3 = sliderG2.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Blue/Yellow"; 
    statictext3.preferredSize.width = 80; 

var slider2 = sliderG2.add("slider", undefined, undefined, undefined, undefined, {name: "slider2"}); 
    slider2.minvalue = 0; 
    slider2.maxvalue = 100; 
    slider2.value = 50; 
    slider2.preferredSize.width = 171; 

var sliderT2 = sliderG2.add('edittext {properties: {name: "sliderT2"}}'); 
    sliderT2.text = "10"; 
    sliderT2.preferredSize.width = 40; 

// EXTRAPOINTSG
// ============
var extraPointsG = palette.add("group", undefined, {name: "extraPointsG"}); 
    extraPointsG.orientation = "row"; 
    extraPointsG.alignChildren = ["left","center"]; 
    extraPointsG.spacing = 10; 
    extraPointsG.margins = [0,5,0,33]; 

// EXTRAPOINTSP
// ============
var extraPointsP = extraPointsG.add("panel", undefined, undefined, {name: "extraPointsP"}); 
    extraPointsP.text = "Extra points"; 
    extraPointsP.orientation = "column"; 
    extraPointsP.alignChildren = ["left","top"]; 
    extraPointsP.spacing = 10; 
    extraPointsP.margins = 10; 

// ADDPOINTSG
// ==========
var addPointsG = extraPointsP.add("group", undefined, {name: "addPointsG"}); 
    addPointsG.orientation = "row"; 
    addPointsG.alignChildren = ["left","center"]; 
    addPointsG.spacing = 10; 
    addPointsG.margins = 0; 

var extraPointsC = addPointsG.add("checkbox", undefined, undefined, {name: "extraPointsC"}); 
    extraPointsC.text = "Add points"; 

var extraPointsST = addPointsG.add("statictext", undefined, undefined, {name: "extraPointsST"}); 
    extraPointsST.text = "Count:"; 

var extraPointsT = addPointsG.add('edittext {properties: {name: "extraPointsT"}}'); 
    extraPointsT.text = "20"; 
    extraPointsT.preferredSize.width = 54; 

// TOPPATHG
// ========
var topPathG = extraPointsP.add("group", undefined, {name: "topPathG"}); 
    topPathG.orientation = "row"; 
    topPathG.alignChildren = ["left","center"]; 
    topPathG.spacing = 10; 
    topPathG.margins = 0; 

var topPathC = topPathG.add("checkbox", undefined, undefined, {name: "topPathC"}); 
    topPathC.text = "Use  top path for point coordinates"; 

// EXTRAPOINTSG
// ============
var createB = extraPointsG.add("button", undefined, undefined, {name: "createB"}); 
    createB.text = "Create"; 
    createB.preferredSize.height = 80; 

// HELPLINKG
// =========
var helpLinkG = palette.add("group", undefined, {name: "helpLinkG"}); 
    helpLinkG.orientation = "row"; 
    helpLinkG.alignChildren = ["right","center"]; 
    helpLinkG.spacing = 10; 
    helpLinkG.margins = 0; 
    helpLinkG.alignment = ["fill","top"]; 

var progressBar = palette.add("progressbar", undefined, undefined, {name: "progressBar"}); 
    progressBar.maxvalue = 100; 
    progressBar.value = 50; 
    progressBar.preferredSize.width = 330; 
    progressBar.preferredSize.height = 14; 

var statusT = palette.add("statictext", undefined, undefined, {name: "statusT"}); 
    statusT.text = "Select shape and press Create"; 
    statusT.alignment = ["fill","top"]; 

//palette.show();

// END INCLUDE: dialog.jsx
// BEGIN INCLUDE: augmentDialog.jsx

var buyMe_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%C3%88%00%00%00%C3%88%08%02%00%00%00%22%3A9%C3%89%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C3%89e%3C%00%00%03(iTXtXML%3Acom.adobe.xmp%00%00%00%00%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%209.1-c002%2079.f354efc70%2C%202023%2F11%2F09-12%3A05%3A53%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstRef%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceRef%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%2025.4%20(Macintosh)%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A2DBC9E8354E711F0B721A9A6A2BAF6AB%22%20xmpMM%3ADocumentID%3D%22xmp.did%3A2DBC9E8454E711F0B721A9A6A2BAF6AB%22%3E%20%3CxmpMM%3ADerivedFrom%20stRef%3AinstanceID%3D%22xmp.iid%3A2DBC9E8154E711F0B721A9A6A2BAF6AB%22%20stRef%3AdocumentID%3D%22xmp.did%3A2DBC9E8254E711F0B721A9A6A2BAF6AB%22%2F%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E6q%C3%96%C3%99%00%00P%C2%8BIDATx%C3%9A%C3%AC%5D%07x%15%C3%85%C3%B6%C3%9F%C2%9BN%C2%80%40%20%04BK%C2%A1JSADzo*E%C2%90%5EEz%2F%0FD%C2%91%22R%14D%10%C2%95%26%C2%8A%C2%A0%C3%92U%C2%8A%C2%94%C2%87HyT%C3%A9%01A%40%20%09%25%C2%A4%C2%90%20%25%C2%B4%C2%94%C3%BB%C3%BF%C3%9D%3B%C2%8Fu8%C2%B3wwvs%C2%83%C3%B8%C3%BE%C2%9C%2F%1F%1F%C3%99%C3%AC%C3%AE%C2%999s%C3%A6%C2%94%C2%993%C2%BF%C2%B5%C3%99%C3%ADv%C3%A5)%3D%25w%C2%93%C3%87S%11%3C%C2%A5%C2%A7%C2%8A%C3%B5%C2%94%C2%9E*%C3%96Sz%C2%AAXO%C3%A9)%C2%B9%C2%9D%C2%BC%2C%3C%C2%93%C2%9E%C2%9E%1E%1F%1F%7F%C3%A3%C3%86%C2%8D%C2%8C%C2%8C%0C%C3%83%C2%9B%7D%7D%7D%03%03%03%C3%B3%C3%A6%C3%8D%C3%BB%24K%01%3D%3Aw%C3%AE%1C%C3%9A%19%1C%1C%C3%8C%C2%AE%C3%BC%C3%B9%C3%A7%C2%9FqqqE%C2%8A%14%C3%89%C2%9E%3D%C2%BB%C2%AB%C2%A7%C3%BE%C3%B8%C3%A3%0F%7F%7F%C3%BFB%C2%85%0A%C2%B1_%C3%AF%C3%9E%C2%BD%1B%1D%1D%5D%C2%A0%40%01%C2%BC%C3%872_%19%22%7C%C3%8D%C3%92%C3%AD%C3%9B%C2%B7%13%12%12%C3%90Z%C2%99%C2%9B%03%02%02%C3%B2%C3%A4%C3%89%C2%A3%23%04%C2%97d%C2%97%26%C3%88z%C3%B9%C3%B2%C3%A5%1D%3At(S%C2%A6%0Cd%C3%A1%C3%A1!e%C3%AD%7C%7C%7C%C3%B2%C3%A7%C3%8F%C3%BF%C3%A2%C2%8B%2F%0E%1D%3At%C3%BB%C3%B6%C3%AD%C3%90E%C3%BB%13F%C3%87%C2%8E%1D%7B%C3%A9%C2%A5%C2%97%3C%3D%3D%C2%83%C2%82%C2%82%26O%C2%9E%C2%8C%2B%C3%9F~%C3%BBmXX%18%3AX%C2%BCx%C3%B1-%5B%C2%B6%C2%88%C2%8F%5C%C2%BCx%C3%B1%C3%A5%C2%97_F%C3%97r%C3%A5%C3%8A%C3%95%C2%BF%7F%7F%5C%C3%99%C2%B6m%5B%C3%99%C2%B2e%C3%B1H%C3%81%C2%82%05%17-Zd%C2%96%C3%AF%C2%A4I%C2%93d%1E!%7CSSS%C3%A5%C2%BBy%C3%B2%C3%A4%C3%89%C2%A9S%C2%A7%C3%96%C2%ABW%C2%AFh%C3%91%C2%A2%C3%99%C2%B2e%C2%93T%C2%8F%C2%9C9sB%14%C2%AF%C2%BE%C3%BA%C3%AA'%C2%9F%7C%02%C2%85%C2%96g'%C2%A5X)))%C3%A3%C3%86%C2%8D%C3%83%C3%B4%C3%8D%C2%BCm%C2%A8R%C2%A5%C3%8A%C2%8A%15%2B%C2%9E%1C%C2%AD%C3%82%C3%84%C2%85B%C3%B0-%C2%9C6m%C2%9A%C2%9F%C2%9F%C2%9F%C3%BAkHH%08%C3%A67%C3%BF%08%C3%A6%06F%C2%97%7F%C3%A4%C3%BD%C3%B7%C3%9F%C3%87h%C3%B1F%C3%BA%C3%94%C2%A9Sf%C3%B9jj%C2%B0%3E%C3%9F%05%0B%16%C3%88%C3%B4%C3%B1%C3%90%C2%A1Cx%C3%90%C3%9B%C3%9B%3B%C2%93c%07%C2%BB%C3%95%C2%ABW%2F%C3%83%C2%AE%C3%89*%C3%96%C2%8E%1D%3B%C3%8A%C2%97%2F%C3%AF%5E%C3%97%C3%93%C2%A2E%0BL%C2%BE'A%C2%B1N%C2%9F%3E-%C3%BAnre%C3%B3%C3%A6%C3%8D%C3%BC%23%C2%88%01%C2%88g%C2%87%09!%C2%8F%7C%C3%BE%C3%B9%C3%A7f%C3%B9%C3%82%C2%A2%C3%AB%3F%22%C3%B2%C2%85!%C3%91%7F%04%C2%AEv%C3%AC%C3%98%C2%B1%C3%BC%3C%C3%89%3C%C3%81X%C3%82zeV%C2%B1%C3%A6%C3%8E%C2%9D%2B%0A%C3%9A-T%C2%B2d%C3%89%C2%83%07%0F%C3%BE%C3%AD%C2%8A%C2%85%40*w%C3%AE%C3%9C%7C%C3%83%C3%AA%C3%94%C2%A9C%C2%9Az%C3%B4%C3%A8Q%C3%BE%C2%91%7B%C3%B7%C3%AE%3D%C3%B3%C3%8C3%C3%BC%0DU%C2%ABV%25Q%C3%88%C2%9A5k%C3%8C%C3%B2%C3%BD%C3%A8%C2%A3%C2%8F%C3%B4%1F%11%C3%B9%C3%B6%C3%AD%C3%9BW%C3%A7%C3%BEk%C3%97%C2%AEA%C3%B3%C2%B2(*%05%C3%AB%C3%BB%C3%B7%C3%AF%5BT%C2%AC%2F%C2%BF%C3%BC2KCfD%C2%85%C2%91%C2%91%C2%91%7F%C2%BBn%C3%8D%C2%981%C3%83f%C2%B3%C2%A9%C2%9E%1A%C2%A6%C2%B4u%C3%AB%C3%96%C3%ACW%04%40%C2%90%60ZZ%1Ayd%C3%95%C2%AAU%C2%AA%19%40%1Cv%C3%B6%C3%AC%C3%99%11%23F%C2%A8%C3%BD%C2%82%C3%9FA%C2%80l%C3%88%17%C2%9A%C2%A4%3ER%C2%B1b%C3%85%C2%ABW%C2%AF%1A%3EB%C3%B8%C3%BE%C3%B6%C3%9Bo%C2%AE%C3%AE%C3%84%C2%A8%C2%8B3%C3%84%C2%BD%C3%94%C2%B1cG%C2%9D%C2%A6%C3%9A%5Cm%C3%A9%C3%80%036i%C3%92%04%C3%AD%13%C3%BF%04%C2%83%C3%BC%C3%9Cs%C3%8F!%C3%A4Bd%C2%A7%C3%8F%1Ba%C3%81%C3%B5%C3%AB%C3%97%C2%91%C3%B8%20P%7D%C3%B0%C3%A0%C2%81x%03%C3%B2%C2%80%C3%9D%C2%BBw%C3%AB%C2%A4Q%08%C2%8A%C3%8F%C2%9C9S%C2%A1B%C2%85%C3%AA%C3%95%C2%AB%C3%A3W%C3%8C%C3%9A%C2%B5k%C3%97%22%C3%A6%C2%ABU%C2%AB%16%24%C2%8B%2B%C2%97.%5D%C3%BA%C3%B7%C2%BF%C3%BF%0D%C3%BB%C3%9C%C2%A8Q%23%C3%BC%C2%8B%2B%07%0E%1C%40TQ%C2%A2D%C2%89%06%0D%1A%40c%C3%90%C2%86%0D%1B6%C3%84%C3%86%C3%86Bi%C3%90l%C3%9C%C2%80%26%C2%AD_%C2%BF%1E%C2%81v%C3%BD%C3%BA%C3%B5%11B%C3%A1%C3%8A%C2%87%1F~%C2%88%C3%B0%197%2C%5D%C2%BA%14%09%1A%C2%B8t%C3%AF%C3%9E%1D%C2%8C%C2%A0U3g%C3%8E%C3%94l%18%02%C3%BC%C3%A1%C3%83%C2%87%235%5B%C2%B6lY%C3%A9%C3%92%C2%A5%C3%A1t%C2%90%C3%99%1C%3E%7C%C2%B8%5C%C2%B9r%C2%9D%3Bw%16%C2%9D%C2%A3%26%C2%AD%5B%C2%B7n%C3%97%C2%AE%5D%C2%85%0B%17%06%3B%C3%96xC%22%7C%5D%C3%9D%C3%B6%C3%86%1Bo%7C%C3%BD%C3%B5%C3%97%C2%9A%7F%C3%82S%10%7B%C2%BE%7C%C3%B9%0C%1B%099%C3%80%C2%B2%1E%3F~%3C%26%26F%C3%B3%06%C3%A4%3A%C3%AF%C2%BC%C3%B3%C2%8E%C2%89%C2%AC%10%09%20%5C%C2%95x3Fk%C3%9E%C2%BCy2s%C2%8B%10%1A%C2%87%C2%B8O3%19%C3%A9%C3%93%C2%A7%C2%8F%C3%A6%23PD%C3%BC%C2%89%C3%B7%14%08%C2%A2%C2%91F%C2%B1_%C3%A1G%C2%A0%40PJ%C2%A4%C2%9C%C3%AA%C2%A4OJJ%C2%82%C2%8A%C3%80%C3%8C%C2%B0%2B%03%06%0C%40%5C%C3%92%C2%BCys%C3%B6%2B%C2%A2%C3%97%C3%AF%C2%BF%C3%BF%1E%C2%A9%0Dz%C3%81%C2%AE%20%C3%A2%C2%8E%C2%8E%C2%8E%C2%86B%C3%A0%25PA%08%C2%BAe%C3%8B%C2%967o%C3%9E%1C%3Cx0%5C%1B%C2%AE%C3%A0%C3%9F%0F%3E%C3%B8%40l%1B%02%C3%AD%C3%B0%C3%B0p%C2%A8%26%C3%9E%C2%89%26%C2%91%C3%A8%3E%C3%ABH%C2%92%2Fz%C2%A49%C3%96m%C3%9A%C2%B4%C3%99%C2%B9s'%C3%94%C3%85%14S%08%04%C3%B9%16f%C2%9D%C3%B8B%C2%88%1As%C3%89%C2%84%2B%C3%84%C3%B0%C2%88o%C2%81%C2%85%C2%87%C3%9B%C3%8E%C2%8C%5C%C2%A0%0A%C2%A1%C2%A1%C2%A1b%C3%A3%60%1D5%C2%85H%C3%BC%C2%A6%C2%AA%22%C2%8C*W%C2%AE%C3%BC%C3%AC%C2%B3%C3%8F%C3%B2W%5E%7B%C3%AD%C2%B5%1C9r%C3%B0on%C3%9B%C2%B6-%7FC%C2%B1b%C3%85%C2%88%C2%83h%C3%98%C2%B0!%C3%89v%C3%9B%C2%B5k%C3%87%C3%BF%C2%8A!%C2%84%C3%89%C3%A4%1B%C2%86%24%1F%16%C2%94%C2%BF%C3%A7%C3%AD%C2%B7%C3%9F~%0CZ%25%C3%89%17%C3%B9%26%C2%BAI%C2%97%2B%C2%BD%C2%BC%60%112%C3%83%1D%C2%86%C3%BF%C2%BD%C3%B7%C3%9E%13%C2%B5%C2%A2Z%C2%B5j0%01R%C2%8A%05OQ%C2%B0%60AQ%C2%AB%C3%B4%C2%835I%C3%BA%C3%BD%C3%B7%C3%9F%C3%85%C2%97%23%C2%A6%11%C3%AF%C3%BC%C3%AC%C2%B3%C3%8F%C3%A8.%C3%81%C2%A3%2Bg6'%11%1D%15%C2%B5V%C3%BF%25%C3%A2j%C2%9C%C3%B8%C3%88%C2%A6M%C2%9B%C2%889'%C2%BE%C3%BB%C2%95W%5Ey%0C%C2%8A%25%C3%89w%C3%A1%C3%82%C2%85%C2%A4%C3%BD%C2%98%1B%C3%9F%7C%C3%B3%C2%8D%5B%C3%9A%00%C3%9F%C2%A7%19%C2%AEH)%C2%96hH%C2%A1%0A%C3%89%C3%89%C3%89%C3%AE%12%C3%90%C3%B6%C3%AD%C3%9B1%C2%81%C3%88*%1CB%25%C3%91%C2%BC%C2%91%C3%80%C2%AE_%C2%BF~%C3%BC%C2%95%C3%9A%C2%B5k7n%C3%9C%C2%98%C2%BF%02o%C3%8B%C2%AFGCi%C2%90%C3%83%C3%B37%20%C2%AB%C3%AA%C3%94%C2%A9%13%7F%C3%A5%C3%B5%C3%97_%7F%C3%BE%C3%B9%C3%A7%C3%B9%2BC%C2%86%0C%C3%A1%C3%B3s%C3%B8%C3%87%C2%A8%C2%A8(%C2%BEa%C2%88%C3%A5%11%C2%9C%C3%B1%C2%8F%60*%3F%06%C3%85%C2%92%C3%A4%C2%8B%C3%A8%C2%93%0C%1F%12%0B76%C2%83%08%10%C3%94%C2%A3G%0F)%C3%85%12%C2%9F%C2%84gt%C2%AF%C2%8CZ%C2%B5jEXh%C2%AEV%C2%BF%C3%BF%C3%BE%C3%BB%2C%C3%80%0C%0A%0AB%C3%90%0A%C2%93%C2%89(%01%C3%8E%0ES%10%16%18%1E%0Ai%C2%81%1A0AE%C3%A0%050%2B%C2%A0%5BP)D%C3%A5H%C3%B70%18%08%C2%98%10%C2%90%C3%81%0E!%C2%ACF%C2%84%C2%81%19%C3%B2%C3%A2%C2%8B%2F%C2%B2G0%06%C2%89%C2%89%C2%89%08%C2%9FY%C2%A0%06u%1F8p%20%1E%C2%996m%1A8%C3%A2%25%11%11%11%C3%A0%2B6%0C%C3%A9%18%C3%94%11%C3%8D%40c%C2%BAt%C3%A9%02%5B%C3%B2xb%C2%AC%13'N%C3%B0%C3%BD%C2%85o!7%20d%24%C2%81%2CB%08%24.nl%03%C3%9BP%C3%A2Y%20%C2%96%40%1Cf%C2%90%152G%C3%8E%2F%C3%9F%C3%81%C3%BCb%08%C2%91D%C2%A8W%C3%86%C2%8F%1F%C2%8F%C2%B4%C3%8B%C3%AC%C2%B2G%C2%B3f%C3%8D%C3%94_%C2%91%C2%94%C2%91%C2%80%09%C3%96h%C3%8E%C2%9C9%C3%A2%C2%83h%09R%C2%92%C2%B2e%C3%8B%22u%C3%82%C2%AFG%C2%8E%1CA%02%C2%85%C3%AC%01%3A%C2%87w%C3%A2%0A%C3%82s%5CDWYt%C2%89P%60%C3%90%C2%A0A_~%C3%B9%25RZ%C3%BC%0B%3B%C2%87%C3%87%C2%BBv%C3%AD%C2%8A%18%13%C3%89%C3%94%C3%84%C2%89%13q%0F%14%14%C3%AD%C3%87%C2%9D%C3%884%C2%99%2BD%C3%AE%03%5DA%1FY%C3%90%C2%86wb%16%22%C2%97%C3%AC%C3%96%C2%AD%C3%9B%C3%A7%C2%9F%7F%0E%C2%85%3Bz%C3%B4(%5C%C3%B3%C3%AD%C3%9B%C2%B7%C3%A1%7D%C3%B06%C3%9C%C2%83%C2%97%C2%BF%C3%B5%C3%96%5B%C2%B0%C3%A5_%7C%C3%B1%05XC%C2%A7q%03%C2%92%C2%89R%C2%A5J%C3%81%C3%A6A%C2%B9%2F%5C%C2%B80k%C3%96%C2%AC%C3%8B%C2%97%2F%C3%83%C2%B2B_%C2%A1%C3%99p%19_%7D%C3%B5%15%C3%9C7%22%3F%5E%1A*!%C2%84%C3%85%23%C3%90%C2%9E%17%5Ex%01%2F%09%08%08%10%C3%B9%C2%92%C3%BE%12%C3%BA%C3%B1%C3%87%1F%C3%89%C2%A4%25%C2%82%C2%BDx%C3%B1%221%C3%BC2%C2%BB%3A%C3%A8%23%C2%BF%02%00%C3%99%22%13%C3%A7c%12%C2%B4%C2%93%C3%84%C2%BB%C3%94ba%C3%8C%C2%88%23G%C3%92N%C3%AE%C2%A9%5B%C2%B7%C2%AE%C3%995%0F%18%0F%C3%82%C2%85d%C3%97%08%C2%A2%0D%C3%A7%0A%C2%86%C2%8D%7F%0A%12%17%C2%97%10%C3%B9%25%C3%81%1A5j%1C%3Bv%C2%8CO%17%C3%BE%C3%B5%C2%AF%7F%19r%C3%81%C3%A8%C3%B2%C3%8E%11%06i%C3%AF%C3%9E%C2%BD%C2%BCXa%5C%C3%B9%C2%A1%C3%82%C2%9F%0E%1E%3C%08SJ%C3%B8%C3%B2%C2%9B%3C%C2%98%C2%8A%C3%AB%C3%96%C2%AD%C3%A3%C3%A39L-%C2%91%2F%5B%0Da%C3%94%C2%B9sg%C3%82W%C3%AC%C2%AFH%C3%93%C2%A7O'%C2%92_%C2%BDz5I%C3%8F%C3%8D%C2%8E%1D%C2%9C%06I%C3%9A%60%C3%91%C3%B5%C2%B9h%C2%B8B%04%C3%97%24z%C2%85%C2%85%20%C3%B7%C2%90%1D%2B%19%C2%9A%3D%7B6%C3%89%5C%C3%A0e%C3%B8%1B%60%26%0D%C2%A5%C3%86%C2%A6%C2%ACJ%C3%90%C2%98%3Bw%C3%AE%C3%B07%C3%AC%C3%9F%C2%BF%C2%9F%C3%B0%C2%85%C3%BB%C3%A3%7F%C2%85%C2%9B%10%C2%839%C3%BD%10%13b%C2%85%11%C3%A2%C2%AF%14(P%40%5D%C3%A3PW%C2%86H%C3%94H%C3%B8b%3E%C2%84%C2%85%C2%85%C3%B1Wj%C3%96%C2%ACi%C2%96%C2%AF%C3%98_%C2%91%C2%86%0D%1BF%24%C2%B0o%C3%9F%3E%C3%A2%C3%84-%C2%ACc'%25%25%C3%B1%2FY%C2%B6l%C2%99%C3%A1%16%C2%96%C2%97X%C3%88%01%22%C2%96%C3%90%C3%AD%C2%8B%C2%B6%C2%88%C2%8EI(%C2%80%C3%88%C3%86%C3%B0)8r%C3%BEWh'i*%5C%06y%04j%C3%84%C3%BF%0A'%08%C2%AB%C2%A6%C3%8F%05%C2%BE%C2%86%C3%84%06%C2%88Q%C3%B8%2B%2C%C2%A2%C3%A2%C2%AF%C3%A0%06%C3%92%12%C3%82%17%0A%C2%81%C3%B7%C3%A87%C3%95%C2%90%C2%AF%C3%98_%C2%91%08%C2%97%2C%1A%3E%C3%B8hrE%1C%C2%BE'%C2%A5%C3%90%C2%8F%2C%1Ch%12%C2%BC%03%C3%BF%2BRB~%C3%95%0A%C2%84%C2%A8%C2%9C%C3%9FMC%C2%80%C2%85%C2%99%C3%84%C3%AF%C3%AA%23%C3%A4%17%17%C3%92%08!%C2%80%C3%80%1CU%7FExG%16%C3%9Fa%C3%82%C3%BB%C3%B7%C3%AFO%C2%92%C2%9B%C3%8A%C2%95%2B%C3%AB%C3%B0%C2%85%C2%A3'%C2%8B%40%24%C3%84%C2%94%C3%A1%2B%C3%B6%C3%97%C2%9A%18%1F%C3%93%C3%B0%C2%89%C3%B9%0E%C2%B9%01%C2%B1%C2%B0%C3%9B%5D!%C2%88%14%C2%8D%C3%A0W%C2%99%C2%94%04%03%C2%86%C3%98%05%C2%B3%10%C2%91%C2%B8%C2%BA%1F%C2%87%C2%B9%C2%AE%C2%AE%26%23%C2%B8A%C2%B0%C2%8C0%1C%3A%C2%B4%7D%C3%BBv%5C%C3%B9%C3%BE%C3%BB%C3%AF%C3%A1%C2%AA%7C%7D%7D%11-%C3%85%C3%87%C3%87%C3%8BpA%C2%9E%C2%88%C3%B0%19%C2%9A%C2%81%C2%90%19%C2%89'%C2%8B*J%C2%96%2C%C2%89P%1D%C2%91oJJ%0A%2C%1FR%074%03%C2%8DA%3C%C3%8E%C2%AA%15%C3%AA%C3%97%C2%AF%C2%8FG%C2%AAV%C2%AD%0A%C2%8F%C2%8C%2BK%C2%96%2C%C2%81C%0C%0E%0En%C3%97%C2%AE%1D%C3%8B%C3%8B%C3%90f8Dh%C3%B6%C3%98%C2%B1c5K%C2%A9%10%11%C2%83%2F%1A%0F%25c%C3%BB%C2%80%3C_t%C3%93%C2%B0%C3%A5%18%2C%22y%C2%B2%C2%9F%C3%A8%16W%C2%88%C2%B4%C3%86p%7C%C2%BD%C2%94%7F%14%C2%A9%0E%14%C3%8E%05%C2%A3%C2%88%7F%11%C2%8F%C2%AF%5D%C2%BB%16S%C3%B9%C3%8D7%C3%9F%1C5j%14r%C2%93%1D%3Bv%C3%80%5B%C2%A9%C2%B5%03%08V%105cJI%C3%96L%C2%B2%15Efo%C2%A0%C2%AF%C3%8C%C2%B9%C2%8C%1C9r%C3%B0%C3%A0%C3%81%C3%90'%C3%A6%05%C2%A0%5Bj%C3%8A%C3%8D%7C%2B%02S%C2%B6%C3%BA%C2%85%C3%BB%C3%99%C2%AE(%C3%B4%C2%B8C%C2%87%0E%C2%B8SM8%C2%90%C3%81%20%C2%99%C2%85%C3%90%5D%15d6r%12%C3%9Fx%C3%82%C3%B7%C2%9FD%C3%BF%20%C2%8B%C2%B5x%C3%B1b%C3%BE%11%04%C2%AAl%C3%85A'7%C2%81%C2%92%11obXuy%C3%A6%C3%8C%19%C3%9E%C3%A3%C3%80%C2%B7%C2%8A%C2%8B4P%1A%C3%BE%C2%B5%0B%17.%C3%A4%C2%A3uL%C3%B1%C2%98%C2%98%C2%98%C2%BF%C2%A5R%C3%A3%C3%89%C2%B1X%C3%BF%C2%A4%C3%83%14k%C3%96%C2%AC%C3%A1%7FE%C3%8EO6%C3%B0%C2%BF%C3%BD%C3%B6%5B%C3%B2%08%11%C3%81%C2%96-%5B%C2%A2%C2%A2%C2%A2%C3%B4%C2%B9%C3%BC%C3%A7%3F%C3%BF%C3%A1%23k%C2%A4%C3%89d%0F%00%7F%C3%A5Wq%C2%98%C2%8A%C2%9F%3CyR%C3%BD599y%C3%B3%C3%A6%C3%8D%C3%8A%C3%BFo%C3%BA')%16q%07%C2%B9%C2%9D%C2%A4%C2%9F%C2%AD%C2%90%2Bp%C2%8Bd%C3%95Xs%3D%C2%90%5C!!3%C2%BC%1EIi%11%03%C2%91%C3%82_%C3%89%1A%C2%98%C2%A7%C2%8A%C3%B5D%C3%90%C2%90!C%C3%B8%C3%A8d%C3%BC%C3%B8%C3%B1S%C2%A7N%C3%A5%C3%87%C2%B2w%C3%AF%C3%9E%C3%A4%C2%917%C3%9Ex%C2%83-%C3%993B%1Cfx%C2%B8%05%01%3B%C2%9F%C3%A2%C2%BD%C3%BA%C3%AA%C2%AB%C3%BC%C2%BA%25%C2%8B%C3%B3%10%C3%BA%C3%B0%C2%8A%C2%B8h%C3%91%22%C2%BE%C2%8C%02%C3%B77h%C3%90%C3%A0%C3%BF%C2%B9b%3D%C3%A9%C3%81%C3%BB%C3%99%C2%B3g%C2%A3%C2%A3%C2%A3%C2%91%19!%C2%9Fz%C3%BE%C3%B9%C3%A7%C3%A1%C3%8B0%C2%8A%08o%C3%9B%C2%B7o%C3%8F%C3%AA%3C%11%3B%23%C3%89%0A%09%09%C2%81%5B%C2%ACX%C2%B1%22y%1Cj%C2%84G%C3%A04%2F%5D%C2%BA%04%C2%8D%C3%A9%C3%99%C2%B3%C2%A7!G%C3%98'8%C2%B2%1E%3Dz%C3%A0_(%C3%A2%C2%A7%C2%9F~%C3%8AV%C3%8C%7F%C3%BD%C3%B5W%C3%A4%0A%60%01%0D%1E0%60%00%C3%B4%09~%167%0F%1C8%10%0DC%C2%8C%C2%88F%1E%3At%C2%A8%7C%C3%B9%C3%B2C%C2%87%0Ee%C3%85%C3%A9%C2%91%C2%91%C2%91%C2%89%C2%89%C2%89%08%C2%BF%0A%14(%C2%A0%C3%89%0B%C2%B1%C3%8B%C2%91%23G%C2%909%C2%AA%C3%BB!%7C%7F%C3%99%15%C2%9E%C3%AF%C3%93%C3%A0%C3%9D%0D%C3%81%7BFF%C3%86%C3%A4%C3%89%C2%93%C2%99%C2%89%C2%82G%C2%83%C3%9Eh%C2%9E%C2%A0%C2%AAV%C2%AD%1A%C3%9B%0Cn%C3%93%C2%A6%C2%8DLA%C2%B0L%C3%A1%11%C2%92%7Ch*%C3%B4%09z%C2%B9%7C%C3%B9r%C2%A4%C2%93%C2%AF%C2%BF%C3%BE%3Akg%C2%89%12%25N%C2%9C8a%C3%B8%12%C3%A4qP%3E%C2%B6%1C%C2%9F%3F%7F%C3%BE%C2%AD%5B%C2%B7j..%C2%B0m%1F0%C3%AA%C3%93%C2%A7OZZ%1A%0C%C2%B0%C3%9A_%C3%84%C2%8B%16%C3%B8%3E9%C3%81%C2%BB%C2%B1b!%C3%9D%C3%BD%5B%14k%C3%B7%C3%AE%C3%9D%24Z%22%07%7B%C3%92%C3%93%C3%93Y%C2%BD2%C2%BFP%C2%99y%C3%85%22%7C%C2%A1%5B%C2%BDz%C3%B5%C3%A2%C2%AF%C3%94%C2%AF__%C2%AC%C2%82'D%C3%92%08%C2%A8%C3%85%C2%AD%5B%C2%B7HY%26)0%C2%84%C2%9D%C3%A37%13%C2%AD%C3%B1%15%15%0BY%C2%85%C3%9B%15k%C3%A3%C3%86%C2%8D%C2%A6%C2%B3B%C2%B1%04%C3%9Ep%1B%C3%81%C2%B2%C2%99%C3%94%C3%A7%0BkD%C3%B6s%C3%B8%C3%8C%0B%C2%84%C2%A1B%C3%8AF%12%C2%BA%C3%8C%C2%B7%C2%8D%C3%B0%C2%BDr%C3%A5%C3%8AW_%7D%C3%85_%C2%81%C3%B3%127d%08%1D%3Cx%C2%90%C3%BF%C3%B5%C2%8F%3F%C3%BE%20%C2%9B%3Cx-%C2%B9%02%C2%9F%C3%8B%C2%9F%2C%C2%B7%C3%86%C3%B7%C3%B1%0C%C2%9F%C3%B8N%C2%91%2FU%2C%C3%A4M%24%C3%81%C2%B9~%C3%BD%C2%BA%C3%9B%5B%C2%86%C2%A0%C2%81%C3%88H%5C3%2CS%C2%A6%0C%C2%B9B%C3%B6q%C2%91%C3%9F%C2%91%C2%9Dl%C2%9D%C3%83%05%C3%B2D%C3%B8%C3%82%C3%89%C2%92%C3%AD%17%C3%BDs%C3%B7%C2%8C%C3%88IL%C2%84%5C%24%C3%8C%C2%82%7Fd%C3%A78TB%C3%88%C3%88o%C3%BF%5B%C3%A3%2B%C2%9E*%40%3C%C3%AA%C3%B6%C3%A1KNN%26W4%1A%26%16o%10%1C%C2%81*U%C2%AA%C2%90%7Bj%C3%97%C2%AEm%C2%B6)%C3%93%C2%A7O%C3%A7%C3%9Fp%C3%AE%C3%9C9%22%C2%82f%C3%8D%C2%9A%C2%89%C2%B1%C2%8Ez%C2%98%02%12%C3%97%3C%C2%84%C2%BEc%C3%87%0Eu%C3%85%01%C3%AD4%C2%AC%5C%C2%90%C2%8C%C2%B1x%C2%BEp%C2%AFp%04jZ%00%C2%850%3C%C2%B2%C3%8C%C3%8A7%C3%94%C2%80%01B%C3%97%2Cc%C3%BC%C3%AE%C2%BB%C3%AF%C3%949%0C%1D%C2%BAq%C3%A3%06%C3%82%C2%B2L%C3%B2%C2%85%C3%99%23%C2%92'%C2%AC%C2%91O%C2%98%1D%3B4%C2%86%C2%94%C3%8D%C2%88's%10u%19%1F%C3%BFz%C3%A1%C2%85%17%0E%1F%3E%C3%8C%C3%9B0%C3%B8%20v%C3%96%C2%8A%C3%91%C3%BA%C3%B5%C3%AB%C2%91%C2%B9%C2%98j%5C%C2%ADZ%C2%B5%C3%B8B%C2%B0%C2%B9s%C3%A7%C2%92%7D%C3%9C%C2%B7%C3%9Ez%C3%AB%C2%83%0F%3E%10%C2%95%1Ea%2F%C3%BC%08%C2%9A%C3%84%C3%8A%3Eccc%17%2F%5E%0C'%C3%98%C2%B8qc%C2%A6%C3%9F%C3%90Qx%40%0C%5E%C2%8B%16-%C3%98%C2%A6%C3%8A%C3%AA%C3%95%C2%AB%C3%B7%C3%AE%C3%9D%0B%C3%AB%C3%95%C2%B1cG%C3%8C%7B%0C%18%02%C3%BF%C3%8B%C2%97%2F%C3%97%C2%ACYS%C3%9C%C3%BAu%C3%A5P%08_%C2%BC%04%C3%A3%C2%8A%7F%C3%81%C3%97%15%C3%94%C2%80%C3%8A%C2%B7S%C2%A7Nh%0F%C3%A2w%C2%84%C3%A7h0%C3%9A%C3%89%C2%B6%C3%86%C3%8F%C2%9C9%C2%B3t%C3%A9R%04Rh*%5B%C3%82%C2%80%C3%9BE%C3%92W%C2%B0%60Ad%C2%AC%C2%B8.%C3%83%C3%B7%C3%80%C2%81%03%3F%C3%BC%C3%B0%03%C2%A6S%C3%9B%C2%B6m%C2%89%C3%81%06%C3%BD%C3%B2%C3%8B%2Fd%C2%A5%C2%A3U%C2%ABV%C3%9F%7F%C3%BF%3Dol%C2%A0%C3%90%C2%A6%C3%86%0ER%C3%AD%C3%92%C2%A5%C2%8BZ%C2%AE%C2%8D%C2%89%07u%C3%A7%15%14%1A%C2%82%C3%90M-m%C3%95%C2%B6X%C2%9A%01%20F%C3%9D%C2%8D%C3%9B%0E%C2%90%C2%B8x%C2%B6LTy%C3%8D%C2%82%60%C2%B56%C3%81f%C2%B3%C2%ADZ%C2%B5J%C2%AC%0A%C3%A7O%C2%8CA%C2%A6%C2%88%C3%B7%2BU%C2%AA%C2%A4%5E1%3Cml%C2%B9%1A%C2%9D%C3%A7%C3%BB%C3%AA%C2%AB%C2%AF%C2%8A%07W0%C3%A4%C2%AAq%C2%85%C2%BAC%05-0Z%C2%B2d%C2%89j%C3%A4%0A%17.%7C%C3%BE%C3%BCyrCBB%029%C2%86%0F%157%05%C3%A6aH%C2%BC%C2%9A%C2%AA~_%C3%9C(S4%C3%BD%C2%8B%C2%B8~%C3%AD%C3%86%C3%A3%C3%B03f%C3%8C%20%C3%AFG%C3%BC!%C3%AE%C3%87%C2%89Dv%06a%06%C3%88%11%C2%B9%C2%A3G%C2%8F%C2%927%C2%93%C3%83%5E%18%C3%9A%C2%B8%C2%B88%C2%B7%2B%C2%96%C3%88w%C3%9D%C2%BAu%C3%A4%1EbH%C2%9A4ibaB%12%C2%AB%00%C3%97)%C3%9E%C3%96%C2%BE%7D%7B%C3%92%18%18Hw%C2%81%C3%BC%202%C2%A6%25%C3%88%C2%8A2z%C3%B4h%C2%A9%C3%83%14%C2%98%7Fd-%40q%C2%9E%C3%ADD%0A%C2%96%C3%B9%C2%96%C3%81%17%C2%88%C3%A7%C2%ABF%C2%8D%1A%25%C3%B3%2CA%22%C3%80%C3%94%24%C2%95%24%C3%A2%0E%C2%9D%08%3Cq%C3%BA%C3%B4i%C2%B7%2B%C2%96%C3%88w%C3%8E%C2%9C9%C3%A4%1ERS*S1K%08%C2%9D%C3%A5%0B%C2%B64%03S%C3%90%C2%A6M%C2%9BDw%C2%A6%C2%A9%C2%82f%09)%17tTL%174E%C2%AA%7D%60U%C2%AC%3De%C2%B6%C2%97%C3%A0%C2%AE%C2%98%22%C3%A4%C2%A83g%C3%8E%14%C3%8F%C3%B1%C3%81%1CJ%1E%23Y%C2%B0%60%01%C3%BF%20%C2%A2c2%11%C3%A1%08%C3%B8T%0Ba%01%C2%A9%C3%8E%C3%86%C2%84AX%C3%ADv%C3%85%22%7C%C3%99%C3%A1%02r%0F%C3%82%09%C2%BE%25%03%07%0E%C2%B4%C2%90U%C2%A8%C3%AB%C2%A5%C2%8Cf%C3%8D%C2%9A%25%C3%9E%06%2F%5C%C2%AF%5E%3Dq%C3%B8%C2%BAv%C3%AD%C2%9A%19%C2%84%C2%9F%C2%A8%C2%A8(r%C3%B8%C2%8CQ%C3%8F%C2%9E%3D5%C3%AFw%09%0A%C3%A2*%C3%8Em%C3%94%C2%A8%11%C2%82G%C3%84%C3%822%23%04Y%20%C3%90%C2%86%C2%8F%C2%9F7o%C2%9E%C3%A6%C2%A9%12%C2%90%0C%26%0E%238r%C2%84%C3%BC%C2%B9r%C3%A5B%C2%B4%08%C2%AD%C3%92%14%13B%5D%C3%A4%19P%C3%9F%C2%B0%C2%B00vr%C3%AB%C3%A3%C2%8F%3F%C3%86%C2%94%40h%C3%92%C2%B0aC%1D%14%C2%8D%C3%8C%1F%C2%96%C2%84%11%C2%821%C2%86%C2%83%5E%C2%B9r%C2%A5%C2%A6%13%C3%A9%C3%96%C2%AD%1B%1A%C2%8F%C2%89%24Y%C2%B5'%12f%20%C3%8C6%C2%8CDPP%C3%90%C2%B8q%C3%A34%C2%8F%20%C2%B3%13%13%C2%9A%C3%90E%C2%B0%C3%B1p%0EH%17%C2%90o%1A%C2%AE%C2%B52%1DMLL%C3%9C%C2%B9s%C3%A7%C2%B0a%C3%8341%19%11%C3%83%C2%B82%0A%C2%8AN%1F%C3%88%C2%BA%11%C3%99%C2%BDGJR%C3%96%C2%88%C3%8A%C2%94)%03%1F%C2%AA%C2%83%C3%8F%C3%94%C2%AE%5D%3BX2Wm%C2%80%C3%B3%C3%AD%C3%90%C2%A1%03%C2%9C%3A%C2%86D%5DJ%C2%80N%C2%9F%3D%7BV%C3%B5%C3%9A%C3%93%C2%A7OG%0E%C2%85%C3%89%C2%A4%C3%A2%C2%B9a%08%C3%B1%C2%A0z%C3%A6%0E%19n%C3%A5%C3%8A%C2%95%C3%BD%C3%BD%C3%BD%C3%A1%0E4%0FsC%C3%B5%11%25%20M%C2%83%C2%B2%22%C3%84%C3%96l%09b%26%C2%98%01dj%13%26L%C3%90%C2%AC%C3%A8%02%3B%C2%A4N%C3%90x%C2%B4%C3%84U%C2%B0%C3%BC%C3%8D7%C3%9F%20%01%2CT%C2%A8%C2%90%2B%C3%804%C3%8D%C3%BE%C2%8A%C3%A7p%10)%C2%96*UJ%0C%C3%A3x%C3%82L%C3%96I%C3%B4%60_%C3%B1%06%C3%83%C3%A1C%C2%8E%C2%A5%C2%83a%C3%A9%C3%A5%C3%A5%C3%B5%C3%93O%3F%C2%B9j%C2%80%1E%C2%8C%11T%1B3%23%C3%AB%C2%B6)%C2%ABW%C2%AF%C2%AE%C2%B3%C2%BB%07%C3%89%C3%B2%C2%95%085j%C3%94%10%C3%91%2C%C2%86%0F%1FN%C2%92mr%C3%83%C2%91%23G%C3%B8%C2%A2%C2%97%C3%8E%C2%9D%3B%13%C3%AF%09%C2%B5%C3%A6%0F%C3%A2%C3%A5%C3%8C%C2%99S%0C%251%C2%84%3C%17%C2%98%0AQ5%C2%A1%C3%9C%C3%AA%0D%C3%A1%C3%A1%C3%A1%C2%98%C3%A8%C3%BA%2BL%C3%A2%C3%8A%C2%96%C3%99%C3%BE%C3%82%C3%A1%C2%BA%C2%9A%06%C2%9A%C3%82q%3B%C3%A9%1FGS%0C%C2%8F%C3%9E%C2%8A%2B%C3%A0n!%24%2F%C3%A2A%5E%C2%9ED%14%1E%C3%98d%C3%BE%C2%86%C2%94%C2%94%14%C2%B2x%C3%9D%C2%B6m%5B%C3%B2%C2%921c%C3%86%C2%90Iv%C3%A1%C3%82%05%12%3A%C2%90%C2%93%5B%C3%AF%C2%BC%C3%B3%0Ey%09%C2%81%09%01S2%1F%C3%84%C2%AD%24q%C3%8B%C2%9C%2F%C3%85Q%C2%9C%C2%88%26Y%C3%91_1%01%C3%8F%C2%8A%C3%A3%15%C2%98~%C2%86%60%10%06%C3%B5X%C3%88ev%C3%AC%C3%98%C3%91%C2%BBwo1%C2%95%C2%B3L%C2%B0%C2%AE%C2%B3g%C3%8FF~%40%C3%8A%C3%B4%0C%C2%89%C3%88H%5C%C3%9A%15%C2%85hxO%16%C2%BD%C3%84-d%C2%A1%C2%A9%C2%84%60%C2%B4%10t%C2%8A9~f%08%C2%BE%1E%1AONL%19%C2%97%C3%8D%C2%B8%C2%A2%C3%BD%C3%BB%C3%B7c%C3%A2f%C2%B2%C2%A4%1FA%C3%9B%C3%90%C2%A1C%C3%99%C2%B9%17C%C2%827%C2%81OQ%C2%9F%C2%ADT%C2%A9%12)%10%00%C3%81%2B%C3%A9%C2%AF%1E%C3%81%C2%AF%C3%B1%15%C2%A1%C3%B0z%24%C2%A4%C2%83g%C3%A4e%04%C2%BF%09%C3%AF)%C2%AEm%C3%B2C%C2%88%C3%91%12O%60%C3%83s%C3%B1%C3%A9%C2%B3%18!%C3%81%C3%B7%C2%91-%C3%A7%C2%AC%C3%A8%C2%AF%26%C3%81%C3%94%C3%8D%C2%9F%3F_%5C%7F2%C2%BB%C2%B1S%C2%B3f%C3%8D%C2%85%0B%17J.%C2%89%C3%99L%C3%8D6%24b0%60%C3%BB%C3%B6%C3%AD%C2%83%07%C2%89%C2%8B%C2%8B%C2%939e%C2%8A%C3%88%1D%C2%82F%C2%AE%04%C3%91%C2%A3e%C2%A6T%13%C3%99%C3%8D%C3%84%C2%89%13%11%0BW%C2%ABVm%C3%BC%C3%B8%C3%B1b%C2%B9%1C%1A0y%C3%B2%C3%A4%C2%8D%1B7B!%C2%A0%C2%B2%0C%10%C2%81%C3%A0%C2%ADcJ%0C%1A4%C3%A8%C3%A4%C3%89%C2%93%C3%88%C3%85%3E%C3%B8%C3%A0%03%11%3C%18%C2%B9%0Ft%05%03%C2%8F%C2%99%C2%8D%C2%98%C2%97m%C3%8F%11%C2%9C%C3%B7%C3%B5%C3%AB%C3%97%C2%8F%1C92%3E%3E%1E%C2%BE%C3%B5_%C3%BF%C3%BA%C2%97Z%C2%B3%C2%A0%C3%A2%C2%AD%23%C3%8FB%C3%86%C2%BAf%C3%8D%1A%C3%84%C3%B8x%C2%89%C3%A6%C3%A9E%04%25%C3%88000%C2%BDz%C3%B5%C3%AA%C3%9E%C2%BD%C2%BB%C2%BB%C3%BA%2B_%C2%92%C2%80%3C%06%C3%83%C2%87%C2%99s%C3%A5%C3%8A%15%C3%89%C3%9A%02%C3%88%C2%B0X%C2%B1bHx%C2%91S%C2%9B%C3%838%C2%B6%C3%BFo%C3%91%C3%96%C2%AD%5BU%C2%BCu%16%C3%A8%608%C2%91%C2%99B%C2%9F%C2%90%2B%C2%90%C3%A2%24u%C2%A7%08R%C3%83%0D%C2%98%00%1F%7F%C3%BC%C2%B1%C3%BDQ%C2%9CwV%C2%A3%C2%87aF%1E%C2%83%3C%1F%C3%99%3Et%08%3AGp%C3%9Ew%C3%AD%C3%9A%C2%85%C2%9C%11%C3%93%1A%C3%83%C2%B0t%C3%A9R%C3%BB%C3%BF%7B%C3%BA%C2%9FR%C2%AC%C3%98%C3%98X%3En%C3%83%C2%A8%C2%93%C2%8Dm%C3%A4n%24%C3%952%C3%84yGZN%1CP%C2%A7N%C2%9D%08%C2%A2%C2%8B%05%C2%9C%C3%B7%C2%A7%C2%8A%C3%B5O%22r*KfKG%06%C3%A7%C2%9D%C2%80%C3%80z%3AI%C3%A7%06E%02%C3%A7%C3%BD%7F%C2%9E%C3%BE%C2%A7%3E%C3%92D%40%60%14'%02%3B%C2%A9%C3%9A%23%20M%C3%A2%192%C3%B2%08%C3%B4%C2%8C%C2%AC%14%20~%22%C3%B5*%08%C2%B4I%C2%A5%C2%9B%C3%A5%0F%C3%9D%C3%BC%C3%AF%C3%90%C3%BF%C3%98D%198p%C2%A0%C2%9A%C2%8A%C2%B7l%C3%99%C3%B2%C3%B2%C3%A5%C3%8B%7C%C3%99%C2%8Cf%C2%B5%C2%A0%3E%C3%8E%C3%BB%C2%90!C.%5C%C2%B8%C2%A0%06%C3%A3%C3%881%7F%C3%B8%C3%A1%C2%87%0D%1B6%C2%A8%C2%8F%20%1A%C2%B3%C2%86%C3%B3%C3%BE%C2%BFM%C2%9E%13%26L%C2%B0%C2%A0%C2%8E%C2%88T%C2%BE%C3%BF%C3%BE%C3%BB%03%07%0E%40%C3%90d%C3%8B%5D%25%C3%BCu%C3%AD%C3%9A%C2%B5H%C2%AF0%C2%BF%19%C3%9E%C3%BAO%3F%C3%BD%C2%84%C2%AC%C3%84%C3%8B%C3%8B%C2%8B%C3%A5%3BHLV%C2%ADZu%C3%A2%C3%84%C2%89%7C%C3%B9%C3%B2%C2%B9B%C3%9B%C3%99%C2%B6m%C3%9B%C3%A6%C3%8D%C2%9B%C2%91%C2%B8%C2%B1%20%C3%86%C2%90%2F%06%15%1C%23%23%23_%7F%C3%BDu%C3%84%C3%A0%C2%B0O%C2%AF%C2%BD%C3%B6%1A%02%C3%B9r%C3%A5%C3%8A%C2%BD%C3%B7%C3%9E%7B%2C%17%23%7Ca%C2%A2%10T!yD%C3%92%C2%BAz%C3%B5j%C3%9C%C3%9C%C2%BCy%C3%B3s%C3%A7%C3%8E%C2%9D%3F%7F~%C3%80%C2%80%01%C2%B3f%C3%8D%C3%82K%1A5j%C2%84%5C%18%C2%89%15R%C2%81%C2%B6m%C3%9B%C2%96(Q%C2%A2N%C2%9D%3A!!!%607%7B%C3%B6l%C3%A8V%C3%BD%C3%BA%C3%B5K%C2%96%2C%09%C3%BDC%C3%867e%C3%8A%14%C2%84%C3%B92%C3%BD%C3%BD%C3%BD%C3%B7%C3%9F%C3%91%1D%C2%B6%7BF%C3%96i%5D%C3%91%C2%A5K%C2%97%C3%B0%12%C2%B4%0D%C2%A9%06%C2%8B%05%C2%89%C2%9Ce%5E%C3%A2%16%C2%BE%C3%AE%C2%B7X%C3%A0%C2%A1%C3%AE(%C3%83%C2%8Fh%C2%82i%C3%836%C2%98%C3%82%5B%17K%2F%0Cq%C3%9E5%C3%B9bP%C2%A1%07%C2%90%2F%5CX%C2%BF~%C3%BD%C3%84E%17%C3%A8%C2%9C)%C2%9Cw%C3%A4%C2%89%C3%A0%5B%C2%BBvm%0C%00%C2%836%25%0B%C3%A2%C2%AEJ%5C%C3%94%C2%B5%00W%C3%B8%C3%B2%C3%8B%C2%96-S%1D(%14TfS%7F%C3%8B%C2%96-%3A%C2%B8%C3%B6%10%C2%97%C3%8C%22%C3%93%C2%A2E%C2%8B2%C3%89W%06%C3%97%C3%9E%C2%8Ab%C3%B1f%C2%9F%C2%A5Zd%C2%9B%C2%9D%1C%C2%9E%C2%91%C3%81%5Bo%C3%93%C2%A6%C2%8D%C3%98%19%C3%BE%06%11%C3%A7%C3%9D%C2%90%C2%AF%C2%A2%C2%85%14M*%C2%8A%0Cq%C3%9Ee%C3%B8%C2%8A4w%C3%AE%5C%C3%BD%C3%BE%C2%8A%7C%17.%5ChX%C3%9CAp%C3%9E%09%C2%AE%C2%BD%C3%A2%02%19%C2%9B%C2%A7%C3%A4%C3%A4dR%C2%A7%60%C2%81%C2%AF%0C%C2%AE%C2%BD%15%C3%85z%C3%A5%C2%95W%C2%88%C3%A8%09l%C2%B0Xkf%C2%88%C2%B7%0EWE%C2%B8%18%C3%A2%C2%BC%C3%8B%C3%B0%157J%C3%89%C3%A2%C2%82%0C%C3%8E%C2%BB!_%C2%91%60%C3%B3%C3%B4_%22%C3%B2E0%C2%A7%C3%BFN%11%C3%A7%5Dl%C2%AA!N%C3%A9%C2%A9S%C2%A72%C3%8FW%06%C3%97%C3%9EJVH%C2%90%C3%84%C2%9Fy%C3%A6%19%12!a%C3%B0%C3%B8%15v%08%C2%91%C3%94%C3%91%C3%A3%C2%91%0E%1D%3A%C3%B0W%08%3E%C2%82%C3%A2%C2%84%C3%A7%23%C2%B5D%C2%BCg%C2%94%C3%A1%C2%AB%C3%B9%C3%9Aj%C3%95%C2%AA%C2%91%C2%B3%06%04%C3%A7%1D%C3%A1%3F%1FC%C3%88%C3%B0%15%09%C3%A1%C2%9A~%7FE%C2%BE%24%C3%B7%14%09%C3%86%C2%89%60%08%C3%B4%C3%A8%C3%91%C2%83%C2%A4%C2%9Fb%7F%09%C3%81L%C2%92%C3%BAf%0B%7C%C3%89%C3%90%C2%B8-%C3%86B%C3%8A%C3%83%C3%A3%C2%AD%1F%3BvL%C2%BC%07%C2%813%C3%81%5B%C3%87%C3%B0%C2%B0i%C2%8A%08c%C3%BB%C3%B6%C3%AD%04o%5D%C2%B3jO%C3%84yW%C2%AB%C2%93%C3%8B%C2%97%2F%2FVi%12%C2%BE%C3%93%C2%A6M%13c%C2%8E%C2%ABW%C2%AF%C3%96%C2%AD%5B%C3%97%C3%8FI%C3%AC%23.%C3%BA8%C3%AF%C2%88%C2%84d%C3%B8%12B%C2%98%C3%9F%C2%BBwo%C2%9D%C3%BE%12%7CyW%C2%B5bb%C2%B1%C2%89%0E%C2%AE%C2%BDf%7FE%C2%82%C2%BB%2C%5E%C2%BC8%C2%AC%1D%C3%AC%C3%90%C3%B0%C3%A1%C3%83-%C3%B0%C3%95%2FKq%C3%A9%0A%C3%91%C2%B8%05%0B%16%20%16%C2%81%C2%94%5D%C2%AD%20%1F%3E%7C%18%22%C2%86%C3%B4%11L%C2%B0%2B%C3%88%C2%A7%C3%80%C2%B2g%C3%8F%C2%9E%7B%C3%B6%C3%ACa%C2%92%C3%AD%C3%9F%C2%BF%3F%22h%C2%BCG%3D%C2%A0%0D%15D%C3%A4%C2%A4%1ERC%C2%8A%C2%B7%7B%C3%B7%C3%AE%C3%BF%C3%BC%C3%A7%3FlcX%C2%93%2F%C3%82%26d%C2%85%C3%AA%C2%9E.%C3%AE%C3%B9%C3%B5%C3%97_%7F%C3%B9%C3%A5%C2%97%C2%94%C2%94%14%C3%8D%C2%86%C3%A1%06%C2%91%2F%C2%A1%C2%8D%1B7%C2%86%3AI%C3%BD%C2%AA%20%C2%B4%C3%AD%C3%A7%C2%9F%7FVg%08%C2%8C%3F%2C%0A%5E%02%C3%A5%60e%7D%C2%86%7C5I%C2%BF%C2%BF%22_h%C3%9B%C2%981c%10%C3%92M%C2%9C8%C2%91%C2%95%C2%98%1E9r%04f%09%11%C3%AA%C3%A2%C3%85%C2%8B%C3%95%C2%B6A3%18%1A%C2%A5%2B9%C2%8B%C2%9B%C3%A8%C2%9D%3Au%C3%AA%C3%9C%C2%B9%C2%B3%C2%BAi%C2%8D%C3%B7%23~%C2%87Ye%05%01%3C_W%C2%A7Z%08_%2B%C2%8A%C3%85%C2%9F%C3%B8Cny%C3%B9%C3%B2er%03%C3%81%5B'%C2%B8%C3%A7%C2%B0d%04%C3%B7%1C%C3%86V%C3%9C%C2%A8%C2%B7%C3%80%C3%97%C2%90%08%C3%8E%C2%BB%26%C3%9F%15%2BV%C2%A8%C3%BB%C3%90%C2%98%C3%A8%C2%9Ax%C3%AB%C2%BC%C2%93j%C3%9D%C2%BA%C2%B5L%15o%C3%A6%C3%89%02%C3%8E%C2%BBd%7F%C3%B9x%0E%C2%8A%3Ej%C3%94(%C2%BE%C3%9E%C3%A4%C3%B8%C3%B1%C3%A3%C2%BCk%C3%83%C2%8CrK%7F%C2%A9ba8%C3%89%C2%9E%06%C2%83%C3%8D%C3%A4%C2%89%C3%A0%C2%AD%C3%8B%C3%A0%C2%9E%C3%83b%C3%AB%C2%B7C%C2%86%C2%AFLm%0Fq%C3%B4%22_%C2%BE%C2%BEE%C2%91%C3%80%5Bg%C3%B5%11%C2%8FA%C2%B1%2C%C3%A0%C2%BC%5B%C3%A8oxx8%09%10%C3%89%C3%B1!w%C3%B5%C2%97.%C2%8E%C2%A1%C3%A9%C3%A4%C2%8B%C2%95%04%5D%5D%C2%BC%22%C2%83%7B%C2%8E%C2%99%C2%A4%1F%C3%AA%C3%89%C3%B05%24%113C%C3%A4K%C3%AE1%C3%84%5BW%C2%9CP%C2%B6%C2%8Fa%0B%C3%84%02%C3%8E%C2%BB%C2%85%C3%BE%26%24%24%C2%90%C2%8F%C2%9BbJgI%7F%C3%85E%0B%C3%B2I-q%1D%12%C3%A1%14%7FC%C3%9F%C2%BE%7D%C3%89%07%11%10x%C3%B1%C3%96%15%C3%8E%C2%91%7C%C3%B2Os%C2%B1%C3%84%C2%90%C2%AF!A%17y%C2%9CwM%C2%BE%C3%A4%C2%A3%20%C3%A3%C3%87%C2%8F'7%C3%84%C3%84%C3%84%C3%B0k%C3%BAp%16%C2%AEb%17%C3%B7%12%C3%A1%0BCB%3E%10%C3%97%C2%A5K%C2%97%C3%8C%C3%B7%17~%C2%80%3FCf%C2%B3%C3%99%C2%96%2CY%C3%82%C2%A7%C2%96%C3%AE%C3%AA%C2%AFF%C2%8C%15%1F%1F%0F%C3%9EH%C2%9A%C3%8A%C2%94)%C3%83%C2%87%20%7C.%C3%80%C3%A3%C2%ADc%06%C3%80%C3%9E%C3%80%3F%C2%A2%7D%C3%88%1DXmddd%24%C3%81%5Bg%C3%9ACV%C2%800%C2%9F%C3%94p%18S%07%11%03%C2%BCj%C2%85%0A%15%C3%94%237%22a%C3%A2%C2%92%00%C2%93%C3%87yG%C2%B0O%C3%B0%C3%96%C3%85%7Cm%C3%9C%C2%B8qh%182%C2%8F%0F%3E%C3%B8%40%C3%B3%C2%8C%10%C2%8F%C3%B3%C2%AE%C2%9E%08%C3%92%C3%A7%2B%C2%8A%C3%88UB%C2%AD%13%C3%BE%C3%B3%7C%C3%99Q%1F%04%C2%AF%22%C2%AE%3D%C3%89%0FD9%C3%AB%C3%B4%C3%97%C3%BE%C3%B0%0C%19%2Fg%04%5E%04_%3E%C2%AB%C2%AA%1B%C2%B2e%C3%8B%C3%86R!%C3%A6%C2%9E%60%3C%C2%AAW%C2%AF%5E%C2%B2d%C3%89%3Au%C3%AA%C2%B0%C2%AF%C3%BC%C3%B0x%C3%ABP%17%C3%BC%C2%8A%C2%B4%05%C2%83%C2%8A%C2%BF%C2%B2m%604%1AOaT%C2%90%24%C2%B2E%C3%A7%C2%95%2BWV%C2%AAT%09qC%C2%B3f%C3%8D%C2%90%0D%C2%B1%C3%A3.%C3%AC%C2%98%C3%91%C2%88%11%23%100B%2F%C2%A1%C3%87%C2%98sH9%C3%89J%3D%1F%C3%80%C3%A2%C3%8D%C2%98%C2%A6%C3%9D%C2%BAu%C3%83H%C2%83%3BB~%C3%BC%C2%8A%C2%8BljbTT%C2%BCu%C3%B1%C3%BB%1F%C2%8C%C3%BC%C3%BD%C3%BD%C3%91%3BLV%3C%C2%AEy%03%C2%8F%C3%B3%C3%8E%C2%BC%C2%BC!%C3%9F%C2%93'O6m%C3%9A%14%22B%04M%C3%B6%0C%C3%94%C3%A2O%C3%92_%7D%C2%BE%C3%8C%C3%AB%C2%A9%2Bj%C3%A0%C2%A8%C2%B9%0F%C3%88p%C3%ADy9%C3%AB%C3%B7%17c%1A%12%12B%C3%A4%C3%9C%C2%B0aC%C3%A4%5Bx%C3%89%C2%A6M%C2%9B%C3%9CV%20%2F%C3%AE%C3%90%C3%B1%C3%A1%1E%C3%BA%C3%B9%C3%AD%C2%B7%C3%9F%C3%B2%C2%9B%00%C3%B0qd%C2%BF%02%C2%AE%C3%90P%7F%09%1E%04%2C%22l2%7F%C2%85%C3%A0%1Ci%C2%92!%C3%8E%C2%BB%0C%C3%9E%3A%7C%C2%9F%3E_%C2%82%C3%B3.%C3%B6%C3%B7%C3%AF%C3%A2%2B%23g%C2%91%0C%C3%B9%3E%C2%A6B%3FX%60%C2%B2%C3%9B%400U%C2%A1%C3%B8du%1B%26%C3%94%10%C3%92%C2%83%C2%87%19fK%C2%82%C2%A4%C2%80%09%C2%99%C2%B6a%5B_%7B%C3%AD5R)E%C2%B6%C3%99%C3%A12%C3%88%C2%B4%C2%9E%3F%7F%3Ey%09Y%C3%AF%16%C3%B9~%C3%B1%C3%85%17%C3%BA%C3%BD%C3%BD%C2%BB%C3%B8%C3%8A%C3%88Y%24C%C2%BE%C2%8F%C2%A9%C3%90%0F%22%23i%3F%C3%99%2B%C3%B5%C3%B4%C3%B4%24%1Fu%C2%86%1F%14O(%10%222%C3%82%23%C3%A4%C2%88%C2%AD%C3%A1%C3%A7%C2%87%14%09%C2%9Cw%19%C2%BCu%C3%82H%C3%A4K%C2%B2q%C2%B1%C2%BF%7F%17_%199kn%C3%88%C2%98%C2%95sV%15%C3%BA%C2%A9%C2%A7P%C3%98%C3%9A%09%C3%82C%C3%9E9%C2%B6i%C3%93%06%C3%BE%C2%98o%C3%9F%C2%B4i%C3%93%0C%C3%B5%17%C2%819%C2%8F%C2%B7%3Ej%C3%94(%3E%10%C2%81%C2%8D%C3%94%C2%89%C3%96U%3Ar%C3%A4%08%2F%7D%04%C2%B6%C3%BC%C2%99*%C3%BCi%C3%AF%C3%9E%C2%BD%C3%BCY.%C3%8CN%02E%07Bx%C2%A1%C3%8F%17%19%3B%C2%BF%7D%26%C3%B6%C3%B7q%C3%B2%C3%A5%C3%BB%2B%23g%C2%91%0C%C3%B9%3E%26W%C3%88h%C3%AC%C3%98%C2%B1pU%C2%B5j%C3%95%C2%8A%C2%8E%C2%8Efj%01_%C3%96%C2%BCys%C3%B4%C2%8D%C2%AD%C3%91!T%C3%AC%C3%99%C2%B3'B%25%C3%B1%C3%B35%7C%C3%99%C3%96%C3%A6%C3%8D%C2%9B%C3%95%13%C3%AB%C2%A7N%C2%9DB%5C%C3%9F%C2%A2E%C2%8B%05%0B%16%C2%B0-%C2%ADu%C3%AB%C3%96a%3C%3Au%C3%AA%C2%A4%7FT%C2%9C%2C%09%C2%96%2F_%1E1%C2%9FZ%C3%AC%C2%81%C3%80%0B%11h%C2%8F%1E%3D%C3%98y%40dj%13'NDS%C3%87%C2%8C%19%23%C2%9Esgd%C3%88%C3%B7%C3%8A%C2%95%2B%C2%86%C3%BD%7D%3C%7C%C3%85%C3%BEJn%25%C3%BD%C3%BC%C3%B3%C3%8F%C3%88%C2%90%5C%C3%B1%C2%85%C3%9Ecbkn%C3%B2%C3%B2%C2%A2%C3%9E%C2%B6m%C2%9BN%1D%07%19_c%C3%85B%C2%9B%10%C2%8A%C3%82%14%C3%83%C3%A0%0F%1A4H%07%C2%B4C%C2%87%C2%BE%C3%BE%C3%BAk%C2%86%C3%BB%C3%A0%C3%A3%C3%A3ca%0D%C3%9D%C3%95vU%C2%97.%5D%C3%98%C3%A67B%C2%87%C2%AC%C2%83%C2%8EyB%C2%88%C3%B4W%C3%B3%C3%AC%1A!%C2%B3%C3%B8%C3%B2%C2%BD%7B%C3%B7%16%C3%87%C3%B7%C3%BA%C3%B5%C3%AB%C2%86%C3%B8%C3%B2%C2%86%C3%A3%C2%AB%C2%88kn%24%C2%A8%12%11%19%0D)**%C2%8A%1C%5C9p%C3%A0%40%C3%A6%05M%C2%BE%25)%C2%83%7B%C3%BE%C2%8F%26%0B%C3%BD%C2%B5%C2%80%2F%2F%C2%8E%C2%AF!_%C2%99%C3%B1%C2%A5%5B%3A%22%C3%BE%C3%B8%C2%AE%5D%C2%BB%08%C3%9E%C2%97!%C2%9D%3E%7D%C2%9A%C3%AC%C3%8F%C2%80%C2%B1a%C3%9D%C2%8F!%C2%91%C2%AFp1%C3%9Cs%C2%AB%1F%02%C3%81%C2%94JQ2n%2B%C3%B6%C2%BB%C2%8E%C2%9F%C2%8C%1BJF%C2%8A%C2%92%C2%9E%C2%A8(%C3%A9%C2%8A%C3%BD%C2%BEb%7F%C2%B8%C2%BEeOw%C3%BC%C2%89%C3%9Do%C3%B3S%3C%C2%B4%C3%90%C2%B0m%C2%BE%C2%8A-%C2%BB%C3%A3%06%07e8%C3%BE%C2%8F%2B%1Ey%15%C3%8F%20%C3%87%C2%8FG%C3%A0%C3%A3%C3%AC%C2%AF%26%C2%BE%3C%C2%BF%3A%2F3%C2%BE%C2%86%7Ce%C3%86%C3%97K%3CA%15%12%12%C3%82%160%C3%95%225%C2%B3%12%C2%89%C2%88%C2%88%C2%80%C3%B5%C3%A6%C3%97'E4%5B%0BT%C2%A1B%05%C3%BEc%1B2%C2%B8%C3%A7%C2%94%C3%AE%C3%AFS%C3%AE%C3%AER%C3%AE%1FRR%C3%8F(%19%7F*v(%C3%96%3D%25%C3%A3%C2%AES%C3%8F%C3%BE%C2%AB%3FV%C3%88%C3%86%3D%C2%A8.%3Bxx%2B%1E%C3%B9%14%C3%AFb%C2%8AOy%C3%85%C2%AF%C2%86%C3%A2%5BY%C3%B1.%C2%9E%C3%95%C3%BD%C2%95%C3%84%C2%97%C3%97%1F_C%C2%BER%C3%A3%2B%C2%9AS%1E%7F%C2%BCY%C2%B3f%C3%96%C2%B0%C3%A7%C2%A6L%C2%99%C2%A2%C2%B2%C3%A8%C3%93%C2%A7%C2%8Fa%C2%91%C2%B8%0C%C2%B1%C3%83%14h%1B%C2%82%C2%83%C3%B0%C3%B0p%19%C3%9Csn3e%C2%85%C3%BDJ%0D%C3%BBy%C3%85%C3%BE%C2%87%C3%B3%C3%A7%C3%9C%C3%83%C2%9F%C3%B3Y%C3%B9%C3%83X0v%17%C2%B2%C3%99c%1B%C3%99o%C2%AF4%C3%95_%0B%C3%B8%C3%B2%C2%88%C3%BD%C3%A1%C2%A7l6%1B%1E%C3%91%C3%BC%00%C3%91%C3%92%C2%A5K%11%3D%C2%B3%C3%B3%26%C2%ADZ%C2%B5%12%C3%87W%C2%86%C3%AF%07%1F%7C%C2%A0%C2%9E7%C3%A9%C3%9F%C2%BF%C2%BF8%C2%BE%C3%9A%C2%A0%20%04%7F%5C%C3%92n%13%C3%BCqdR%C3%87%C2%8F%1F%2FU%C2%AA%C2%94%26%24%C2%A6%C2%A2%C2%85%7B%C2%8E%C2%BC%01%C2%A1e%C3%A1%C3%82%C2%85%C2%91%C3%82%C3%A4%C3%8B%C2%97%0F%C3%8DE%C3%90%C2%80%20%C2%BDR%C2%A5J%C3%AD%C3%9B%C2%B7G%3E%01%23%C3%9C%C2%A1C%07%C3%98%C3%B3%C2%8F%3F%C3%BE%C2%98e%C3%B8%C3%BA%C2%B8%C3%A7N%C3%AF%C2%94%C2%A4%24%C3%B6Wn%C2%AFt%18%C2%95%C2%BF%C3%B7%7C.%C3%BB%C2%A0I%C2%8EW%C2%94%C2%A0%C2%B9%C2%8AW%11%C3%89%C2%92%07S8%C3%AF%C2%AC~%C2%A1c%C3%87%C2%8E%18%C2%BEw%C3%9F%7D%C2%97%01%C2%9F%C2%8Ar%C2%9E%3E%7D%3Ar%C3%98%17_%7C%11%C3%97%C3%85S%C2%BE%C2%92%7C%C2%87%0D%1B6o%C3%9E%3C%C2%BC%13%09%C2%B2x%7C%C3%9C%3D%07V%0D%C3%B1%C3%875%C3%8B%1Ay%C3%9Cs8r%C3%A8%C2%8A%C3%9A*h%C3%92%C3%A5%C3%8B%C2%97%C3%B9%C3%A31%23F%C2%8C8%7B%C3%B6%C2%AC%C3%BA%1D%03%3F%3F%C2%BF%C2%8D%1B7%C2%A2%C2%AB%06%7C%C3%93%C3%A2%C3%AC%C2%97%C2%9Ew%C3%98%C2%8C%C3%8C%18%C2%9E%0B%C2%8F%C3%BEd%C3%92%C2%8C%C2%A11%17K%C3%9A%1F%C3%BC%C2%91%15r%C2%86%C2%8FSc%1D%C2%98%C2%939s%C3%A6%C3%AC%C3%9F%C2%BF%C2%9F%C3%88y%C3%A6%C3%8C%C2%99j%C3%A8%0D9'''%C2%9B%C3%A5%7B%C3%A1%C3%82%C2%85!C%C2%86%C2%A8G9%C3%A0%C3%96D%C2%8B%C3%A5%06%C3%85%C2%92%C3%84%1F'Dp%C3%8F%C2%91N%13XJ%C2%B2%C2%A5%0A%C2%93K%0E%C2%BF%C2%83)%C2%99%C2%B2%1A%7C%C2%AF%C2%BElN%C2%AB%C2%A07%17%15%C3%BB%15%C3%85~U%C2%B1%C3%87)%C3%B6x%C3%85%1E%C3%AB%C3%BC%C3%B5%C2%92%C3%B3%C3%A7%C3%B2%C3%83%3F%C3%85%3B%C3%BFz%C3%95%C3%B9k%C2%8Cyms%C3%A8V)%7B%C3%9A5%C2%B7%C3%8B%C3%B9%C2%A3%C2%8F%3E%225%C2%98%C3%A4%C3%A4%C2%96(g%C3%A8%C2%99Y%C2%BE%C3%95%C2%ABW'%26JD%C3%AAr%C3%83%C2%870%C3%AF%C3%9D%C2%BB%C2%97%C2%94%C2%94%C3%84_%C2%B9x%C3%B1%C2%A2%C3%A1Sqqq%C3%BC%C2%AF%C3%B0wd%C3%83%7F%C3%9F%C2%BE%7D%C2%A4%C3%BA%C2%8C%C3%BF%10%0B%08%C3%B3%C2%86%C2%BC%C2%93%C3%B2%C2%BD%C3%B5%C2%A5r%7B%C2%A3%C2%AC%C3%BB%C2%83%24%20%C2%AB%C3%BBJ%5C%C2%ACG%C3%8C%15%C3%AF%C2%84k%C2%9Eq%C3%97%3C%12%C2%92%C2%BC%C2%AF%C3%BFi%C2%BB%C2%99%C2%A2%C3%9C%7F%C3%A0%C2%95%C2%91a%C3%B3%C3%B4%C3%88%C3%B0%C3%B3K%0F%C3%88%C2%AE%04%C3%A6%C2%B2%07%C3%A7M%0D%09%C3%8E(%C2%98%3F-%C2%BCHj%C2%AE%20%C2%BB%C2%82%C3%99%7B%C3%AF%C2%A1%C2%B33%244%C3%A9%C3%BE%19%C3%A5%C3%BAX%25h%C2%8E%7B%C3%A5L%C2%AA%C3%B6%C3%A0%16%C2%AF%5D%C2%BB%C2%A6%2Fg%C3%83%C3%81%12%C3%B9%22%C3%B7%24Y%C2%A1X-%C3%A8%06%C2%8B%25%C2%89%3FN%C2%88%C3%A0%C2%9Ec%C3%B2%C3%95%C2%AD%5B%C2%97%C2%BF%C2%82%C3%B0%C2%90Oq%C2%8B%16-J%0A%22%10x%22%14s%C3%897%C3%A3%C2%AE%C3%BDb%C2%B8lx~I%C2%B9q%C3%9C6%7FR%C3%8E%C2%96%0D%0AD%14%0E%0D%C3%88%1E%C3%A1%C3%A3%05%C2%9F%C2%8BiZ%C3%92%C3%95%C2%8FM)%C3%A1%C3%AB%5D%3C0%20%C2%A2%5C%C2%89%22%5D%5B%06%C2%AF%C3%BA%C3%8C%3F%C3%B5%0F%C2%A7%C2%B53a%C2%BA%C2%BC%C3%AD%C3%B7O%C2%B8W%C3%8E%C2%A4b%C2%A7J%C2%95*%04%C3%A2V%C2%94%C3%B3%C3%9A%C2%B5k%C3%8D%C3%B2%1D7n%1C_6%C2%AD%C2%89k%C3%AF%C2%9E%18%C2%8B%C3%A0%C2%8F%C3%8B%C2%9C(%C2%BAu%C3%ABV%C3%AB%C3%96%C2%AD%C3%A1%C3%A0%C3%BC%C3%BD%C3%BD%C2%BBt%C3%A9%C2%82t%06!%14l%2C%7C9t%C2%88%1D%1CX%C2%B6lY%C2%B1b%C3%85%C3%A0%C3%8B%11f%C3%AE%C3%9A%C2%B5%C3%8B%C3%AE%3Cp%C2%A1%C3%A2%C2%BC%C3%83%C3%A6%25%26%26%C3%82c%C3%82%2C%07%04%04%20%08%7B%C2%84%C3%AF%C3%AD5%C2%B2ZuQ%C2%89%C3%99%C3%A3Y%C3%AD%C3%B9B%C3%90%24O%5B%09%3F%C2%9F%C3%A2%5E%1E%C3%B8%C2%B7%18%C2%94%C2%A6%40Px%C2%91%02a%11E%C3%82%C2%9E%C2%89(Z%C2%B6x%C2%91R%C3%A1%C2%A1%C3%A1%C2%85%C3%83p%C2%A5%40%C3%9E%C3%B0%C3%9C9%23%7C%C2%BD%C3%BFR%3E%0F%5B%C2%89%C2%8E%C3%8D%C3%B2%C3%9F%3Ee%C2%B3G%C2%9Bq%C2%88%C3%89%C3%AFdF%C3%8E%C2%9A%C2%B9%C3%B6%C2%8C%193T%5C%7B%C2%B6%C3%A0%C3%84%C3%A3%C3%8B%C3%83%C3%BC%C2%9C%3Au%C3%AA%C3%99g%C2%9F%C3%B5%C3%B2%C3%B2%0A%0E%0E%C2%96%C3%9C%7F%24%7Cqe%C3%A7%C3%8E%C2%9D%C3%BA%C2%B8%C3%B6%16%15%C2%8B%C3%87%3Dg%1B%7F%04%7F%1C%C2%A3%C3%9E%C2%B7o_%C3%B0%C2%86%C3%B6DFF%C2%B2%C3%AD64%0E%3E~%C3%B0%C3%A0%C3%81j%C3%B9GTT%C2%94%0Ac%C3%8C%20%1B%C3%91%C3%BA%17%5Ex%C2%81%15%7FFGG7i%C3%92%04j%C2%84LD%C3%9D%C3%96%C3%A5q%C3%9E%C3%95R%1F%0DT%C3%B4%C2%84%1E%C2%B2%C3%91U%C2%BC2e%04%C3%82%C3%9B%C2%92%01%C3%99%C2%8B%C3%A5%C3%88V%2C%7F%C3%9E%C3%B0%C2%B1%03s%C3%BD%C3%BC%C2%8D%C3%9F%C2%89M%C3%9E%C2%97%C3%B6x%5C%3F%C3%AA%C2%91r%C3%92v%C3%BF%C2%B4-%C3%B5%C2%8Cr%C3%AFw%5B%C3%8Ao%C2%B6%C3%A4%23%C2%B6%C2%8B%C2%BB%3C%C2%8Em%C3%B0%C3%99%C2%B00%C3%9B%C3%94%7F%C3%A5j%C3%B3r%C2%81B%C3%B9%C3%83%C2%A0%C2%8EP%C2%B2e3%C2%B3%3Bb%2F%C3%B9%C3%85%C2%88%C3%8B%C3%8F%C3%9B%C3%AD%C3%A9%C2%99%C2%91%C2%B3H%3C%C2%AE%3D%C3%93%3C%11_%1E%C3%97%C2%A1s%C3%B1%C3%B1%C3%B1%C2%96%C3%B9%1A%C3%A2%C3%9A%2B%C3%96%C2%B4%C2%8A%C3%B8%2C%1E%C3%B3%0E%C2%86q%C3%83%C2%86%0D%C3%BCii(5L4%C2%BFQo%C2%88%C2%B7%C2%8E%3El%C3%9D%C2%BA%C2%95%C2%8F%C3%8D5q%C3%8F%5D%C2%9Bo%C3%B8%C3%81%12%C2%B2%16%C3%AB%C2%AA%C2%B2%C3%BC%C2%93%C3%ACP%0B%C2%B8%3F(%16%0CU%C2%AD%C3%8A%C2%85%C2%BA%C2%B7%0A%1E%C3%9E%23%C3%AF%C2%84%C3%81%C2%81%1F%C2%BD%1D8%7FR%C2%8E%C3%85%C3%93%C3%BD%C2%BE%C2%9D%C3%A1%C3%B7%C3%B54%C2%BF%C2%B9%C3%AF%C3%A7%C2%9C%C3%B6V%C3%A0%C3%B8A%C2%81C%C2%BA%07%C2%B5%7F%25%C3%BF%3B%7D%03%C3%AF%C2%9FWv%7C%C3%AB%07%03%06%C3%95%1C%C3%909%C2%AF%23%C2%A2%C2%97%C3%B7%C2%86Q%01%C3%B6%C2%B4X%C3%8Br6%C3%84%C2%B5%C3%87%C3%9C%26e%5E%C2%9A_N%C2%B40%C2%BE%C3%BC7%2B5q%C3%AD%C2%AD(%16%C2%81%C3%8D%60f%C2%96%C2%BF%12%12%12B%60%05%C3%B8%C2%9A%19E%0Eo%C2%9D%3C%C2%A2%08%C2%B8%C3%A7z%C3%B4%C3%A0%C2%B4%C3%BD%C2%82%C2%97%7C%26%C2%98%11%C2%A5%7C%3A!%C2%A0txQ%3Fo%C3%8D%C3%90%C2%AA%C2%84%C2%87R%C3%9C%C3%93V%1C%C3%BF%3E%C3%BAW%C3%84%19%25%C2%8E%C2%AD%C3%B7F%C2%88V%C2%B9%3CZ%5B%C2%B2%C3%BEK%053%1C%C3%AA%22%C2%AF%5B6%C3%BB%C2%BD%C2%83%C2%96%C3%A5l%C2%88k%C3%8F%C2%9C%17%7FE%C3%84%C2%97w%C3%8B%C3%B8%C2%8A%2B%C2%B1V%C2%B2B%C2%BB%C3%B09g%0B(%C3%B5%16%C2%A0%C3%92MpI%3D%C2%ADd%C2%A4)%C2%92%C2%B7%C3%9B%C3%B1fe%60%C2%9F%C2%9B%1D%C2%9B%C3%9F%C3%9E%7F%C3%94w%C3%AFa%C2%BF%C2%B3Q%C2%BEq%09%C2%9E%C3%B1I%C2%9E%C2%B7n%7B%3EHUR%C3%93l%C3%A9%19%1Ev%C3%87mv%2F%C3%8F%0Co%2F%C2%BB%C2%AF%C2%8F%C2%92%3B%20-o%60%C3%86%C2%8B%15%C3%AE%15%C2%8FHS%7C%C2%94%C3%A7%C2%9E%C2%B9w%C3%B0%C2%84%7F%7C%C2%92%C3%97%C3%AD%14%5B%C3%8E%5Cv%C3%99%C3%B40%C3%83%C2%AE%C2%A4%5DP%7C_%C2%B0%26gCHz%C2%BB%25%00z%C2%B7%C2%8C%C2%AF%15%C2%8BEp%C3%8Fa'y%0CY%C3%BC%C3%A9%C3%87%1F%7F%C3%A4%C3%8Fr%C3%81%C2%A3%C3%81%C2%AF%C3%B1U%C2%97%C2%86x%C3%AB%C3%B0%C2%9B%C3%B0%C2%9E%C3%BC6%16%02%2F%C2%99%C3%A3%C3%94%0F%2B%3F%C2%A6%C3%88%06X%C3%91%C3%8E%C3%A5(%C3%B6sM%C2%B1_W%C3%ACI%C2%8E%C3%95%C2%A9%C3%B4%3F%C2%94%C2%A4%C3%83%1E%17vx%1D%C3%BB%C3%89k%C3%AFj%C3%9F%1D%C3%8B%C2%B2m%C3%BB%C3%8E%1F%C3%BF%C3%AE%5B%C3%ADs%7C%C2%A3W%C3%8C.%C2%AF%3F%C2%8F%C3%99%1C%C2%AE6%C3%96%C2%B9%C2%BE%C2%95%C2%A4%2C%C2%98%C2%9C%13yb%C3%9E%5C%11%C2%BFo%C3%B1%C2%B2'K%1B-4%C3%B2%C3%8F%C3%A9%3Ar%26%C2%B9%18%C2%91%C2%B3!%C2%AE%7D%C3%97%C2%AE%5D%11%60%C3%B1%2F%11%C3%B1%C3%A5%C3%8D%C3%B2%C3%B5%C3%B0%C3%B0%20%C3%A3%C2%8B%C3%A8M%C2%8Cq%C2%AD%07%C3%AF%C2%88%C3%A3%C2%A0%2B%C2%AC8%1Fj%C2%81(%0F%C2%B1%1E%22%3E%C3%96%5BpB2%C2%82%C3%AC%C2%A3C%C2%87%0E%C2%AC%16l%C3%9B%C2%B6mH%C3%A5%C2%9E%7B%C3%AE%C2%B9%C3%91%C2%A3G%C2%AB*%02%C2%87%08'%C3%88%C3%97%12!%C3%AA%C2%84%C2%B9F%04%C3%8A%C2%A2r%C3%84%C2%86%C2%88%10%11'%C3%8A%00Q%C3%BCE%C3%97%06J)V%C2%8C%C2%92r%C3%8A%06%C2%9D%18%C3%9E%23h%C3%A2%C3%90%C3%80%C3%AF%3E%C3%8E%C2%B1%7F%C2%B5%C3%8F%C3%A5%3D%C2%9E%C2%B7%C2%8E%C3%9B%C3%92%C3%98%C3%9AA%C2%BCS%C3%8F%C2%A0m%7F%3E%C3%BCa%C2%9A%C2%97%C3%A8T%C3%84%18%25%C3%AD%C2%AC%C2%82%C2%9B%13%C2%8Ey%C3%8Cz7'B4%C3%A4%C2%89Mk%C2%85lX%C2%94%C3%8D%C3%B1x%C2%8C%C2%9Cb%25%C3%B6%C3%97%C3%A9%C3%87%C2%8A%15%2B%20%01L*%C3%88%C2%99E%C2%A5%13'N%0C%0C%0C%2CY%C2%B2%C3%A4%C2%BF%C3%BF%C3%BDoW%05z%C2%B8%1FN%10%C2%99%10%03%C2%9E%C2%802!B%C2%ADV%C2%AD%C2%9A%1A%60%C2%A5%C2%A5%C2%A5%C2%91%C3%A0%1D%C3%A2%C3%850%C2%A9'%C3%8Ct%C3%B8%C2%B2%C2%ADCq%7C%C3%9D%C2%A0X%C3%88)%C2%A0%C3%85*%C3%AE%C2%B9%C3%A4%C3%97%065%C2%AB%C3%98%C2%A0F%C3%99%C2%B3gG%C3%A6%08%C2%ADBW%09%C3%9E%C3%BA%C3%AA%C3%95%C2%ABa%C2%B4%C3%A0%C3%8E%C2%91%5Dj%1E%C2%9AsIq%C2%AD%C2%8C%15%2BZ%C2%B9s%C3%86%C3%96%C2%A6i~5l%C3%B2%C2%B4%C2%95%08%C3%88%1E%11V0%C3%B4%C3%99%C3%92EjV*%C3%BCJ%C2%9D%02%C3%AD%5E.%C3%B0f%C2%9B%C3%A0%C2%A1o%C3%A4~%C2%A7_%C2%AE%C2%B1%03r%C2%8D%1B%C2%98kL%C2%BF%5C%23z%C3%A4%C3%AA%C3%9D%3E_%C3%87W%0B4%C2%AFW%C2%A0%C3%8E%C2%8B%C2%85*%C2%96)R%C2%BCHh%60%C3%8E%08%04%C3%BE%C3%BE%C2%BE%C3%85%3Dl%25%10%C2%8D%C3%A1%06%C2%B88c%C2%BB%C2%85F%C3%86w%C2%92%C3%AF%162b%C3%84U%10%7B%C2%BE%7C%C3%B9F%C2%8E%1C%C2%A9Y%C2%9E%055%C3%92%C3%87%C2%B5%3Fv%C3%AC%C3%98K%2F%C2%BD%04%C2%A9b%04'O%C2%9El%7F%14%C3%97%5Es%C3%8B%C2%99%C3%B0%C3%95%C3%BC%C3%BE%C2%99%1B%14k%C3%96%C2%ACY%C3%A4%2C%C2%97%C2%85%2F%C3%83%C2%AA(%C2%B4%C2%8C0%C2%BD%C3%88%07%0D%09%C3%9E%3A%02F%19%C2%84%C3%82%C2%87%3B9%C2%8D%C2%8C%15%2BNY%C3%A1L%06%C2%B3%C3%B9%16%2F%14%1CV%C2%ACHhv%C2%BFb%C2%9A%C2%91%C2%BB%C2%8B%1F%C2%BA%5E%C3%AA%C3%AF%5B%2C4%24%2C(%C2%B7c%7D%C3%8B%C3%8B%C2%B3%C3%B8%C2%A6%C2%AF%C3%BC%C2%8C3D42%C2%AE%C2%A5%C3%BC%02)L%3E%2F%22%C3%B1%C3%B3tk%C3%97%C2%AE%C3%A5o%C2%B0%C2%80k%2F%C3%8AY%C2%86%C2%AFHV%C2%82w%C3%A2%C2%83%C3%A1%C3%A3%C3%A0%C3%9A%C3%8C~f%C2%87%7C1k%C3%B6%C3%AC%C3%99%C3%A8%00%7Fe%C3%AC%C3%98%C2%B1%3C%C3%8A%C3%80%C3%95%C2%ABW%C2%91K%C2%93c%C3%B8%C2%AE%C2%83%C3%A2%3B2%C2%91%C3%BB%C2%BE%C2%A3%10%C2%A8%C2%ADP%C3%B0%C2%83%1F%C3%A7%C3%87%C3%A6%0FN%C3%BF%C3%AD%C2%B4%C3%8F%C3%89%C2%B3%C2%BEW%C3%A2%3D%2F%C3%87y%5E%C2%8C%C3%B5%C2%BEq%C3%93%C3%B3%C3%AE%7D%C3%9B%C2%BD%C3%BB%C2%9EiiJz%C2%86%C3%82%22Z%0F%C2%9B%C2%82%7C%08%C3%B9%C2%AB%C2%9Foz6%3F%7B%C3%9E%C3%9Ci%C2%A1%C2%85%C3%92%0A%15H%2B%18%C2%9C%5E%C2%AC%C3%A8%C2%83%C2%B2%C3%8F%C2%A4%C3%BEq%C3%9E%C2%BB%C3%B3%C2%B0%02%C2%97%C3%A3%7Dv%1F%C3%B2o%C3%B2%C3%B2%3D%C3%A3B%C2%AE%C2%8C%1B%C2%92%12%C2%83%C2%90%7F%C3%BD%C3%B5W%C2%B2C%C3%97%C2%ABW%2F%C3%BE%0A9%C2%BFy%C3%A8%C3%90%C2%A1%C3%A8%C3%A8h~%C2%95%3C%26%26%06f%C3%8C%C2%94%C2%9Ce%C3%B8j%C3%AE%C2%90%C2%99%26%C3%BE%2B%0C%C2%AC%C2%9AL%0AF%C3%B7Q*X%C2%B0%20%3BT%C3%8D%C2%A8L%C2%992%C2%98(%C3%BC%06b%C3%95%C2%AAU%C2%89%C2%984%0B%3C%2C%C2%92%C2%87%C2%A3b%C3%B4%C3%B8i%C3%87N%C3%AA%C2%8B%C3%8F%C3%9D-W)Uy%C2%A0%C3%94-x%C2%AFn%C2%83%7B%C2%8E%C3%AA%C2%9A4%25%C3%A3%C2%9E%C2%92r%C3%97v%C3%A7.%14%C3%8B%23%15%C2%89a%C2%BAb%C3%8F%60%C2%A1%C2%AB%C3%A2%C3%A5%C2%A9%C3%B8%C3%B8%40%C2%B12%C2%B2g%C2%B3%C3%BBg%C2%B3%C3%9B%C3%BC%1EJ%C3%91%C3%AE%C2%A8%3F-X%24%C2%BDB%C3%A9%07P%C2%AC%C3%A3%C2%A7%7D%C3%AC%C3%B7%14%C2%9B%C2%87%C3%91%06%C2%A2%C3%BD%C2%81d%C2%93%7D%7D%7D%C2%83%C2%83%C2%83%C3%B9m%3BqE%C2%86%0C%C2%8D%2B%5C%7B%C3%84!%C3%B2r%C2%96%C3%A1%C3%AB%C2%9E%C2%AC%C2%90a2%C2%B3%C3%87%C3%A1%C3%8B%C2%97%2CYb%C3%A1%25%7B%C3%B7%C3%AEU%C2%97%C3%B2%C3%90U%C2%84%C2%9C%3C%C3%88V%C2%A5J%C2%95%08%C3%9Ez%C3%9F%C2%BE%7DMT%C2%B8_%C2%A9i%C2%B0%3AzQ%C2%B9v%C3%88%03%C3%AE%C3%8F%C2%B9%C2%AA%C2%99%C3%87%11%C2%95%C3%87%3DL%C3%B1.%3A%C3%A3n%C3%B6s%C3%B1aQ%03%C3%BFsI%C2%B8-%C3%86y%05%C2%8F'8%C3%BEmT%C2%A3%20%5E%5B%C2%AED%C2%91%C2%9B%C2%916%C2%83%10%1E%C2%8D%C2%BCRS%5Eh%C2%ABV%C2%ADR%C3%A70%C3%A2!%C3%B18Irr2%7FBU%13%C3%97%C2%9E%C2%AF%C2%80%C2%90%C2%943%C3%B8%C2%AA%C3%AB%00%C2%A1%C2%A1%C2%A12%C3%87Xd%C2%BF%C3%BE%05%7Fw%C3%A6%C3%8C%19%04%C3%91%08%09Ye%C3%81%C3%8A%C2%95%2B%19%C3%B2%C2%9D%14%22%25%C3%A6mF%C3%86%C2%86%0D%1B%10%C3%A9%23%C2%96b%C3%A5f%C2%88%22%11%13%C3%A0z%C3%87%C2%8E%1D%C2%99%C2%B9%C2%86%C2%8D%C3%9D%C2%B5k%17%C2%B4%C2%B6%7B%C3%B7%C3%AE%C2%B9r%C3%A5B%7C%C2%80%C3%BF%C3%A0%1E%C3%B4v%C3%A6%C3%8C%C2%99l%C2%A7%1D%C2%BF%C2%A6%C2%A4%C2%A4%C3%94%C2%AAUK%C2%AD%C3%8D%C3%92%C2%A0%C3%98%C3%AA%C3%8A%C3%9D%C2%BDz%C3%9E%C3%90S%C2%B9%7B%C3%87V%C2%A3M%C2%A1%C2%A3'%C2%B3%C2%85%15J%C3%AD%C3%9A%C3%BAF%C2%B1%C3%90%C3%94%C2%A2!%C2%A9%C2%85%0B%C2%A4%C3%A7%0A%C3%88%C3%B0%C3%B7%C2%B3%C3%83%C3%8D%C3%99%7C%C2%9De%08%C2%B6%C2%87%3F%C2%8F.%7D1%C3%BB%C2%A4%C2%A4%C2%A2I%C2%B6%C2%BB%C3%B7l7o%C3%9Bb%C3%A3%3Dcb%C2%BD%C3%B7%1D%C3%89%C3%B6%C3%9D%C2%9A%C2%80%3FozV%C2%AEpg%C3%87%C2%8A%2B%C2%BE~%C3%8E%C3%9B%5C%2F%C2%A1)~%2F*%C2%85%C3%B6%C2%AB%0C%C2%88%C2%9CEB%C2%A0%C2%8Dx%14%19%C3%BE%C2%B2e%C3%8BJ%C2%97.%C3%8DJ%C3%B0%C3%A0%C3%B2J%C2%94(%C3%91%C2%A0A%03%0C%7Fbb%C3%A2w%C3%9F%7D%C2%87p%1B%C3%AE%0C%C3%89%C2%90%C3%A6K%2C%C3%88y%C3%A7%C3%8E%C2%9D%C3%88Cs%C3%A6%C3%8C%C2%89d%C2%90%C2%9C%C2%A4%C2%B5h%C2%B1%08%C3%9E%C3%BA%C2%94)S%2C%C3%98'%C2%82%7B%C2%8E%C2%9E%C3%8B%C3%B0%C3%AD%C3%9F%C2%BF%3F%C3%81%5B7%C3%84yg%C3%99%C2%B4%C3%BDR%05%C3%A3%C3%BD%C2%9C%C2%AB%C3%8A%C2%9C%09%01%C3%8EU%C3%B5%12l%C3%BB%19%C3%81%7B%C3%81%7C%C3%A1%C2%A5%23%C2%8AV%C2%A9P%C2%B8Q%C2%8D%C2%90%C2%B6M%0B%C3%B4%C3%AB%C2%98%C3%A7%C3%9D%C3%BE%C2%B9%3F%1C%158kl%C3%A0%C2%A7%C3%A3s%C3%A3%07%C3%BF%C2%9962p%C3%AC%C2%80%C3%80%C2%81%5D%C3%B2tx%C2%B5%C3%80%C3%8B%C2%B5%0AT%7B%C2%BEp%C2%B9%12E%C2%8B%14%08CF%C3%A9%C3%ADY%1Co%C3%B3%C3%B2p%C2%BC%C3%B0%C2%B3%C3%B19%C2%8D%C2%83w4%C3%B2RyG%C2%83%C3%A5%C3%A4%C2%8C%C2%94-%3C%3C%1C%C3%A9%1Bd%08QX%C3%83yw%C2%9F%C2%9C3%C2%97%15%C2%92J%0Ct%C3%89%10%C3%ACJ%24%C2%82o%C2%81%C3%94%C3%83%C2%B0p%C3%91%02%C3%8E%C2%BB9%C3%85%C2%8AR%C3%92%C2%A3%C2%94O%C3%9E%0D%C2%A8X%C2%B60%C2%B2B_%C3%AFb%1E%C2%B6%12%C2%BA%C2%A52z%7F%C3%B5%C3%B1*%C2%9E%C3%93%C3%9F%C2%B1%C2%87%C2%8D%7F%2B%C2%94%2C2%7Dt%C2%AE4%C2%99%C2%BD%1D%C2%87bU%60%C2%8Ae(g%C2%B7%C3%A0%C2%BC%C2%BBU%C3%8E%C2%99%C3%8B%0A%C3%8F%C2%9E%3D%C3%BB%C3%88fIj*%C3%BC%C2%A0%C3%99S7%04%C3%9A%1F%C2%A9G%7C%7C%3C%C2%89%2B%C3%B5%C3%B9B%11%7F%C3%BA%C3%A9'R%C3%A8w%C3%A7%C3%8E%1D%C2%AB%C3%87%C2%BF%1C15%22%C3%B1%C3%81%C3%BDn%C3%B6%C3%AEx%13%5E%2C%C3%BA%C2%B2w%5C%C2%A2W%C3%B4%15%C2%AF%C3%988%C2%AF%C2%98X%C3%8F%C3%84%24%C2%9F%3B%C3%B7%C2%94%C2%BB%C3%B7%3C%11%C2%B9%C2%A7%C2%A5%3B%C2%B2%C3%82%C2%8C%C2%87%C3%81%3B%C2%8B%C3%9F%C2%BD%C2%9D%C2%89%C2%A1%C2%BF%C2%9F%12%C2%94'-_%C2%9E%C3%94%5D%C2%87r%C3%84_%C3%B3%C3%82%C2%9D%C2%93%C2%86%25%C3%B4%C3%AFu%2B%C2%BB%C2%BF%1D%C3%99%C2%80%C3%AC%C3%86%C2%8E%C2%9C%C2%9C%C3%A1%C2%98%C3%88%C3%89-x4%C2%82%C3%B1w%C3%AA%C3%94)Rne%C2%96%C2%AF%C2%BB%C3%A4l%C2%ACX%24%C2%84%C3%B2%C3%B1%C3%B1a%C2%AE%C3%9D%14%C3%95%C2%ACYs%C3%B6%C3%AC%C3%99%C3%BC%C2%89%22%C3%83%C3%AFc%C2%898%C3%AFm%C3%9B%C2%B6%C3%A5-%C2%9F%0C%C3%9E%C2%BA%C3%B1%C3%A9%C2%86%7B%C2%8A%C2%9F%C2%BF%12Q%3A%3D(%C3%90~%C3%A9jz%C3%87%C2%8E%C2%B7%1D%17%C3%AF%2B%0F%C3%AE)w%C3%AE9RB%C3%A7%5E%C2%A1%C2%82%C3%A1%C3%8B%C3%88%C2%B097R%C3%AC%5E%C3%8E%C3%A5%06%1FoGb%C2%88P%C3%8C%11L%C3%A7B%C2%98%C2%9C6vf%C2%BE%C3%80%C2%80%C3%B4%C3%A6%0D%C3%AEd%0F%C2%B0%2B)%C2%A6O%C2%92%19%C3%8A%C2%99%C3%A1%C2%AD%C3%B3k%3D%3Dz%C3%B4%C3%98%C2%B8q%C3%A3%C2%95%2BW%C3%94%2B%C2%868%C3%AF%C2%8FO%C3%8E2f%C2%8D%C3%87%5B%C3%97%3CQdH%04%C3%B7%C3%9C%C3%95v%C2%84x%C3%86%C2%88%C3%A0%C2%AD%1B%C3%A2%C3%8B%C2%9Bp%C2%85%C3%9C%12%C3%BC%C2%8D%C3%A3%C2%B6%C3%AA%15%0By%7B%15%C3%BFqnvG%60t%C3%81%C2%B9%C2%87%C2%A8f%C2%85%C2%97%1E%C3%8D%0D%C3%95%C2%940%C3%AAa%C2%B5%7B%C2%9C%C3%B2%C3%BE0L%C3%A8%C2%92E%0B%C2%84%5D%C3%99%C3%ABi%C2%A2%C2%8E%C2%94s%C2%85%C2%A4%C2%BF%08%C3%92%C3%85%C2%8E%C2%9D%3Cy%12I%1F%C2%BA%0F!t%C3%AD%C3%9A%C3%B5%C3%AE%C3%9D%C2%BB%C2%B8%C2%8D%C2%AD%20%22%3C%C2%9A%3Cy%C2%B2%C2%85%18%2B%13r6%19c%C3%89%C3%A0%C2%AD%5B%23%C2%82%7BN%C3%B0%C3%87E%C2%BE%3C%C3%9E%3As%C3%B3%C2%86%C3%B8%C3%B2V%14%C3%AB%C2%A2ru%C2%9F%07%C3%82%2CE)5%C2%AAW%1E%C2%83J%3DvT0*%C2%97%C3%BDJu%7Bb%0F%7B%C3%92(%7B%C3%A2%C2%9B%C3%B6%C2%A4%C3%AA%C3%BD%3A%17Q%C2%94%C3%A2%C3%A5%C2%8A%17%C3%BD%C3%B3%C2%A8%C2%87%C3%94.%C2%A1%C2%96b!%C3%85!%C3%B8%C3%B2%22-%5C%C2%B8%10F%05BP%C2%810%C2%A3%C2%A2%C2%A20Q%C3%95%C2%80%C3%AC%C3%BC%C3%B9%C3%B3%C2%83%06%0DB%C3%B85k%C3%96%2C%C2%B6p%20%C3%A2%C2%BC%C2%8B%C2%A9%C2%95%C2%A1%C2%9C%09%C3%819N%C2%9B6%0D%C3%91%C3%98%C3%88%C2%91%23a2%C2%A5%14%2B%C3%B3x%C3%AB2%C2%A4%C2%8F%3F%1E%1A%1Az%C3%BC%C3%B8q~%C2%93%C2%A7K%C2%97.%7B%C3%B7%C3%AE%C3%A5K%24%08%C2%BE%3C%C2%A6%C3%AC%C3%83%0F%C3%90%C2%A7%C3%9B%2F%3DkB%C2%B1b%C2%94%5B'l%15J%15%C2%85%C3%89%C3%A9%C3%BAZ%C2%90c9JS%03%C3%BEP%1C5%5E%C2%B1u%C3%AD7%3E%C2%B7%C2%A7%C2%9E%C3%83D%C3%A0'c%C2%8BW%C3%9B%2BJ%C2%A1%C2%AA%C3%8F%15%C2%BE%7FZ1Q%C2%9D%C3%8C)%C2%96%0C%C2%BE%3C%C3%86%C2%92%2F%00y%C3%98%C3%9FG%C2%8Ai%C3%B9%C3%95%C3%8B%C3%B1%C3%A3%C3%87C%C2%99x9%1B%C3%A2%C3%9A%C2%8Br%C2%B6%C2%86%2Fo%05%C3%A7%C3%9D-d%16%7F%5C%C3%84%3D%17%C3%B1%C3%A5%C2%BBu%C3%AB%C3%86%C3%AA%24%C3%AC%17K%C2%9BP%C2%AC(G%C2%91L%C3%B5%C2%8A%C2%8EJ%C2%BD%C3%865%0A%C3%BDW-%C3%B8%03%C3%93Q%C3%BE%C3%B6%C3%8B%2F%C3%98%C2%93%C3%9F%C2%B6%C3%9F%C3%BBU%3BcOM%C2%AF%C3%B6R3%C2%84%C2%8E%C2%8Dk%16t%C3%B8%C3%87(%2B%C2%8Ae%C2%88%2F%0F%C3%87G%16%C3%96%1F%C3%B6%C3%B7%C2%91%C2%A0%C2%85%C3%94%C3%A8%C2%85%C2%85%C2%85%C2%91%60%C2%97%3C%C2%92E%C3%B8%C3%B2Vp%C3%9E%C3%9DBf%C3%B1%C3%87E%C3%9Cs%11_%C3%BE%C2%BFM%C2%B5%C2%A79p%3EL%C2%84%C2%99%C2%8A%C2%87%C2%AF%12%C2%9C7%15L%C3%A2o%C2%84%C3%9E%C3%8D%C3%B1i6%C3%9FD%25%C3%BD%C2%86c%13%C3%87%C3%83_%C3%B1%0CV%7C*(%C3%9E%25t%12%C2%9D%5B7o%24%5DKR%14%C3%8F%C2%82%C3%81w%15%1FG%C3%ACo%C2%81%0C%C3%B1%C3%A5!%01%C3%A8%C2%96%C3%BE%C3%90%C2%90%C2%970%C3%A8a%1D%C2%B1%2BY%C2%86%2FO%0F%C3%9D%C3%81r4j%C3%94%C2%88%C2%BFB%3E%22%C3%A7.%22'%C2%B7F%C2%8F%1E%C3%9D%C2%B2eK%C2%BE%C2%8A%0DY%24%C2%9F9%C2%96-%5B%C2%96-%0A%C2%AB%C3%94%C2%BD%7Bw%C3%9Ek%C2%83%C2%B87%C3%98L)%16%C2%B4!%C2%B4%C2%90%C3%A3%C2%B4%C3%9D%C2%8D%C2%9B%C3%A9%C2%B7%C3%ADM%C2%95%1C%C2%BD%C2%95%5C%23%C2%95%C3%9Co)%01%C2%83%C2%94%C3%AC%C3%AD%14%C3%AFg%C3%B4%C3%93%C3%A7%5B%C2%B7Rn%3B%C2%94%C3%80%23%C2%B4%60%C2%BA%C3%A3FK%C3%88%22M%C2%9A4!%C3%B8%C3%B2%24%C3%85%C2%83EW%C3%B7%5E%C2%84%C3%BE%C3%BE%C2%97%10t%C3%B3%C2%8E%C2%AFa%C3%83%C2%86%04%C2%93%C2%88%C2%ACQ%C2%89%7CE97n%C3%9C%C2%98%C2%AC%C2%96!%C2%91%24%C3%B8%C3%B2%C3%A4%C2%83p%C3%9AY%C2%A1%5B%C3%B0%C3%965%C2%89%C3%87y%C3%87%C3%BF%C2%87%0F%1F%0E%C3%B1%C3%81%C3%92%C2%8E%1D%3B%C2%969%7B%C2%82%2F%C2%AF%C2%8F%7B%C2%AE%C2%89%2F%C3%AF%0CxR%C3%AC1a%C3%A6%00%3F%12%C2%94%0FG!%C2%AD%C2%8B%C3%88%1FT%C3%B6%C3%BC%C3%B9h%C2%B3n%C3%BDx%C3%A4%C2%A9%3C%C2%B9%C3%A0%3E%22%C3%A6%C2%BC%C2%97%C3%93Q%1Bx%C3%9Eb%C3%B0%C2%8E%18%5C%1Fo%1D6%C2%ACo%C3%9F%C2%BE%C3%A8%3E%C2%84%C3%B0%C3%95W_i6%06%C3%99L%C3%A9%C3%92%C2%A5%11%C3%8F%20Zbg%1Cx%C2%9Cw5n%C3%83%40%C2%A8%C3%B9%C2%81%C3%88%17%C3%81%5C%C3%89%C2%92%25%0B%16%2C%C3%98%C2%AF_%3F%155%C2%84%1F_C%7Cy%C2%8D%C2%89%C3%88%C3%B0%C3%96%C3%B1%16%C2%84%C3%83%C2%AE%3E%18%C2%8C%C2%80%0E%16%05%C3%A3Z%C2%BF~%C3%BDy%C3%B3%C3%A6%C3%99%C2%9D%C3%88%C2%A5k%C3%97%C2%AE%C2%85%C3%B2%C2%BE%C3%B9%C3%A6%C2%9B%7C%18%C2%AE%C3%92%C3%8A%C2%95%2B%C2%91%0F%C3%87%C3%87%C3%87%23%C3%96%C3%83%23%C3%A02c%C3%86%0C%16%C3%801%C2%94%1C%C3%98%5B%C2%82%2F%C2%AF%C2%8F%7B%0E%C2%B9%C3%A0%C3%81%C3%85%C2%8B%17%C3%83%0E%C2%AB%C3%B0%C3%AE%C2%96%17%C2%B4%C3%B2%C3%A5%C3%8D%C2%B0)%C2%B6%3Bw%C3%AE%26'%C3%BF%19%11%11j%C3%AA%C3%A9%C2%A4%C2%A4%C3%A4%3Bw%C3%AEyyx%05%C3%A5%C3%89%C2%B0%08%C2%84%C3%A4%C2%A4FN%C3%82%C2%90%13%C3%B0%5C%C3%9E%0A%C3%B8%C3%BB%C3%BB%C2%AB%1E%C3%8AU%11%04%C2%8C%16L%C2%BEz%03%C2%8F%C3%B3%C3%AE%C3%A9%C3%A9y%C3%B5%C3%AA%C3%95a%C3%83%C2%86A%1B%C2%82%C2%83%C2%83%C2%91%C3%93af%C2%8A%7Cq%7D%C3%B0%C3%A0%C3%81%C2%98%C2%BAl-%03%16%04.%C2%85%1F_%C2%86%2F%C2%AF%C3%93T%2B%C3%95%0D%C2%86x%C3%AB%220))%C3%8C%C2%80u%25%C3%A9%C2%B4%3B%C3%B1%C3%A53%C3%AE%C3%98c%C3%82%C3%8DY%C2%AC8e%C3%AD%7C%7Fo%C3%8Fb%5E%C2%B6B%1B7l5%2B%C2%90eK%7F%C2%B4)!%C3%99%7C%C2%8Am%C3%BD%C3%86%C3%8F%C3%9C%C3%B1%C2%AFG-%C2%96!%C3%81%08%C2%99%C2%92%C2%B3%26%C2%9E%3E_%C2%B5%07%15%C3%BC%C3%B5%C3%97_3%C3%8F%C3%97%3D%15%C2%A4%C2%86x%C3%AB%C3%B0%C3%BD%C3%A4%11%C2%82%C3%B3%C2%8E%C3%99%23%1E%3Au%1F%C2%BE%7C%C2%9Acg%C3%97%C2%94b%C3%85*%7BV%C3%B8%C3%B9%C3%BB%16S%C2%94%C3%BC%C3%B3%C3%A7%C2%99%C2%AE%02%C2%9A%3E%C3%ADs%24%C2%A9%C2%B9sF%1C%5D%C3%A7%C3%A3%C2%80%09%C3%89%1A%C3%85%C2%82a%26%18%C3%A6%C2%86r%16%C3%B1%C3%B4a%C2%BD%08%C2%A67%5CM%C3%A6%C3%B9%C2%8Ad%050%C3%8A%10o%5D%C2%AC%26%25W%C2%90%C3%93%C2%AA%26%C2%9D%C2%91%C2%BB%C3%B1%C3%A5M%1EWJW%C2%82%C2%83RsdOwf%C2%A3W%C3%8D%0A%C3%A4jl%C2%BC%C2%A3%C2%8F9%C3%92%C3%B3%05%C2%A5%C3%A9%15%C3%89d%C2%8E%20%01%C3%B5K3%C2%92r%16%C3%B1%C3%B4%C3%B1%2B%C2%91%C2%BC%C3%A1%26%C2%A0%0C_%C2%ADJJ%C3%B34d%C3%88%10~%C3%8Di%C3%BC%C3%B8%C3%B1S%C2%A7N%C3%A5%C2%93%C2%97%C3%9E%C2%BD%7B%C2%93G%C3%9Ex%C3%A3%0D~%C3%A1%0E~%C2%9A%C3%AC%15%C3%A2%C2%AF%03%06%0C%C3%A0%2B!%C3%A1%0Ay%C3%A7%083%C3%B9%C3%8D7%C3%9F%C3%B0%7C%C3%89%C3%87%C2%9B3%C2%B9i%C2%88%18%2BWN%C3%84G%C2%B6%C2%A4k%C3%89f%C2%9FN%C2%BE%C3%BE'%1E%0C%0C%C3%88%C3%88%23%7F%C2%A2%C3%90%3Caty%C2%83%24%23g%C2%84%C3%9E%C3%B3%C3%A7%C3%8FW%5D%01%C3%A6!%22%C3%A3%C2%A1C%C2%87%C3%B2bo%C3%9F%C2%BE%7D%C3%A6%C3%B9j%C2%A8%C3%A3%C2%84%09%13%C2%B4%C2%A2%C3%91%C2%A4%3D%7B%C3%B6%C3%9C%C2%BE%7D%5BE%C2%B0%C2%84%C3%A7%3A%7C%C3%B80%C3%83%C3%A8%0E%09%09%C2%A9W%C2%AF%1E%7C3%02j%C3%A4b%60%C2%83%C3%848%22%22%02v%C2%A8J%C2%95*%C3%A4%C2%9Br%C2%AA%C2%8E7m%C3%9A%14%C3%AE%0C%C3%8F%C2%8E%181%C3%A2%C3%9Dw%C3%9F%C3%85%C3%BF%11%C2%A4%C3%AF%C3%9E%C2%BD%1BI(2P%18m%C3%A4%01%C3%88%7B%C3%91%0D%24%C3%89%C2%88%C3%AE%C2%91%C3%90%22%14c%C2%87I%C2%A0%C2%88%C3%90%5D%C3%A4%C2%8F%3C_v%1C%03%01)%C2%92G%C2%A4%3F%C2%B0g%0F%C2%AB%1C%C3%AD%C3%8A%C3%8D%05Jz%C2%BC)%C2%B3%C3%A5%C3%A5%C2%A1%2C_%C2%9F%C3%A3r%C2%BC-%22%C2%BC%C3%A8%C3%ABm%C2%9A%C2%99%1A%C3%B2E_.%3Bs6%C2%BAl%C2%89%C2%8C%1Emo%C3%99l%26%C2%97%1B%C2%BC%C2%82%C2%95%C2%80%C2%BE%C3%AA%0C%C3%A7%C3%A5%C3%8C%C2%AE%C2%A0%C2%BF%C2%88%13%20%19%C3%8C%22%08%C3%96%C2%94%C2%9C%11e%17%2BV%0C%C2%A3%C2%B3o%C3%9F%3E%C2%BC%10s%15%C3%B9u%C3%8D%C2%9A5U9C%C3%ADp%C2%83%C3%8CF%C2%B5%3E_%C2%A9%C3%A0%C2%9D%C3%87%01%C3%AF%C3%93%C2%A7%0F%12T%0C*s%C3%95h7%1A%C2%87t%03%C2%A9D%26%C3%B1%C3%96%2F%5E%C2%BC%C2%A8.~%C2%A0%C2%A1*%C3%9A%C2%BD%C3%A1%C2%891%C2%95%C3%AF%C3%B9%C3%B3%C3%A7O%C2%9F%3E%C2%AD%C3%82%C2%B9%C2%BE%C3%BA%C3%AA%C2%AB%7F%7Dx%C3%ADJus1%C2%96s%C3%97%C3%B9%C3%A5%C3%9Ap%C2%B5%C2%85%C3%AB%C3%96ne%C2%AA%23%C2%90O%C3%95*%08%C2%87%C2%8B%C2%BC%C3%9E8%C2%BFc%C3%BB%C3%B9%C2%82%C3%89%18%C3%AB%C3%B2%0B%0C%17%04%C3%93%0CY3%C2%91%C2%B3!%C3%9E%C2%BA%C2%8C%C2%9C%11%C2%AD%C2%B3%C2%8F%C2%AB%C3%97%C2%AD%5BWF%C3%8En!c%C2%9CwXN%3E%C2%AC%C2%86%0B%23'4%C2%AC%C3%A1%C2%AD%C3%B3%C3%A7%C2%9EAx%C2%A7%C3%A1%23d%C2%AD%0F%C3%B6%C2%8C%C2%87%C2%A6%00%7D%C3%B8%C3%A1%C2%87%0F%15%C2%AB%C2%86i%C3%85%C2%BA%C2%A2tj%C2%96_QB%C3%8B%C2%97%C2%ADs%C3%A7%C3%8E%5D%C3%B9%C2%8E%24'_%2FY%C2%BC%C2%9A%C2%A2%C2%84%C3%B5j%C2%9BO%7B%C2%9FQ%C2%AE%C3%A6%1D%C3%86%C2%9B%2C%C3%BA%C3%BC%5Drv%0B%C3%91%18K%C3%84%01%C2%87%C3%93%C3%A1%0Ff%C3%A1%C2%86%C2%AF%C2%BE%C3%BA%C2%8A%C2%BF%C2%81%C3%A1%C2%80%C2%9B%C2%8D%18%C2%8E%1D%3B%C3%86%C3%BF%C2%BAw%C3%AF%5E%C3%83G%08%C3%BE%C3%B8%C2%96-%5B%C3%88%19%C2%B2%C2%BF~%C2%B5e3%C3%A7%C2%8F%C3%AC%C2%8E*%C3%B8%60%C2%84%C3%9E%C2%8AGrR%C3%B2%C2%B5D%13aVbb%C3%92%C2%9F%C3%97o%C3%A0%C3%81%C3%BC%C3%B9%C3%92%2C%C2%85%C2%AC%19%C2%9A%02%C3%B9%1B%C3%A5%C3%AC%16%C2%A2%C2%92%608%C3%A0%C3%BC%C2%95%C3%96%C2%AD%5B%C3%B3%C3%90%22%C3%B0Dd%5B%C3%80%0A%C3%9E%C2%BA%00%2F%C2%AEw2%C3%A2!%C2%91%C3%82%5C%C3%BC%C3%BA%C3%82%0B%C2%8F%C3%80i%C3%BCU%19%C3%A7a%C2%BE%C2%AC%C3%94%C2%A6%14%0DI%C3%85%C2%93%C2%B7o%C3%9DI%C2%BE~%C3%9DD%C3%A4%C2%9E%C3%BC'%2C%1C%C2%9E%2F%1A%C2%92%C2%A6%C2%98%C3%87%C3%8EPl%C3%BFMl%C3%8B%C2%94)C%C3%8A%C3%BA%C3%BE.9%C2%BB%C2%87D%23%C3%86%C3%A3%C2%BC%C2%A3o7n%C3%9C%18%3Cx%C2%B0%C2%AF%C2%AF%2FB%C3%82%C3%80%C3%80%C3%80%C3%A9%C3%93%C2%A7%23%C2%B4%C2%B7%C2%8E%C2%B7%C3%BE%C2%90%10%1E%C2%A9%7B%C3%B5%08%20%188%C2%9B%3E%11%C3%BCq%C3%B8%0E%C3%9805%C3%88E%5C%C3%B9W%C2%B9XB7%C3%93H%C3%89%C3%B1%C3%8A%C2%8A%C3%99%C3%BE%1E%C2%B6b~%C3%9E%C2%A1%3B%C2%B6%C3%AF%C2%91%C3%AF%C3%88%C2%A6%C2%8D%C2%BF%C3%B8z%16%C3%B1%C3%B6%C2%8CX%C2%BB%C3%80%C3%9F%04%C3%AA%C2%9Az%12%C3%BA%C3%AA%C3%8Bj%19%1C%C2%92%C2%B8'A%C3%8En!%C2%8D%1D%C2%9B%C2%8E%1D%3Bb%C3%B6%C3%B08%C3%AF%C3%93%C2%A6M%C3%83%C2%A0%C2%AEY%C2%B3%061%3B%C3%BB%C3%A8%C3%9C%C2%A2E%C2%8B%18%C3%9E%C3%BA%C3%84%C2%89%13%5D%C2%9D1Z%C2%BDz5%0C%2F%C2%ACH%C2%A7N%C2%9D%C3%84%C2%A9V%C2%AAT%C2%A9%C3%BD%C3%BB%C3%B7%C3%BF%C3%B2%C3%8B%2F%10h%C2%B3f%C3%8DX%C3%BD%3B%C3%81y'%C2%8F%C3%A0%C3%8A%C2%B6m%C3%9B%08%C3%BE%C3%B8%C3%81%C2%83%07%C3%A1%01%C3%B1%C3%BE%16-Z%C3%BC%C2%B5%C3%BA%C3%A0%19dz%C2%86%C2%A5%2B%C3%81y3%7C%C2%BD%C2%95%C3%BB%0FR%C2%93%C2%92LX%C2%ACk%C3%97%C2%AE%3FHO%C3%8B%C3%A1%C3%AF%1D%C2%9C'%C3%9D%C3%8AZ%C2%83-%C2%9B%C2%BA%02%3Ck%C3%96%C2%AC%C3%AB%C3%97%C2%AF%C2%9B%C2%95%C2%B3%3E%C3%89%C3%88%C2%99%C3%87%C3%93%07%3BId%7F%C3%BD%C3%B15%5Ey%C2%87_G%C3%82%C2%A5%C2%9EWD%C2%87%09%C3%9E%C2%BA%C3%B8%C2%95%1F%C3%84%C2%98%C3%BCI%26%3C.s%C3%8Cc%C3%92%C2%A4I%C3%AA%23H%C3%BAd%C3%B0%C3%87%5D%C3%83%18M2m%C2%B1%C2%AE(%C2%91%1B%C2%BC%03%1D%C3%80%7C%C3%B9%C3%A7%C3%8D%5D%2C%C3%8Fj%C3%86Gs%C3%B1Hp%C2%9Ep%07%C2%80%C3%91e%C3%B3%16%2B%C3%A1M%C3%8Br%C2%B6F%C2%BC%C2%9CE%3C%7D%19(u%C2%99%C3%B15V%2CL%20%5E%11E%C2%BCuxqR%C3%94p%C3%B4%C3%A8Q%C2%A2%C2%BE%C2%AE%C2%8AbU%C2%8A%C2%8F%C2%8F'%C2%B5%19%C2%86%C3%B8%C3%A3%C2%BA%C3%A7%18%3F5%C2%ADX%C2%97%C2%94%C3%A8%C3%BFx%C2%86%C3%A4%0B%C2%87%C2%96%C2%BC%3Dz%C2%B2%3C%C2%ABaC%C3%87)J%C2%81%C3%90%C2%82aW%C3%B6z9%C3%8A%C3%A1%C3%8D*V%C3%B2X%C3%8Br%C2%B6%40%C2%A2%C2%9C%C3%85O%C2%94%1B%16%C2%B9%C3%8B%C2%8C%C2%AF%C2%B1%C3%91%C3%A3%0F%C2%81(Zx%C3%ABb%C2%8D%1EZO%5E%C2%A2%C2%81%03%C3%BE(%C3%81%05%C2%90%C2%94G%06%2C%C3%9EuNb%C3%BE%C2%9B%5B%19J%C3%AE%C2%80%C3%B4%C3%9C9%C3%93%C3%B1p%C3%94%05%13%C2%AC%C3%A3%C3%A2%12%C3%B0H%C3%AE%C2%9Ci%C2%B9r%C2%A6Yq%C2%85%C3%9E%C3%8FX%C2%96%C2%B3%05%12%C3%A5L%C3%B0%C3%B45%C2%87%C3%8F%C3%B0%06q%7C%C2%8D%15%C2%ABn%C3%9D%C2%BA%C3%BC.%1E%22%C3%81%C2%B1c%C3%87%C3%B27%20j%26U%C3%85%08%C2%B1%C3%B9%C3%94%12%C3%A6%C2%9DL%3E%C2%91%C3%82%C3%82%C3%82H%C2%8A'%C3%8E%243%C3%8B%C3%99%11%C2%A63%C3%BF%0C%25%20%C2%A7%12%C2%98%0B%C2%AA%C3%A1%7D%C3%AE%C2%8F%0B%04%C3%BA%C3%86h%C2%A3%C3%90%C2%A3%40%C2%BE%C3%B4%C3%AC9%14%C3%93%1B%C2%85h%C2%A4wI%C3%8Br%C2%B6%40%C2%A2%C2%9C%C3%9F%7B%C3%AF%3D~%C2%BB%10%C3%89%10%C3%B9%C2%84%C2%98HR%C3%A3%2Bc%3F%C2%97.%5DJ%C3%B0%C3%96G%C2%8E%1C%C2%89%C2%A0%2F%5B%C2%B6lm%C3%9B%C2%B6%C3%95%3Cm%C2%81%10%1B%C3%B1%01%C3%82%40%C3%B4%C3%A4%C2%9Bo%C2%BE%C2%91%C3%A1r%C3%B2%C3%A4I%15%C3%A7%5D%06%C3%91P7%0A%C2%88%C2%B5G%C3%A54%C3%BD%C3%81%C2%9CX%C2%A5%C3%ABk%C3%88%18J%C3%B8z%17%5E%C3%BC%C2%B5%C3%94g%C2%BA~%C3%B9eW%60%40%09E)6nP%C2%A0%C3%A9%C2%94%C3%90Qn%C2%9F%C3%83%C2%9E%C3%B6%C3%97%11%17%C2%84%C3%AAH%C2%98%20%C2%B4%C2%B2e%C3%8B%C2%B23%C3%8D%C2%86r%C2%B6%40%C3%87%C2%8F%1FWq%C3%9E%19%20%C3%A3%C3%B2%C3%A5%C3%8B%C3%95%C3%B1%C2%95D%10%C3%9E%C2%BE%7D%C2%BB%3E%C3%8E%C2%BB%C3%94%C2%BC%C2%AEV%C2%AD%1A2U%C2%BC%05Z%C3%82%C3%96E%C2%90%C2%A1%20%C2%BF%40DY%C2%AE%5C9%C3%8D%C2%A3%C2%A7%C2%B8%01%C2%AE%1A%C2%BA%02%7F%C3%8C%16%7F%C2%91A%20%2B%C2%81%C2%B2%0F%192%C2%84Y%C3%A3%C2%AF%C2%BF%C3%BE%1A%C2%9AT%C2%B3f%C3%8D%C3%8F%3E%C3%BBLq~%C3%B3%0E%C2%93%C2%92u%C2%98%7Di%08%C2%A92R%C3%94%C3%A7%C2%9E%7B%C2%AE%7B%C3%B7%C3%AE%C2%9A%C3%8E4%3D%3D%C3%BD%C2%A3%C2%8F%3E%C3%82%C3%8D%0D%1A4%40%C3%B7%C2%B8-%C3%90%02%C2%8A%C3%8F%C2%B3%C2%A6%C3%97HmJ%C3%9BWny%C3%9A%10xz%0D%1F%3Av%C3%B2%C3%BB%C2%B3~%C3%BB%C3%AD%C3%B4%C3%AD%C3%9B)%C3%B7%C3%AE%C3%9D%C3%87%C3%8F%7D%C2%A4%C2%8B%C2%A9%08%5B%C3%93%C3%B0%C2%9F%C3%84%C3%84%C2%A4_%C3%B7%1FA%C3%98%C3%BEF%C3%97!%C3%97o%3E(%C2%92%3F%C2%BD%C3%BB%C3%AB%C2%B7%C2%94T%C2%B3%2B%3D0W%C2%A5%14%C3%8F%C2%BF%C3%8E%C2%83%C2%A0%C2%9B%C2%BF9%09%C2%A9.%3B%C3%90%C2%8C~%C3%B1rfX1%1A%C3%BD%7Dt%09T%C2%95%C2%B3X%C2%8A%C2%AE8%C2%BFi%C2%88%C3%B7%C2%83%C3%8B%C2%89%13'X%C3%AE%C3%B9%C3%92K%2F%C2%A9%C3%A3%C3%8B%60%C3%99%C3%96%C2%AF__%C2%BF~%7D%0C%07%C3%AC%19%C3%B9D%0A%23%0C%0A%C2%B4%C2%93%C2%95%C2%9C%C3%B0%C2%87%7CLX%C2%ACK%C2%97.%C3%B1%1B%C3%A6M%C2%9A4%C3%B9%C3%B1%C3%87%1F%C3%B9%C2%8C%C2%94%7D%C2%AA%40%C2%9F%C2%8E%1C9%C3%82g%C2%A4%22%C3%BE8%C2%AC%1Arl%C3%9E%20%C3%8B%C3%A0%C2%BC%C2%93%C3%AFy%3C%C2%82%7Bn!~%C2%BF%C3%A0%08%C3%A1%C3%87%C3%B4%C3%8F%C3%AD%C2%84%09%01%C3%AB%C2%90%C3%80%C2%80R%C3%8F%C2%94%C2%AAQ%C3%B1%C3%99%06%15%C2%9FkP%C2%B9b%C3%A3%C2%97%5E%7C%C2%B9j%C2%95W*%3E%C3%970%3C%C2%B4r%C2%8El%C2%8E%1B%14%25%3C_%60%C3%84%C3%BA%2F%C3%BC%C3%8D%C3%95%C3%B7%09%C2%91%C2%BB%26!%22%C3%A6A%C2%84%09%C3%9E%3A%C3%AD%C2%AF%C2%96%C2%9CE%3C%7D%C3%89%C3%B1%25%C3%A0%C3%85b%C2%85%16%C3%AFO-%C3%A2%C2%BC%C3%83%C2%AE%C2%90%C3%AA%1C%C2%B24%C2%8F_%C3%BF%C3%9A%C3%BDuA%C2%86%C3%B8%C3%A3%C3%B8%C2%95%C3%94%C3%80%18%C3%A2%C2%BC%23%C2%BC%25-y%04%C3%B7%3C%3D%C3%89%1ES%C3%88%C3%B4%C2%A7.%C2%A3%1D%C2%BA%C2%B5%C3%A2%C3%93%C3%AC%C2%B5_%2C%14%1C%18%C3%AE%C3%AD%C2%89%241%14%01%C2%8F%C3%B0%13%C3%A6%C3%A9%11%C2%91%3Fox%C3%9B%C2%97%C3%B3%1F%C3%B9%C3%89%C3%9B%C2%8AV%C2%9Dc_%0F%C3%90%C3%B3n%C2%99%C3%87y%17%C3%B1%C3%B4%C3%9D2%C2%BEd'Mq%17%C3%8E%C2%BB%C3%86%22%C2%9F%11%0E%C2%B8%5D%02%7F%C3%9C%C3%B0%25%C2%86%C3%90%C3%B0%C2%8F%C3%9C%C3%A0%C2%91G%C3%893E%C2%89%C3%ABfn%C2%9B%25%C3%9D%11%C3%85%C2%B7m%C2%93%C3%92%C2%A6iJ%C3%94%25%C2%AF%C2%8B%C2%B1%5Eq%09%C2%9E%C3%897%C2%94%3B%C3%B7%C2%BCR%C3%93%3CRSm%19v%C2%9B%C2%8FwF%C3%9E%C3%9C%C2%A9a%C2%85%C3%93KE%3C%08%0BOw%7C%C3%B7%C3%AB%C2%8E%C2%85%1D%0FE%09%C3%A8%C2%ADx%162%254%C2%B38%C3%AF%C2%8A)p%C3%BCLH%C3%9E%C2%8A%2B%C2%84%C2%95%C2%83%C2%ADS%C3%AF%C2%AFU%C2%AB%C3%96%C2%86%0D%1BxN%C3%B0G%C2%86%2F1%C3%84%1F%C2%87g%C3%A4%0B%C3%A7%25q%C3%9E%C2%89k%C3%90X-K%C3%A8l%C3%B1%2B%C2%98QN%C2%8C%06%C3%B5%C2%AB%C2%85%C3%A2%C3%8FU%C3%A7%0D%17%C2%AC~%0B%C3%B3re%7B%C3%BAM%C2%A3%C3%8C%C3%80%00O%C3%9F%10%C3%A7%5D%C3%84%C3%93w%C3%8B%C3%B8%22%26%C3%A1k0%C3%A1%5B%2C%C3%A2%C2%BCGFF%C2%B6n%C3%9D%1AY%00%C3%86%3E..%C3%8E.%C3%A0%C2%BC3%3A%7B%C3%B6%C2%ACN%C3%A6%021%C2%A98%C3%AF%C3%8C%C2%B4%12%C3%BC%C3%B1%C3%94%C3%94T%19%C2%9Cw%C3%B4A%C3%BD*%10%1E!%C3%B8%C3%B2%C3%82%C3%81%C2%8A%14%7Bl%C2%93%C3%8C~a%C3%95%C2%BD%3F%C3%AC%2B%C2%98%0F%C2%B41%C3%86%08%C3%9E%C2%BA(g%11%C3%A7%C3%BD%C3%8E%C2%9D%3B%C2%A7N%C2%9DR7*x9K~r%C3%81%C3%82%C3%B8%5E%C2%BBv%0D%C2%8E%18C%C2%83%C2%98%2C%3A%3A%C3%9A%3D%C2%87)%C2%90%20%C3%B18%C3%AFIIIh%0D%3A%036%C2%88%03%C3%BA%C3%B7%C3%AF%2F%C2%83%03.%12%C3%B2%14%1D%C2%9Cw%16%60%C2%8D%181%02q%C2%86%C2%AF%C2%AFo%C2%9D%3Aud%C3%93%C3%AF%C2%8C%C3%BB%C3%B6%C2%A4%C3%91%C3%B6s%C2%B6%C2%BF_%C2%BD%C3%98%C2%B1%C3%BD%C2%B8%C3%97%1C%1F%14%C3%96%22Xq%15o%1D%C2%B9%0B%C2%AE%C2%8C%1F%3F%5E%C2%953%C3%862!!%C2%81%C3%87%5B%C2%B7%3B%3F%C3%8B%C2%80%3C%0E%C2%8F%20%3B%C2%93%C3%B9%00%C2%93%5B%C3%86%C2%97%1D%C3%B9%C3%84%7C%C3%86%C3%90%14%2BVl%C3%A9%C3%92%C2%A5%C3%AEQ%2C%C2%82%C3%B3%C3%9E%C2%A9S'%C3%BE%C3%83%5D%C2%8A%1C%0E%C2%B8x%C3%BCU%1F%7F%1C%13%C2%888%3Es%C3%B8%C3%B2%C3%B7%C3%B6%C3%9Bc%C2%9B%C3%9A%C3%8F%7B%C3%92%C2%AF%C3%98%C2%9F%C2%93%C3%80%C2%961%C3%BB%C2%BD%7B%C3%BE)%C2%95%C3%9D%C2%85%C3%AC%C3%B6%C2%ABM%C3%AC)%C3%ABt%C3%B6Ix%07%24%C3%B6W%C2%94%C3%B3%C3%BB%C3%AF%C2%BF%C3%8F%C2%A39%60%C2%BE%C2%A9%C3%A8%40%C2%99!%C3%83%C3%B1%C2%95%C3%A1%2B%0Bn%C3%8BS%C3%B3%C3%A6%C3%8D%C3%97%C2%AF_%C3%8F%C3%A7%11lI%C2%89%C3%9F%C2%95%C3%A4o%C2%90%C2%A13g%C3%8E%10%C2%9C14%C2%97%C3%AC%60%60%C3%86%C3%B0%C2%B8%12y%C3%B2%C3%A4%C2%89%C2%8A%C2%8A2%C2%87%2F%C3%BF%20R%C2%B9%C2%B3Q%C2%B9%C2%B7OI%C2%8FU2%C2%92%1Dp%C3%B0v%07d%C2%83%C2%8B%25s%C3%B4%C3%8B%C3%BB%C2%91%C3%80%3E%C3%A3%C2%86%C3%86%C3%9A%C2%98%C2%8D%C2%BB%C3%9F%C3%A6%C2%AD%C3%98%3C%1D'%C3%B6%3D%C3%BC%14%C2%8F%C2%BC%C2%8Ag%3E%C3%A7%C2%8AZ%19%C3%85%C2%BB%C2%B4%C3%A3KL%5Ea%3AM%C2%9B%3Bw.A%0C%20%C3%BD%15%C3%A5Ln%00%7D%C3%BE%C3%B9%C3%A7%C3%A4%25%16%C3%88p%7Ce%C3%B8%C2%BA%01%C3%A7%3D44%14%C2%BC%11%C3%B7%C3%A8%C2%AC%14%18%C2%92!%C3%BE8%C3%B4%0C%C3%B1%C3%BB%C2%9E%3D%7B%C3%94%2BV%C3%B0%C3%A5%7D%C2%9Eu%C3%BC%C3%BC7maZ%C2%95%C2%AE%C3%98%C3%AF)%C3%B6%C3%BBZ'%C3%86%C2%BC%1C%C2%A0%20%7F%C2%A59iJ%C3%AA9%25%C3%A3%C3%8FG%C3%B7dr8%C3%B5%C3%8FY%C2%81%C3%AA%C2%91%5D%C2%B1%C3%B9%2B6%1F%C3%87%7F%C2%A0%C2%91%C2%8EgM%C2%88%C2%97%08M%C3%AC%C2%AF(%C3%A7J%C2%95*%1D%3F~%C2%9C%C3%87%0E1%C3%84It%C3%8B%C3%B8J%C3%B1%C2%B5%60*%09%C3%8E%C3%BB%0F%3F%C3%BC%C2%B0q%C3%A3F%7D%C3%BCq%19%C3%92%C3%87%1F%1F2d%C3%88%C2%85%0B%17%C3%90I5m%C2%B4%C2%86%2F%C3%BF%C3%84%12l%00%0F%3A5x%C3%B0%60%C3%B4W_%C3%8E%C2%88%C2%A6%11t%C2%AA%C2%8F%20%0C2%5CP%C2%B46%C2%BE%7C%C2%9E%C2%88(%10%7C%C3%99%C2%92%3DKN%1F9%C3%86%C2%A2%1Fc%C3%81e%C3%822%C2%AF%5D%C2%BB%C3%96U%C2%9D%06xO%C2%9D%3A%C3%B5%C2%AD%C2%B7%C3%9ER%0Fh%23%C3%B0DD%C2%89dD%C3%BD%16%14%C3%BE%04%0B%C2%B9e%C3%8B%16%16%09%C3%81%C2%96%22%C3%97%C2%987o%C2%9E%C3%BAaj%242%C2%8B%17%2F%C3%86%C2%83%C3%AAg%C2%9E%C3%80%11-%C2%86%C2%8Fg%C3%98!%08%C2%BC%C3%9A%C2%B5k%07Q%0E%1D%3AT%C3%9DO%7C%C3%BE%C3%B9%C3%A7%C3%81H%07%C3%90%C3%9B%C2%90%C2%AF%C2%85%C3%BE%C2%A2%25%C3%8B%C2%97%2F%C3%BF%C3%B2%C3%8B%2F5%3FS%C2%AB%C3%89W%C2%86%08_%0C%C3%8F%C3%BC%C3%B9%C3%B3%C2%87%0D%1B%C2%A6%C2%96%5E%19%C3%8A9--%C3%AD%C3%9Bo%C2%BF%C3%85%23h%C2%9B%C2%ABOq%C2%8Br%C2%B60%C2%BE%C3%B0%1Eo%C2%BF%C3%BD%C3%B6%C2%94)ST%C3%BC%3ELu%0CM%C3%BB%C3%B6%C3%AD5%C3%B9j(%16%C2%92%0Bu%5B%00%C2%93%0025%14%C2%90%3E%C3%BE%C3%B8%C2%80%01%03n%C3%9C%C2%B8%C2%A1V%C2%93%C3%A1%C2%9E%C3%AF%C2%BF%C3%BF%1E%23T%C2%A2D%09%C3%95%C3%B6%C2%9E%3E%7DZ%C2%9C%C3%81%22%C3%BEx%C3%AD%C3%9A%C2%B5%C2%BD%C2%BC%C2%BC%C3%80(%24%24Ds%C2%BBt%C3%92%C2%A4I%3A%7C5%C3%95%C3%91%C2%B0%C2%BF%C2%97.%5DR%C2%B1%05%5D%C3%A1%C2%9E%C3%B3%7C%25%C3%B1%C3%963%2Fg%C2%99%C2%AFVEFF%C3%B2r%C2%8E%C2%8E%C2%8E%5E%C2%B6l%C2%99Y%C2%BE%22A%C3%83%02%03%0314p%C3%99%C3%BD%C3%BA%C3%B5%13%C3%BB%C2%AB%C2%88%C3%9A%C3%8DCq%C2%80%16.%5C%C2%A8%C3%8F%C3%83%10%7F%1C%12G%C2%92%C3%8C%C3%9F%C2%80%1C%C2%95T%C3%85%C2%B4i%C3%93F%14%22%7F%C2%83%0C%C3%BE8%01%C3%BD%16%C3%B9%C2%8A%C3%B8%C3%B22%C3%BD%C3%A5%C3%9D%C2%8D%0C_E%02o%C3%9D-r%C2%86%091%C3%94%C2%80%16-Z%C2%90%C3%A2%00r%C2%BC%C3%8F%C2%90%C2%AF%C3%A6r%C2%B7a%7F%3D%C2%84%C2%B2%C2%B58%C3%BEs%3C%C2%A0%13'N%C3%A8%C3%87z%C2%9A%C3%B8%C3%A3%7C5%19%C2%9C%11L%14%7F%03%2C-%C3%99o%12%C3%9B*%C2%89%3F%C3%8E_%C3%81t%24%C2%B5%0F%C2%84%2F%C3%83%C2%977%C3%9B_XSS%7C%15'%C3%9E%C2%BAQy%C2%A0%1B%C3%A4%C3%8C%7F%C3%A5%C3%8A%15%C2%9D%3Bw%C2%8E%C3%AC%5B%C2%93%C2%97%18%C3%B2%15I%C2%A6%C2%BFT%C2%B1%C2%A0%C3%8E%C2%AA%C3%A5d%C3%84*Xt%C2%88%C3%A1%C2%8F%C3%B3Wz%C3%B4%C3%A8%C3%81%C2%A7%090%C3%9D%C2%83%06%0D%22U%C2%B6%1D%3At%20e%18%C3%A4%C2%B5%22%C3%BE8_g%C2%ADh%C3%A1%C2%8F%C2%97-%5B%C2%96_%7D%10%C3%B9%C2%8A%C3%B8%C3%B22%C3%BD%25pu%C2%86%7C%15%09%C2%BCu%C2%B7%C3%88Y%C3%A6%C2%A8%7B%C2%B5j%C3%95%C3%B8_%5B%C2%B5jE%C2%AA%5C%0C%C3%B9%C2%8A%24%C3%95_%C3%8D%1A.d%1C%C3%B0%23p%C2%A2%0C8O%C2%A6FO%07%7F%1Ca%20bL%C2%A49%08P%C3%B0%C3%9Ar%C3%A5%C3%8A!%3C%C2%82%05R%C3%A5%C2%82%C2%91C%0E(%C2%BE%C3%96%02%C3%BE%C3%B8%C3%97_%7F%C2%AD%C3%83%C3%B7%C3%A7%C2%9F%7F%C2%B6%C3%90_v%C3%8CA-f%C3%92L%02%C3%90_%C2%A8%2C%0B%C3%BE%C2%A6M%C2%9B%26%13cY%C2%903%C3%92mU%C3%8E%5D%C2%BAtQ%C3%A1%11u%08F%C2%9A%C2%97sbb%C3%A2%C2%AE%5D%C2%BB%18(0%C2%A2U%C2%84%C2%A12%7C-%C3%B4W%3B%2B%C2%9C8q%22%06%C2%A6f%C3%8D%C2%9A0%C2%A4%C2%92%C2%9C%0C%C3%B1%C3%87a%3F%C3%911%C2%BC%C2%96%01C%C2%B2%C2%BD%C3%8C%C3%9D%C2%BBw%C3%83'%C2%BA%C3%9A(%C2%95%C3%81%1F%17q%C3%9E%0D%C3%B9Z%C3%A8%2F%04%C2%87%C3%BC%08~%04%C3%BEH%C2%93%2F%C2%BA%C2%80T%03MEL%03%1F')4%C3%82%17%C2%A3%3Ef%C3%8C%18%C2%84%C2%92%C2%B8%C3%8E%00%1A%C2%8F%1C9%02%C3%B3%C2%8FH%11i%C2%9D%C2%A6%C2%9C%0D%C3%B1%C3%965%C3%A5%0Cm%C3%83%1CSg%26%C3%8F%C3%97%05%C3%A4%C2%98%C3%A9%C3%BE%1A%C3%A0%C2%BC%C3%83b%C3%8Bl%C3%89%C3%89%C3%A0%C2%8F%C3%B3%C3%8Bn%C2%86%60_v%09%C3%BCq%C3%978%C3%AF%C3%A6%C3%B8f%C2%B2%C2%BF0%1E%07%0F%1E%C2%84)%C3%A5%C2%9D%C2%8B%C3%8C%C3%AE%2F%C3%8F7%2C%2C%0C%01%13%C3%AF%C3%9A%3Aw%C3%AE%C2%8C%C3%BE%C3%B2%3E%C2%97%C3%B4%17%7F%C2%B2%C3%86W%C2%943%C3%AF%C3%880%C2%93%C3%B5%C3%B1%C3%A5%25%C3%BB%C3%AB%06%C2%9Cw%0B%C3%B8%C3%A3%C3%99%C2%B2e3%C3%BC%C3%88%C2%85!%C3%BE%C2%B8k%C2%9Cw%13%7C%C3%9D%C3%92%C3%9F%C3%92%C2%A5K%13%C2%B0V%11%C3%B7%C3%9CP%C3%8E%16p%C3%AD-%C3%B05%C2%94%C2%B3%22%C2%81%2F%2F%C3%83%C3%97%0D8%C3%AF%16%C3%B0%C3%87%C3%A1%C3%97a%C2%9F%C3%B5_k%C2%88%3F%C3%AE%12%C3%A7%C3%9D%0C_%C2%B7%C3%B4%17%0D%23H%C3%A8%C2%9A%C3%85%C3%A6%C3%BA%7C-%C3%A0%C3%9A%5B%C3%A0k(gE%02_%5E%C2%8A%C2%AF%C2%B8XB%3E%C3%A8-%C3%B3%1DD%02n%C2%AB%06%04%C3%BC%C2%AA4_%26_%C2%A3F%0D%C3%83%C2%B3%C3%91111%3C%C3%BE8%264%C3%82%0B%C2%9E%0B%C2%98%0E%1B6%2C%C2%93%7C%C3%9D%C3%92_%C2%82E%06ga%C3%B8IG%C3%82%C3%97f%C2%B3-Y%C2%B2%C2%84%C3%8FXe%C3%BAk%C2%81%C2%AF%C2%A1%C2%9C%C3%A1%C2%94%C3%85%C2%98%C3%89B%7FM%C3%A0%C2%BC%C2%AB%C2%A5v%C2%9AQ%C2%B6%06%C3%9E%C2%BA%10%C3%BD%C2%A9%C3%B8%C3%A3%C3%B1%C3%B1%C3%B1j%C3%82%C2%A5%C2%86%C3%83%C2%8Cx%C3%BCq%C3%84%C2%9B*%C3%8E%3B%0Boy%C3%BCq%3C%C2%A8%C2%8D%C3%B3%C3%BEhS%0D%C3%B9%C3%A2%22%C3%81%C2%97w%C3%A5%01%C3%95%C3%80%16%C2%8F%13%C2%BC%C3%B5%C3%93%C2%A7O%C3%97%C2%AF_%1FM%C2%ADZ%C2%B5%C2%AA%C3%AAJx%5C%7B%199%C3%B3%C2%B8%C3%B6%C2%9A%C3%BD%C2%85%C3%85%C2%B5%C3%86W_%C3%8E%16%C3%B0%C3%A55%C3%B9%1A%1C%C3%BFb8%C3%AF%C3%90A%C2%A4%60l%C3%A5%1A%C2%93%C2%B8z%C3%B5%C3%AA%C3%A8a%C2%9D%3Au%22%23%23%C3%85G%C2%90%C3%A1%C3%83Z%C3%BC%C3%BE%C3%BB%C3%AF%C2%88%40%19%C2%82%C2%A3H%3C%C3%BE8%C3%9B%C3%BD%187n%5CY'%C2%B1%C2%A5m%C2%A4*%C3%AD%C3%9B%C2%B7%07%17%C3%84%C3%AC%C2%ACp%19q%C2%86%C2%8A%C3%B3%C3%8E%3E%C3%9D%C2%81%C3%9C%07%2C%C3%80%08a%C2%AC%C2%BF%C2%BF%3Fb%26%C3%82%C3%B7%C3%A4%C3%89%C2%93M%C2%9B6%C3%85K%10Q%22%C3%B1%C2%91%C3%A1%C3%8B%C3%80%5BY%C3%AA%C3%A7%C3%AA%C2%A8%C3%B1g%C2%9F%7D%C2%86%C3%A1%7F%C3%A6%C2%99g%10%C3%86%C3%A1%3Dh%C2%95%0A%11%C3%8B%7C%2B%5E%C3%82%C2%B6%C2%87S%C2%9D%C2%A48q%C3%AD%2BU%C2%AA%C2%848%C2%A9Y%C2%B3f%C3%A4%C2%94%C2%B3%2B9%C3%B3%C2%B8%C3%B6%C2%9A%C3%BD%C3%85ES%7C!R%7D9%C3%83L*N%7Cy%C3%84%C3%A3g%C3%8F%C2%9E%C3%9D%C2%B4i%13%C2%A9%C2%8AS%C3%9D%C2%9A!_%C3%93%C3%95%0D%C3%A89%C2%BF%3F%03%C3%A1%C2%BA%C3%8AHu%C3%88%2C%C3%BE%C2%B8%C2%88%C3%B3.%C3%83%176%C2%9C%C3%BF%26%11F%0E%C2%82%C3%A3%C2%AB%C3%A7%C2%AC%C3%A1%C2%9E%1B%C3%A2%C3%9A%C3%83g%C3%B1%C2%A1%C2%B7%C3%88W%C3%84%C2%B5%C2%B7%26g%C2%82%C2%B7n%C3%887%C2%8Bp%C3%9E%09_xR%C3%B8S%C3%93%15%C2%A4%C3%A4%00%20%C2%88U%C3%8D%C2%9A%22%0B%C3%B8%C3%A3%22L%C2%B4!_%C3%BE%C3%AB%C2%A3%C3%AA%C2%9E%C2%B1Y%C2%BE%C3%A2%C2%92%C2%84!%C2%AE%3D%7C%049%C3%87B%C3%B8%C2%8A%C2%B8%C3%B6%16%C3%A4%2C%C3%A2%C2%AD%1B%C3%B2%C3%8D%22%C2%9Cw%C2%91%C3%AF%C3%BC%C3%B9%C3%B3%C2%8D%5D!!%11%2F%C2%80%C3%80%C2%95%C3%88%C2%90%05%C3%BCq%C2%B2W*%C3%83WDi%22%C3%95s%C3%96p%C3%8F%0Dq%C3%AD%11%03%C2%91%C3%91%22%7CE%5C%7B%0Br%16%C3%B1%C3%96%0D%C3%B9f%11%C3%8E%C2%BB%C3%88W%C3%A3%25%C2%86%C3%86%06%0A%C3%8Bo'!%C3%9E%C2%B4%00%C2%A6%C2%83%40%C2%95%C3%AF%C3%B3%C2%A8Q%C2%A3%C3%B8%C3%A2%05%18%C3%A4u%C3%AB%C3%96%C2%8D%1F%3F%C2%9E%2Fb%3Cv%C3%AC%18%7F%C3%86H%C2%86oZZ%1A%C3%BF%7D%C2%AC*U%C2%AA%20%40Qk%03U%C2%BE%3C%C3%AE%C2%B9%C3%88W%C2%AC%C2%B8%22%C3%87%C2%8B%11%C3%AE%2CZ%C2%B4%C2%88W%C2%88%C2%BD%7B%C3%B7%C3%B2%C3%8EB%C3%A4%C3%8B%0E%20d%5E%C3%8E%0C%C2%8B%40%C3%95o%C3%B0%C3%A5%C2%B1k%C2%91%C2%A9i%C3%B6W_%C3%8E%3A%15f%3A%7C%C3%B9%C3%BE%22VS%C2%BF%C2%9Ak%C3%AE0%05bO%C3%B8%C2%B2%C3%A6%C3%8D%C2%9B%23I!%C3%9FD%C2%94%C2%A7S%C2%A7N!%C2%BEn%C3%91%C2%A2%C3%85%C2%82%05%0B%C3%98%C3%96%12%3A%09%C2%B9t%C3%AA%C3%94%C2%89%1D%15%C2%87Z%C3%8C%C2%9A5%0B~g%C3%90%C2%A0A%C3%A7%C3%8F%C2%9Fg1%13%C3%AE%C2%87%C3%AB%C3%81%C3%80%C2%A8%C3%9B%11%C3%88A%C2%B6m%C3%9B%C2%A6f%3DHX%C3%B08%02%05%C3%B6N%C2%842%C2%BD%7B%C3%B7%C3%86%23%C2%ADZ%C2%B5b%C3%B7%C2%88%7C%C3%97%C2%ACY%13%C3%AA%C2%A4%C2%8D%1B7%C2%B2%C2%97%C2%8C%1D%3B%16%C2%AAS%C2%ABV-%C3%B5%24%13%22%1E%C3%A4JQQQ%C3%AC%C3%97%3D%7B%C3%B6%C3%B4%C3%AC%C3%99%13!%C2%8B%C3%BA%19%19%04%5E%C2%88%C2%B8%7B%C3%B4%C3%A8%C3%81%C2%96%C3%BBe%C3%B8%1A%C2%92L%7F%C2%91%C3%AA%07%05%05%C2%95%2F_%C2%9E%C2%9D%C2%90C%3E%3Eq%C3%A2D%0C%C3%8D%C2%981c%C3%989wC9k%C3%B6W%24%7D%C2%BE%0F%1E%3CP%C3%BB%C2%AB~%1E%2C%C2%B3%C2%A7t%1E%0FA(%C3%90%C3%A3%C2%90%C2%90%10%C3%8C3%C2%84%C2%A5%C3%8B%C2%97%2F'%C2%B8%C3%A7H%C3%88%09%C3%8E%3Br%C2%BAe%C3%8B%C2%96EDD%C3%A0%11%C3%B6%155%C3%B1%C2%B5%04%C3%B7%C3%BC%C3%BA%C3%B5%C3%AB%3Bw%C3%AED(%C3%8A0%C3%BB%07%0F%1ELp%C3%AD%25%3F%C2%AE%C2%8ETC%C2%9F%C2%AF%5B%C3%BA%0Bu%C2%AFV%C2%AD%1A%C3%9B%C2%84n%C3%93%C2%A6%C2%8D%C2%B5Bd%24%C3%8Bj%7F1%C2%87%C3%85%C2%8DZ%C3%88D%C2%9F%C2%AF%C2%8C%C2%9C%C2%9F%5C%C3%852%C3%84%3D%17q%C3%9E%C3%BB%C3%B5%C3%ABG%C2%AA%C3%A7%0E%1C8%40%5EKp%C3%8F1%C2%8F%09%C2%AE0%C3%81%C2%B5%C2%87niV%5E%C3%B0%04%C3%83%C2%86(J%C2%9FoV%C3%B4%C3%B7%2F%5C%7Bi%12q%C3%BCE%04JC%3C%7D%199%3F%C2%B9%C2%8A%C3%85%C3%BBu%C3%BE%1C%12%C2%9Fj%C2%91%C3%9CDDe%15%3F%C2%94M%C2%B6%C3%A4%C3%84G%08%17%C3%90%C2%A6M%C2%9B%C3%B4%C2%9B%C2%8A%1B%0C%C3%B9fE%7F_y%C3%A5%C2%95%C3%8C%17%7F%C3%82H%C2%93%7B%C3%887u%C2%AD%C3%89%C3%99%0A%C3%A2%C3%BD%C3%A3!C%C3%9Cs%11%C3%A7%1D%C3%9E%C2%90%C3%9F%C2%9DP%C2%9C%C2%98%5B%C3%A4%C2%B5%C3%84%3E!%C3%8E%20%1F%C2%93!%C2%B8%C3%B6l%C2%97C%C2%BF%C2%A9p%0A%24K%12%C3%B9fE%7F%C3%89IL%19%12q%C3%BC%C2%89%40%14%09%3C%7D%199%3F%C3%911%C2%96Z2%C2%8A%C2%91%C2%86%C3%99Gl%2B%C3%A2%C2%BC%C2%B3%C2%A0%C3%84%C3%8B%C3%8B%0B%C3%A6%3A!!%C3%A1%C3%A3%C2%8F%3FV%C3%8F_%20%04%16w%24%09%C3%AE9r%C2%A2%1F~%C3%B8%01%C3%91%06%3B%17%00%C2%AD%22%C2%B8%C3%B6S%C2%A6L%C2%91i-%C3%A2%0C%7D%C2%BE%C3%96%C3%BA%C3%8B%C3%A3%C2%BC%C2%93%C3%BEbJ%18V%C2%88h%C3%92%C3%92%C2%A5K%C3%95%C3%BEj%C2%86%C3%9E%10%23%C3%8F%17%C2%89%0B%C2%8F%C2%A7%C3%8F%0Eq%18%C3%8A%C3%99%C3%B4Ih%C2%84r%C3%88%3B%10%C3%8D%5D%C2%BDzU%13%C3%ABM%5C%5B*%5C%C2%B80%C2%A6%05%14%C2%9F%60b%19%12%C3%9A%C2%B6u%C3%ABV%C2%8C%3Df%0C%C3%9B%C3%B5%C2%84%14%08%C3%8E%3B%C3%84%C2%84%C2%A8%08%2C%10%3E%C2%B3I%3Fl%C3%98%C2%B0y%C3%B3%C3%A6!-B%C3%9C%C2%8D%08%1D7%C3%A3%3F%C2%97%2F_%C2%AEY%C2%B3%26%C2%B3%01h9%C3%81%3D%C2%9F%3E%7D%3Ar%2B%C2%B0%C3%B8%C3%AE%C2%BB%C3%AF%0A%14(%C2%80%C3%A0%C2%B4%7B%C3%B7%C3%AEH%1E1%C3%92%C3%AC%C2%BCyll%2C%C3%BBF%C2%B0%18p%C3%B0%2B%C3%B2%C3%BA%7C!4%C2%B4%16%C2%A3%C2%85%7B4k%C2%97%C3%85%C3%BEb%1A0%C2%9Cw%0C%24%C2%8B%0E%C3%85%C3%BE%C2%8A%C3%95%0A%C2%84%C2%AFHj%7F%C3%B16LQ%1E%C3%A7%C2%BD%7D%C3%BB%C3%B6Pk%C2%91%2F%C3%86%C2%9D%C3%A0%C3%A9%C2%AB%C3%BD%C2%85dH%09%C2%90%09%C2%8B%C2%85La%C3%A1%C3%82%C2%85%C3%B5%C3%AA%C3%95%23ke%C2%A6%C2%8C0%1A%C2%ADY%1Cl%C2%99%C2%96%2CY%C2%A2%C2%AE%2B%C2%86%C2%86%C2%86%5E%C2%B8pa%C3%88%C2%90!%C2%AA%23%C2%83%C3%B9A%C3%9C%0Da%C2%A9m%C3%B8%C3%A8%C2%A3%C2%8F%C3%84%C2%97L%C2%9E%3CY%0D%C2%BD!k%0CI%C3%8B%C2%96-%09%C3%9E%C2%BA%C3%AA%0Dq%5D%13%C3%97%C2%BEo%C3%9F%C2%BE%3A%7C%C3%A7%C3%8C%C2%99%C2%83%C3%AC%5D%C2%9D%C3%B4ps%7B%C3%B7%C3%AE%C2%95)D%C3%A6q%C3%9E7n%C3%9C%08%C3%A3%C3%8A%C3%B7%C2%97-%C3%8A%C2%90Bd%C2%BE.%5E%C2%B2%C2%BF%C2%BC%C3%BE%C2%8D%181B%06%C3%87%C2%9F%C3%AF%2F%C3%A6%C2%A7%15%C2%9CwV%20%C3%A0%C3%86o%C2%B04l%C3%98%C3%B0%C3%A0%C3%81%C2%83%C2%99%C3%97*%C3%98%15r%1E%C2%A1z%C3%B5%C3%AAd%C3%AA%C2%90Cf%18Z%06%C3%93%C2%A3%C2%92!%C3%AE%C2%B95%5C%7B%C3%B2%12XA%12%C2%B84i%C3%92%C3%84lq%0E%3A%C3%8Bcg*Z%60%C3%BF%C3%BCi%C3%B2%C3%87%C3%99_%11C%C3%8A%40%C2%B1RRRz%C3%B6%C3%AC%C3%A9%C3%B6%C3%80%1Cf%C3%AF%C3%B3%C3%8F%3F%C3%8F%C2%A4b%C3%81%C3%A6%C2%93%10%C2%92%C3%A4%C3%BCl_%C2%8F%5C!'c%C3%89%C3%91.%C3%8DG%C3%88k%C2%91i%C2%93%C2%B8d%C3%B3%C3%A6%C3%8D%C3%BA%2FaQ%11%C2%89%C2%88%0D%3B%C3%88%C2%9F%C2%B8g%C2%81%17%C3%89*%60*%C3%88%23%C3%BC%C3%97S%1Fg%7Fa%C2%92M(%16%C3%9C%1F9%C3%B9%C3%A4%5Eb%08O%C2%99%C2%89%C3%AE%C3%95u%3CF%C3%A3%C3%86%C2%8D%C3%A3%C3%8Bya%C3%86%C3%B9bmvn%C2%89%1C%C3%BC%C3%85%5C%24)%0F%C3%82p~%C3%A7%0B%C2%91%3E)%10x%C3%B9%C3%A5%C2%97%C3%89J%3A%C2%82Y%3E%C3%95%12%C3%B9V%C2%A9R%C2%85%C3%A0%C3%B0%0E%1C8%C3%90%C2%B0%C2%83%0B%16%2C%20'%C2%B7%3Au%C3%AA%C3%84_A%C3%BCG%1E!%C2%A7%7C%1FO%7F%11%1E%C2%88'%C2%97%5C*%16%C2%BC%C2%A6%C2%AB%C3%90%C3%8F%C2%8D%C2%84%01%C3%88%C2%8Cn!%3E%C2%80%25%C3%87%C2%9C%0B%08%08%40p%C3%80%C2%82_%15_%1E%01)%0B)%C2%904%60%C2%AE%23%C2%9D%C3%91%3C1%26%C3%A2%C2%9E%23%C3%B8%25x%C3%ABH%7C%20%7DLeHYs%C2%BD%C2%94%C3%87%3Dg%C3%9B%3E%08%7B%11b%23%C2%B7%C2%82%C3%AB%C2%87%C2%9D%C2%80%C3%A3F%C3%AC%05G%C3%A3%C3%AF%C3%AF%2Fyr%2B55%C2%95%C3%A7%C3%8B%C3%8E%C2%B8%C3%82%C2%8C1h%60%C3%8C%22%C3%8D%C3%9Cs%C3%92%C2%A4I%C3%BA%C3%BD%C3%A5%C3%B1%C3%B4%C3%99%C3%BA%C3%93%C2%B2e%C3%8B%C3%9C%C2%8E%C3%A3%C3%AFR%C2%B1%C3%9Ey%C3%A7%1DMU%40.%C3%96%C2%AF_%C2%BF%C2%95%2BW%C3%AE%C3%9B%C2%B7%C3%AF7%23%C3%82%C2%98%C3%AD%C3%9C%C2%B9%13Q%3Fr%07M%C2%94Ut%06C%C2%A2%C2%B3%C2%9A%C2%87%C3%9C%04%C2%A3%C3%9E%C2%AD%5B7%C2%9D%C3%94%1Ai%14%C3%BF%C3%97%C3%9B%C2%B7o%C3%A3A%C2%BE%C2%88%14%C2%81%05%C2%86V%3D%7C%C2%B2h%C3%91%C2%A2j%C3%95%C2%AA%C3%95%C2%A8QC-%3A%C3%85%08%C3%A1%06%C2%B5%C2%BE%C3%94%C3%AE%3C%02%C2%8F%C3%A4%C2%97%C3%9F%18%C2%85%7CuJ_%C3%80%0E%C3%AA%02%0D%C2%A8_%C2%BF%3E%C3%9B%C3%96%3D%7C%C3%B8p%C3%A5%C3%8A%C2%95%C2%A1F%C3%BC%C3%99%C2%BD%C2%A8%C2%A8(%15%C3%86%189%C3%A6%C3%A8%C3%91%C2%A3%C2%91%1EBiD%60mW%7C%C2%A1%C3%BA%C2%88%C2%9C%60%C2%98u%3EOD%C3%BA%2B%C2%9A%0C%C2%98O(%0DL%17%2B%C3%BE%C2%8C%C2%8E%C2%8EF%C3%8C%C2%87%C3%86C%C2%8D%C3%98v2%C3%B4%C2%A6d%C3%89%C2%92H%C2%99%C2%91%3C%C2%BA%C3%A2%22%C3%8A%C3%99X%C2%B1%0E%1D%3ADb%02%C3%95%C3%97%C2%88%C3%BB%C3%98%C2%92%C2%84%3E%10%1C%015%C3%9A%C3%90%C3%9C%C3%B3%C2%82%C2%AE%C3%B05%C3%A0%C2%9A8%C3%AF%16%08%C3%8A%C3%84sw%0B%C2%BC%22%C3%81%3D%C2%87%C3%91%C3%82%C3%80%C3%B0e0%22%C3%9Ezzz%3A%0F%C2%93%C2%87%C2%9BU%C2%94%1E%1D%C3%A2%C3%BD)%26%C2%AA%C2%8E%3A%C2%BA%22%C3%82W%C3%84%C3%93%C2%B7%C2%86%C3%A3%2F%C2%ABX%7C%C3%B1%C2%89Z2%26%C3%B9%C3%A5%12%7D%C3%82%C3%B4%15uK%C3%B3C_%04%7F%5C%11p%C3%9E%C2%AD%119Q%C2%8E_3%C3%BFN%11%C3%B7%C2%9C%C3%94E%C2%89x%C3%AB0%5Dd%C3%AA%C3%82E%18%26Rz%C2%B8%C3%B6r%24%C3%B2%25M%C2%B5%C2%86%C3%A3%2FU%C3%B3%0E%1FL%3Eq%C3%86%0Ef%C2%90%C3%AD%5Bk%04%C2%A7%C3%9E%C2%B1cGr%11%3A%24%C2%B3%C3%96%C3%AA%16%C3%88%C3%B2%C2%AC%20%C2%99Efs%20%C3%B5r%5C%2C%08%C3%84n%1E%19%C3%94%C2%A2%C3%A45%C2%A3%3FrO%C2%BDz%C3%B5%C3%9C%C2%B8%C2%AA%C2%89%C2%B8%C2%95%C3%8C%12%C2%B4%5B%3C%C3%A9A%C3%B0%C3%875q%C3%9E-%10_%C2%A3%C2%A78%3F%C2%A5%C2%9E%C3%B9w%12%C3%9Csx%16%C3%B8%17%C2%BE%C3%8AT%C3%84%5B%C2%87g%C3%A4'%C2%AA%C3%A61n%C2%91x%C2%B8%5BM%C2%9Cw%C2%99T%C2%9A%C3%A7%2B%C3%A2%C3%A9%C3%97%C2%AE%5D%C3%9B%02%C2%8E%C2%BF%C2%94%2B%C2%84%1A%C2%91Q'%C3%85%C3%97111%C2%BF%C2%99%24rT%C2%8D%2Fbd%04m%C3%96%C2%8C%C3%8AE%C2%9Cw%0B%C3%84%C2%82Y5%C2%87%22%C3%B8%C3%B2%C2%AE%C2%82q%1Eo%C3%9D%C3%BE(%C2%BE%C2%BCfD%C2%88%0C%03y%06%C2%B2%0D%16-!%C2%9D%14%C3%B1%C3%96%C3%A1%10%C3%95%C3%A2%C3%81%C2%9B7o%0E%1E%3C%C3%B8%C3%B9%C3%A7%C2%9FG%C2%A2%C2%A7%02O%18%C2%92!%C3%8E%C2%BB%C3%98_%C3%82%17%C2%99%C2%84!%C2%9E%C2%BE%26%C3%8E%7B%C2%A6%14%C3%AB%C3%86%C2%8D%1B%04%C3%A8%07%0C%C3%88%09%13%C3%BE%C2%98%C2%87%24%C3%8D%C2%9E%3D%C2%9B%2C%C3%9D%C2%92%C2%B5%C2%BE%C3%B6%C3%AD%C3%9B%C2%8B%C2%8DC%C3%AE%C2%A9%C3%A2%C2%BC%C3%AB%24%C2%8F%C3%BA4m%C3%9A%C2%B4%C3%A0%C3%A0%60%04%16%18ud%C2%A92%C2%8F%C2%88x%C3%ABV%C3%B0%C3%A5%05%3B%C2%8Da%C3%83p%C3%828!%C2%84%C2%B5f%7D%C3%81Z%07%C3%A7%C2%9D%C3%95%24B%15%C3%94%C3%BEB%C3%A1%C3%AE%C3%9E%C2%BD%C3%8B%C3%B3%C2%85VA%C3%A7%0C%C3%B1%C3%B4y%C2%9Cw%15%602S%C2%8A%05%C2%BD%26G%12%C3%90%1ArO%C3%93%C2%A6M%C3%8D*%C3%96'%C2%9F%7CB%C2%A4L%22%C3%84%C2%AAU%C2%AB%12.%04%C3%B7%1C%C3%B7%C3%8B%20%23%12Z%C2%BBv-%C3%8F%05%C3%BE%C3%940%C2%B54%C3%84%5B7%C2%87%2F%C3%BF%C2%90%C3%88q%C3%8B%C2%B7%C3%9Ez%C3%8B%C2%82%17%23S%C2%9A%C3%A0%C2%AD%C3%A7%C3%8A%C2%95%C2%8B%C3%BF%26%C2%8A%C3%A2%C3%BC%C2%B8%26%C3%89%C2%96%C3%A0%C3%97T%C3%98Ku)%C3%91%C2%9Dx%C3%BA%C2%AE%14%0Bn%C2%8B%C3%A8D%C3%9F%C2%BE%7D%C3%89%3D%C2%99%C2%B7X%08%C3%95%09%C3%A2%05%C2%A6%1D%C3%A1%C3%82%23%C2%AB0%C3%9A%C2%BCy%C2%B3%C3%99%C3%AE%C2%913%C3%A9%C3%A2%16%C2%87H%22_%C2%B2%C3%85%C2%91'O%1E%C3%8D*o%7D%22%7B%C2%85%C3%A5%C3%8A%C2%95%C2%B3%C2%B0%C2%85E%C3%AA6%0D%C2%B7%C2%B00CH%C2%A1%18Cp5%C2%B5%C2%A5c%C2%AD%C2%BF%C3%86%C2%85~b%C3%AB3O%C2%B0%C2%BA%C2%A4%C3%83%22%C2%89%60%C3%B1%04kE%C2%86%08LJ%C2%8E%1C9X%C2%9D%C2%8C%3C_%C3%88%C2%9D%C2%ACPX%C3%81%C2%97w%1E%C2%99%22%C3%9B%C3%92f%C3%9F%C2%80%C2%96%C2%90%C2%B3%5C%C2%95*U%22%C3%AE%C2%85%C3%AC%1F%C2%A3%C2%A9%C2%A4b%C2%B6L%C2%992%C3%A4%25%C3%A4%11w%C3%B5%C3%97%C3%98b%0D%1A4%C3%88%C3%AD%16%0BD%C2%8Er%C2%8B%16%C2%8B%C3%A0%C2%9E%C3%B7%C3%A9%C3%93%C3%87%C3%95R%C2%B2%0E!%C2%A4U%C3%8BW0C%26O6%C3%BE%3C%C2%BD!%C3%9E%C2%BA5%7C%C3%B9%C2%BD%7B%C3%B7%C2%AA%3A%C2%8D%C2%A1%C2%B5%C2%B0%C2%B6%09Z%C2%B5j%15%C3%81%5B%C3%A7%C2%81w%C2%9B7o%C2%8E%20L%C2%85%C3%AB%40%7Fg%C3%8E%C2%9C%C2%89dS-g%400%C2%8E%C3%AC%1B%26Y%7D%09%C3%9C%C2%A2%26%C2%9E~%C3%A6%C3%BB%C3%BB%C3%A4*%C2%96%5D%0B%C3%B7%5C%C3%84%5B%C2%87%5C%C2%BE%C3%B8%C3%A2%0B%C2%84%C3%B9%C2%AEv%C3%9F%C3%A2%C3%A2%C3%A2%C2%90%C3%A7B%C2%B8%C3%B2%C3%BB%C2%922x%C3%AB%22_C%C2%9Cw(S%C2%84%C2%93%C3%94D%C3%84%10o%5D%24%C2%82%C2%B7.%C3%A2%C2%BC%C2%8B%C3%BDE%C3%948a%C3%82%04DNj%18%C2%80P%0C7%20%13d%C2%BBX%22%C2%9E%C2%BEL%7F%C3%BF%C3%81%C2%8A%25%C2%A6%C3%B4%3C%C3%9E%C3%BA%C2%81%03%07v%C3%AF%C3%9E%C2%AD%C3%BA%C3%87%C2%8A%15%2B%C2%8A%C3%91%C2%BD%0A6%C2%899%C2%8AG4%C2%BFSe%C2%81%C2%A0%3D%3C_%C2%82k%C2%AF%C2%89%C3%B3%1E%19%19Y%C2%BE%7CyV%C3%BAR%C2%B2dIw%C3%A1%C2%AD%5B%C3%A8%2F%C2%92G4%1E7%C3%80%C2%A4%C2%B5l%C3%99%C2%92%C2%ADz%C2%A8u%C3%86%C2%9Ag%C2%B9H%7Fe%C2%B2%C2%A8%7F%C2%92b%11%C2%BCu%C2%84%02%C3%88%C2%A8%C3%B9%2B%22%C3%AE9%C3%AC%01%C3%99%C2%9D%208%C3%AF%16%C3%88%10%C3%97%5E%C3%91%C3%82%3D%C3%8F%0A%C2%BCu%C2%91%0C%C3%BB%2B%C3%A2%C3%8B%C2%93%0F%04%C3%83%C3%B7%11%C2%B0%2Bk%C3%B8%C3%B2O%C3%AE)%1D%C2%91H%C2%91%C3%9A%C2%A1C%C2%87%08%C3%90%C2%B9%C2%88%7BNN%3B%C2%898%C3%AF%16%C3%88%10%C3%97%5E%C3%91%C3%82%3D%C3%8F%0A%C2%BCu%C2%91%0C%C3%BB%2B%C3%A2%C3%8B%C2%AF%5E%C2%BD%C2%9A%C3%BF%15j%C2%84%18K%C2%BF%C2%BF2%C3%B8%C3%B2%C3%BF%24%C3%85%22U%C2%87%C3%B8%C2%B5Q%C2%A3F%C3%BC%15%11%C3%B7%C2%BCf%C3%8D%C2%9A%C2%A4%C3%A6'%C3%B3%C3%9F%C3%872%C3%84%C2%B5W%C2%B4p%C3%8F%C2%B3%02o%5D%24%C3%83%C3%BE%C2%8A%C3%B8%C3%B2%03%07%0E%C3%A4%C2%93%3E%C3%B8Gr%C2%AA%C3%8C%1A%C2%BE%C3%BC%3F%C3%89%15%C3%82*%C3%B08%C3%AF%C2%B0%C3%980%03%C2%AA%C2%98%5E%7F%C3%BDuq%C3%9B'%3D%3D%C2%BDw%C3%AF%C3%9El%C3%A5%C2%A6h%C3%91%C2%A2%C3%AA6H%26I%1F%C3%97%1E%C2%B9%C2%A7%18ce%11%C3%9E%C2%BA%C2%85%C3%BEn%C3%9D%C2%BAU%C3%A5%0B%C2%ADB%C3%B8%C2%AF%1E%C2%AF%08%0A%0A%C3%92%C2%84%14%C2%805%C3%95%C2%97%C3%B3%3F%2C%C3%86%12q%C3%8FE%C2%9Cw%24)%08h4%C3%91%0AU%3Av%C3%AC%18%C3%82O%C2%B5%C2%92%0Cn%C2%A8S%C2%A7N%C2%9D%3Bwf%C2%9B%C2%B8P%C2%82%05%0B%16%20%06%C2%82%C2%94%C3%A5%C2%BFPj%C2%88k%C2%AF%C2%B9W%C2%9Dy%C2%BCuB%C2%9A8%C3%AF%C2%A4%C2%BF%22%11%C2%BE%C2%AC%C2%A6r%C3%B3%C3%A6%C3%8D%3A%C3%95%C2%942r%C3%BEg(%16%C3%81%1Fg%C2%B8%C3%A7%7C%C3%89%C2%80%C2%85c%C3%AC%C2%A0%15%2BV%C3%B0K%C3%8F%18%C2%80Q%C2%A3F%C3%B1%C2%AB%C2%A3n%C3%81%C2%B5%C2%B7%402x%C3%AB%C2%A2%C2%A6%C3%B2Kn%C3%96p%C3%9E%C2%B3%C2%88%C2%8C%15K%3C%C3%9B%C3%AF%16%C3%85%22%2B%C3%82%C2%A2b%19%C3%A2%C2%BC%C2%87%C2%86%C2%86Z%C3%80T%C3%A2%C3%AB%5B%40%C3%A1%C3%A1%C3%A1%04%C3%B1%C3%8C-%C2%B8%C3%B6%16%C3%88%10o%5D%24%C3%9C%40%1E%C2%B1%C2%80%C3%B3%C2%9EEd%C3%BCmY%C2%82%C3%B1%C3%AD%16B%C3%AAAP%C3%8EE2%C3%84yG%C3%83%08%C3%9A%C2%B8%0C%C2%91%C3%B4-!!%C2%81%00%C3%9A%C2%BA%05%C3%97%C3%9E%02%19%C3%A2%C2%AD%1B%C3%B6E%C2%B1%C2%84%C3%B3%C2%9EE%C3%A4!%C2%A6%3Cd%C3%BB%09%C2%A2'%C3%B7X%18N%C3%841D%22%C3%BC%C3%A7%C2%9FY%C3%98H%1Ei%C3%92%C2%A4%09%7Fl%10%26m%C3%A6%C3%8C%C2%99%C3%BC%0D%C2%8D%1B7%C2%B6%00ZINP%C2%8D%1E%3D%C2%BAe%C3%8B%C2%96%C3%BC%15%C2%82%C2%B5%22%12%2C%1C)%C3%9D%26o%C2%B0F%C2%A4%C2%BFaaa%C2%86%C2%9F%10C6%C3%80%C3%97%C3%A8A%1AYz%5C%2FS%7B%C2%85p.%04%5C%05%C2%BF%C2%92E%C3%A1v%C3%AD%C3%9A%C3%A51I%C2%88%C2%8E%C3%B97%C3%AC%C3%99%C2%B3%C2%87T%C2%BBb%C2%BCEs*%C3%A2%C2%8F%C3%8F%C2%993%07n%08C%3B%7C%C3%B8p%C2%B5%0A%0Fs%5D~K%04%C3%B6%06%C3%8F%C2%A2S%C3%B0%C2%A4%C3%AC%C2%B3M%08n2%C2%8F%C3%B3%C3%AE%C2%8A%C2%97%C3%A1%06%C2%88%2B%5C%7B%C3%B5d%0E%C3%8FW%C3%AC%2F%C2%82nk8%C3%AF%C2%9A%C2%B5%C2%8Dnt%C2%85%C3%94be%C3%8B%C2%96%C2%8D%C2%842%C3%91%C3%91%C3%91%3Bw%C3%AE%C3%A4%C2%AF%7C%C3%B1%C3%85%17%7F%C2%98%24%C3%A4%C3%A4%C3%BC%1BXNk%C2%B8%C2%8A%23%C3%A2%C2%8F%C2%AB%2B.%C2%98%00%C2%90%26%C3%BE%C3%AD%C3%9F%C2%BF%3FC%1C!gD%5D%11r%C3%AC%193f%C2%9Ct%12%C2%92%2Ff%C2%803%C2%83%C3%B3%C3%AE*T0%C3%84y%C3%87E%1D%5C%7B%26%1F%C3%82%C2%97%C3%AF%C3%AF%C3%B4%C3%A9%C3%93%C3%99B%C2%B9)%C2%9Cw%C3%8D%C2%B3%05%C2%868%C3%BEn%C2%B0X%20%C2%86%C2%AF%C3%82%C2%93%7Bk%C3%9E%C3%8F%C2%9D%3BG%C2%90E%3C%3D%3Dej%3B%0D%C3%B1%C3%96U%C2%80PyB%C2%A8%C3%87%C2%87%C3%B3%C3%96p%C3%9EE%C2%BE%04%C3%97%5E%C3%84y'%7CE%5C%7B%C2%B89%C2%B2%3Fc%01_%5E%13%C3%A7%C2%9D4%C3%95-8%C3%BER5%C3%AF111%22v%C2%B4%C2%B5%C3%83e%C2%9A%0E%C2%A5A%C2%83%06%C3%A4%C3%A5%2F%C2%BD%C3%B4%C2%92L%C2%8D%C2%A2!%C3%9E%3Ab%1D%C2%B3%C3%AD%C2%815%25%C2%85o%16p%C3%9EE%C2%BE%04%C3%97%5E%C3%84y%17%C3%B9%12Dk%3CB%60%C3%80-%C3%A0%C3%8B%C2%8B8%C3%AF%C2%88%C3%9BHS%C3%9D%C2%82%C3%A3%2F%C2%B5W%C2%88%C2%B8%01V%C2%94%5C%C2%84%C3%97%C2%98%3Auj%26%C2%AD%23r%16%18%7F%C2%B4%C2%9B%5C%C3%87X%C3%8A%1C02%C3%84%5B'7%C3%88%10%C2%86%C2%8A%C2%94PZ%C3%80y%17%C3%B9%C2%92%2B%22%C3%8E%C2%BB%C3%88%C2%97%C3%ACI%C3%83%C2%8A%C2%93%C3%9A%40%0B%C3%B8%C3%B2%22%C3%8E%C2%BB%C2%98%C3%AE%C2%B8%05%C3%87_%C3%8A%15%C3%9A%C2%9D%C2%87%3A4q%C3%A5%C3%9B%C2%B4i%23%C2%BF%C3%B6J%C3%AA%C2%B5%11%C2%89k%C3%AE1!%C3%AAt%C3%B5%C2%85UB%C2%86x%C3%AB%C2%BBw%C3%AF%C2%B6%C3%906%C2%A85%3F0%16p%C3%9EE%C2%BE%04%C3%97%5E%13%C3%A7%C2%9D%C3%A7%2B%C3%A2%C3%9AC%C3%94%C2%88%2F%C3%B9Q'%7C%C2%AD%C3%A1%C2%BC%C3%B3_%C3%9Db%C3%A4%16%1C%7F%C2%91%5C%22%C3%BA%C2%A1%1B%C2%9A%C2%A7%C2%961%C2%93%1A6lX%C2%BBvm%24V%C2%86%16%02%C3%BA%C2%94%C2%94%C2%94%04%2F%C2%80%C3%AE%1D%3AtH%C2%BC%01%C3%B3%18%19%C2%A2a%5E%C2%AD%12D%09%C3%A1%22%C3%A5%C2%81%C3%A5c9%3F%C2%A2%C2%8A%0D%1B6%60%C2%92%0D%1C8%C2%90m%C3%ABbP%11%C2%98C%C2%BE%C2%92%10%C2%9DPk%C3%84%C3%88HP%C2%A0%0AC%C2%87%0E%25%18T%C3%B2%7C%C3%85B%03%C3%88%C3%B0%C3%92%C2%A5KH%C3%B1z%C3%B6%C3%AC%09%C2%93%0Ci%C2%A0%C2%B3%18%5D%C2%A4~0W%22_%C2%84%C3%B3%C2%9F%7C%C3%B2%09%C2%82%1Eh%18%5E%0B%7B%C2%83%C2%80%C2%AFW%C2%AF%5E%C2%B1%C2%B1%C2%B1%1F~%C3%B8%C3%A1%C2%9Bo%C2%BE%C2%89%C3%97%C3%8E%C2%9B7%0F%C3%89lHH%08%12%C2%A0%C2%8A%15%2B%22%1E%C3%82%23%C2%90m%C3%B9%C3%B2%C3%A5%C3%B1%C2%92%C2%A0%C2%A0%20%C2%91%2FR%5DD%C3%B4%18%C3%A8%1E%3Dz%C2%B0%C2%B3%7D%18%14%C3%8C%16%183Vw%C2%84%C3%B7%23%C2%B0%C3%A6%C3%B9%C3%8A%C3%88%C3%8D%40%C3%8E%3AJ%C3%87z%C2%92%C2%A5%C3%A4%C3%B6%C2%95b%C2%88%C2%9B-%C2%89%C3%81%C3%BB%18%C2%AE%C2%A1%3FN%C2%BAx%C3%B1%C2%A2%C2%BA%C3%88%04%C3%93%C2%82%7C%C3%8D%C3%B0%11vb%C2%8Cm%C2%BACw%C3%8F%C2%9F%3F%C3%AF%16%C2%9Cw%C2%B8%0E%C2%B6s%00%15%C3%AF%C3%9D%C2%BB%C2%B7%C2%A4%C2%BB0%2BgE%7F%2B%C2%8A%2C%13%C2%B8%C2%91%60%C3%B9Dx%C2%A7L%C2%92%5B%C3%B0%C3%96%C2%B3%C2%88%08%40%01%C3%AC%C2%90%C3%A1%23%C2%86x%C3%ABY%C2%84%C3%B3%C3%AE%169%1BCEN%C2%980%C3%81%C3%AD%07u%60%C3%BC%7F%C3%BA%C3%A9'%C2%B7%0F%C2%9E%5B%C3%B0%C3%96%C2%B3%C2%88%0C%C3%B7FE2%C3%84%5B%C3%8F%22%C2%9Cw%C2%B7%C3%88%C3%99%C2%B8%C3%90o%C3%BC%C3%B8%C3%B1%C3%9B%C2%B6m%23%25u%C2%96%09f%1C%C2%8E%1F%C2%A1%C2%83%C3%A1%C3%8E%C2%89%05r%0B%C3%9Ez%16%11%C2%81S%C2%97%C3%81t5%C3%84%5B%C3%8F%22%C2%9Cw%C3%B7%C3%88Y%5EO%7F%C3%BE%C3%B9%C3%A77%C3%9Ex%C2%83O%3A%C3%A4%096%0F%11%3A%C2%A2N%C3%89C%C3%AE%C2%96i%C3%8A%C2%94)*%C3%93%3E%7D%C3%BAX%C3%80%5B%C3%8F%22%22%C3%B8%C3%B2%C2%91%C2%91%C2%91%C2%86%C2%8F%24%24%24%C2%88%C2%B8%C3%B6%C3%AA%C2%8AC%C2%95*U%C2%AC%C3%A1%C2%BC%7F%C3%B7%C3%9Dw%C2%AAZ4k%C3%96%C3%8C%C3%82aT%199%C2%9B%C3%86yG%C3%80%C2%88%C2%84%3C%3A%3A%3A..N%06%7B%08%C3%A9%0F%C2%9C%3A%26hxx%C2%B8%26%C2%98%C2%9B%C3%9B%09%C2%99%17%C3%94%C2%B7T%C2%A9R%04%C3%9D%C3%A4o'%11_%5E%C2%A6%C3%A4%C2%81%C3%A0%C3%9A%C2%8Bx%C3%AB%16%C3%A8%C3%98%C2%B1cp%1A%05%0B%16%C2%84%C3%9F%10%C2%BF_%C3%A2%169%C2%9BV%C2%AC%C2%A7%C3%B4%C2%94%C2%AC%C2%94%C3%8D%3C%C2%A5%C2%A7%C3%B4T%C2%B1%C2%9E%C3%92S%C3%85zJO%15%C3%AB)%3D%C2%A5%C3%8C%C3%93%C3%BF%090%00%C2%8A%C2%A2%C2%8A%C2%92%0E%17Q%C2%91%00%00%00%00IEND%C2%AEB%60%C2%82";

var tab = tabPanel? tabPanel.selection.text:"";

tabPanel.onChange = function () {
	if (!tabPanel) return;
	if (!tabPanel.selection) return;
	tab = tabPanel.selection.text;
	randomPanel.enabled = tab == "Voronoi" ? voronoiRandomizeFills.value : triangleRandomizeFills.value;
};

triangleRandomizeFills.onClick = voronoiRandomizeFills.onClick = function () {
	randomPanel.enabled = !randomPanel.enabled
}

triangleRandomizeFills.onClick = voronoiRandomizeFills.onClick = function () {
	randomPanel.enabled = !randomPanel.enabled
}

//// extra points and path

function updateExtraPoints(dis) {
	topPathC.enabled = !dis.value;
	extraPointsST.enabled = extraPointsT.enabled = dis.value;
	dis.enabled = dis.value || dis.enabled;

}
function updateTopPathC(dis) {
	extraPointsST.enabled = extraPointsT.enabled = extraPointsC.enabled = !dis.value;
	dis.enabled = dis.value || dis.enabled;
}

extraPointsC.onClick = function () {
	updateExtraPoints(this)
}

topPathC.onClick = function () {
	updateTopPathC(this)
}

/////////////////////////////////////////
voronoiCutOutside.onClick = function () {
	CutAccST.enabled=
	cutAccDD.enabled=
	voronoiRemoveOutside.enabled = this.value;

}



buyMe.onDraw = function () {
	var g = this.graphics;
	var img = ScriptUI.newImage(File.decode(buyMe_imgString));
	if (img) {
		g.drawImage(img, 0, 0, 120, 120);
	}
};
buyMe1.onDraw = function () {
	var g = this.graphics;
	var img = ScriptUI.newImage(File.decode(buyMe_imgString));
	if (img) {
		g.drawImage(img, 0, 0, 120, 120);
	}
};

addLinkG(buyMeGO, buyMeG, "https://buymeacoffee.com/gontis")
addLinkG(buyMeGO1, buyMeG1, "https://buymeacoffee.com/gontis")

slider0.maxvalue = 100;
slider1.maxvalue = 255;
slider2.maxvalue = 255;


var settings = new Settings(palette, "Triangulator Pro");


var sliderL = SliderText(slider0, sliderT0, null)
var sliderA = SliderText(slider1, sliderT1, null, "HALF_NEGATIVE")
var sliderB = SliderText(slider2, sliderT2, null, "HALF_NEGATIVE")

addLink(helpLinkG, "Usage help: www.illustratorscripts.com", "https://illustratorscripts.com/scripts/triangulator/");

progressBar.value = 0;

createB.onClick = function () {
	 if(Math.random()>.94){		
	 	buyMeG1.visible=true;
	 	buyMeGO.visible=true;
	 }
	execBT(processSelection);
}

function showMessage(msg) {
	statusT.text = "" + msg;
};

function showProgress(big, bigTotal, small, smallTotal) {
	small = small || 0;
	smallTotal = smallTotal || 1;
	var totalProgress = (big + small / smallTotal) / bigTotal;
	var percent = Math.min(1, Math.max(0, totalProgress)); // clamp 0–1
	try {
		progressBar.value = percent * 100;
		//progressBar.window.layout.layout(true);

	} catch (e) { log(e); }
	return percent;
}


updateTopPathC(topPathC)
updateExtraPoints(extraPointsC)

buyMeGO.visible=false;
buyMeG1.visible=false;

palette.show();

// END INCLUDE: augmentDialog.jsx




//(c) www.illustratorscripts.com



/*///////////////////////////////////


this is combined triangulator and voronoi


todo - 

isskirstyti

work on ability/ system with top object
  paziet ar jis kitam lejery.
  paziet ar jie overlapina??
  jei daug objektu ir vienas kitam lejeri, tai ok
  jei du objektai ir overlapina, ok

finalize triangulator:
ability to have several objects
  framework
  distribute points
LAB coloring 
progress

should round?
save settings
remove last generation?
panele!!!


perziuret voronoju


finalings

*light variation
*edges
*sliders bad
*hidden add points upon start


*progress bar
*messages

*align enjoy?
*show hide enjoy



BUGS

trianglai cp nededa pointu
perziureti broken.ai !!! nesutvarkytas, nes cp sukeistas polariksuma,s vidui pathas teigiamas, isorej neigiamas




isvalyti dependencies
help vid







/*///////////////////////////////////

/////////////////////////////////////// some globals taht shoudn't


//)!!!!!
function log(){
}
log.setLoc=function(){};
///!!!!!

var drawEdges;
var cutOutside;
var removeOutside;
var randomizeFills;




/////////////////////////////////////// Color stuff

var L = 20;
var A = 10;
var B = 10;
var LAB_COLOR_A = [100, 0, 0];

var LAB_WHITE = new LabColor(); LAB_WHITE.l = 100; LAB_WHITE.a = 0; LAB_WHITE.b = 0;


function getNextColor(l, a, b) {
  if (!randomizeFills) return LAB_WHITE


  l = l || L;
  a = a || A;
  b = b || B;
  var color = new LabColor();
  var sign = Math.random() > .5 ? 1 : -1;
  color.l = limit(l * Math.random() * sign + LAB_COLOR_A[0], 0, 100);
  color.a = limit(a * Math.random() + LAB_COLOR_A[1], -128, 127);
  color.b = limit(b * Math.random() + LAB_COLOR_A[2], -128, 127);

  return color;
}
function getBaseColor(path) {
  //this is ugly as shit, refactor;

  var doc = app.activeDocument;
  var sourceSpace = doc.documentColorSpace == DocumentColorSpace.CMYK ? ImageColorSpace.CMYK : ImageColorSpace.RGB;


  var WHITEC = c = new CMYKColor(); c.cyan = 0; c.magenta = 0; c.yellow = 0; c.black = 0;
  var WHITER = c = new RGBColor(); c.red = 255; c.green = 255; c.blue = 255;

  var defaultColor;
  if (sourceSpace = ImageColorSpace.CMYK) {
    defaultColor = WHITEC
  } else {
    defaultColor = WHITER
  }

  var color = path.fillColor || defaultColor;

  sourceSpace = color.constructor.name == "RGBColor" ? ImageColorSpace.RGB : ImageColorSpace.CMYK;


  var components = extractColorComponents(color);
  LAB_COLOR_A = app.convertSampleColor(sourceSpace, components, ImageColorSpace.LAB, ColorConvertPurpose.previewpurpose);
}

function extractColorComponents(color) {
  switch (color.typename) {
    case "RGBColor": return [color.red, color.green, color.blue];
    case "CMYKColor": return [color.cyan, color.magenta, color.yellow, color.black];
    case "LabColor": return [color.l, color.a, color.b];
    case "GrayColor": return [color.gray];
    default: return [0, 0, 0]; // fallback
  }
}
function limit(val, min, max) {
  if (val < min) return min
  if (val > max) return max
  return val
}

//////////////////////


function processSelection() {
  log("processSelection");
  showMessage("Creating..");
  if (!app.documents.length) {
    showMessage("Create a doc first..");
    return;
  }
  doc = activeDocument;
  coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
  doc.rulerOrigin = [0, 0];


  /* get initial values */
  var isVoronoi = tab != "Triangles";

  drawEdges = isVoronoi ? voronoiDrawEdges.value : triangleDrawEdges.value;
  cutOutside = voronoiCutOutside.value;
  removeOutside = cutOutside && voronoiRemoveOutside.value;
  randomizeFills = isVoronoi ? voronoiRandomizeFills.value : triangleRandomizeFills.value;

  var darkness = ~~sliderT0.text;
  var greenRed = ~~sliderT1.text;
  var blueYellow = ~~sliderT2.text;

  var extraPoints = extraPointsC.value;
  var extraPointsCount = extraPoints ? ~~extraPointsT.text : 0;
  var useTopPathForPoints = topPathC.value;


  var topPath;
  var sel = doc.selection;
  var selSave = [].concat(sel);
  var selLen = sel.length;

  L = darkness;
  A = greenRed;
  B = blueYellow;


  trianglesStroked = strokedCells = drawEdges;
  ACCURACY = ~~cutAccDD.selection.text;



  /*process selection*/

  if (!selLen) {
    showMessage("Select something");
    return;
  };

  if (useTopPathForPoints && selLen >= 2) {
    /*    
        neaisku ar reikai sito checko
        var top = sel[0];
        for (var i = 1; i < sel.length; i++) {
          boundsOverlap(...)
        }
        boundsOverlap
     */

    topPath = sel.shift();
    selLen--;
  };


  /* i helper lay viskas yra kopijuojama*/
  var helperLay = doc.layers.add();
  helperLay.name = "voronoiPathsHelper";

  for (var i = 0; i < selLen; i++) {
    processItem(sel[i], helperLay, !isVoronoi);
  };

  if (isVoronoi) {

    voronoi(helperLay, extraPointsCount, topPath);
    doc.selection = selSave;
    /*     for (var i = 0; i < selSave.length; i++){
            selSave[i].selected = true;
            log(selSave[i]);
        }; */
  } else {
    triangulateLayer(helperLay, extraPointsCount, topPath);
  };

  app.executeMenuCommand("consolidateAllWindows");

  if(statusT.text!="User exit")
    showMessage("OK!");


};

function boundsOverlap(item1, item2) {
  var a = item1.geometricBounds; // [x1, y1, x2, y2]
  var b = item2.geometricBounds;
  return !(a[2] <= b[0] || a[0] >= b[2] || a[3] <= b[1] || a[1] >= b[3]);
};

function triangulateLayer(helperLay, extraPoints, topPath) {
  var lay = doc.layers.add();
  lay.name = "triangulated";
  var areas = [];
  var areaSum = 0;
  //  var largestArea = -1000000;
  //ar tikrai tik path itemsai?

  for (var i = 0; i < helperLay.pageItems.length; i++) {
    var path = helperLay.pageItems[i];
    var area = (path.constructor.name=="CompoundPathItem")? getCPArea(path): path.area;
    area = Math.abs(area);
    areas[i] = area;
    areaSum += area;
  }

  for (var i = 0; i < helperLay.pageItems.length; i++) {
    progressBigTotal = helperLay.pageItems.length;
    progressBigC = i;
    showProgress(progressBigC, progressBigTotal);

    var path = helperLay.pageItems[i]
    // var n = path.note;
    // if (n == "inner") continue;
    var numPoints = Math.round(areas[i] / areaSum * extraPoints);
    triangulator(path, lay, topPath, numPoints);
    redraw();
  }
  helperLay.remove();
}

function getCPArea(cp) {
  var c = classifyCompoundPath(cp);
  var sumA = 0;
  for (var i = 0; i < c.holes.length; i++) {
    var o = cp.pathItems[c.holes[i]];
    sumA += Math.abs(o.area);
  }
  var outer = Math.abs(cp.pathItems[c.outer].area);
  return Math.abs(outer-sumA);
}



//) for debug only
function getItemByNote(note, collectionType, doc, options) {
  doc = doc || activeDocument;
  collectionType = collectionType || "pageItems";
  var items = doc[collectionType];
  var l = items.length;
  for (var i = 0; i < l; i++) {
    var item = items[i];
    var itemNote = item.note;

    if (options) {
      if (options.capitalize)
        itemNote = itemNote.toUpperCase()
      if (options.partial)
        if (itemNote.indexOf(note) >= 0) return item
    }
    if (itemNote == note) return item
  }
}
//to avoid being called from other things
function main() {
  if (!main.THE_ONE) return
  log.setLoc($.fileName)
}
main.THE_ONE = true;

main();
//processSelection();


