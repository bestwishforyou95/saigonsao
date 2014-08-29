<?php

class Application_Model_DbTable_Cates extends Zend_Db_Table_Abstract
{

    protected $_name = 'cates';
    
    public function getFilms($alias = "")
    {
        $select = $this->select()->from(array("c"=>"cates"))
               ->joinLeft(array("f"=>"films"),"c.cate_id=f.film_idcate")  
               ->where("c.cate_alias=?", $alias)
               ->setIntegrityCheck(false);		
        $rows = $this->fetchAll($select);
		return $rows;
    }	
}

