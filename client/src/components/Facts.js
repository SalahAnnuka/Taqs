import { useState, useEffect } from "react";
import "./styles/Facts.css";

function Facts() {
    const [facts, setFacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            fetch('https://api.api-ninjas.com/v1/facts?limit=1', {
                headers: { 'X-API-Key': '9EdTJNjFDKxdXlNWCoafWA==WyAGa3pFE6X62WXr' }
            })
            .then(res => res.json())
            .then(data => {
                setFacts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching fact:', error);
                setIsLoading(false);
            });
        } catch (error) {
            console.error('Error fetching fact:', error);
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="Facts">
            <h2 className="facts-title">Did You Know</h2>
            {isLoading ? (
                <div className="fact">Loading...</div>
            ) : (
                <div className="fact">{facts.length > 0 ? facts[0].fact : 'No fact available'}</div>
            )}
        </div>
    );
}

export default Facts;
