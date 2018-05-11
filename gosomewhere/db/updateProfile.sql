UPDATE users
SET first_name = $2, last_name = $3, email = $4 , airport_code = $5, google_pay = $6, apple_pay = $7, zelle = $8, venmo = $9
WHERE id = $1
