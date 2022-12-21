import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [choices, setChoices] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const priceForCategory = {
    1: 200,
    2: 400,
    3: 800,
    4: 1200,
  };

  const calculateTotal = ({ amount, category }) => {
    const newChoices = { ...choices };
    newChoices[category] = amount * priceForCategory[category];
    setChoices(newChoices);
    //! loop through the newChoices object and add up the values
    const newTotal = Object.values(newChoices).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotal(newTotal);
  };

  return (
    <AppContext.Provider value={{ total, calculateTotal }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
