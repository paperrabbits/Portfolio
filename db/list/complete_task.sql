UPDATE tasks
SET complete = $2
WHERE task_id = $1;