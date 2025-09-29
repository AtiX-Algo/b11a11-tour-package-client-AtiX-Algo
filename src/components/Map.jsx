// src/components/Map.jsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ center, tourName }) => {
    const position = [center.lat, center.lng];

    return (
        <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={false} // Prevents accidental zooming while scrolling the page
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    {tourName}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;