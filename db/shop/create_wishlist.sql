INSERT INTO wishlist (customer_id)
VALUES ($1)
RETURNING wishlist_id;