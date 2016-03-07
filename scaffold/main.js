var iframe;
window.addEventListener("load", function() {
    iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.src = "scenes/scene1";

    console.log("sending message");
    iframe.onload = function() {
        iframe.contentWindow.postMessage("Hi, scene!", "http://localhost:8000");
    }
    function receiveMessage(event) {
        console.log("inside router");
        console.log(event);
    }
    window.addEventListener("onmessage", receiveMessage, false);
    window.addEventListener("message", receiveMessage, false);
});
