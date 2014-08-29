<?php

class Application_Form_InsertCategories extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','idcategory');    
        
        $name = $this->createElement('text','name');
        $name->setLabel("Tên danh mục :")
                 ->setRequired()
                 ->setAttrib("class","large")
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($name); 
           
        $model = new Application_Model_DbTable_Categories();
        $result = $model->arrayChosen();   
        $groups_id = $this->createElement('select','parent_id');
        $groups_id->setLabel("Danh mục cha :")
                  ->setRequired()
                  ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                  ));
        $groups_id->addMultiOption("0","None");                   
        foreach($result as $row){
            $groups_id->addMultiOption($row['key'],$row['value']);
        }            
        $this->addElement($groups_id);
           
        $user_status = $this->createElement('Radio','status');
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

