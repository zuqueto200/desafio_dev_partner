import React, { createContext, useContext, useState } from "react"
import lista from '../agenda.json'

export const ListContextDefault = {
    list: [],
    setList: undefined
}

export const ListContext = createContext(ListContextDefault)

export const ListProvider = (props) => {
    
    const [list, setList] = useState(lista)

    return (
        <ListContext.Provider value={{ list, setList }}>
            {props.children}
        </ListContext.Provider>
    )
}

export const useList = () => {
    const context = useContext(ListContext)
    const { list, setList } = context
    return { list, setList }
}