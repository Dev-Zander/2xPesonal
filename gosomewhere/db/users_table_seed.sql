CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
user_name VARCHAR(180),
auth_id TEXT,
fist_name VARCHAR(25),
last_name VARCHAR(25),
phone_number BIGINT,
airport_code VARCHAR(3),
google_pay BOOL,
apple_paycash BOOL,
zelle BOOL,
venmo BOOL
)