<?php

class Application_Form_InsertPcates extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','pcate_id');    
        
        $name = $this->createElement('text','pcate_name');
        $name->setLabel("Tên danh mục :")
                 ->setRequired()
                 ->setAttrib("class","large")
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($name); 
		
		$alias_name = $this->createElement('text','pcate_alias');
		$alias_name->setLabel("Alias :")
                 ->setAttrib("class","large")
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($alias_name); 
           
        $model = new Application_Model_DbTable_Pcates();
        $result = $model->arrayChosen();   
        $groups_id = $this->createElement('select','pcate_parent');
        $groups_id->setLabel("Danh mục cha :")
                  ->setRequired()
                  ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                  ));
        $groups_id->addMultiOption("0","None");                   
        foreach($result as $k=>$row){
            $groups_id->addMultiOption($row['key'],$row['value']);
        }            
        $this->addElement($groups_id);
           
        $user_status = $this->createElement('Radio','pcate_status');
        $user_status->setLabel("Trạng thái :")
                    ->setMultiOptions(array("Khóa lại","Hoạt động "))
                    ->setValue(1)
                    ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                    ));             
        $this->addElement($user_status);   
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Thêm");  
        $this->addElement($submit);             
    }
}

