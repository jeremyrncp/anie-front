import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, decimal } from "drizzle-orm/pg-core";

// 🔹 Table des utilisateurs
export const users = pgTable("users", {
  id: text("id").primaryKey(), // ✅ Utiliser `text()` pour stocker l'ID Clerk
  email: text("email").notNull().unique(),
  role: integer("role").notNull().default(0), // 0 = Utilisateur, 1-3 = Bureaux, 4 = Directeur
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  dateOfBirth: timestamp("date_of_birth"),
  nationality: text("nationality"),
  identityDocument: text("identity_document"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});


export const usersRelations = relations(users, ({ many }) => ({
  companyRequests: many(companyRequests),
  payments: many(payments),
  notifications: many(notifications),
}));

// 🔹 Table des demandes de création d'entreprise
export const companyRequests = pgTable("company_requests", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(), // ✅ Doit être text() comme Clerk
  procedureNumber: text("procedure_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  businessType: text("business_type").notNull(),
  companyPhone: text("company_phone"),
  companyEmail: text("company_email"),
  companyAddress: text("company_address"),
  capitalAmount: decimal("capital_amount"),
  legalRepresentative: text("legal_representative"),
  status: text("status").notNull().default("pending"), // pending, validated, rejected
  currentOffice: integer("current_office").default(1), // Bureau en charge
  paymentStatus: text("payment_status").default("unpaid"), // unpaid, pending, paid
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const companyRequestsRelations = relations(companyRequests, ({ one, many }) => ({
  user: one(users, {
    fields: [companyRequests.userId],
    references: [users.id],
  }),
  documents: many(documents),
  validations: many(validations),
  payments: many(payments),
}));

// 🔹 Table des documents (liés à une demande d’entreprise)
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  companyRequestId: integer("company_request_id").references(() => companyRequests.id, { onDelete: "cascade" }).notNull(),
  documentType: text("document_type").notNull(),
  fileUrl: text("file_url").notNull(), // URL du document
  uploadedAt: timestamp("uploaded_at").defaultNow()
});

export const documentsRelations = relations(documents, ({ one }) => ({
  companyRequest: one(companyRequests, {
    fields: [documents.companyRequestId],
    references: [companyRequests.id],
  }),
}));

// 🔹 Table des paiements (Stripe ou validation manuelle)
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(), // ✅ Doit être text() comme Clerk
  companyRequestId: integer("company_request_id").references(() => companyRequests.id, { onDelete: "cascade" }).notNull(),
  paymentMethod: text("payment_method").notNull(), // stripe, cash, bank_transfer
  stripePaymentId: text("stripe_payment_id").unique(), // ID Stripe
  amount: decimal("amount").notNull(),
  status: text("status").default("pending"), // pending, success, failed
  createdAt: timestamp("created_at").defaultNow()
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  companyRequest: one(companyRequests, {
    fields: [payments.companyRequestId],
    references: [companyRequests.id],
  }),
}));

// 🔹 Table des validations (bureaux 1, 2, 3)
export const validations = pgTable("validations", {
  id: serial("id").primaryKey(),
  companyRequestId: integer("company_request_id").references(() => companyRequests.id, { onDelete: "cascade" }).notNull(),
  officeId: integer("office_id").notNull(), // Bureau qui valide
  validated: boolean("validated").default(false),
  reason: text("reason"),
  additionalMessage: text("additional_message"),
  createdAt: timestamp("created_at").defaultNow()
});

export const validationsRelations = relations(validations, ({ one }) => ({
  companyRequest: one(companyRequests, {
    fields: [validations.companyRequestId],
    references: [companyRequests.id],
  }),
}));

// 🔹 Table des notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(), // ✅ Doit être text() comme Clerk
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
