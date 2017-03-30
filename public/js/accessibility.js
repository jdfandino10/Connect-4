$("#accounts-wrapper").bind("DOMNodeInserted",function(){
    //console.log("child is appended");
    var userIn = $("#login-username");
    var signModalToggle = $("#login-sign-in-link");
    var close = $("a.login-close-text");
    var modal = $("#login-dropdown-list");
    var signInButton = $("div.login-button-form-submit");
    var change = $("a.additional-link");
    if(userIn) {
    	userIn.focus();
    }
    if (modal.length !==0) {
    	modal.attr('tabindex', '0');
    	modal.attr('aria-label', 'sign up or login');
    	if($("#overlay").length===0) {
    		$("<div id=\"overlay\"class=\"modal-overlay\"></div>").insertAfter(modal);
    		$("#overlay").click(function(e){close.click()});
    	}
    }
    if (close.length !== 0){
    	let oldClick = close.click;
    	close.click( function () {
    		$("#overlay").remove();
    		//oldClick();
    		//deshabilitar foco de todo
    		//oldClick();
    	});
    }
    addButtonBehaviour(signModalToggle);
    addButtonBehaviour(close);
    addButtonBehaviour(signInButton);
    addButtonBehaviour(change);
    /*if(signModalToggle) {
    	let oldClick = signModalToggle.click;
    	signModalToggle.click(
    		//deshabilitar foco de todo
    		//oldClick();
    	);
    }*/
});

function addButtonBehaviour(component) {
	if(component) {
		component.keypress(function(e) {
		    if(e.which === 13 || e.which === 32) {
        		component.click();
        	}
    	});
    	component.attr('tabindex', '0');
	}
}