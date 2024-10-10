import './CreateParty.css'
import PartyFetch from '../axios/config'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useToast from '../hook/useToats'

const CreateParty = () => {

  const [services, setServices] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [img, setImg] = useState('')
  const [partyservices, setPartyServices] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    
    const loadServices = async () => {
      const res = await PartyFetch.get('/services')
      setServices(res.data)
    }
    
    loadServices()
  }, [])

  const handleServices = (e) => {
    const checked = e.target.checked
    const value = e.target.value

    const filteredService = services.filter((service) => service._id === value)

    if(checked){
      setPartyServices((services) => [...services, filteredService[0]])
    } else {
      setPartyServices((services) => services.filter((service) => service._id !== value))
    }

  }

  const createParty = async (e) => {

    e.preventDefault()

    try{
      const party = {
        title,
        author,
        description,
        budget,
        image: img,
        services: partyservices,
      }
  
      const res = await PartyFetch.post('/parties', party)
  
      if(res.status === 201){
        navigate('/')
  
        useToast(res.data.msg)
      }
    }
    catch(error){
      useToast(error.response.data.msg, 'error')
    }
  }
  
  return (
    <div className='createParty'>
      <h1>Crie sua próxima festa</h1>
      <p>Defina o budget e escolha os serviços disponíveis</p>
      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span>Nome da festa:</span>
          <input type="text"
          placeholder='Ex: Festa de aniversário do João'
          required 
          onChange={(e) => setTitle(e.target.value)}
          value={title}/>
        </label>
        <label>
          <span>Nome do responsável:</span>
          <input type="text"
          placeholder='Ex: Maria Silva'
          required 
          onChange={(e) => setAuthor(e.target.value)}
          value={author}/>
        </label>
        <label>
          <span>Descrição:</span>
          <textarea name="desc" id="desc" 
          placeholder='Conte mais sobre a festa'
          onChange={(e) => setDescription(e.target.value)}
          required
          value={description}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" 
          required 
          placeholder='Investimento na festa'
          onChange={(e) => setBudget(e.target.value)}
          value={budget}/>
        </label>
        <label>
          <span>Imagem da festa:</span>
          <input type="text" 
          required 
          placeholder='URL da imagem'
          onChange={(e) => setImg(e.target.value)}
          value={img}/>
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
                  <input type="checkbox" value={service._id} onChange={(e) => handleServices(e)}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <input type="submit" value='Criar festa' id='createPartyBtn'/>
      </form>
    </div>
  )
}

export default CreateParty     