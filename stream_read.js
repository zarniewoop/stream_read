// the node.js 'strem' modules provides the Readable stream type
var stream = require('stream');
// node.js 'util' module provides the inherit() function
var util = require('util');
// then we can use inherits() to make our Answers inherit the Readable methods??
util.inherits(Answers, stream.Readable);

function Answers(opt){
    stream.Readable.call(this, opt);
    this.quotes = ["yes", "np", "maybe"];
    this._index = 0;
}

Answers.prototype._read = function() {
    if (this._index > this.quotes.length){
        this.push(null);
    } else {
        this.push(this.quotes[this._index]);
        this._index += 1;
    }
};

var r = new Answers();
console.log("Direct read: " + r.read().toString());

r.on('data', function(data){
    console.log("Callback read: " + data.toString());
});

r.on('end',function(data){
    console.log("No More Answers.");
});
