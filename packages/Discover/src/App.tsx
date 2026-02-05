import React, { useEffect, useState } from 'react';
import Discover from "./components/index.tsx";

const App = () => {

    const [indices, setIndices] = useState([])

    const getIndices = async () => {
        const res = await fetch(`/api/_cat/indices?format=json`)
        const result = await res.json() as any;
        
        setIndices(result.map((item: any) => item.index))
    }

    const getIndexPattern = async (index: string) => {
        return fetch(`/api/${index}/_field_caps?fields=*`)
        .then((res) => res.json())
        .catch((error) => {
            console.log('error', error)
        })
    }

    const onSuggestions = async (index: string, body: any = {}) => {
        return fetch(`/api/${index}/_search`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .catch((error) => {
            console.log('error', error)
        })
    }

    const onSearch = async (index: string, body: any = {}) => {
        return fetch(`/api/${index}/_search`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .catch((error) => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        getIndices()
    }, [])
    
    return (
        <div style={{ height: '100%', padding: '24px', margin: '0 auto' }}>
            <Discover
                indices={indices}
                getIndexPattern={getIndexPattern}
                onSuggestions={onSuggestions}
                onSearch={onSearch}
            />
        </div>
    );
};

export default App;