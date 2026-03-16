'use client';

import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react-lite';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import s from './MapPicker.module.scss';
import { MapPickerStore } from './MapPickerStore';

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Position = [number, number];

function ClickHandler({ onPick }: { onPick: (pos: Position) => void }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

type MapPickerProps = {
  onSelect: (address: string) => void;
  onClose: () => void;
  confirmLabel: string;
  cancelLabel: string;
  loadingLabel: string;
};

const MapPicker = observer(({ onSelect, onClose, confirmLabel, cancelLabel, loadingLabel }: MapPickerProps) => {
  const store = useLocalObservable(() => new MapPickerStore());

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.map}>
          <MapContainer
            center={[55.751244, 37.618423]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />
            <ClickHandler onPick={(pos) => store.pickLocation(pos)} />
            {store.position && <Marker position={store.position} icon={markerIcon} />}
          </MapContainer>
        </div>

        {store.address && (
          <div className={s.preview}>
            {store.loading ? loadingLabel : store.address}
          </div>
        )}

        <div className={s.actions}>
          <button className={s.cancel} onClick={onClose}>{cancelLabel}</button>
          <button
            className={s.confirm}
            disabled={!store.address || store.loading}
            onClick={() => onSelect(store.address)}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
});

export default MapPicker;
