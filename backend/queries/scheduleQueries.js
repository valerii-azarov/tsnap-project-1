export const getIntervalsQuery = `
    SELECT * FROM intervals;
`;

export const hasRecordsForDateQuery = `
    SELECT COUNT(*) FROM schedule WHERE date = $1 AND office_id = $2 AND service_id = $3;
`;

export const insertScheduleRecordQuery = `
    INSERT INTO schedule (service_id, date, time, booking_id, availability, office_id) 
    VALUES ($1, $2, $3, $4, $5, $6);
`;

export const getAvailableScheduleRecordsQuery = `
    SELECT * FROM schedule WHERE availability = true;
`;

export const updateAvailabilityStatusQuery = `
    UPDATE schedule SET availability = false WHERE id = $1;
`;

export const getScheduleByOfficeIdAndServiceIdQuery = `
    SELECT 
        id,
        date, 
        time, 
        availability
    FROM 
        schedule 
    WHERE 
        office_id = $1 AND service_id = $2
    AND 
        date BETWEEN date_trunc('week', NOW()) AND (date_trunc('week', NOW()) + INTERVAL '6 days')
    ORDER BY 
        date, time;
`;
