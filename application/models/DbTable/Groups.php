<?php

class Application_Model_DbTable_Groups extends Zend_Db_Table_Abstract
{

    protected $_name = 'groups';

    public function getData()
    {
        $select = $this->select();
        $select->where("name!=?","Admin");
        return $this->fetchAll($select);
    }
    
    public function getNamespace($id)
    {
        $select = $this->select();
        $select->where("idgroup=?",$id);
        return $this->fetchRow($select);
    }
}

