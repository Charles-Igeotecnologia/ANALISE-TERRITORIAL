import { create } from 'zustand';
import { LayerItem, SelectedFeatureInfo, FlyoutTab, ComparisonMode, ActiveModule } from '../types';

interface AppState {
  selectedFeature: SelectedFeatureInfo | null;
  setSelectedFeature: (feature: SelectedFeatureInfo | null) => void;
  
  activeFlyout: FlyoutTab;
  setActiveFlyout: (flyout: FlyoutTab) => void;
  toggleFlyout: (flyout: FlyoutTab) => void;
  
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;

  activePageFocus: 15 | 16 | 'all';
  setActivePageFocus: (page: 15 | 16 | 'all') => void;

  comparisonMode: ComparisonMode;
  setComparisonMode: (mode: ComparisonMode) => void;
  p15Opacity: number;
  setP15Opacity: (opacity: number) => void;
  p16Opacity: number;
  setP16Opacity: (opacity: number) => void;

  activeBasemap: 'esri-satellite' | 'cartodb-dark' | 'osm';
  setActiveBasemap: (basemap: 'esri-satellite' | 'cartodb-dark' | 'osm') => void;

  layers: LayerItem[];
  toggleLayerVisibility: (layerId: string) => void;
  setLayerOpacity: (layerId: string, opacity: number) => void;

  currentCoords: { x: number; y: number; lon: number; lat: number } | null;
  setCurrentCoords: (coords: { x: number; y: number; lon: number; lat: number } | null) => void;
  currentScale: number;
  setCurrentScale: (scale: number) => void;

  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
  toggleShowLabels: () => void;

  isEvidenceModalOpen: boolean;
  setIsEvidenceModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isAskTerritoryOpen: boolean;
  setIsAskTerritoryOpen: (open: boolean) => void;
}

