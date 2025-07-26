const token = localStorage.getItem("token");
const params = new URLSearchParams(window.location.search);
let userId = params.get("id");
if (!userId) {
    userId = localStorage.getItem("userId");
}

// Tải dữ liệu ban đầu
async function loadReader() {
    try {
        const res = await fetch(`${API}/readers/${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const data = await res.json();
        document.getElementById("username").value = data.username;
        document.getElementById("email").value = data.email;
        document.getElementById("phoneNumber").value = data.phoneNumber;
        document.getElementById("address").value = data.address;
        document.getElementById("birthday").value = data.birthday;
    } catch (err) {
        console.error("Lỗi khi tải thông tin:", err);
        alert("Không thể tải dữ liệu người dùng.");
    }
}

// Gửi dữ liệu chỉnh sửa
document.getElementById("editForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const body = {
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        address: document.getElementById("address").value,
        birthday: document.getElementById("birthday").value
    };

    try {
        const res = await fetch(`${API}/readers/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            alert("Cập nhật thành công!");
            window.location.href = `/basic_frontend/pages/reader/profile.html?id=${userId}`;
        } else {
            const error = await res.json();
            alert("Lỗi: " + (error.message || "Cập nhật thất bại"));
        }
    } catch (err) {
        console.error("Lỗi khi cập nhật:", err);
        alert("Không thể gửi dữ liệu.");
    }
});

//Hủy
document.getElementById("cancelBtn").addEventListener("click", () => {
    window.location.href = `/basic_frontend/pages/reader/profile.html?id=${userId}`;
});

loadReader();
