interface BaseService {
  id: number | null;
  name: string;
}

export interface Service extends BaseService {
  categoryId?: number | null;
}

export interface ServiceInfo extends BaseService {
  description: string;
  required_documents: string;
  regulatory_documents: string;
  delivery_time: string;
  price: string;
}
