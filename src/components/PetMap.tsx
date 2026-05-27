import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MapPet = {
  id: number;
  name: string;
  type: string;
  city: string;
  lat: number;
  lng: number;
};

type Props = {
  pets: MapPet[];
  selected: MapPet | null;
  onSelect: (pet: MapPet | null) => void;
};

export default function PetMap({ pets, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<number, L.Marker>>({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [56.0097, 92.8725],
      zoom: 12,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.attribution({ prefix: "© OpenStreetMap" }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    pets.forEach(pet => {
      const isSelected = selected?.id === pet.id;
      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:${isSelected ? 48 : 40}px;
          height:${isSelected ? 48 : 40}px;
          background:${isSelected ? "var(--color-primary, #7c3aed)" : "#fff"};
          border:2.5px solid ${isSelected ? "#fff" : "var(--color-primary, #7c3aed)"};
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:${isSelected ? 24 : 20}px;
          box-shadow:0 2px 8px rgba(0,0,0,0.18);
          transition:all 0.2s;
        ">${pet.type}</div>`,
        iconSize: [isSelected ? 48 : 40, isSelected ? 48 : 40],
        iconAnchor: [isSelected ? 24 : 20, isSelected ? 24 : 20],
      });

      const marker = L.marker([pet.lat, pet.lng], { icon })
        .addTo(map)
        .on("click", () => onSelect(selected?.id === pet.id ? null : pet));

      markersRef.current[pet.id] = marker;
    });
  }, [pets, selected, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selected) return;
    map.flyTo([selected.lat, selected.lng], 14, { duration: 0.8 });
  }, [selected]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "360px", borderRadius: "1.5rem", overflow: "hidden" }}
    />
  );
}
