// "use client";

// import React, { useEffect, useRef, useState } from 'react';

// interface ClinicLocation {
//     lat: number;
//     lng: number;
//     name: string;
//     address: string;
//     phone: string;
// }

// interface LeafletMapOptions {
//     center: [number, number];
//     zoom: number;
//     zoomControl: boolean;
//     scrollWheelZoom: boolean;
//     touchZoom: boolean;
//     doubleClickZoom: boolean;
//     boxZoom: boolean;
//     keyboard: boolean;
//     dragging: boolean;
// }

// interface LeafletTileLayerOptions {
//     attribution: string;
//     maxZoom: number;
// }

// interface LeafletMap {
//     remove: () => void;
//     invalidateSize: () => void;
//     setView: (coords: [number, number], zoom: number) => void;
//     fitBounds: (bounds: [[number, number], [number, number]], options?: { padding: [number, number] }) => void;
// }

// interface LeafletTileLayer {
//     addTo: (map: LeafletMap) => void;
// }

// interface LeafletIcon {
//     className: string;
//     html: string;
//     iconSize: [number, number];
//     iconAnchor: [number, number];
//     popupAnchor: [number, number];
// }

// interface LeafletMarkerOptions {
//     icon: LeafletIcon;
// }

// interface LeafletMarker {
//     bindPopup: (content: string) => LeafletMarker;
//     addTo: (map: LeafletMap) => LeafletMarker;
// }

// interface LeafletLatLng {
//     lat: number;
//     lng: number;
// }

// interface LeafletLatLngBounds {
//     extend: (coords: [number, number]) => LeafletLatLngBounds;
//     getSouthWest: () => LeafletLatLng;
//     getNorthEast: () => LeafletLatLng;
// }

// // Extend Window interface for Leaflet
// declare global {
//     interface Window {
//         L: {
//             map: (element: HTMLElement, options: LeafletMapOptions) => LeafletMap;
//             tileLayer: (url: string, options: LeafletTileLayerOptions) => LeafletTileLayer;
//             divIcon: (options: Partial<LeafletIcon>) => LeafletIcon;
//             marker: (coords: [number, number], options: LeafletMarkerOptions) => LeafletMarker;
//             latLngBounds: () => LeafletLatLngBounds;
//         };
//     }
// }

// export const Maps: React.FC = () => {
//     const mapRef = useRef<HTMLDivElement>(null);
//     const mapInstanceRef = useRef<LeafletMap | null>(null);
//     const [isLoaded, setIsLoaded] = useState<boolean>(false);

//     // Both clinic locations
//     const clinicLocations: ClinicLocation[] = [
//         {
//             lat: 26.64337,
//             lng: 87.99309,
//             name: "Pathivara Dental Care & Implant Centre",
//             address: "Near Hanuman Central, Birtamode, Jhapa, Nepal",
//             phone: "023-536424"
//         },
//         {
//             lat: 26.66049, // Update with actual Dhulabari coordinates
//             lng: 88.10066, // Update with actual Dhulabari coordinates
//             name: "Pathivara Apollo Dental Clinic",
//             address: "Near Atithi Sadan, Dhulabari, Jhapa, Nepal",
//             phone: "023-XXXXXX" // Update with actual phone number
//         }
//     ];

//     useEffect(() => {
//         // Load Leaflet CSS and JS
//         const loadLeaflet = async (): Promise<void> => {
//             // Load CSS
//             if (!document.querySelector('link[href*="leaflet"]')) {
//                 const cssLink: HTMLLinkElement = document.createElement('link');
//                 cssLink.rel = 'stylesheet';
//                 cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
//                 document.head.appendChild(cssLink);
//             }

//             // Load JS
//             if (!window.L) {
//                 const script: HTMLScriptElement = document.createElement('script');
//                 script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
//                 script.onload = (): void => {
//                     setIsLoaded(true);
//                 };
//                 document.head.appendChild(script);
//             } else {
//                 setIsLoaded(true);
//             }
//         };

//         loadLeaflet();
//     }, []);

//     useEffect(() => {
//         if (isLoaded && mapRef.current && !mapInstanceRef.current) {
//             // Calculate center point between both locations
//             const centerLat = (clinicLocations[0].lat + clinicLocations[1].lat) / 2;
//             const centerLng = (clinicLocations[0].lng + clinicLocations[1].lng) / 2;

