<?php

class Application_Form_InsertVideo extends Zend_Form
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
        $article_title->setLabel("Link Youtube :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large"))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_title);  
        
        $article_description = $this->createElement('textarea','article_description');
        $article_description->setLabel("Mô tả video :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large","rows"=>5))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_description);  
        
        /*$article_image = $this->createElement('file','image');
        $article_image->setLabel("Video :")
                      ->addValidators(array(
                        'Size'=>array('min'=>512,'max'=>10*1024*1024),
                        'Extension' =>array('jpg,jpeg,png,gif,flv')
                      ))
                      ->setDestination(APPLICATION_PATH."/../public/upload/videos/")  
                      ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($article_image);*/
          
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Thêm");  
        $this->addElement($submit);             
    }
}

