import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { 
  users,
  companyRequests,
  documents,
  payments,
  validations,
  notifications
} from "@/db/schema";

// 🔹 Récupérer les informations de l'utilisateur connecté
export const getUserProfile = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const userData = await db.query.users.findFirst({
      where: eq(users.id, userId), // ✅ Correction pour ID en string
    });

    return userData || null;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du profil utilisateur:", error);
    return null;
  }
});

// 🔹 Récupérer toutes les demandes de l'utilisateur connecté
export const getUserRequests = cache(async () => {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    return await db.query.companyRequests.findMany({
      where: eq(companyRequests.userId, userId),
      orderBy: (companyRequests, { desc }) => [desc(companyRequests.createdAt)],
    });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des demandes:", error);
    return [];
  }
});

// 🔹 Récupérer une demande d'entreprise spécifique
export const getCompanyRequestById = cache(async (requestId: number) => {
  try {
    return await db.query.companyRequests.findFirst({
      where: eq(companyRequests.id, requestId),
      with: { documents: true, validations: true, payments: true },
    });
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération de la demande ${requestId}:`, error);
    return null;
  }
});

// 🔹 Vérifier le statut de paiement
export const getPaymentStatus = cache(async () => {
  const userRequests = await getUserRequests();
  if (!userRequests.length) return { paymentStatus: "Aucune demande" };

  return { paymentStatus: userRequests[0].paymentStatus || "inconnu" };
});

// 🔹 Vérifier si un utilisateur a payé ses frais de dossier
export const getUserPayment = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const payment = await db.query.payments.findFirst({
      where: eq(payments.userId, userId),
    });

    return payment ? { ...payment, isPaid: payment.status === "paid" } : null;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du paiement:", error);
    return null;
  }
});

// 🔹 Récupérer toutes les validations faites sur une demande
export const getCompanyValidations = cache(async (requestId: number) => {
  try {
    return await db.query.validations.findMany({
      where: eq(validations.companyRequestId, requestId),
      orderBy: (validations, { desc }) => [desc(validations.createdAt)],
    });
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération des validations pour ${requestId}:`, error);
    return [];
  }
});

// 🔹 Vérifier toutes les demandes en attente de validation pour un bureau spécifique
export const getPendingRequestsByOffice = cache(async (officeId: number) => {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    const user = await getUserProfile();
    if (!user || user.role !== officeId) return [];

    return await db.query.companyRequests.findMany({
      where: eq(companyRequests.currentOffice, officeId),
      orderBy: (companyRequests, { asc }) => [asc(companyRequests.createdAt)],
    });
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération des demandes pour le bureau ${officeId}:`, error);
    return [];
  }
});

// 🔹 Mettre à jour le statut de paiement manuellement (paiement en cash)
export const validateManualPayment = cache(async (requestId: number) => {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const user = await getUserProfile();
    if (!user || user.role < 1) return null;

    await db.update(companyRequests)
      .set({ paymentStatus: "paid" })
      .where(eq(companyRequests.id, requestId));

    return { success: true };
  } catch (error) {
    console.error(`❌ Erreur lors de la validation du paiement pour la demande ${requestId}:`, error);
    return { success: false };
  }
});

// 🔹 Récupérer toutes les demandes pour un directeur (rôle 4)
export const getAllCompanyRequestsForDirector = cache(async () => {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    const user = await getUserProfile();
    if (!user || user.role !== 4) return [];

    return await db.query.companyRequests.findMany({
      orderBy: (companyRequests, { desc }) => [desc(companyRequests.createdAt)],
    });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des demandes pour le directeur:", error);
    return [];
  }
});

// 🔹 Récupérer les notifications d'un utilisateur
export const getUserNotifications = cache(async () => {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    return await db.query.notifications.findMany({
      where: eq(notifications.userId, userId),
      orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
    });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des notifications:", error);
    return [];
  }
});

// 🔹 Récupérer les informations du tableau de bord de l'utilisateur
export const getUserDashboardInfo = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const userData = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!userData) {
      console.warn("⚠️ Aucune information utilisateur trouvée.");
      return null;
    }

    const latestRequest = await db.query.companyRequests.findFirst({
      where: eq(companyRequests.userId, userData.id),
      orderBy: (companyRequests, { desc }) => [desc(companyRequests.createdAt)],
    });

    return {
      id: userData.id,
      fullName: userData.fullName || "Non renseigné",
      dossierNumber: latestRequest?.procedureNumber || "Aucun dossier",
      identifier: userData.id,
      birthDate: userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : "Non renseignée",
      age: userData.dateOfBirth ? new Date().getFullYear() - new Date(userData.dateOfBirth).getFullYear() : "Non renseigné",
      email: userData.email || "Non renseigné",
      phone: userData.phone || "Non renseigné",
      address: userData.address || "Non renseignée",
      status: latestRequest?.status || "Aucune demande en cours",
      registrationDate: latestRequest?.createdAt ? new Date(latestRequest.createdAt).toLocaleDateString() : "Non renseignée",
      updateDate: latestRequest?.updatedAt ? new Date(latestRequest.updatedAt).toLocaleDateString() : "Non renseignée",
    };
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des infos du tableau de bord:", error);
    return null;
  }
});

export const updateUserProfile = async (updates: Partial<typeof users.$inferInsert>) => {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Erreur lors de la mise à jour");

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour des informations:", error);
    return null;
  }
};
