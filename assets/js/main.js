"use strict";

NProgress.start();

$.ajax(
    {
        url:"data/data.json",
        success:function(result){
            NProgress.done();
            window.rgData = result;
            console.log(result);
        }
    }
    
);

//console
window.onload = function(){
    hashChange();
    var now = new Date().getTime();
    var page_load_time = now-performance.timing.navigationStart;
    //console.clear();
    console.log('%c今天你入关了吗？','font-size:2em');
    console.log('%c页面加载完毕，消耗'+Math.round(performance.now()*100)/100+'ms','background:#fff;color:#333;text-shadow:0 0 2px #eee,0 0 3px #eee,0 0 3px #eee,0 0 2px #eee,0 0 3px #eee;');
};


//监听触发操作
function hashChange(){
    let q={};
    location.hash.replace(/([^#&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
    window.RGQuery = q;
    console.log(RGQuery);

    if(q.group && q.seq){
        $("#test").fadeIn();
        $("#start").fadeOut();

        $("#sequence").text(window.rgData.test[q.group-1].name);
        $("#content").text(window.rgData.test[q.group-1].data[q.seq-1]);
        
        if(q.seq > window.rgData.test[q.group-1].data.length &&
            q.group < window.rgData.test.length){
            let gro = Number(q.group)+1;
            location.hash="#group="+ gro +"&seq=1";
        }
    }



}

//url变化监听器
if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
    window.onhashchange = hashChange;
} else {
    setInterval(function () {
        let ischanged = isHashChanged();
        if (ischanged) {
            hashChange();
        }
    }, 150);
}

$("#start").click(function(){
    location.hash="#group=1&seq=1";
})
$("#btns").click(function(){
    let seq = Number(RGQuery.seq)+1;
    location.hash="#group="+ RGQuery.group +"&seq="+seq;
})