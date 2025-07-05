# 📚 Library Management System

A minimal library management  application  using **React**, **Redux Toolkit Query**, **Node.js**, **Express**, **MongoDB**, and **TypeScript**.
---

## 🚀 Features

### 📘 Book Management
- View all books in a table with:
  - Title, Author, Genre, ISBN, Copies, Availability
- Actions:
  - **Edit**: Update existing book information
  - **Delete**: Remove a book with confirmation
  - **Borrow**: Borrow a specific quantity
- Add new book with fields like title, author, genre, description, ISBN, and number of copies

### 📕 Borrow Book
- Borrow any available book
- Fields:
  - Quantity (must not exceed available copies)
  - Due Date
- Logic:
  - If copies = 0, mark book as unavailable
  - Successful borrow triggers UI update

### 📊 Borrow Summary
- Aggregated list of borrowed books
- Shows:
  - Book Title
  - ISBN
  - Total Quantity Borrowed

---


## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management.git
cd library-management
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4. Run Backend

```bash
npm run dev
```

### 5. Run Frontend

```bash
cd ../client
npm run dev
```

### live link : https://assignment-3-blue-seven.vercel.app