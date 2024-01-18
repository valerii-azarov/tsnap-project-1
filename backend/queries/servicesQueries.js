export const getPopularServicesQuery = `
    WITH popularServices AS (
        SELECT
            services.id,
            services.name,
            COUNT(booking.id) AS count
        FROM
            services
        LEFT JOIN booking ON services.id = booking.service_id
        GROUP BY
            services.id
        ORDER BY
            count DESC
        LIMIT 10
    )
      
    SELECT 
        id, 
        name, 
        COALESCE(count, 0) AS count
    FROM 
        popularServices
    ORDER BY
        count DESC, name ASC;
`;

export const getServicesByCategoryIdQuery = `
    SELECT * FROM services WHERE category_id = $1;
`;

export const getServiceInfoByServiceTypeIdQuery = `
    SELECT 
        service_info.id,
        types.name,
        service_info.description,
        service_info.required_documents,
        service_info.regulatory_documents,
        service_info.delivery_time,
        price.name AS price
    FROM 
        service_info
    JOIN 
        price ON service_info.price_id = price.id
    JOIN 
        types ON service_info.service_type_id = types.id
    WHERE 
        service_info.service_type_id = $1;
`;
