var $ = require('jquery');

$(document).ready(function () {
    var incrementer = require('./lib');
    var newVal = incrementer(3);
    $('h1').text('Incrementer: ' + newVal);
});