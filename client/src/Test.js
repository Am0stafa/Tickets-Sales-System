import React,{useEffect} from 'react'
import { useAsync } from 'react-async-hook';
import { getAllAvailability } from "./services/shop";
import axios from 'axios';



const Test = () => {

    const { result, error, loading } = useAsync(getAllAvailability, []);


    return (
        <div>
          {loading && <div>Loading</div>}
          {error && <div>Error: {error.message}</div>}
          {result && (
            <div>
              <div>Success!</div>
              <div>Name: {JSON.stringify(result)}</div>
            </div>
          )}
        </div>
      );
}

export default Test