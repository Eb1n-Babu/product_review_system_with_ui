Product Review System 🌟
Hey there! Welcome to the Product Review System, a beginner-friendly RESTful API built with Django and Django REST Framework (DRF), paired with a minimal frontend using Django templates! This project was crafted with guidance from Grok (created by xAI) and GitHub Copilot, along with API references, to ensure a robust and clear implementation. Whether you're new to coding or looking for a clean project to showcase, this offers an easy setup, organized code, a simple HTML/CSS/JavaScript frontend, and detailed Postman testing instructions. The Git commit history is tidy for smooth GitHub submission. Let’s get started! 😄

What’s This Project About?
This API and frontend let you manage products, post reviews, and handle user roles with ease. Here’s the overview:

Admins 👑 can create, update, or delete products via the API or frontend forms.
Regular users 👤 can browse products, submit one review per product (1-5 star rating with feedback), and view their reviews.
Everyone 🌍 (even without logging in) can view products and their average ratings.
Security 🔒 uses token-based authentication and CSRF protection for secure form submissions.
Frontend 🌐: A minimal, responsive interface with Django templates (base.html, index.html, product.html), styled with styles.css (optimized for smaller login fields) and powered by scripts.js (with input validation and CSRF handling).

Cool Features

Products: Include name, description, price, and auto-calculated average rating.
Reviews: Feature 1-5 star ratings and feedback, with a rule to prevent duplicate reviews per product.
User Roles: Supports admin and regular users via a profile system.
Data Goodies: Product listings display average ratings and review counts.
Frontend: Clean UI with login, product listing, review submission, and admin controls, enhanced with input validation to prevent errors.
RESTful Design: Follows best practices with robust error handling and validation.

The project is organized into three Django apps (products, reviews, users) for the backend, with templates/ and static/ directories for the frontend.

Project Structure
Here’s the layout of the project:
D:\x\product_review_system\
├── .gitignore              # 📜 Skips unnecessary files for Git
├── README.md               # 📖 You’re reading it!
├── requirements.txt        # 📋 Lists Python packages
├── templates/              # 🌐 Django templates
│   ├── base.html           # Base template with shared layout
│   ├── index.html          # Login and product list page (with CSRF tokens)
│   ├── product.html        # Product details and reviews page (with CSRF tokens)
├── static/                 # 🌐 Static files
│   ├── styles.css          # Minimal styling (optimized login form)
│   ├── scripts.js          # API interaction logic (with CSRF and validation)
├── product_review/         # 🏗 Main Django project folder
│   ├── __init__.py
│   ├── settings.py         # ⚙️ Project settings
│   ├── urls.py             # 🔗 URL routing
│   ├── wsgi.py             # 🌐 Web server setup
├── products/               # 🛍 Handles product management
│   ├── __init__.py
│   ├── apps.py             # ⚙️ App config
│   ├── migrations/         # 📅 Database migrations
│   ├── models.py           # 🗄 Product data structure
│   ├── permissions.py      # 🔐 Custom access rules
│   ├── serializers.py      # 📤 Converts data to JSON
│   ├── views.py            # 🖥 API logic for products
├── reviews/                # ⭐ Manages reviews
│   ├── __init__.py
│   ├── apps.py             # ⚙️ App config
│   ├── migrations/         # 📅 Database migrations
│   ├── models.py           # 🗄 Review data structure
│   ├── serializers.py      # 📤 Converts reviews to JSON
│   ├── views.py            # 🖥 API logic for reviews
├── users/                  # 👥 Manages user profiles
│   ├── __init__.py
│   ├── apps.py             # ⚙️ App config
│   ├── migrations/         # 📅 Database migrations
│   ├── models.py           # 🗄 User profile data
│   ├── serializers.py      # 📤 Converts user data to JSON
│   ├── views.py            # 🖥 API logic for profiles
├── docs/                   # 📚 Documentation
│   └── API.md              # 📝 Full API endpoint details


Getting Set Up
Follow these steps to get the project running locally:

Clone the Project 📥Grab the code from GitHub:
git clone https://github.com/your-username/product-review-system.git
cd D:\x\product_review_system

Replace your-username with your GitHub username.

Set Up a Virtual Environment 🐍Create and activate a virtual environment:
python -m venv venv
D:\x\product_review_system\venv\Scripts\activate

You’ll see (venv) in your terminal when active.

Install Dependencies 📦Install required packages:
pip install django==4.2.7 djangorestframework==3.14.0 django-cors-headers==3.13.0
pip freeze > requirements.txt


Configure Static Files and Templates 🌐Ensure product_review/settings.py points to templates and static files:
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

Run python manage.py collectstatic for production.

Set Up the Database 🗄Create database tables:
python manage.py makemigrations
python manage.py migrate


Create an Admin User 👑Create a superuser for admin access:
python manage.py createsuperuser

