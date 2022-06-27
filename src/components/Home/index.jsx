import React, { useEffect } from 'react';
import './index.css';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import { useList } from '../../context/list';
import { Novo } from '../botaoNovo';
import { Editar } from '../botaoEditar';
import { Excluir } from '../botaoExcluir';
import logo from '../img/logo.png'

export function Home() {
    const { list, setList } = useList()
    const [btEditar, setBtEditar] = useState(false)
    const [btExcluir, setBtExcluir] = useState(false)
    const [btItem, setBtItem] = useState([])

    return (
        <>
            <img src={logo} style={{ margin: " 30px" }} />
            <div className='centralizar'>
                <div className='containerHome'>
                    <table>
                        <thead>
                            <tr>
                                <td className='tdId'>#</td>
                                <td className='tdNome'>Nome</td>
                                <td className='tdEmail'>Email</td>
                                <td className='tdTelefone'>Telefone</td>
                                <td className='tdEdit'>Editar</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => (
                                <tr key={index}>
                                    <td className='tdId'>{index + 1}</td>
                                    <td className='tdNome'>{item.nome}</td>
                                    <td className='tdEmail'>{item.email}</td>
                                    <td className='tdTelefone'>{item.telefone}</td>
                                    <td className='tdEdit'>
                                        <div>
                                            <FiEdit onClick={() => { setBtEditar(true); setBtItem(item) }} style={{ color: "green", cursor: "pointer" }} />
                                            <BsTrash onClick={() => { setBtExcluir(true); setBtItem(item) }} style={{ color: "red", cursor: "pointer" }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {btEditar ? <Editar
                    btItem={btItem}
                    setBtItem={setBtItem}
                    setBtEditar={setBtEditar} /> :
                    null}

                {btExcluir ? <Excluir
                    btItem={btItem}
                    setBtItem={setBtItem}
                    setBtExcluir={setBtExcluir} /> :
                    null}

                <Novo />

            </div>
        </>
    )
}