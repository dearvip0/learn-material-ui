import React, { Component, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZGVhcnZpcDAiLCJhIjoiY2p3d3h3cWRnMHoxdjQ3bW9mZWp1NTR6aSJ9.Vd2Y8YR6IiDzKGjaSmDsuA"
});
export default function MyMap({ height, width, center, zoom, markers }) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         height: "80vh",
    //         width: "100%",
    //         lng: 106.65, //10.784328, 106.654547
    //         lat: 10.78,
    //         zoom: 13,
    //     }
    // }
    const [state, setState] = useState();
    return (
        <Map
            style="mapbox://styles/mapbox/streets-v11"
            containerStyle={{
                height: height,
                width: width,
            }}
            center={center}
            zoom={[zoom || 13]}
        >
            <ZoomControl position="top-right" />
            <Feature coordinates={[-0.13235092163085938, 51.518250335096376]} />
        </Map>
    )
}
