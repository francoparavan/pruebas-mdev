import { useEffect, useState } from 'react'
import './App.css'

const random_facts_endpoint = 'https://catfact.ninja/fact'
// const cat_img_prefix_url = 'https://cataas.com'


export function App() {

    const [fact, setFact] = useState('lorem ipsum cat fact')
    const [imageUrl, setImageUrl] = useState()
    
    // recuperar el fact al cargar la pagina
    useEffect(() => {
        fetch(random_facts_endpoint)
            .then(response => {
                if (!response.ok) throw new Error('Error fetching fact')
                return response.json()
            })
            // .then(data => setFact(data.fact))
            .then(data => {
                const { fact } = data //Aca se hace con destructuring
                setFact(fact)

                const firstWords = fact.split(" ", 3).join(" ") //devuelve las 3 primeras palabras de la frase fact
                // const firstWord = fact.split(" ").slice(0, 3).join(' ') //slice trae el elemento 1ro hasta el 3ro del array
                //y el join junta los elementos separados por un espacio que le da uno en una cadena de texto
                console.log(firstWords)

                const url_complete_cats = `https://cataas.com/cat/says/${firstWords}?size=50&color=red`
                setImageUrl(url_complete_cats)
            })

            // fetch(`https://cataas.com/cat/says/${firstWords}?size=50&color=red`)
            // .then(response => response.json)
            // .then(res => {
            //     setImageUrl(res.url)
            //     setImageUrl(`${cat_img_prefix_url}${url}`) es para en el return mostrar imageUrl directamente, pero no es una buena practica
            // })

            .catch((error) => console.error('There was a problem with your fetch operation: ', error));
    }, [])


    return (
        <main >
            <h1>Cat App</h1>
            <section>
                <p>{fact}</p>
                <img src={imageUrl} alt='cat image from cats api getted with the first three words of fact'></img>
                {/* <img src={`${cat_img_prefix_url}${imageUrl}`} alt='cat image'></img> */}
                {/* el prefix es la parte incial del url y imageUrl es la ruta que le sigue. Es una buena practica esta, dejar el prefix en una constante y el resto de la url manejarla con State*/}
            </section>
        </main>
    )
}