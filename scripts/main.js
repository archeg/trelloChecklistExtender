chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		console.log("Authorizing...");

//    if (HashSearch.keyExists('token')) {
	   if (!localStorage.trello_token){
   		Trello.setKey(APP_KEY);
        Trello.authorize(
            {
                name: "Trello CheckList Extender",
                type: "redirect",
                expiration: "never",
                interactive: true,
                scope: {read: true, write: false},
                success: function () {
                    // Can't do nothing, we've left the page
                },
                error: function () {
                    console.log("Failed to authorize with Trello.")
                }
            });
	   }

	   // Dictionary. Key = href of the task. Value - stuff to add (first uncomplete item from checkbox)
	    var stuffToAdd = {};

	    var boardId = window.location.pathname.split("/")[2];
	    $.ajax({url:"/1/boards/" + boardId + "/cards/visible", success: function(result) {
	    		stuffToAdd = {};
	    		result.forEach(function(entry){
	    			console.log(entry.idChecklists);
	    			entry.idChecklists.forEach(function(checkListId){
						var cardHref = entry.url.replace("https://trello.com", "");
		    			if (checkListId != null) {
				    			$.ajax({url: "/1/checklists/"+checkListId, success: function(r) {
				    				if (r.name.toLowerCase() == "pending") {
				    					r.checkItems.forEach(function(item) {
				    						if (item.state == "incomplete") {
					    						if (stuffToAdd[cardHref] == undefined) {
						    						stuffToAdd[cardHref] = []
						    					}

					    						stuffToAdd[cardHref].push(item.name);
					    					}
				    					});
				    				} else {
				    					items = r.checkItems;
					    				items.sort(function(a, b) {
					    					if (a.pos == b.pos) return 0;
					    					return a.pos > b.pos? 1: -1;
					    				});
					    				console.log(r);

					    				var firstCheck = jQuery.grep(items, function(el) {return el.state == "incomplete"})[0];
					    				if (firstCheck != null) {
					    					if (stuffToAdd[cardHref] == undefined) {
					    						stuffToAdd[cardHref] = []
					    					}

					    					stuffToAdd[cardHref].push(firstCheck.name);
					    				} 
					    			}
				    			}});
				    		}
	    			});
	    			
	    		});
	    }});

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
	 	//$("div.list-card-details").append("<p>Hello world</p>");
	 	setTimeout(function() {
			$("div.list-card-details").each(function(index){
			 		var href = $(this).find("a.list-card-title.js-card-name").attr("href");
			 		console.log(stuffToAdd[href]);
			 		if (stuffToAdd[href] != null) {
			 			var s = "<div class=\"badges\">Pending: <br/>";

			 			stuffToAdd[href].forEach(function(entry){
			 				s += " - "
			 				s += entry;
			 				s += "<br/>";
			 			});

			 			s += "</div>";

			 			$(this).append(s);
			 		}
			 	});
	 	}, 1000);

	 	console.log(localStorage.trello_token);
	 	 if (localStorage.trello_token) {
	 	 	console.log("Is authorized to use Trello");
	 	 } else {
	 	 	console.log("Is not authorized to use Trello");
	 	 }


		// ----------------------------------------------------------

	}
	}, 10);
});
