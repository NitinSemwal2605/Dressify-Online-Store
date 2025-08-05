# 🎯 **Dressify E-commerce Project - Interview Questions & Solutions**

## 📋 **Table of Contents**
1. [React Hooks & State Management](#react-hooks--state-management)
2. [API Development & Backend](#api-development--backend)
3. [Database & Models](#database--models)
4. [Authentication & Security](#authentication--security)
5. [Frontend Components](#frontend-components)
6. [Cart Management](#cart-management)
7. [Payment Integration](#payment-integration)
8. [Image Upload & Cloudinary](#image-upload--cloudinary)
9. [Performance & Optimization](#performance--optimization)
10. [Deployment & DevOps](#deployment--devops)

---

## 🔧 **React Hooks & State Management**

### **Q1: What hooks are used in ShopContext.jsx and why?**
**Answer:** 
- `useState`: Manages cart items, products, token, search state
- `useEffect`: Fetches products on mount and user cart when token changes
- `useNavigate`: Programmatic navigation
- `createContext`: Creates global context for state sharing

**Code Example:**
```javascript
const [cartItems, setCartItems] = useState({});
const [products, setProducts] = useState([]);
const [token, setToken] = useState("");
const navigate = useNavigate();

useEffect(() => {
    getProductsData();
}, []);
```

### **Q2: How does data flow between components in this project?**
**Answer:** 
Data flows through React Context API:
1. **ShopContext** provides global state
2. Components consume context using `useContext(ShopContext)`
3. State updates trigger re-renders across all consuming components
4. Backend synchronization via API calls

### **Q3: Explain the cart state structure and why it's designed this way?**
**Answer:**
```javascript
cartItems = {
  "productId": {
    "S": 2,    // Small size - 2 items
    "M": 1,    // Medium size - 1 item
    "L": 0     // Large size - 0 items
  }
}
```
**Why:** Supports size-based cart management, allows multiple sizes per product, efficient quantity tracking.

### **Q4: How do you handle loading states in the project?**
**Answer:** 
Using skeleton loading screens:
```javascript
const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
};
```

### **Q5: What's the difference between useState and useReducer in this context?**
**Answer:** 
- `useState`: Simple state management for cart, products, token
- `useReducer`: Could be used for complex cart operations with multiple actions
- Current implementation uses `useState` for simplicity, but `useReducer` would be better for complex cart logic

---

## 🚀 **API Development & Backend**

### **Q6: List all API endpoints you've created and their purposes**
**Answer:**

**Authentication APIs:**
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

**Product APIs:**
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product
- `DELETE /api/product/remove/:id` - Delete product
- `POST /api/product/single` - Get single product

**Cart APIs:**
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/get` - Get user's cart
- `POST /api/cart/update` - Update cart quantities
- `DELETE /api/cart/remove/:id` - Remove item from cart

**Order APIs:**
- `POST /api/orders/create` - Create new order
- `GET /api/orders/user` - Get user orders
- `GET /api/orders/admin` - Get all orders (admin)

### **Q7: Explain the productController.js functions with input/output**
**Answer:**

**addProduct Function:**
```javascript
// Input: req.body = { name, description, price, category, subCategory, sizes, bestseller }
// Input: req.files = { image1, image2, image3, image4 }
// Output: { success: true, message: 'Product added successfully' }

const addProduct = async (req, res) => {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const images = [req.files?.image1, req.files?.image2, req.files?.image3, req.files?.image4]
        .filter(item => item !== null);
    
    // Upload to Cloudinary
    let imagesUrl = await Promise.all(
        images.map(async (item) => {
            const result = await cloudinary.uploader.upload(item[0].path);
            return result.secure_url;
        })
    );
    
    const product = new productModel({...productData, images: imagesUrl});
    await product.save();
    res.json({success: true, message: 'Product added successfully'});
};
```

### **Q8: How do you handle file uploads in the backend?**
**Answer:**
Using Multer middleware:
```javascript
// multer.js
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
```

### **Q9: Explain the error handling strategy in your APIs**
**Answer:**
```javascript
try {
    const products = await productModel.find({});
    res.json({success: true, products});
} catch(error) {
    res.json({success: false, message: error.message});
}
```
- Try-catch blocks for async operations
- Consistent response format: `{success: boolean, data/message}`
- Proper HTTP status codes
- Error logging for debugging

### **Q10: How do you validate input data in your APIs?**
**Answer:**
```javascript
// Example validation in userController
if (!email || !password) {
    return res.status(400).json({success: false, message: 'Email and password required'});
}

// Product validation
if (!name || !price || !category) {
    return res.status(400).json({success: false, message: 'Required fields missing'});
}
```

---

## 🗄️ **Database & Models**

### **Q11: Explain your MongoDB schemas and their relationships**
**Answer:**

**Product Model:**
```javascript
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    sizes: [{ type: String }],
    images: [{ type: String }],
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});
```

**User Model:**
```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Object, default: {} },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});
```

### **Q12: How do you handle database connections?**
**Answer:**
```javascript
// config/mongodb.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
```

### **Q13: Explain the cart data structure in the database**
**Answer:**
Cart is stored as an object in user document:
```javascript
cart: {
    "productId1": {
        "S": 2,
        "M": 1,
        "L": 0
    },
    "productId2": {
        "M": 3
    }
}
```

### **Q14: How do you handle database indexing for performance?**
**Answer:**
```javascript
// User model with email index
email: { type: String, required: true, unique: true, index: true }

// Product model with category index
category: { type: String, required: true, index: true }
```

---

## 🔐 **Authentication & Security**

### **Q15: Explain JWT implementation in your project**
**Answer:**
```javascript
// Token generation
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

// Token verification middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({success: false, message: 'Authentication failed'});
    }
};
```

### **Q16: How do you handle password security?**
**Answer:**
```javascript
// Password hashing with bcrypt
const hashedPassword = await bcrypt.hash(password, 10);

// Password verification
const isMatch = await bcrypt.compare(password, user.password);
```

### **Q17: Explain the admin authentication system**
**Answer:**
```javascript
// adminAuth.js middleware
const adminAuth = async (req, res, next) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({success: false, message: 'Admin access denied'});
    }
};
```

### **Q18: How do you protect routes in the frontend?**
**Answer:**
```javascript
// Protected route component
const ProtectedRoute = ({ children }) => {
    const { token } = useContext(ShopContext);
    return token ? children : <Navigate to="/login" />;
};
```

---

## 🎨 **Frontend Components**

### **Q19: Explain the component hierarchy in your project**
**Answer:**
```
App.jsx
├── Navbar.jsx
├── SearchBar.jsx
├── Routes
│   ├── Home.jsx
│   │   ├── Hero.jsx
│   │   ├── LatestCollection.jsx
│   │   └── BestSeller.jsx
│   ├── Product.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   └── Profile.jsx
└── Footer.jsx
```

### **Q20: How do you implement responsive design?**
**Answer:**
Using Tailwind CSS responsive classes:
```javascript
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {/* Responsive grid layout */}
</div>
```

### **Q21: Explain the skeleton loading implementation**
**Answer:**
```javascript
const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-3">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mt-2"></div>
            </div>
        </div>
    );
};
```

### **Q22: How do you handle form validation in React?**
**Answer:**
```javascript
const [errors, setErrors] = useState({});

