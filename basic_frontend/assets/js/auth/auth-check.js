function authCheck() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/basic_frontend/pages/auth/login.html";
        return;
    }
}

authCheck();