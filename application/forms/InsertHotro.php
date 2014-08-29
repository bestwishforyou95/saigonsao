<?php

class Application_Form_InsertHotro extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','idarticles');  
        
        $article_title = $this->createElement('text','article_title');
        $article_title->setLabel("Họ tên :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large"))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_title);  
        
        $article_alias = $this->createElement('text','article_alias');
        $article_alias->setLabel("Yahoo :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large"))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_alias); 
		
		
        $article_detail = $this->createElement('text','article_detail');
        $article_detail->setLabel("Skype :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large"))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_detail); 
		
        $article_description = $this->createElement('text','article_description');
        $article_description->setLabel("Số điện thoại :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large"))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_description);  
               
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Thêm");  
        $this->addElement($submit);             
    }
}

