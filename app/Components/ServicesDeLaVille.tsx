import servicesData from '../data/serviceDeLaVille.json';
import Image from 'next/image';

export default function ServicesDeLaVille() {
  const services = servicesData["Services de la ville"].itemsservices;
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3, 6);

  return (
    <section className="container mx-auto px-1 pt-30 pb-12">
      <h2 className="text-4xl font-bold text-center mt-16 mb-10 text-yellow-900">SERVICES DE LA VILLE</h2>

      {/* Introduction */}
      <p className="text-center text-xl text-gray-700 max-w-4xl mx-auto mb-12">
        Explorez les services qui façonnent la vie à Tataouine, un mélange unique de tradition et de modernité au cœur du sud tunisien.
      </p>

      {/* Première rangée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {firstRow.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {service.image && (
              <div className="w-full h-48 relative">
                <Image
                  src={`/${service.image}`}
                  alt={service.alt || service.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-yellow-800">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section intermédiaire */}
      <div className="my-16 text-center">
        <h3 className="text-4xl font-bold mb-4 text-yellow-900">Les défis à relever !</h3>
        <p className="text-xl text-gray-700 max-w-8xl mx-auto">
          Bien que Tataouine offre une richesse culturelle et des services essentiels, des défis persistent. L'accès à l'eau potable, la gestion des déchets et les infrastructures routières limitées sont autant d'obstacles à surmonter pour améliorer la qualité de vie des habitants.
        </p>
      </div>

      {/* Deuxième rangée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secondRow.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {service.image && (
              <div className="w-full h-48 relative">
                <Image
                  src={`/${service.image}`}
                  alt={service.alt || service.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-yellow-800">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
