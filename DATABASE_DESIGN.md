# Database Design

## 🗃️ Database Type
Relational Database Management System: **MySQL**.  

---

## 📊 Entity-Relationship Diagram (ERD)  
<img width="811" height="803" alt="image" src="https://github.com/user-attachments/assets/abfee2cc-f222-4759-a3fc-38efd30decb1" />

---

## 📋 Tables & Description  

### 1. **User**  
Stores authentication and role information for all system users.  

| Column   | Type    | Description                           |
|----------|---------|---------------------------------------|
| id       | PK, int | Unique identifier for the user        |
| username | varchar | Login username                        |
| password | varchar | Encrypted password                    |
| role     | varchar | Role of the user (`ADMIN`, `READER`)  |

---

### 2. **Admin**  
Represents bookstore owners or system administrators.  

| Column | Type    | Description           |
|--------|---------|-----------------------|
| id     | PK, int | References `user.id`  |

---

### 3. **Reader**  
Represents customers (library members).  

| Column       | Type    | Description                |
|--------------|---------|----------------------------|
| id           | PK, int | References `user.id`       |
| address      | varchar | Home address               |
| birthday     | date    | Date of birth              |
| email        | varchar | Contact email              |
| phone_number | varchar | Contact phone number       |

---

### 4. **Book**  
Stores book information.  

| Column         | Type    | Description                        |
|----------------|---------|------------------------------------|
| id             | PK, int | Unique identifier for the book     |
| name           | varchar | Book title                         |
| author         | varchar | Author                             |
| publisher      | varchar | Publisher                          |
| isbn           | varchar | International Standard Book Number |
| category       | varchar | Book category                      |
| description    | text    | Description or summary             |
| image          | varchar | Cover image URL                    |
| year           | int     | Year of publication                |
| borrow_price   | decimal | Price for borrowing                |
| purchase_price | decimal | Price for purchasing               |
| quantity       | int     | Number of available copies         |

---

### 5. **Borrow_Receipt**  
Stores borrowing transactions made by readers.  

| Column      | Type    | Description                           |
|-------------|---------|---------------------------------------|
| id          | PK, int | Unique identifier for borrow receipt  |
| borrow_date | date    | Date when the book(s) was borrowed    |
| return_date | date    | Expected return date                  |
| status      | varchar | Borrow status (`BORROWED`, `RETURNED`)|
| total_price | decimal | Total borrowing cost                  |
| reader_id   | FK, int | References `reader.id`                |

---

### 6. **Borrow_Receipt_Book**  
Mapping table for books in a borrow receipt (many-to-many relationship).  

| Column            | Type    | Description                     |
|-------------------|---------|---------------------------------|
| id                | PK, int | Unique identifier               |
| borrow_receipt_id | FK, int | References `borrow_receipt.id`  |
| book_id           | FK, int | References `book.id`            |
| price             | decimal | Borrow price of the book        |
| quantity          | int     | Number of borrowed copies       |

---

### 7. **Purchase_Receipt**  
Stores purchase transactions.  

| Column     | Type    | Description                            |
|------------|---------|----------------------------------------|
| id         | PK, int | Unique identifier for purchase receipt |
| create_date| date    | Date of purchase                       |
| status     | varchar | Purchase status (`PAID`, `PENDING`)    |
| total_price| decimal | Total purchase amount                  |
| reader_id  | FK, int | References `reader.id`                 |

---

### 8. **Purchase_Receipt_Book**  
Mapping table for books in a purchase receipt.  

| Column              | Type    | Description                        |
|---------------------|---------|------------------------------------|
| id                  | PK, int | Unique identifier                  |
| purchase_receipt_id | FK, int | References `purchase_receipt.id`   |
| book_id             | FK, int | References `book.id`               |
| price               | decimal | Purchase price of the book         |
| quantity            | int     | Number of purchased copies         |

---

## 🔗 Relationships  

- **User → Admin / Reader**: One-to-one (a user can be either admin or reader).  
- **Reader → Borrow_Receipt / Purchase_Receipt**: One-to-many (a reader can borrow or purchase multiple times).  
- **Borrow_Receipt ↔ Book**: Many-to-many via `Borrow_Receipt_Book`.  
- **Purchase_Receipt ↔ Book**: Many-to-many via `Purchase_Receipt_Book`.  
