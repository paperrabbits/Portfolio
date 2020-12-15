CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY, 
    email VARCHAR(250) NOT NULL, 
    password VARCHAR(250) NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    image TEXT NOT NULL, 
    description TEXT NOT NULL, 
    price DECIMAL NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE customer_cart (
    cart_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    paid BOOLEAN
);

CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES customer_cart(cart_id),
    product_id INT REFERENCES products(product_id),
    qty INT,
    price DECIMAL
);

CREATE TABLE wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id)
);

CREATE TABLE wishlist_items (
    wishlist_item_id SERIAL PRIMARY KEY,
    wishlist_id INT REFERENCES wishlist(wishlist_id),
    product_id INT REFERENCES products(product_id),
    price DECIMAL
);

    -- CREATE TABLE orders (
    --     order_id SERIAL PRIMARY KEY,
    --     customer_id INT REFERENCES customers(customer_id),
    --     product_id INT REFERENCES products(product_id),
    --     paid BOOLEAN,
    --     order_total DECIMAL NOT NULL,
    --     order_date DATE NOT NULL
    -- );