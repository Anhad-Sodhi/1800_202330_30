document.getElementById("email").addEventListener("click", 
    function() {
        window.location.href = "mailto:" + document.getElementById("email").innerText;
});

document.getElementById("copyButton").addEventListener("click", 
    function() {
        let text = document.getElementById("email").innerText;
        navigator.clipboard.writeText(text);
});