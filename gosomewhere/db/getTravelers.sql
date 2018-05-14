SELECT id, first_name, last_name
FROM users
FULL JOIN travelers
on users.id = travelers.traveler_id
WHERE travelers.trip_id = $1