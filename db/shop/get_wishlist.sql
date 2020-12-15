SELECT * FROM wishlist_items wi
JOIN products p ON wi.product_id = p.product_id
WHERE wi.wishlist_id = $1;