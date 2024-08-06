import { useState, createContext } from "react";

export type RegContextType = {
  firstName: string,
  setFirstName: React.Dispatch<React.SetStateAction<string>>,
}
const RegistrationContext = createContext<RegContextType>({
  firstName: '',
  setFirstName: () => {},
});

const RegProvider = ({children}: { children: React.ReactNode }) => {
  const [firstName, setFirstName] = useState<string>('') 
  return (
    <RegistrationContext.Provider value={{firstName, setFirstName}}>
      {children}
    </RegistrationContext.Provider>
  )
}

export {RegistrationContext, RegProvider}
