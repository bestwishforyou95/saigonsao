<?php

class Application_Model_DbTable_Products extends Zend_Db_Table_Abstract {

    protected $_name = 'products';

    public function getData() {
        $select = $this->select();
        $select->from(array("p" => "products"))
                ->joinLeft(array("u" => "users"), "u.iduser=p.product_iduser")
                ->setIntegrityCheck(false);
        return $select;
    }

    public function getProducts($alias = null) {
        $select = $this->select();
        $select->from(array("p" => "products"))
                ->joinLeft(array("cp" => "pcate_has_product"), "cp.products_idproduct=p.product_id")
                ->joinLeft(array("c" => "pcates"), "cp.pcates_idpcate=c.pcate_id")
                ->setIntegrityCheck(false);
        if ($alias != null)
            $select->where("pcate_alias=?", $alias);
        return $select;
    }

    public function getProds($alias = null, $palias = null) {
        $select = $this->select();
        $select->from(array("p" => "products"))
                ->joinLeft(array("cp" => "pcate_has_product"), "cp.products_idproduct=p.product_id")
                ->joinLeft(array("c" => "pcates"), "cp.pcates_idpcate=c.pcate_id")
                ->setIntegrityCheck(false);
        if ($palias != null)
            $select->where("pcate_alias=?", $palias);
        if ($alias != null)
            $select->where("product_alias=?", $alias);
        return $this->fetchRow($select);
    }

    public function getProdsById($id) {
        $select = $this->select();
        $select->where("product_id=?", $id);
        return $this->fetchRow($select);
    }

    public function loadProductDataToCart() {
        $cart = new Cms_Model_Cart();
        $items = $cart->getItems();
        foreach ($items as $id => &$item) {
            $prodRow = $this->getProdsById($id);
            if ($item->qty > $prodRow->product_qty) {
                $cart->deleteItem($id);
            } else {
                $item->product_name = $prodRow->product_name;
                $item->product_image = $prodRow->product_image;
                $item->product_price = $prodRow->product_price;
                $item->product_qty = $prodRow->product_qty;
                $item->sum = $item->qty * $item->product_price;
            }
        }
        return $cart->getItems();
    }

}
