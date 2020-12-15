SELECT DISTINCT title FROM tasks
WHERE account_id = $1
ORDER BY title ASC;