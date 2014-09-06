<?php

class Application_Model_DbTable_BillsDetail extends Zend_Db_Table_Abstract
{

    protected $_name = 'bills-detail';
    public function getData($id){
        $select = $this->select();
        $select->from(array('c'=>'bills-detail'))
               ->joinLeft(array('p'=>'products'),'c.product_id=p.product_id')               
               ->joinLeft(array('ca'=>'bills'),'ca.bill_id=c.bill_id')
               ->where("c.bill_id=?",$id)
               ->setIntegrityCheck(false);
        return $this->fetchAll($select);
    }
    
}

