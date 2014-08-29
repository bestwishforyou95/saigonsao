/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckfinder.com/license
*/
var web_url = "/";
CKFinder.customConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.skin = 'v1';
	// config.language = 'fr';
    
    config.language = 'vi';
    config.height = 400;
    config.width = 740;
	//config.uiColor = '#E7E7E7';
    config.filebrowserBrowseUrl =      web_url+'ckeditor/ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = web_url+'ckeditor/ckfinder/ckfinder.html?Type=Images';
	config.filebrowserFlashBrowseUrl = web_url+'ckeditor/ckfinder/ckfinder.html?Type=Flash';
	config.filebrowserUploadUrl =      web_url+'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
	config.filebrowserImageUploadUrl = web_url+'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images';
	config.filebrowserFlashUploadUrl = web_url+'ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash';
};
