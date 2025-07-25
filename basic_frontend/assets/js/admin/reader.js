const token = localStorage.getItem("token");

// Load danh sách độc giả
async function loadReaders() {
    try {
        const res = await fetch(`${API}/readers`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const readers = await res.json();
        displayReaders(readers);
    } catch (err) {
        console.error("Lỗi khi tải danh sách độc giả:", err);
    }
}

// Hiển thị danh sách độc giả ra bảng HTML
function displayReaders(readers) {
    const table = document.getElementById("readerTableBody");
    table.innerHTML = "";
    readers.forEach(reader => {
        const row = `
            <tr onclick="window.location.href='/pages/reader/profile.html?id=${reader.id}'" style="cursor: pointer;">
                <td>${reader.id}</td>
                <td>${reader.username}</td>
                <td>${reader.email}</td>
                <td>${reader.birthday}</td>
                <td>${reader.phone}</td>
                <td>${reader.address}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// filter
document.getElementById("nameFilterInput").addEventListener("input", function() {
    const keyword = this.value.toLowerCase();
    const rows = document.querySelectorAll("#readerTableBody tr");

    rows.forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        row.style.display = name.includes(keyword) ? "" : "none";
    });
});

loadReaders();