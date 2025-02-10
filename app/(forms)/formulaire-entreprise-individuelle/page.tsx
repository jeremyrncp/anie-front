"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

// 📌 Définition du schéma de validation avec Zod
const formSchema = z.object({
  typeBusiness: z.string().min(1, "Sélectionnez un type d'entreprise"),
  companyName: z.string().min(2, "Le nom de l'entreprise est obligatoire"),
  acronym: z.string().optional(),
  legalForm: z.string().min(1, "La forme juridique est requise"),
  registeredAddress: z.string().min(5, "L'adresse est obligatoire"),
  phone: z.string().min(6, "Numéro de téléphone requis"),
  email: z.string().email("Email invalide"),
  mainActivity: z.string().min(3, "L'activité principale est requise"),
  nafApeCode: z.string().optional(),
  shareCapital: z.number().min(1, "Le capital social est requis"),
  businessStartDate: z.string().optional(),
  companyDuration: z.string().optional(),
});

export default function CreerMonActivite() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("typeBusiness", data.typeBusiness);
      formData.append("companyName", data.companyName);
      formData.append("acronym", data.acronym || "");
      formData.append("legalForm", data.legalForm);
      formData.append("registeredAddress", data.registeredAddress);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("mainActivity", data.mainActivity);
      formData.append("nafApeCode", data.nafApeCode || "");
      formData.append("shareCapital", data.shareCapital.toString());
      formData.append("businessStartDate", data.businessStartDate || "");
      formData.append("companyDuration", data.companyDuration || "");

      if (file) formData.append("requiredDocuments", file);

      await axios.post("http://localhost:3000/dossier", formData);

      // ✅ Affichage du message après soumission réussie
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Créer mon activité</h1>

      {/* ✅ Affichage du message de confirmation si formulaire soumis */}
      {isSubmitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md shadow-md text-center">
          ✅ Votre déclaration a bien été envoyée ! Nous traiterons votre demande sous les plus brefs délais.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type de Business */}
          <select {...register("typeBusiness")} className="border p-2 w-full">
            <option value="">Sélectionner le type d'entreprise</option>
            <option value="Individual">Individu</option>
            <option value="Company">Société commerciale</option>
            <option value="LLC">LLC</option>
            <option value="PLC">PLC</option>
            <option value="SAS">SAS</option>
          </select>

          {/* Nom de l'entreprise */}
          <input type="text" placeholder="Nom de l'entreprise" {...register("companyName")} className="border p-2 w-full" />

          {/* Forme Juridique */}
          <input type="text" placeholder="Forme juridique" {...register("legalForm")} className="border p-2 w-full" />

          {/* Adresse */}
          <input type="text" placeholder="Adresse de l'entreprise" {...register("registeredAddress")} className="border p-2 w-full" />

          {/* Téléphone */}
          <input type="text" placeholder="Téléphone" {...register("phone")} className="border p-2 w-full" />

          {/* Email */}
          <input type="email" placeholder="Email" {...register("email")} className="border p-2 w-full" />

          {/* Activité Principale */}
          <input type="text" placeholder="Activité principale" {...register("mainActivity")} className="border p-2 w-full" />

          {/* Capital Social */}
          <input type="number" placeholder="Capital social (FCFA)" {...register("shareCapital")} className="border p-2 w-full" />

          {/* Téléchargement des documents */}
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2 w-full" />

          {/* Bouton de soumission */}
          <Button type="submit" variant="aniestyle" className="w-full">
            Soumettre le dossier
          </Button>
        </form>
      )}
    </div>
  );
}
