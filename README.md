Product Review System 🌟

Hey there! Welcome to the Product Review System, a beginner-friendly RESTful API built with Django and Django REST Framework (DRF). I created this project with help from Grok (created by xAI), GitHub Copilot, and various API references to guide the development process. Whether you’re new to coding or want a clean project to show off, this one’s got an easy setup, organized code, and clear Postman testing instructions. Plus, it has a tidy Git commit history for smooth GitHub submission. Let’s dive in! 😄



What’s This Project About?

This API lets you manage products, post reviews, and handle user roles like a pro. Here’s the rundown:



Admins 👑 can create, update, or delete products.

Regular users 👤 can browse products, leave one review per product (with a 1-5 star rating and feedback), and view their own reviews.

Everyone 🌍 (even without logging in) can check out products and their average ratings.

Security 🔒 uses token-based authentication to keep actions like posting reviews or managing products secure.



Cool Features



Products: Include name, description, price, and an auto-calculated average rating.

Reviews: Have a 1-5 star rating and feedback, with a rule to prevent multiple reviews per product by the same user.

User Roles: Supports admin and regular users via a simple profile system.

Data Goodies: Product listings show average ratings and review counts.

RESTful Design: Follows best practices with solid error handling and input validation.



The project is split into three Django apps (products, reviews, users) to keep things neat and modular.



Project Structure

Here’s how everything’s organized:

product\_review\_system/

├── .gitignore              # 📜 Skips unnecessary files for Git

├── README.md               # 📖 You’re reading it!

├── requirements.txt        # 📋 Lists Python packages

├── product\_review/         # 🏗 Main Django project folder

│   ├── \_\_init\_\_.py

│   ├── settings.py         # ⚙️ Project settings

│   ├── urls.py             # 🔗 URL routing

│   ├── wsgi.py             # 🌐 Web server setup

├── products/               # 🛍 Handles product stuff

│   ├── \_\_init\_\_.py

│   ├── apps.py             # ⚙️ App config

│   ├── migrations/         # 📅 Database migrations

│   ├── models.py           # 🗄 Product data structure

│   ├── permissions.py      # 🔐 Custom access rules

│   ├── serializers.py      # 📤 Converts data to JSON

│   ├── views.py            # 🖥 API logic for products

├── reviews/                # ⭐ Manages reviews

│   ├── \_\_init\_\_.py

│   ├── apps.py             # ⚙️ App config

│   ├── migrations/         # 📅 Database migrations

│   ├── models.py           # 🗄 Review data structure

│   ├── serializers.py      # 📤 Converts reviews to JSON

│   ├── views.py            # 🖥 API logic for reviews

├── users/                  # 👥 Manages user profiles

│   ├── \_\_init\_\_.py

│   ├── apps.py             # ⚙️ App config

│   ├── migrations/         # 📅 Database migrations

│   ├── models.py           # 🗄 User profile data

│   ├── serializers.py      # 📤 Converts user data to JSON

│   ├── views.py            # 🖥 API logic for profiles

├── docs/                   # 📚 Documentation

│   └── API.md              # 📝 Full API endpoint details





Getting Set Up

Ready to get this running? Follow these steps, and you’ll be ready in no time:



Clone the Project 📥Grab the code from GitHub:

git clone https://github.com/your-username/product-review-system.git

cd product\_review\_system



Replace your-username with your GitHub username.



Set Up a Virtual Environment 🐍Keep things clean with a virtual environment:

python -m venv venv

source venv/bin/activate  # On Windows: venv\\Scripts\\activate



You’ll see (venv) in your terminal when it’s active.



Install Dependencies 📦Install the required packages:

pip install django==4.2.7 djangorestframework==3.14.0 django-cors-headers==3.13.0

pip freeze > requirements.txt





Set Up the Database 🗄Create the database tables:

python manage.py makemigrations

python manage.py migrate





Create an Admin User 👑Make a superuser to manage the app:

python manage.py createsuperuser



Enter a username, email, and password when prompted.



Start the Server 🌐Launch the development server:

python manage.py runserver



The API will be live at http://127.0.0.1:8000.



Use the Admin Panel 🖥  



Open http://127.0.0.1:8000/admin/ in your browser.

Log in with your superuser credentials.

Add users (Users > Add user) and assign roles (User Profiles > Add user profile, set role to admin or regular).









API Endpoints

Here’s what the API can do! Check docs/API.md for the full details.

Authentication 🔑



POST /api/token/Get a token for authenticated requests.  

Request: {"username": "string", "password": "string"}  

Response: {"token": "string"}  

Status Codes: 200 (success), 400 (wrong credentials)







Products 🛍



GET /api/products/List all products with average ratings and review counts.  

Response: List of {id, name, description, price, average\_rating, review\_count}  

Status Codes: 200 (success)





GET /api/products//Get details for a specific product.  

Response: {id, name, description, price, average\_rating, review\_count}  

Status Codes: 200 (success), 404 (not found)





POST /api/products/ (Admin Only)Create a new product.  

Request: {"name": "string", "description": "string", "price": number}  

Status Codes: 201 (created), 400 (bad data), 401 (not logged in), 403 (not admin)





PUT /api/products// (Admin Only)Update a product.  

Request: {"name": "string", "description": "string", "price": number}  

Status Codes: 200 (success), 400 (bad data), 401 (not logged in), 403 (not admin), 404 (not found)





DELETE /api/products// (Admin Only)Delete a product.  

