<?php

class Application_Form_Footer extends Zend_Form
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
        
		$value = $this->createElement('textarea','value');
        $value->setLabel("Nội dung chi tiết :")
                       ->setAttribs(array("class"=>"maxlarge ckeditor","rows"=>40))
                       ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($value);  
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Cập Nhật");  
        $this->addElement($submit);             
    }
}

