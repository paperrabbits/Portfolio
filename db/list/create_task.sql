INSERT INTO tasks (account_id, title, description, due_date, task_priority, complete)
VALUES ($1, $2, $3, $4, $5, false)
RETURNING task_id, account_id, title, description, due_date, task_priority, complete;