<?php

class Application_Model_DbTable_CategoryHasArticle extends Zend_Db_Table_Abstract
{

    protected $_name = 'category_has_article';
    public function getData($id){
        $select = $this->select();
        $select->from(array('c'=>'category_has_article'))
               ->joinLeft(array('a'=>'articles'),'c.articles_idarticle=a.idarticles')               
               ->joinLeft(array('ca'=>'categories'),'ca.idcategory=c.categories_idcategory')
               ->where("categories_idcategory=?",$id)
               ->setIntegrityCheck(false);
        return $this->fetchAll($select);
    }
    
    public function getDataFull(){
        $select = $this->select();
        $select->from(array('c'=>'category_has_article'))
               ->joinLeft(array('a'=>'articles'),'c.articles_idarticle=a.idarticles')               
               ->joinLeft(array('ca'=>'categories'),'ca.idcategory=c.categories_idcategory')
               ->where("article_type=?","Tin tức")
               ->setIntegrityCheck(false);
        return $select;
    }
    
}

