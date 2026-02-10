import React, { useEffect, useState } from 'react';
import Discover, { IIndexProps } from "./components/index.tsx";

const App = () => {

    const [indices, setIndices] = useState<IIndexProps[]>([])
    const [queryParams, setQueryParams] = useState({})

    const getIndices = async () => {
        const res = await fetch(`/api/_cat/indices?format=json`)
        const result = await res.json() as any;
        const resAliases = await fetch(`/api/_aliases`)
        const aliasesResult = await resAliases.json() as any;
        const aliasMap: any = {};
        Object.entries(aliasesResult || {}).forEach(([indexName, { aliases = {} }]: any) => {
            if (!Object.keys(aliases).length) return;
            Object.entries(aliases).forEach(([aliasName, aliasConfig]: any) => {
                const config = { is_write_index: false, ...aliasConfig };
                aliasMap[aliasName] ||= { alias: aliasName, indices: [], writeIndex: undefined };
                aliasMap[aliasName].indices.push({ alias: aliasName, index: indexName, ...config });
                config.is_write_index && (aliasMap[aliasName].writeIndex = indexName);
            });
        });
        setIndices(Object.values(aliasMap).map((item: any) => ({
            type: 'alias',
            name: item.alias,
            _source: item
        })).concat(
            result.map((item: any) => ({
                type: 'index',
                name: item.index,
                tag: item['docs.count'] ? item['docs.count'] : undefined,
                _source: item
            }))
        ))
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
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                locale='zh-CN'
                theme='light'
            />
        </div>
    );
};

export default App;