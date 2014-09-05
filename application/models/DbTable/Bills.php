<?php

class Application_Model_DbTable_Bills extends Zend_Db_Table_Abstract {

    protected $_name = 'bills';

    public function getBills() {
        $select = $this->select();
        $select->from(array("b" => "bills"))
                ->joinLeft(array("u" => "users"), "b.user_id=u.iduser")
                ->setIntegrityCheck(false);
        return $select;
    }

    

    public function getBillsById($id) {
        $select = $this->select();
        $select->where("bill_id=?", $id);
        return $this->fetchRow($select);
    }

}