const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
```

---

## 🛒 **Cart Management**

### **Q23: Explain the addToCart function in detail**
**Answer:**
```javascript
const addToCart = async (itemId, size) => {
    if (!size) {
        toast.error('Please select a size');
        return;
    }

    let cartData = structuredClone(cartItems);
    
    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
    } else {
        cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    // Backend synchronization
    if (token) {
        try {
            const response = await axios.post(
                `${backendURL}/api/cart/add`,
                { itemId, size },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setCartItems(response.data.cart);
                toast.success('Item added to cart successfully!');
            }
        } catch (error) {
            toast.error('Error adding to cart');
        }
    }
};
```

### **Q24: How do you calculate cart totals?**
**Answer:**
```javascript
const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
        const productInfo = products.find((product) => product._id === item);
        for (const size in cartItems[item]) {
            if (cartItems[item][size] > 0) {
                totalAmount += productInfo.price * cartItems[item][size];
            }
        }
    }
    return totalAmount;
};
```

### **Q25: Explain the cart synchronization between frontend and backend**
**Answer:**
1. **Frontend State**: Local cart state for immediate UI updates
2. **Backend Sync**: API calls to persist cart data
3. **Token-based**: Cart associated with user token
4. **Error Handling**: Revert to previous state on API failure
5. **Real-time Updates**: Toast notifications for user feedback

---

## 💳 **Payment Integration**

### **Q26: How do you integrate payment gateways?**
**Answer:**
```javascript
// Stripe integration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'inr',
    });
    return paymentIntent.client_secret;
};
```

### **Q27: Explain the order creation process**
**Answer:**
```javascript
const createOrder = async (orderData) => {
    const order = new orderModel({
        user: req.user.userId,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.address,
        paymentMethod: orderData.paymentMethod,
        status: 'pending'
    });
    await order.save();
    return order;
};
```

---

## ☁️ **Image Upload & Cloudinary**

### **Q28: Explain the image upload process**
**Answer:**
```javascript
// 1. Multer handles file upload
const upload = multer({ storage: storage });

