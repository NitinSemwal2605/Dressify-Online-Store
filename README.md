
---

## 🛍️ **Dressify - E-commerce Platform**

**Dressify** is a modern e-commerce platform built with the **MERN stack** and designed for a seamless shopping experience. It includes an admin panel for managing products, orders, and users. The platform is fully responsive, ensuring smooth functionality across all devices.

---

## 📂 **Project Folder Structure**

```
/Dressify
├── /admin                    # Admin panel for managing platform
│   ├── /dist                 # Production build files
│   ├── /node_modules         # Installed dependencies
│   ├── /public               # Static files (favicon, logos, etc.)
│   ├── /src                  # Source code for admin
│   │   ├── /assets           # Static assets (images, icons, fonts)
│   │   ├── /components       # Reusable components
│   │   ├── /pages            # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── OrderList.jsx
│   │   │   └── UserList.jsx
│   │   ├── App.jsx           # Main component for admin
│   │   ├── main.jsx          # Entry point
│   │   ├── index.css         # Global styles
│   │   └── App.css           # Admin-specific styles
│   ├── .env                  # Environment variables
│   ├── vite.config.js        # Vite configuration
│   ├── package.json          # Project dependencies
│   └── tailwind.config.js    # Tailwind CSS configuration
├── /backend                  # Backend API
│   ├── /config               # Database & environment config
│   ├── /controllers          # API controllers for handling logic
│   │   ├── CartController.js
│   │   ├── OrderController.js
│   │   ├── ProductController.js
│   │   └── UserController.js
│   ├── /middlewares          # Auth, error handling, and security
│   ├── /models               # Mongoose models (schemas)
│   ├── /routes               # API routes
│   ├── Server.js             # Backend entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Backend environment variables
├── /frontend                 # Customer-facing platform
│   ├── /dist                 # Production build files
│   ├── /node_modules         # Installed dependencies
│   ├── /public               # Static assets
│   ├── /src                  # Source code for frontend
│   │   ├── /assets           # Images, icons, and fonts
│   │   ├── /components       # Reusable UI components
│   │   ├── /context          # Global state management (Context API)
│   │   ├── /pages            # Application pages
│   │   │   ├── Home.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── Checkout.jsx
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx          # App entry point
│   │   ├── index.css         # Global styles
│   │   └── App.css           # Main CSS file
│   ├── .env                  # Environment variables
│   ├── vite.config.js        # Vite configuration
│   ├── package.json          # Frontend dependencies
│   └── tailwind.config.js    # Tailwind CSS configuration
└── /vercel.json              # Deployment configuration for Vercel
```

---

## ⚙️ **Tech Stack**

### 🎯 **Frontend**
- ⚛️ **React.js** - Component-based UI library.
- 🌀 **Vite** - Fast and efficient build tool.
- 🎨 **Tailwind CSS** - Utility-first CSS framework for responsive design.
- 🧠 **Context API** - Global state management.
- 🌐 **Axios** - For making HTTP requests.

### 🎯 **Backend**
- 🟢 **Node.js** - JavaScript runtime for server-side scripting.
- 🚀 **Express.js** - Fast and minimalist web framework.
- 📚 **MongoDB** - NoSQL database for storing data.
- 🔐 **JWT (JSON Web Token)** - Secure authentication and authorization.
- 🗂️ **Mongoose** - ODM to model data for MongoDB.

### 🎯 **Admin Panel**
- 🖥️ **React Admin Dashboard** - Admin interface to manage products, orders, and users.
- 📊 **Chart.js** - For visualizing analytical data.

---

## 🔥 **Key Features**

### ✅ User Features
- 👕 Browse products with categories and filters.
- 🛒 Add products to the cart.
- 💳 Secure checkout with payment gateway.
- 📦 Track order status.
- 👤 User authentication & profile management.

### ✅ Admin Features
- 📊 View and manage orders.
- 🛍️ Add, edit, and delete products.
- 👥 Manage users and roles.
- 📈 View sales and performance reports.

---

## 🚀 **How to Run Locally**

### 1. **Clone the Repository**
```bash
git clone h[ttps://github.com/username/dressify.git](https://github.com/NitinSemwal2605/Dressify-Online-Store)
cd dressify
```

### 2. **Set Environment Variables**
- Create `.env` files in `backend/` and `frontend/`.
- Add the following:
```bash
# Backend (.env)
MONGO_URI=mongodb://localhost:27017/dressify
JWT_SECRET=your_secret_key
STRIPE_SECRET=your_stripe_key
CLOUDINARY_SECRET_KEY = your key
CLOUDINARY_CLOUD_NAME = cloud name
CLOUDINARY_API_KEY = your key 
ADMIN Username = username
ADMIN Password = password

```

```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_KEY=your_stripe_publishable_key
```

### 3. **Install Dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin Panel
cd ../admin
npm install
```

### 4. **Run the Application**
```bash
# Run backend server
cd backend
npm run dev

# Run frontend (Vite)
cd ../frontend
npm run dev

# Run admin panel
cd ../admin
npm run dev
```

### 5. **Open in Browser**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Admin Panel: [http://localhost:5173](http://localhost:5173)

---

## 🚢 **Deployment Instructions**

### ✅ Deploy on Vercel
- Add `vercel.json` in the root directory.
- Push to GitHub and connect with Vercel.

### ✅ Deploy on MongoDB Atlas
- Create a cluster and replace `MONGO_URI` in `backend/.env`.

---

## 📚 **API Endpoints**

### 🔹 **User Routes**
- `POST /api/auth/register` – Register a new user.
- `POST /api/auth/login` – Login and get a token.
- `GET /api/user/profile` – Get user profile.

### 🔹 **Product Routes**
- `GET /api/products` – Get all products.
- `GET /api/products/:id` – Get single product.

### 🔹 **Cart Routes**
- `POST /api/cart/add` – Add item to cart.
- `DELETE /api/cart/remove/:id` – Remove item from cart.

### 🔹 **Order Routes**
- `POST /api/orders/create` – Create new order.
- `GET /api/orders/user` – Get user orders.

---

## 📧 **Contact Info**

👨‍💻 **Developer:** Nitin Semwal  
📧 **Email:** [nitinsemwal@domain.com](mailto:55semwalnitin@gmail.com)  
🔗 **GitHub:** [GitHub Profile](https://github.com/nitinsemwal)  

---

## 💡 **Contributing**
We welcome contributions to enhance **Dressify**. Please open a pull request or create an issue if you encounter any problems.

---

## ⚠️ **License**
This project is licensed under the **MIT License**.  

---

🎉 **Happy Coding!** Let me know if you need help with deployment or API integration! 🚀
