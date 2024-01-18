export interface Region {
  id: number | null;
  name: string;
  region?: string;
  status?: string;
}

export interface RegionState extends Region {}