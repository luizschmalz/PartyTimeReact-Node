import PartyFetch from "../axios/config"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import './Party.css'
import useToast from "../hook/useToats"

const Party = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [party, setParty] = useState(null)

    useEffect(() => {

        const loadParty = async () =>{
            const res = await PartyFetch.get(`/parties/${id}`)
            setParty(res.data)
        }

        loadParty()

    }, [])

    const handleDelete = async () =>{

        const res = await PartyFetch.delete(`/parties/${id}`)

        if(res.status === 200){
            navigate('/')
            useToast(res.data.msg)
        }
    }

    if (!party) return <p>Carregando...</p>

  return (
    <div className="partyDetail">
        <h1>{party.title}</h1>
        <p>{party.description}</p>
        <div className="actions-container">
            <Link to={`/party/edit/${party._id}`} className='newParty'>Editar</Link>
            <button className='newParty' onClick={handleDelete}>Deletar</button>
        </div>
        <p>Orçamento: {party.budget}</p>
        <h3>Serviços contratados:</h3>
        <div className="servicesContrated">
            {party.services.map((service) => (
                <div key={service._id} className="service">
                    <img src={service.image} alt={service.name}/>
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Party