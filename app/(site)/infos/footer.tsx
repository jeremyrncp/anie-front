import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, ChevronRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-5 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Colonne Logo + Description */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/anie_SIR.jpg" width={50} height={50} alt="ANIE Logo" />
          <p className="text-gray-700 text-sm mt-4 text-center md:text-left">
            L'Agence Nationale des Investissements et des Exportations est un établissement public à caractère administratif.
          </p>
          {/* Réseaux sociaux */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        {/* Colonne "Quoi de neuf ?" */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quoi de neuf ?</h3>
          <ul className="space-y-2 text-gray-700">
            {[
              { text: "Accueil", link: "https://anie.td/" },
              { text: "ANIE", link: "https://anie.td/anie-2/" },
              { text: "Actualités", link: "https://anie.td/actualites/" }
            ].map((item, index) => (
              <li key={index} className="flex items-center hover:text-blue-600">
                <ChevronRight size={18} className="text-gray-600" />
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne "À propos" */}
        <div>
          <h3 className="font-bold text-lg mb-4">À propos</h3>
          <ul className="space-y-2 text-gray-700">
            {[
              { text: "Qui sommes-nous ?", link: "https://anie.td/accueil/qui-sommes-nous/" },
              { text: "Missions", link: "https://anie.td/accueil/missions/" },
              { text: "L’équipe dirigeante de l’ANIE", link: "https://anie.td/lequipe-dirigeante-de-lanie/" }
            ].map((item, index) => (
              <li key={index} className="flex items-center hover:text-blue-600">
                <ChevronRight size={18} className="text-gray-600" />
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne "Espace Business" */}
        <div>
          <h3 className="font-bold text-lg mb-4">Espace Business</h3>
          <ul className="space-y-2 text-gray-700">
            {[
              { text: "Espace business", link: "https://anie.td/investir-au-tchad/espace-business/" },
              { text: "Potentialités et Opportunités", link: "https://anie.td/investir-au-tchad/espace-business/opportunites/" },
              { text: "Mesures Incitatives", link: "https://anie.td/investir-au-tchad/espace-business/mesures-incitatives/" }
            ].map((item, index) => (
              <li key={index} className="flex items-center hover:text-blue-600">
                <ChevronRight size={18} className="text-gray-600" />
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
};
