import React from 'react'
import {Handles, Rail, Slider, Tracks} from "react-compound-slider";
import {Handle} from "./Handle";
import {Track} from "./Track";

const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '100%',
    height: 40,
};

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 15,
    borderRadius: 2,
    backgroundColor: '#2AB7CA',
};

export function CustomSlider({domain, step, values, onUpdate}) {
    return (
        <div className="slider-wrapper">
            <Slider
                rootStyle={sliderStyle}
                domain={domain}
                step={step}
                mode={2}
                values={values}
                onUpdate={onUpdate}>
                <Rail>
                    {({getRailProps}) => (
                        <div style={railStyle} {...getRailProps()} />
                    )}
                </Rail>
                <Handles>
                    {({handles, getHandleProps}) => (
                        <div className="slider-handles">
                            {handles.map(handle => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks right={false}>
                    {({tracks, getTrackProps}) => (
                        <div className="slider-tracks">
                            {tracks.map(({id, source, target}) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
            </Slider>
        </div>)}