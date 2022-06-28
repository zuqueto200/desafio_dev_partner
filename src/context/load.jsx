import React, { createContext, useContext, useState } from "react"
 

export const LoadContextDefault = {
    load: [],
    setLoad: undefined
}

export const LoadContext = createContext(LoadContextDefault)

export const LoadProvider = (props) => {
    
    const [load, setLoad] = useState(false)

    return (
        <LoadContext.Provider value={{ load, setLoad }}>
            {props.children}
        </LoadContext.Provider>
    )
}

export const useLoad = () => {
    const context = useContext(LoadContext)
    const { load, setLoad } = context
    return { load, setLoad }
}