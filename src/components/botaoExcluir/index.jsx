import React, { useState } from 'react'
import { RiAlertFill } from 'react-icons/ri';
import { useList } from '../../context/list';
import { useLoad } from '../../context/load';
import { BsTrash } from 'react-icons/bs';
import { URLBASE } from '../URL';
import './index.css'

export function Excluir(props) {
    const [modalExcluir, setModalExcluir] = useState(true)
    const { setList } = useList()
    const { setLoad } = useLoad()


    function fnBtExcluir() {

        const init = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }

        const deleteFetch = async () => {
            try {
                setLoad(true)
                await fetch(URLBASE + props.btItem.id, init);
                setList(prevStates => [...prevStates].filter((item) => item.id !== props.btItem.id))

            }
            catch (err) {
                console.log('err DELETE', err)
            }
            finally {
                setLoad(false)
            }
        }
        deleteFetch()
    }

    return (
        <>
            {modalExcluir ? <div className='backModalExcluir'>

                <div className='modalExcluir'>

                    <span className='logoExcluir'><BsTrash />
                        <p>EXCLUIR</p></span>

                    <div className='divUsuario'>

                        <span className='avisoExcluir'><RiAlertFill className='logoAvisoExcluir' />
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
            </div> : null}
        </>
    )
}