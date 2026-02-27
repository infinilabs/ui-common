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

        const disabledIndices: string[] = []

        const formatIndices = result.map((item: any) => {
            const disabled = item.health === 'red' || item.status === 'close'
            if (disabled) {
                disabledIndices.push(item.index)
            }
            return {
                type: item.name?.startsWith(".") ? 'specialIndex' : 'index',
                name: item.index,
                tag: item['docs.count'] ? item['docs.count'] : undefined,
                disabled: disabled,
                _source: item
            }
        })

        const formatAliases: any[] = [];
        const aliasIndexMap: Record<string, number> = {};

        Object.entries(aliasesResult || {}).forEach(([indexName, { aliases = {} }]: any) => {
            if (!Object.keys(aliases).length) return;

            Object.entries(aliases).forEach(([aliasName]: any) => {
                const existingIndex = aliasIndexMap[aliasName];

                if (!existingIndex) {
                    const newAliasItem = {
                        type: 'alias',
                        name: aliasName,
                        disabled: disabledIndices.includes(indexName), 
                        _source: {
                            alias: aliasName,
                            indices: [indexName] 
                        }
                    };
                    aliasIndexMap[aliasName] = formatAliases.push(newAliasItem) - 1;
                } else {
                    const existingItem = formatAliases[existingIndex];
                    existingItem._source.indices.push(indexName);
                    if (disabledIndices.includes(indexName)) {
                        existingItem.disabled = true;
                    }
                }
            });
        });

        setIndices(formatAliases.concat(formatIndices))
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
                exportMaxSize={10000}
            />
        </div>
    );
};

export default App;