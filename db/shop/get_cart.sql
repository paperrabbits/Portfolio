SELECT * FROM cart_items ci
JOIN products p ON ci.product_id = p.product_id
WHERE ci.cart_id = $1;