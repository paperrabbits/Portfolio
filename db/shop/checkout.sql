UPDATE customer_cart
SET paid = true
WHERE customer_id = $1
AND paid = false;