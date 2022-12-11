import React,{useState} from 'react'
import SearchField from "react-search-field";

const Search = () => {
    const [searchText, setSearchText] = useState("")
    const onChange = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <SearchField
            style={{width: "100%"}}
            placeholder="Search..."
            onChange={onChange}
            searchText="Search..."
            />
    );
}

export default Search