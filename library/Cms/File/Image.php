<?php 
class Cms_File_Image {
    
    
    protected $name;
    protected $extension;
    protected $width;
    protected $height;
    protected $path;
    
    protected $desPath;
    
    public $thumbname;
    public $newname;
    
    protected $errors = array();
    /**
     * Initialization method
     */
	public function __construct($filename=null){
	   if(null != $filename){
	       if(file_exists($filename) && is_file($filename)){
	           // get image info
               $file_info = pathinfo($filename);
               $this->extension = $file_info['extension'];
               $this->path = $file_info['dirname'];
               $this->name = $file_info['filename'];
               list($this->width, $this->height) = getimagesize($filename);
               
	       }else{
	           $this->errors[] = "File is not exist";
	       }   
           
	   }else{
	       // TODO init for case filename not set
	   }
	}
	
    public function CopyResize($newSize="10x10"){
        $desPath=$this->path;
        if(is_string($newSize)){
                // nếu là chuỗi
                list($newWidth, $newHeight) = explode('x',trim($newSize));    
        }else{
           if(is_float($newSize)){
                // nếu là số thập phân
                $newWidth = $this->width*$newSize;
                $newHeight = $this->height*$newSize;                
           }else{
                $newWidth = 10;
                $newHeight = 10;
           } 
        }
        
        if(count($this->errors)>0){
            return "";
        }else{
            $file_extension = $this->extension;
            
            $thumbname = "thumb_".time().rand(1,1000).".".$file_extension;            
            /*if file not exist*/
            if(!file_exists($desPath.'/'.$thumbname)){
                $ex = strtolower($this->extension);
                if($ex == "jpg"){
                    $ex = "jpeg";
                }
                        
                $SourceImage = "imagecreatefrom".$ex;
                $src_image = $SourceImage($this->path.'/'.$this->name.'.'.$this->extension);
                
                
                if(null == $desPath){
                    $desPath = $this->path;
                }else{
                    $desPath = $this->desPath;
                }
                
                $des_image = imagecreatetruecolor($newWidth,$newHeight);
                if($ex=="png")
                {
                    imagesavealpha($des_image, true); 

                    // Fill the image with transparent color 
                    $color = imagecolorallocatealpha($des_image,0x00,0x00,0x00,127); 
                    imagefill($des_image, 0, 0, $color); 
                }
                
                imagecopyresampled($des_image, $src_image, 0, 0, 0, 0, $newWidth, $newHeight, $this->width, $this->height);
                
                $file_extension = strtolower($file_extension);
                if($file_extension == "jpg"){
                    $file_extension = "jpeg";
                }   
                             
                $ImageSave = "image".strtolower($file_extension);
                $ImageSave($des_image, $desPath.'/'.$thumbname);
                
                $new_name="img_".date('Y-m-d-H-i-s')."_".substr(rand(1,999999).rand(1,999999),0,10).'.'.$this->extension;
                rename($this->path.'/'.$this->name.'.'.$this->extension, $this->path.'/'.$new_name);
                imagedestroy($src_image);
                imagedestroy($des_image);              
            }
            
            $this->thumbname = $thumbname;
            $this->newname = $new_name;
            return $thumbname;
        }
    }
    
    public function CopyResizeFillBackground($newSize="10x10", $bgColor = "255,255,255"){
        if(count($this->errors)>0){
            return "";
        }else{
            // Nếu chưa chọn thư mục lưu file 
            // thì lấy thư mục của file nguồn
            if(!isset($this->desPath)){
                $this->desPath = $this->path;
            }
            
            // Lấy kích thước và màu khởi tạo
            list($newWidth,$newHeight) = explode("x",trim($newSize));
            $new_name = "{$this->name}({$newWidth}x{$newHeight}).{$this->extension}";
            
            // Nếu file chưa tồn tại thì bắt đầu tạo hình
            if(!file_exists($this->desPath.'/'.$new_name)){
                
                // init destination image
                list($R,$G,$B) = explode(",",trim($bgColor));
                $des_image = imagecreatetruecolor($newWidth, $newHeight)
                                or die("Cannot Initialize new GD image stream");
                $background_color = imagecolorallocate($des_image, $R, $G, $B);
                imagefill($des_image, 0, 0, $background_color);
                
                // init source image
                $ex = $this->extension;
                if($this->extension == "jpg"){
                    $ex = "jpeg";
                }                
                $ImageSource = "imagecreatefrom".$ex;
                $src_image = $ImageSource($this->path.'/'.$this->name.'.'.$this->extension);
                
                // Copy source image to destination image
                $rate = ($this->width/$this->height);
                
                $dst_w = $newWidth;
                $dst_h = $dst_w/$rate;
                if($dst_h > $newHeight){
                    $dst_h = $newHeight;
                    $dst_w = $dst_h*$rate;
                }                
                $dst_x = ($newWidth - $dst_w)/2;
                $dst_y = ($newHeight - $dst_h)/2;
                //
                imagecopyresampled($des_image, $src_image,$dst_x, $dst_y, 0, 0, $dst_w, $dst_h ,$this->width, $this->height);
                //Show image
                $SaveImage = "image".$ex; 
                $SaveImage($des_image, $this->desPath.'/'.$new_name);
                
                imagedestroy($des_image);
                imagedestroy($src_image);   
            }
            return $new_name;               
        }
    }

    public function detete(){
        $files = glob($this->path.'/'.$this->name."*.*");
        foreach ($files as $file){
            if(!unlink($file)){
                return fasle;
            }
        }
        return true;
    }
    
    public function setDestinationPath($destination){
        if(file_exists($destination)){
            $this->desPath = $destination;
        }
    }
    
    public function getName(){
        return $this->name;
    }
    
    
    public function getExtension(){
        return $this->extension;
    }
    
    public function getWidth(){
        return $this->width;
    }
    
    public function getHeight(){
        return $this->height;
    }
    
    public function getPath(){
        return $this->path;
    }
    
    public function getErrors(){
        return $this->errors;
    }
    
    public static function upload($path,$file){
        $file_name = "";
        $allowedExts = array("jpg", "jpeg", "gif", "png");
        $extension = end(explode(".", $file["name"]));
        if ((($file["type"] == "image/gif")
        || ($file["type"] == "image/jpeg")
        || ($file["type"] == "image/png")
        || ($file["type"] == "image/pjpeg"))
        && in_array($extension, $allowedExts))
        {
            if ($file["error"] > 0)
            {
                echo "Return Code: " . $file["error"] . "<br>";
            }
            else
            {   
                $file_name = substr(md5(mktime()),0,8) . "_" .$file["name"];
                move_uploaded_file($file["tmp_name"],$path . "/" . $file_name);
            }
        }
        return $file_name;
    }
}
?>