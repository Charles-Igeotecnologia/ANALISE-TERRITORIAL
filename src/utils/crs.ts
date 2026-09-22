import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

// Definição proj4 para SIRGAS 2000 / UTM fuso 21S (EPSG:31981)
export const EPSG31981_DEF = '+proj=utm +zone=21 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs';

export function setupProjections() {
  proj4.defs('EPSG:31981', EPSG31981_DEF);
  register(proj4);
  
  const proj31981 = getProjection('EPSG:31981');
  if (proj31981) {
    // Extensão aproximada do fuso 21S em metros
    proj31981.setExtent([100000, 9000000, 900000, 10000000]);
  }
}

export function formatUTMCoordinate(coords: [number, number]): { easting: string; northing: string } {
  return {
    easting: coords[0].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    northing: coords[1].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  };
}

export function transformWgsToUtm21S(lon: number, lat: number): [number, number] {
  return proj4('EPSG:4326', 'EPSG:31981', [lon, lat]);
}

export function transformUtm21SToWgs(easting: number, northing: number): [number, number] {
  return proj4('EPSG:31981', 'EPSG:4326', [easting, northing]);
}