//             // Initialize map
//             const map = window.L.map(mapRef.current, {
//                 center: [centerLat, centerLng],
//                 zoom: 12,
//                 zoomControl: true,
//                 scrollWheelZoom: true,
//                 touchZoom: true,
//                 doubleClickZoom: true,
//                 boxZoom: true,
//                 keyboard: true,
//                 dragging: true,
//             });

//             // Add OpenStreetMap tile layer
//             window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: '© OpenStreetMap contributors',
//                 maxZoom: 19,
//             }).addTo(map);

//             // Create custom marker icon function
//             const createCustomIcon = (color: string, label: string) => {
//                 return window.L.divIcon({
//                     className: 'custom-marker',
//                     html: `
//                         <div style="
//                             background: linear-gradient(90deg, ${color === 'teal' ? 'hsl(175, 65%, 45%)' : 'hsl(10, 80%, 62%)'} 0%, ${color === 'teal' ? 'hsl(180, 70%, 30%)' : 'hsl(10, 75%, 75%)'} 100%);
//                             width: 35px;
//                             height: 35px;
//                             border-radius: 50% 50% 50% 0;
//                             transform: rotate(-45deg);
//                             border: 3px solid white;
//                             box-shadow: 0px 10px 30px hsla(${color === 'teal' ? '175, 65%, 45%' : '10, 80%, 62%'}, 0.4);
//                             display: flex;
//                             align-items: center;
//                             justify-content: center;
//                         ">
//                             <div style="
//                                 transform: rotate(45deg);
//                                 color: white;
//                                 font-size: 16px;
//                                 font-weight: bold;
//                             ">${label}</div>
//                         </div>
//                     `,
//                     iconSize: [45, 45],
//                     iconAnchor: [22, 40],
//                     popupAnchor: [0, -40],
//                 });
//             };

//             // Add markers for both locations
//             clinicLocations.forEach((location, index) => {
//                 const markerColor = index === 0 ? 'teal' : 'coral';
//                 const markerLabel = index === 0 ? '1' : '2';

//                 const customIcon = createCustomIcon(markerColor, markerLabel);

//                 const marker: LeafletMarker = window.L.marker([location.lat, location.lng], {
//                     icon: customIcon
//                 }).addTo(map);

//                 // Create popup content
//                 const popupContent: string = `
//                     <div style="
//                         font-family: 'Poppins', sans-serif;
//                         text-align: center;
//                         padding: 12px;
//                         min-width: 220px;
//                     ">
//                         <div style="
//                             background: linear-gradient(90deg, hsl(175, 65%, 45%) 0%, hsl(10, 80%, 62%) 100%);
//                             color: white;
//                             padding: 8px;
//                             border-radius: 4px;
//                             margin-bottom: 12px;
//                         ">
//                             <h3 style="
//                                 font-size: 1.6rem;
//                                 font-weight: 700;
//                                 margin: 0;
//                             ">${location.name}</h3>
//                         </div>
//                         <p style="
//                             color: hsl(180, 18%, 48%);
//                             font-size: 1.4rem;
//                             line-height: 1.5;
//                             margin-bottom: 8px;
//                         ">📍 ${location.address}</p>
//                         <p style="
//                             color: hsl(175, 65%, 45%);
//                             font-size: 1.4rem;
//                             font-weight: 600;
//                             margin-bottom: 12px;
//                         ">📞 ${location.phone}</p>
//                         <button onclick="window.open('https://www.google.com/maps/dir//${location.lat},${location.lng}', '_blank')" style="
//                             background: linear-gradient(90deg, hsl(175, 65%, 45%) 0%, hsl(10, 80%, 62%) 100%);
//                             color: white;
//                             border: none;
//                             padding: 10px 20px;
//                             border-radius: 4px;
//                             font-size: 1.3rem;
//                             font-weight: 600;
//                             cursor: pointer;
//                             text-transform: uppercase;
//                             transition: transform 0.25s ease;
//                             box-shadow: 0px 10px 30px hsla(10, 80%, 62%, 0.3);
//                         " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//                             Get Directions
//                         </button>
//                     </div>
//                 `;

//                 marker.bindPopup(popupContent);
//             });

//             // Fit map to show both markers
//             const bounds = window.L.latLngBounds();
//             clinicLocations.forEach(location => {
//                 bounds.extend([location.lat, location.lng]);
//             });

//             const southWest = bounds.getSouthWest();
//             const northEast = bounds.getNorthEast();

