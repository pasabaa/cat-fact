import axios from "axios"
import { useState, useEffect } from "react"

function App() {

  const [facts, setFacts] = useState([])
  const [cats, setCats] = useState([]);
  const [reload, setReaload] = useState(false);
  const [translate, setTranslate] = useState([])
  const [loading, setLoading] = useState(false);


  const getFacts = () => {
    setLoading(true);
    axios.get('https://catfact.ninja/fact')
    .then(response => setFacts(response.data.fact))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false));
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
    <>
    <div className="grid place-items-center h-screen p-16">
      {
        loading ? 
        <div className="w-8/12 flex flex-col items-center justify-center gap-2 animate-pulse sm:w-full">
          <img className="text-center object-scale-down w-12" src="/favicon/apple-touch-icon.png" alt="Cat Logo Loading" />
          <h1 className="font-bold title text-gray-400">Cargando...</h1>
        </div> : 
        <div className="w-8/12 flex flex-col gap-8 sm:w-full">
          <h1 className="font-bold text-5xl title text-gray-400">DATOS DE GATOS</h1>
          {
            cats.map((cat, i) => {
              return(
                <img key={i} className="shadow object-scale-down w-96 border-gray-300 border-8 outline outline-black" src={cat.url} alt={cat.url} />
              )
            })
          }
          <h1 className="font-normal text-xl sm:text-sm text-gray-500">{translate}</h1>
          <div className="text-start pb-16">
            <button className="px-2 py-3 bg-gray-500 text-gray-900 font-bold hover:bg-gray-400" onClick={() => {setReaload(!reload)}}>Dato Random</button>
          </div>
        </div>

      }
    </div>
    <div className="text-gray-500 px-16 py-8 mt-auto bottom-0 h-64 flex flex-col items-end justify-end">
      <div className="w-8/12 flex justify-between items-center gap-4 mx-auto sm:w-full">
        <div>
          <a target={'_blank'} rel={'noreferrer noopener'} href="https://portfolio-pasabaa.netlify.app/">
            <img className="w-8 filter-white" src="/logo/logo.png" alt="Logo pasabaa" />
          </a>
        </div>
        <div>
          <div className="text-end mb-2">
            <p className="font-bold text-gray-500 text-sm">Made with <a target={'_blank'} rel={'noreferrer noopener'} className="font-normal hover:underline" href="https://catfact.ninja/">Cat Fact API</a></p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 ">
              <i className="bi bi-github"></i>
              <a target={'_blank'} rel={'noreferrer noopener'} className="text-sm hover:underline" href="https://github.com/pasabaa">pasabaa</a>
            </div>
            <div className="flex gap-2 ">
              <i className="bi bi-instagram"></i>
              <a target={'_blank'} rel={'noreferrer noopener'} className="text-sm hover:underline" href="https://www.instagram.com/pasabaaa/">pasabaaa</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
