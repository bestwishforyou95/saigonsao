<?php

class Application_Model_DbTable_Rules extends Zend_Db_Table_Abstract
{

    protected $_name = 'rules';
    
    public function getData($id)
    {
        $select = $this->select();
        $select->from(array('a'=>'actions'))
               ->joinLeft(array('c'=>'controllers'),'c.idcontroller=a.controllers_id')
               ->joinLeft(array('r'=>'rules'),'r.actions_id=a.idaction')
               ->joinLeft(array('m'=>'modules'),'m.idmodule=c.modules_id')
               ->where("groups_id=?",$id)
               ->setIntegrityCheck(false);
        return $this->fetchAll($select);
    }
    
    public function getAll()
    {
        $select = $this->select();
        $select->from(array('a'=>'actions'))
               ->joinLeft(array('c'=>'controllers'),'c.idcontroller=a.controllers_id')
               ->joinLeft(array('r'=>'rules'),'r.actions_id=a.idaction')
               ->joinLeft(array('m'=>'modules'),'m.idmodule=c.modules_id')
               ->setIntegrityCheck(false);
        return $this->fetchAll($select);
    }
    
    public function status($idaction , $idgroup){
        $select = $this->select();
        $select->where("groups_id=?",$idgroup)
               ->where("actions_id=?",$idaction);
        return $this->fetchRow($select);
    }
}

