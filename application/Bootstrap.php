<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initTranslate(){
        
		$this->bootstrap('layout');
        $layout = $this->getResource('layout');
        $view = $layout->getView();
        
        
		$translate = new Zend_Translate(array(
				  'adapter' => 'gettext',
				  'content' => APPLICATION_PATH."/languages/",
				  'scan' => Zend_Translate::LOCALE_FILENAME
		));
		$locale = new Zend_Locale();
		$translate->setLocale("en");
        Zend_Form::setDefaultTranslator($translate);
		$view->translate = $translate;
		$view->locale = $locale;        
    }
    
    protected function _initRewrite() {
        $front = Zend_Controller_Front::getInstance();
        $router = $front->getRouter();
        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/routes.ini', 'production');
        $router->addConfig($config,'routes');
    }
      

}

