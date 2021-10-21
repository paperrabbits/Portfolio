CREATE TABLE list_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(150),
    password VARCHAR(150)
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES list_users(user_id),
    title TEXT,
    description VARCHAR(100),
    task_date DATE,
    complete BOOLEAN,
    task_label TEXT
);

    -- INSERT INTO tasks (account_id, title, description, due_date, complete)
    -- VALUES ($1, $2, $3, $4, $5, false)
    -- RETURNING task_id, account_id, title, description, due_date, task_priority, complete;

CREATE TABLE list_accounts (
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES list_users(user_id)
);

CREATE TABLE list_items (
    list_item_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES list_accounts(account_id),
    task_id INT REFERENCES tasks(task_id),
    qty INT
);