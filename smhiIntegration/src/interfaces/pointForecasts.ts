export interface PointForecasts {
  geometry: Geometry;
  timeSeries: TimeSeries[];
}

interface Geometry {
  type: string;
  coordinates: string[];
}

interface TimeSeries {
  validTime: Date;
  parameters: Parameters[];
}

interface Parameters {
  name: string;
  levelType: string;
  level: Number;
  unit: string;
  values: string[];
}
