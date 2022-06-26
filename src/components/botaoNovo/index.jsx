import React, { useEffect, useState } from 'react'
import './index.css'
import { FiEdit } from 'react-icons/fi';
import { GoPerson } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useList } from '../../context/list';

export function Novo() {
    const [modalNovo, setModalNovo] = useState(false)
    const { list, setList } = useList()


    function fnBtSalvar() {

        let inputNome = document.getElementsByClassName('inputNovo')[0].value
        let inputEmail = document.getElementsByClassName('inputNovo')[1].value
        let inputTelefone = document.getElementsByClassName('inputNovo')[2].value

        if (inputNome !== '' && inputEmail !== '' && inputTelefone !== '') {










            const init = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: Date.now(),
                    nome: inputNome,
                    email: inputEmail,
                    telefone: inputTelefone
                })
            }


            fetch('https://testapi.io/api/zuqueto/agenda', init)
                .then((res) => res.text())
                .then((data) => {
                    setList(data)
                    console.log(data)
                }
                )










            // setList(prevState => [...prevState, {
            //     id: Date.now(),
            //     nome: inputNome,
            //     email: inputEmail,
            //     telefone: inputTelefone
            // }])
        }
    }




    useEffect(() => {



    }, [])




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
                            <input className='inputNovo' placeholder='Nome' type={'text'} />
                            <GoPerson className='iconeInput' />
                        </div>
                        <div>
                            <input className='inputNovo' placeholder='E-mail' type={'email'} />
                            <MdEmail className='iconeInput' />
                        </div>
                        <div>
                            <input className='inputNovo' placeholder='Telefone' type={'text'} />
                            <BsFillTelephoneFill className='iconeInput' />
                        </div>

                    </div>
                    <div className='divSalvarCancelar'>

                        <button className='btSalvar' onClick={() => { fnBtSalvar(); setModalNovo(false) }}>Salvar</button>
                        <button className='btCancelar' onClick={() => setModalNovo(false)}>Cancelar</button>

                    </div>
                </div>
            </div> : null
            }
        </>
    )
}