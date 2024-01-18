export const getScheduleDateAndTimeQuery = `
    SELECT date, time FROM schedule WHERE id = $1;
`;

export const getScheduleBookingDetailsQuery  = `
    SELECT
        booking.id,
        booking_status.name AS status,
        category.name AS category,
        service.name AS service,
        service_type.name AS service_type,
        schedule.date AS date,
        schedule.time AS time,
        city.name AS city,
        offices.address AS address,
        region.name AS region
    FROM
        schedule
    LEFT JOIN
        booking ON schedule.booking_id = booking.id
    LEFT JOIN
        offices ON schedule.office_id = offices.id
    LEFT JOIN
        city ON offices.city_id = city.id
    LEFT JOIN
        region ON city.region_id = region.id
    LEFT JOIN
        categories AS category ON booking.category_id = category.id
    LEFT JOIN
        services AS service ON booking.service_id = service.id
    LEFT JOIN
        types AS service_type ON booking.service_type_id = service_type.id
    LEFT JOIN
        booking_status ON booking.booking_status_id = booking_status.id
    WHERE
        booking.id = $1 OR booking.phone = $2;
`;

export const getScheduleAvailabilityQuery  = `
    SELECT availability FROM schedule WHERE id = $1;
`;

export const insertBookingQuery = `
    INSERT INTO booking (surname, name, patronymic, phone, category_id, service_id, service_type_id, booking_status_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
`;

export const updateScheduleAvailabilityToFalseQuery  = `
    UPDATE schedule SET availability = FALSE WHERE id = $1;
`;

export const updateScheduleAvailabilityToFalseAndBookingIdQuery = `
    UPDATE schedule SET availability = FALSE, booking_id = $1 WHERE id = $2;
`;