<?php

class Application_Form_Configxahoi extends Zend_Form
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
        		
		$facebook = $this->createElement('text','facebook');
        $facebook->setLabel("Facebook :")
					  ->setDescription("Ví dụ : 'FacebookDevelopers'")
                      ->setAttribs(array("class"=>"large"))
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($facebook); 
		
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Cập Nhật");  
        $this->addElement($submit);             
    }
}

