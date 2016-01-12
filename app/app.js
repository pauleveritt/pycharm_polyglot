import $ from 'jquery';
import {ToDos} from './todo';

$(document).ready(function () {

    // All REST requests should send content type, and log failures
    $.ajaxSetup({contentType: 'application/json'});
    $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
        console.error('Ajax call failed:',
            settings.type, settings.url, thrownError);
    });

    let todos = new ToDos();
});



