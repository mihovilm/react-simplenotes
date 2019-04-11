// change require to es6 import style
import $ from 'jquery';

let sec = 0;
setInterval( () => {$('#main').text(`You've been on this page for ${sec++} seconds.`);}, 1000);