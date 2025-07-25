const token = localStorage.getItem("token");
const params = new URLSearchParams(window.location.search);
let userId = params.get("id");
if (!userId) {
    userId = localStorage.getItem("userId");
}

async function loadProfile() {
    try {
        const res = await fetch(`${API}/readers/${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        if (!res.ok) throw new Error("Không thể tải thông tin người dùng");
        const data = await res.json();

        document.getElementById("username").textContent = data.username;
        document.getElementById("email").textContent = data.email;
        document.getElementById("phoneNumber").textContent = data.phoneNumber;
        document.getElementById("address").textContent = data.address;
        document.getElementById("birthday").textContent = data.birthday;
    } 
    catch (error) {
        console.error("Lỗi khi tải thông tin:", error);
        alert("Không thể tải thông tin cá nhân.");
    }
}

document.getElementById("editBtn").addEventListener("click", () => {
    window.location.href = `/pages/reader/edit-profile.html?id=${userId}`;
});

loadProfile();