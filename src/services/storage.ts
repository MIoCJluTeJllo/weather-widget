const TYPES = {
  CITIES: 'CITIES'
}

export const saveCities = (cities: string[]) => {
  localStorage.setItem(TYPES.CITIES, JSON.stringify(cities));
};

export const getCitiest = () => {
  const cities = localStorage.getItem(TYPES.CITIES);
  if (cities) {
    return JSON.parse(cities);
  }
  return [];
};