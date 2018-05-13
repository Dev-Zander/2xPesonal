SELECT * 
FROM users
WHERE auth_id = $1 OR email = $1
