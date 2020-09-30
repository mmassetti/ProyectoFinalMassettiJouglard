import React from 'react';

export const DocRefContext = React.createContext();

export function DocRefContextProvider({docRef, children}) {
  return (
    <DocRefContext.Provider value={{docRef}}>{children}</DocRefContext.Provider>
  );
}
