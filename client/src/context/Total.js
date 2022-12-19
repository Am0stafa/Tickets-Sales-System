import { useState } from 'react'
import { createContext } from 'react'


const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const [total, setTotal] = useState(0)

    const calculateTotal = ({amount,category}) => {
    
        let t = 0
        if(parseInt(category) === 1){
            if(amount === 0){
                if(total > 0){
                    t = total - 200
                }
            }else{
                t = amount * 200
            }
        }
        else if(parseInt(category) === 2){
            if(amount === 0){
                if(total > 0){
                    t = total - 400
                }
            }else{
                t = amount * 400
            }
        }
        else if(parseInt(category) === 3){
            if(amount === 0){
                if(total > 0){
                    t = total - 800
                }
            }else{
                t = amount * 800
            }
        }
        else if(parseInt(category) === 4){
            if(amount === 0){
                if(total > 0){
                    t = total - 1200
                }
            }else{
                t = amount * 1200
            }
        }
        setTotal((prev) => t+prev)
    }

    
  return (
    <AppContext.Provider value={{total,calculateTotal}}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContext