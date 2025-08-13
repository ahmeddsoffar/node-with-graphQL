// GraphQL Products Manager - Frontend JavaScript

class GraphQLClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async query(query, variables = {}) {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (error) {
      console.error("GraphQL Error:", error);
      throw error;
    }
  }
}

class ProductsManager {
  constructor() {
    // Initialize GraphQL client (adjust URL if your server runs on different port)
    this.client = new GraphQLClient("http://localhost:4000/graphql");

    // Get DOM elements
    this.elements = {
      addForm: document.getElementById("addProductForm"),
      editForm: document.getElementById("editProductForm"),
      productsContainer: document.getElementById("productsContainer"),
      loading: document.getElementById("loading"),
      editModal: document.getElementById("editModal"),
      closeModal: document.getElementById("closeModal"),
      cancelEdit: document.getElementById("cancelEdit"),
      refreshBtn: document.getElementById("refreshBtn"),
      sortField: document.getElementById("sortField"),
      sortOrder: document.getElementById("sortOrder"),
      messagesContainer: document.getElementById("messages"),
    };

    this.initializeEventListeners();
    this.loadProducts();
  }

  initializeEventListeners() {
    // Add product form
    this.elements.addForm.addEventListener("submit", (e) =>
      this.handleAddProduct(e)
    );

    // Edit product form
    this.elements.editForm.addEventListener("submit", (e) =>
      this.handleEditProduct(e)
    );

    // Modal controls
    this.elements.closeModal.addEventListener("click", () =>
      this.closeEditModal()
    );
    this.elements.cancelEdit.addEventListener("click", () =>
      this.closeEditModal()
    );

    // Refresh button
    this.elements.refreshBtn.addEventListener("click", () =>
      this.loadProducts()
    );

    // Sort controls
    this.elements.sortField.addEventListener("change", () =>
      this.loadSortedProducts()
    );
    this.elements.sortOrder.addEventListener("change", () =>
      this.loadSortedProducts()
    );

    // Close modal when clicking outside
    this.elements.editModal.addEventListener("click", (e) => {
      if (e.target === this.elements.editModal) {
        this.closeEditModal();
      }
    });
  }

  showLoading(show = true) {
    if (show) {
      this.elements.loading.classList.remove("hidden");
      this.elements.productsContainer.style.opacity = "0.5";
    } else {
      this.elements.loading.classList.add("hidden");
      this.elements.productsContainer.style.opacity = "1";
    }
  }

