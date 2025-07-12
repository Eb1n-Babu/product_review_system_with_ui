# Product Review System

A RESTful API built with Django and Django REST Framework for managing products and reviews.

## Features
- Admin users can create, update, and delete products.
- Regular users can submit one review per product (1-5 rating and feedback).
- All users can view products and aggregated ratings.
- Token-based authentication for secure access.

## Setup Instructions
1. Clone the repository: \`git clone <your-repo-url>\`
2. Install dependencies: \`pip install -r requirements.txt\`
3. Run migrations: \`python manage.py migrate\`
4. Create superuser: \`python manage.py createsuperuser\`
5. Run server: \`python manage.py runserver\`

## API Endpoints
See \`docs/API.md\` for detailed endpoint documentation.