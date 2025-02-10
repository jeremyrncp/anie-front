"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Pour détecter l'onglet actif

export default function SuiviDossier() {
  const pathname = usePathname(); // Récupérer l'URL actuelle pour définir l'onglet actif

  const tabs = [
    { name: "Mes Informations", path: "/infos" },
    { name: "Mes Démarches", path: "/demarches" },
    { name: "Suivi de mon dossier", path: "/suivi" },
    { name: "Mes Paiements", path: "/paiements" },
  ];

  // Liste des étapes du suivi
  const steps = [
    "Immatriculation au Registre du Commerce et du Crédit Mobilier",
    "Attribution du Numéro d’Identification Fiscale (NIF)",
    "Immatriculation de la Société",
    "La délivrance de l’attestation",
  ];

  // Modifier ici l'étape actuelle (0 = première étape, 1 = deuxième, etc.)
  const currentStep = 2; // Exemple : le dossier est en cours d'immatriculation de la société

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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Suivi de mon dossier</h1>

      {/* Étapes du suivi */}
      <div className="w-full bg-white shadow-md rounded-lg p-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Étapes de votre dossier</h2>
        
        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-8">
              {/* Indicateur visuel */}
              <div className="flex flex-col items-center mr-6">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
                    index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                  } text-lg`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-1 h-12 ${index < currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                  ></div>
                )}
              </div>
              
              {/* Texte de l'étape */}
              <p
                className={`text-xl font-semibold ${
                  index <= currentStep ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Statut actuel */}
        <div className="mt-8 text-xl font-semibold text-blue-700">
          📌 Statut actuel : {steps[currentStep]}
        </div>
      </div>
    </div>
  );
}
