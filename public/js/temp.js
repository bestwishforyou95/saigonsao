$(function(){
    $(".status, .showhome, .orderhome").click(function(){
        var allow = $(this).children("span").attr("class");
        var id = $(this).children("span").attr("rel");
        $(this).children("span").removeClass();
        if(allow=="icon icon-color icon-check")
            $(this).children("span").addClass("icon icon-color icon-close");
        else
            $(this).children("span").addClass("icon icon-color icon-check");
    });
});