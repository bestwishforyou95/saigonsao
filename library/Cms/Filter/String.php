<?php
class Cms_Filter_String {
    
    public static function encodePassword($pass){
        $str = md5($pass);
        $arrayKey = array('0'=>'A','1'=>"B",'2'=>"C",'3'=>"D",
                          '4'=>"E",'5'=>"F",'6'=>"G",'7'=>"H",
                          '8'=>'I','9'=>"J",'a'=>"K",'b'=>"L",
                          'c'=>"M",'d'=>"N",'e'=>"O",'f'=>"P");
        
        for($i=0; $i< strlen($str); $i++){
            $str[$i] = $arrayKey[$str[$i]];
        }
        return $str;
    }
    
    public static function createDiscountCode(){
        $code = substr(Cms_Filter_String::encodePassword(rand(0,100000000).time()),0,16);
        $code = str_split($code,4);
        $code = implode("-",$code);
        return $code;
    }
    
    public static function htmlDecode($string)
	{
		return html_entity_decode($string,null,"UTF-8");
	}
	public static function htmlEncode($string)
	{
		return htmlentities($string,null,"UTF-8");
	}
    public static function tranferData($string)
	{
		$trans = array(
					'à'=>'a','á'=>'a','ả'=>'a','ã'=>'a','ạ'=>'a',
					'ă'=>'a','ằ'=>'a','ắ'=>'a','ẳ'=>'a','ẵ'=>'a','ặ'=>'a',
					'â'=>'a','ầ'=>'a','ấ'=>'a','ẩ'=>'a','ẫ'=>'a','ậ'=>'a',
					'À'=>'a','Á'=>'a','Ả'=>'a','Ã'=>'a','Ạ'=>'a',
					'Ă'=>'a','Ằ'=>'a','Ắ'=>'a','Ẳ'=>'a','Ẵ'=>'a','Ặ'=>'a',
					'Â'=>'a','Ầ'=>'a','Ấ'=>'a','Ẩ'=>'a','Ẫ'=>'a','Ậ'=>'a',    
					'đ'=>'d','Đ'=>'d',
					'è'=>'e','é'=>'e','ẻ'=>'e','ẽ'=>'e','ẹ'=>'e',
					'ê'=>'e','ề'=>'e','ế'=>'e','ể'=>'e','ễ'=>'e','ệ'=>'e',
					'È'=>'e','É'=>'e','Ẻ'=>'e','Ẽ'=>'e','Ẹ'=>'e',
					'Ê'=>'e','Ề'=>'e','Ế'=>'e','Ể'=>'e','Ễ'=>'e','Ệ'=>'e',
					'ì'=>'i','í'=>'i','ỉ'=>'i','ĩ'=>'i','ị'=>'i',
					'Ì'=>'i','Í'=>'i','Ỉ'=>'i','Ĩ'=>'i','Ị'=>'i',
					'ò'=>'o','ó'=>'o','ỏ'=>'o','õ'=>'o','ọ'=>'o',
					'ô'=>'o','ồ'=>'o','ố'=>'o','ổ'=>'o','ỗ'=>'o','ộ'=>'o',
					'ơ'=>'o','ờ'=>'o','ớ'=>'o','ở'=>'o','ỡ'=>'o','ợ'=>'o',
					'Ò'=>'o','Ó'=>'o','Ỏ'=>'o','Õ'=>'o','Ọ'=>'o',
					'Ô'=>'o','Ồ'=>'o','Ố'=>'o','Ổ'=>'o','Ỗ'=>'o','Ộ'=>'o',
					'Ơ'=>'o','Ờ'=>'o','Ớ'=>'o','Ở'=>'o','Ỡ'=>'o','Ợ'=>'o',
					'ù'=>'u','ú'=>'u','ủ'=>'u','ũ'=>'u','ụ'=>'u',
					'ư'=>'u','ừ'=>'u','ứ'=>'u','ử'=>'u','ữ'=>'u','ự'=>'u',
					'Ù'=>'u','Ú'=>'u','Ủ'=>'u','Ũ'=>'u','Ụ'=>'u',
					'Ư'=>'u','Ừ'=>'u','Ứ'=>'u','Ử'=>'u','Ữ'=>'u','Ự'=>'u',
					'ỳ'=>'y','ý'=>'y','ỷ'=>'y','ỹ'=>'y','ỵ'=>'y',
					'Y'=>'y','Ỳ'=>'y','Ý'=>'y','Ỷ'=>'y','Ỹ'=>'y','Ỵ'=>'y'
				  );
  		$string = strtr(Cms_Filter_String::htmlDecode($string), $trans);
  		return $string;		
	}
    
    public static function toLower($string, $encode = "UTF-8")
	{
		return mb_strtolower($string, $encode);
	}
    
    public static function toAlias($string)
	{
		$tmp = array("~","`","!","@","#","$","%","^","&","*","(",")","-","_","=","+","{","[","]","}","|","\\",":",";","'","\"","<",",",">",".","?","/");
		
		$string = Cms_Filter_String::tranferData($string);
		$string = strip_tags($string);
		$string = trim($string, " \n\t.");
		$string = str_replace($tmp," ",$string);
		
		$arr = explode(" ", $string);
		
		$string = "";
		foreach ($arr as $key)
		{
			if(!empty($key))
				$string.= "-".$key;
		}
		return Cms_Filter_String::toLower(substr($string, 1));
	}
    
    
}
?>