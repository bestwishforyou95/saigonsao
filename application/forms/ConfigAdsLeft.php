<?php

class Application_Form_ConfigAdsLeft extends Zend_Form
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
		$link = $this->createElement('text','link');
        $link->setLabel("Liên kết :")
                      ->setAttribs(array("class"=>"large"))
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($link); 
		$status = $this->createElement('Radio','status');
        $status->setLabel("Trạng thái :")
                    ->setMultiOptions(array("Tắt ","Bật "))
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

