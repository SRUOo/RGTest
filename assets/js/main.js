"use strict";

NProgress.start();
window.rgData;

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
    console.clear();
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

        $("#sequence").html(q.group + "." + q.seq);
        $("#content").html(contentData);
        
        if(!(titleData && contentData)){
            location.hash="#result="+sum(rgResult);
        }
        if(q.seq > window.rgData.test[q.group-1].data.length &&
            q.group < window.rgData.test.length){
            let gro = Number(q.group)+1;
            location.hash="#group="+ gro +"&seq=1";
        }
        if(q.tip != null){
            showTip(q.tip);
        }else{
            $("#tip").modal("hide");
        }
    }

    if(q.result != null){
        let k = compare(q.result);
        $("#btns").fadeOut();
        $("#sequence").text(rgData.result[k].name);
        $("#test").fadeIn();
        $("#content").html("您的测试结果["+q.result+"]分。<br>"+rgData.result[k].desc);
        $("#startButton").text("重新测试");
        $("#shareButton").fadeIn();
        $("#start").fadeIn();
        $("#shareButton").click(function () {
            let shareContent = "%23RGTV%20%E6%88%91%E7%9A%84%E5%85%A5%E5%85%B3%E5%AD%A6%E6%B5%93%E5%BA%A6%E6%98%AF"+ q.result +"%E5%88%86%E3%80%90"+rgData.result[k].name+"%E3%80%91%EF%BC%8C%E4%BD%A0%E4%B9%9F%E6%9D%A5%E6%B5%8B%E6%B5%8B%E4%BD%A0%E7%9A%84%E5%85%A5%E5%85%B3%E6%B5%93%E5%BA%A6%E5%90%A7~%20https%3A%2F%2Frgtv.sruo.org%2Findex.html";
            window.open("https://twitter.com/intent/tweet?text="+shareContent);
        })
    }

}

function showTip(id){
    $('#tip').modal();
    $("#tipTitle").text(id/10);
    $("#tipContent").html(window.rgData.test[Math.floor(id/10)-1].data[id%10-1]);
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
    if(this.value == ""){
        return;
    }
    let q = RGQuery;
    if(q.seq != null){
        let addVal = rgData.test[q.group-1].opt[this.value];
        window.rgResult[q.group+q.seq] = addVal;
    }
    

    let seq = Number(q.seq)+1;
    location.hash="#group="+ q.group +"&seq="+seq;
})
$("#tipConfirm").click(function(){
    let q = RGQuery;
    $("#tip").modal("hide");
    location.hash="#group="+ q.group +"&seq="+q.seq;
})

function compare(val){
    for(let i = 0; i < rgData.result.length; i++){
        if(val <= rgData.result[i].range){
            return i;
        }
    }
}