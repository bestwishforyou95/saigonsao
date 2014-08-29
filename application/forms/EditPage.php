<?php

class Application_Form_EditPage extends Zend_Form
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
        
        $article_title = $this->createElement('text','article_title');
        $article_title->setLabel("Tiêu đề :")
                      ->setRequired()
                      ->setAttrib("class","xlarge")
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($article_title); 
        
        $article_description = $this->createElement('textarea','article_description');
        $article_description->setLabel("Mô tả :")
                            ->setAttribs(array("class"=>"xlarge","rows"=>5))
                            ->addDecorators(array(
                                array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                                array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                            ));             
        $this->addElement($article_description); 
        
        $article_detail = $this->createElement('textarea','article_detail');
        $article_detail->setLabel("Nội dung chi tiết :")
                       ->setAttribs(array("class"=>"maxlarge ckeditor","rows"=>40))
                       ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($article_detail);          
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Cập nhật");  
        $this->addElement($submit);             
    }
}

