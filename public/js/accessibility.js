$("#accounts-wrapper").bind("DOMNodeInserted",function(){
    console.log("child is appended");
    var userIn = $("#login-username");
    if(userIn) {
    	userIn.focus();
    }
});