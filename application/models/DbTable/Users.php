<?php

class Application_Model_DbTable_Users extends Zend_Db_Table_Abstract
{

    protected $_name = 'users';

    public function getData($namespace = null)
    {
        $select = $this->select();
        $select->from(array('u'=>'users'))
               ->joinLeft(array('g'=>'groups'),'g.idgroup=u.groups_id')
               ->where("idgroup!=?",1)
               ->where("idgroup!=?",4)
               ->order("groups_id")
               ->setIntegrityCheck(false);
        if($namespace!=null){
            $select->where("namespace=?",$namespace);
        }
        return $this->fetchAll($select);
    }
    
    public function getDataId($iduser){
        $select = $this->select();
        $select->where("iduser=?",$iduser);
        return $this->fetchRow($select);
    }
}

