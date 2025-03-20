import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useLocalStorage = () => {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [adminDetails, setAdminDetails] = useState<any>();
  // const [languagesList, setLanguagesList] = useState<any>(null);

  const reduxToken = useSelector((state: any) => state.login.token);

  useEffect(() => {
    // -------------------- Validate Token -------------------------
    const validateToken = async () => {
      try {
        const localStorageToken = localStorage.getItem('token');
        const localStorageAdminDetails = localStorage.getItem('loginDetails');
        // const localStorageLocation = localStorage.getItem('language');

        if (localStorageAdminDetails) {
          const adminDetails = JSON.parse(localStorageAdminDetails);
          setAdminDetails(adminDetails);
        } else {
          setAdminDetails(null);
        }

        // if (localStorageLocation) {
        //   const location = JSON.parse(localStorageLocation);
        //   setLanguagesList(location.data);
        // }

        const token = localStorageToken || reduxToken;

        if (!token) {
          setIsTokenValid(false);
        } else {
          setIsTokenValid(true);
        }
      } catch (err: any) {
        console.log('Error during token validation:', err);
        setIsTokenValid(false);
      }
    };
    validateToken();
  }, [reduxToken]);

  return {
    isTokenValid,
    adminDetails,
    // languagesList,
    reduxToken,
  };
};

export default useLocalStorage;
