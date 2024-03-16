import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useMap } from 'react-leaflet';
declare module 'leaflet' {
  namespace Control {
    function geocoder(options?: any): any;
  }
}
export default function LeafletGeo() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e: any) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);
  return <div></div>;
}
