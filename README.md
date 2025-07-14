# Express.js RESTful API

This project implements a RESTful API for managing products using Express.js.

## Setup

1.  **Node.js Installation**: Ensure you have Node.js (v18 or higher recommended) installed.
2.  **Clone the repository**:
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd express-api-project
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Run the server**:
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000`.

## API Endpoints

### Products

**Base URL**: `/api/products`

#### `GET /api/products`

-   **Description**: List all products. Supports filtering, pagination, and search.
-   **Query Parameters**:
    -   `category`: Filter products by category (e.g., `/api/products?category=Electronics`)
    -   `search`: Search products by name (e.g., `/api/products?search=laptop`)
    -   `page`: Page number for pagination (e.g., `/api/products?page=1`)
    -   `limit`: Number of items per page for pagination (e.g., `/api/products?limit=5`)
-   **Authentication**: Requires `x-api-key` header.
-   **Example Request**:
    ```bash
    curl -H "x-api-key: your-secret-api-key" http://localhost:3000/api/products?category=Electronics&page=1&limit=2
    ```
-   **Example Response**:
    ```json
    {
      "products": [
        {
          "id": "<uuid>",
          "name": "Laptop",
          "description": "Powerful laptop for work and gaming",
          "price": 1200,
          "category": "Electronics",
          "inStock": true
        },
        {
          "id": "<uuid>",
          "name": "Mouse",
          "description": "Wireless mouse with ergonomic design",
          "price": 25,
          "category": "Electronics",
          "inStock": true
        }
      ],
      "next": {
        "page": 2,
        "limit": 2
      }
    }
    ```

#### `GET /api/products/:id`

-   **Description**: Get a specific product by ID.
-   **Authentication**: Requires `x-api-key` header.
-   **Example Request**:
    ```bash
    curl -H "x-api-key: your-secret-api-key" http://localhost:3000/api/products/<product_id>
    ```
-   **Example Response**:
    ```json
    {
      "id": "<uuid>",
      "name": "Laptop",
      "description": "Powerful laptop for work and gaming",
      "price": 1200,
      "category": "Electronics",
      "inStock": true
    }
    ```

#### `POST /api/products`

-   **Description**: Create a new product.
-   **Authentication**: Requires `x-api-key` header.
-   **Request Body**:
    ```json
    {
      "name": "New Product",
      "description": "Description of new product",
      "price": 99.99,
      "category": "Category Name",
      "inStock": true
    }
    ```
-   **Example Request**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "x-api-key: your-secret-api-key" -d '{"name": "Tablet", "description": "Portable computing device", "price": 300, "category": "Electronics", "inStock": true}' http://localhost:3000/api/products
    ```
-   **Example Response**:
    ```json
    {
      "id": "<uuid>",
      "name": "Tablet",
      "description": "Portable computing device",
      "price": 300,
      "category": "Electronics",
      "inStock": true
    }
    ```

#### `PUT /api/products/:id`

-   **Description**: Update an existing product.
-   **Authentication**: Requires `x-api-key` header.
-   **Request Body**:
    ```json
    {
      "price": 350,
      "inStock": false
    }
    ```
-   **Example Request**:
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "x-api-key: your-secret-api-key" -d '{"price": 350, "inStock": false}' http://localhost:3000/api/products/<product_id>
    ```
-   **Example Response**:
    ```json
    {
      "id": "<uuid>",
      "name": "Tablet",
      "description": "Portable computing device",
      "price": 350,
      "category": "Electronics",
      "inStock": false
    }
    ```

#### `DELETE /api/products/:id`

-   **Description**: Delete a product.
-   **Authentication**: Requires `x-api-key` header.
-   **Example Request**:
    ```bash
    curl -X DELETE -H "x-api-key: your-secret-api-key" http://localhost:3000/api/products/<product_id>
    ```
-   **Example Response**: (No Content) `HTTP 204`

#### `GET /api/products/stats/category`

-   **Description**: Get product statistics by category.
-   **Authentication**: Requires `x-api-key` header.
-   **Example Request**:
    ```bash
    curl -H "x-api-key: your-secret-api-key" http://localhost:3000/api/products/stats/category
    ```
-   **Example Response**:
    ```json
    {
      "Electronics": 4,
      "Furniture": 1,
      "Stationery": 2
    }
    ```

## Environment Variables

Create a `.env` file in the root directory of the project based on `.env.example`.

## Testing

You can use tools like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or `curl` to test the API endpoints.

