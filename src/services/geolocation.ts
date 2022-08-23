export const checkGeoLocationSupport = () => {
  return navigator.geolocation;
}

export const getGeolocation = (
  successCallback: (lat: number, lon: number) => void,
  errorCallback: () => void,
) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { coords: { latitude, longitude } } = position;
      successCallback(latitude, longitude);
    },
    () => {
      errorCallback()
    }
  );
}