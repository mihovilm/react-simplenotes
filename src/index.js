// change require to es6 import style
import $ from 'jquery';
import './style.scss';

let sec = 0;
setInterval(() => { $('#main').text(`You've been on this page for ${sec += 1} seconds.`); }, 1000);
