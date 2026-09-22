import { create } from 'zustand';
import { LayerItem, SelectedFeatureInfo, FlyoutTab, ComparisonMode, ActiveModule } from '../types';

interface AppState {
  // Estado de Seleção e Inspeção
  selectedFeature: SelectedFeatureInfo | null;
  setSelectedFeature: (feature: SelectedFeatureInfo | null) => void;
  
  // Painéis e Revelação Progressiva
  activeFlyout: FlyoutTab;
  setActiveFlyout: (flyout: FlyoutTab) => void;
  toggleFlyout: (flyout: FlyoutTab) => void;
  
  // Módulo Ativo
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;

  // Foco de Página
  activePageFocus: 15 | 16 | 'all';
  setActivePageFocus: (page: 15 | 16 | 'all') => void;

  // Modo de Comparação
  comparisonMode: ComparisonMode;
  setComparisonMode: (mode: ComparisonMode) => void;
  swipeRatio: number;
  setSwipeRatio: (ratio: number) => void;
  p15Opacity: number;
  setP15Opacity: (opacity: number) => void;
  p16Opacity: number;
  setP16Opacity: (opacity: number) => void;

  // Basemap
  activeBasemap: 'cartodb-dark' | 'esri-satellite' | 'osm';
  setActiveBasemap: (basemap: 'cartodb-dark' | 'esri-satellite' | 'osm') => void;

  // Camadas
  layers: LayerItem[];
  toggleLayerVisibility: (layerId: string) => void;
  setLayerOpacity: (layerId: string, opacity: number) => void;

  // Estado do Cursor e Mapa
  currentCoords: { x: number; y: number; lon: number; lat: number } | null;
  setCurrentCoords: (coords: { x: number; y: number; lon: number; lat: number } | null) => void;
  currentScale: number;
  setCurrentScale: (scale: number) => void;

  // Modais de Ação Rápida
  isEvidenceModalOpen: boolean;
  setIsEvidenceModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isAskTerritoryOpen: boolean;
  setIsAskTerritoryOpen: (open: boolean) => void;
}

