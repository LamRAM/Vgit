import React, { useState } from 'react'
import Branches from './Branch/Branches';
import Container from './Branch/Container';

export const Commit = (props) => {
    const [hover, setHover] = useState(false);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

    let commit = props.data;
    let refs = commit.refs;

    return (
        <div>
            <div className='flex'>
                <div
                    onMouseEnter={(e) => {
                        setHover(true);
                        setPositionX(e.clientX);
                        setPositionY(e.clientY);
                    }}
                    onMouseLeave={() => setHover(false)}
                    onMouseMove={(e) => {
                        setPositionX(e.clientX);
                        setPositionY(e.clientY);
                    }}
                    className='flex flex-col gap-4 items-center self-start'>
                    <div className='flex flex-col h-full items-center'>
                        {refs ? <Container refs={refs}/> : null}
                    </div>
                    <div className='circle' style={{ borderColor: refs[0].includes("HEAD") ? "#581c87" : null }}>
                    </div>
                    <p title={commit.hash}> {commit.hash.substring(0, 7)}</p>
                    {hover && <div style={{ position: "absolute", left: positionX, top: positionY }} className='flex flex-col gap-2 text-left bg-slate-50 p-4 rounded-md'>
                        <p>{commit.hash}</p>
                        <p><b>{commit.message}</b></p>
                        <p>{commit.body}</p>
                        <p><small>{new Date(commit.date).toDateString()}</small></p>
                    </div>}
                </div>
                {!props.isLast && <svg className='self-end	' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs >
                        <marker
                            id="arrow"
                            viewBox="0 0 10 10"
                            refX="10"
                            refY="5"
                            markerWidth="15"
                            markerHeight="10"
                            orient="auto-start-reverse">
                            <path d="M 10 5 L 0 10 M 10 5 L 0 0  z" />
                        </marker>
                    </defs>
                    <line x1="0" y1="20" x2="100" y2="20" stroke="black" markerStart="url(#arrow)" />
                </svg>
                }
            </div>
        </div>

    )
}
