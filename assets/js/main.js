(function(){
"use strict";
const ver = 0.2; 

//console
window.onload = function(){
    var now = new Date().getTime();
    var page_load_time = now-performance.timing.navigationStart;
    console.clear();
    console.log('%c今天你入关了吗？','font-size:2em');
    console.log('%c页面加载完毕，消耗'+Math.round(performance.now()*100)/100+'ms','background:#fff;color:#333;text-shadow:0 0 2px #eee,0 0 3px #eee,0 0 3px #eee,0 0 2px #eee,0 0 3px #eee;');
};
})