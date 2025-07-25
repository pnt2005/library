document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
   
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
   };
   try {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const data = await response.json();
            window.location.href = `/pages/index.html`;
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("username", data.username);
            localStorage.setItem("userId", data.userId);
        }
        else {
            const msg = await response.text();
            throw new Error(msg || "Đăng nhập thất bại");
        }
    }
    catch(error) {
        alert(error.message);
    }
});