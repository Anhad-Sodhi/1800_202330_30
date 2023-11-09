document.getElementById("email").addEventListener("click", 
    function() {
        window.location.href = "mailto:" + document.getElementById("email").innerText;
});