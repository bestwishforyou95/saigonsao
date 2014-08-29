<?php

class Application_Model_DbTable_Actions extends Zend_Db_Table_Abstract
{

    protected $_name = 'actions';
    
    public function getAll()
    {
        $select = $this->select();
        $select->from(array('c'=>'controllers'))
               ->joinLeft(array('a'=>'actions'),'a.controllers_id=c.idcontroller')
               ->joinLeft(array('m'=>'modules'),'c.modules_id=m.idmodule')
               ->setIntegrityCheck(false);
        return $this->fetchAll($select);
    }


}

