<?php

class Default_IndexController extends Zend_Controller_Action {

    public function init() {
        /* Initialize action controller here */
        $this->view->headScript()->appendScript('			
			$(function() {
				var t = setInterval(function(){
					var $this = $("#carousel ul");
					$("#carousel ul").animate({marginLeft:-134},1000,function(){
						$this.find("li:last").after($this.find("li:first"));
						$this.css({marginLeft:0});
					})
				},5000);      
			}); 
		');
        $modelC = new Application_Model_DbTable_Config();
        $rows = $modelC->getConfigs();
        $this->view->configs = $rows;
    }

    public function indexAction() {
        // action body
        $this->view->headTitle("Trang chủ");
        $this->view->headScript()->prependFile($this->view->baseUrl("/") . "js/jquery.nivo.slider.js");
        $this->view->headScript()->appendScript("
			$('#slider').nivoSlider({
				effect: 'random',
				slices: 15,
				boxCols: 8,
				boxRows: 4, 
				animSpeed: 500, 
				pauseTime: 5000, 
				pauseOnHover: true,        
				prevText: '', 
				nextText: '', 
			});
		");
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/") . "css/nivo-slider.css");
    }

    public function pageAction() {
        $page = $this->_request->getParam("page");
        if ($page && $page != "") {
            $modelN = new Application_Model_DbTable_Articles();
            $row = $modelN->getPage($page);
            if ($row) {
                $this->view->data = $row;
            } else {
                $this->_forward('error', 'error', 'default');
            }
        }
    }

    public function pcateAction() {
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/") . "css/style_public.css");
        $cate_alias = $this->_request->getParam("alias", "");

        if ($cate_alias != "") {
            $model = new Application_Model_DbTable_Products();
            $modelP = new Application_Model_DbTable_Pcates();

            $name = $modelP->getName($cate_alias);
            if (!$name) {
                $this->_forward('error', 'error', 'default');
            } else {
                $this->view->pname = $name;
                $this->view->headTitle($name . " - Sài Gòn Sao");
            }

            $select = $model->getProducts($cate_alias)->where("product_status=?", 1)->order("product_date DESC");

            $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
            $pagination = new Zend_Paginator($adapter);
            $page = $this->_request->getParam("page", 1);
            $pagination->setCurrentPageNumber($page);
            $pagination->setItemCountPerPage(12);
            $this->view->datas = $pagination;
        }
    }

    /* public function cateFilmAction(){
      $cate_alias = $this->_request->getParam("alias", "");

      if($cate_alias != ""){
      $this->view->headScript()->prependFile( $this->view->baseUrl("/")."js/masonry.pkgd.min.js" );
      $this->view->headScript()->appendScript( "
      var contai = $('#contai');
      contai.masonry({
      columnWidth: 150,
      itemSelector: '.item'
      });
      " );
      $model = new Application_Model_DbTable_Cates();

      $rows = $model->getFilms($cate_alias);
      $this->view->datas = $rows;
      }
      } */

    public function prodDetailAction() {
        $alias = $this->_request->getParam("alias", "");
        $palias = $this->_request->getParam("palias", "");

        if ($alias != "" && $palias != "") {
            $model = new Application_Model_DbTable_Products();
            if ($palias == "san-pham") {
                $row = $model->getProds($alias);
                if ($row) {
                    $this->view->headTitle($row->product_name . " - Trang chủ");
                    $this->view->datas = $row;
                } else {
                    $this->_forward('error', 'error', 'default');
                }
            } else {
                $row = $model->getProds($alias, $palias);
                if ($row) {
                    $this->view->headTitle($row->product_name . " - " . $row->pcate_name);
                    $this->view->datas = $row;
                } else {
                    $this->_forward('error', 'error', 'default');
                }
            }
        } else {
            $this->_forward('error', 'error', 'default');
        }
    }

    /* ------------------------------------- */

    public function contactUsAction() {
        // action body
        $this->view->headTitle("Liên hệ");
        $this->view->headScript()->appendFile($this->view->baseUrl("/js/jquery.validate.js"));
        $this->view->headScript()->appendFile("http://maps.google.com/maps/api/js?sensor=false");
        $this->view->headScript()->appendFile($this->view->baseUrl("/js/markers.js"));
        $this->view->headScript()->appendFile($this->view->baseUrl("/js/lien-he.js"));

        if ($this->_request->isPost()) {
            $model = new Application_Model_DbTable_Contacts();
            $row = $model->createRow();
            $row->contact_email = $_POST['email'];
            $row->contact_fullname = $_POST['fullname'];
            $row->contact_title = $_POST['title'];
            $row->contact_content = $_POST['content'];
            $id = $row->save();
            if ($id) {
                $this->view->notify = "<div class='alert alert-success'>Gửi liên hệ thành công !</div>";
            } else {
                $this->view->notify = "<div class='alert alert-error'>Bạn vui lòng trở lại sau !</div>";
            }
        }
    }

    public function datHangAction() {
        // action body
        $this->view->headTitle("Đặt hàng");
        $this->view->headScript()->appendFile($this->view->baseUrl("/js/jquery.validate.js"));
        $this->view->headScript()->appendScript('
			$("#form-contact").validate({
				rules: {
					contact_email: {required: true},
					contact_fullname: {required: true,},
					contact_phone: {required: true,},
					contact_address: {required: true},
					contact_dathang: {required: true},
					contact_dv: {required: true},
					contact_diachi: {required: true},
					contact_msthue: {required: true},
					captcha: {required: true,equalTo: "#recaptcha"}
				},
				messages: {
					contact_email: {required: "Không được để trống!"},
					contact_fullname: {required: "Không được để trống!"},
					contact_phone: {required: "Không được để trống!"},
					contact_address: {required: "Không được để trống!"},
					contact_dathang: {required: "Không được để trống!"},
					contact_dv: {required: "Không được để trống!"},
					contact_diachi: {required: "Không được để trống!"},
					contact_msthue: {required: "Không được để trống!"},
					captcha: {required: "Chưa nhập kết quả kiểm tra",equalTo: "Kết quả không đúng"}
				}
			});
		');
        if ($this->_request->isPost()) {
            $datas = $this->_request->getParams();
            $model = new Application_Model_DbTable_Contacts();

            unset($datas['module']);
            unset($datas['controller']);
            unset($datas['action']);
            foreach ($datas as $k => $r) {
                $this->view->$k = $r;
            }
            $valid = new Zend_Validate_NotEmpty();
            if ($valid->isValid($datas['contact_email']) && $valid->isValid($datas['contact_fullname']) && $valid->isValid($datas['contact_address']) && $valid->isValid($datas['contact_phone']) && $valid->isValid($datas['contact_dathang']) && $valid->isValid($datas['contact_dv']) && $valid->isValid($datas['contact_diachi']) && $valid->isValid($datas['contact_msthue'])) {
                $datas['contact_type'] = "dathang";
                $row = $model->createRow($datas);
                //var_dump($datas);
                $id = $row->save();
                if (isset($id) && $id) {
                    $this->view->notify = "<div class='alert alert-success'>Gửi liên hệ thành công !</div>";
                } else {
                    $this->view->notify = "<div class='alert alert-error'>Bạn vui lòng trở lại sau !</div>";
                }
            } else {
                $this->view->notify = "<div class='alert alert-danger'>Bạn vui lòng nhập đầy đủ thông tin yêu cầu</div>";
            }
        }
    }

    public function loginAction() {
        // action body        
        if ($this->_request->isPost()) {
            $username = $this->_request->getParam("username", "");
            $password = $this->_request->getParam("password", "");
            if ($username != "" || $password != "") {
                $auth = Zend_Auth::getInstance();
                $authAdapter = new Zend_Auth_Adapter_DbTable(null, "users", "username", "password");
                $authAdapter->setIdentity($username)
                        ->setCredential(md5($password));
                $result = $authAdapter->authenticate($authAdapter);
                if ($result->isValid()) {
                    $store = $auth->getStorage();
                    $store->write($authAdapter->getResultRowObject(array(
                                "iduser", "username", "groups_id", "fullname", "birthday", "gender", "user_status", "address", "phone", "email", "donvimuahang", "tendonvi", "diachidonvi", "masothue"
                    )));
                    $session = new Zend_Auth_Storage_Session();
                    if (!$session->read()->user_status) {
                        return $this->_redirect("/dang-xuat/");
                    } else {
                        return $this->_redirect("/chi-tiet-gio-hang/");
                    }
                } else {
                    $this->view->notify = "<div class='alert alert-danger'>Tài khoản hoặc mật khẩu không đúng</div>";
                }
            } else {
                $this->view->notify = "<div class='alert alert-danger'>Bạn vui lòng nhập tài khoản và mật khẩu</div>";
            }
        }
    }

    public function logoutAction() {
        $p = $this->_request->getParam("r", 0);
        $auth = Zend_Auth::getInstance();
        $auth->clearIdentity();
        return $this->_redirect($p == 1 ? "/dang-nhap/" : "/");
    }

    public function registerAction() {
        $this->view->headScript()->appendFile($this->view->baseUrl("/js/jquery.validate.js"));
        $this->view->headScript()->appendScript('
			$("#form-contact").validate({
				rules: {
					username: {required: true,minlength:6,maxlength:20},
					rpassword: {required: true,equalTo: "#password"},
					fullname: {required: true},
					address: {required: true},
					phone: {required: true},
					email: {required: true, email: true},
					tendonvi: {required: true},
					diachidonvi: {required: true},
					captcha: {required: true,equalTo: "#recaptcha"}
				},
				messages: {
					username: {required: "Không được để trống!",minlength:"Ít nhất 6 ký tự",maxlength:"Nhiều nhất 20 ký tự"},
					rpassword: {required: "Không được để trống!",equalTo: "Mật khẩu không trùng khớp"},
					fullname: {required: "Không được để trống!"},
					address: {required: "Không được để trống!"},
					phone: {required: "Không được để trống!"},
					email: {required: "Email không được để trống!",email: "Email không hợp lệ!"},
					tendonvi: {required: "Không được để trống!"},
					diachidonvi: {required: "Không được để trống!"},
					captcha: {required: "Chưa nhập kết quả kiểm tra",equalTo: "Kết quả không đúng"}
				}
			});
		');
        $this->view->notify = '<div class="alert alert-warning" style="font-size: 17px;">Nếu bạn đã có tài khoản ! Vui lòng <a href="' . $this->view->baseUrl("/dang-nhap") . '">đăng nhập tại đây</a> </div>';
        if ($this->_request->isPost()) {
            $datas = $this->_request->getParams();
            unset($datas["module"]);
            unset($datas["controller"]);
            unset($datas["action"]);
            unset($datas["captcha"]);
            unset($datas["recaptcha"]);
            unset($datas["rpassword"]);
            foreach ($datas as $k => $r) {
                if ($r == "")
                    $this->view->notify = '<div class="alert alert-warning">Vui lòng nhập đầy đủ thông tin</div>';
                $this->view->$k = $r;
            }
            $validatorCheckEmail = new Zend_Validate_Db_NoRecordExists(array('table' => 'users', 'field' => 'email'));
            $validatorCheckUser = new Zend_Validate_Db_NoRecordExists(array('table' => 'users', 'field' => 'username'));
            if (isset($datas['email']) && !$validatorCheckEmail->isValid($datas['email'])) {
                $this->view->notify = '<div class="alert alert-warning">Email đã được sử dụng!</div>';
            } else if (isset($datas['username']) && !$validatorCheckUser->isValid($datas['username'])) {
                $this->view->notify = '<div class="alert alert-warning">Tài khoản đã được sử dụng!</div>';
            } else {
                $datas['groups_id'] = 4;
                $datas['password'] = md5($datas['password']);
                $model = new Application_Model_DbTable_Users();
                $row = $model->createRow($datas);
                $id = $row->save();
                $this->view->notify = '<div class="alert alert-success" style="font-size: 17px">Đăng ký thành công ! <a href="' . $this->view->baseUrl("/dang-nhap/") . '">Đăng nhập tại đây</a></div>';
            }
        }
    }

    public function aboutAction() {
        // action body
    }

    public function personalAction() {
        $this->view->layout()->setLayout("chapter-layout");
        $this->view->headScript()->appendFile($this->view->baseUrl("/js/jquery.validate.js"));

        // action body
        $auth = Zend_Auth::getInstance();
        $id = $auth->getIdentity()->idmembers;
        if ($id) {
            $model = new Application_Model_DbTable_Members();
            $row = $model->find($id)->current();
            $this->view->datas = $row;
            if ($this->_request->isPost()) {
                $_POST['m_birthday'] = date("Y/m/d", strtotime($_POST['m_birthday']));
                if (isset($_FILES['m_image']) && $_FILES['m_image']['name'] != "") {
                    $filename = Cms_File_Image::upload(PUBLIC_PATH . "/upload", $_FILES['m_image']);
                    $path = PUBLIC_PATH . "/upload/";
                    if ($row->m_image) {
                        if (is_file($path . "/" . $row->m_image)) {
                            unlink($path . "/" . $row->m_image);
                        }
                    }
                    if (file_exists($path . $filename)) {
                        $row->m_image = $filename;
                    }
                }
                if (isset($_FILES['m_logo']) && $_FILES['m_logo']['name'] != "") {
                    $filename = Cms_File_Image::upload(PUBLIC_PATH . "/upload", $_FILES['m_logo']);
                    if ($row->m_logo) {
                        $path = PUBLIC_PATH . "/upload/";
                        if (is_file($path . "/" . $row->m_logo)) {
                            unlink($path . "/" . $row->m_logo);
                        }
                    }
                    if (file_exists($path . $filename)) {
                        $row->m_logo = $filename;
                    }
                }
                foreach ($_POST as $field => $value) {
                    $row->{$field} = $value;
                }
                $row->save();
            }
        }
    }

    public function newsAction() {
        // action body
        $this->view->headTitle("Tin tức - Trang chủ");
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/") . "css/style_public.css");
        $id = $this->_request->getParam("id");
        $model = new Application_Model_DbTable_CategoryHasArticle();
        $modelN = new Application_Model_DbTable_Articles();
        if ($id) {
            $select = $model->getData($id);
            $model = new Application_Model_DbTable_Categories();
            $this->view->name = $model->find($id)->current();
        } else {
            $select = $modelN->getN();
        }
        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page");
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(5);
        $this->view->datas = $pagination;
    }

    public function newsDetailAction() {
        // action body

        $id = $this->_request->getParam("id");
        if ($id) {
            $model = new Application_Model_DbTable_Articles();
            $row = $model->find($id)->current();
            $row->article_view = $row->article_view + 1;
            $row->save();
            $select = $model->select();
            $select->where("idarticles=?", $id);
            $row = $model->fetchRow($select);
            $this->view->headTitle($row->article_title . " - Tin tức");
            $this->view->datas = $row;
        }
    }

    public function productsAction() {
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/") . "css/style_public.css");
        $model = new Application_Model_DbTable_Products();
        $select = $model->getProducts()->where("product_status=?", 1)->order("product_date DESC");

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page");
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(12);
        $this->view->datas = $pagination;
    }
    
    public function searchProductsAction() {
        $this->view->headLink()->appendStylesheet($this->view->baseUrl("/") . "css/style_public.css");
        $this->view->product_type  = $product_type = $this->_request->getParam("product_type", "Balô");
        //var_dump($product_type);
        $model = new Application_Model_DbTable_Products();
        $select = $model->getProducts()
                ->where("product_status=?", 1)
                ->where(
                    "product_type=?", $product_type
                )->order("product_date DESC");

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page");
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(12);
        $this->view->datas = $pagination;
    }

    public function cartListAction() {
        $cart = new Cms_Model_Cart();
        $this->view->pname = "Giỏ hàng";

        if (null !== $id = $this->_request->getParam("id")) {
            $prodsModel = new Application_Model_DbTable_Products();
            $prodRow = $prodsModel->getProdsById($id);

            switch ($this->_request->getParam("act")) {
                case "add":
                    $qty = $this->_request->getParam("qty", 1);
                    $cart->addItem($id, $qty);
                    $flashMessenger = $this->_helper->getHelper('FlashMessenger');
                    $flashMessenger->addMessage("<strong>Thành công! </strong>Đã cập nhật giỏ hàng.");
                    break;
                case "del":
                    $cart->deleteItem($id);
                    $flashMessenger = $this->_helper->getHelper('FlashMessenger');
                    $flashMessenger->addMessage("<strong>Thành công! </strong>Đã xóa sản phẩm '{$prodRow->product_name}' khỏi giỏ hàng.");
                    break;
                case "updateAll":
                    $qtys = $this->_request->getParam("items");
                    foreach ($qtys as $id => $qty) {
                        $item = new stdClass();
                        $item->id = $id;
                        $item->qty = $qty;
                        $cart->updateItem($id, $item);
                    }
                    $flashMessenger = $this->_helper->getHelper('FlashMessenger');
                    $flashMessenger->addMessage("<strong>Thành công! </strong>Đã cập nhật giỏ hàng.");
                    break;
            }
            return $this->_redirect("/gio-hang");
        }

        // Show all of item in cart
        $items = (array) $cart->getItems();
        $sums = 0;
        foreach ($items as $id => &$item) {
            $prodsModel = new Application_Model_DbTable_Products();
            $prodRow = $prodsModel->getProdsById($id);
            $item->product_name = $prodRow->product_name;
            $item->product_image = $prodRow->product_image;
            $item->product_price = $prodRow->product_price;
            $item->product_qty = $prodRow->product_qty;
            $item->store_status = "";
            $item->sum = $item->qty * $item->product_price;
            $sums += $item->sum;
            if ($item->qty > $prodRow->product_qty) {
                $item->store_status = "<p style='color: red; float; left'>Hết hàng</p>";
            }
        }
        $this->view->cartItems = $items;
        $this->view->sums = $sums;
        $flashMessenger = $this->_helper->getHelper('FlashMessenger');
        $this->view->flashmsgs = $flashMessenger->getMessages();
    }

    public function cartDetailAction() {
        $cart = new Cms_Model_Cart();
        if (!$cart->isEmty()) {
            $this->view->pname = "Thông tin khách hàng";
            $prodsModel = new Application_Model_DbTable_Products();
            $items = $prodsModel->loadProductDataToCart();
            $sums = $cart->sumPriceCart();
            $customer = $cart->getCustomerInfo();
            $this->view->customerInfo = $customer;
            $this->view->cartItems = $items;
            $this->view->sums = $sums;
        } else {
            return $this->_redirect("/gio-hang");
        }
        $flashMessenger = $this->_helper->getHelper('FlashMessenger');
        $this->view->flashmsgs = $flashMessenger->getMessages();
    }

    public function orderConfirmAction() {
        $cart = new Cms_Model_Cart();
        if (!$cart->isEmty()) {
            if ($this->_request->isPost()) {
                $datas = $this->_request->getParams();
                $cart->addCustomerInfo($datas);
            }

            $this->view->pname = "Xác nhận đơn hàng";
            $customer = $cart->getCustomerInfo();
            foreach ($customer as $key => $value) {
                if ($value == "" && $key != "bill_notes" &&$key != "bill_total_money") {
                    $flashMessenger = $this->_helper->getHelper('FlashMessenger');
                    $flashMessenger->addMessage("Vui lòng nhập các thông tin bắt buộc.");
                    return $this->_redirect("/chi-tiet-gio-hang");
                }
            }

            $prodsModel = new Application_Model_DbTable_Products();
            $items = $prodsModel->loadProductDataToCart();
            $sums = $cart->sumPriceCart();
            $this->view->customerInfo = $customer;
            $this->view->cartItems = $items;
            $this->view->sums = $sums;
        } else {
            return $this->_redirect("/gio-hang");
            
        }
        
    }
    
    public function orderCompleteAction() {
        $this->view->pname = "Hoàn tất đơn hàng";
        $cart = new Cms_Model_Cart();
        if(!$cart->isEmty()){
            $customer = (array)$cart->getCustomerInfo();
            $billsModel = new Application_Model_DbTable_Bills();
            $row = $billsModel->createRow($customer);
            $id = $row->save();
            $items = $cart->getItems();
            foreach ($items as $idprod => $item) {
                $bills_detail = new Application_Model_DbTable_BillsDetail();
                $datas = array("bill_id"=>$id,
                                "product_id"=>$idprod,
                                "quantity"=>$item->qty
                );
                $row = $bills_detail->createRow($datas);
                $id = $row->save();
            }
            $cart->emtyCart();
        }
    }

}
