const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const container = document.getElementById("historyContainer");

async function loadBorrowHistory(data) {
    let html = "";
    data.forEach(receipt => {
        html += `
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between">
                    <span class="badge 
                        ${receipt.status === 'ACCEPTED' ? 'bg-success' : 
                        receipt.status === 'REJECTED' ? 'bg-danger' : 
                        receipt.status === 'RETURNED' ? 'bg-primary' :
                        receipt.status === 'OVERDUE' ? 'bg-danger' :
                        'bg-warning text-dark'}">
                        ${
                            receipt.status === 'ACCEPTED' ? 'Đã duyệt' :
                            receipt.status === 'REJECTED' ? 'Đã từ chối' :
                            receipt.status === 'RETURNED' ? 'Đã trả' :
                            receipt.status === 'OVERDUE' ? 'Quá hạn' :
                            'Chờ duyệt'
                        }
                    </span>
                </div>
                <div class="card-body">
                    <p><strong>Ngày tạo:</strong> ${receipt.createDate ? receipt.createDate : '<em class="text-muted">Chưa có</em>'}</p>
                    <p><strong>Ngày mượn:</strong> ${receipt.borrowDate ? receipt.borrowDate : '<em class="text-muted">Chưa có</em>'}</p>
                    <p><strong>Ngày trả:</strong> ${receipt.returnDate ? receipt.returnDate : '<em class="text-muted">Chưa có</em>'}</p>
                    <p>
                        <strong>Độc giả:</strong> 
                        <a href="/pages/reader/profile.html?id=${receipt.reader.id}" class="text-body text-decoration-none">
                            ${receipt.reader.username}
                        </a>
                    </p>
                    <p><strong>Sách:</strong></p>
                    <ul>
                        ${receipt.borrowReceiptBooks.map((borrowReceiptBook, index) => `
                            <li>
                                <a href="/pages/book/book-detail.html?id=${borrowReceiptBook.book.id}" class="text-body text-decoration-none">
                                    ${index+1}. ${borrowReceiptBook.book.name} - ${borrowReceiptBook.book.author} - ${borrowReceiptBook.quantity}
                                </a>
                            </li>
                        `).join("")}
                    </ul>
                </div>
                ${receipt.status === 'PENDING' ? `
                    <div class="card-footer d-flex justify-content-end gap-2">
                        <button class="btn btn-success btn-sm" onclick="approveReceipt(${receipt.id})">Chấp nhận</button>
                        <button class="btn btn-danger btn-sm" onclick="rejectReceipt(${receipt.id})">Từ chối</button>
                    </div>
                ` : ''}
            </div>
        `;
    });
    container.innerHTML = html;
}

async function approveReceipt(id) {
    try {
        const res = await fetch(`${API}/borrow-receipts/${id}/accept`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error(await res.text())
        }

        alert("Phiếu mượn đã được duyệt");
        loadBorrowHistory();
    }
    catch(err) {
        console.error(err);
        alert("Duyệt phiếu thất bại");
    }
}

async function rejectReceipt(id) {
    try {
        const res = await fetch(`${API}/borrow-receipts/${id}/reject`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error(await res.text())
        }

        alert("Đã từ chối phiếu mượn");
        loadBorrowHistory();
    }
    catch(err) {
        console.error(err);
        alert("Từ chối phiếu thất bại");
    }
}

//filter
document.getElementById("filterButton").addEventListener("click", async () => {
    const params = new URLSearchParams();

    const reader = document.getElementById("readerFilter").value;
    if (reader) params.append("readerName", reader);

    const book = document.getElementById("bookFilter").value;
    if (book) params.append("bookName", book);

    const status = document.getElementById("statusFilter").value;
    if (status) params.append("status", status);

    const createDate = document.getElementById("createDateFilter").value;
    if (createDate) params.append("createDate", createDate);

    const borrowDate = document.getElementById("borrowDateFilter").value;
    if (borrowDate) params.append("borrowDate", borrowDate);

    const returnDate = document.getElementById("returnDateFilter").value;
    if (returnDate) params.append("returnDate", returnDate);
    
    try {
        const res = await fetch(`${API}/borrow-receipts?${params.toString()}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) throw new Error("Lỗi tải dữ liệu");
        if (res.status === 204) {
            container.innerHTML = '<p class="text-muted">Không có phiếu mượn</p>'
            return;
        }

        const data = await res.json();
        loadBorrowHistory(data);
    }
    catch(err) {
        console.error(err);
    }
});

(async () => {
    try {
        const res = await fetch(`${API}/borrow-receipts`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (res.status === 204) {
            container.innerHTML = '<p class="text-muted">Không có phiếu mượn</p>'
            return;
        }

        const data = await res.json();
        loadBorrowHistory(data);
    }
    catch(err) {
        console.error(err);
        container.innerHTML = '<p class="text-danger">Không thể tải lịch sử mượn</p>';
    }
})();
