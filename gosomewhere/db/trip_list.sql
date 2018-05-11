SELECT id, trip_name, trip_city, trip_start, trip_end, traveler_id
from trips
FULL JOIN travelers
on trips.id = travelers.trip_id
WHERE traveler_id = $1