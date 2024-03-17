'use client';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { use, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder';
import { LoadScript } from '@react-google-maps/api';
import Loader from './loader';
declare module 'leaflet' {
  namespace Control {
    function Geocoder(): any;
    namespace Geocoder {
      function nominatim(): any;
    }
  }
}
export default function LeafletRoutingMachine({
  userLocation,
  targetLocation,
}: {
  userLocation: any;
  targetLocation: any;
}) {
  const map = useMap();
  console.log(
    '🚀 ~ file: LeafletRoutingMachine.tsx ~ line 20 ~ LeafletRoutingMachine ~ map',
    userLocation[0],
    targetLocation
  );
  useEffect(() => {
    // const marker1 = L.marker([10.7192, 106.6181]).addTo(map);
    if (targetLocation[0] == 0) {
      <Loader />;
    } else {
      L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(targetLocation[0], targetLocation[1]),
        ],
        lineOptions: {
          styles: [{ color: 'blue', opacity: 1, weight: 5 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0.2,
        },

        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        // addWaypoints: false,
        // : false,
        // fitSelectedRoutes: false,

        showAlternatives: true,
      }).addTo(map);
    }
  }, []);

  return null;
}
