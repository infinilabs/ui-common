export declare const data: {
    type: string;
    id: string;
    style: {};
    color: string;
    icon: string;
    title: string;
    subtitle: string;
    url: string;
    cover: string;
    categories: string[];
    tags: string[];
    properties: ({
        icon: string;
        value: string;
        view?: undefined;
        payload?: undefined;
    } | {
        icon: string;
        value: string;
        view: string;
        payload: {};
    } | {
        icon: string;
        value: string[];
        view: string;
        payload: {};
    })[];
    details: {
        table: {
            rows: ({
                columns: {
                    label: string;
                    value: string;
                }[];
            } | {
                columns: ({
                    label: string;
                    value: string;
                    view: string;
                    payload: {
                        text: string;
                    };
                } | {
                    label: string;
                    value: string[];
                    view: string;
                    payload?: undefined;
                })[];
            })[];
        };
    };
};