//             map.fitBounds([
//                 [southWest.lat, southWest.lng],
//                 [northEast.lat, northEast.lng]
//             ], {
//                 padding: [50, 50]
//             });

//             // Store map instance
//             mapInstanceRef.current = map;

//             // Handle resize
//             const handleResize = (): void => {
//                 if (mapInstanceRef.current) {
//                     mapInstanceRef.current.invalidateSize();
//                 }
//             };

//             window.addEventListener('resize', handleResize);

//             return (): void => {
//                 window.removeEventListener('resize', handleResize);
//                 if (mapInstanceRef.current) {
//                     mapInstanceRef.current.remove();
//                     mapInstanceRef.current = null;
//                 }
//             };
//         }
//     }, [isLoaded, clinicLocations]);

//     return (
//         <section className="section">
//             <div className="custom-container">
//                 {/* Section Header */}
//                 <div className="text-center" style={{ marginBottom: '50px' }}>
//                     <p className="section-subtitle">Find Us</p>
//                     <h2 className="h2 section-title">Our Locations</h2>
//                     <p className="section-text" style={{
//                         maxWidth: '700px',
//                         margin: '20px auto 0',
//                         color: 'var(--teal-gray)'
//                     }}>
//                         Visit either of our conveniently located branches in Birtamode or Dhulabari for comprehensive dental care.
//                     </p>
//                 </div>

//                 {/* Map Container */}
//                 <div style={{
//                     position: 'relative',
//                     borderRadius: 'var(--radius-6)',
//                     overflow: 'hidden',
//                     boxShadow: 'var(--shadow-3)',
//                     backgroundColor: 'var(--white)',
//                     border: '2px solid var(--light-seafoam)'
//                 }}>
//                     {/* Loading State */}
//                     {!isLoaded && (
//                         <div style={{
//                             height: '500px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             backgroundColor: 'var(--pale-aqua)',
//                             color: 'var(--teal-gray)'
//                         }}>
//                             <div style={{ textAlign: 'center' }}>
//                                 <div style={{
//                                     width: '40px',
//                                     height: '40px',
//                                     border: '4px solid var(--light-seafoam)',
//                                     borderTop: '4px solid var(--bright-teal)',
//                                     borderRadius: '50%',
//                                     animation: 'spin 1s linear infinite',
//                                     marginInline: 'auto',
//                                     marginBlockEnd: '15px'
//                                 }}></div>
//                                 <p style={{ fontSize: '1.6rem', fontWeight: '600' }}>Loading Map...</p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Map */}
//                     <div
//                         ref={mapRef}
//                         style={{
//                             height: '500px',
//                             width: '100%',
//                             zIndex: 1,
//                             display: isLoaded ? 'block' : 'none'
//                         }}
//                     />
//                 </div>

//                 {/* Location Cards Below Map */}
//                 <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                     gap: '30px',
//                     marginTop: '40px'
//                 }}>
//                     {clinicLocations.map((location, index) => (
//                         <div key={index} style={{
//                             backgroundColor: 'var(--white)',
//                             padding: '25px',
//                             borderRadius: 'var(--radius-6)',
//                             boxShadow: 'var(--shadow-2)',
//                             border: '2px solid var(--light-seafoam)',
//                             transition: 'var(--transition-2)'
//                         }}>
//                             <div style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '10px',
//                                 marginBottom: '15px'
//                             }}>
//                                 <div style={{
//                                     width: '30px',
//                                     height: '30px',
//                                     background: index === 0 ? 'var(--bright-teal)' : 'var(--vibrant-coral)',
//                                     borderRadius: '50%',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     color: 'white',
//                                     fontWeight: 'bold',
//                                     fontSize: '1.6rem'
//                                 }}>
//                                     {index + 1}
//                                 </div>
//                                 <h3 style={{
//                                     color: 'var(--darkest-teal)',
//                                     fontSize: '1.8rem',
//                                     fontWeight: '700',
//                                     margin: 0
//                                 }}>
//                                     {location.name}
//                                 </h3>
//                             </div>
//                             <p style={{
//                                 color: 'var(--teal-gray)',
//                                 fontSize: '1.4rem',
//                                 lineHeight: '1.6',
//                                 marginBottom: '8px'
//                             }}>
//                                 📍 {location.address}
//                             </p>
//                             <p style={{
//                                 color: 'var(--bright-teal)',
//                                 fontSize: '1.4rem',
//                                 fontWeight: '600'
//                             }}>
//                                 📞 {location.phone}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* CSS for loading animation */}
//             <style jsx>{`
//                 @keyframes spin {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                 }

