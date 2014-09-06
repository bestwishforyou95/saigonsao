<?php

class Application_Form_InsertProds extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addAttribs(array("class" => "form-horizontal"))
             ->setDecorators(array(
                'FormElements',
                'Form'
        ));        
        $this->addElement('hidden','product_id');  
        $this->addElement('hidden','product_alias');     
        
        $product_name = $this->createElement('text','product_name');
        $product_name->setLabel("Tên sản phẩm :")
                      ->setRequired()
                      ->setAttrib("class","xlarge")
                      ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag",array("tag"=>"div", "class"=>"input" ))
                      ));             
        $this->addElement($product_name);

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
        $this->addElement($idcate);
        
        $product_type = $this->createElement('select', 'product_type');
        $product_type->setLabel("Thuộc loại :")
                    ->setAttribs(array("class"=>"xlarge","rows"=>10))
                    ->addDecorators(array(
                        array("Label",array("tag"=>"div","tagClass"=>"label-dt")),
                        array("HtmlTag", array("tag"=>"div","class"=>"input"))
                    ));
        $product_type->addMultiOption('Balô','Balô');
        $product_type->addMultiOption('Cặp','Cặp');
        $product_type->addMultiOption('Túi xách','Túi xách');
        $product_type->addMultiOption('Đồng phục','Đồng phục');
        $product_type->addMultiOption('Nón','Nón');
        $product_type->addMultiOption('Áo mưa','Áo mưa');
        $product_type->addMultiOption('Vali - Túi trống','Vali - Túi trống');
        $product_type->addMultiOption('Túi vải không dệt','Túi vải không dệt');
        $product_type->addMultiOption('Đồng hồ - SP ép PVC','Đồng hồ - SP ép PVC');
        $this->addElement($product_type);
        
        
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

