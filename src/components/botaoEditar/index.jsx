import { useEffect, useState } from 'react'
import './index.css'
import { FiEdit } from 'react-icons/fi';
import { GoPerson } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useList } from '../../context/list';


export function Editar(props) {
    const [modalEditar, setModalEditar] = useState(true)
    const { list, setList } = useList()

    function fnBtEditar() {

        let inputNome = document.getElementsByClassName('inputEditar')[0].value
        let inputEmail = document.getElementsByClassName('inputEditar')[1].value
        let inputTelefone = document.getElementsByClassName('inputEditar')[2].value

        if (inputNome !== '' && inputEmail !== '' && inputTelefone !== '') {

            setList(prevStates => prevStates.map((item) =>
                item.id == props.btItem.id ? {
                    nome: inputNome,
                    email: inputEmail,
                    telefone: inputTelefone
                } : item
            ))
        }
    }

    useEffect(() => {
        document.getElementsByClassName('inputEditar')[0].value = props.btItem.nome
        document.getElementsByClassName('inputEditar')[1].value = props.btItem.email
        document.getElementsByClassName('inputEditar')[2].value = props.btItem.telefone
    }, [])


    return (
        <>


            {modalEditar ? <div className='backModalEdit'>

                <div className='modalEdit'>

                    <span className='logoEdit'><FiEdit /><p>EDITAR</p></span>

                    <div className='divInputEditar'>
                      

                            <div>
                                <input className='inputEditar'
                                    placeholder='Nome'
                                    type={'text'} />
                                <GoPerson className='logoInput' />
                            </div>


                            <div>
                                <input className='inputEditar' placeholder='E-mail' type={'email'} />
                                <MdEmail className='logoInput' />
                            </div>


                            <div>
                                <input className='inputEditar' placeholder='Telefone' type={'text'} />
                                <BsFillTelephoneFill className='logoInput' />
                            </div>

                        
                    </div>
                    <div className='btSalvarCancelar'>



                        <button className='btSalvar' onClick={() => {
                            fnBtEditar();
                            setModalEditar(false);
                            props.setBtEditar(false)
                        }}>Salvar
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