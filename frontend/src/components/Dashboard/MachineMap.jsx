import React, { useEffect, useRef } from 'react';
import { statusColors } from '../../mock/mockData';

const MachineMap = ({ machines }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Since we can't install leaflet in this demo, we'll create a mock map
    const initMap = () => {
      if (!mapRef.current) return;

      // Clear previous content
      mapRef.current.innerHTML = '';

      // Create mock map container
      const mapContainer = document.createElement('div');
      mapContainer.className = 'relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden';
      
      // Add mock map background with grid pattern
      mapContainer.style.backgroundImage = `
        linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px),
        linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px)
      `;
      mapContainer.style.backgroundSize = '20px 20px';

      // Calculate bounds for positioning machines
      const lats = machines.map(m => m.location.lat);
      const lngs = machines.map(m => m.location.lng);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      // Add machines as markers
      machines.forEach((machine, index) => {
        const marker = document.createElement('div');
        marker.className = 'absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform';
        marker.style.backgroundColor = statusColors[machine.status];
        
        // Position marker (simplified positioning for demo)
        const x = ((machine.location.lng - minLng) / (maxLng - minLng)) * 90 + 5;
        const y = 90 - (((machine.location.lat - minLat) / (maxLat - minLat)) * 80 + 5);
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;

        // Add tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 transition-opacity pointer-events-none whitespace-nowrap';
        tooltip.textContent = `${machine.name} - ${machine.status}`;
        marker.appendChild(tooltip);

        marker.addEventListener('mouseenter', () => {
          tooltip.style.opacity = '1';
        });

        marker.addEventListener('mouseleave', () => {
          tooltip.style.opacity = '0';
        });

        mapContainer.appendChild(marker);
      });

      // Add country label
      const countryLabel = document.createElement('div');
      countryLabel.className = 'absolute top-4 left-4 bg-white px-3 py-1 rounded-lg shadow-md font-semibold text-slate-700';
      countryLabel.textContent = machines[0]?.location.country || 'Unknown';
      mapContainer.appendChild(countryLabel);

      // Add legend
      const legend = document.createElement('div');
      legend.className = 'absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md space-y-2';
      
      const statusTypes = [
        { status: 'active', label: 'Active' },
        { status: 'maintenance', label: 'Maintenance' },
        { status: 'offline', label: 'Offline' },
        { status: 'restocking', label: 'Restocking' }
      ];

      statusTypes.forEach(type => {
        const legendItem = document.createElement('div');
        legendItem.className = 'flex items-center space-x-2 text-xs';
        
        const dot = document.createElement('div');
        dot.className = 'w-3 h-3 rounded-full border border-white';
        dot.style.backgroundColor = statusColors[type.status];
        
        const label = document.createElement('span');
        label.textContent = type.label;
        label.className = 'text-slate-600';
        
        legendItem.appendChild(dot);
        legendItem.appendChild(label);
        legend.appendChild(legendItem);
      });

      mapContainer.appendChild(legend);
      mapRef.current.appendChild(mapContainer);
    };

    initMap();
  }, [machines]);

  return (
    <div className="w-full">
      <div ref={mapRef} className="w-full h-64">
        <div className="flex items-center justify-center h-full text-slate-500">
          Loading map...
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-600">
        <p>Interactive map showing {machines.length} vending machines</p>
        <p className="text-xs text-slate-500 mt-1">
          Hover over markers to see machine details
        </p>
      </div>
    </div>
  );
};

export default MachineMap;