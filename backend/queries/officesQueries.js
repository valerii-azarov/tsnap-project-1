export const getAllOfficesByCityIdQuery = `
    SELECT
        offices.id,
        offices.name,
        offices.address,
        city.name AS city,
        office_status.name AS status
    FROM
        offices
    JOIN
        city ON offices.city_id = city.id
    JOIN
        office_status ON offices.status_id = office_status.id
    WHERE
        offices.city_id = $1;
`;
