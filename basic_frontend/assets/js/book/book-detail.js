const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");
let currentBook = null;
const adminButtons = document.getElementById("adminButtons");
const userRole = localStorage.getItem("role");
const token = localStorage.getItem("token");

if (userRole === "ROLE_ADMIN") {
    adminButtons.style.display = "inline-block";
}

async function loadBookDetail() {
    if (!bookId) {
        document.getElementById("bookDetail").innerHTML = 
            "<p class='text-danger'>Không tìm thấy sách</p";
        return;
    }
    try {
        const res = await fetch(`${API}/books/${bookId}`);
        if (!res.ok) throw new Error("Không tìm thấy sách");
        const book = await res.json();
        currentBook = book;
        document.getElementById("bookName").textContent = book.name;
        document.getElementById("bookDetail").innerHTML = `
            <img src="${book.image}" alt="${book.name}" width="100">
            <p>tác giả: ${book.author}</p>
            <p>mô tả: ${book.description}</p>
            <p>ISBN: ${book.isbn}</p>
            <p>Nhà xuất bản: ${book.publisher}</p>
            <p>Thể loại: ${book.category}</p>
            <p>Năm xuất bản: ${book.year}</p>
            <p>Số lượng hiện có: ${book.quantity}</p>
            <div class="mt-3">
                <label for="borrowQuantity"><strong>Số lượng muốn mượn:</strong></label>
                <input type="number" id="borrowQuantity" class="form-control" min="1" max="${book.quantity}" value="1" style="width: 120px;">
            </div>
        `;
    } 
    catch(err) {
        console.error(err);
        document.getElementById("bookDetail").innerHTML =
            "<p class='text-danger>lỗi khi tải chi tiết sách></p>";
    }
}

//add to cart
document.getElementById("addToCartBtn").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    //check if exists in cart
    const exists = cart.find(item => item.id === currentBook.id);
    if (exists) {
        alert("Sách đã có trong giỏ mượn");
        return;
    }
    cart.push({
        id: currentBook.id,
        name: currentBook.name,
        author: currentBook.author,
        maxQuantity: currentBook.quantity,
        quantity: document.getElementById("borrowQuantity").value
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ mượn");
    loadNavbar();
});

//edit button
document.getElementById("editBtn").addEventListener("click", () => {
    window.location.href = `edit-book.html?id=${bookId}`;
})

//delete button
document.getElementById("deleteBtn").addEventListener("click", async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa sách này?")) return;
    try {
        const res = await fetch(`${API}/books/${bookId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        if (res.ok) {
            alert("Đã xóa sách");
            window.location.href = "/pages/index.html";
        }
        else {
            alert("Lỗi khi xóa sách");
        }
    }
    catch (err) {
        alert("Không thể kết nối đến máy chủ");
    }
});

loadBookDetail();