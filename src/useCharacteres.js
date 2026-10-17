import { useState, useEffect } from 'react'

const API_URL = "https://rickandmortyapi.com/api/character"

export function useCharacteres(page){
    const [characters, setCharacters] = useState([])
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(()=>{
        const controller = new AbortController();
        async function loadCharacters(){
            setLoading(true);
            setError(null);
            try{
                const response = await fetch(`${API_URL}?page=${page}`,
                {signal: controller.signal,});
                if(!response.ok){
                    throw new Error(`Error no supiste ${response.status}`)
                }
                const data = await response.json();
                setCharacters(data.results);
                setTotalPages(data.info.pages);
            }catch(err){
                if(err.name !== "AbortError"){
                    setError(err.message);
                }}
                finally{
                    if(!controller.signal.aborted){
                        setLoading(false)
                    }
                }

        }
        loadCharacters();
        return ()=> controller.abort();
    },[page]);
    return{characters, totalPages, loading, error}
}
