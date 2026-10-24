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
            const cacheKey = `rm_characters_page_${page}`;
            const cached = localStorage.getItem(cacheKey);
            if(cached){
                try{
                    const saved = JSON.parse(cached);
                    setCharacters(saved.results);
                    setTotalPages(saved.pages);
                    setLoading(false);
                    return;
                }catch{
                    localStorage.removeItem(cacheKey);
                }
            }
            try{
                const response = await fetch(`${API_URL}?page=${page}`,
                {signal: controller.signal,});
                if(!response.ok){
                    throw new Error(`Error no supiste ${response.status}`)
                }
                const data = await response.json();
                setCharacters(data.results);
                setTotalPages(data.info.pages);
                localStorage.setItem(cacheKey, JSON.stringify({results: data.results, pages: data.info.pages}));
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
