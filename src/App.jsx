import axios from "axios"
import { useState, useEffect } from "react"

function App() {

  const [facts, setFacts] = useState([])
  const [cats, setCats] = useState([]);
  const [reload, setReaload] = useState(false);

  const getFacts = () => {
    axios.get('https://catfact.ninja/fact')
    .then(response => setFacts(response.data.fact))
    .catch(error => console.log(error))
  }

  const getCats = () => {
    axios.get('https://api.thecatapi.com/v1/images/search')
    .then(response => setCats(response.data))
    .catch(error => console.log(error))
  }

  useEffect(()=> {

   getFacts();
   getCats();

  }, [reload])

  return (
    <div>
      
      
      {
        cats.map(cat => {
          return(
            <img className="object-scale-down w-48" src={cat.url} alt="" />
          )
        })
      }

      {facts}

      <button onClick={() => {setReaload(!reload)}}>Get random fact</button>

    </div>
  )
}

export default App
