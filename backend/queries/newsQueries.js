export const getNewsByPageQuery = `
    SELECT 
        news.id,
        news.title, 
        news.publish_date
    FROM 
        news
    ORDER BY 
        news.publish_date DESC
    LIMIT $1
    OFFSET $2;
`;

export const getTotalNewsCountQuery = `
    SELECT COUNT(*) AS total_count FROM news;
`;

export const getFeaturedNewsQuery = `
    SELECT 
        news.id,
        news.title, 
        news.publish_date
    FROM 
        news
    WHERE 
        news.is_important = true 
    LIMIT 1;
`;

export const getNewsByIdQuery = `
    SELECT 
        news.id,
        news.title, 
        news.content,
        news.publish_date
    FROM 
        news
    WHERE
        news.id = $1;
`;
