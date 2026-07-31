"use client";

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCoordsFromLocationName } from '@/lib/geocoding';

// Origin Icon (Start Point)
const originIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 bg-emerald-500/20 rounded-full animate-ping absolute"></div>
            <div class="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white font-black text-[10px]">
                A
            </div>
            <div class="absolute -bottom-8 bg-slate-900 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded shadow-md whitespace-nowrap uppercase tracking-wider border border-emerald-500/30">
                START
            </div>
        </div>
    `,
    className: 'custom-origin-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

// Destination Icon (End Point)
const destinationIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 bg-indigo-500/20 rounded-full animate-ping absolute"></div>
            <div class="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white font-black text-[10px]">
                B
            </div>
            <div class="absolute -bottom-8 bg-slate-900 text-indigo-400 text-[9px] font-black px-2 py-0.5 rounded shadow-md whitespace-nowrap uppercase tracking-wider border border-indigo-500/30">
                FINISH
            </div>
        </div>
    `,
    className: 'custom-dest-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

// Moving Package Icon
const movingTruckIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-primary/30 rounded-full animate-ping"></div>
            <div class="relative w-10 h-10 bg-primary text-white border-2 border-white rounded-full flex items-center justify-center shadow-2xl text-lg">
                🚚
            </div>
            <div class="absolute -top-9 bg-slate-900 text-primary text-[9px] font-black px-2.5 py-1 rounded shadow-xl whitespace-nowrap uppercase tracking-widest border border-primary/40 flex items-center gap-1">
                <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                LIVE PACKAGE
            </div>
        </div>
    `,
    className: 'custom-moving-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

interface LiveMapProps {
    lat?: number;
    lng?: number;
    originLat?: number;
    originLng?: number;
    originName?: string;
    destinationLat?: number;
    destinationLng?: number;
    destinationName?: string;
    currentLocationName?: string;
    zoom?: number;
}

// Component to handle map view fitting all route markers
function FitBoundsView({ bounds }: { bounds: L.LatLngBoundsExpression }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
        }
    }, [bounds, map]);
    return null;
}

export default function LiveMap({
    lat,
    lng,
    originLat,
    originLng,
    originName,
    destinationLat,
    destinationLng,
    destinationName,
    currentLocationName,
    zoom = 8
}: LiveMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    // Resolve Origin Coordinates
    let startCoords: [number, number] = [32.7767, -96.7970]; // Default Dallas
    if (originLat && originLng) {
        startCoords = [originLat, originLng];
    } else if (originName) {
        const resolved = getCoordsFromLocationName(originName);
        if (resolved) startCoords = resolved;
    }

    // Resolve Destination Coordinates
    let destCoords: [number, number] = [40.7128, -74.0060]; // Default NY
    if (destinationLat && destinationLng) {
        destCoords = [destinationLat, destinationLng];
    } else if (destinationName) {
        const resolved = getCoordsFromLocationName(destinationName);
        if (resolved) destCoords = resolved;
    }

    // Resolve Current Package Location Coordinates
    let currentCoords: [number, number];
    if (lat && lng) {
        currentCoords = [lat, lng];
    } else if (currentLocationName) {
        const resolved = getCoordsFromLocationName(currentLocationName);
        currentCoords = resolved || [(startCoords[0] + destCoords[0]) / 2, (startCoords[1] + destCoords[1]) / 2];
    } else {
        // Calculate midpoint
        currentCoords = [(startCoords[0] + destCoords[0]) / 2, (startCoords[1] + destCoords[1]) / 2];
    }

    // Animated moving position along the route
    const [movingPos, setMovingPos] = useState<[number, number]>(startCoords);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Animate moving package icon along route from Origin -> Current -> Destination -> Origin
    useEffect(() => {
        if (!isMounted) return;

        let progress = 0;
        const speed = 0.005; // speed factor

        const interval = setInterval(() => {
            progress += speed;
            if (progress > 1) progress = 0;

            // Interpolate position along path: start -> current (0 to 0.6), current -> dest (0.6 to 1)
            let newLat: number, newLng: number;
            if (progress <= 0.65) {
                const t = progress / 0.65;
                newLat = startCoords[0] + (currentCoords[0] - startCoords[0]) * t;
                newLng = startCoords[1] + (currentCoords[1] - startCoords[1]) * t;
            } else {
                const t = (progress - 0.65) / 0.35;
                newLat = currentCoords[0] + (destCoords[0] - currentCoords[0]) * t;
                newLng = currentCoords[1] + (destCoords[1] - currentCoords[1]) * t;
            }

            setMovingPos([newLat, newLng]);
        }, 60);

        return () => clearInterval(interval);
    }, [isMounted, startCoords, currentCoords, destCoords]);

    if (!isMounted) return <div className="w-full h-full bg-slate-100 animate-pulse rounded-sm" />;

    const bounds: L.LatLngBoundsExpression = [
        startCoords,
        currentCoords,
        destCoords
    ];

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={currentCoords}
                zoom={zoom}
                className="w-full h-full rounded-sm z-0"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* Traversed Path: Origin -> Current Location (Solid Glowing Primary Color Line) */}
                <Polyline
                    positions={[startCoords, currentCoords]}
                    pathOptions={{ color: '#0070F3', weight: 6, opacity: 0.8 }}
                />

                {/* Remaining Path: Current Location -> Destination (Dashed Line) */}
                <Polyline
                    positions={[currentCoords, destCoords]}
                    pathOptions={{ color: '#64748B', weight: 4, dashArray: '8, 10', opacity: 0.6 }}
                />

                {/* Start Marker */}
                <Marker position={startCoords} icon={originIcon}>
                    <Popup>
                        <div className="font-bold text-xs uppercase text-slate-900">
                            Origin: {originName || "Start Location"}
                        </div>
                    </Popup>
                </Marker>

                {/* Destination Marker */}
                <Marker position={destCoords} icon={destinationIcon}>
                    <Popup>
                        <div className="font-bold text-xs uppercase text-slate-900">
                            Destination: {destinationName || "Final Destination"}
                        </div>
                    </Popup>
                </Marker>

                {/* Moving Package Marker */}
                <Marker position={movingPos} icon={movingTruckIcon}>
                    <Popup>
                        <div className="font-bold text-xs uppercase text-slate-900">
                            Current Location: {currentLocationName || "In Transit"}
                        </div>
                    </Popup>
                </Marker>

                <FitBoundsView bounds={bounds} />
            </MapContainer>
        </div>
    );
}
