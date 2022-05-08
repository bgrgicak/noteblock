// External dependencies
import $ from "jquery";

// Internal dependencies
import data from "./data.js";
import tabs from "./tabs.js";
// import resize from "./resize.js";

var editor = {
  editor: null,
  init: function () {
    if (!localStorage.data) {
      localStorage.data = {};
    }
    editor.editor = $("#editor");

    this.textareaEvents("#editor");
    this.keyEvents("body");
    tabs.addTabs();
    editor.editor.bind("change keyup paste", function () {
      tabs.saveTab();
    });
    editor.editor.scrollTop(data.getData("scrollTop"));
    editor.editor.scroll(function () {
      data.saveData("scrollTop", $(this).scrollTop());
    });
    $(".ui-resizable-sw").addClass("ui-icon ui-icon-gripsmall-diagonal-sw");
    $("#doEmail").click(function () {
      window.open(
        "mailto:?subject=&body=" + data.textEncode(editor.editor.val()),
        "_blank"
      );
    });
    $("#doSave").click(function () {
      editor.saveFile();
    });
    $("#doDelete").click(function () {
      tabs.tabDelete();
    });
    $("#add").click(function () {
      tabs.createTab();
    });

    // resize.init(editor.editor, document.getElementById("resize"));
  },
  keyEvents: function (area) {
    $(area).keydown(function (e) {
      if (e.keyCode === 83 && e.ctrlKey) {
        event.preventDefault();
        editor.saveFile();
      }
    });
  },
  textareaEvents: function (area) {
    $(area).keydown(function (e) {
      if (e.keyCode === 27) {
        window.close();
      }
      if (e.keyCode === 9 && !window.event.ctrlKey) {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var value = $(this).val();
        var isShift = !!window.event.shiftKey;

        if (
          isShift &&
          value.substring(start, start + 1) !== "\t" &&
          value.substring(start - 1, start) === "\t"
        ) {
          start -= 1;
        }
        var rows = value.substring(start, end).split("\n");
        var tmp = "";
        var i = 0;
        if (isShift) {
          for (i; i < rows.length; i++) {
            if (rows[i].substring(0, 1) === "\t") {
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
        $(this).val(
          value.substring(0, start) + tmp + value.substring(end, value.length)
        );
        if (start !== end) {
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
  saveFile: function () {
    $("#prompt").addClass("active");
    $("#prompt #fileName")
      .val($("nav .tab.active").val() + ".txt")
      .focus()
      .select();
    $("#prompt #fileSave").click(function () {
      editor.makeTextFile();
      $("#prompt").removeClass("active");
    });
    $("#prompt #fileCancle").click(function () {
      $("#prompt").removeClass("active");
    });
  },
  makeTextFile: function () {
    var link = document.createElement("a");
    link.download = $("#prompt #fileName").val();
    if (link.download === "") link.download = "document.txt";
    link.href = "data:text/plain," + data.textEncode(editor.editor.val());
    link.click();
  },
};

$(document).ready(function () {
  editor.init();
});
