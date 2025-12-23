import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useTranslation } from 'react-i18next';

const TravelGlobe = () => {
  const [t] = useTranslation('global');
  const globeEl = useRef<any>();
  const [countries, setCountries] = useState<any>({ features: [] });
  const [hoverD, setHoverD] = useState<any>();

  // Liste des codes ISO des pays visités (codes ISO Alpha-3)
  // Modifiez cette liste pour ajouter vos propres pays
  const visitedCountries = [
    'FRA', // France
    'ESP', // Espagne
    'ITA', // Italie
    'DEU', // Allemagne
    'GBR', // Royaume-Uni
    'USA', // États-Unis
    'JPN', // Japon
  ];

  useEffect(() => {
    // Charger les données GeoJSON des pays
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      });

    // Configuration initiale du globe
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  useEffect(() => {
    // Pointer le globe vers la France au chargement
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 46.2276, lng: 2.2137, altitude: 2 }, 1000);
    }
  }, []);

  const getCountryColor = (country: any) => {
    // Pays visités en bleu
    if (visitedCountries.includes(country.properties.ISO_A3)) {
      return '#3b82f6';
    }
    // Pays non visités en vert foncé
    return '#166534';
  };

  const getCountryAltitude = (country: any) => {
    // Les pays visités sont légèrement surélevés
    if (visitedCountries.includes(country.properties.ISO_A3)) {
      return 0.01;
    }
    return 0.005;
  };

  return (
    <div id="travel" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-16">
      <div className="w-full max-w-6xl">
        {/* Titre de la section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('travel.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {t('travel.description')}
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="text-sm md:text-base">{t('travel.visited')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-800"></div>
              <span className="text-sm md:text-base">{t('travel.not_visited')}</span>
            </div>
          </div>
        </div>

        {/* Globe 3D */}
        <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden">
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="rgba(0,0,0,0)"
            lineHoverPrecision={0}
            polygonsData={countries.features}
            polygonAltitude={(d: any) => (d === hoverD ? 0.03 : getCountryAltitude(d))}
            polygonCapColor={(d: any) => (d === hoverD ? '#ff6b6b' : getCountryColor(d))}
            polygonSideColor={() => 'rgba(0, 100, 200, 0.15)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d }: any) => `
              <div style="
                background: rgba(0, 0, 0, 0.85);
                padding: 8px 12px;
                border-radius: 8px;
                color: white;
                font-family: system-ui, -apple-system, sans-serif;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
              ">
                <strong>${d.ADMIN}</strong><br/>
                ${visitedCountries.includes(d.ISO_A3) ? '✓ ' + t('travel.visited') : t('travel.not_visited')}
              </div>
            `}
            onPolygonHover={setHoverD}
            polygonsTransitionDuration={300}
            width={typeof window !== 'undefined' ? window.innerWidth > 768 ? 700 : window.innerWidth - 32 : 700}
            height={typeof window !== 'undefined' ? window.innerWidth > 1024 ? 500 : window.innerWidth > 768 ? 450 : 400 : 500}
          />
        </div>

        {/* Statistiques */}
        <div className="mt-8 text-center">
          <p className="text-lg md:text-xl">
            <span className="font-bold text-blue-600">{visitedCountries.length}</span> {t('travel.countries_visited')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelGlobe;