// 2. Upload to Cloudinary
const uploadToCloudinary = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'image',
        folder: 'dressify'
    });
    return result.secure_url;
};

// 3. Store URLs in database
const imagesUrl = await Promise.all(
    images.map(async (item) => await uploadToCloudinary(item))
);
```

### **Q29: How do you handle multiple image uploads?**
**Answer:**
```javascript
// Multer configuration for multiple files
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images allowed'), false);
        }
    }
});
```

---

## ⚡ **Performance & Optimization**

### **Q30: How do you optimize React performance?**
**Answer:**
1. **React.memo**: Prevent unnecessary re-renders
2. **useCallback**: Memoize functions
3. **useMemo**: Memoize expensive calculations
4. **Lazy Loading**: Code splitting with React.lazy
5. **Image Optimization**: Lazy loading and compression

### **Q31: Explain your caching strategy**
**Answer:**
```javascript
// Product caching in context
useEffect(() => {
    getProductsData(); // Fetch once on mount
}, []);

// Cart caching in localStorage
localStorage.setItem('cart', JSON.stringify(cartItems));
```

### **Q32: How do you handle API rate limiting?**
**Answer:**
```javascript
// Backend rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🚀 **Deployment & DevOps**

### **Q33: Explain your deployment strategy**
**Answer:**
1. **Frontend**: Vercel deployment
2. **Backend**: Railway/Heroku deployment
3. **Database**: MongoDB Atlas
4. **Environment Variables**: Secure configuration
5. **CI/CD**: GitHub Actions for automated deployment

### **Q34: How do you handle environment variables?**
**Answer:**
```javascript
// Backend .env
MONGO_URI=mongodb://localhost:27017/dressify
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name

// Frontend .env
VITE_BACKEND_URL=http://localhost:8001
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### **Q35: Explain your error monitoring strategy**
**Answer:**
```javascript
// Global error handler
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
});
```

---

## 🔧 **Advanced Technical Questions**

### **Q36: How would you scale this application?**
**Answer:**
1. **Database**: MongoDB sharding, read replicas
2. **Backend**: Load balancing, microservices
3. **Frontend**: CDN, static asset optimization
4. **Caching**: Redis for session management
5. **Monitoring**: APM tools, logging

### **Q37: How do you handle security vulnerabilities?**
**Answer:**
1. **Input Validation**: Sanitize all inputs
2. **SQL Injection**: Use parameterized queries
3. **XSS Protection**: Escape user inputs
4. **CSRF Protection**: Token-based validation
5. **HTTPS**: SSL/TLS encryption

### **Q38: Explain your testing strategy**
**Answer:**
```javascript
// Unit tests for components
import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem';