Enter a username, email, and password when prompted.

Start the Server 🌐Launch the development server:
python manage.py runserver

Access the API at http://127.0.0.1:8000 and the frontend at http://127.0.0.1:8000/ (home) or http://127.0.0.1:8000/product/?id=<product_id> (product details).

Use the Admin Panel 🖥  

Open http://127.0.0.1:8000/admin/ in your browser.
Log in with superuser credentials.
Add users (Users > Add user) and assign roles (User Profiles > Add user profile, set role to admin or regular).




API Endpoints
Here’s what the API offers! See docs/API.md for complete details.
Authentication 🔑

POST /api/token/Get a token for authenticated requests.  
Request: {"username": "string", "password": "string"}  
Response: {"token": "string"}  
Status Codes: 200 (success), 400 (invalid credentials)



Products 🛍

GET /api/products/List all products with average ratings and review counts.  
Response: List of {id, name, description, price, average_rating, review_count}  
Status Codes: 200 (success)


GET /api/products//Get details for a specific product.  
Response: {id, name, description, price, average_rating, review_count}  
Status Codes: 200 (success), 404 (not found)


POST /api/products/ (Admin Only)Create a new product.  
Request: {"name": "string", "description": "string", "price": number}  
Status Codes: 201 (created), 400 (invalid data), 401 (not logged in), 403 (not admin)


PUT /api/products// (Admin Only)Update a product.  
Request: {"name": "string", "description": "string", "price": number}  
Status Codes: 200 (success), 400 (invalid data), 401 (not logged in), 403 (not admin), 404 (not found)


DELETE /api/products// (Admin Only)Delete a product.  
Status Codes: 204 (success), 401 (not logged in), 403 (not admin), 404 (not found)



Reviews ⭐

GET /api/products//reviews/List all reviews for a product.  
Response: List of {id, product, user, rating, feedback, created_at}  
Status Codes: 200 (success), 404 (product not found)


POST /api/products//reviews/ (Authenticated Users)Submit a review (one per product per user).  
Request: {"rating": number (1-5), "feedback": "string"}  
Status Codes: 201 (created), 400 (invalid data or duplicate review), 401 (not logged in), 404 (product not found)


GET /api/products//reviews/my_reviews/ (Authenticated Users)List your own reviews.  
Response: List of your reviews  
Status Codes: 200 (success), 401 (not logged in)



User Profiles 👤

GET /api/profiles/ (Authenticated Users)View your user profile.  
Response: {user: {id, username, email}, role}  
Status Codes: 200 (success), 401 (not logged in)



Quick Notes 📝

Authentication: Use Authorization: Token <token> in headers for protected endpoints.
Admin Roles: Set via the Django admin panel.
No Duplicate Reviews: A unique_together constraint prevents multiple reviews per product.
Ratings: Average ratings are auto-calculated for products.
CSRF Protection: Forms include CSRF tokens, and scripts.js handles them for secure submissions.
Input Validation: Frontend validates inputs to prevent 400 Bad Request errors.


Frontend Overview 🌐
The frontend uses Django templates for a minimal, user-friendly interface:

Templates:
base.html: Shared layout with header and navigation.
index.html: Login form (optimized for smaller fields, with CSRF token) and product list with admin controls for creating products.
product.html: Product details, reviews, and review submission form (with CSRF token), with admin controls for editing/deleting products.


Static Files:
styles.css: Responsive styling with a blue-and-white theme, optimized for smaller login fields.
scripts.js: Handles API calls with fetch, includes CSRF token handling, and validates inputs to prevent errors.


Features:
Login/logout with token storage in localStorage.
Browse products with average ratings and review counts.
Submit reviews (authenticated users).
Create, update, and delete products (admin users only).


Access: Visit http://127.0.0.1:8000/ for the home page and http://127.0.0.1:8000/product/?id=<product_id> for product details.


Testing with Postman 🧪
Test the API using Postman (download from postman.com). Below are key test cases:

Get a Token 🔑  

Create a new request in Postman.  
Set Method: POST, URL: http://127.0.0.1:8000/api/token/.  
Go to Body tab, select raw, choose JSON, and enter:{
    "username": "your_username",
    "password": "your_password"
}


Click Send. Expect a 200 OK response:{
    "token": "your_token_here"
}


Copy the token for authenticated requests.


Create a Product (Admin) 🛍  

Create a new request.  
Set Method: POST, URL: http://127.0.0.1:8000/api/products/.  
Go to Headers tab and add:  
Authorization: Token your_token_here (replace with token from step 1)  
Content-Type: application/json


Go to Body tab, select raw, choose JSON, and enter:{
    "name": "Test Product",
    "description": "A test product",
    "price": 19.99
}


