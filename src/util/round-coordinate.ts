const COORDINATE_PRECISION = 100;

export const roundCoordinate = (value: number) =>
  Math.round(value * COORDINATE_PRECISION) / COORDINATE_PRECISION;
