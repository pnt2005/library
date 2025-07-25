const token = localStorage.getItem("token");
const form = document.getElementById("bookForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const book = {
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
        const res = await fetch(`${API}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(book)
        });

        if (res.ok) {
            alert("Thêm sách thành công");
            const newBook = await res.json();
            window.location.href = `/pages/book/book-detail.html?id=${newBook.id}`;
        }
        else alert("Lỗi khi thêm sách");
    }
    catch(err) {
        alert("Không thể kết nối đến máy chủ");
        console.error(err);
    }
});