<?php

class Application_Form_InsertNews extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','idarticle');  
        $this->addElement('hidden','article_alias');     
        
        $article_title = $this->createElement('text','article_title');
        $article_title->setLabel("Tiêu đề tin tức :")
                      ->setRequired()
                      ->setAttrib("class","xlarge")
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($article_title); 
        
        $article_description = $this->createElement('textarea','article_description');
        $article_description->setLabel("Tóm tắt nội dung :")
                            ->setAttribs(array("class"=>"xlarge","rows"=>5))
                            ->addDecorators(array(
                                array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                                array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                            ));             
        $this->addElement($article_description); 
        
        $idcate = $this->createElement('multiselect','idcate');
        $idcate->setLabel("Hiển thị ở mục :")
               ->setAttribs(array("class"=>"xlarge","rows"=>20))
               ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
               ));
        $model1 = new Application_Model_DbTable_Categories();
        $cates = $model1->arrayChosen();   
        foreach($cates as $cate){
            $idcate->addMultiOption($cate['key'],$cate['value']);
        }
        $idcate->setValue(1);             
        $this->addElement($idcate);
                
        $article_type = $this->createElement('Radio','article_type');
        /*$article_type->setLabel("Loại tin :")
                    ->setMultiOptions(array(" Tin tức"," Bài viết "))
                    ->setValue(0)
                    ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                    ));             
        $this->addElement($article_type);*/
        
        $article_image = $this->createElement('file','article_image');
        $article_image->setLabel("Hình ảnh :")
                      ->addValidators(array(
                        'Size'=>array('min'=>512,'max'=>10*1024*1024),
                        'Extension' =>array('jpg,jpeg,png,gif')
                      ))
                      ->setDestination(APPLICATION_PATH."/../public/upload/")  
                      ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($article_image); 
        
        $article_detail = $this->createElement('textarea','article_detail');
        $article_detail->setLabel("Nội dung chi tiết :")
                       ->setAttribs(array("class"=>"maxlarge ckeditor","rows"=>40))
                       ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($article_detail);          
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Thêm");  
        $this->addElement($submit);             
    }
}