//                 /* Custom map controls styling */
//                 :global(.leaflet-control-zoom) {
//                     border: none !important;
//                     border-radius: var(--radius-4) !important;
//                     box-shadow: var(--shadow-2) !important;
//                 }

//                 :global(.leaflet-control-zoom a) {
//                     background-color: var(--white) !important;
//                     color: var(--darkest-teal) !important;
//                     border: none !important;
//                     transition: var(--transition) !important;
//                 }

//                 :global(.leaflet-control-zoom a:hover) {
//                     background-color: var(--bright-teal) !important;
//                     color: var(--white) !important;
//                 }

//                 :global(.leaflet-popup-content-wrapper) {
//                     border-radius: var(--radius-6) !important;
//                     box-shadow: var(--shadow-3) !important;
//                     border: none !important;
//                 }

//                 :global(.leaflet-popup-tip) {
//                     background-color: white !important;
//                     box-shadow: var(--shadow-2) !important;
//                 }

//                 /* Responsive adjustments */
//                 @media (max-width: 768px) {
//                     :global(.leaflet-control-zoom) {
//                         transform: scale(0.9);
//                     }
//                 }
//             `}</style>
//         </section>
//     );
// };

































"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ClinicLocation {
    lat: number;
    lng: number;
    name: string;
    address: string;
    phone: string;
}

interface LeafletMapOptions {
    center: [number, number];
    zoom: number;
    zoomControl: boolean;
    scrollWheelZoom: boolean;
    touchZoom: boolean;
    doubleClickZoom: boolean;
    boxZoom: boolean;
    keyboard: boolean;
    dragging: boolean;
}

interface LeafletTileLayerOptions {
    attribution: string;
    maxZoom: number;
}

interface LeafletMap {
    remove: () => void;
    invalidateSize: () => void;
    setView: (coords: [number, number], zoom: number) => void;
    fitBounds: (bounds: [[number, number], [number, number]], options?: { padding: [number, number] }) => void;
}

interface LeafletTileLayer {
    addTo: (map: LeafletMap) => void;
}

interface LeafletIcon {
    className: string;
    html: string;
    iconSize: [number, number];
    iconAnchor: [number, number];
    popupAnchor: [number, number];
}

interface LeafletMarkerOptions {
    icon: LeafletIcon;
}

interface LeafletMarker {
    bindPopup: (content: string) => LeafletMarker;
    addTo: (map: LeafletMap) => LeafletMarker;
}

interface LeafletLatLng {
    lat: number;
    lng: number;
}

interface LeafletLatLngBounds {
    extend: (coords: [number, number]) => LeafletLatLngBounds;
    getSouthWest: () => LeafletLatLng;
    getNorthEast: () => LeafletLatLng;
}

// Extend Window interface for Leaflet
declare global {
    interface Window {
        L: {
            map: (element: HTMLElement, options: LeafletMapOptions) => LeafletMap;
            tileLayer: (url: string, options: LeafletTileLayerOptions) => LeafletTileLayer;
            divIcon: (options: Partial<LeafletIcon>) => LeafletIcon;
            marker: (coords: [number, number], options: LeafletMarkerOptions) => LeafletMarker;
            latLngBounds: () => LeafletLatLngBounds;
        };
    }
}

// Both clinic locations (defined outside component to prevent re-creation)
const CLINIC_LOCATIONS: ClinicLocation[] = [
    {
        lat: 26.64337,
        lng: 87.99309,
        name: "Pathivara Dental Care & Implant Centre",
        address: "Near Hanuman Central, Birtamode, Jhapa, Nepal",
        phone: "023-536424"
    },
    {
        lat: 26.66049, // Update with actual Dhulabari coordinates
        lng: 88.10066, // Update with actual Dhulabari coordinates
        name: "Pathivara Apollo Dental Clinic",
        address: "Near Atithi Sadan, Dhulabari, Jhapa, Nepal",
        phone: "023-XXXXXX" // Update with actual phone number
    }
];

