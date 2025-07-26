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
                    <p><strong>Sách:</strong></p>
                    <ul>
                        ${receipt.borrowReceiptBooks.map((borrowReceiptBook, index) => `
                            <li>
                                <a href="/basic_frontend/pages/book/book-detail.html?id=${borrowReceiptBook.book.id}" class="text-body text-decoration-none">
                                    ${index+1}. ${borrowReceiptBook.book.name} - ${borrowReceiptBook.book.author} - ${borrowReceiptBook.quantity}
                                </a>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

//filter
document.getElementById("filterButton").addEventListener("click", async () => {
    const params = new URLSearchParams();

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
        const res = await fetch(`${API}/borrow-receipts?readerId=${userId}`, {
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