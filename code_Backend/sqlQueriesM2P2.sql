select * from users;
select * from roles;
select * from user_roles;

select * from trips;
select * from destination;

select * from itineraries;
select * from itinerary_days;

-- trip linked with itinerary id
SELECT
    i.id AS itinerary_id,
    i.trip_id,
    d.id AS day_id,
    d.day_number,
    d.date,
    d.title,
    d.description
FROM itineraries i
JOIN itinerary_days d
    ON i.id = d.itinerary_id
ORDER BY i.trip_id, d.day_number;



-- // user link with trip linked with itinerary
SELECT
    u.id AS user_id,
    u.email,
    t.id AS trip_id,
    t.title AS trip_title,
    i.id AS itinerary_id,
    iday.id AS itinerary_day_id,
    iday.day_number
FROM users u
JOIN trips t
    ON t.user_id = u.id
JOIN itineraries i
    ON i.trip_id = t.id
JOIN itinerary_days iday
    ON iday.itinerary_id = i.id
ORDER BY u.id, t.id, i.id, iday.day_number;


select * from activities;
select * from activit;

