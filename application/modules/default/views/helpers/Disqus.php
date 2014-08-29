<?php 
class Zend_View_Helper_Disqus extends Zend_View_Helper_Abstract{
	
	public function disqus($disqusUnixName){
		return "<div id=\"disqus_thread\"></div>
        <script type=\"text/javascript\" src=\"http://disqus.com/forums/{$disqusUnixName}/embed.js\"></script>
        <noscript><a href=\"http://{$disqusUnixName}.disqus.com/?url=ref\">
        View the discussion thread.
        </a></noscript>
        <a href=\"http://disqus.com\" class=\"dsq-brlink\">blog comments powered by <span class=\"logo-disqus\">Disqus</span></a>
        ";
	}
}
?>