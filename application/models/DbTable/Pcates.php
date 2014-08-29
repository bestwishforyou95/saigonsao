<?php

class Application_Model_DbTable_Pcates extends Zend_Db_Table_Abstract
{

    protected $_name = 'pcates';    
	
	public function getHome(){
		$select = $this->select();
        $select->from(array("c"=>"pcates"),array("pcate_name"=>"c.pcate_name","pcate_date"=>"c.pcate_date","pcate_orderhome"=>"c.pcate_orderhome","pcate_homeqty"=>"c.pcate_homeqty","pcate_status"=>"c.pcate_status","pcate_showhome"=>"c.pcate_showhome","pcate_id"=>"c.pcate_id","pcate_alias"=>"c.pcate_alias"))
               ->joinLeft(array("c1"=>"pcates"),"c.pcate_parent=c1.pcate_id",array("parent"=>"c1.pcate_name")) 
			   ->where("c.pcate_showhome=?",1)
			   ->order("c.pcate_orderhome ASC")
               ->setIntegrityCheck(false);
        return $this->fetchAll($select);
	}
    public function getData($parent = 0){
		$auth = Zend_Auth::getInstance();
		$identity = $auth->getIdentity();
        $select = $this->select();
        $select->from(array("c"=>"pcates"),array("pcate_name"=>"c.pcate_name","pcate_date"=>"c.pcate_date","pcate_orderhome"=>"c.pcate_orderhome","pcate_homeqty"=>"c.pcate_homeqty","pcate_status"=>"c.pcate_status","pcate_showhome"=>"c.pcate_showhome","pcate_id"=>"c.pcate_id","pcate_alias"=>"c.pcate_alias"))
               ->joinLeft(array("c1"=>"pcates"),"c.pcate_parent=c1.pcate_id",array("parent"=>"c1.pcate_name")) 
			   ->where("c.pcate_parent=?",$parent)
			   ->order("c.pcate_sort DESC")
               ->setIntegrityCheck(false);
		if($identity && $identity->groups_id != 1)
			$select->where("c.pcate_status!=?",2);
		
		$select->order("pcate_orderhome asc");
        return $select;
    }
	
    public function getName($alias){
        $select = $this->select();
        $select->where("pcate_alias=?",$alias);
        $name = $this->fetchRow($select);
		if($name)
			return $name->pcate_name;
		else
			return 0;
    }
	
    public function getDataPI($parent_id){
        $select = $this->select();
        $select->where("pcate_parent=?",$parent_id);
        return $this->fetchAll($select);
    }
	
	public function arrayDis($id){
		$arr = array();
		$model = new Application_Model_DbTable_Pcates();
		$rows = $model->fetchAll("pcate_parent='$id'");
		if($rows->count() > 0)
			foreach($rows as $r){
				array_push($arr,$r->pcate_id);
				if($model->fetchAll("pcate_parent='$r->pcate_id'")->count() > 0){
					$arr = array_merge($arr, $this->arrayDis($r->pcate_id));
				}
			}
		return $arr;
	}
	
	public function arrayChosen($id = 0, $level = 0){
		$level ++;
		$arr = array();
		$model = new Application_Model_DbTable_Pcates();
		$rows = $model->fetchAll("pcate_parent='$id'");
		if($rows->count() > 0){
			$str = "";
			for($i=0;$i<$level-1;$i++)
				$str .= "--> ";
				
			foreach($rows as $r){				
				$arr[] = array("key"=>$r->pcate_id, "value"=>$str . $r->pcate_name);
				//array_push($arr,$r->pcate_id);
				if($model->fetchAll("pcate_parent='$r->pcate_id'")->count() > 0){
					$arr = array_merge($arr, $this->arrayChosen($r->pcate_id, $level));
				}
			}
		}
		return $arr;
	}	
}

