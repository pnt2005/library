const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");
const token = localStorage.getItem("token");

if (!bookId) {
    alert("Không tìm thấy sách");
    window.location.href = "/pages/index.html";
}

const form = document.getElementById("editForm");

async function loadBookData() {
    try {
        const res = await fetch(`${API}/books/${bookId}`);
        if (!res.ok) throw new Error("Không tìm thấy sách");
        const book = await res.json();
        document.getElementById("name").value = book.name;
        document.getElementById("author").value = book.author;
        document.getElementById("description").value = book.description;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("publisher").value = book.publisher;
        document.getElementById("category").value = book.category;
        document.getElementById("year").value = book.year;
        document.getElementById("image").value = book.image;
    }
    catch(err) {
        alert("Lỗi khi tải dữ liệu sách");
        console.error(err);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedBook = {
        name: document.getElementById("name").value.trim(),
        author: document.getElementById("author").value.trim(),
        description: document.getElementById("description").value.trim(),
        isbn: document.getElementById("isbn").value.trim(),
        publisher: document.getElementById("publisher").value.trim(),
        category: document.getElementById("category").value.trim(),
        year: parseInt(document.getElementById("year").value),
        image: document.getElementById("image").value.trim(),
        quantity: parseInt(document.getElementById("quantity").value)
    }

    try {
        const res = await fetch(`${API}/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(updatedBook)
        });

        if (res.ok) {
            alert("Cập nhật sách thành công");
            window.location.href = `book-detail.html?id=${bookId}`;
        }
        else alert("Lỗi khi cập nhật sách");
    }
    catch(err) {
        alert("Không thể kết nối đến máy chủ");
        console.error(err);
    }
});

loadBookData();