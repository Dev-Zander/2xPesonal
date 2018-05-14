UPDATE trips
SET trip_name = $2, trip_country = $3, trip_city = $4, trip_state = $5, trip_start = $6, trip_end = $7, trip_description = $8
WHERE id = $1
Returning *