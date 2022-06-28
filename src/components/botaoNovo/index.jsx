import React, { useState } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useList } from '../../context/list';
import { useLoad } from '../../context/load';
import { GoPerson } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { URLBASE } from '../URL';
import './index.css'

export function Novo() {
    const [modalNovo, setModalNovo] = useState(false)
    const { setList } = useList()
    const { setLoad } = useLoad()
    const [aviso, setAviso] = useState('')

    const [inputsNovo, setInputsNovo] = useState({
        nome: '',
        email: '',
        telefone: ''
    })

    function fnBtSalvar() {

        if (inputsNovo.nome !== '' && inputsNovo.email !== '' && inputsNovo.telefone !== '') {

            const init = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: Date.now(),
                    nome: inputsNovo.nome,
                    email: inputsNovo.email,
                    telefone: inputsNovo.telefone
                })
            }

            const postFetch = async () => {
                try {
                    setLoad(true)
                    const response = await fetch(URLBASE, init);
                    const data = await response.json();
                    setList(prevState => [...prevState, { ...data }])
                }
                catch (err) {
                    console.log('err POST', err)
                }
                finally {
                    setLoad(false)

                }
            }

            postFetch()

            setInputsNovo('')

            setModalNovo(false)
        } else {
            setAviso('PREENCHER TODOS OS CAMPOS')
        }
    }

    return (
        <>
            <div className='containerNovo'>
                <button className='btNovo' onClick={() => setModalNovo(true)}>Novo</button>
            </div>
            {modalNovo ? <div className='backModalNovo'>

                <div className='modalAddItem'>

                    <span className='logoNovo'><FiEdit /><p>NOVO</p></span>

                    <div className='divInputNovo'>

                        <div>
                            <input
                                className='inputNovo'
                                type={'text'}
                                placeholder='Nome'
                                onChange={(e) => {
                                    setInputsNovo(prev => (
                                        { ...prev, nome: e.target.value }
                                    ))
                                }} />

                            <GoPerson className='iconeInput' />
                        </div>


                        <div>
                            <input
                                className='inputNovo'
                                placeholder='E-mail'
                                type={'text'}
                                onChange={(e) => {
                                    setInputsNovo(prev => (
                                        { ...prev, email: e.target.value }
                                    ))
                                }} />

                            <MdEmail className='iconeInput' />
                        </div>


                        <div>
                            <input
                                className='inputNovo'
                                placeholder='Telefone'
                                type={'text'}
                                onChange={(e) => {
                                    setInputsNovo(prev => (
                                        { ...prev, telefone: e.target.value }
                                    ))
                                }} />

                            <BsFillTelephoneFill className='iconeInput' />

                        </div>
                        <span className='avisoNovoInput'>{aviso}</span>
                    </div>
                    <div className='divSalvarCancelar'>

                        <button className='btSalvar' onClick={() => { fnBtSalvar(); }}>Salvar</button>
                        <button className='btCancelar' onClick={() => setModalNovo(false)}>Cancelar</button>

                    </div>
                </div>
            </div> : null}
        </>
    )
}