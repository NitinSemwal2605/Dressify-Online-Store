Got it! Since the **Admin Panel** has additional files, I’ll modify the structure and README to reflect that. Below is the refined and updated **`README.md`** code with an accurate description of the admin panel.

---

```markdown
# 🧥 Dressify

**Dressify** is a modern e-commerce web application built using the **MERN (MongoDB, Express, React, Node.js)** stack. The platform allows users to browse, filter, and purchase trendy outfits with an intuitive and seamless UI/UX. It enhances the shopping experience with personalized recommendations and secure payments.

---

## 📚 Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Admin Panel](#admin-panel)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About the Project
Dressify is designed to provide:
- A seamless and responsive shopping experience.
- Advanced product search and filtering.
- Secure user authentication and payment gateway.
- An easy-to-use admin dashboard for managing products and orders.

---

## 🚀 Features
✅ User Authentication (JWT)  
✅ Product Listing and Filtering  
✅ Shopping Cart and Checkout  
✅ Payment Gateway Integration (Razorpay/Stripe)  
✅ Admin Panel for Product and Order Management  
✅ Wishlist and Order Tracking  
✅ Reviews and Ratings  
✅ Order Management and Delivery Updates  

---

## 🛠️ Tech Stack
| Technology     | Usage                  |
|----------------|------------------------|
| MongoDB        | Database                |
| Express.js     | Backend Framework       |
| React.js       | Frontend UI             |
| Node.js        | Backend Server          |
| Redux          | State Management        |
| Stripe/Razorpay | Payment Gateway        |
| Cloudinary     | Image Storage           |
| JWT            | Authentication Security |

---

## ⚙️ Installation

### Prerequisites
- Node.js (v18+)
- MongoDB installed and running locally or on a cloud platform.
- IDE (VS Code recommended)

### Clone the Repository
```bash
git clone https://github.com/your-username/dressify.git
cd dressify
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Admin Panel Setup
```bash
cd admin
npm install
```

---

## 🔐 Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## ▶️ Usage

### Run Backend
```bash
cd backend
npm run dev
```

### Run Frontend
```bash
cd frontend
npm start
```

### Run Admin Panel
```bash
cd admin
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the user panel.  
Open [http://localhost:3001](http://localhost:3001) to view the admin panel.

---

## 📡 API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add a new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Routes
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/user/:id` - Get orders by user
- `PUT /api/orders/:id` - Update order status (Admin)

---

## 🗂️ Folder Structure
```
/dressify
├── /admin
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /redux
│   │   └── App.js
│   └── package.json
├── /backend
│   ├── /config
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   └── server.js
├── /frontend
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /redux
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## 👨‍💼 Admin Panel
The admin panel is built separately to manage:
- Products (Add, Edit, Delete)
- Orders (View, Update Status, Track)
- Users (View and Manage User Accounts)
- Dashboard for Insights and Sales Reports

### Key Files in Admin Panel
```
/admin
├── /src
│   ├── /components
│   ├── /pages
│   ├── /redux
│   ├── App.js
│   └── index.js
└── package.json
```

---

## 🤝 Contributing
Contributions are welcome!  
To contribute:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/awesome-feature`).
5. Open a pull request.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact
**Nitin Semwal**  
Email: [your-email@example.com]  
GitHub: [https://github.com/your-username](https://github.com/your-username)

---

✅ This version includes a clear **Admin Panel Setup** and describes its purpose properly. Do you need anything else modified or added? 😎
