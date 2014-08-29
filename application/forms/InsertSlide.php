<?php

class Application_Form_InsertSlide extends Zend_Form
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
        
        $article_image = $this->createElement('file','image');
        $article_image->setLabel("Hình slide :")
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
        
        $article_description = $this->createElement('textarea','article_description');
        $article_description->setLabel("Mô tả slide :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large","rows"=>5))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_description);  
        
        $article_title = $this->createElement('text','article_title');
        $article_title->setLabel("Liên kết :")
                 ->setRequired()
                 ->setAttribs(array("class"=>"large"))
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($article_title);  
		
		$article_slide = $this->createElement('Radio','article_slide');
		$article_slide->setLabel("Loại :")
                    ->setMultiOptions(array("Slide","Slide footer"))
                    ->setValue(0)
                    ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                    ));             
        $this->addElement($article_slide); 
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Thêm");  
        $this->addElement($submit);             
    }
}

