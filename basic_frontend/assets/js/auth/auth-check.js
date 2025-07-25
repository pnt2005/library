function authCheck() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/pages/auth/login.html";
        return;
    }
}

authCheck();