const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const bookList = document.getElementById("bookList");

function displayBooks(books) {
    bookList.innerHTML = "";
    if (books.length === 0) {
        bookList.innerHTML = `
            <tr>
                <td colspan="2" class="text-center text-muted">Không tìm thấy sách</td>
            </tr>
        `;
        return;
    }
    books.forEach(book => {
        const card = `
            <div class="col">
                <a href=/basic_frontend/pages/book/book-detail.html?id=${book.id} class="text-decoration-none text-dark">
                    <div class="card h-100 shadow-sm hover-shadow" style="cursor: pointer;">
                        <img src="${book.image}" class="card-img-top" alt="${book.name}" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${book.name}</h5>
                            <p class="card-text"><strong>Tác giả:</strong> ${book.author}</p>
                            <p class="card-text"><strong>Thể loại:</strong> ${book.category}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
        bookList.innerHTML += card;
    });
}

async function searchBooks(keyword) {
    const res = await fetch(`${API}/books?name=${encodeURIComponent(keyword)}`);
    if (!res.ok) throw new Error("Lỗi khi gọi API");
    const data = await res.json();
    displayBooks(data);
}

async function filter() {
    const params = new URLSearchParams();

    const author = document.getElementById("authorFilter").value;
    if (author) params.append("author", author);

    const description = document.getElementById("descriptionFilter").value;
    if (description) params.append("description", description);

    const isbn = document.getElementById("isbnFilter").value;
    if (isbn) params.append("isbn", isbn);

    const publisher = document.getElementById("publisherFilter").value;
    if (publisher) params.append("publisher", publisher);

    const category = document.getElementById("categoryFilter").value;
    if (category) params.append("category", category);

    const year = document.getElementById("yearFilter").value;
    if (year) params.append("year", year);

    const quantity = document.getElementById("quantityFilter").value;
    if (quantity) params.append("quantity", quantity);

    try {
        const res = await fetch(`${API}/books?${params.toString()}`);
        if (!res.ok) throw new Error("Lỗi tải dữ liệu");
        if (res.status === 204) {
            container.innerHTML = `
                <tr>
                    <td colspan="2" class="text-center text-muted">Không tìm thấy sách</td>
                </tr>
            `;
            return;
        }
        const data = await res.json();
        displayBooks(data);
    }
    catch(err) {
        console.error(err);
    }
}


(async () => {
    try {
        const res = await fetch(`${API}/books`)
        const data = await res.json();
        displayBooks(data);
    }
    catch(err) {
        console.error(err);
    }

})();