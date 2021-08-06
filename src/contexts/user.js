/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const userJSON = JSON.parse(sessionStorage.getItem('user'));
  const userObj = JSON.parse(userJSON);

  const [user, setUser] = useState(sessionStorage.getItem('user') ? userObj : null);
  useEffect(() => {
    if (sessionStorage.getItem('user') !== undefined) { if (typeof user === typeof '') sessionStorage.setItem('user', JSON.stringify(user)); }
  }, [user]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
