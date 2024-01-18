export const getAllCitiesQuery = `
    SELECT
        city.id,
        city.name,
        region.name AS region,
        city_status.name AS status
    FROM
        city
    JOIN
        region ON city.region_id = region.id
    JOIN
        city_status ON city.status_id = city_status.id
    WHERE
        city.id IN (SELECT DISTINCT city_id FROM offices)
    ORDER BY
        region.id, city.id;
`;
