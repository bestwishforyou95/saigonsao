<?php

class Admin_IndexController extends Zend_Controller_Action {

    public function init() {
        /* Initialize action controller here */
        $this->view->layout()->setLayout("admin-layout");
    }

    public function indexAction() {
        // action body
        $this->view->layout()->setLayout("login-layout");
        if ($this->_request->isPost()) {
            $username = $this->_request->getParam("username", "");
            $password = $this->_request->getParam("password", "");
            if ($username != "") {
                $auth = Zend_Auth::getInstance();
                $authAdapter = new Zend_Auth_Adapter_DbTable(null, "users", "username", "password");
                $authAdapter->setIdentity($username)
                        ->setCredential(md5($password));
                $result = $authAdapter->authenticate($authAdapter);
                if ($result->isValid()) {
                    $store = $auth->getStorage();
                    $store->write($authAdapter->getResultRowObject(array(
                                "iduser", "username", "groups_id", "fullname", "user_status"
                    )));
                    $session = new Zend_Auth_Storage_Session();
                    if ($session->read()->user_status) {
                        return $this->_redirect("/admin/index/list-categories-news");
                    } else {
                        return $this->_redirect("/admin/index/logout");
                    }
                }
            }
        }
    }

    public function rulesGroupAction() {
        $id = $this->_request->getParam("id");
        if ($id) {
            $model = new Application_Model_DbTable_Rules();
            $this->view->idgroup = $id;
            $this->view->datas = $model->getData($id);
        }
    }

    public function logoutAction() {
        $auth = Zend_Auth::getInstance();
        $auth->clearIdentity();
        return $this->_redirect("/admin/index");
    }

    /**
     * Show
     * */
    public function listGroupAction() {
        $model = new Application_Model_DbTable_Groups();
        $this->view->datas = $model->getData();
    }

    public function contactsAction() {
        $model = new Application_Model_DbTable_Contacts();
        $select = $model->select();

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page", 1);
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(10);
        $this->view->datas = $pagination;

        if ($model->fetchAll()->count() == 0)
            $this->view->notify = "<td colspan='5' style='text-align:center;'>Không tìm thấy dữ liệu nào !</td>";
    }

    public function listHotroAction() {
        $model = new Application_Model_DbTable_Articles();
        $this->view->datas = $model->getHotro();
    }

    public function listSlideAction() {
        $model = new Application_Model_DbTable_Articles();
        $this->view->datas = $model->getSlide();
    }

    public function listVideoAction() {
        $model = new Application_Model_DbTable_Articles();
        $this->view->datas = $model->getVideo();
    }

    public function listUserAction() {
        $model = new Application_Model_DbTable_Users();
        $this->view->datas = $model->getData();
    }

    public function listCategoriesNewsAction() {
        $model = new Application_Model_DbTable_Categories();
        $select = $model->getData();

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page", 1);
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(5);
        $this->view->datas = $pagination;
        $this->view->model = $model;

        if ($model->fetchAll()->count() == 0)
            $this->view->notify = "<td colspan='5' style='text-align:center;'>Không tìm thấy dữ liệu nào !</td>";
    }

    public function listPcatesAction() {
        $model = new Application_Model_DbTable_Pcates();
        $select = $model->getData();

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page", 1);
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(2);
        $this->view->datas = $pagination;
        $this->view->model = $model;
        if ($model->fetchAll()->count() == 0)
            $this->view->notify = "<td colspan='5' style='text-align:center;'>Không tìm thấy dữ liệu nào !</td>";
    }

    public function listNewsAction() {
        $model = new Application_Model_DbTable_Articles();
        $select = $model->getData();

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page", 1);
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(15);
        $this->view->datas = $pagination;

        if ($model->fetchAll()->count() == 0)
            $this->view->notify = "<td colspan='7' style='text-align:center;'>Không tìm thấy dữ liệu nào !</td>";
    }

    public function pagesAction() {
        $model = new Application_Model_DbTable_Articles();
        $this->view->datas = $model->getPages();
    }

    public function listProdsAction() {
        $model = new Application_Model_DbTable_Products();
        $select = $model->getData();

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page", 1);
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(10);
        $this->view->datas = $pagination;

        if ($model->fetchAll()->count() == 0)
            $this->view->notify = "<td colspan='7' style='text-align:center;'>Không tìm thấy dữ liệu nào !</td>";
    }

    public function listBillsAction() {
        $model = new Application_Model_DbTable_Bills();
        $select = $model->getBills();

        $adapter = new Zend_Paginator_Adapter_DbTableSelect($select);
        $pagination = new Zend_Paginator($adapter);
        $page = $this->_request->getParam("page", 1);
        $pagination->setCurrentPageNumber($page);
        $pagination->setItemCountPerPage(10);
        $this->view->datas = $pagination;

        if ($model->fetchAll()->count() == 0)
            $this->view->notify = "<td colspan='7' style='text-align:center;'>Không tìm thấy dữ liệu nào !</td>";
    }

