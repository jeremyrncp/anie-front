"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Pour détecter l'onglet actif

export default function Infos() {
  const pathname = usePathname(); // Récupérer l'URL actuelle pour définir l'onglet actif

  const tabs = [
    { name: "Mes Informations", path: "/infos" },
    { name: "Mes Démarches", path: "/demarches" },
    { name: "Suivi de mon dossier", path: "/suivi" },
    { name: "Mes Paiements", path: "/paiements" },
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
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Informations personnelles</h1>

      {/* Contenu principal */}
      <div className="w-full bg-white shadow-lg rounded-lg p-8">

        {/* Identité */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-lg font-semibold">
            <span className="font-bold">Nom :</span> MHT ABAKAR
          </p>
          <p className="text-sm text-gray-600">Identifiant : 0000001</p>
          <p className="text-sm text-gray-600">Dossier : XXXXXXXX</p>
        </div>

        {/* Détails d'immatriculation */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600">
            Immatriculation au Registre du Commerce et du Crédit Mobilier.
          </p>
          <p className="text-sm text-gray-600">Attribution du NIF</p>
          <p className="text-sm text-gray-600">Immatriculation de la Société.</p>
          <p className="text-sm text-gray-600 font-semibold">
            Date de naissance : 01/01/1981
          </p>
        </div>

        {/* Statut */}
        <div className="bg-green-100 text-green-800 font-semibold p-3 rounded-lg text-center">
          ✅ Inscrit (Depuis le 21/01/2025)
        </div>

        {/* Dates d'actualisation */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600">
            Dernière actualisation : <span className="font-bold">29/01/2025</span>
          </p>
          <p className="text-sm text-gray-600">
            Valide jusqu’au : <span className="font-bold">27/01/2025</span>
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold">Coordonnées</h3>
          <p className="text-sm text-gray-600">📍 Appartement 11, 4 Rue Makila, NDJ</p>
          <p className="text-sm text-gray-600">📧 mht.abakar@gmail.com</p>
          <p className="text-sm text-gray-600">📞 +235 22 22 52 35</p>
        </div>

        {/* Gestion de compte */}
        <div className="bg-blue-100 text-blue-800 font-semibold p-3 rounded-lg text-center cursor-pointer hover:bg-blue-200">
          Accéder à la gestion de compte
        </div>
      </div>
    </div>
  );
}
