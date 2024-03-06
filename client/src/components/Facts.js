import { useState, useEffect } from "react";
import "./styles/Facts.css"

function Facts(){
    const [facts, setFacts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

//9EdTJNjFDKxdXlNWCoafWA==WyAGa3pFE6X62WXr

    useEffect(()=>{
        try 
        {
            fetch('https://api.api-ninjas.com/v1/facts?limit=1',
            { headers: { 'X-API-Key': '9EdTJNjFDKxdXlNWCoafWA==WyAGa3pFE6X62WXr' } })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                setFacts(data);
                setIsLoading(false);
                console.log(facts);
            });          
        } 
        catch (error)
        {
            console.error('Error fetching fact:', error);
            // Handle errors appropriately, e.g., display an error message
            setFacts([]);
            setIsLoading(true);
        }
        return()=>{};
    },[]);


    if (isLoading)
        return(
            <div className="Facts">
            <h2 className="facts-title">Did You Know</h2>
               <div className="fact">All you would see is this text if the fact doesn't load</div>
            </div>
        );
    else return (
        <div className="Facts">
        <h2 className="facts-title">Did You Know</h2>
           <div className="fact">{facts[0].fact}</div>
        </div>
    );



}

export default Facts;