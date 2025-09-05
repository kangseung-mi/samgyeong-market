$(document).ready(function(){
    if(!location.href.includes('ecudemo')){
        if ($('.snsArea li.displaynone').length + $('.snsArea li.dp_sample').length  == $('.snsArea li').length){
            $('.snsArea').addClass('displaynone');
        }
    }
});