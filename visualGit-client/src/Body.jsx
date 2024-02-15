import React, { useState, useEffect } from 'react'
import { Commit } from './Commit';

export const Body = () => {
    const [commitData, setCommitData] = useState();

    useEffect(() => {
        fetch('http://localhost:8888/commit/all').then(res => res.json()).then((data) => setCommitData(data));
    }, []);

    return (

        // Currently, the commit history have a full height since it is the only element in the body.
        <div className='flex items-end h-full'>
            {commitData && commitData.all.map((commit, index) => <Commit key={index} data={commit} isLast={index == commitData.all.length - 1} />)}
        </div>
    )
}
