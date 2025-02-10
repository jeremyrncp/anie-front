"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Pour détecter l'onglet actif

export default function MesDemarches() {
  const pathname = usePathname(); // Récupérer l'URL actuelle pour définir l'onglet actif

  const tabs = [
    { name: "Mes Informations", path: "/infos" },
    { name: "Mes Démarches", path: "/demarches" },
    { name: "Suivi de mon dossier", path: "/suivi" },
    { name: "Mes Paiements", path: "/paiements" },
  ];

  const sections = [
    {
      title: "Créez votre entreprise en ligne",
      buttons: ["Les personnes physiques ayant la qualité de commerçant"],
    },
    {
      title: "Les Sociétés commerciales",
      buttons: [
        "Les Sociétés à Responsabilité Limitée (Sarl)",
        "Les Sociétés Anonymes (SA)",
        "Les Sociétés par Actions Simplifiées (SAS)",
      ],
    },
    {
      title: "Les Sociétés spécifiques",
      buttons: [
        "Les Société en Nom Collectifs (SNC)",
        "Les Sociétés en Commandites Simples (SNC)",
        "Les Société civiles par leur formes et commerciales par leur objet",
      ],
    },
    {
      title: "Les Groupements et Succursales",
      buttons: [
        "Les Groupements d’Intérêt Economiques (GIE)",
        "Les Succursales",
        "Les Groupements dotés de la personnalité juridique que la loi soumet à l’Immatriculation au RCCM",
      ],
    },
    {
      title: "Autres entités soumises à l'immatriculation",
      buttons: [
        "Toutes les personnes physiques exerçant une activité professionnelle que la Loi soumet à l’immatriculation au RCCM",
        "Les Etablissements publics ayant une activité économique et bénéficiant de l’autonomie juridique et financière",
        "Les entreprenants (Déclaration)",
      ],
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto flex-1 w-full flex flex-col items-center justify-center p-6">
      {/* Barre de navigation */}
      <div className="w-full bg-white shadow-md rounded-lg mb-6">
        <nav className="flex justify-around border-b">
          {tabs.map((tab) => (
            <Link href={tab.path} key={tab.name} passHref>
              <button
                className={`py-3 px-6 text-lg font-semibold ${
                  pathname === tab.path ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-600"
                } transition-colors`}
              >
                {tab.name}
              </button>
            </Link>
          ))}
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Démarches</h1>

      {sections.map((section, index) => (
        <div key={index} className="w-full bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">{section.title}</h2>
          <div className="flex flex-wrap gap-2">
            {section.buttons.map((button, btnIndex) => (
              <button
                key={btnIndex}
                className="bg-pink-100 text-pink-700 font-semibold px-3 py-1.5 rounded-full text-xs hover:bg-pink-200 transition"
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
