<?php

class Application_Model_DbTable_PcateHasProd extends Zend_Db_Table_Abstract
{

    protected $_name = 'pcate_has_product';
    public function getData($id){
        $select = $this->select();
        $select->from(array('c'=>'pcate_has_product'))
               ->joinLeft(array('p'=>'products'),'c.products_idproduct=p.product_id')               
               ->joinLeft(array('ca'=>'pcates'),'ca.pcate_id=c.pcates_idcate')
               ->where("pcates_idcate=?",$id)
               ->setIntegrityCheck(false);
        return $this->fetchAll($select);
    }
    
}

