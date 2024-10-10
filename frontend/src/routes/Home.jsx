import PartyFetch from "../axios/config"
import {useEffect, useState} from "react"
import { Link } from "react-router-dom"

import './Home.css'

const Home = () => {

  const [parties, setParties] = useState(null)

  useEffect(() => {
    
    const loadParties = async () => {
      const res = await PartyFetch.get('/parties')

      setParties(res.data)
    }
    
    loadParties()
  }, [])

  if(!parties) return <p>Loading...</p>


  return (
    <div className="home">
      <h1>Suas Festas</h1>
      <div className="partiescontainer">
        {parties.lenght === 0 && <p>Não há festas cadastradas</p>}
        {parties.map((party) => (
          <div key={party._id} className="party">
            <img src={party.image} alt={party.title}/>
            <h2>{party.title}</h2>
            <p>{party.description}</p>
            <p>{party.author}</p>
            <Link to={`/party/${party._id}`} className="detailBtn">Ver detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home