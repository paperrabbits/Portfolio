INSERT INTO customer_cart (customer_id, paid)
VALUES ($1, false)
RETURNING cart_id, paid;