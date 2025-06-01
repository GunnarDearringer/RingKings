
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Message sent! We'll get back to you soon.");
    });
});