test('renders product name', () => {
    render(<ProductItem name="Test Product" />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
});

// API tests
test('GET /api/products returns products', async () => {
    const response = await request(app).get('/api/product/list');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
});
```

### **Q39: How do you handle internationalization?**
**Answer:**
```javascript
// Using react-i18next
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

return <h1>{t('welcome.title')}</h1>;
```

### **Q40: Explain your SEO strategy**
**Answer:**
1. **Meta Tags**: Dynamic meta descriptions
2. **Structured Data**: JSON-LD for products
3. **Sitemap**: Dynamic sitemap generation
4. **Performance**: Core Web Vitals optimization
5. **Mobile-First**: Responsive design

---

## 📊 **Data Flow & State Management**

### **Q41: Explain the complete data flow from user action to database**
**Answer:**
1. **User Action**: Click "Add to Cart"
2. **Frontend State**: Update local cart state
3. **API Call**: POST to /api/cart/add
4. **Backend Processing**: Validate token, update database
5. **Response**: Return updated cart data
6. **Frontend Update**: Sync with backend response
7. **UI Update**: Re-render components

### **Q42: How do you handle optimistic updates?**
**Answer:**
```javascript
// Optimistic cart update
const addToCartOptimistic = (itemId, size) => {
    // Update UI immediately
    setCartItems(prev => ({...prev, [itemId]: {...prev[itemId], [size]: (prev[itemId]?.[size] || 0) + 1}}));
    
    // Make API call
    addToCartAPI(itemId, size).catch(error => {
        // Revert on failure
        setCartItems(prev => ({...prev, [itemId]: {...prev[itemId], [size]: (prev[itemId]?.[size] || 1) - 1}}));
        toast.error('Failed to add item');
    });
};
```

### **Q43: Explain your error boundary implementation**
**Answer:**
```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
```

---

## 🎯 **Problem-Solving Questions**

### **Q44: How would you implement real-time notifications?**
**Answer:**
```javascript
// WebSocket implementation
const socket = io('http://localhost:8001');

socket.on('orderUpdate', (data) => {
    toast.info(`Order ${data.orderId} status: ${data.status}`);
});

// Backend WebSocket
io.on('connection', (socket) => {
    socket.on('joinRoom', (userId) => {
        socket.join(userId);
    });
});
```

### **Q45: How would you implement search with filters?**
**Answer:**
```javascript
const searchProducts = (query, filters) => {
    const searchParams = {
        name: { $regex: query, $options: 'i' },
        category: filters.category,
        price: { $gte: filters.minPrice, $lte: filters.maxPrice }
    };
    
    return productModel.find(searchParams);
};
```

### **Q46: How would you implement a recommendation system?**
**Answer:**
```javascript
const getRecommendations = async (userId) => {
    const userOrders = await orderModel.find({ user: userId });
    const purchasedCategories = userOrders.map(order => order.category);
    
    return productModel.find({
        category: { $in: purchasedCategories },
        _id: { $nin: userOrders.map(order => order.product) }
    }).limit(5);
};
```

### **Q47: How would you handle inventory management?**
**Answer:**
```javascript
const productSchema = new mongoose.Schema({
    // ... existing fields
    inventory: {
        S: { type: Number, default: 0 },
        M: { type: Number, default: 0 },
        L: { type: Number, default: 0 }
    }
});

const checkInventory = async (productId, size, quantity) => {
    const product = await productModel.findById(productId);
    return product.inventory[size] >= quantity;
};
```

### **Q48: How would you implement a wishlist feature?**
**Answer:**
```javascript
// User model addition
wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]

// Add to wishlist API
const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const user = await userModel.findById(req.user.userId);
    
    if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
    }
    
    res.json({ success: true, wishlist: user.wishlist });
};
```

---

## 🔍 **Debugging & Troubleshooting**

### **Q49: How do you debug API issues?**
**Answer:**
1. **Console Logging**: Detailed request/response logging
2. **Error Handling**: Proper try-catch blocks
3. **Status Codes**: Appropriate HTTP status codes
4. **Validation**: Input validation and sanitization
5. **Testing**: Postman/Insomnia for API testing

### **Q50: How do you handle CORS issues?**
**Answer:**
```javascript
// Backend CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### **Q51: How do you debug React performance issues?**
**Answer:**
1. **React DevTools**: Profiler for component analysis
2. **Console Logging**: Performance measurements
3. **React.memo**: Prevent unnecessary re-renders
4. **useCallback/useMemo**: Memoize expensive operations
5. **Bundle Analysis**: Webpack bundle analyzer

### **Q52: How do you handle memory leaks?**
**Answer:**
```javascript
// Cleanup in useEffect
useEffect(() => {
    const fetchData = async () => {
        const data = await api.getData();
        if (!isMounted.current) return; // Prevent memory leak
        setData(data);
    };
    
    fetchData();
    
    return () => {
        isMounted.current = false;
    };
}, []);
```

---

## 📈 **Scalability & Architecture**

### **Q53: How would you implement microservices?**
**Answer:**
```javascript
// Service separation
- User Service: Authentication, profiles
- Product Service: Product management
- Cart Service: Shopping cart logic
- Order Service: Order processing
- Payment Service: Payment integration
- Notification Service: Email/SMS notifications
```

### **Q54: How would you implement caching?**
**Answer:**
```javascript
// Redis caching
const redis = require('redis');
const client = redis.createClient();

const cacheProduct = async (productId, productData) => {
    await client.setex(`product:${productId}`, 3600, JSON.stringify(productData));
};

const getCachedProduct = async (productId) => {
    const cached = await client.get(`product:${productId}`);
    return cached ? JSON.parse(cached) : null;
};
```

### **Q55: How would you implement load balancing?**
**Answer:**
```javascript
// Nginx configuration
upstream backend {
    server backend1:8001;
    server backend2:8001;
    server backend3:8001;
}

server {
    listen 80;
    location /api {
        proxy_pass http://backend;
    }
}
```

