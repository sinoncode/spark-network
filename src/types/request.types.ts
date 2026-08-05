export interface RequestResponse {
  success: boolean;
  data: RequestItem[];
}

export interface RequestItem {
  id: number;
  uuid: string;
  reference: string;

  identity: {
    first_name: string;
    last_name: string;
  };

  contact: {
    phones: string;
    emails: string;
    language: string;
  };

  requirements: {
    transaction: string;
    category: string;
    budget_min: string;
    budget_max: string;
    currency: string;
    rooms_min: number | null;
    rooms_max: number | null;
  };

  location: {
    zip: string;
    city: string;
    country: string;
    radius: number;
  };

  notes: {
    memo: string;
    notes: string;
  };

  status: string;

  relations: {
    person_id: number | null;
    assigned_agent_id: number | null;
  };

  created_at: string;
  updated_at: string;
}