# 📚 Library

A **full-stack web application** for managing a book library, supporting both **customers** and **bookstore owners**.  
The system allows browsing, searching, purchasing, and borrowing books, while providing management features for bookstore admins.  
It also includes an **AI-powered chatbot assistant** to help users quickly find books through natural language queries.  
## 🎥 Demo: [https://drive.google.com/drive/u/0/my-drive](https://drive.google.com/file/d/1LVWAG2iyz2KgijCjqIpYEVP0Y0r2XEge/view?usp=sharing)
---

## 🚀 Features  

### 👤 User Roles  
- **Customer (Reader)**  
  - Browse and search for books by title, author, or category  
  - Borrow or purchase books  
  - View borrowing and purchase history  
  - Manage shopping cart  
  - Use the chatbot to ask questions and search for books  

- **Bookstore Owner (Admin)**  
  - Add, update, and remove books  
  - Manage inventory and pricing (borrow price & purchase price)  
  - View sales and borrowing statistics  
  - Manage customer accounts  

---

### 📖 Core Modules  
- 📘 **Book Management**: CRUD for books (title, author, publisher, ISBN, etc.)  
- 📑 **Borrowing System**: Borrow receipts, due dates, total cost calculation  
- 🛒 **Purchase System**: Shopping cart + purchase receipts + online payment
- 🤖 **Chatbot Assistant**: AI-powered chatbot (LangGraph + GPT, via FastAPI server) that supports queries
- 📊 **Statistics Dashboard**: Sales, borrow trends, and reader insights  
- 🔐 **Authentication & Authorization**: Role-based access (Spring Security ready)  

---

## 🛠️ Tech Stack  

### Backend  
- ☕ **Java 17**  
- 🚀 **Spring Boot 3** (REST API)  
- 🗄️ **Spring Data JPA (Hibernate)**  
- 🐘 **MySQL** (database)  
- 🔐 **Spring Security** (authentication & authorization)  

### Frontend  
- ⚛️ **React 18 (Next.js)**  
- 🎨 **Tailwind CSS + ShadCN UI**  
- 🗂️ **Zustand** (state management for cart)  
- 🔔 **React Hot Toast** (notifications)  
- 💬 **Floating Chatbot widget** (integrated into UI, calls AI server)  

### AI Assistant  
- ⚡ FastAPI (AI server layer)
- 🔗 **LangGraph + OpenAI GPT**  
- 🧠 Context-aware conversation with memory  
- 📚 Queries the backend book database via API and returns results to frontend

### Others  
- 💳 **Stripe** for online payments   

---

## ⚙️ Installation  

### 1. Clone Repository  
```bash
git clone https://github.com/your-username/library-management.git
cd library-management
```

---

### 2. Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

> Backend will run at `http://localhost:8080`

---

### 3. AI Setup

```bash
cd ai
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create a .env file (if not exists) and configure environment variables such as: OPENAI_API_KEY

# Run the server
python3 app.py
```

> AI will run at `http://localhost:8000`

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend will run at `http://localhost:3000`
