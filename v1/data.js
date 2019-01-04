var data = {
  getData: function(cname, callback) {
    /*chrome.storage.sync.get(cname, function(items) {
      if (!chrome.runtime.error) {
        callback(decodeURIComponent(items[cname]));
      } else {
        callback("");
      }
    });*/

    if (localStorage.getItem(cname)) {
      callback(decodeURIComponent(localStorage.getItem(cname)));
    } else {
      callback("");
    }
  },
  deleteData: function(cname) {
    localStorage.removeItem(cname);
    chrome.storage.sync.remove(cname);
  },
  saveData: function(cname, value) {
    localStorage.setItem(cname, value);
    var data = {};
    data[cname] = decodeURIComponent(value);
    console.log(data);
    chrome.storage.sync.set(data, function() {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  },
  textEncode: function(data) {
    return encodeURIComponent(
      data
        .replace(/\\n/g, "\\r\\n")
        .replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f")
    );
  }
};