---

## 🔒 **Security Questions**

### **Q56: How do you prevent SQL injection?**
**Answer:**
```javascript
// Using parameterized queries with Mongoose
const user = await userModel.findOne({ email: email }); // Safe

// Input validation
const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '');
};
```

### **Q57: How do you handle XSS attacks?**
**Answer:**
```javascript
// Sanitize user inputs
import DOMPurify from 'dompurify';

const sanitizeHTML = (dirty) => {
    return DOMPurify.sanitize(dirty);
};

// React automatically escapes content
return <div>{userInput}</div>; // Safe
```

### **Q58: How do you implement rate limiting?**
**Answer:**
```javascript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts, try again later'
});

app.use('/api/users/login', loginLimiter);
```

### **Q59: How do you secure API endpoints?**
**Answer:**
```javascript
// Authentication middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({success: false, message: 'Authentication failed'});
    }
};

// Apply to protected routes
app.use('/api/cart', auth);
app.use('/api/orders', auth);
```

### **Q60: How do you handle sensitive data?**
**Answer:**
```javascript
// Environment variables for secrets
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_API_SECRET=your_cloudinary_secret

// Password hashing
const hashedPassword = await bcrypt.hash(password, 10);

// Data encryption for sensitive fields
const encryptField = (text) => {
    return crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY)
        .update(text, 'utf8', 'hex') + cipher.final('hex');
};
```

---

## 🧪 **Testing Questions**

### **Q61: How do you write unit tests for React components?**
**Answer:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from './ProductItem';

test('renders product information', () => {
    const product = {
        name: 'Test Product',
        price: 100,
        images: ['test.jpg']
    };
    
    render(<ProductItem {...product} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
});

test('calls addToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductItem addToCart={mockAddToCart} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalled();
});
```

### **Q62: How do you test API endpoints?**
**Answer:**
```javascript
import request from 'supertest';
import app from '../server';

describe('Product API', () => {
    test('GET /api/product/list returns products', async () => {
        const response = await request(app)
            .get('/api/product/list')
            .expect(200);
        
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.products)).toBe(true);
    });

    test('POST /api/product/add creates product', async () => {
        const productData = {
            name: 'Test Product',
            price: 100,
            category: 'test'
        };
        
        const response = await request(app)
            .post('/api/product/add')
            .send(productData)
            .expect(200);
        
        expect(response.body.success).toBe(true);
    });
});
```

### **Q63: How do you test authentication?**
**Answer:**
```javascript
test('protected route requires authentication', async () => {
    const response = await request(app)
        .get('/api/cart/get')
        .expect(401);
    
    expect(response.body.success).toBe(false);
});

test('valid token allows access', async () => {
    const token = generateTestToken();
    
    const response = await request(app)
        .get('/api/cart/get')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    
    expect(response.body.success).toBe(true);
});
```

---

## 📱 **Mobile & Responsive Design**

### **Q64: How do you implement responsive design?**
**Answer:**
```javascript
// Tailwind CSS responsive classes
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {/* Responsive grid */}
</div>

// CSS Media Queries
@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

// React responsive hooks
const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return size;
};
```

### **Q65: How do you optimize for mobile performance?**
**Answer:**
```javascript
// Image optimization
<img 
    src={product.image} 
    loading="lazy"
    sizes="(max-width: 768px) 50vw, 25vw"
    alt={product.name}
/>

// Code splitting
const ProductDetail = lazy(() => import('./ProductDetail'));

// Service Worker for caching
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
```

---

## 🔄 **State Management Advanced**

### **Q66: How would you implement Redux in this project?**
**Answer:**
```javascript
// Store configuration
const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        user: userReducer
    }
});

// Cart reducer
const cartReducer = createSlice({
    name: 'cart',
    initialState: { items: {}, total: 0 },
    reducers: {
        addToCart: (state, action) => {
            const { itemId, size } = action.payload;
            if (!state.items[itemId]) {
                state.items[itemId] = {};
            }
            state.items[itemId][size] = (state.items[itemId][size] || 0) + 1;
        }
    }
});
```

### **Q67: How would you implement Zustand?**
**Answer:**
```javascript
import create from 'zustand';

