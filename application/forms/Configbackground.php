<?php

class Application_Form_Configbackground extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','idconfig');  
        
        $name = $this->createElement('text','name');
        $name->setLabel("Name :")
                      ->setRequired()
                      ->setAttribs(array("readonly"=>"true","class"=>"small"))
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($name);      
        
        $value = $this->createElement('file','value');
        $value->setLabel("Hình ảnh :")
					  ->setAttribs(array("id"=>"image"))
                      ->addValidators(array(
                        'Size'=>array('min'=>512,'max'=>10*1024*1024),
                        'Extension' =>array('jpg,jpeg,png,gif')
                      ))
                      ->setDestination(APPLICATION_PATH."/../public/upload/")  
                      ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($value); 
		
		$status = $this->createElement('Radio','status');
        $status->setLabel("Repeat :")
                    ->setMultiOptions(array("Yes ","No "))
                    ->setValue(0)
                    ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                    ));             
        $this->addElement($status);   
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Cập Nhật");  
        $this->addElement($submit);             
    }
}

