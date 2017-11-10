function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

function httpReq (method, path, func, query) {
	var req = new XMLHttpRequest();
    req.addEventListener("load", func);
    req.open(method, path);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(query);
}

function addTodo () {
	document.getElementById("tasks").innerHTML = '';
	httpReq ('GET', 'get_todo.php', getTodo, '');
	document.getElementById("new1").value = '';
}

function delTodo () {
	document.getElementById("tasks").innerHTML = '';
	httpReq ('GET', 'get_todo.php', getTodo, '');
}

function editTodo () {
	document.getElementById("tasks").innerHTML = '';
	httpReq ('GET', 'get_todo.php', getTodo, '');
}

function getTodo () {
	var todo_tasks = JSON.parse(this.responseText);
	for (var i = 0; i < Object.keys(todo_tasks).length; i++) {
		var node = document.createElement("li");
		var nodetext = todo_tasks[i]['name'];
		node.className = 'id-' + todo_tasks[i]['id'];
		node.className += ' ' + 'status-' + todo_tasks[i]['status'];
		node.innerHTML = nodetext;
		node.innerHTML += "<span class=\"del\"'>X</span><span class=\"done\">Done</span><span class=\"edit\">Edit</span>";
		document.getElementById("tasks").appendChild(node);  		
	}              	
}

function getCom () {
	var todo_tasks = JSON.parse(this.responseText);
	for (var i = 0; i < Object.keys(todo_tasks).length; i++) {
		var node = document.createElement("li");
		var nodetext = todo_tasks[i]['name'];
		node.className = 'id-' + todo_tasks[i]['id'];
		node.className += ' ' + 'status-' + todo_tasks[i]['status'];
		node.innerHTML = nodetext;
		node.style.setProperty("text-decoration", "line-through");
		document.getElementById("tasks2").appendChild(node);  		
	}  
}

function markTodo () {
	document.getElementById("tasks").innerHTML = '';
	document.getElementById("tasks2").innerHTML = '';
	httpReq ('GET', 'get_todo.php', getTodo, '');
	httpReq ('GET', 'get_com.php', getCom, '');
}

function clearCom () {
	document.getElementById("tasks2").innerHTML = '';
	httpReq ('GET', 'get_com.php', getCom, '');
}

//Document is ready or DOM is loaded
document.addEventListener("DOMContentLoaded", function(event) { 
    //Fetching data
    httpReq('GET', 'get_todo.php', getTodo, '');

    httpReq('GET', 'get_com.php', getCom, '');
    
    var x = document.getElementById("new2");

	x.addEventListener('click', function() {
		if (document.getElementById("new1").value != '') { 
			var nameVar = document.getElementById("new1").value;
			var inputQuery = 'name=' + nameVar;
			httpReq('POST', 'add_todo.php', addTodo, inputQuery);
		}
		else {
			alert('Field should not be empty!')
		}
	}); 

	var y = document.getElementById("tasks");
	y.onclick = function(event) {
    	var target = getEventTarget(event);
    	if (target.tagName == 'SPAN' && target.className == "del") {
    		if (confirm('Delete this task?')) {
				var id = target.parentNode.classList[0];
				id = id.replace('id-', '');
				var inputQuery = 'id=' + id;
				httpReq('POST', 'delete_todo.php', delTodo, inputQuery);
    		}
    	}
    	else if (target.tagName == 'SPAN' && target.className == "done") {
    		if (confirm('Mark this done?')) {
			var id = target.parentNode.classList[0];
			id = id.replace('id-', '');
	    	var inputQuery = 'id=' + id;
	    	httpReq('POST', 'mark_com.php', markTodo, inputQuery);    			
    		}
    	}
    	else if (target.tagName == 'SPAN' && target.className == "edit") {
    		var li = target.parentNode;
    		var temp = li.textContent.replace('XDoneEdit','');
	    	var change = prompt('Edit this as?', li.textContent.replace('XDoneEdit',''));
	    	if (change == null) {
	    		change = temp;
	    	}
	    	else {
				var id = target.parentNode.classList[0];
				id = id.replace('id-', '');
		    	var name = change;
		    	var inputQuery = 'id=' + id + "&name=" + name;
		    	httpReq('POST', 'edit_todo.php', editTodo, inputQuery);
	    	}
	    }    	
    };

  var z = document.getElementById("completed");
	z.onclick = function(event) {
    	var target = getEventTarget(event);
    	if (target.id == 'clear') {
        if (confirm('Clear this list?')) {
        	inputQuery = 'clear=yes';
			httpReq('POST', 'clear_com.php', clearCom, inputQuery);	
        } 
    	}
    };
});



