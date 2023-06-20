const LICENSE_PLATE_REGEX = "[A-Z]{3}[0-9][0-9A-Z]{2}";

export function licensePlateValitedate(lisensePlate: string) {
  const plate = lisensePlate.toUpperCase();

  const isValid = plate.match(LICENSE_PLATE_REGEX);

  return isValid;
}