const initialLayers: LayerItem[] = [
  // PÁGINA 15 - CAMADAS PRINCIPAIS
  { id: 'p15_camadas_titulo_cosme', name: 'Título Cosme Ferreira Filho (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.85, color: '#20A4F3', fillColor: '#20A4F3', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_titulo_cosme.geojson', featureCount: 3 },
  { id: 'p15_camadas_uniao', name: 'Área da União Federal (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.6, color: '#F2A93B', fillColor: '#F2A93B', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_uniao.geojson', featureCount: 3 },
  { id: 'p15_camadas_dom_part', name: 'Domínio Particular (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#39C6B4', fillColor: '#39C6B4', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_dom_part.geojson', featureCount: 15 },
  { id: 'p15_camadas_terras_dest', name: 'Terras Destacadas Estado (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#A78BFA', fillColor: '#A78BFA', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_terras_dest.geojson', featureCount: 3 },
  { id: 'p15_camadas_aeis_maua', name: 'AEIS Mauazinho (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#46C37B', fillColor: '#46C37B', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_aeis_maua.geojson', featureCount: 1 },
  { id: 'p15_camadas_aeis_quar', name: 'AEIS Igarapé do Quarenta (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#10B981', fillColor: '#10B981', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_aeis_quar.geojson', featureCount: 2 },
  { id: 'p15_camadas_aeis_lula', name: 'AEIS C. H. Presidente Lula (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#059669', fillColor: '#059669', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_aeis_lula.geojson', featureCount: 1 },
  { id: 'p15_camadas_rvs_sauim', name: 'RVS Sauim Castanheiras (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#84CC16', fillColor: '#84CC16', type: 'polygon', geojsonPath: 'data/vetores/p15_camadas_rvs_sauim.geojson', featureCount: 1 },
  { id: 'p15_sobreposicoes_intersecoes', name: 'Interseções Calculadas (P15)', group: 'analises', pagina: 15, visible: true, opacity: 0.7, color: '#E85D5D', fillColor: '#E85D5D', type: 'polygon', geojsonPath: 'data/vetores/p15_sobreposicoes_intersecoes.geojson', featureCount: 19 },
  { id: 'p15_apoio_pontos_controle', name: 'Pontos de Controle Grade (P15)', group: 'referencia', pagina: 15, visible: true, opacity: 1.0, color: '#60A5FA', type: 'point', geojsonPath: 'data/vetores/p15_apoio_pontos_controle.geojson', featureCount: 10 },
  { id: 'p15_apoio_moldura', name: 'Moldura Cartográfica P15', group: 'referencia', pagina: 15, visible: true, opacity: 0.8, color: '#94A3B8', type: 'line', geojsonPath: 'data/vetores/p15_apoio_moldura.geojson', featureCount: 1 },

  // PÁGINA 16 - CAMADAS PRINCIPAIS
  { id: 'p16_camadas_titulo_jose', name: 'Título José Afonso (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.85, color: '#20A4F3', fillColor: '#20A4F3', type: 'polygon', geojsonPath: 'data/vetores/p16_camadas_titulo_jose.geojson', featureCount: 1 },
  { id: 'p16_camadas_devoluta', name: 'Terra Devoluta Tancredo Neves (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.6, color: '#EC4899', fillColor: '#EC4899', type: 'polygon', geojsonPath: 'data/vetores/p16_camadas_devoluta.geojson', featureCount: 1 },
  { id: 'p16_camadas_matr_26696', name: 'Matrícula 26.696 Estado (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.6, color: '#8B5CF6', fillColor: '#8B5CF6', type: 'polygon', geojsonPath: 'data/vetores/p16_camadas_matr_26696.geojson', featureCount: 1 },
  { id: 'p16_camadas_aeis', name: 'AEIS São José Operário (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.5, color: '#46C37B', fillColor: '#46C37B', type: 'polygon', geojsonPath: 'data/vetores/p16_camadas_aeis.geojson', featureCount: 2 },
  { id: 'p16_sobreposicoes_intersecoes', name: 'Interseções Calculadas (P16)', group: 'analises', pagina: 16, visible: true, opacity: 0.7, color: '#E85D5D', fillColor: '#E85D5D', type: 'polygon', geojsonPath: 'data/vetores/p16_sobreposicoes_intersecoes.geojson', featureCount: 5 },
  { id: 'p16_apoio_pontos_controle', name: 'Pontos de Controle Grade (P16)', group: 'referencia', pagina: 16, visible: true, opacity: 1.0, color: '#60A5FA', type: 'point', geojsonPath: 'data/vetores/p16_apoio_pontos_controle.geojson', featureCount: 8 },
  { id: 'p16_apoio_moldura', name: 'Moldura Cartográfica P16', group: 'referencia', pagina: 16, visible: true, opacity: 0.8, color: '#94A3B8', type: 'line', geojsonPath: 'data/vetores/p16_apoio_moldura.geojson', featureCount: 1 },

  // REFERÊNCIA URBANA GEOMANAUS
  { id: 'p15_camadas_logradouros', name: 'Logradouros P15 (GeoManaus)', group: 'referencia', pagina: 15, visible: true, opacity: 0.7, color: '#F97316', type: 'line', geojsonPath: 'data/vetores/p15_camadas_logradouros.geojson', featureCount: 717 },
  { id: 'p16_camadas_logradouros', name: 'Logradouros P16 (GeoManaus)', group: 'referencia', pagina: 16, visible: true, opacity: 0.7, color: '#F97316', type: 'line', geojsonPath: 'data/vetores/p16_camadas_logradouros.geojson', featureCount: 101 },
  { id: 'p15_camadas_lim_bairros', name: 'Limites Bairros P15 (GeoManaus)', group: 'referencia', pagina: 15, visible: true, opacity: 0.6, color: '#CBD5E1', type: 'line', geojsonPath: 'data/vetores/p15_camadas_lim_bairros.geojson', featureCount: 18 },
  { id: 'p16_camadas_lim_bairros', name: 'Limites Bairros P16 (GeoManaus)', group: 'referencia', pagina: 16, visible: true, opacity: 0.6, color: '#CBD5E1', type: 'line', geojsonPath: 'data/vetores/p16_camadas_lim_bairros.geojson', featureCount: 7 }
];

export const useAppStore = create<AppState>((set) => ({
  selectedFeature: null,
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),

  activeFlyout: 'none',
  setActiveFlyout: (flyout) => set({ activeFlyout: flyout }),
  toggleFlyout: (flyout) => set((state) => ({ activeFlyout: state.activeFlyout === flyout ? 'none' : flyout })),

  activeModule: 'cartografia',
  setActiveModule: (module) => set({ activeModule: module }),

  activePageFocus: 'all',
  setActivePageFocus: (page) => set({ activePageFocus: page }),

  comparisonMode: 'none',
  setComparisonMode: (mode) => set({ comparisonMode: mode }),
  p15Opacity: 0.9,
  setP15Opacity: (opacity) => set({ p15Opacity: opacity }),
  p16Opacity: 0.9,
  setP16Opacity: (opacity) => set({ p16Opacity: opacity }),

  activeBasemap: 'esri-satellite',
  setActiveBasemap: (basemap) => set({ activeBasemap: basemap }),

  layers: initialLayers,
  toggleLayerVisibility: (layerId) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l)),
    })),
  setLayerOpacity: (layerId, opacity) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === layerId ? { ...l, opacity } : l)),
    })),

  currentCoords: null,
  setCurrentCoords: (coords) => set({ currentCoords: coords }),
  currentScale: 2500,
  setCurrentScale: (scale) => set({ currentScale: scale }),

  showLabels: true,
  setShowLabels: (show) => set({ showLabels: show }),
  toggleShowLabels: () => set((state) => ({ showLabels: !state.showLabels })),

  isEvidenceModalOpen: false,
  setIsEvidenceModalOpen: (open) => set({ isEvidenceModalOpen: open }),
  isReportModalOpen: false,
  setIsReportModalOpen: (open) => set({ isReportModalOpen: open }),
  isAskTerritoryOpen: false,
  setIsAskTerritoryOpen: (open) => set({ isAskTerritoryOpen: open }),
}));
