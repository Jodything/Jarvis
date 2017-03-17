(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strcit';

// var ArtyomBuilder = require('artyom.js').ArtyomBuilder;
// var artyom = ArtyomBuilder.getInstance();
var WtoN = require('words-to-num');

var user = {
    name: 'Human'
};

window.onload = function() {

    artyom.when('ERROR', function(err) {
        console.error('Arytom Error: ', err.code);
    });

    artyom.newPrompt({
        question: 'Well hello there. What is your name?',
        smart: true,
        options: ['*'],
        onMatch: function(i, name) {
            var action;
            user.name = name;

            action = function() {
                artyom.say('It is nice to meet you ' + user.name);
            };
            
            return action;
        }
    });
};

artyom.addCommands([
    {
        indexes: ['hello', 'hi'],
        action: function(i) {
            artyom.say('Hello ' + user.name);
        }
    },
    {
        indexes: ['my name is *', 'i am *', 'i\'m *', 'this is *'],
        smart: true,
        action: function(i, name) {
            user.name = name;
            artyom.say('Oh Hello ' + user.name);
        }
    },
    {
        indexes: ['thank you'],
        action: function(i) {
            artyom.say('you are welcome ' + user.name);
        }
    },
    {
        indexes: ['what is your name', 'whats your name', 'who are you'],
        action: function(i) {
            artyom.say('I am Jarvis');
        }
    },
    {
        indexes: ['Jarvis repeat after me *'],
        smart: true,
        action: function(i, wildcard) {
            artyom.say(wildcard);
        }
    },
    {
        indexes: ['ABC\'s', 'sing ABCs', 'ABCs'],
        action: function(i, wildcard) {
            artyom.say('A, B, C, D, E, F, G. H, I, J, K, L M N O P. Q, R, S. T, U, V. W, X. Y and Z.. Jarvis said his abc\'s. Next time there will be a fee.');
            artyom.clearGarbageCollection();
        }
    },
    // {
    //     indexes: ['count to *'],
    //     smart: true,
    //     action: function(i, input) {
    //         var number = WtoN.convert(input);
    //         console.log('=>', number);
    //         console.log('num', parseInt(number.toString()));
    //         console.log('nan', isNaN(parseInt(number)));
    //         if (isNaN(parseInt(number))) {
    //             return artyom.say(number + 'is not a number silly');
    //         }
    //         for (var i = 0; i < number; i++) {
    //             artyom.say(number[i]);
    //         }
            
    //     }
    // }

]);

// Start the commands !
artyom.initialize({
    lang: "en-US",
    continuous: true, // Listen forever
    soundex: true, // Use the soundex algorithm to increase accuracy
    debug: true, // Show messages in the console
    // executionKeyword: "and do it now",
    listen: true // Start to listen commands !
}).then(() => {
    console.log("Artyom has been succesfully initialized");
}).catch((err) => {
    console.error("Artyom couldn't be initialized: ", err);
});
},{"words-to-num":2}],2:[function(require,module,exports){
var WtoN = {
  units: {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
  },
  magnitudes: {
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000
  },
  convert: function (words) {
    return this.compute(this.tokenize(words));
  },
  tokenize: function (words) {
    var array = words.split(' ');
    var result = [];
    array.forEach(function (string) {
      if ( ! isNaN(+string)) {
        result.push(+string);
      } else if (string == 'and') {
      } else {
        result.push(string);
      }
    });
    return result;
  },
  compute: function (tokens) {
    var result;
    var ins = this;
    var temp = 0;
    var sum = 0;
    result = tokens.forEach(function (token) {
      if (ins.units[token] != null) {
        sum += ins.units[token];
      } else if (token == 'hundred') {
        sum *= 100;
      } else if (! isNaN(token)) {
        sum += token;
      } else {
        mag = ins.magnitudes[token];
        temp += sum * mag;
        sum = 0;
      }
    });
    return temp + sum;
  }
};

module.exports = WtoN;

},{}]},{},[1]);
