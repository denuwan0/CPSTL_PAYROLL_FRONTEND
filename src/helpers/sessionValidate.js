export const isAuthenticated = () => {
  const userData = sessionStorage.getItem("userData");
  // const userData = localStorage.getItem('userData'); // Use this for localStorage

  return userData ? true : false;
};
