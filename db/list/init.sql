CREATE TABLE list_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(150),
    password VARCHAR(150)
);

CREATE TABLE list_accounts (
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES list_users(user_id)
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES list_accounts(account_id),
    title TEXT,
    description VARCHAR(100),
    due_date DATE,
    task_priority INTEGER,
    complete BOOLEAN
);

CREATE TABLE task_labels (
    label_id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(task_id)
);