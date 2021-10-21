UPDATE tasks
SET complete = $2
WHERE task_id = $1
RETURNING complete, title, description, due_date, task_priority, task_id, account_id;