  showMessage(message, type = "success") {
    const messageEl = document.createElement("div");
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;

    this.elements.messagesContainer.appendChild(messageEl);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 5000);
  }

  async loadProducts() {
    this.showLoading(true);

    try {
      const query = `
                query GetProducts {
                    products {
                        id
                        title
                        category
                        price
                        inStock
                    }
                }
            `;

      const data = await this.client.query(query);
      this.renderProducts(data.products);
    } catch (error) {
      this.showMessage(`Error loading products: ${error.message}`, "error");
      console.error("Error loading products:", error);
    } finally {
      this.showLoading(false);
    }
  }

  async loadSortedProducts() {
    this.showLoading(true);

    try {
      const field = this.elements.sortField.value;
      const order = this.elements.sortOrder.value;

      const query = `
                query GetSortedProducts($field: String!, $order: SortOrder) {
                    sortedProducts(field: $field, order: $order) {
                        id
                        title
                        category
                        price
                        inStock
                    }
                }
            `;

      const data = await this.client.query(query, { field, order });
      this.renderProducts(data.sortedProducts);
    } catch (error) {
      this.showMessage(
        `Error loading sorted products: ${error.message}`,
        "error"
      );
      console.error("Error loading sorted products:", error);
    } finally {
      this.showLoading(false);
    }
  }

  renderProducts(products) {
    if (!products || products.length === 0) {
      this.elements.productsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 20px; color: #ccc;"></i>
                    <h3>No products found</h3>
                    <p>Add your first product using the form above!</p>
                </div>
            `;
      return;
    }

    this.elements.productsContainer.innerHTML = products
      .map(
        (product) => `
            <div class="product-card" data-id="${product.id}">
                <h3 class="product-title">${this.escapeHtml(product.title)}</h3>
                <span class="product-category">${this.escapeHtml(
                  product.category
                )}</span>
                <div class="product-price">$${parseFloat(product.price).toFixed(
                  2
                )}</div>
                <div class="product-stock ${
                  product.inStock ? "stock-in" : "stock-out"
                }">
                    <i class="fas ${
                      product.inStock ? "fa-check-circle" : "fa-times-circle"
                    }"></i>
                    ${product.inStock ? "In Stock" : "Out of Stock"}
                </div>
                <div class="product-actions">
                    <button class="btn-edit" onclick="productsManager.openEditModal('${
                      product.id
                    }')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-danger" onclick="productsManager.deleteProduct('${
                      product.id
                    }')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  async handleAddProduct(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productData = {
      title: formData.get("title"),
      category: formData.get("category"),
      price: parseFloat(formData.get("price")),
      inStock: formData.get("inStock") === "true",
    };

    try {
      const mutation = `
                mutation AddProduct($title: String!, $category: String!, $price: Float!, $inStock: Boolean!) {
                    addProduct(title: $title, category: $category, price: $price, inStock: $inStock) {
                        id
                        title
                        category
                        price
                        inStock
                    }
                }
            `;

      await this.client.query(mutation, productData);
      this.showMessage("Product added successfully!");
      e.target.reset();
      this.loadProducts();
    } catch (error) {
      this.showMessage(`Error adding product: ${error.message}`, "error");
      console.error("Error adding product:", error);
    }
  }

  async openEditModal(productId) {
    try {
      const query = `
                query GetProduct($id: ID!) {
                    product(id: $id) {
                        id
                        title
                        category
                        price
                        inStock
                    }
                }
            `;

      const data = await this.client.query(query, { id: productId });
      const product = data.product;

      if (product) {
        document.getElementById("editId").value = product.id;
        document.getElementById("editTitle").value = product.title;
        document.getElementById("editCategory").value = product.category;
        document.getElementById("editPrice").value = product.price;
        document.getElementById("editInStock").value =
          product.inStock.toString();

        this.elements.editModal.classList.remove("hidden");
      }
    } catch (error) {
      this.showMessage(
        `Error loading product details: ${error.message}`,
        "error"
      );
      console.error("Error loading product details:", error);
    }
  }

  closeEditModal() {
    this.elements.editModal.classList.add("hidden");
    this.elements.editForm.reset();
  }

  async handleEditProduct(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productData = {
      id: formData.get("id"),
      title: formData.get("title"),
      category: formData.get("category"),
      price: parseFloat(formData.get("price")),
      inStock: formData.get("inStock") === "true",
    };

    try {
      const mutation = `
                mutation UpdateProduct($id: ID!, $title: String, $category: String, $price: Float, $inStock: Boolean) {
                    updateProduct(id: $id, title: $title, category: $category, price: $price, inStock: $inStock) {
                        id
                        title
                        category
                        price
                        inStock
                    }
                }
            `;

      await this.client.query(mutation, productData);
      this.showMessage("Product updated successfully!");
      this.closeEditModal();
      this.loadProducts();
    } catch (error) {
      this.showMessage(`Error updating product: ${error.message}`, "error");
      console.error("Error updating product:", error);
    }
  }

  async deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const mutation = `
                mutation DeleteProduct($id: ID!) {
                    deleteProduct(id: $id)
                }
            `;

      await this.client.query(mutation, { id: productId });
      this.showMessage("Product deleted successfully!");
      this.loadProducts();
    } catch (error) {
      this.showMessage(`Error deleting product: ${error.message}`, "error");
      console.error("Error deleting product:", error);
    }
  }

  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.productsManager = new ProductsManager();
});

// Handle connection errors gracefully
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  if (event.reason.message && event.reason.message.includes("fetch")) {
    document.getElementById("messages").innerHTML = `
            <div class="message error">
                <strong>Connection Error:</strong> Make sure your GraphQL server is running on http://localhost:4000
            </div>
        `;
  }
});
