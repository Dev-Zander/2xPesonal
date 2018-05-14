DELETE FROM travelers
WHERE trip_id = $1;
DELETE FROM trips
WHERE id = $1;