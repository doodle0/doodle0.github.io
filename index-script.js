function redirect(e) {
    location.href = "/main"
}

window.onload = (e) => {
    document.getElementById("btn-to-blog").onclick = (e) => {
        document.body.className += 'clicked';
        setTimeout((e) => {location.href = "/main"}, 1000);
    }
    document.getElementById("btn-to-links").onclick = (e) => {
        document.body.className += 'clicked';
        setTimeout((e) => {location.href = "/links"}, 1000);
    }
}
