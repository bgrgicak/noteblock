import data from "./data.js";

const resize = {
  resizeButton: null,
  resizeElement: null,
  startPosition: false,
  maxWidth: 800,
  maxHeight: 510,
  minWidth: 220,
  minHeight: 200,
  resizing: false,

  init: function (resizeElement, resizeButton) {
    // Consts
    resize.resizeElement = resizeElement;
    resize.resizeButton = resizeButton;

    var doc = document,
      ht = 400,
      wd = 400,
      main = document.querySelector("main"),
      x,
      y,
      dx,
      dy;

    var startResize = function (evt) {
      x = evt.screenX;
      y = evt.screenY;
    };

    var resize = function (evt) {
      dx = evt.screenX - x;
      dy = evt.screenY - y;
      x = evt.screenX;
      y = evt.screenY;
      wd += dx;
      ht -= dy;
      main.style.width = wd + "px";
      main.style.height = ht + "px";
    };

    rsz.addEventListener("mousedown", function (evt) {
      startResize(evt);
      doc.body.addEventListener("mousemove", resize);
      doc.body.addEventListener("mouseup", function () {
        doc.body.removeEventListener("mousemove", resize);
      });
    });

    // Events
    // resizeButton.onmousedown = resize.start;
    // window.onmousemove = resize.move;
    // window.onmouseup = resize.stop;

    // // Set initial size
    // resize.setSize(resize.getSize());
  },
  start: function (e) {
    resize.startPosition = resize.getPosition(e);
  },
  move: function (e) {
    if (false === resize.startPosition) {
      return;
    }

    if (resize.resizing) {
      return;
    }

    resize.resizing = true;
    resize.setSize(resize.calculateSize(resize.getPosition(e)));
    resize.resizing = false;
  },
  stop: function (e) {
    resize.startPosition = false;
  },
  getPosition: function (e) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  },

  calculateSize: function (currentPosition) {
    console.log(currentPosition);
    const change = {
      x: resize.startPosition.x - currentPosition.x,
      y: resize.startPosition.y - currentPosition.y,
    };
    console.log(change);
    const currentSize = resize.getSize();
    console.log(currentSize);
    const newSize = {
      width: currentSize.width + change.x,
      height: currentSize.height + change.y,
    };

    // Ensure size is within bounds
    if (newSize.width > resize.maxWidth) {
      newSize.width = resize.maxWidth;
    } else if (newSize.width < resize.minWidth) {
      newSize.width = resize.minWidth;
    }
    if (newSize.height > resize.maxHeight) {
      newSize.height = resize.maxHeight;
    } else if (newSize.height < resize.minHeight) {
      newSize.height = resize.minHeight;
    }

    console.log(newSize);
    return newSize;
  },
  getSize: function () {
    return {
      width: parseInt(data.getData("editorWidth") || resize.minWidth),
      height: parseInt(data.getData("editorHeight") || resize.minHeight),
    };
  },
  setSize: function (size) {
    resize.resizeElement.css("width", size.width + "px");
    resize.resizeElement.css("height", size.height + "px");
    data.saveData("editorWidth", size.width);
    data.saveData("editorHeight", size.height);
  },
};

export default resize;
