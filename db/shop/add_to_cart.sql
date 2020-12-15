INSERT INTO cart_items (cart_id, product_id, qty, price)
VALUES ($1, $2, 1, $3)
RETURNING cart_id, price;