# GraphQL Products Manager

A complete **Node.js + GraphQL** learning project with a modern frontend interface. This repository demonstrates how to build a full-stack application using GraphQL with Apollo Server and a beautiful vanilla JavaScript frontend.

## 🚀 What's Included

### **Backend (GraphQL API)**

- **Node.js + Apollo Server** - Modern GraphQL server
- **MongoDB + Mongoose** - Database and ODM
- **Product Management** - Full CRUD operations for products
- **Sorting & Filtering** - Advanced query capabilities

### **Frontend (Web Interface)**

- **Modern Vanilla JavaScript** - No frameworks, pure JS
- **Beautiful UI/UX** - Responsive design with gradients and animations
- **Full CRUD Interface** - Add, view, edit, delete products
- **Real-time Updates** - Instant UI updates after mutations
- **GraphQL Integration** - Custom GraphQL client implementation

## 📋 Features

### **GraphQL API Features**

✅ **Product Schema**: ID, title, category, price, inStock status  
✅ **Queries**: Get all products, single product, sorted products  
✅ **Mutations**: Add, update, delete products  
✅ **Type Safety**: Strongly typed GraphQL schema  
✅ **MongoDB Integration**: Persistent data storage

### **Frontend Features**

✅ **Responsive Design**: Works on desktop and mobile  
✅ **Interactive Forms**: Add and edit products with validation  
✅ **Product Grid**: Beautiful card-based layout  
✅ **Sorting Options**: Sort by title, category, or price  
✅ **Modal Editing**: Popup forms for editing products  
✅ **Toast Notifications**: Success and error messages  
✅ **Loading States**: User feedback during operations

## 🛠️ Quick Start

### **Prerequisites**

- Node.js (v14+ recommended)
- MongoDB (local or MongoDB Atlas)
- Modern web browser

### **1. Backend Setup**

```bash
# Clone and navigate to project
cd "nodejs with graphql"

# Install dependencies
npm install

# Create .env file with:
MONGO_URI=your-mongodb-connection-string
PORT=4000

# Start the GraphQL server
npm start
# Server runs on http://localhost:4000
```

### **2. Frontend Setup**

```bash
# Navigate to frontend directory
cd frontend

# Option 1: Python HTTP Server (recommended)
python -m http.server 3000

# Option 2: Node.js HTTP Server
npx http-server -p 3000

# Option 3: VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

### **3. Access the Application**

- **GraphQL API**: http://localhost:4000 (Apollo Sandbox)
- **Frontend Interface**: http://localhost:3000

## 📊 GraphQL Schema

### **Product Type**

```graphql
type Product {
  id: ID!
  title: String!
  category: String!
  price: Float!
  inStock: Boolean!
}
```

### **Available Queries**

```graphql
# Get all products
products: [Product!]!

# Get single product by ID
product(id: ID!): Product

# Get sorted products
sortedProducts(field: String!, order: SortOrder = ASC): [Product!]!
```

### **Available Mutations**

```graphql
# Add new product
addProduct(title: String!, category: String!, price: Float!, inStock: Boolean!): Product!

# Update existing product
updateProduct(id: ID!, title: String, category: String, price: Float, inStock: Boolean): Product!

# Delete product
deleteProduct(id: ID!): Boolean!
```

## 🎨 Frontend Architecture

### **File Structure**

```
frontend/
├── index.html      # Main HTML structure
├── styles.css      # Modern CSS with gradients and animations
└── app.js          # GraphQL client and application logic
```

### **Key Components**

- **GraphQLClient**: Custom GraphQL client for API communication
- **ProductsManager**: Main application class handling all operations
- **Responsive Grid**: CSS Grid layout for product cards
- **Modal System**: Popup forms for editing products
- **Toast Notifications**: User feedback system

## 🎯 Learning Objectives

### **GraphQL Concepts Demonstrated**

- **Schema Definition**: Types, queries, mutations
- **Resolvers**: Backend logic for handling operations
- **Variables**: Dynamic query parameters
- **Error Handling**: Proper error management
- **Client Integration**: Frontend GraphQL consumption

### **Frontend Concepts**

- **Modern JavaScript**: ES6+ classes and async/await
- **DOM Manipulation**: Dynamic content updates
- **CSS Grid/Flexbox**: Modern layout techniques
- **Responsive Design**: Mobile-first approach
- **User Experience**: Loading states and feedback

## 🔧 Why GraphQL?

### **Advantages over REST**

- **Single Endpoint**: One URL for all API operations
- **Fetch Exactly What You Need**: No over/under-fetching
- **Strongly Typed**: Self-documenting with introspection
- **Client-Driven**: Frontend controls data requirements
- **Versionless**: Schema evolution without breaking changes
- **Fewer Round Trips**: Related data in single request

### **Perfect for Learning**

- **Interactive Playground**: Apollo Sandbox for testing
- **Type Safety**: Catch errors at development time
- **Real-world Patterns**: Production-ready architecture
- **Modern Stack**: Current industry standards

## 🚀 Usage Examples

### **Adding a Product (Frontend)**

1. Fill out the "Add New Product" form
2. Click "Add Product" button
3. Product appears instantly in the grid below

### **GraphQL Query Example**

```graphql
query GetProducts {
  products {
    id
    title
    category
    price
    inStock
  }
}
```

### **GraphQL Mutation Example**

```graphql
mutation AddProduct(
  $title: String!
  $category: String!
  $price: Float!
  $inStock: Boolean!
) {
  addProduct(
    title: $title
    category: $category
    price: $price
    inStock: $inStock
  ) {
    id
    title
    category
    price
    inStock
  }
}
```

## 🛠️ Customization

### **Modify GraphQL Endpoint**

Edit the endpoint in `frontend/app.js`:

```javascript
this.client = new GraphQLClient("http://your-server:port/graphql");
```

### **Styling Changes**

All styles are in `frontend/styles.css` using:

- CSS Grid for responsive layouts
- Flexbox for component alignment
- CSS custom properties for theming
- Modern features (gradients, shadows, animations)

## 🔍 Troubleshooting

### **Connection Issues**

- Ensure GraphQL server is running on port 4000
- Check MongoDB connection string in .env
- Verify CORS is enabled (should work with included setup)

### **Frontend Issues**

- Open browser DevTools (F12) to check for errors
- Ensure all files are in the same directory
- Try different HTTP server options if one doesn't work

## 📚 Project Structure

```
nodejs with graphql/
├── src/
│   ├── graphql/
│   │   ├── schema.js      # GraphQL type definitions
│   │   └── resolvers.js   # Query/mutation logic
│   └── server.js          # Apollo Server setup
├── models/
│   └── product.js         # Mongoose product model
├── database/
│   └── connection.js      # MongoDB connection
├── frontend/
│   ├── index.html         # Frontend interface
│   ├── styles.css         # Modern CSS styling
│   └── app.js             # GraphQL client logic
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

This project serves as a comprehensive introduction to GraphQL development with a practical, real-world application that you can extend and customize for your own learning journey!
