<?php

class Application_Model_DbTable_Articles extends Zend_Db_Table_Abstract
{

    protected $_name = 'articles';
    
    public function getData(){
        $select = $this->select();
        $select->from(array("a"=>"articles"))
               ->joinLeft(array("u"=>"users"),"u.iduser=a.users_iduser") 
               ->where("article_type=?","Tin tức")
               ->orWhere("article_type=?","Bài viết")
               ->order("article_type")
               ->setIntegrityCheck(false);
        return $select;
    }
    
    public function getNews($order = null){
        $select = $this->select();
        if($order!=null){
            $select->order($order." desc");
        }
        $select->where("article_type=?","Tin tức")
               ->limit(5);
        return $this->fetchAll($select);
    }
	
	public function getN($order = null){
        $select = $this->select();
        if($order!=null){
            $select->order($order." desc");
        }
        $select->where("article_type=?","Tin tức")
               ->limit(5);
        return $select;
    }
    
    public function getSlide($order = null){
        $select = $this->select();
        $select->where("article_type=?","Slide")->orWhere("article_type=?","Slide-footer");
        return $this->fetchAll($select);
    }
	
    public function getPages($order = null){
        $select = $this->select();
        $select->where("article_type=?","page");
        return $this->fetchAll($select);
    }
	
	
    public function getPage($page = ""){
        $select = $this->select();
        $select->where("article_type=?","page")->where("article_alias=?", $page);
        return $this->fetchRow($select);
    }
	
    public function getHotro($order = null){
        $select = $this->select();
        $select->where("article_type=?","hotro");
        return $this->fetchAll($select);
    }
    
    public function getSlideShow($order = null, $type = "Slide"){
        $select = $this->select();
        $select->where("article_type=?", $type)
               ->where("article_status=?",1);
        return $this->fetchAll($select);
    }
    
    public function getVideo($order = null){
        $select = $this->select();
        $select->where("article_type=?","Video");
        return $this->fetchAll($select);
    }
    
    public function getVideo_a(){
        $select = $this->select();
        $select->where("article_type=?","Video")
               ->where("article_status=?",1);
        return $this->fetchRow($select);
    }
}

