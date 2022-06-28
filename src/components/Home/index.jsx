import React, {  useEffect, useState } from 'react';
import { useList } from '../../context/list';
import { useLoad } from '../../context/load';
import { Excluir } from '../botaoExcluir';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { Editar } from '../botaoEditar';
import { Loading } from '../loading';
import { Novo } from '../botaoNovo';
import logo from '../img/logo.png'
import { URLBASE } from '../URL';
import './index.css';

export function Home() {
    const { list, setList } = useList()
    const { load, setLoad } = useLoad()

    const [btEditar, setBtEditar] = useState(false)
    const [btExcluir, setBtExcluir] = useState(false)
    const [btItem, setBtItem] = useState([])

    const getFetch = async () => {
        try {
            setLoad(true)
            const response = await fetch(URLBASE);
            const data = await response.json();
            setList(data); 
        }
        catch (err) {
            console.log('err GET', err)
        }
        finally {
            setLoad(false)
        }
    }

    useEffect(() => { 
        getFetch()
        
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {load ? <Loading /> : null}
            <img src={logo} alt='Logo da empresa Dev Partner' style={{ margin: " 30px" }} />
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
                            {list.map((item, index) => (item.id > 1 ? // coloque > 1 devido a API não permetir excluir todos os objetos.
                                <tr key={index}>
                                    <td className='tdId'>{index}</td>
                                    <td className='tdNome'>{item.nome}</td>
                                    <td className='tdEmail'>{item.email}</td>
                                    <td className='tdTelefone'>{item.telefone}</td>
                                    <td className='tdEdit'>
                                        <div>
                                            <FiEdit onClick={() => { setBtEditar(true); setBtItem(item) }} style={{ color: "green", cursor: "pointer" }} />
                                            <BsTrash onClick={() => { setBtExcluir(true); setBtItem(item) }} style={{ color: "red", cursor: "pointer" }} />
                                        </div>
                                    </td>
                                </tr> : null
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