    /**
     * Status
     * */
    public function allowAction() {
        $idaction = $this->_request->getParam("idaction");
        $idgroup = $this->_request->getParam("idgroup");
        if ($idaction && $idgroup) {
            $model = new Application_Model_DbTable_Rules();
            $row = $model->status($idaction, $idgroup);
            $row->allow ? $row->allow = 0 : $row->allow = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function statusUserAction() {
        $iduser = $this->_request->getParam("iduser");
        if ($iduser) {
            $model = new Application_Model_DbTable_Users();
            $row = $model->getDataId($iduser);
            $row->user_status ? $row->user_status = 0 : $row->user_status = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function statusCategoriesNewsAction() {
        $idcategory = $this->_request->getParam("idcate");
        if ($idcategory) {
            $model = new Application_Model_DbTable_Categories();
            $row = $model->find($idcategory)->current();
            $row->status ? $row->status = 0 : $row->status = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function statusPcatesAction() {
        $idcategory = $this->_request->getParam("idcate");
        if ($idcategory) {
            $model = new Application_Model_DbTable_Pcates();
            $row = $model->find($idcategory)->current();
            $row->pcate_status ? $row->pcate_status = 0 : $row->pcate_status = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function homePcatesAction() {
        $idcategory = $this->_request->getParam("idcate");
        if ($idcategory) {
            $model = new Application_Model_DbTable_Pcates();
            $row = $model->find($idcategory)->current();
            $row->pcate_showhome ? $row->pcate_showhome = 0 : $row->pcate_showhome = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function qtyPcatesAction() {
        $idcategory = $this->_request->getParam("idcate");
        $qty = $this->_request->getParam("qty", 0);
        if ($idcategory) {
            $model = new Application_Model_DbTable_Pcates();
            $row = $model->find($idcategory)->current();
            $row->pcate_homeqty = $qty;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function orderhomePcatesAction() {
        $idcategory = $this->_request->getParam("idcate");
        $order = $this->_request->getParam("order", 0);
        if ($idcategory) {
            $model = new Application_Model_DbTable_Pcates();
            $row = $model->find($idcategory)->current();
            $row->pcate_orderhome = $order;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function statusNewsAction() {
        $idarticle = $this->_request->getParam("idarticle");
        if ($idarticle) {
            $model = new Application_Model_DbTable_Articles();
            $row = $model->find($idarticle)->current();
            $row->article_status ? $row->article_status = 0 : $row->article_status = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function statusProdsAction() {
        $idprod = $this->_request->getParam("idprod");
        if ($idprod) {
            $model = new Application_Model_DbTable_Products();
            $row = $model->find($idprod)->current();
            $row->product_status ? $row->product_status = 0 : $row->product_status = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function statusProdspriceAction() {
        $idprod = $this->_request->getParam("idprod");
        if ($idprod) {
            $model = new Application_Model_DbTable_Products();
            $row = $model->find($idprod)->current();
            $row->prod_price_status ? $row->prod_price_status = 0 : $row->prod_price_status = 1;
            $row->save();
            $this->_helper->json->sendJson($row->prod_price_status);
        }
    }

    public function statusBillsAction() {
        $idbill = $this->_request->getParam("idbill");
        if ($idbill) {
            $model = new Application_Model_DbTable_Bills();
            $row = $model->find($idbill)->current();
            $row->bill_status ? $row->bill_status = 0 : $row->bill_status = 1;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    /**
     * Delete
     * */
    public function delUserAction() {
        $iduser = $this->_request->getParam("iduser");
        if ($iduser) {
            $model = new Application_Model_DbTable_Users();
            $row = $model->find($iduser)->current()->delete();
            $this->view->json->sendJson(true);
        }
    }

    public function delCategoriesNewsAction() {
        /* $idcate = $this->_request->getParam("idcate");
          if($idcate){
          $model = new Application_Model_DbTable_Categories();
          $row = $model->find($idcate)->current()->delete();
          $this->view->json->sendJson(true);
          } */
        $this->view->json->sendJson(true);
    }

    public function delPcatesAction() {
        $idcategory = $this->_request->getParam("idcate");
        if ($idcategory) {
            $model = new Application_Model_DbTable_Pcates();
            $row = $model->find($idcategory)->current();
            $row->pcate_status = 2;
            $row->save();
            $this->_helper->json->sendJson(true);
        }
    }

    public function delNewsAction() {
        $idnews = $this->_request->getParam("idnews");
        if ($idnews) {
            $model = new Application_Model_DbTable_Articles();
            $row = $model->find($idnews)->current();
            if ($row->article_image) {
                $path = APPLICATION_PATH . "/../public/upload/";
                if (is_file($path . "/" . $row->article_image)) {
                    unlink($path . "/" . $row->article_image);
                }
                if (is_file($path . "/_thumbs/" . $row->article_thumb)) {
                    unlink($path . "/_thumbs/" . $row->article_thumb);
                }
            }
            $row->delete();
            $this->_helper->json->sendJson(true);
        }
    }

    /**
     * Insert
     * */
    public function insertUserAction() {
        $form = new Application_Form_InsertUsers();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $model = new Application_Model_DbTable_Users();
                $row = $model->createRow($datas);
                $row->password = md5($datas['password']);
                $id = $row->save();
                if ($id) {
                    $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
                } else {
                    $this->view->notify = "<div class='notify-success'>Thêm thất bại!</div>";
                }
            }
        }
        $this->view->form = $form;
    }

    public function insertSlideAction() {
        $form = new Application_Form_InsertSlide();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                if ($form->image->isUploaded()) {
                    $form->image->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->image->getFilename());
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $datas['article_image'] = $images['name'];
                        $datas['article_thumb'] = $images['name'];
                    }
                }
                $auth = Zend_Auth::getInstance();
                $identity = $auth->getIdentity();
                $model = new Application_Model_DbTable_Articles();
                $row = $model->createRow($datas);
                $row->users_iduser = $identity->iduser;
                if ($datas['article_slide'] == 0) {
                    $row->article_type = "Slide";
                } else {
                    $row->article_type = "Slide-footer";
                }

                $id = $row->save();
                if ($id) {
                    $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
                } else {
                    $this->view->notify = "<div class='notify-success'>Thêm thất bại!</div>";
                }
            }
        }
        $this->view->form = $form;
    }

    public function insertVideoAction() {
        $form = new Application_Form_InsertVideo();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $auth = Zend_Auth::getInstance();
                $identity = $auth->getIdentity();
                $model = new Application_Model_DbTable_Articles();
                $row = $model->createRow($datas);
                $row->users_iduser = $identity->iduser;
                $row->article_type = "Video";
                $id = $row->save();
                if ($id) {
                    $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
                } else {
                    $this->view->notify = "<div class='notify-success'>Thêm thất bại!</div>";
                }
            }
        }
        $this->view->form = $form;
    }

    public function insertHotroAction() {
        $form = new Application_Form_InsertHotro();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $auth = Zend_Auth::getInstance();
                $identity = $auth->getIdentity();
                $model = new Application_Model_DbTable_Articles();
                $row = $model->createRow($datas);
                $row->users_iduser = $identity->iduser;
                $row->article_type = "hotro";
                $id = $row->save();
                if ($id) {
                    $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
                } else {
                    $this->view->notify = "<div class='notify-success'>Thêm thất bại!</div>";
                }
            }
        }
        $this->view->form = $form;
    }

    public function insertCategoriesNewsAction() {
        $form = new Application_Form_InsertCategories();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $model = new Application_Model_DbTable_Categories();
                $row->alias = Cms_Filter_String::toAlias($datas['name']);
                $row = $model->createRow($datas);
                $row->save();
                $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
            }
        }
        $this->view->form = $form;
    }

    public function insertPcatesAction() {
        $form = new Application_Form_InsertPcates();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $model = new Application_Model_DbTable_Pcates();
                $datas['pcate_alias'] = Cms_Filter_String::toAlias($datas['pcate_name']);
                $rowCheck = $model->fetchRow("pcate_alias='" . $datas['pcate_alias'] . "' and pcate_parent='" . $datas['pcate_parent'] . "'");
                if ($rowCheck)
                    $this->view->notify = "<div class='notify-warning'>Đã tồn tại !</div>";
                else {
                    //$row->pcate_alias = Cms_Filter_String::toAlias($datas['pcate_name']);
                    $row = $model->createRow($datas);
                    $row->save();
                    $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
                }
            }
        }
        $this->view->form = $form;
    }

    public function insertNewsAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $form = new Application_Form_InsertNews();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $datas['article_alias'] = Cms_Filter_String::toAlias($datas['article_alias']);
                $images = array();
                if ($form->article_image->isUploaded()) {
                    $form->article_image->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->article_image->getFilename());
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $datas['thumb'] = $images['name'];
                    }
                }
                $auth = Zend_Auth::getInstance();
                $identity = $auth->getIdentity();
                $model = new Application_Model_DbTable_Articles();
                $row = $model->createRow($datas);
                $row->article_title = $datas['article_title'];
                $row->article_description = $datas['article_description'];
                $row->article_type = "Tin tức";
                $row->article_detail = $datas['article_detail'];
                if ($form->article_image->isUploaded()) {
                    $row->article_image = $datas['thumb'];
                    $row->article_thumb = $datas['thumb'];
                }
                $row->users_iduser = $identity->iduser;
                $id = $row->save();

                if ($id) {
                    if (is_array($datas['idcate'])) {
                        $model1 = new Application_Model_DbTable_CategoryHasArticle();
                        foreach ($datas['idcate'] as $idcategory) {
                            $ro = $model1->createRow(array("categories_idcategory" => $idcategory, "articles_idarticle" => $id));
                            $ro->save();
                        }
                    }
                }
                $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
            }
        }
        $this->view->form = $form;
    }

    public function insertProdsAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $form = new Application_Form_InsertProds();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $validatorCheckHasId = new Zend_Validate_Db_NoRecordExists(array('table' => 'products', 'field' => 'product_alias'));
                $temp = Cms_Filter_String::toAlias($datas['product_name']);

                if (!$validatorCheckHasId->isValid($temp)) {
                    $i = 1;
                    while (!$validatorCheckHasId->isValid($temp . "-" . $i)) {
                        $i++;
                    }
                    $datas['product_alias'] = $temp . "-" . $i;
                } else {
                    $datas['product_alias'] = $temp;
                }
                $images = array();
                if ($form->product_image->isUploaded()) {
                    $form->product_image->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->product_image->getFilename());
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $datas['thumb'] = $images['name'];
                    }
                }
                $auth = Zend_Auth::getInstance();
                $identity = $auth->getIdentity();

                $model = new Application_Model_DbTable_Products();
                $row = $model->createRow($datas);
                $row->product_name = $datas['product_name'];
                $row->product_price = $datas['product_price'];
                $row->product_qty = $datas['product_qty'];
                $row->product_type = $datas['product_type'];
                $row->product_description = $datas['product_description'];
                if ($form->product_image->isUploaded()) {
                    $row->product_image = $datas['thumb'];
                    $row->product_thumb = $datas['thumb'];
                }
                $row->product_iduser = $identity->iduser;
                $id = $row->save();

                if ($id) {
                    if (is_array($datas['idcate'])) {
                        $model1 = new Application_Model_DbTable_PcateHasProd();
                        foreach ($datas['idcate'] as $idcate) {
                            $ro = $model1->createRow(array("pcates_idpcate" => $idcate, "products_idproduct" => $id));
                            $ro->save();
                        }
                    }
                }
                $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
            }
        }
        $this->view->form = $form;
    }

    public function insertBillsAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $form = new Application_Form_InsertBills();
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $validatorCheckHasId = new Zend_Validate_Db_NoRecordExists(array('table' => 'products', 'field' => 'product_alias'));
                $temp = Cms_Filter_String::toAlias($datas['product_name']);

                if (!$validatorCheckHasId->isValid($temp)) {
                    $i = 1;
                    while (!$validatorCheckHasId->isValid($temp . "-" . $i)) {
                        $i++;
                    }
                    $datas['product_alias'] = $temp . "-" . $i;
                } else {
                    $datas['product_alias'] = $temp;
                }
                $images = array();
                if ($form->product_image->isUploaded()) {
                    $form->product_image->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->product_image->getFilename());
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $datas['thumb'] = $images['name'];
                    }
                }
                $auth = Zend_Auth::getInstance();
                $identity = $auth->getIdentity();

                $model = new Application_Model_DbTable_Products();
                $row = $model->createRow($datas);
                $row->product_name = $datas['product_name'];
                $row->product_price = $datas['product_price'];
                $row->product_qty = $datas['product_qty'];
                $row->product_description = $datas['product_description'];
                if ($form->product_image->isUploaded()) {
                    $row->product_image = $datas['thumb'];
                    $row->product_thumb = $datas['thumb'];
                }
                $row->product_iduser = $identity->iduser;
                $id = $row->save();

                if ($id) {
                    if (is_array($datas['idcate'])) {
                        $model1 = new Application_Model_DbTable_PcateHasProd();
                        foreach ($datas['idcate'] as $idcate) {
                            $ro = $model1->createRow(array("pcates_idpcate" => $idcate, "products_idproduct" => $id));
                            $ro->save();
                        }
                    }
                }
                $this->view->notify = "<div class='notify-success'>Thêm thành công!</div>";
            }
        }
        $this->view->form = $form;
    }

    /**
     * Edit
     * */
    public function editVideoAction() {
        $id = $this->_request->getParam("id");
        if ($id) {
            $form = new Application_Form_InsertVideo();
            $form->submit->setLabel("Cập nhật");
            $model = new Application_Model_DbTable_Articles();
            $row = $model->find($id)->current();
            if ($row && $row->article_type == 'Video') {
                $this->view->video = $row->article_title;
                $form->populate($row->toArray());
                if ($this->_request->isPost()) {
                    if ($form->isValid($_POST)) {
                        $datas = $form->getValues();
                        $row->article_title = $datas['article_title'];
                        $row->article_description = $datas['article_description'];
                        $row->save();
                        $this->redirect("/admin/index/list-video");
                    }
                }
                $this->view->form = $form;
            } else {
                $this->_forward('error', 'error', 'default');
            }
        }
    }

    public function editHotroAction() {
        $id = $this->_request->getParam("id");
        if ($id) {
            $form = new Application_Form_InsertHotro();
            $form->submit->setLabel("Cập nhật");
            $model = new Application_Model_DbTable_Articles();
            $row = $model->find($id)->current();
            if ($row && $row->article_type == 'hotro') {
                $form->populate($row->toArray());
                if ($this->_request->isPost()) {
                    if ($form->isValid($_POST)) {
                        $datas = $form->getValues();
                        $row->article_title = $datas['article_title'];
                        $row->article_alias = $datas['article_alias'];
                        $row->article_detail = $datas['article_detail'];
                        $row->article_description = $datas['article_description'];
                        $row->save();
                        $this->redirect("/admin/index/list-hotro");
                    }
                }
                $this->view->form = $form;
            } else {
                $this->_forward('error', 'error', 'default');
            }
        }
    }

    public function editSlideAction() {
        $id = $this->_request->getParam("id");
        if ($id) {
            $form = new Application_Form_InsertSlide();
            $form->submit->setLabel("Cập nhật");
            $model = new Application_Model_DbTable_Articles();
            $row = $model->find($id)->current();
            if ($row && ($row->article_type == 'Slide' || $row->article_type == "Slide-footer")) {
                $this->view->thumb = $row->article_image;
                $form->populate($row->toArray());
                $form->article_slide->setValue($row->article_type == "Slide" ? 0 : 1);
                if ($this->_request->isPost()) {
                    if ($form->isValid($_POST)) {
                        $datas = $form->getValues();
                        if ($form->image->isUploaded()) {
                            $form->image->receive();
                            $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->image->getFilename());
                            if ($row->article_image) {
                                $path = APPLICATION_PATH . "/../public/upload/";
                                if (is_file($path . "/" . $row->article_image)) {
                                    unlink($path . "/" . $row->article_image);
                                    unlink($path . "/_thumbs/" . $row->article_image);
                                }
                            }
                            if (file_exists($filename)) {
                                $image = new Cms_File_Image($filename);
                                $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                                $images['thumb'] = $image->CopyResize("225x165");
                                $path = APPLICATION_PATH . "/../public/upload/";
                                $images['name'] = $image->newname;
                                rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                                $row->article_image = $images['name'];
                                $row->article_thumb = $images['name'];
                            }
                        }

                        if ($datas['article_slide'] == 0) {
                            $row->article_type = "Slide";
                        } else {
                            $row->article_type = "Slide-footer";
                        }

                        $row->article_title = $datas['article_title'];
                        $row->article_description = $datas['article_description'];
                        $row->save();
                        $this->redirect("/admin/index/list-slide");
                    }
                }
                $this->view->form = $form;
            } else {
                $this->_forward('error', 'error', 'default');
            }
        }
    }

    public function editBackgroundAction() {
        $form = new Application_Form_Configbackground();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(4)->current();
        $arr = unserialize($row->description);
        $this->view->thumb = $row->value;
        $form->populate($row->toArray());
        if (is_array($arr)) {
            $form->status->setValue($arr['status']);
        }
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $row->description = serialize(array("status" => $datas['status']));
                $images = array();
                if ($form->value->isUploaded()) {
                    $form->value->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->value->getFilename());
                    if ($row->value) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->value)) {
                            unlink($path . "/" . $row->value);
                        }
                        if (is_file($path . "/_thumbs/" . $row->value)) {
                            unlink($path . "/_thumbs/" . $row->value);
                        }
                    }
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $row->value = $images['name'];
                        $this->view->thumb = $row->value;
                    }
                }
                $row->save();
            }
        }
        $this->view->form = $form;
    }

    public function editAdsLeftAction() {
        $form = new Application_Form_ConfigAdsLeft();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(12)->current();
        $arr = unserialize($row->description);
        $this->view->thumb = $row->value;
        $form->populate($row->toArray());
        if (is_array($arr)) {
            $form->status->setValue($arr['status']);
            $form->link->setValue($arr['link']);
        }
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $row->description = serialize(array("status" => $datas['status'], 'link' => $datas['link']));
                $images = array();
                if ($form->value->isUploaded()) {
                    $form->value->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->value->getFilename());
                    if ($row->value) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->value)) {
                            unlink($path . "/" . $row->value);
                        }
                        if (is_file($path . "/_thumbs/" . $row->value)) {
                            unlink($path . "/_thumbs/" . $row->value);
                        }
                    }
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $row->value = $images['name'];
                        $this->view->thumb = $row->value;
                    }
                }
                $row->save();
            }
        }
        $this->view->form = $form;
    }

    public function editAdsRightAction() {
        $form = new Application_Form_ConfigAdsLeft();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(13)->current();
        $arr = unserialize($row->description);
        $this->view->thumb = $row->value;
        $form->populate($row->toArray());
        if (is_array($arr)) {
            $form->status->setValue($arr['status']);
            $form->link->setValue($arr['link']);
        }
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $row->description = serialize(array("status" => $datas['status'], 'link' => $datas['link']));
                $images = array();
                if ($form->value->isUploaded()) {
                    $form->value->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->value->getFilename());
                    if ($row->value) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->value)) {
                            unlink($path . "/" . $row->value);
                        }
                        if (is_file($path . "/_thumbs/" . $row->value)) {
                            unlink($path . "/_thumbs/" . $row->value);
                        }
                    }
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $row->value = $images['name'];
                        $this->view->thumb = $row->value;
                    }
                }
                $row->save();
            }
        }
        $this->view->form = $form;
    }

    public function editLogoAction() {
        $form = new Application_Form_Config();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(1)->current();
        $this->view->thumb = $row->value;
        $form->populate($row->toArray());
        $form->name->setDescription("(370px - 100px)");
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $images = array();
                if ($form->value->isUploaded()) {
                    $form->value->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->value->getFilename());
                    if ($row->value) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->value)) {
                            unlink($path . "/" . $row->value);
                        }
                        if (is_file($path . "/_thumbs/" . $row->value)) {
                            unlink($path . "/_thumbs/" . $row->value);
                        }
                    }
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $row->value = $images['name'];
                    }
                }
                $row->save();
            }
        }
        $this->view->form = $form;
    }

    public function editBannerTopAction() {
        $form = new Application_Form_Config();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(2)->current();
        $this->view->thumb = $row->value;
        $form->populate($row->toArray());
        $form->name->setDescription("(100px - 100px)");
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $images = array();
                if ($form->value->isUploaded()) {
                    $form->value->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->value->getFilename());
                    if ($row->value) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->value)) {
                            unlink($path . "/" . $row->value);
                        }
                        if (is_file($path . "/_thumbs/" . $row->value)) {
                            unlink($path . "/_thumbs/" . $row->value);
                        }
                    }
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $row->value = $images['name'];
                        $this->view->thumb = $row->value;
                    }
                }
                $row->save();
            }
        }
        $this->view->form = $form;
    }

    public function editXahoiAction() {
        $form = new Application_Form_Configxahoi();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(11)->current();
        $arr = unserialize($row->description);
        $form->populate($row->toArray());
        if (is_array($arr)) {
            $form->facebook->setValue($arr['facebook']);
        }
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $row->description = serialize(array(
                    "facebook" => $datas['facebook']
                ));
                $images = array();
                $row->save();
                $this->view->notify = "<div class='notify-success'>Cập nhật thành công!</div>";
            }
        }
        $this->view->form = $form;
    }

    public function editBannerAction() {
        $form = new Application_Form_Config();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(3)->current();
        $this->view->thumb = $row->value;
        $form->populate($row->toArray());
        $form->name->setDescription("(500px - 100px)");
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $images = array();
                if ($form->value->isUploaded()) {
                    $form->value->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->value->getFilename());
                    if ($row->value) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->value)) {
                            unlink($path . "/" . $row->value);
                        }
                        if (is_file($path . "/_thumbs/" . $row->value)) {
                            unlink($path . "/_thumbs/" . $row->value);
                        }
                    }
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $row->value = $images['name'];
                        $this->view->thumb = $row->value;
                    }
                }
                $row->save();
            }
        }
        $this->view->form = $form;
    }

    public function editFooterAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $form = new Application_Form_Footer();
        $model = new Application_Model_DbTable_Config();
        $row = $model->find(10)->current();
        $form->populate($row->toArray());
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $row->value = $datas['value'];
                $row->save();
            }
        }
        $this->view->form = $form;
    }

    public function editUserAction() {
        $id = $this->_request->getParam("id");
        if ($id) {
            $form = new Application_Form_InsertUsers();
            $model = new Application_Model_DbTable_Users();
            $row = $model->find($id)->current();
            if ($row && $row->groups_id != 1 && $row->groups_id != 4) {
                $form->populate($row->toArray());
                $form->username->setAttribs(array("readonly" => "true"))
                        ->setRequired(false);
                $form->submit->setLabel("Cập nhật");
                if ($this->_request->isPost()) {
                    if ($form->isValid($_POST)) {
                        $datas = $form->getValues();
                        $datas['password'] = md5($datas['password']);
                        unset($datas['confirm']);
                        foreach ($datas as $field => $value) {
                            $row->{$field} = $value;
                        }
                        $row->save();
                        $this->redirect("admin/index/list-user");
                    }
                }
                $this->view->form = $form;
            } else {
                $this->_forward('error', 'error', 'default');
            }
        }
    }

    public function editInforAction() {
        $auth = Zend_Auth::getInstance();
        $identity = $auth->getIdentity();
        $form = new Application_Form_InsertUsers();
        $model = new Application_Model_DbTable_Users();
        $row = $model->find($identity->iduser)->current();
        if ($row) {
            $form->populate($row->toArray());
            $form->submit->setLabel("Cập nhật");
            $form->removeElement("groups_id");
            $form->removeElement("user_status");
            if ($this->_request->isPost()) {
                if ($form->isValid($_POST)) {
                    $datas = $form->getValues();
                    $datas['password'] = md5($datas['password']);
                    unset($datas['confirm']);
                    foreach ($datas as $field => $value) {
                        $row->{$field} = $value;
                    }
                    $row->save();
                    $this->view->notify = "<div class='notify-success'>Cập nhật thành công !</div>";
                }
            }
            $this->view->form = $form;
        } else {
            $this->_forward('error', 'error', 'default');
        }
    }

    public function editCategoriesNewsAction() {
        $id = $this->_request->getParam("id");
        if ($id) {
            $model = new Application_Model_DbTable_Categories();
            $form = new Application_Form_InsertCategories();
            $form->submit->setLabel("Cập nhật");
            $arr = $model->arrayDis($id);
            $arr[] = $id;
            $form->parent_id->setAttrib('disable', $arr);

            $row = $model->find($id)->current();
            if ($row) {
                $form->populate($row->toArray());
                if ($this->_request->isPost()) {
                    if ($form->isValid($_POST)) {
                        $datas = $form->getValues();
                        $datas['alias'] = Cms_Filter_String::toAlias($datas['name']);
                        foreach ($datas as $field => $value) {
                            $row->{$field} = $value;
                        }
                        $row->save();
                        $this->redirect("/admin/index/list-categories-news");
                    }
                }
                $this->view->form = $form;
            } else {
                $this->_forward('error', 'error', 'default');
            }
        }
    }

    public function editPcatesAction() {
        $id = $this->_request->getParam("id");
        if ($id) {
            $model = new Application_Model_DbTable_Pcates();
            $form = new Application_Form_InsertPcates();
            $form->submit->setLabel("Cập nhật");
            $arr = $model->arrayDis($id);
            $arr[] = $id;
            $form->pcate_parent->setAttrib('disable', $arr);
            $row = $model->find($id)->current();
            if ($row) {
                $form->populate($row->toArray());
                if ($this->_request->isPost()) {
                    if ($form->isValid($_POST)) {
                        $datas = $form->getValues();

                        if ($datas['pcate_alias'] == "") {
                            $alias = Cms_Filter_String::toAlias($datas['pcate_name']);
                            $rowCheck2 = $model->fetchAll("pcate_alias='{$alias}'");
                            $count = $rowCheck2->count();
                            $datas['pcate_alias'] = $alias . (($count > 0) ? "-{$count}" : "");
                            $form->pcate_alias->setValue($datas['pcate_alias']);
                        }

                        $rowCheck = $model->fetchRow("pcate_alias='" . $datas['pcate_alias'] . "' and pcate_parent='" . $datas['pcate_parent'] . "' and pcate_parent!='" . $row->pcate_parent . "'");
                        if ($rowCheck)
                            $this->view->notify = "<div class='notify-warning'>Danh mục cha bạn chọn đã tồn tại danh mục này !</div>";
                        else {
                            foreach ($datas as $field => $value) {
                                $row->{$field} = $value;
                            }
                            $row->save();
                            //$this->redirect("/admin/index/list-pcates");
                            $this->view->notify = "<div class='notify-success'>Cập nhật thành công!</div>";
                        }
                    }
                }
                $this->view->form = $form;
            } else {
                $this->_forward('error', 'error', 'default');
            }
        }
    }

    public function editNewsAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $id = $this->_request->getParam("id");
        $form = new Application_Form_InsertNews();
        $form->submit->setLabel("Cập nhật");
        $model = new Application_Model_DbTable_Articles();
        $row = $model->find($id)->current();
        if ($row && $row->article_type == 'Tin tức') {
            $m = new Application_Model_DbTable_CategoryHasArticle();
            $rs = $m->fetchAll("articles_idarticle=$id");
            $rsArr = array();
            if ($rs->count() > 0)
                foreach ($rs as $r)
                    $rsArr[] = $r->categories_idcategory;
            $form->populate($row->toArray());
            //if($r){
            $form->idcate->setValue($rsArr);
            //}
            if ($row->article_detail == "") {
                $form->article_detail->setValue("Đang cập nhật...");
            }
            if ($this->_request->isPost()) {
                if ($form->isValid($_POST)) {
                    $datas = $form->getValues();

                    $images = array();
                    if ($form->article_image->isUploaded()) {
                        $form->article_image->receive();
                        $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->article_image->getFilename());
                        if (file_exists($filename)) {
                            $image = new Cms_File_Image($filename);
                            $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                            $images['thumb'] = $image->CopyResize("225x165");
                            $path = APPLICATION_PATH . "/../public/upload/";
                            $images['name'] = $image->newname;
                            rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                            $datas['thumb'] = $images['name'];
                        }
                        if ($row->article_image) {
                            $path = APPLICATION_PATH . "/../public/upload/";
                            if (is_file($path . "/" . $row->article_image)) {
                                unlink($path . "/" . $row->article_image);
                            }
                            if (is_file($path . "/_thumbs/" . $row->article_thumb)) {
                                unlink($path . "/_thumbs/" . $row->article_thumb);
                            }
                        }
                    }
                    $row->article_title = $datas['article_title'];
                    $row->article_alias = Cms_Filter_String::toAlias($datas['article_title']);
                    $row->article_description = $datas['article_description'];
                    $row->article_type = "Tin tức";
                    $row->article_detail = $datas['article_detail'];
                    if ($form->article_image->isUploaded()) {
                        $row->article_image = $datas['thumb'];
                        $row->article_thumb = $datas['thumb'];
                    }
                    $row->save();

                    if ($id) {
                        //$model1 = new Application_Model_DbTable_CategoryHasArticle();
                        $m->delete("articles_idarticle=" . $id);
                        if (is_array($datas['idcate'])) {
                            foreach ($datas['idcate'] as $idcategory) {
                                $ro = $m->createRow(array("categories_idcategory" => $idcategory, "articles_idarticle" => $id));
                                $ro->save();
                            }
                        }
                    }
                    $this->redirect("/admin/index/list-news");
                }
            }
            $this->view->form = $form;
        } else {
            $this->_forward('error', 'error', 'default');
        }
    }

    public function editPageAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $id = $this->_request->getParam("id");
        $form = new Application_Form_EditPage();
        $model = new Application_Model_DbTable_Articles();
        $row = $model->find($id)->current();
        if ($row && $row->article_type == 'page') {
            $form->populate($row->toArray());
            if ($this->_request->isPost()) {
                if ($form->isValid($_POST)) {
                    $datas = $form->getValues();
                    $row->article_title = $datas['article_title'];
                    $row->article_description = $datas['article_description'];
                    $row->article_detail = $datas['article_detail'];
                    $row->save();
                    $this->redirect("/admin/index/pages");
                }
            }
            $this->view->form = $form;
        } else {
            $this->_forward('error', 'error', 'default');
        }
    }

    public function editProdsAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $id = $this->_request->getParam("id");
        $form = new Application_Form_InsertProds();
        $form->submit->setLabel("Cập nhật");
        $model = new Application_Model_DbTable_Products();
        $row = $model->find($id)->current();

        $m = new Application_Model_DbTable_PcateHasProd();
        $rs = $m->fetchAll("products_idproduct=$id");
        $rsArr = array();
        if ($rs->count() > 0)
            foreach ($rs as $r)
                $rsArr[] = $r->pcates_idpcate;
        $form->populate($row->toArray());
        $form->idcate->setValue($rsArr);
        if ($row->product_description == "") {
            $form->product_description->setValue("Đang cập nhật...");
        }
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $temp = Cms_Filter_String::toAlias($datas['product_name']);
                if ($temp != "" && $temp != $row->product_alias) {
                    $validatorCheckHasId = new Zend_Validate_Db_NoRecordExists(array('table' => 'products', 'field' => 'product_alias'));
                    $i = 1;
                    while (!$validatorCheckHasId->isValid($temp . "-" . $i)) {
                        $i++;
                    }
                    $temp = $temp . "-" . $i;
                }
                //var_dump($temp);
                $images = array();
                if ($form->product_image->isUploaded()) {
                    $form->product_image->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->product_image->getFilename());
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $datas['thumb'] = $images['name'];
                    }
                    if ($row->product_image) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->product_image)) {
                            unlink($path . "/" . $row->product_image);
                        }
                        if (is_file($path . "/_thumbs/" . $row->product_thumb)) {
                            unlink($path . "/_thumbs/" . $row->product_thumb);
                        }
                    }
                }
                $row->product_name = $datas['product_name'];
                $row->product_price = $datas['product_price'];
                $row->product_qty = $datas['product_qty'];
                $row->product_alias = $temp;
                $row->product_type = $datas['product_type'];
                $row->product_description = $datas['product_description'];
                if ($form->product_image->isUploaded()) {
                    $row->product_image = $datas['thumb'];
                    $row->product_thumb = $datas['thumb'];
                }
                $row->save();

                if ($id) {
                    $m->delete("products_idproduct=" . $id);
                    if (is_array($datas['idcate'])) {
                        foreach ($datas['idcate'] as $idcate) {
                            $ro = $m->createRow(array("pcates_idpcate" => $idcate, "products_idproduct" => $id));
                            $ro->save();
                        }
                    }
                }
                //$this->redirect("/admin/index/list-prods");
            }
        }
        $this->view->form = $form;
    }

    public function editBillsAction() {
        $this->view->headScript()->appendFile(
                $this->view->baseUrl("ckeditor/ckeditor.js")
        );
        $id = $this->_request->getParam("id");
        $form = new Application_Form_InsertBills();
        $form->submit->setLabel("Cập nhật");
        $model = new Application_Model_DbTable_Bills();
        $row = $model->find($id)->current();

        $m = new Application_Model_DbTable_PcateHasProd();
        $rs = $m->fetchAll("products_idproduct=$id");
        $rsArr = array();
        if ($rs->count() > 0)
            foreach ($rs as $r)
                $rsArr[] = $r->pcates_idpcate;
        $form->populate($row->toArray());
        $form->idcate->setValue($rsArr);
        if ($row->product_description == "") {
            $form->product_description->setValue("Đang cập nhật...");
        }
        if ($this->_request->isPost()) {
            if ($form->isValid($_POST)) {
                $datas = $form->getValues();
                $temp = Cms_Filter_String::toAlias($datas['product_name']);
                if ($temp != "" && $temp != $row->product_alias) {
                    $validatorCheckHasId = new Zend_Validate_Db_NoRecordExists(array('table' => 'products', 'field' => 'product_alias'));
                    $i = 1;
                    while (!$validatorCheckHasId->isValid($temp . "-" . $i)) {
                        $i++;
                    }
                    $temp = $temp . "-" . $i;
                }
                //var_dump($temp);
                $images = array();
                if ($form->product_image->isUploaded()) {
                    $form->product_image->receive();
                    $filename = APPLICATION_PATH . "/../public/upload/" . basename($form->product_image->getFilename());
                    if (file_exists($filename)) {
                        $image = new Cms_File_Image($filename);
                        $image->setDestinationPath(dirname($filename) . "/_thumbs/");
                        $images['thumb'] = $image->CopyResize("225x165");
                        $path = APPLICATION_PATH . "/../public/upload/";
                        $images['name'] = $image->newname;
                        rename($path . "_thumbs/" . $images['thumb'], $path . "_thumbs/" . $images['name']);
                        $datas['thumb'] = $images['name'];
                    }
                    if ($row->product_image) {
                        $path = APPLICATION_PATH . "/../public/upload/";
                        if (is_file($path . "/" . $row->product_image)) {
                            unlink($path . "/" . $row->product_image);
                        }
                        if (is_file($path . "/_thumbs/" . $row->product_thumb)) {
                            unlink($path . "/_thumbs/" . $row->product_thumb);
                        }
                    }
                }
                $row->product_name = $datas['product_name'];
                $row->product_price = $datas['product_price'];
                $row->product_qty = $datas['product_qty'];
                $row->product_alias = $temp;
                $row->product_description = $datas['product_description'];
                if ($form->product_image->isUploaded()) {
                    $row->product_image = $datas['thumb'];
                    $row->product_thumb = $datas['thumb'];
                }
                $row->save();

                if ($id) {
                    $m->delete("products_idproduct=" . $id);
                    if (is_array($datas['idcate'])) {
                        foreach ($datas['idcate'] as $idcate) {
                            $ro = $m->createRow(array("pcates_idpcate" => $idcate, "products_idproduct" => $id));
                            $ro->save();
                        }
                    }
                }
                //$this->redirect("/admin/index/list-prods");
            }
        }
        $this->view->form = $form;
    }

}
