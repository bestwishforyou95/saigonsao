<?php

class Application_Model_DbTable_Categories extends Zend_Db_Table_Abstract
{

    protected $_name = 'categories';
    
    public function getData($parent = 0){
		$auth = Zend_Auth::getInstance();
		$identity = $auth->getIdentity();
        $select = $this->select();
        $select->from(array("c"=>"categories"),array("name"=>"c.name","date_create"=>"c.date_create","status"=>"c.status","idcategory"=>"c.idcategory"))
               ->joinLeft(array("c1"=>"categories"),"c.parent_id=c1.idcategory",array("parent_id"=>"c1.name")) 
			   ->where("c.parent_id=?",$parent)
               ->setIntegrityCheck(false);
		if($identity->groups_id != 1)
			$select->where("c.status!=?",2);
        return $select;
    }
    
    public function getDataPI($parent_id){
        $select = $this->select();
        $select->where("parent_id=?",$parent_id);
        return $this->fetchAll($select);
    }
	
	public function arrayDis($id){
		$arr = array();
		$rows = $this->fetchAll("parent_id='$id'");
		if($rows->count() > 0)
			foreach($rows as $r){
				array_push($arr,$r->idcategory);
				if($this->fetchAll("parent_id='$r->idcategory'")->count() > 0){
					$arr = array_merge($arr, $this->arrayDis($r->idcategory));
				}
			}
		return $arr;
	}
    
    public function arrayChosen($id = 0, $level = 0){
		$level ++;
		$arr = array();
		$rows = $this->fetchAll("parent_id='$id'");
		if($rows->count() > 0){
			$str = "";
			for($i=0;$i<$level-1;$i++)
				$str .= "--> ";
				
			foreach($rows as $r){				
				$arr[] = array("key"=>$r->idcategory, "value"=>$str . $r->name);
				if($this->fetchAll("parent_id='$r->idcategory'")->count() > 0){
					$arr = array_merge($arr, $this->arrayChosen($r->idcategory, $level));
				}
			}
		}
		return $arr;
	}	
}