const useStore = create((set) => ({
    cart: {},
    products: [],
    addToCart: (itemId, size) => set((state) => ({
        cart: {
            ...state.cart,
            [itemId]: {
                ...state.cart[itemId],
                [size]: (state.cart[itemId]?.[size] || 0) + 1
            }
        }
    })),
    setProducts: (products) => set({ products })
}));
```

---

## 🌐 **API Integration**

### **Q68: How do you handle API errors?**
**Answer:**
```javascript
// Axios interceptor
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Error handling in components
const fetchProducts = async () => {
    try {
        const response = await axios.get('/api/product/list');
        setProducts(response.data.products);
    } catch (error) {
        if (error.response?.status === 404) {
            toast.error('Products not found');
        } else {
            toast.error('Failed to fetch products');
        }
    }
};
```

### **Q69: How do you implement API caching?**
**Answer:**
```javascript
// React Query for caching
import { useQuery } from 'react-query';

const useProducts = () => {
    return useQuery('products', async () => {
        const response = await axios.get('/api/product/list');
        return response.data.products;
    }, {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000 // 10 minutes
    });
};

// Manual caching
const productCache = new Map();

const getProduct = async (id) => {
    if (productCache.has(id)) {
        return productCache.get(id);
    }
    
    const response = await axios.get(`/api/product/${id}`);
    productCache.set(id, response.data);
    return response.data;
};
```

### **Q70: How do you handle API versioning?**
**Answer:**
```javascript
// URL versioning
app.use('/api/v1/users', userRouter);
app.use('/api/v2/users', userRouterV2);

// Header versioning
app.use('/api/users', (req, res, next) => {
    const version = req.headers['api-version'] || 'v1';
    req.apiVersion = version;
    next();
});

// Query parameter versioning
app.use('/api/users', (req, res, next) => {
    const version = req.query.version || 'v1';
    req.apiVersion = version;
    next();
});
```

---

## 🎯 **Final Technical Questions**

### **Q71: How would you implement real-time chat support?**
**Answer:**
```javascript
// Socket.io implementation
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('joinSupport', (userId) => {
        socket.join(`support_${userId}`);
    });
    
    socket.on('sendMessage', (data) => {
        io.to(`support_${data.userId}`).emit('newMessage', data);
    });
});
```

### **Q72: How would you implement a review system?**
**Answer:**
```javascript
const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const addReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const review = new reviewModel({
        user: req.user.userId,
        product: productId,
        rating,
        comment
    });
    await review.save();
    res.json({ success: true, review });
};
```

### **Q73: How would you implement a discount system?**
**Answer:**
```javascript
const discountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true },
    minAmount: { type: Number, default: 0 },
    maxDiscount: { type: Number },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    usageLimit: { type: Number, default: -1 },
    usedCount: { type: Number, default: 0 }
});

const applyDiscount = (totalAmount, discount) => {
    let discountAmount = 0;
    
    if (discount.type === 'percentage') {
        discountAmount = (totalAmount * discount.value) / 100;
        if (discount.maxDiscount) {
            discountAmount = Math.min(discountAmount, discount.maxDiscount);
        }
    } else {
        discountAmount = discount.value;
    }
    
    return Math.max(0, totalAmount - discountAmount);
};
```

### **Q74: How would you implement analytics tracking?**
**Answer:**
```javascript
// Google Analytics integration
import ReactGA from 'react-ga';

ReactGA.initialize('GA_TRACKING_ID');

// Track page views
useEffect(() => {
    ReactGA.pageview(window.location.pathname);
}, [location]);

// Track events
const trackAddToCart = (productId, productName) => {
    ReactGA.event({
        category: 'Ecommerce',
        action: 'Add to Cart',
        label: productName,
        value: 1
    });
};

// Custom analytics
const trackUserAction = (action, data) => {
    axios.post('/api/analytics/track', {
        action,
        data,
        userId: user?.id,
        timestamp: Date.now()
    });
};
```

### **Q75: How would you implement A/B testing?**
**Answer:**
```javascript
const ABTest = ({ variantA, variantB, testName }) => {
    const [variant, setVariant] = useState(null);
    
    useEffect(() => {
        const userVariant = localStorage.getItem(`ab_test_${testName}`);
        if (userVariant) {
            setVariant(userVariant);
        } else {
            const newVariant = Math.random() < 0.5 ? 'A' : 'B';
            localStorage.setItem(`ab_test_${testName}`, newVariant);
            setVariant(newVariant);
        }
    }, [testName]);
    
    return variant === 'A' ? variantA : variantB;
};

// Usage
<ABTest
    testName="product_layout"
    variantA={<ProductGrid />}
    variantB={<ProductList />}
/>
```
