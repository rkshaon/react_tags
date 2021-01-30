import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [showList, setShowList] = useState(false);

  return(
    <AppContext.Provider
      value={{
        tags, setTags,
        showList, setShowList
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
