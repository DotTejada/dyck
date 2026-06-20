function loadPage(page) {
    const container = document.getElementById("container")
    if (page == "1") {
        container.innerHTML = "<canvas id='canvas'></canvas>"
        draw()
    } else if (page == "2") {
        container.innerHTML = "<p>Hello World</p>"
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight") {
        loadPage("2")
    } else if (event.key === "ArrowLeft") {
        loadPage("1")
    }
});
