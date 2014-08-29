$("#form-contact").validate({
	rules: {
		email: {
			required: true,
			email: true
		},
		fullname: {
			required: true,
		},
		title: {
			required: true,
		},
		content: {
			required: true
		},
		captcha: {
			required: true,
			equalTo: "#recaptcha"
		}
	},
	messages: {
		email: {
			required: "Email không được để trống!",
			email: "Email không hợp lệ!"
		},
		fullname: {
			required: "Họ tên không được để trống!"
		},
		title: {
			required: "Tiêu đề không được để trống!"
		},
		content: {
			required: "Nội dung không được để trống!"
		},
		captcha: {
			required: "Chưa nhập kết quả kiểm tra",
			equalTo: "Kết quả không đúng"
		}
	}
});
jQuery(document).ready(function(){
	function initialize() {			
		
		var myLatlng = new google.maps.LatLng(10.7886466,106.6242351);
		var myOptions = {
		  zoom: 14  ,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("single_map_canvas"),  myOptions);		
		map.scrollwheel = false;	 
			var point = new google.maps.LatLng(10.7886466,106.6242351);
			var root = "http://localhost:81/saigonsao/public/";
			
			
		    var $callout  = '<div class="imgmap">';
				$callout +=	'<img style="float:left;margin-right:10px;" src="http://mochisweets.com.vn/wp-content/uploads/2012/09/2_733-160x120.jpg" alt="">';
				$callout +=	'</div>';
				$callout +=	'<h4>Văn phòng Sài Gòn Sao</h4>';
				$callout +=	'<p>';
				$callout +=	'<b>Địa chỉ : </b> 28 Trịnh Lỗi, P.Phú Thọ Hòa, Q.Tân Phú, Tp.Hồ Chí Minh <br> ';
				$callout +=	'<b>Điện thoại :</b> (08) 22148787 - (08) 22148797 - (08) 22121250 <br />';
				$callout +=	'<b>Fax :</b> (08) 39789687<br />';
				$callout +=	'<b>Email :</b> saigonsao.hcm@gmail.com - saigonsao_hcm@yahoo.com';
				$callout +=	'</p>'; 
			
			//var callout =  '<?php echo str_replace("<br/><br/>","<br/>", preg_replace("/[\n\r]/","<br/>",$callout)); ?>';
			var the_link = 'http://localhost:81/saigonsao/public/lien-he';
			//<?php $title = str_replace(array('&#8220;','&#8221;'),'"', "marker title"); ?>
			//<?php $title = str_replace('&#8211;','-',$title); ?>
			//<?php $title = str_replace('&#8217;',"`",$title); ?>
			//<?php $title = str_replace('&#038;','&',$title); ?>
			var the_title = 'marker title'; 		
			var color = 'red';
			createMarker(map,point,root,the_link,the_title,color,$callout);
 }

  function handleNoFlash(errorCode) {
	  if (errorCode == FLASH_UNAVAILABLE) {
		alert("Error: Flash doesn't appear to be supported by your browser");
		return;
	  }
	}
   initialize();
	
});