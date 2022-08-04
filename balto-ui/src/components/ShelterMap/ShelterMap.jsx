import React from 'react'
import { Map, Marker, ZoomControl } from "pigeon-maps"


export default function ShelterMap({ lat, lon }) {

    const [hue, setHue] = React.useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`

    if (lat && lon) {
        return (
            <div>
                <Map height={300} defaultCenter={[lat, lon]} defaultZoom={11}>
                    <ZoomControl />
                    <Marker
                        width={50}
                        anchor={[lat, lon]}
                        color={color}
                        onClick={() => {setHue(hue + 20)}
                    }
                    />
                </Map>
            </div>
        )
    }
}




// import React from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


// export default function ShelterMap({ lat, lon }) {

//     if (lat && lon) {
//         return (
//             <div>
//                 <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={false}>
//                     <TileLayer
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <Marker position={[lat, lon]}>
//                         <Popup>
//                             A pretty CSS3 popup. <br /> Easily customizable.
//                         </Popup>
//                     </Marker>
//                 </MapContainer>
//             </div>
//         )
//     }
// }
