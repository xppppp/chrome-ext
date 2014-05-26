function populate_iframe(tab, base_url)
{
    if(base_url == null || base_url == "") {
	document.getElementById('configure_me').setAttribute('style','display:block');
	document.getElementById('source').setAttribute('style','display:none');
    } else {
	document.getElementById('configure_me').setAttribute('style','display:none');
	document.getElementById('source').setAttribute('style','display:block');
	var url = tab.url;
	var title = tab.title || url;
	var if_url = base_url + '?action=add&url=' + btoa(url);
	document.getElementById('source').setAttribute('src', if_url);
    }
}

function postURL() {
    var showNotification = function(title, message, autoClose) {
	var target = document.getElementById('configure_me');
	if (target) {
	    if (!target._saveContents) {
		target._saveContents = target.innerHTML;
	    }
	    target.innerHTML = '<h3>'+title+'</h3><div>'+message+'</div>';
	    target.setAttribute('style','display:block');
	    document.getElementById('source').setAttribute('style','display:none');
	    if (autoClose) {
		setTimeout(function() { window.close(); }, 5000);
	    }
	}
    };

    chrome.tabs.getSelected(null, function(tab) {
	var settings = new Store("settings", {});
	var options = settings.toObject();
	var base_url = options['base_url'];
	var username = options['username'];
	var password = options['password'];

	if (base_url && base_url.length &&
	    username && username.length &&
	    password && password.length) {
	    showNotification('Please Wait', 'Your link is being posted.', 
			     false);
	    var postXHR = new XMLHttpRequest();
	    postXHR.addEventListener('load', function (xe) {
		if (postXHR.status == 200) {
		    try {
			var rObj = JSON.parse(postXHR.responseText);
			if (rObj.status == 0) {
			    showNotification('Success', 'Added link ' + 
					     rObj.message, true);
			} else {
			    showNotification('Problem', 
					     'Problem adding link ' + 
					     rObj.message, true);
			}
		    }
		    catch (te) {
			showNotification('Error', 'Response error ' + 
					 te.message, true);
		    }
		}
	    });
	    postXHR.addEventListener('error', function (xe) {
		showNotification('Error', 'Error posting URL: ' + 
				 xe.message + ', tryinv via web.', false);
		populate_iframe(tab, base_url);
	    });
	    postXHR.addEventListener('abort', function (xe) {
		showNotification('Cancelled', 'URL post cancelled.', true);
	    });
	    postXHR.open('POST', base_url + 'api.php', true);
	    var formData = new FormData();
	    formData.append('action', 'add');
	    formData.append('login', username);
	    formData.append('password', password);
	    formData.append('url', btoa(tab.url));
	    postXHR.send(formData);
	} else {
	    populate_iframe(tab, base_url);
	}
    });
}

window.onload = postURL;
