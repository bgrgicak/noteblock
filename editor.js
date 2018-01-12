var editor = {
  init: function() {
    if (localStorage.data == undefined) localStorage.data = {};
    data.getData("editorWidth", function(res) {
      console.log(res);
      $("#editor").css("width", res + "px");
      data.getData("editorHeight", function(res) {
        console.log(res);
        $("#editor").css("height", res + "px");
        editor.textareaEvents("#editor");
        editor.keyEvents("body");
        tabs.addTabs();
        editor.events();
        editor.tinymce();
      });
    });
  },
  events: function() {
    $("#editor").bind("change keyup paste", function() {
      tabs.saveTab();
    });
    $("#editor").resizable({
      maxWidth: 800,
      maxHeight: 510,
      minWidth: 220,
      minHeight: 200,
      resize: function() {
        data.saveData("editorWidth", $("#editor").width());
        data.saveData("editorHeight", $("#editor").height());
      },
      handles: "w, sw, s"
    });
    data.getData("scrollTop", function(res) {
      if (res) $("#editor").scrollTop(res);
    });
    $("#editor").scroll(function() {
      data.saveData("scrollTop", $(this).scrollTop());
    });
    $(".ui-resizable-sw").addClass("ui-icon ui-icon-gripsmall-diagonal-sw");
    $("#doEmail").click(function() {
      window.open(
        "mailto:?subject=&body=" + data.textEncode($("#editor").val()),
        "_blank"
      );
    });
    $("#doSave").click(function() {
      editor.saveFile();
    });
    $("#doDelete").click(function() {
      tabs.tabDelete();
    });
    $("#doTab").click(function() {
      window.open(window.location.href, "_blank");
    });
    $("#add").click(function() {
      tabs.createTab();
    });
  },
  tinymce: function() {
    tinymce.init({
      selector: "#editor",
      branding: false,
      menubar: false,
      statusbar: false,
      resize: "both",
      plugins: ["code", "autoresize", "lists"],
      toolbar: "undo redo | bold italic | bullist numlist | styleselect | code",
      autoresize_bottom_margin: 0,
      setup: function(ed) {
        ed.on("change", function(e) {
          console.log("change");
          editor.updateEditorContent(ed);
        });
        ed.on("keyup", function(e) {
          console.log("keyup");
          editor.updateEditorContent(ed);
        });
        ed.on("paste", function(e) {
          console.log("paste");
          editor.updateEditorContent(ed);
        });
        ed.on("cut", function(e) {
          console.log("cut");
          editor.updateEditorContent(ed);
        });
      }
    });
  },
  updateEditorContent: function(ed) {
    $("#editor").html(ed.getContent());
    tabs.saveTab();
  },
  isHtml: function(str) {
    var a = document.createElement("div");
    a.innerHTML = str;
    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }
    return false;
  },
  keyEvents: function(area) {
    jQuery(area).keydown(function(e) {
      if (e.keyCode == 83 && e.ctrlKey) {
        event.preventDefault();
        editor.saveFile();
      }
    });
  },
  textareaEvents: function(area) {
    jQuery(area).keydown(function(e) {
      if (e.keyCode == 27) {
        window.close();
      }
      if (e.keyCode === 9 && !window.event.ctrlKey) {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var value = jQuery(this).val();
        var isShift = !!window.event.shiftKey;

        if (
          isShift &&
          value.substring(start, start + 1) != "\t" &&
          value.substring(start - 1, start) == "\t"
        ) {
          start -= 1;
        }
        var rows = value.substring(start, end).split("\n");
        var tmp = "";
        var i = 0;
        if (isShift) {
          for (i; i < rows.length; i++) {
            if (rows[i].substring(0, 1) == "\t") {
              tmp += rows[i].substring(1);
            } else {
              tmp += rows[i];
            }
            if (i < rows.length - 1) {
              tmp += "\n";
            }
          }
        } else {
          for (i; i < rows.length; i++) {
            tmp += "\t" + rows[i];
            if (i < rows.length - 1) {
              tmp += "\n";
            }
          }
        }
        jQuery(this).val(
          value.substring(0, start) + tmp + value.substring(end, value.length)
        );
        if (start != end) {
          this.selectionStart = start;
          this.selectionEnd = end + rows.length * (isShift ? -1 : 1);
        } else {
          this.selectionStart = end + rows.length * (isShift ? -1 : 1);
          this.selectionEnd = this.selectionStart;
        }
        e.preventDefault();
      } else if (window.event.ctrlKey && e.keyCode === 90) {
        document.execCommand("undo", false, null);
      } else if (window.event.ctrlKey && e.keyCode === 89) {
        document.execCommand("redo", false, null);
      }
    });
  },
  saveFile: function() {
    $("#prompt").addClass("active");
    $("#prompt #fileName")
      .val($("nav .tab.active").val() + ".txt")
      .focus()
      .select();
    $("#prompt #fileSave").click(function() {
      editor.makeTextFile();
      $("#prompt").removeClass("active");
    });
    $("#prompt #fileCancle").click(function() {
      $("#prompt").removeClass("active");
    });
  },
  makeTextFile: function() {
    var link = document.createElement("a");
    link.download = $("#prompt #fileName").val();
    if (link.download == "") link.download = "document.txt";
    link.href = "data:text/plain," + data.textEncode($("#editor").val());
    link.click();
  }
};

$(document).ready(function() {
  editor.init();
});
