export const getAllRegionsQuery = `
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
    ORDER BY
        region.id, city.id;
`;

export const getAppearanceByCityIdQuery = `
    SELECT  
        background,
        text,
        welcome,
        image 
    FROM 
        site_settings 
    WHERE 
        city_id = $1;
`;
