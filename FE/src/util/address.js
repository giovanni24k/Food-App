export const getAddress = () => {
  const address = localStorage.getItem("address");
  const city = localStorage.getItem("city");
  return { address, city };
};

export const setAddress = (address, city) => {
  localStorage.setItem("address", address);
  localStorage.setItem("city", city);
};

export const addressLoader = () => {
  const { address, city } = getAddress();
  return { address, city };
};
