// static/scripts.js
const API_BASE_URL = 'http://127.0.0.1:8000/api/';
const token = localStorage.getItem('token');
const userRole = localStorage.getItem('role');

async function apiRequest(url, method = 'GET', data = null, formId = null) {
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
    };

    // Include CSRF token for POST, PUT, DELETE requests
    if (['POST', 'PUT', 'DELETE'].includes(method) && formId) {
        const form = document.getElementById(formId);
        const csrfToken = form?.querySelector('input[name="csrfmiddlewaretoken"]')?.value;
        if (!csrfToken) {
            throw new Error('CSRF token missing');
        }
        headers['X-CSRFToken'] = csrfToken;
    }

    const options = {
        method,
        headers,
    };
    if (data) options.body = JSON.stringify(data);
    const response = await fetch(`${API_BASE_URL}${url}`, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || JSON.stringify(error) || response.statusText);
    }
    return response.status === 204 ? {} : response.json();
}

async function loadUserInfo() {
    const userInfoDiv = document.getElementById('user-info');
    if (token) {
        try {
            const profile = await apiRequest('profiles/');
            const user = profile[0]?.user;
            const role = profile[0]?.role;
            localStorage.setItem('role', role);
            userInfoDiv.textContent = `Logged in as: ${user.username} (${role})`;
            document.getElementById('logout-btn').style.display = 'block';
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('products-section').style.display = 'block';
            if (role === 'admin') {
                document.getElementById('admin-controls').style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.reload();
        }
    }
}

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if (!username || !password) {
        document.getElementById('login-error').textContent = 'Username and password are required.';
        return;
    }
    try {
        const data = await apiRequest('token/', 'POST', { username, password }, 'login-form');
        localStorage.setItem('token', data.token);
        document.getElementById('login-error').textContent = '';
        window.location.reload();
    } catch (error) {
        document.getElementById('login-error').textContent = error.message;
    }
});

document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
});

async function loadProducts() {
    const productList = document.getElementById('product-list');
    try {
        const products = await apiRequest('products/');
        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Average Rating: ${product.average_rating || 'No reviews'}</p>
                <p>Reviews: ${product.review_count}</p>
                <a href="/product/?id=${product.id}">View Details</a>
            </div>
        `).join('');
    } catch (error) {
        productList.innerHTML = `<p class="error">Error loading products: ${error.message}</p>`;
    }
}

document.getElementById('create-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    if (!name || !description || isNaN(price) || price <= 0) {
        document.getElementById('create-product-error').textContent = 'Name, description, and a valid price are required.';
        return;
    }
    try {
        await apiRequest('products/', 'POST', { name, description, price }, 'create-product-form');
        document.getElementById('create-product-error').textContent = 'Product created!';
        document.getElementById('create-product-form').reset();
        loadProducts();
    } catch (error) {
        document.getElementById('create-product-error').textContent = error.message;
    }
});

async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (!productId) {
        document.getElementById('product-details').innerHTML = '<p class="error">Product ID missing.</p>';
        return;
    }
    try {
        const product = await apiRequest(`products/${productId}/`);
        document.getElementById('product-details').innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Average Rating: ${product.average_rating || 'No reviews'}</p>
            <p>Reviews: ${product.review_count}</p>
        `;
        const reviews = await apiRequest(`products/${productId}/reviews/`);
        document.getElementById('review-list').innerHTML = reviews.map(review => `
            <div class="review-card">
                <p><strong>${review.user}</strong>: ${review.rating}/5</p>
                <p>${review.feedback}</p>
                <p>Posted on: ${new Date(review.created_at).toLocaleDateString()}</p>
            </div>
        `).join('');
        if (userRole === 'admin') {
            document.getElementById('admin-controls').style.display = 'block';
            document.getElementById('edit-name').value = product.name;
            document.getElementById('edit-description').value = product.description;
            document.getElementById('edit-price').value = product.price;
        }
    } catch (error) {
        document.getElementById('product-details').innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

document.getElementById('review-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const rating = parseInt(document.getElementById('rating').value);
    const feedback = document.getElementById('feedback').value.trim();
    if (!productId) {
        document.getElementById('review-error').textContent = 'Product ID missing.';
        return;
    }
    if (!feedback || isNaN(rating) || rating < 1 || rating > 5) {
        document.getElementById('review-error').textContent = 'Valid rating (1-5) and feedback are required.';
        return;
    }
    try {
        await apiRequest(`products/${productId}/reviews/`, 'POST', { rating, feedback }, 'review-form');
        document.getElementById('review-error').textContent = 'Review submitted!';
        document.getElementById('review-form').reset();
        loadProductDetails();
    } catch (error) {
        document.getElementById('review-error').textContent = error.message;
    }
});

document.getElementById('edit-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const name = document.getElementById('edit-name').value.trim();
    const description = document.getElementById('edit-description').value.trim();
    const price = parseFloat(document.getElementById('edit-price').value);
    if (!productId) {
        document.getElementById('edit-product-error').textContent = 'Product ID missing.';
        return;
    }
    if (!name || !description || isNaN(price) || price <= 0) {
        document.getElementById('edit-product-error').textContent = 'Name, description, and a valid price are required.';
        return;
    }
    try {
        await apiRequest(`products/${productId}/`, 'PUT', { name, description, price }, 'edit-product-form');
        document.getElementById('edit-product-error').textContent = 'Product updated!';
        loadProductDetails();
    } catch (error) {
        document.getElementById('edit-product-error').textContent = error.message;
    }
});

document.getElementById('delete-product-btn')?.addEventListener('click', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (!productId) {
        document.getElementById('edit-product-error').textContent = 'Product ID missing.';
        return;
    }
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    try {
        await apiRequest(`products/${productId}/`, 'DELETE', null, 'edit-product-form');
        window.location.href = '/';
    } catch (error) {
        document.getElementById('edit-product-error').textContent = error.message;
    }
});

if (window.location.pathname.includes('index') || window.location.pathname === '/') {
    loadUserInfo();
    loadProducts();
} else if (window.location.pathname.includes('product')) {
    loadUserInfo();
    loadProductDetails();
}