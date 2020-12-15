INSERT INTO customers (email, password)
VALUES ($1, $2)
returning customer_id, email;