export const Maps: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<LeafletMap | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Load Leaflet CSS and JS
        const loadLeaflet = async (): Promise<void> => {
            // Load CSS
            if (!document.querySelector('link[href*="leaflet"]')) {
                const cssLink: HTMLLinkElement = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
                document.head.appendChild(cssLink);
            }

            // Load JS
            if (!window.L) {
                const script: HTMLScriptElement = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
                script.onload = (): void => {
                    setIsLoaded(true);
                };
                document.head.appendChild(script);
            } else {
                setIsLoaded(true);
            }
        };

        loadLeaflet();
    }, []);

    useEffect(() => {
        if (isLoaded && mapRef.current && !mapInstanceRef.current) {
            // Calculate center point between both locations
            const centerLat = (CLINIC_LOCATIONS[0].lat + CLINIC_LOCATIONS[1].lat) / 2;
            const centerLng = (CLINIC_LOCATIONS[0].lng + CLINIC_LOCATIONS[1].lng) / 2;

            // Initialize map
            const map = window.L.map(mapRef.current, {
                center: [centerLat, centerLng],
                zoom: 12,
                zoomControl: true,
                scrollWheelZoom: true,
                touchZoom: true,
                doubleClickZoom: true,
                boxZoom: true,
                keyboard: true,
                dragging: true,
            });

            // Add OpenStreetMap tile layer
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
            }).addTo(map);

            // Create custom marker icon function
            const createCustomIcon = (color: string, label: string) => {
                return window.L.divIcon({
                    className: 'custom-marker',
                    html: `
                        <div style="
                            background: linear-gradient(90deg, ${color === 'teal' ? 'hsl(175, 65%, 45%)' : 'hsl(10, 80%, 62%)'} 0%, ${color === 'teal' ? 'hsl(180, 70%, 30%)' : 'hsl(10, 75%, 75%)'} 100%);
                            width: 35px;
                            height: 35px;
                            border-radius: 50% 50% 50% 0;
                            transform: rotate(-45deg);
                            border: 3px solid white;
                            box-shadow: 0px 10px 30px hsla(${color === 'teal' ? '175, 65%, 45%' : '10, 80%, 62%'}, 0.4);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">
                            <div style="
                                transform: rotate(45deg);
                                color: white;
                                font-size: 16px;
                                font-weight: bold;
                            ">${label}</div>
                        </div>
                    `,
                    iconSize: [45, 45],
                    iconAnchor: [22, 40],
                    popupAnchor: [0, -40],
                });
            };

            // Add markers for both locations
            CLINIC_LOCATIONS.forEach((location, index) => {
                const markerColor = index === 0 ? 'teal' : 'coral';
                const markerLabel = index === 0 ? '1' : '2';

                const customIcon = createCustomIcon(markerColor, markerLabel);

                const marker: LeafletMarker = window.L.marker([location.lat, location.lng], {
                    icon: customIcon
                }).addTo(map);

                // Create popup content
                const popupContent: string = `
                    <div style="
                        font-family: 'Poppins', sans-serif;
                        text-align: center;
                        padding: 12px;
                        min-width: 220px;
                    ">
                        <div style="
                            background: linear-gradient(90deg, hsl(175, 65%, 45%) 0%, hsl(10, 80%, 62%) 100%);
                            color: white;
                            padding: 8px;
                            border-radius: 4px;
                            margin-bottom: 12px;
                        ">
                            <h3 style="
                                font-size: 1.6rem;
                                font-weight: 700;
                                margin: 0;
                            ">${location.name}</h3>
                        </div>
                        <p style="
                            color: hsl(180, 18%, 48%);
                            font-size: 1.4rem;
                            line-height: 1.5;
                            margin-bottom: 8px;
                        ">📍 ${location.address}</p>
                        <p style="
                            color: hsl(175, 65%, 45%);
                            font-size: 1.4rem;
                            font-weight: 600;
                            margin-bottom: 12px;
                        ">📞 ${location.phone}</p>
                        <button onclick="window.open('https://www.google.com/maps/dir//${location.lat},${location.lng}', '_blank')" style="
                            background: linear-gradient(90deg, hsl(175, 65%, 45%) 0%, hsl(10, 80%, 62%) 100%);
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 4px;
                            font-size: 1.3rem;
                            font-weight: 600;
                            cursor: pointer;
                            text-transform: uppercase;
                            transition: transform 0.25s ease;
                            box-shadow: 0px 10px 30px hsla(10, 80%, 62%, 0.3);
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            Get Directions
                        </button>
                    </div>
                `;

                marker.bindPopup(popupContent);
            });

            // Fit map to show both markers
            const bounds = window.L.latLngBounds();
            CLINIC_LOCATIONS.forEach(location => {
                bounds.extend([location.lat, location.lng]);
            });

            const southWest = bounds.getSouthWest();
            const northEast = bounds.getNorthEast();

            map.fitBounds([
                [southWest.lat, southWest.lng],
                [northEast.lat, northEast.lng]
            ], {
                padding: [50, 50]
            });

            // Store map instance
            mapInstanceRef.current = map;

            // Handle resize
            const handleResize = (): void => {
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.invalidateSize();
                }
            };

            window.addEventListener('resize', handleResize);

            return (): void => {
                window.removeEventListener('resize', handleResize);
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove();
                    mapInstanceRef.current = null;
                }
            };
        }
    }, [isLoaded]);

    return (
        <section className="section">
            <div className="custom-container">
                {/* Section Header */}
                <div className="text-center" style={{ marginBottom: '50px' }}>
                    <p className="section-subtitle">Find Us</p>
                    <h2 className="h2 section-title">Our Locations</h2>
                    <p className="section-text" style={{
                        maxWidth: '700px',
                        margin: '20px auto 0',
                        color: 'var(--teal-gray)'
                    }}>
                        Visit either of our conveniently located branches in Birtamode or Dhulabari for comprehensive dental care.
                    </p>
                </div>

                {/* Map Container */}
                <div style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-6)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-3)',
                    backgroundColor: 'var(--white)',
                    border: '2px solid var(--light-seafoam)'
                }}>
                    {/* Loading State */}
                    {!isLoaded && (
                        <div style={{
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'var(--pale-aqua)',
                            color: 'var(--teal-gray)'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    border: '4px solid var(--light-seafoam)',
                                    borderTop: '4px solid var(--bright-teal)',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    marginInline: 'auto',
                                    marginBlockEnd: '15px'
                                }}></div>
                                <p style={{ fontSize: '1.6rem', fontWeight: '600' }}>Loading Map...</p>
                            </div>
                        </div>
                    )}

                    {/* Map */}
                    <div
                        ref={mapRef}
                        style={{
                            height: '500px',
                            width: '100%',
                            zIndex: 1,
                            display: isLoaded ? 'block' : 'none'
                        }}
                    />
                </div>

                {/* Location Cards Below Map */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px',
                    marginTop: '40px'
                }}>
                    {CLINIC_LOCATIONS.map((location, index) => (
                        <div key={index} style={{
                            backgroundColor: 'var(--white)',
                            padding: '25px',
                            borderRadius: 'var(--radius-6)',
                            boxShadow: 'var(--shadow-2)',
                            border: '2px solid var(--light-seafoam)',
                            transition: 'var(--transition-2)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '15px'
                            }}>
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    background: index === 0 ? 'var(--bright-teal)' : 'var(--vibrant-coral)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.6rem'
                                }}>
                                    {index + 1}
                                </div>
                                <h3 style={{
                                    color: 'var(--darkest-teal)',
                                    fontSize: '1.8rem',
                                    fontWeight: '700',
                                    margin: 0
                                }}>
                                    {location.name}
                                </h3>
                            </div>
                            <p style={{
                                color: 'var(--teal-gray)',
                                fontSize: '1.4rem',
                                lineHeight: '1.6',
                                marginBottom: '8px'
                            }}>
                                📍 {location.address}
                            </p>
                            <p style={{
                                color: 'var(--bright-teal)',
                                fontSize: '1.4rem',
                                fontWeight: '600'
                            }}>
                                📞 {location.phone}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS for loading animation */}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                /* Custom map controls styling */
                :global(.leaflet-control-zoom) {
                    border: none !important;
                    border-radius: var(--radius-4) !important;
                    box-shadow: var(--shadow-2) !important;
                }
                
                :global(.leaflet-control-zoom a) {
                    background-color: var(--white) !important;
                    color: var(--darkest-teal) !important;
                    border: none !important;
                    transition: var(--transition) !important;
                }
                
                :global(.leaflet-control-zoom a:hover) {
                    background-color: var(--bright-teal) !important;
                    color: var(--white) !important;
                }
                
                :global(.leaflet-popup-content-wrapper) {
                    border-radius: var(--radius-6) !important;
                    box-shadow: var(--shadow-3) !important;
                    border: none !important;
                }
                
                :global(.leaflet-popup-tip) {
                    background-color: white !important;
                    box-shadow: var(--shadow-2) !important;
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    :global(.leaflet-control-zoom) {
                        transform: scale(0.9);
                    }
                }
            `}</style>
        </section>
    );
};