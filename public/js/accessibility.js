$("#accounts-wrapper").bind("DOMNodeInserted",function(){
    //console.log("child is appended");
    var userIn = $("#login-username");
    var signModalToggle = $("#login-sign-in-link");
    if(signModalToggle.length===0) signModalToggle=$("#login-name-link");
    var close = $("a.login-close-text");
    var modal = $("#login-dropdown-list");
    var signInButton = $("div.login-button-form-submit");
    var change = $("a.additional-link");
    var changePass = $("#login-buttons-open-change-password");
    var signOut = $("#login-buttons-logout");
    var chPassBtn = $("#login-buttons-do-change-password");
    var oldPass = $("#login-old-password");

    if(userIn.length!==0) {
    	userIn.focus();
    }
    if(changePass.length!==0) {
    	changePass.focus();
    }
    if(oldPass.length!==0) {
    	oldPass.focus();
    }
    if(signModalToggle.length!==0) {
    	let oldClick = signModalToggle.click;
    	signModalToggle.click(
    		//deshabilitar foco de todo
    		function () {
    			removeFocus();	
    		}
    		
    	);
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
    		restoreFocus();
    	});
    }
    addButtonBehaviour(signModalToggle);
    addButtonBehaviour(close);
    addButtonBehaviour(signInButton);
    addButtonBehaviour(change);
    addButtonBehaviour(changePass);
    addButtonBehaviour(signOut);
    addButtonBehaviour(chPassBtn);
    
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

function removeFocus() {
	let intr = $(".intro-page");
	if (intr.length===0) intr.attr('aria-hidden', 'true');
	let hideable = $(".hideOnSignModal");
	hideable.attr('aria-hidden', 'true'); 

	//Agregar el focus trap
}

function restoreFocus() {
	let intr = $(".intro-page");
	if (intr.length===0) intr.attr('aria-hidden', 'false');
	let hideable = $(".hideOnSignModal");
	hideable.attr('aria-hidden', 'false');

	//quitar el focus trap
}