"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Pour détecter l'onglet actif
import { FaRegCircleCheck } from "react-icons/fa6"; // Icône de validation en gris

export default function MesPaiements() {
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
                className={`py-4 px-8 text-lg font-semibold ${
                  pathname === tab.path ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-600"
                } transition-colors`}
              >
                {tab.name}
              </button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Paiements</h1>

      {/* Statut du paiement */}
      <div className="w-full bg-white shadow-md rounded-lg p-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Statut de votre paiement</h2>

        {/* Icône et texte */}
        <div className="flex flex-col items-center mb-6">
          <FaRegCircleCheck className="text-gray-400 text-6xl mb-2" />
          <p className="text-lg font-semibold text-gray-600">💰 Paiement en attente</p>
        </div>

        {/* Options de paiement */}
        <div className="flex flex-col items-center gap-6">
          {/* Bouton pour payer en ligne */}
          <button className="aniestyle px-6 py-3 text-lg font-bold rounded-lg shadow-md transition hover:scale-105">
            Régler vos frais en ligne
          </button>

          <h1 className="text-xl font-bold text-gray-800">OU</h1>
          
          {/* Option pour payer sur place */}
          <div className="bg-gray-100 p-6 rounded-lg w-full max-w-md text-center">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Payer sur place</h3>
            <p className="text-gray-600">📍 Bureau de l'ANIE</p>
            <p className="text-gray-600">Quartier Bololo, BP : 721, Tchad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
