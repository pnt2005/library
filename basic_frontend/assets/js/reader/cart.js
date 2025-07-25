function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cartContainer");

    if (cart.length === 0) {
        container.innerHTML = `
            <p class="text-muted">Giỏ mượn trống</p>
        `;
        return;
    }

    let html = `
        <table class="table table-borderd table-striped">
        <thead>
            <tr>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Số lượng</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    `;

    for (const book of cart) {
        html += `
            <tr>
                <td onclick="window.location.href='/pages/book/book-detail.html?id=${book.id}'" style="cursor: pointer;">
                    ${book.name}
                </td>
                <td>${book.author}</td>
                <td>
                    <input type="number" 
                            id="borrowQuantity" 
                            class="form-control" 
                            min="1" 
                            max="${book.maxQuantity}"
                            value="${book.quantity}"
                            style="width: 120px;"
                            onchange="updateQuantity(${book.id}, this.value)">
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${book.id})">Xóa</button>
                </td>
            </tr>
        `;
    }

    html += `
        </tbody>
        </table>
    `;
    container.innerHTML = html;
}

function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(b => b.id !== bookId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateQuantity(bookId, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (let book of cart) {
        if (book.id === bookId) {
            book.quantity = quantity;
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

//xóa toàn bộ
document.getElementById("clearCartBtn").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ mượn trống");
        return;
    }
    if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ")) {
        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
    }
});

//xác nhận mượn
document.getElementById("borrowBtn").addEventListener("click", async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ mượn trống");
        return;
    }

    const confirmBorrow = confirm("Bạn có chắc muốn gửi yêu cầu mượn sách");
    if (!confirmBorrow) return;

    const payload = {
        readerId: localStorage.getItem("userId"),
        books: cart.map(book => ({
            bookId: book.id,
            quantity: book.quantity
        }))
    };
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API}/borrow-receipts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Lỗi gửi yêu cầu mượn");
        alert("Gửi yêu cầu mượn thành công");
        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
    } catch(err) {
        console.error(err);
        alert("Gửi yêu cầu mượn thất bại");
    }
});

renderCart();