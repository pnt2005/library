document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        birthday: document.getElementById("birthday").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        address: document.getElementById("address").value,
        role: "ROLE_READER"
    };

    try {
        const response = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Đăng ký thành công");
            window.location.href = "/basic_frontend/pages/auth/login.html";
        }
        else {
            const msg = await response.text();
            throw new Error(msg || "Đăng ký thất bại");
        }
    }
    catch(error) {
        alert(error.message);
    }
})