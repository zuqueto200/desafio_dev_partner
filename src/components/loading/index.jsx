import React from "react";
import './index.css'
import load from '../img/loading.gif'




export function Loading(){


    return(

        <div className="centralizarLoading">
        

            <img src={load} alt=" loading "/>

        
        </div>
    )
}