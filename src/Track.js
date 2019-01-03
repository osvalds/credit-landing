import React from "react";


export function Track({source, target, getTrackProps}) { // your own track component
    return (
        <div
            style={{
                position: 'absolute',
                height: 10,
                zIndex: 1,
                marginTop: 15,
                backgroundColor: '#26768A',
                borderRadius: 2,
                cursor: 'pointer',
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
            }}
            {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
        />
    )
}