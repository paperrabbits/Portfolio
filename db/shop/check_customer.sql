SELECT * FROM customers c
JOIN customer_cart cc ON c.customer_id = cc.customer_id
JOIN wishlist w ON c.customer_id = w.customer_id
WHERE c.email = $1
AND cc.paid = false;