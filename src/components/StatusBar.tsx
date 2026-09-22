import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { formatUTMCoordinate } from '../utils/crs';
import { ShieldCheck, Crosshair, Scale } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { currentCoords, currentScale } = useAppStore();

  const formattedCoords = currentCoords 
    ? formatUTMCoordinate([currentCoords.x, currentCoords.y])
    : { easting: '174.920,38', northing: '9.657.340,21' };

  return (
    <footer className="h-8 bg-[#07131F] border-t border-[#203B4D] flex items-center justify-between px-4 text-[11px] font-mono select-none z-30 text-[#9EB3C1]">
      {/* Coordenadas do Cursor em UTM 21S */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5 text-[#F3F7FA]">
          <Crosshair className="w-3.5 h-3.5 text-[#20A4F3]" />
          <span>UTM 21S:</span>
          <span className="text-[#20A4F3] font-semibold">X {formattedCoords.easting} m</span>
          <span>|</span>
          <span className="text-[#20A4F3] font-semibold">Y {formattedCoords.northing} m</span>
        </div>

        {currentCoords && (
          <div className="hidden xl:flex items-center space-x-1 text-[#9EB3C1]">
            <span>(WGS84: {currentCoords.lat.toFixed(5)}°, {currentCoords.lon.toFixed(5)}°)</span>
          </div>
        )}
      </div>

      {/* Escala e CRS */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Scale className="w-3.5 h-3.5 text-[#39C6B4]" />
          <span>Escala:</span>
          <span className="text-[#F3F7FA] font-bold">1:{currentScale.toLocaleString('pt-BR')}</span>
        </div>

        <div className="hidden sm:flex items-center space-x-1">
          <span>CRS:</span>
          <span className="text-[#39C6B4]">SIRGAS 2000 / UTM 21S (EPSG:31981)</span>
        </div>

        <div className="flex items-center space-x-1 text-[#46C37B] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Auditado</span>
        </div>
      </div>
    </footer>
  );
};
