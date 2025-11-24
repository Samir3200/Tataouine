import Image from "next/image";
import radioData from "../data/radioTataouine.json";

export default function RadioTataouine() {
  return (
    <main className="max-w-7xl mx-auto p-10 min-h-screen relative mt-35" style={{background: "linear-gradient(135deg, #f8fafc 60%, #fffbe6 100%)"}}>
      <div className="absolute top-8 right-8 z-10">
        <img src="/image/logo radio-tataouine.svg" alt="Logo Radio Tataouine" width={90} height={90} className="object-contain drop-shadow-lg" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-900">{radioData.Title}</h1>
      <div className="flex flex-col items-center mb-6">
        <Image 
          src={`/${radioData.image}`}
          alt="Radio Tataouine"
          width={500}
          height={100}
          className="rounded-lg shadow object-contain"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p className="mt-4 text-lg text-gray-700 text-center">{radioData.Description}</p>
      </div>

      {/* Section 1: Écouter en direct */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 bg-white rounded-2xl shadow-lg border border-yellow-100 p-8" style={{background: "rgba(255,255,255,0.95)"}}>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800">{radioData.paraghraphe1.title1}</h2>
            <p className="mb-2 text-gray-700">{radioData.paraghraphe1.description1}</p>
            <ul className="list-disc pl-6">
              {radioData.paraghraphe1.liste.map((item, idx) => {
                if (item.item1 && item.lien1) {
                  return (
                    <li key={idx} className="mb-1">
                      <a href={item.lien1} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {item.item1}
                      </a>
                    </li>
                  );
                }
                if (item.item2 && item.lien2) {
                  return (
                    <li key={idx} className="mb-1">
                      <a href={item.lien2} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {item.item2}
                      </a>
                    </li>
                  );
                }
                if (item.item3 && item.lien3) {
                  return (
                    <li key={idx} className="mb-1">
                      <a href={item.lien3} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {item.item3}
                      </a>
                    </li>
                  );
                }
                if (item.item5 && item.lien5) {
                  return (
                    <li key={idx} className="mb-1">
                      <a href={item.lien5} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {item.item5}
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
          <div className="flex-shrink-0 self-center">
            <Image src={`/${radioData.paraghraphe1.image1}`} alt="Bâtiment Radio" width={350} height={200} className="rounded mb-2 shadow w-auto h-auto" style={{width: "auto", height: "auto"}} />
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center my-8">
        <hr className="w-2/3 border-t-4 border-yellow-500 rounded-full shadow" />
      </div>

      {/* Section 2: Fréquences FM */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 bg-white rounded-2xl shadow-lg border border-yellow-100 p-8" style={{background: "rgba(255,255,255,0.95)"}}>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800">{radioData.paraghraphe2.title2}</h2>
            <p className="mb-2 text-gray-700">{radioData.paraghraphe2.description2}</p>
            <ul className="list-disc pl-6">
              {Object.values(radioData.paraghraphe2.liste2[0]).map((freq, idx) => (
                <li key={idx} className="mb-1 text-blue-700 font-medium">{freq}</li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0 self-center">
            <Image src={`/${radioData.paraghraphe2.image2}`} alt="Fréquences FM" width={350} height={200} className="rounded mb-2 shadow w-auto h-auto" />
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center my-8">
        <hr className="w-2/3 border-t-4 border-yellow-500 rounded-full shadow" />
      </div>

      {/* Section 3: Grille des programmes */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 bg-white rounded-2xl shadow-lg border border-yellow-100 p-8" style={{background: "rgba(255,255,255,0.95)"}}>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800">{radioData.paraghraphe3.title3}</h2>
            <p className="mb-2 text-gray-700">{radioData.paraghraphe3.description3}</p>
            <ul className="list-disc pl-6">
              {Object.values(radioData.paraghraphe3.liste3[0]).map((prog, idx) => (
                <li key={idx} className="mb-1">{prog}</li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0 self-center">
            <Image src={`/${radioData.paraghraphe3.image3}`} alt="Grille des programmes" width={350} height={200} className="rounded mb-2 shadow w-auto h-auto" />
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center my-8">
        <hr className="w-2/3 border-t-4 border-yellow-500 rounded-full shadow" />
      </div>

      {/* Section 4: Présence en ligne */}
      <section>
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 bg-white rounded-2xl shadow-lg border border-yellow-100 p-8" style={{background: "rgba(255,255,255,0.95)"}}>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800">{radioData.paraghraphe4.title4}</h2>
            <p className="mb-2 text-gray-700">{radioData.paraghraphe4.description4}</p>
            <ul className="list-disc pl-6">
              {radioData.paraghraphe4.liste4.map((item, idx) => {
                if (item.item1 && item.lien1) {
                  return (
                    <li key={idx} className="mb-1">
                      <a href={item.lien1} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {item.item1}
                      </a>
                    </li>
                  );
                }
                if (item.item2 && item.lien2) {
                  return (
                    <li key={idx} className="mb-1">
                      <a href={item.lien2} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {item.item2}
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
          <div className="flex-shrink-0 self-center">
            <Image src={`/${radioData.paraghraphe4.image4}`} alt="Présence en ligne" width={350} height={200} className="rounded mb-2 shadow w-auto h-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}