const initialLayers: LayerItem[] = [
  // Página 15
  { id: 'p15_titulo_cosme', name: 'Título Cosme Ferreira Filho (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.8, color: '#20A4F3', fillColor: '#20A4F3', type: 'polygon', geojsonPath: 'data/vetores/p15_titulo_cosme.geojson', featureCount: 3 },
  { id: 'p15_uniao', name: 'Área da União Federal (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.6, color: '#F2A93B', fillColor: '#F2A93B', type: 'polygon', geojsonPath: 'data/vetores/p15_uniao.geojson', featureCount: 3 },
  { id: 'p15_dom_part', name: 'Domínio Particular (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#39C6B4', fillColor: '#39C6B4', type: 'polygon', geojsonPath: 'data/vetores/p15_dom_part.geojson', featureCount: 15 },
  { id: 'p15_terras_dest', name: 'Terras Destacadas do Estado (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#A78BFA', fillColor: '#A78BFA', type: 'polygon', geojsonPath: 'data/vetores/p15_terras_dest.geojson', featureCount: 3 },
  { id: 'p15_aeis_maua', name: 'AEIS Mauazinho (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#46C37B', fillColor: '#46C37B', type: 'polygon', geojsonPath: 'data/vetores/p15_aeis_maua.geojson', featureCount: 1 },
  { id: 'p15_aeis_quar', name: 'AEIS Igarapé do Quarenta (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#10B981', fillColor: '#10B981', type: 'polygon', geojsonPath: 'data/vetores/p15_aeis_quar.geojson', featureCount: 2 },
  { id: 'p15_aeis_lula', name: 'AEIS C. H. Presidente Lula (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#059669', fillColor: '#059669', type: 'polygon', geojsonPath: 'data/vetores/p15_aeis_lula.geojson', featureCount: 1 },
  { id: 'p15_rvs_sauim', name: 'RVS Sauim Castanheiras (P15)', group: 'reconstituicao', pagina: 15, visible: true, opacity: 0.5, color: '#84CC16', fillColor: '#84CC16', type: 'polygon', geojsonPath: 'data/vetores/p15_rvs_sauim.geojson', featureCount: 1 },
  { id: 'p15_pontos_controle', name: 'Pontos de Controle Grade (P15)', group: 'referencia', pagina: 15, visible: true, opacity: 1.0, color: '#60A5FA', type: 'point', geojsonPath: 'data/vetores/p15_pontos_controle.geojson', featureCount: 10 },
  { id: 'p15_moldura', name: 'Moldura da Planta P15', group: 'referencia', pagina: 15, visible: true, opacity: 0.8, color: '#94A3B8', type: 'line', geojsonPath: 'data/vetores/p15_moldura.geojson', featureCount: 1 },

  // Página 16
  { id: 'p16_titulo_jose', name: 'Título José Afonso (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.85, color: '#20A4F3', fillColor: '#20A4F3', type: 'polygon', geojsonPath: 'data/vetores/p16_titulo_jose.geojson', featureCount: 1 },
  { id: 'p16_devoluta', name: 'Terra Devoluta Tancredo Neves (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.6, color: '#EC4899', fillColor: '#EC4899', type: 'polygon', geojsonPath: 'data/vetores/p16_devoluta.geojson', featureCount: 1 },
  { id: 'p16_matr_26696', name: 'Matrícula 26.696 Estado (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.6, color: '#8B5CF6', fillColor: '#8B5CF6', type: 'polygon', geojsonPath: 'data/vetores/p16_matr_26696.geojson', featureCount: 1 },
  { id: 'p16_aeis', name: 'AEIS São José Operário (P16)', group: 'reconstituicao', pagina: 16, visible: true, opacity: 0.5, color: '#46C37B', fillColor: '#46C37B', type: 'polygon', geojsonPath: 'data/vetores/p16_aeis.geojson', featureCount: 2 },
  { id: 'p16_pontos_controle', name: 'Pontos de Controle Grade (P16)', group: 'referencia', pagina: 16, visible: true, opacity: 1.0, color: '#60A5FA', type: 'point', geojsonPath: 'data/vetores/p16_pontos_controle.geojson', featureCount: 8 },
  { id: 'p16_moldura', name: 'Moldura da Planta P16', group: 'referencia', pagina: 16, visible: true, opacity: 0.8, color: '#94A3B8', type: 'line', geojsonPath: 'data/vetores/p16_moldura.geojson', featureCount: 1 },

  // Malha de Referência PMM
  { id: 'p15_logradouros', name: 'Logradouros P15 (GeoManaus)', group: 'referencia', pagina: 15, visible: true, opacity: 0.7, color: '#F97316', type: 'line', geojsonPath: 'data/vetores/p15_logradouros.geojson', featureCount: 717 },
  { id: 'p16_logradouros', name: 'Logradouros P16 (GeoManaus)', group: 'referencia', pagina: 16, visible: true, opacity: 0.7, color: '#F97316', type: 'line', geojsonPath: 'data/vetores/p16_logradouros.geojson', featureCount: 101 },
  { id: 'p15_lim_bairros', name: 'Limites Bairros P15 (GeoManaus)', group: 'referencia', pagina: 15, visible: true, opacity: 0.6, color: '#CBD5E1', type: 'line', geojsonPath: 'data/vetores/p15_lim_bairros.geojson', featureCount: 18 },
  { id: 'p16_lim_bairros', name: 'Limites Bairros P16 (GeoManaus)', group: 'referencia', pagina: 16, visible: true, opacity: 0.6, color: '#CBD5E1', type: 'line', geojsonPath: 'data/vetores/p16_lim_bairros.geojson', featureCount: 7 }
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
  swipeRatio: 0.5,
  setSwipeRatio: (ratio) => set({ swipeRatio: ratio }),
  p15Opacity: 0.9,
  setP15Opacity: (opacity) => set({ p15Opacity: opacity }),
  p16Opacity: 0.9,
  setP16Opacity: (opacity) => set({ p16Opacity: opacity }),

  activeBasemap: 'cartodb-dark',
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

  isEvidenceModalOpen: false,
  setIsEvidenceModalOpen: (open) => set({ isEvidenceModalOpen: open }),
  isReportModalOpen: false,
  setIsReportModalOpen: (open) => set({ isReportModalOpen: open }),
  isAskTerritoryOpen: false,
  setIsAskTerritoryOpen: (open) => set({ isAskTerritoryOpen: open }),
}));
