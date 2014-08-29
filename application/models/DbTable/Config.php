<?php

class Application_Model_DbTable_Config extends Zend_Db_Table_Abstract
{

    protected $_name = 'config';
	
	public function getConfigs(){
		$arr = array();
		$rows = $this->fetchAll()->toArray();		
		foreach($rows as $r){
			$arr[$r['name']] = array();
			$arr[$r['name']]['value']  = $r['value'];
			$arr[$r['name']]['params'] = unserialize($r['description']);
		}
		return $arr;
	}	
	
	public function getConfigFace(){
		$arr = array();
		$row = $this->fetchRow("name='xahoi'");	
		if($row){
			$arr = unserialize($row->description);
		}			
		return $arr;
	}
	
	public function getAds($position = "ads-left"){
		$arr = array();
		$row = $this->fetchRow("name='{$position}'");	
		if($row){
			$arr = unserialize($row->description);
			$arr['value'] = $row->value;
		}			
		return $arr;
	}
}

