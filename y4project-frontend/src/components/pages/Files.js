import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

export const filesQuery = gql`
    {
        files
    }
`;

export const Files = () => {
    const {data, loading} = useQuery(filesQuery);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {data.files.map(x => (
                <img 
                    style={{width: 200}}
                    key={x}
                    src={`https://storage.cloud.google.com/files-to-read/${x}`}
                    alt={x}
                />
            ))}
        </div>
    );
}