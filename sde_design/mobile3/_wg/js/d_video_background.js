$(document).ready(function(){
	(function(){
		var $window=$(window);
		var $video=$('#d_video_back video');

		//창사이즈를 조정할때 사이즈조정
		$window.resize(function(){
			reSizeVideo();			
		})

		
		//해상도를 체크해서 동영상이 중앙에 오도록 조정
		function reSizeVideo(){
			$video.width($window.width());
			$video.height('');
			if($video.height()<$window.height()){
				$video.height($window.height());
				$video.width('');				
			};
			$video.css({'margin-left':-($video.width()-$window.width())/2,'margin-top':-($video.height()-$window.height())/2});	
		}

		
		reSizeVideo();	
		//해상도체크 딜레이가 발생할때를 대비
		setTimeout(reSizeVideo,100);
		setTimeout(reSizeVideo,1000);
	})();
});