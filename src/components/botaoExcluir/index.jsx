import React, { useState } from 'react'
import './index.css'
import { BsTrash } from 'react-icons/bs';
import { RiAlertFill } from 'react-icons/ri';
import { useList } from '../../context/list';


export function Excluir(props) {
    const [modalExcluir, setModalExcluir] = useState(true)
    const { list, setList } = useList()

    function fnBtExcluir() {
        setList(prevStates => [...prevStates].filter((item) => item.id !== props.btItem.id))
    }

    return (
        <>
            {modalExcluir ? <div className='backModalExcluir'>

                <div className='modalExcluir'>

                    <span className='logoExcluir'><BsTrash />
                        <p>EXCLUIR</p></span>

                    <div className='divUsuario'>

                        <span className='avisoExcluir'><RiAlertFill className='logoAvisoExcluir'/>
                            <p>Deseja excluir este registro?</p>
                        </span>

                        <p>{props.btItem.nome}</p>
                    </div>

                    <div className='divConfirmarCancelar'>

                        <button className='btSalvar' onClick={() => {
                            fnBtExcluir();
                            setModalExcluir(false);
                            props.setBtExcluir(false)
                        }}>Confirmar
                        </button>


                        <button className='btCancelar' onClick={() => {
                            setModalExcluir(false);
                            props.setBtExcluir(false)
                        }}>Cancelar
                        </button>
                    </div>
                </div>
            </div> : null
            }
        </>
    )
}