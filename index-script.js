function redirect(e) {
    location.href = "/main"
}

window.onload = (e) => {
    document.getElementById("intro-btn").onclick = (e) => {
        document.body.className += 'clicked';
        setInterval(redirect, 1000);
    }
}
