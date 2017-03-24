var JSONStream = require('JSONStream')
var Readable = require('stream').Readable
var Writable = require('stream').Writable
var Transform = require('stream').Transform
var https = require('https')

var faucet = Readable({objectMode: true});
faucet._read = function () {
  // sets a readable stream that setQuote can implement
};

Meteor.methods({
  startStream: function () {
    setTimeout(function(){
      clearTimeout(timer)
      faucet.push(null)
    }, 5 * 1000);

    function getQuote(ticker) {
        https.get({
            port: 443,
            method: 'GET',
            hostname: 'www.google.com',
            path: '/finance/info?client=ig&q=' + ticker,
            timeout: 1000
        }, function(response) {
            response.setEncoding('utf8');
            var data = '';

            response.on('data', function(chunk) {
                data += chunk;
            });

            response.on('end', function() {
                if(data.length > 0) {
                    faucet.push(data.substring(3))
                }
            });
        });
    }

    var previousChunk = null
    const ignoreDuplicates = new Transform( {objectMode: true});
    ignoreDuplicates._transform = function (chunk, encoding, done) {
        if (previousChunk!==chunk){
          ignoreDuplicates.push(chunk)
        } else {
          console.log("duplicate, ignoring")
        }
        done()
    }

    // for safety, since we never know the size of the object
    var parseStream = JSONStream.parse('*');
      // db.insert(doc); // pseudo-code for inserting doc into a pretend database.
    // });

    const transformStream = new Transform( {objectMode: true});
    const jsonCleaner = function (chunk) {
      // console.log('jsonCleaner chunk', chunk);
      transformStream.push(chunk)
    }
    transformStream._transform = function (chunk, encoding, done) {
        jsonCleaner(chunk)
        done()
    }
    // // for any lines that are not processed, like the last chunk.
    // transformStream._flush = function (done) {
    //   jsonCleaner(chunk)
    //   done()
    // }

    // do the http request every n seconds
    var timer = setInterval(function() {
      // faucet.push('{"a": 3, "b": 4}')
        getQuote('AAPL')

    }, 1000)


    const ensureStringForProcess = new Transform( {objectMode: true});
    ensureStringForProcess._transform = function (chunk, encoding, done) {
      if (typeof chunk === 'object') {
        ensureStringForProcess.push(JSON.stringify(chunk, null, 4))
      } else {
        ensureStringForProcess.push(chunk)
      }
      done()
    }

    const writeToDB = new Transform( {objectMode: true});
    writeToDB._transform = Meteor.bindEnvironment(function (chunk, encoding, done) {
      if (typeof chunk === 'object') {
        Lake.insert(chunk)
      } else {
        console.log('not object cant persist');
      }
      writeToDB.push(chunk)
      done()
    })

    faucet.pipe(ignoreDuplicates).pipe(parseStream).pipe(transformStream).pipe(writeToDB)

    // for debugging
    writeToDB.pipe(ensureStringForProcess).pipe(process.stdout);
  }
});
