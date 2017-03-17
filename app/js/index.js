'use strcit';

// var ArtyomBuilder = require('artyom.js').ArtyomBuilder;
// var artyom = ArtyomBuilder.getInstance();
// var WtoN = require('words-to-num');

var user = {
    name: 'Human'
};

window.onload = function() {

    artyom.when('ERROR', function(err) {
        console.error('Arytom Error: ', err.code);
    });

    artyom.say('Jarvis online');
    // artyom.newPrompt({
    //     question: 'Well hello there. What is your name?',
    //     smart: true,
    //     options: ['*'],
    //     onMatch: function(i, name) {
    //         var action;
    //         user.name = name;

    //         action = function() {
    //             artyom.say('It is nice to meet you ' + user.name);
    //         };
            
    //         return action;
    //     }
    // });
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
    {
        indexes: ['count to *'],
        smart: true,
        action: function(i, input) {
            var number = WtoN.convert(input);
            
            if (isNaN(number)) {
                return artyom.say(input + 'is not a number silly');
            }

            for (var i = 0; i < number; i++) {
                artyom.say(parseInt(i + 1).toString());
            }
            
        }
    }

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