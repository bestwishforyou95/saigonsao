<?php
class Cms_Plugin_Auth extends Zend_Controller_Plugin_Abstract{
    
    
    public function preDispatch(Zend_Controller_Request_Abstract $request){
        
        $module = $request->getModuleName();
        $controller = $request->getControllerName();
        $action = $request->getActionName();  
        
        $auth = Zend_Auth::getInstance();
        if($auth->hasIdentity()) 
        {
            $identity = $auth->getIdentity();             
            
            $acl = new Zend_Acl();
            //add Role
            $modelRole = new Application_Model_DbTable_Groups();
            $rowsRole = $modelRole->fetchAll();
            foreach($rowsRole as $rowRole){
                $acl->addRole(new Zend_Acl_Role($rowRole->idgroup));
            }
            //add Resource
            $model = new Application_Model_DbTable_Actions();
            $rowsResource = $model->getAll();
            
            foreach($rowsResource as $rowResource){
				//if(!$acl->hasResource($rowResource->module_name."/".$rowResource->controller_name."/".$rowResource->action_name))
					$acl->add(new Zend_Acl_Resource($rowResource->module_name."/".$rowResource->controller_name."/".$rowResource->action_name));
            }            
            
            $acl->deny();
            
            //set allow and deny
            $modelAllow = new Application_Model_DbTable_Rules();
            $rowsAllow = $modelAllow->getAll();
            foreach($rowsAllow as $rowAllow){
                if($rowAllow->allow)
                    $acl->allow($rowAllow->groups_id,$rowAllow->module_name."/".$rowAllow->controller_name."/".$rowAllow->action_name);
            }
            //check rules for groups and module-controller-action
            if($acl->has($module."/".$controller."/".$action))
                if(!$acl->isAllowed($identity->groups_id,$module."/".$controller."/".$action))
                {
                    $request->setModuleName("admin");
                    $request->setControllerName("error");
                    $request->setActionName("no-auth");
                }  
            Zend_Registry::set('acl', $acl);
        }        
        else if($module=="admin")
        {           
            $request->setModuleName("admin");
            $request->setControllerName("index");
            $request->setActionName("index");
        }
        
        
        
    }
}
?>