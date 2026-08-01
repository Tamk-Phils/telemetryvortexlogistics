"use client";

import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Loader2, Navigation, Maximize2, Minimize2, Search, Check } from 'lucide-react';
import debounce from 'lodash.debounce';
import 'leaflet/dist/leaflet.css';

// Delivery truck emoji icon
const customIcon = L.divIcon({
    html: '<div style="font-size: 32px; line-height: 1; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">🚚</div>',
    className: 'custom-emoji-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

interface MapPickerProps {
    onChange: (lat: number, lng: number, address: string) => void;
    initialLat?: number;
    initialLng?: number;
    initialAddress?: string;
}

// Controller component to handle map movement & resize recalculations
function MapController({ position, isFullscreen }: { position: L.LatLng, isFullscreen: boolean }) {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
            if (position) {
                map.flyTo(position, Math.max(map.getZoom(), 12), { duration: 1 });
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [position, isFullscreen, map]);

    return null;
}

function LocationMarker({ position, onMapClick }: { position: L.LatLng, onMapClick: (latlng: L.LatLng) => void }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={customIcon} />
    );
}

export default function MapPicker({ onChange, initialLat, initialLng, initialAddress = "" }: MapPickerProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [position, setPosition] = useState<L.LatLng>(new L.LatLng(initialLat || 32.7767, initialLng || -96.7970));
    const [address, setAddress] = useState(initialAddress);
    const [isSearching, setIsSearching] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Reverse Geocode when map is clicked
    const handleMapClick = async (latlng: L.LatLng) => {
        setPosition(latlng);
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
            const data = await res.json();
            
            const parts = [];
            if (data.address.city || data.address.town || data.address.village) parts.push(data.address.city || data.address.town || data.address.village);
            if (data.address.state) parts.push(data.address.state);
            if (data.address.country) parts.push(data.address.country);
            
            const newAddress = parts.length > 0 ? parts.join(", ") : (data.display_name || "Selected Location");
            setAddress(newAddress);
            onChange(latlng.lat, latlng.lng, newAddress);
        } catch (error) {
            console.error("Geocoding failed", error);
            onChange(latlng.lat, latlng.lng, address);
        } finally {
            setIsSearching(false);
        }
    };

    // Forward Geocode when address is searched
    const searchAddress = async (query: string) => {
        if (!query.trim()) return;
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);
                const newPos = new L.LatLng(lat, lng);
                setPosition(newPos);
                onChange(lat, lng, query);
            }
        } catch (error) {
            console.error("Geocoding failed", error);
        } finally {
            setIsSearching(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce(searchAddress, 800), []);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        onChange(position.lat, position.lng, e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchAddress(address);
    };

    if (!isMounted) return <div className="w-full h-80 bg-slate-100 animate-pulse rounded-2xl border-2 border-dashed border-slate-200" />;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Search or Click Map Location</label>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Navigation size={12} /> Click map to set pin
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all"
                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
                        >
                            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            <span className="hidden sm:inline text-[10px] uppercase font-bold">{isFullscreen ? "Close" : "Fullscreen"}</span>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 pl-11 pr-11 font-bold text-slate-900 text-xs focus:outline-none focus:border-primary transition-all outline-none"
                        placeholder="Search address or city (e.g. Dallas, TX or Heathrow)"
                        value={address}
                        onChange={handleAddressChange}
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    {isSearching ? (
                        <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-primary animate-spin" size={18} />
                    ) : (
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-primary transition-colors">
                            <Search size={16} />
                        </button>
                    )}
                </form>
            </div>

            {/* Map Container - Inline or Fullscreen */}
            <div className={`transition-all duration-300 ${
                isFullscreen 
                    ? 'fixed inset-0 z-[99999] bg-slate-900/95 backdrop-blur-md p-4 sm:p-8 flex flex-col gap-4' 
                    : 'h-[380px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md relative z-0'
            }`}>
                {isFullscreen && (
                    <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 text-white shrink-0">
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                                <Navigation size={18} className="text-primary animate-pulse" />
                                FULLSCREEN LOCATION PICKER
                            </h3>
                            <p className="text-xs font-semibold text-slate-400">Click anywhere on the map or search to place the exact shipment pin</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsFullscreen(false)}
                            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                        >
                            <Check size={16} /> Done & Apply Location
                        </button>
                    </div>
                )}

                <div className="flex-1 w-full h-full rounded-2xl overflow-hidden relative z-0 border border-slate-200">
                    <MapContainer
                        center={[position.lat, position.lng]}
                        zoom={12}
                        style={{ height: "100%", width: "100%" }}
                        className="w-full h-full z-0"
                        scrollWheelZoom={true}
                        doubleClickZoom={true}
                        touchZoom={true}
                        zoomControl={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} onMapClick={handleMapClick} />
                        <MapController position={position} isFullscreen={isFullscreen} />
                    </MapContainer>
                </div>
            </div>

            <p className="text-[11px] font-semibold text-slate-500 flex justify-between items-center">
                <span>Selected GPS Coordinates: <span className="font-mono text-slate-900 font-bold">{position.lat.toFixed(5)}, {position.lng.toFixed(5)}</span></span>
                {address && <span className="truncate max-w-[250px] text-slate-700 font-bold">{address}</span>}
            </p>
        </div>
    );
}
