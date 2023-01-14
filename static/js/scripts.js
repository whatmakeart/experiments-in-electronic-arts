// should get the url of the page the iframe is embedded in even with different origins but doesn't seem to work
const currentURL = document.baseURI;

console.log(currentURL);

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  removeNavigationEmbed();
  sendIframeHeight();
});

window.addEventListener("load", function (evt) {
  /* do task 1 */ console.log("page is fully loaded");

  checkIfMobile();

  // This will be repeated 15 times with .01 second intervals:
  setIntervalX(
    function () {
      sendIframeHeight();
    },
    10,
    15
  );

  // monitor self-initiated changes in size
  var mo = new MutationObserver(function () {
    sendIframeHeight();
    console.log("mutation detected");
  });
  mo.observe(document, { subtree: true, childList: true, characterData: true });
});

// For sending iframe height multiple times and then stopping on first page load
// Possibly could be fixed with proper Canvas Listening for a loaded postMessage
function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {
    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
}

// sends postMessage to top / opener / parent page with hight information
function sendIframeHeight() {
  if (window.top != null && typeof window.top != "undefined") {
    console.log("This window is the top");
    window.top.postMessage(
      JSON.stringify({
        subject: "lti.frameResize",
        height: document.documentElement.scrollHeight + "px",
      }),
      "https://cia.instructure.com/"
    );
    console.log(
      "iframe scrollHeight: " + document.documentElement.scrollHeight + "px"
    );
  } else if (window.opener != null && typeof window.opener != "undefined") {
    console.log("This window is pop up.");
    window.opener.postMessage(
      JSON.stringify({
        subject: "lti.frameResize",
        height: document.documentElement.scrollHeight + "px",
      }),
      "https://cia.instructure.com/"
    );
    console.log(
      "iframe scrollHeight: " + document.documentElement.scrollHeight + "px"
    );
  } else if (window.parent != null && typeof window.parent != "undefined") {
    console.log("This window is the parent");
    window.parent.postMessage(
      JSON.stringify({
        subject: "lti.frameResize",
        height: document.documentElement.scrollHeight + "px",
      }),
      "https://cia.instructure.com/"
    );
    console.log(
      "iframe scrollHeight: " + document.documentElement.scrollHeight + "px"
    );
  } else {
    console.log("This window is not a pop up, top or parent");
  }
}

// removes navigation elements when embedded in an LMS so only the page content is seen but allows course site to work on open web
function removeNavigationEmbed() {
  if (self != top) {
    // make links open in _blank if page is an embeded iframe
    let baseToAdd = document.createElement("base");
    baseToAdd.target = "_top";
    document.head.appendChild(baseToAdd);

    document.getElementById("header").remove();
    document.getElementById("footer").remove();
    console.log("Removed iframe #header and #footer");

    document.body.style.overflow = "hidden"; // to remove iframe scrollbars on desktop browsers
  }
  if (self === top) {
    console.log("Top level website so keep navigation");
  }
}

// send new iframe height postMessage if window is resized
var resizeTimer;

window.onresize = function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    console.log("Window Resized");
    console.log(
      "New iframe scrollHeight: " + document.documentElement.scrollHeight + "px"
    );
    sendIframeHeight();
    window.top.postMessage({ subject: "lti.fetchWindowSize" }, "*"); // requests height of Canvas screen window
  }, 100);
};

function checkIfMobile() {
  const isMobile = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile === true) {
    console.log("Browser is mobile");
    document.body.style.overflow = "visible";
  } else {
    console.log("Browser is not mobile");
  }
}

// Listen for postMessages from iframe and Canvas

/*
        // Set theme to the user's preferred color scheme dark or light mode
        function updateTheme() {
            const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            document.querySelector("html").setAttribute("data-bs-theme", colorMode);
        }
    
        // Set theme on load
        updateTheme()
    
        // Update theme when the preferred scheme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
    */
