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
    console.log('%c今天你入关了🐎？','font-size:2em');
    console.log('%c页面加载完毕，消耗'+Math.round(performance.now()*100)/100+'ms','background:#fff;color:#333;text-shadow:0 0 2px #eee,0 0 3px #eee,0 0 3px #eee,0 0 2px #eee,0 0 3px #eee;');
};
window.rgResult = [];

//监听触发操作
function hashChange(){
    let q={};
    location.hash.replace(/([^#&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
    window.RGQuery = q;

    console.log("Query:", RGQuery);

    if(q.group && q.seq){
        $("#test").fadeIn();
        $("#start").fadeOut();

        let titleData = window.rgData.test[q.group-1].name;
        let contentData = window.rgData.test[q.group-1].data[q.seq-1];

        $("#sequence").html(titleData);
        $("#content").html(contentData);
        
        if(!(titleData && contentData)){
            location.hash="#result="+sum(rgResult);
        }
        if(q.seq > window.rgData.test[q.group-1].data.length &&
            q.group < window.rgData.test.length){
            let gro = Number(q.group)+1;
            location.hash="#group="+ gro +"&seq=1";
        }
    }

    if(q.result != null){
        $("#btns").fadeOut();
        $("#sequence").text("您的入关学浓度："+q.result);
        $("#test").fadeIn();
        $("#content").html(123);
        $("#startButton").text("重新测试");
    }

}

function sum(arr){
    var sum = 0;
    arr.forEach(function(val,index,arr){
        sum += val;
    })
    return sum;
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
    location.href="#group=1&seq=1";
})
$(".btn").click(function(){
    let q = RGQuery;
    if(q.seq != null){
        let addVal = rgData.test[q.group-1].opt[this.value];
        window.rgResult[q.group+q.seq] = addVal;
    }
    

    let seq = Number(q.seq)+1;
    location.hash="#group="+ q.group +"&seq="+seq;
})