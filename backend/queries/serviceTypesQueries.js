export const getServiceTypesByServiceIdQuery = `
    SELECT * FROM types WHERE service_id = $1
`;
