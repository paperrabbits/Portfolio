INSERT INTO wishlist_items (wishlist_id, product_id, price)
VALUES ($1, $2, $3)
RETURNING wishlist_id, product_id;