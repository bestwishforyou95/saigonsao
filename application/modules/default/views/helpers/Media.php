<?php 
class Zend_View_Helper_Media extends Zend_View_Helper_Abstract{
	
	public function media($id, $file, $width = 270, $height = 221){
		$this->view->headScript()->appendScript( "jwplayer('".$id."').setup({
			'flashplayer': '".$this->view->baseUrl("/")."player/player.swf',
			'skin': '". $this->view->baseUrl("/") ."player/dragon.zip',
			'file': '". $file ."',
			'width': '". $width ."',
			'height': '".$height."',
			'plugins': {
			   'hd-1': {}
			}
		});" );
	}
}
?>