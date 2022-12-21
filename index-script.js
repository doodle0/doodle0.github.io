function redirect(e) {
    location.href = "/main"
}

document.getElementById("intro-btn").onclick = (e) => {
    document.body.className += 'clicked';
    setInterval(redirect, 1000);
}