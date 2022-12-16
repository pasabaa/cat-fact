import axios from "axios"
import { useState, useEffect } from "react"

function App() {

  const [facts, setFacts] = useState([])
  const [cats, setCats] = useState([]);
  const [reload, setReaload] = useState(false);
  const [translate, setTranslate] = useState([])
  const [loading, setLoading] = useState(false);


  const getFacts = () => {
    axios.get('https://catfact.ninja/fact')
    .then(response => setFacts(response.data.fact))
    .catch(error => console.log(error))
  }

  const getCats = () => {
    
    setLoading(true);

    axios.get('https://api.thecatapi.com/v1/images/search')
    .then(response => setCats(response.data))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false));
  }

  const encodedParams = new URLSearchParams();
  encodedParams.append("from", "en");
  encodedParams.append("to", "es");
  encodedParams.append("text", `${facts}`);

  const options = {
    method: 'POST',
    url: 'https://translo.p.rapidapi.com/api/v3/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '5ff69d6c00msh9eec15b597770dap1d4f41jsn8b588032000d',
      'X-RapidAPI-Host': 'translo.p.rapidapi.com'
    },
    data: encodedParams
  };

  axios.request(options).then(function (response) {
    setTranslate(response.data.translated_text);
  }).catch(function (error) {
    console.error(error);
  });

  useEffect(()=> {

   getFacts();
   getCats();

  }, [reload])

  return (
    <div className="grid place-items-center h-screen p-16">
      
      <div className="w-8/12 flex flex-col gap-8 sm:w-full">
        <h1 className="font-bold text-5xl title text-gray-400">DATOS DE GATOS</h1>
        {
          cats.map(cat => {
            return(
              <img className="shadow object-scale-down w-96 border-gray-300 border-8 outline outline-black" src={cat.url} alt="" />
            )
          })
        }
        <h1 className="font-normal text-xl text-gray-500">{translate}</h1>

        <div className="text-start pb-16">
          <button className="px-2 py-3 bg-gray-500 text-gray-900 font-bold hover:bg-gray-400" onClick={() => {setReaload(!reload)}}>{loading ? 'Cargando..' : 'Dato random'}</button>
        </div>
      </div>
      


    </div>
  )
}

export default App
