async function loadNavbar() {
    const res = await fetch("/basic_frontend/pages/common/navbar.html");
    const html = await res.text();
    document.getElementById("navbarContainer").innerHTML = html;
    updateCartCount();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (token) {
        document.getElementById("auth-links").classList.add("d-none");
        document.getElementById("logout-link").classList.remove("d-none");
        document.getElementById("user-role-display").innerText = `${username} (${role})`;
    }

    // Ẩn hiện theo role
    if (role === "ROLE_READER") {
        document.querySelectorAll(".admin-only").forEach(e => e.style.display = "none");
        document.querySelectorAll(".reader-only").forEach(e => e.style.display = "block");
    } else if (role === "ROLE_ADMIN") {
        document.querySelectorAll(".reader-only").forEach(e => e.style.display = "none");
        document.querySelectorAll(".admin-only").forEach(e => e.style.display = "block");
    } else {
        // Chưa login hoặc role không hợp lệ
        document.querySelectorAll(".reader-only, .admin-only").forEach(e => e.style.display = "none");
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const badge = document.getElementById("cartCount");
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? "inline-block" : "none";
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    window.location.href = "/basic_frontend/pages/index.html";
}

loadNavbar();