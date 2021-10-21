INSERT INTO tasks (user_id, title, description, task_date, complete, task_label)
VALUES ($1, $2, $3, $4, false, $5)
RETURNING task_id, user_id, title, description, task_date, complete, task_label;