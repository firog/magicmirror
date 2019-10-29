export interface PointForecasts {
  geometry: Geometry;
  timeSeries: TimeSeries[];
}

export interface Geometry {
  type: string;
  coordinates: string[];
}

export interface TimeSeries {
  validTime: Date;
  parameters: Parameters[];
}

export interface Parameters {
  name: string;
  levelType: string;
  level: Number;
  unit: string;
  values: string[];
}