Click Send. Expect 201 Created (success) or 403 Forbidden (if not admin). Test invalid data (e.g., {"name": ""}) for 400 Bad Request.


Submit a Review (Regular User) ⭐  

Create a new request.  
Set Method: POST, URL: http://127.0.0.1:8000/api/products/<product_id>/reviews/ (replace <product_id> with a valid ID, e.g., 1).  
Go to Headers tab and add:  
Authorization: Token your_token_here  
Content-Type: application/json


Go to Body tab, select raw, choose JSON, and enter:{
    "rating": 5,
    "feedback": "Great product!"
}


Click Send. Expect 201 Created (success) or 400 Bad Request (if already reviewed or invalid rating).


List Products (Public) 🛍  

Create a new request.  
Set Method: GET, URL: http://127.0.0.1:8000/api/products/.  
No headers needed (public endpoint).  
Click Send. Expect 200 OK with a list of products, including average_rating and review_count.


Manage Users in the Admin Panel 🖥  

Open http://127.0.0.1:8000/admin/ in your browser.  
Log in with superuser credentials.  
Add users (Users > Add user) and assign roles (User Profiles > Add user profile, set role to admin or regular).  
Tip: Create an admin user for product management and a regular user for review testing.




Testing the Frontend 🖥
Test the frontend to verify functionality and error handling:

Login: Open http://127.0.0.1:8000/, enter superuser credentials, and submit. Try empty fields to confirm validation errors (e.g., "Username and password are required.").
Create Product: Log in as an admin, fill out the product creation form, and submit. Test invalid inputs (e.g., empty name, negative price) to verify error messages.
Submit Review: Log in as a regular user, visit http://127.0.0.1:8000/product/?id=1, and submit a review. Test invalid ratings (e.g., 0 or 6) to confirm validation.
Edit/Delete Product: As an admin, edit and delete a product. Verify redirects and confirmation prompts.
Check Console: Open Developer Tools (F12 > Console) to inspect errors during form submissions.


Updating to GitHub 📤
To update the project on GitHub with the latest fixes (CSRF handling and input validation), run these commands from the project directory:
git add static/scripts.js README.md
git commit -m "Add input validation to scripts.js to fix 400 Bad Request errors and update README"
git push origin main

Replace main with your branch name if different (e.g., master).If the repository isn’t set up, create one on GitHub and link it:
git remote add origin https://github.com/your-username/product-review-system.git


Why It’s Awesome 🌟

Product Management 🛍: Admins can add, edit, or delete products via the API or frontend. Everyone can browse products.  
Review System ⭐: Authenticated users can leave one 1-5 star review per product with feedback, with validation to prevent errors.  
User Roles 👥: Supports admin and regular users with token-based access.  
Frontend 🌐: Responsive Django templates with optimized login forms, CSRF protection, and client-side validation for robust error handling.  
Smart Data 📊: Product listings show auto-calculated average ratings and review counts.  
Secure 🔒: Uses tokens, role-based permissions, CSRF protection, and input validation.  
Error Handling ⚠️: Clear HTTP status codes (400 for invalid data, 401 for not logged in, 403 for unauthorized) and user-friendly frontend messages.


A Few Things to Know 📝

Secret Key 🔐: The SECRET_KEY in settings.py is for development. Generate a new one for production using a Django secret key tool.  
CORS 🌐: CORS_ALLOW_ALL_ORIGINS = True is suitable for testing but should be restricted in production (e.g., CORS_ALLOWED_ORIGINS = ["http://127.0.0.1:8000"]).  
Database 🗄: Uses SQLite for simplicity. Consider PostgreSQL for production.  
User Setup 👤: Create users and roles via the admin panel. A signup feature could be a fun addition!  
Git History 📜: Commits are clear and descriptive for easy review.  
Frontend Setup 🌐: Templates in templates/ and static files in static/ are served by Django. Run python manage.py collectstatic for production.  
CSRF Protection: Forms include {% csrf_token %} and scripts.js handles tokens for secure API requests.  
Input Validation: Client-side checks in scripts.js prevent 400 Bad Request errors by ensuring valid data.  
Resources Used 📚: Built with guidance from Grok (created by xAI), GitHub Copilot, and API references for a well-structured implementation.


What’s Inside? 📦
The requirements.txt includes:

django==4.2.7: Core framework for API and frontend.
djangorestframework==3.14.0: Powers the RESTful API.
django-cors-headers==3.13.0: Enables cross-origin requests during development.


Want to Add to It? 🤝
This project is a learning playground! Fork it, experiment, or submit pull requests with new features. Ideas include adding a user registration page or enhancing the frontend with advanced styling.

License 📜
This project is unlicensed and built for learning. Feel free to use or modify it for your own projects or studies.

Built with ❤️ by [Your Name] for [BackendEng Technical Assignment].📚 Check out docs/API.md for full API details. Happy coding! 🚀