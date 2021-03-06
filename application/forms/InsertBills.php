<?php

class Application_Form_InsertBills extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','bill_id');     
        
        $bill_xname = $this->createElement('text','bill_xname');
        $bill_xname->setLabel("Tên KH nhận hàng :")
                      ->setRequired()
                      ->setAttrib("class","xlarge")
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($bill_xname);

	$product_qty = $this->createElement('text','product_qty');
        $product_qty->setLabel("Số lượng trong kho :")
                      ->setRequired()
                      ->setAttrib("class","xlarge")
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($product_qty);
        
        $product_price = $this->createElement('text','product_price');
        $product_price->setLabel("Giá sản phẩm :")
                      ->setRequired()
                      ->setAttrib("class","xlarge")
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($product_price);
        
        $idcate = $this->createElement('multiselect','idcate');
        $idcate->setLabel("Hiển thị ở mục :")
               ->setAttribs(array("class"=>"xlarge","rows"=>20))
               ->addDecorators(array(
                    array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                    array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
               ));
        $model1 = new Application_Model_DbTable_Pcates();
        $cates = $model1->arrayChosen();   
        foreach($cates as $cate){
            $idcate->addMultiOption($cate['key'],$cate['value']);
        }
        //$idcate->setValue(1);             
        $this->addElement($idcate);
        
        $product_image = $this->createElement('file','product_image');
        $product_image->setLabel("Hình ảnh :")
                      ->addValidators(array(
                        'Size'=>array('min'=>512,'max'=>10*1024*1024),
                        'Extension' =>array('jpg,jpeg,png,gif')
                      ))
                      ->setDestination(APPLICATION_PATH."/../public/upload/")  
                      ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($product_image); 
        
        $product_description = $this->createElement('textarea','product_description');
        $product_description->setLabel("Mô tả :")
                       ->setAttribs(array("class"=>"maxlarge ckeditor","rows"=>40))
                       ->addDecorators(array(
                            array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                            array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                       ));             
        $this->addElement($product_description);          
        
        $submit = $this->createElement("submit","submit");
        $submit->setLabel("Thêm");  
        $this->addElement($submit);             
    }
}

