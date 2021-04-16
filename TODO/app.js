$(document).ready(()=>{
String.prototype.format = function() {
		a = this;
		for (k in arguments) {
			a = a.replace("{" + k + "}", arguments[k]);
		}
	 return a;
}
remove_as = function(id){
	data = Object.keys(localStorage);
	localStorage.removeItem(data[id]);
	document.getElementById(id.toString()).style.display = 'none';
	document.getElementById("alert").style.display = 'block';
	setInterval(()=>{
		document.getElementById("alert").style.display = 'none';
	}, 1000);
}
data = Object.keys(localStorage);
HTML_ITEAM = '<div  class="input-group"  id={1}><span class="input-group-addon"><i class="glyphicon glyphicon-trash" onclick="remove_as({2});"></i></span><li class="list-group-item">{0}</li></div>'
for(i=0; i < data.length; i++){
	document.getElementById('msg').innerHTML += HTML_ITEAM.format(localStorage.getItem(data[i]), i, i);
}
function token() {
	const MAKER = 20;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	var r = Math.random() * MAKER | 0, value = c == 'x' ? r : (r & 0x3 | 0x8);
	value = value.toString(MAKER);
	if (value in localStorage){
		document.getElementById("alert_input").style.display = 'block';
		setInterval(()=>{
			document.getElementById("alert_input").style.display = 'none';
		}, 1000);
	}else{
		return value;
		}
	});
  }
document.getElementById("submit").addEventListener("click", ()=>{
	if(document.getElementById("text").value == ""){
		document.getElementById("alert_input").style.display = 'block';
		setInterval(()=>{
		document.getElementById("alert_input").style.display = 'none';
	}, 1000);
	}else {
		// block xss You Can remove its but is self xss :)
		// Injection will be at a client in the task box 
		value = document.getElementById("text").value
		$.post("index.php", {entities: value}, function(news_data, status){
			localStorage.setItem(token(), news_data);
			data = Object.keys(localStorage);
			document.getElementById('msg').innerHTML += HTML_ITEAM.format(news_data, data.length -1, data.length-1);
			document.getElementById("text").value = '';	
		  });
		
	}
});
});