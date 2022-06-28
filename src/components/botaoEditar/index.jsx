import React, { useState } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useList } from '../../context/list';
import { useLoad } from '../../context/load';
import { GoPerson } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { URLBASE } from '../URL';
import './index.css'

export function Editar(props) {
    const [modalEditar, setModalEditar] = useState(true)
    const { setList } = useList()
    const { setLoad } = useLoad()
    const [ aviso, setAviso ] = useState('')

    const [inputsEditar, setInputsEditar] = useState({
        nome: props.btItem.nome,
        email: props.btItem.email,
        telefone: props.btItem.telefone
    })

    function fnBtEditar() {

        if (inputsEditar.nome !== '' && inputsEditar.email !== '' && inputsEditar.telefone !== '') {

            const init = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: inputsEditar.nome,
                    email: inputsEditar.email,
                    telefone: inputsEditar.telefone
                })
            }

            const putFetch = async () => {
                try {
                    setLoad(true)
                    const response = await fetch(URLBASE + props.btItem.id, init);
                    const data = await response.json();

                    setList(prevStates => prevStates.map((item) =>
                        item.id === props.btItem.id ? { ...data } : item
                    ))
                }
                catch (err) {
                    console.log('err PUT', err)
                }
                finally {
                    setLoad(false)
                }
            }

            putFetch()

            setInputsEditar('')
            setModalEditar(false);
            props.setBtEditar(false)

        } else {
            
            setAviso('PREENCHER TODOS OS CAMPOS')
        }
    }

    return (
        <>
            {modalEditar ? <div className='backModalEdit' >

                <div className='modalEdit'>

                    <span className='logoEdit'><FiEdit /><p>EDITAR</p></span>

                    <div className='divInputEditar'>

                        <div>
                            <input
                                className='inputEditar'
                                defaultValue={props.btItem.nome}
                                placeholder='Nome'
                                onChange={(e) => {
                                    setInputsEditar(prev => (
                                        { ...prev, nome: e.target.value }
                                    ))
                                }}
                                type={'text'} />

                            <GoPerson className='logoInput' />
                        </div>

                        <div>
                            <input
                                className='inputEditar'
                                defaultValue={props.btItem.email}
                                placeholder='E-mail'
                                onChange={(e) => {
                                    setInputsEditar(prev => (
                                        { ...prev, email: e.target.value }
                                    ))
                                }}
                                type={'email'} />

                            <MdEmail className='logoInput' />
                        </div>

                        <div>
                            <input
                                className='inputEditar'
                                defaultValue={props.btItem.telefone}
                                placeholder='Telefone'
                                onChange={(e) => {
                                    setInputsEditar(prev => (
                                        { ...prev, telefone: e.target.value }
                                    ))
                                }}
                                type={'text'} />

                            <BsFillTelephoneFill className='logoInput' />

                        </div>
                        <span className='avisoNovoInput'>{aviso}</span>

                    </div>
                    <div className='btSalvarCancelar'>

                        <button className='btSalvar'
                            onClick={() => { fnBtEditar() }}
                        >Salvar
                        </button>

                        <button className='btCancelar' onClick={() => {
                            setModalEditar(false);
                            props.setBtEditar(false)
                        }}>Cancelar
                        </button>
                    </div>
                </div>
            </div> : null
            }
        </>
    )
}