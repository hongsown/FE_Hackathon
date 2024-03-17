'use client';
import Heading from '@/components/heading';
import axios from 'axios';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
// eslint-disable-next-line react-hooks/rules-of-hooks
import LeafletRoutingMachine from '@/components/LeafletRoutingMachine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import Loader from '@/components/loader';
const GoogleMap = () => {
  const [location, setLocation] = useState([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [targetLocation, setTargetLocation] = useState<[number, number]>([
    0, 0,
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://trusted-killdeer-basically.ngrok-free.app/api/recycle-places',
        {
          params: {
            x: userLocation[0],
            y: userLocation[1],
          },
        }
      );
      console.log('🚀 ~ fetchData ~ response:', response.data.data);
      setLocation(response.data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (location.length > 0) {
      let res: any = location.find((item: any) => item.is_priority == 1);
      if (res) {
        setTargetLocation([res.y, res.x]);
      }
    }
  }, [location]);

  console.log('🚀 ~ GoogleMap ~ location:', targetLocation);
  // create custom icon
  const customIcon = new L.Icon({
    // iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    iconUrl: '/marker.png',
    iconSize: [38, 38], // size of the icon
  });
  const myLocationIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    // iconUrl: '/marker.png',
    iconSize: [38, 38], // size of the icon
  });
  // custom cluster icon
  const createClusterCustomIcon = function (cluster: any) {
    return L.divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: 'custom-marker-cluster',
      iconSize: L.point(33, 33, true),
    });
  };
  type Marker = {
    geoX: number;
    geoY: number;
    popUp: string;
  };
  const markers: Marker[] = [];

  if (location.length > 0) {
    location.map((marker: any) => {
      markers.push({
        geoX: marker.x as number,
        geoY: marker.y as number,
        popUp: marker.name,
      });
    });
  }
  console.log('🚀 ~ GoogleMap ~ markers aaaaa:', markers);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },

        (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        }
      );
    }
  }, []);
  console.log(
    '🚀 ~ file: page.tsx ~ line 123 ~ GoogleMap ~ userLocation',
    userLocation,
    userLocation[0]
  );
  return (
    <div>
      <Heading
        title='Map'
        icon={Map}
        description='Địa điểm tái chế rác gần bạn.'
        iconColor='text-orange-500'
        bgColor='bg-orange-700/10'
      />
      <div className='px-4 lg:px-8'>
        {userLocation[0] != 0 && (
          <MapContainer
            style={{ zIndex: 1 }}
            center={[userLocation[0], userLocation[1]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {/* <LeafletGeo /> */}

            {targetLocation[0] != 0 && (
              <LeafletRoutingMachine
                userLocation={userLocation}
                targetLocation={targetLocation}
              />
            )}

            {userLocation && (
              <Marker
                position={[userLocation[0], userLocation[1]]}
                icon={myLocationIcon}
              >
                {/* <Popup>{marker.popUp}</Popup> */}
              </Marker>
            )}

            {/* Mapping through the markers */}
            {markers.length > 0 && (
              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
              >
                {markers.map((marker: any) => (
                  <Marker
                    key={marker.geocode}
                    position={[marker.geoY, marker.geoX]}
                    icon={customIcon}
                    eventHandlers={{
                      click: (e) => {
                        console.log('Marker clicked', e);
                        setTargetLocation([e.latlng.lat, e.latlng.lng]);
                        // Add your own logic here
                      },
                    }}
                  >
                    <Popup>{marker.popUp}</Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default GoogleMap;
