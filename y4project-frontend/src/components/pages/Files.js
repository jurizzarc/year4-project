import React from "react";

export const Files = () => {
    const {data} = useQuery(filesQuery);

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