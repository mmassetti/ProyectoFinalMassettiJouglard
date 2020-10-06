import React, {useState} from 'react';

export const BackgroundContext = React.createContext({background: false});

export function BackgroundProvider({children}) {
  const [background, setBackground] = useState(false);
  return (
    <BackgroundContext.Provider value={{background, setBackground}}>
      {children}
    </BackgroundContext.Provider>
  );
}
