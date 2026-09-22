export type CRSCode = 'EPSG:31981' | 'EPSG:4326' | 'EPSG:3857';

export interface DocumentEvidence {
  idImovel?: string;
  documento: string;
  pagina: number;
  folhaProcesso?: number;
  escala?: string;
  metodo: string;
  pontosControle?: number;
  rmsMetros?: number;
  origem?: string;
  tipo?: string;
}

export interface FeatureProperties {
  id?: string;
  nome?: string;
  layerId?: string;
  pagina?: number;
  area_m2?: number;
  area_ha?: number;
  perimetro_m?: number;
  [key: string]: any;
}

export interface SelectedFeatureInfo {
  id: string;
  nome: string;
  pagina: number;
  tipo: string;
  areaM2: number;
  areaHa: number;
  perimetroM: number;
  overlapPercentage?: number;
  overlapAreaHa?: number;
  overlapWithClass?: string;
  properties: FeatureProperties;
  evidence: DocumentEvidence;
  geometryJson?: any;
}

export interface LayerItem {
  id: string;
  name: string;
  group: 'documentos' | 'reconstituicao' | 'analises' | 'referencia';
  pagina: 15 | 16 | 'ambas';
  visible: boolean;
  opacity: number;
  color: string;
  fillColor?: string;
  type: 'polygon' | 'line' | 'point' | 'raster';
  geojsonPath?: string;
  featureCount?: number;
}

export type FlyoutTab = 'layers' | 'basemaps' | 'comparison' | 'analysis' | 'evidence' | 'reports' | 'none';

export type ComparisonMode = 'none' | 'overlay' | 'swipe' | 'sideBySide';

export type ActiveModule = 'cartografia' | 'sobreposicoes' | 'rastreabilidade' | 'relatorios';
