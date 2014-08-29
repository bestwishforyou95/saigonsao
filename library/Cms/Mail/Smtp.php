<?php
class Cms_Mail_Smtp{
    
    public static function send($auth=array(), $from=array(), $to=array(), $subject, $message)
    {
        $config = array(
            'ssl' => 'tls',
            'auth' => 'login',
            'username' => $auth['username'],
            'password' => $auth['password']
        );
                
        $transport = new Zend_Mail_Transport_Smtp($auth['server'], $config);   
        $mail = new Zend_Mail('utf-8');        
        $mail->setFrom($from['address'], $from['name']);           
        $mail->addTo($to['address'], $to['name']);
        $mail->setSubject($subject);
        $mail->setBodyHtml($message,'utf-8');        
        return $mail->send($transport);
    }
}
?>