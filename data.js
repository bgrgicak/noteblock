var data={
	getData: function(cname){
		if(localStorage.getItem(cname)!=undefined){
			return decodeURIComponent(localStorage.getItem(cname));
		}
	},
	deleteData: function(cname) {
		localStorage.removeItem(cname);
	},
	saveData:function(cname,value){
		localStorage.setItem(cname,value);
	},
	textEncode: function(data){
		return encodeURIComponent(data.replace(/\\n/g, "\\r\\n").replace(/\\n/g, "\\n")
				  .replace(/\\'/g, "\\'")
				  .replace(/\\"/g, '\\"')
				  .replace(/\\&/g, "\\&")
				  .replace(/\\r/g, "\\r")
				  .replace(/\\t/g, "\\t")
				  .replace(/\\b/g, "\\b")
				  .replace(/\\f/g, "\\f"));
	}
}
