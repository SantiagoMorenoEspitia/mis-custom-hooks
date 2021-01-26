import { useEffect,useState,useRef } from "react"


export const useFetch = (url) => {
    const [state, setState] = useState({data:null,loading:true,error:null})

    const isMounted = useRef(true)

    useEffect(() => {      
        return()=>{//No dispara la renderizacion solo mantiene la referencia al mismo
            isMounted.current = false;
        }       
    }, [])


    useEffect(() => {
        setState({data:null,loading:true,error:null})
        fetch(url)
                .then(resp =>resp.json())
                .then(data=>{

                            if(isMounted.current){
                                setState({
                                    loading :false,
                                    error : null,
                                    data 
                                })
                            }else{
                                console.log('No se llamo')
                            }
                    }).catch(()=>{
                        setState({
                            data:null,
                            loading:false,
                            error:'No se pudo cargar la info'
                        })
                    })      
    }, [url])
    
    return state;
 
}
