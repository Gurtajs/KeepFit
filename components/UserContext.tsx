import { createContext, useState } from "react";

export type UserContextType = {
  userDetails: object;
  setUserDetails: React.Dispatch<React.SetStateAction<object>>;
};
export const UserContext = createContext<UserContextType>({
  userDetails: {},
  setUserDetails: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState({});

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
