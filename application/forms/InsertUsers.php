<?php

class Application_Form_InsertUsers extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','iduser');    
        
        $username = $this->createElement('text','username');
        $username->setLabel("Tên đăng nhập :")
                 ->setRequired()
                 ->setDescription("Tên đăng nhập phải từ 3 - 10 ký tự và không được để trống.")
                 ->setAttrib("class","large")
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($username); 
        
        $password = $this->createElement('password','password');
        $password->setLabel("Mật khẩu :")
                 ->setRequired()
                 ->setAttrib("class","large")
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($password);
        
        $confirm = $this->createElement('password','confirm');
        $confirm->setLabel("Xác nhận mật khẩu :")
                ->setRequired()
                ->addValidator(new Zend_Validate_Identical("password"))
                ->setAttrib("class","large")
                ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                ));             
        $this->addElement($confirm);
        
        $fullname = $this->createElement('text','fullname');
        $fullname->setLabel("Họ và tên :")
                 ->setRequired()
                 ->setAttrib("class","large")
                 ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                 ));             
        $this->addElement($fullname);
        
        $gender = $this->createElement('Radio','gender');
        $gender->setLabel("Giới tính :")
                    ->setMultiOptions(array(" Nữ","Nam "))
                    ->setValue(1)
                    ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                    ));             
        $this->addElement($gender); 
        
        $email = $this->createElement('text','email');
        $email->setLabel("Email :")
              ->setRequired()
              ->setAttrib("class","large")
              ->addValidator(new Zend_Validate_EmailAddress())
              ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
              ));             
        $this->addElement($email);
           
        $model = new Application_Model_DbTable_Groups();
        $select = $model->select()->where("idgroup!=?",1)->where("idgroup!=?",4);
        $result = $model->fetchAll($select);   
        $groups_id = $this->createElement('select','groups_id');
        $groups_id->setLabel("Nhóm :")
                  ->setRequired()
                  ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                  )); 
        foreach($result as $row){
            $groups_id->addMultiOption($row->idgroup,$row->name);
        }            
        $this->addElement($groups_id);
           
        $user_status = $this->createElement('Radio','user_status');
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

