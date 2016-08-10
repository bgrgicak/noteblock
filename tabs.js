var tabs={
	tabDelete: function(){
		$('#prompt').addClass("active").addClass("alert");
		$('#prompt #alertDo').click(function(){
			data.deleteData($('nav .tab.active').attr("data-name"));
			data.deleteData("name"+$('nav .tab.active').attr("data-name"));
			$('nav .tab.active').remove();
			if($('nav .tab').length==0){
				tabs.addTab("editorText");
			}
			tabs.openTab($($('nav .tab')[0]).attr("data-name"));
			tabs.saveTabs();
			$('#prompt').removeClass("active").removeClass("alert");
			$('#prompt #alertDo, #prompt #alertDont').off('click');
		});
		$('#prompt #alertDont').click(function(){
			$('#prompt').removeClass("active").removeClass("alert");
			$('#prompt #alertDo, #prompt #alertDont').off('click');
		});
	},
	addTabs: function(){
		$("nav").addClass("tabs");
		var dt=data.getData("editorTabList");
		if(dt!=undefined){
			var arr=dt.split("|||");
			for(var i=0;i<arr.length;i++){
				tabs.addTab(arr[i]);
			}
		}
		if($('nav .tab').length==0){
			tabs.createTab();
		}
		var tb=data.getData("editorActiveTab");
		if(tb!="" && $('nav .tab[data-name='+tb+']').length>0){
			tabs.openTab(tb);
		}
		else{
			tabs.openTab($($('nav .tab')[0]).attr("data-name"));
		}
	},
	addTab: function(tab){
		var val=data.getData(tab);
		var name=data.getData("name"+tab);
		if(name=="" || name==null){
			name="Document";
		}
		var btn=$('<input type="button" class="tab" value="'+name+'" data-name="'+tab+'"/>');
		btn.click(function(){
			tabs.openTab($(this).attr("data-name"));
		});
		btn.dblclick(function() {
			tabs.tabName($(this).attr("data-name"));
		});
		$('nav').append(btn);
	},
	tabName: function(tab){
		$('#prompt').addClass("active").addClass("name");
		$('#prompt #tabName')
			.val($('nav .tab[data-name='+tab+']').val())
			.focus().select();
		$('#prompt #tabSave').click(function(){
			$('nav .tab[data-name='+tab+']').val($('#prompt #tabName').val());
			data.saveData("name"+tab,encodeURIComponent($('#prompt #tabName').val()));
			$('#prompt').removeClass("active").removeClass("name");
			$('#prompt #tabSave, #prompt #tabCancle').off('click');
		});
		$('#prompt #tabCancle').click(function(){
			$('#prompt').removeClass("active").removeClass("name");
			$('#prompt #tabSave, #prompt #tabCancle').off('click');
		});
	},
	openTab: function(tab){
		$('#editor').val(data.getData(tab));
		$('nav .tab').removeClass("active");
		$('nav .tab[data-name='+tab+']').addClass("active");
		data.saveData("editorActiveTab",tab);
	},
	saveTab: function(){
		data.saveData($('nav .tab.active').attr("data-name"),encodeURIComponent($('#editor').val()));
		data.saveData("name"+$('nav .tab.active').attr("data-name"),encodeURIComponent($('nav .tab.active').val()));
	},
	createTab:function(){
		var last="";
		if($('nav .tab').length>0){
			last=$($('nav .tab').last()).attr("data-name").split("editorText")[1];
		}
		var next=0;
		if(last!=""){
			next=parseInt(last)+1;
		}
		tabs.addTab("editorText"+next);
		tabs.openTab("editorText"+next);
		data.saveData("editorText"+next,"");
		data.saveData("nameeditorText"+next,"Document");
		tabs.saveTabs();
	},
	saveTabs:function(){
		data.saveData("editorTabList",tabs.listTabs());
	},
	listTabs: function(){
		var arr="";
		for(var i=0;i<$('nav .tab').length;i++){
			arr+=$($('nav .tab')[i]).attr("data-name");
			if(i<($('nav .tab').length-1)){
				arr+="|||";
			}
		}
		return arr;
	}
}
