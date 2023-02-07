import { useEffect, useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [totalChoices, setTotalChoices] = useState(0);
  const [choices, setChoices] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const [without, setWithout] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const priceForCategory = {
    1: 75,
    2: 125,
    3: 195,
    4: 400,
  };

  useEffect(() => {
    //set values to default
    setTotal(0);
    setTotalChoices(0);
    setChoices({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    });
    setWithout({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    });
  }, []);

  const calculateTotal = ({ amount, category }) => {
    const newChoices = { ...choices };
    const newWithout = { ...without };
    newChoices[category] = amount * priceForCategory[category];
    newWithout[category] = amount;
    setWithout(newWithout);
    setChoices(newChoices);
    //! loop through the newChoices object and add up the values
    const newTotal = Object.values(newChoices).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const newTotalChoices = Object.values(newWithout).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalChoices(newTotalChoices);
    setTotal(newTotal);
  };

  return (
    <AppContext.Provider
      value={{ total, calculateTotal, totalChoices, without }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
