import { makeAutoObservable, runInAction } from 'mobx';

type Position = [number, number];

export class MapPickerStore {
  position: Position | null = null;
  address = '';
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async pickLocation(pos: Position) {
    this.position = pos;
    this.loading = true;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${pos[0]}&lon=${pos[1]}&format=json`,
        { headers: { 'Accept-Language': 'ru' } }
      );
      const data = await res.json();
      runInAction(() => {
        this.address = data.display_name ?? `${pos[0].toFixed(5)}, ${pos[1].toFixed(5)}`;
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.address = `${pos[0].toFixed(5)}, ${pos[1].toFixed(5)}`;
        this.loading = false;
      });
    }
  }
}
