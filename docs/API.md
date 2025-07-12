# docs/API.md
# Product Review System API Documentation

## Authentication
- **POST /api/token/** - Obtain authentication token  
  - Request: `{ "username": "string", "password": "string" }`  
  - Response: `{ "token": "string" }`  
  - Status Codes: 200 (success), 400 (invalid credentials)

## Product Endpoints
- **GET /api/products/** - List all products  
  - Response: List of products with id, name, description, price, average_rating, review_count  
  - Status Codes: 200 (success)

- **GET /api/products/<id>/** - Get product details  
  - Response: Product details with id, name, description, price, average_rating, review_count  
  - Status Codes: 200 (success), 404 (not found)

- **POST /api/products/** - Create product (admin only)  
  - Request: `{ "name": "string", "description": "string", "price": number }`  
  - Status Codes: 201 (created), 400 (invalid data), 401 (unauthenticated), 403 (not admin)

- **PUT /api/products/<id>/** - Update product (admin only)  
  - Request: `{ "name": "string", "description": "string", "price": number }`  
  - Status Codes: 200 (success), 400 (invalid data), 401 (unauthenticated), 403 (not admin), 404 (not found)

- **DELETE /api/products/<id>/** - Delete product (admin only)  
  - Status Codes: 204 (success), 401 (unauthenticated), 403 (not admin), 404 (not found)

## Review Endpoints
- **GET /api/products/<product_id>/reviews/** - List reviews for a product  
  - Response: List of reviews with id, product, user, rating, feedback, created_at  
  - Status Codes: 200 (success), 404 (product not found)

- **POST /api/products/<product_id>/reviews/** - Create review (authenticated users)  
  - Request: `{ "rating": number (1-5), "feedback": "string" }`  
  - Status Codes: 201 (created), 400 (invalid data or duplicate review), 401 (unauthenticated), 404 (product not found)

- **GET /api/products/<product_id>/reviews/my_reviews/** - List user's reviews  
  - Response: List of user's reviews  
  - Status Codes: 200 (success), 401 (unauthenticated)

## Profile Endpoints
- **GET /api/profiles/** - Get user profile (authenticated users)  
  - Response: User profile with user details and role  
  - Status Codes: 200 (success), 401 (unauthenticated)

## Notes
- Use Token Authentication: Include `Authorization: Token <token>` in headers  
- Admin users are assigned via Django admin panel  
- Regular users are created via Django admin or registration (not implemented in this version)  
- Duplicate reviews are prevented by unique_together constraint  
- Average ratings are calculated automatically in product responses