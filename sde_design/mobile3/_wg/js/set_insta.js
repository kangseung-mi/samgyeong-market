// http://instafeedjs.com/ 참고
var userFeed = new Instafeed({
    
    
    
    /****************************************** 해당 부분만 수정 ******************************************/
    
    userId: '2465818205', //유저아이디
    accessToken: '2465818205.72f2316.e43f9428f90b40d1898ff10aeac82209', //유저아이디+억세스토큰
    
    /****************************************** 해당 부분만 수정 ******************************************/
    

    
    get: 'user',
    sortBy: 'most-recent',
    limit: 20,
    resolution: 'low_resolution',
    template: '<li><a href="{{link}}" style="background:url({{image}}) no-repeat 50% 50%;" target="_blank"><img src="/_wg/img/blank.gif" /></a><p>{{caption}}</p></li>',
});
userFeed.run();