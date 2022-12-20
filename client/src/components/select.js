import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppContext from '../context/Total'

export default function SelectLabels({num,setProgress,progress}) {
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState({amount:"", category: num});
  const {calculateTotal} = React.useContext(AppContext)

  const handleChange = (event) => {
    //set the selected to the amount of tickets and num
    setSelected({
        amount: event.target.value,
        category: num
    });
    calculateTotal({amount: event.target.value, category: num})
    if (progress < 50) {
        setProgress((prev) => prev + 25);
    }

  };

  return (
    <div sx={{ justifyContent: "right" }}>
      <FormControl sx={{ m: 1, minWidth: 120, justifyContent: "right" }}>
        <Select
          sx={{ backgroundColor: "gray", alignItems: "right" }}
          value={selected.amount}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>0</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
