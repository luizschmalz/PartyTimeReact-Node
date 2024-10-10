import './CreateParty.css'
import PartyFetch from '../axios/config'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useToast from '../hook/useToats'

const EditParty = () => {

    const [party, setParty] = useState(null)
    const [services, setServices] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const updateParty = async (e) => {

        e.preventDefault()

        try{
            const res = await PartyFetch.put(`/parties/${id}`, party)

            if(res.status === 200){
                navigate(`/party/${id}`)	
                useToast(res.data.msg)
            }

        } catch (err){
            useToast(err.response.data.msg, "error")
        }

    }

    useEffect(() => {
        const loadServices = async () => {
          const res = await PartyFetch.get('/services')
          setServices(res.data)
          
          loadParty()
          
        }
        const loadParty = async () =>{
            const res = await PartyFetch.get(`/parties/${id}`)
            setParty(res.data)
        }

        loadServices()
    }, [])

    const handleServices = (e) => {

        let partyServices = party.services
        const checked = e.target.checked
        const value = e.target.value

        const filteredService = services.filter((service) => service._id === value)

        if(checked){
            partyServices = [...partyServices, filteredService[0]]
        } else {
            partyServices = partyServices.filter((service) => service._id !== value)
        }

        setParty({...party, services: partyServices})

    }   


    if (!party) return <p>Carregando...</p>
 

  return (
    
    <div className='createParty'>
      <h1>Edite: {party.title}</h1>
      <p>Ajuste as informações da sua festa</p>
      <form onSubmit={(e) => updateParty(e)}>
        <label>
          <span>Nome da festa:</span>
          <input type="text"
          placeholder='Ex: Festa de aniversário do João'
          required 
          onChange={(e) => setParty({...party, title: e.target.value})}
          value={party.title}/>
        </label>
        <label>
          <span>Nome do responsável:</span>
          <input type="text"
          placeholder='Ex: Maria Silva'
          required 
          onChange={(e) => setParty({...party, author: e.target.value})}
          value={party.author}/>
        </label>
        <label>
          <span>Descrição:</span>
          <textarea name="desc" id="desc" 
          placeholder='Conte mais sobre a festa'
          onChange={(e) => setParty({...party, description: e.target.value})}
          required
          value={party.description}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" 
          required 
          placeholder='Investimento na festa'
          onChange={(e) => setParty({...party, budget: e.target.value})}
          value={party.budget}/>
        </label>
        <label>
          <span>Imagem da festa:</span>
          <input type="text" 
          required 
          placeholder='URL da imagem'
          onChange={(e) => setParty({...party, image: e.target.value})}
          value={party.image}/>
        </label>
        <div>
          <h2>Escolha os serviços:</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.map((service) => (
              <div key={service._id} className="service">
                <img src={service.image} alt={service.name}/>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>R$ {service.price}</p>
                <div className="checkbox-container">
                  <p>Marque para adquirir</p>
                  <input type="checkbox" 
                  value={service._id} 
                  onChange={(e) => handleServices(e)}
                  checked={party.services.find((partyService) => partyService._id === service._id) ? true : false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <input type="submit" value='Editar festa' id='createPartyBtn'/>
      </form>
    </div>
  )
}

export default EditParty