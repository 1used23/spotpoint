import React from 'react'

export default function TestRout(props) {
    return (
        <div>
            <div>TestRout</div>
            <div>{props.match.params.id}</div>
        </div>
    )
}