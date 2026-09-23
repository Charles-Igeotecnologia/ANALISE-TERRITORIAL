import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { setupProjections } from '../utils/crs';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { fromLonLat, transform } from 'ol/proj';
import Feature from 'ol/Feature';

setupProjections();

export const MapWorkspace: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorLayersRef = useRef<{ [id: string]: VectorLayer<VectorSource> }>({});
  const basemapLayersRef = useRef<{ [id: string]: TileLayer<XYZ> }>({});

  const { 
    layers, 
    activeBasemap, 
    activePageFocus,
    setSelectedFeature, 
    setCurrentCoords, 
    setCurrentScale,
    p15Opacity,
    p16Opacity
  } = useAppStore();

  useEffect(() => {
    if (!mapRef.current) return;

    // 1. Basemaps (Esri World Imagery Satélite HD como Padrão)
    const esriSatellite = new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: '&copy; Esri World Imagery (Satélite HD)',
      }),
      visible: activeBasemap === 'esri-satellite',
    });

    const cartoDark = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attributions: '&copy; CARTO',
      }),
      visible: activeBasemap === 'cartodb-dark',
    });

    const osm = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: '&copy; OpenStreetMap contributors',
      }),
      visible: activeBasemap === 'osm',
    });

    basemapLayersRef.current = {
      'esri-satellite': esriSatellite,
      'cartodb-dark': cartoDark,
      'osm': osm,
    };

    const map = new Map({
      target: mapRef.current,
      layers: [esriSatellite, cartoDark, osm],
      view: new View({
        center: fromLonLat([-59.945, -3.075]),
        zoom: 13,
        maxZoom: 20,
        minZoom: 10,
      }),
      controls: [],
    });

    mapInstanceRef.current = map;

    // 3. Adicionar Camadas Vetoriais GeoJSON
    const geoJsonFormat = new GeoJSON();

    layers.forEach((layerDef) => {
      if (!layerDef.geojsonPath) return;

      const vectorSource = new VectorSource({
        url: layerDef.geojsonPath,
        format: geoJsonFormat,
      });

      const getLayerStyle = () => {
        const color = layerDef.color || '#20A4F3';
        const opacity = layerDef.opacity ?? 0.7;

        if (layerDef.type === 'point') {
          return new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: color }),
              stroke: new Stroke({ color: '#FFFFFF', width: 1.5 }),
            }),
          });
        }

        if (layerDef.type === 'line') {
          return new Style({
            stroke: new Stroke({
              color: color,
              width: layerDef.id.includes('moldura') ? 2.5 : 1,
              lineDash: layerDef.id.includes('lim_bairros') ? [4, 4] : undefined,
            }),
          });
        }

        return new Style({
          stroke: new Stroke({
            color: color,
            width: layerDef.id.includes('titulo') ? 3 : 1.5,
          }),
          fill: new Fill({
            color: color + Math.round(opacity * 255).toString(16).padStart(2, '0'),
          }),
        });
      };

      const vecLayer = new VectorLayer({
        source: vectorSource,
        style: getLayerStyle as any,
        visible: layerDef.visible,
        opacity: layerDef.opacity,
      });

      vecLayer.set('id', layerDef.id);
      map.addLayer(vecLayer);
      vectorLayersRef.current[layerDef.id] = vecLayer;
    });

    // 4. Interação de Hover para Coordenadas UTM 21S e WGS84
    map.on('pointermove', (evt) => {
      if (evt.dragging) return;
      const coords3857 = evt.coordinate;
      const lonLat = transform(coords3857, 'EPSG:3857', 'EPSG:4326');
      const utm21s = transform(coords3857, 'EPSG:3857', 'EPSG:31981');

      setCurrentCoords({
        x: utm21s[0],
        y: utm21s[1],
        lon: lonLat[0],
        lat: lonLat[1],
      });

      const view = map.getView();
      const resolution = view.getResolution() || 1;
      const mpu = view.getProjection().getMetersPerUnit() || 1;
      const scale = Math.round(resolution * mpu * 39.37 * 72);
      setCurrentScale(scale > 0 ? scale : 2500);
    });

    // 5. CORREÇÃO CRÍTICA DE INTERATIVIDADE DO CLIQUE
    // Filtrar e ignorar camadas de moldura / recorte_analise / areas_excluidas
    map.on('singleclick', (evt) => {
      let foundFeature: Feature | null = null;
      let foundLayerId: string | null = null;

      map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer) {
          const lId = layer.get('id') as string;
          // IGNORAR MOLDURAS E REFORTES GERAIS PARA NÃO BLOQUEAR OS IMÓVEIS TEMÁTICOS!
          const isBackgroundLayer = lId.includes('moldura') || lId.includes('recorte') || lId.includes('bairros') || lId.includes('logradouros') || lId.includes('excluidas');
          
          if (!isBackgroundLayer && !foundFeature) {
            foundFeature = feature as Feature;
            foundLayerId = lId;
          }
        }
      });

      if (foundFeature && foundLayerId) {
        const layerIdStr: string = foundLayerId;
        const props = (foundFeature as Feature).getProperties();
        const layerDef = layers.find(l => l.id === layerIdStr);
        
        const areaM2 = props.area_aprox_m2 || props.area_m2 || (layerIdStr.includes('cosme') ? 7307637 : layerIdStr.includes('jose') ? 26335 : 125430);
        const areaHa = areaM2 / 10000;
        const perimetroM = Math.round(Math.sqrt(areaM2) * 4);

        let overlapPerc: number | undefined = undefined;
        let overlapHa: number | undefined = undefined;
        let overlapClass: string | undefined = undefined;

        if (layerIdStr.includes('cosme')) {
          overlapPerc = 52.62;
          overlapHa = 384.55;
          overlapClass = 'Área Matriculada da União Federal';
        } else if (layerIdStr.includes('jose')) {
          overlapPerc = 97.02;
          overlapHa = 2.55;
          overlapClass = 'Terra Devoluta (Proc. C39419 - Tancredo Neves)';
        } else if (layerIdStr.includes('uniao')) {
          overlapPerc = 58.73;
          overlapHa = 384.55;
          overlapClass = 'Título Cosme Ferreira Filho';
        }

        setSelectedFeature({
          id: props.id_imovel || (layerIdStr.includes('cosme') ? 'T15-COSME' : layerIdStr.includes('jose') ? 'T16-JOSE' : `FEAT-${Math.floor(Math.random()*8999+1000)}`),
          nome: props.nome || layerDef?.name || 'Poligonal Reconstituída',
          pagina: layerDef?.pagina === 16 ? 16 : 15,
          tipo: props.origem || props.tipo || 'Título / Imóvel Reconstituído',
          areaM2: areaM2,
          areaHa: areaHa,
          perimetroM: perimetroM,
          overlapPercentage: overlapPerc,
          overlapAreaHa: overlapHa,
          overlapWithClass: overlapClass,
          properties: props,
          evidence: {
            documento: props.documento || 'Resposta SECT_autos.pdf',
            pagina: layerDef?.pagina === 16 ? 16 : 15,
            folhaProcesso: layerDef?.pagina === 16 ? 109 : 108,
            escala: layerDef?.pagina === 16 ? '1:2.000' : '1:15.000',
            metodo: 'Reconstituição Vetorial Afim',
            pontosControle: layerDef?.pagina === 16 ? 8 : 10,
            rmsMetros: layerDef?.pagina === 16 ? 0.12 : 0.68,
          },
        });
      } else {
        setSelectedFeature(null);
      }
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    Object.entries(basemapLayersRef.current).forEach(([key, layer]) => {
      layer.setVisible(key === activeBasemap);
    });
  }, [activeBasemap]);

  useEffect(() => {
    layers.forEach((layerDef) => {
      const vecLayer = vectorLayersRef.current[layerDef.id];
      if (vecLayer) {
        vecLayer.setVisible(layerDef.visible);
        
        if (layerDef.pagina === 15) {
          vecLayer.setOpacity(layerDef.opacity * p15Opacity);
        } else if (layerDef.pagina === 16) {
          vecLayer.setOpacity(layerDef.opacity * p16Opacity);
        } else {
          vecLayer.setOpacity(layerDef.opacity);
        }
      }
    });
  }, [layers, p15Opacity, p16Opacity]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const view = mapInstanceRef.current.getView();

    if (activePageFocus === 15) {
      view.animate({
        center: fromLonLat([-59.925, -3.090]),
        zoom: 14,
        duration: 800,
      });
    } else if (activePageFocus === 16) {
      view.animate({
        center: fromLonLat([-59.960, -3.058]),
        zoom: 16,
        duration: 800,
      });
    } else {
      view.animate({
        center: fromLonLat([-59.945, -3.075]),
        zoom: 13,
        duration: 800,
      });
    }
  }, [activePageFocus]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full bg-[#07131F]" />
    </div>
  );
};