Status Codes: 204 (success), 401 (not logged in), 403 (not admin), 404 (not found)







Reviews ⭐



GET /api/products//reviews/List all reviews for a product.  

Response: List of {id, product, user, rating, feedback, created\_at}  

Status Codes: 200 (success), 404 (product not found)





POST /api/products//reviews/ (Authenticated Users)Submit a review (one per product per user).  

Request: {"rating": number (1-5), "feedback": "string"}  

Status Codes: 201 (created), 400 (bad data or already reviewed), 401 (not logged in), 404 (product not found)





GET /api/products//reviews/my\_reviews/ (Authenticated Users)List your own reviews.  

Response: List of your reviews  

Status Codes: 200 (success), 401 (not logged in)







User Profiles 👤



GET /api/profiles/ (Authenticated Users)View your user profile.  

Response: {user: {id, username, email}, role}  

Status Codes: 200 (success), 401 (not logged in)







Quick Notes 📝



Authentication: Use Authorization: Token <token> in headers for protected endpoints.

Admin Roles: Set via the Django admin panel.

No Duplicate Reviews: A unique\_together rule prevents multiple reviews per product.

Ratings: Average ratings are auto-calculated for products.





Testing with Postman 🧪

Let’s test the API with Postman! Download it from postman.com if you haven’t already. Below are the exact test cases you provided, set up for Postman with clear instructions.



Get a Token 🔑  



Open Postman and click New > HTTP Request.  

Set Method: POST, URL: http://127.0.0.1:8000/api/token/.  

Go to Body tab, select raw, choose JSON, and paste:{

&nbsp;   "username": "your\_username",

&nbsp;   "password": "your\_password"

}





Hit Send. You’ll get a 200 OK response like:{

&nbsp;   "token": "your\_token\_here"

}





Copy the token for authenticated requests (use it in the Authorization header).





Create a Product (Admin) 🛍  



Create a new request.  

Set Method: POST, URL: http://127.0.0.1:8000/api/products/.  

Go to Headers tab and add:  

Authorization: Token your\_token\_here (replace your\_token\_here with the token from step 1)  

Content-Type: application/json





Go to Body tab, select raw, choose JSON, and paste:{

&nbsp;   "name": "Test Product",

&nbsp;   "description": "A test product",

&nbsp;   "price": 19.99

}





Hit Send. Expect 201 Created (success) or 403 Forbidden (if not an admin).





Submit a Review (Regular User) ⭐  



Create a new request.  

Set Method: POST, URL: http://127.0.0.1:8000/api/products/<product\_id>/reviews/ (replace <product\_id> with a valid product ID, like 1).  

Go to Headers tab and add:  

Authorization: Token your\_token\_here (use the token from step 1)  

Content-Type: application/json





Go to Body tab, select raw, choose JSON, and paste:{

&nbsp;   "rating": 5,

&nbsp;   "feedback": "Great product!"

}





Hit Send. Expect 201 Created (success) or 400 Bad Request (if you’ve already reviewed this product).





List Products (Public) 🛍  



Create a new request.  

Set Method: GET, URL: http://127.0.0.1:8000/api/products/.  

No headers needed (it’s public!).  

Hit Send. Expect 200 OK with a list of products, including average\_rating and review\_count.





Manage Users in the Admin Panel 🖥  



Open http://127.0.0.1:8000/admin/ in your browser.  

Log in with your superuser credentials.  

Add users (Users > Add user) and assign roles (User Profiles > Add user profile, set role to admin or regular).  

Tip: Create an admin user for product creation and a regular user for review testing.









Why It’s Awesome 🌟



Product Management 🛍: Admins can add, edit, or remove products via the API or admin panel. Everyone can browse products.  

Review System ⭐: Authenticated users can leave one 1-5 star review per product with feedback. No duplicates allowed!  

User Roles 👥: Supports admin and regular users with token-based access.  

Smart Data 📊: Product listings show auto-calculated average ratings and review counts.  

Secure 🔒: Uses tokens, role-based permissions, and input validation.  

Error Handling ⚠️: Returns clear HTTP status codes (400 for bad data, 401 for not logged in, 403 for unauthorized).





A Few Things to Know 📝



Secret Key 🔐: The SECRET\_KEY in settings.py is for development. For production, generate a new one with a Django secret key tool.  

CORS 🌐: CORS\_ALLOW\_ALL\_ORIGINS = True is fine for testing but should be locked down to specific domains in production.  

Database 🗄: Uses SQLite for simplicity. For a real app, consider PostgreSQL.  

User Setup 👤: Create users and roles via the admin panel. A signup feature could be a fun next step!  

Git History 📜: Every step is committed with clear messages, making it easy for reviewers to follow along.

Resources Used 📚: This project was built with guidance from Grok (created by xAI), GitHub Copilot, and various API references to ensure a robust and well-structured implementation.





What’s Inside? 📦

The requirements.txt includes:



django==4.2.7: The backbone for the API.

djangorestframework==3.14.0: Makes RESTful APIs a breeze.

django-cors-headers==3.13.0: Allows cross-origin requests during development.





Want to Add to It? 🤝

This project is a learning playground! Fork it, play around, or send pull requests with your cool ideas.



License 📜

This project is unlicensed and built for learning. Feel free to use or modify it for your own projects or studies.



Built with ❤️ by \[Your Name] for \[Course/Submission Name].📚 Check out docs/API.md for the full API details. Happy coding! 🚀

