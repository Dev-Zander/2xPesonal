INSERT into trips (trip_owner_id, trip_name, trip_country, trip_city, trip_state, trip_start, trip_end, trip_description)
Values ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;