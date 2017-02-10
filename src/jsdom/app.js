var $ = require('jquery');

function incrementer (i) {
    $('div').text(i+1);
}

module.exports = incrementer;
