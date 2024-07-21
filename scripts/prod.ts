import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Swahili", imageSrc: "/(Flags)/SwahiliFlag.jpg" },
        { title: "Yoruba", imageSrc: "/(Flags)/YorubaFlag.png" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          { courseId: course.id, title: "Unit 1", description: `Learn the basics of ${course.title}`, order: 1 },
          { courseId: course.id, title: "Unit 2", description: `Learn intermediate ${course.title}`, order: 2 },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        if (course.title === "Swahili") {
          const lessons = await db
            .insert(schema.lessons)
            .values([{ unitId: unit.id, title: "Greetings", order: 1 }])
            .returning();

          // For each lesson, insert challenges
          for (const lesson of lessons) {
            const challenges = await db
              .insert(schema.challenges)
              .values([
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : Habari !', order: 1 },
                { lessonId: lesson.id, type: "SELECT", question: 'Complete the sentence : .......... !', order: 2 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : Jina langu ni Tendaji.', order: 3 },
                { lessonId: lesson.id, type: "SELECT", question: 'Complete the sentence : Jina .......... Tendaji.', order: 4 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : Jina lako nani ?', order: 5 },
                { lessonId: lesson.id, type: "SELECT", question: 'Complete the sentence : .......... nani ?', order: 6 },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Hello", imageSrc: "/(Quiz pictures)/hello.png", audioSrc: "/(Swahili)/audios/sw_habari.mp3" },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Habari", audioSrc: "/(Swahili)/audios/sw_habari.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Habali", audioSrc: "/(Swahili)/audios/sw_habali.mp3" },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "My name is Tendaji", imageSrc: "/(Quiz pictures)/my_name_is.png", audioSrc: "/(Swahili)/audios/sw_jina_langu_ni_Tendaji.mp3" },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "lanu ni", audioSrc: "/(Swahili)/audios/sw_lanu_ni.mp3" },
                  { challengeId: challenge.id, correct: true, text: "langu ni", audioSrc: "/(Swahili)/audios/sw_langu_ni.mp3" },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "What is your name ?", imageSrc: "/(Quiz pictures)/whatsyourname.png", audioSrc: "/(Swahili)/audios/sw_jina_lako_nani.mp3" },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "jina lako", audioSrc: "/(Swahili)/audios/sw_jina_lako.mp3" },
                  { challengeId: challenge.id, correct: false, text: "jena lako", audioSrc: "/(Swahili)/audios/sw_jena_lako.mp3" },
                ]);
              }
            }
          }
        } else if (course.title === "Yoruba") {
          const lessons = await db
            .insert(schema.lessons)
            .values([{ unitId: unit.id, title: "Ounje (The food)", order: 1 }])
            .returning();

          // For each lesson, insert challenges
          for (const lesson of lessons) {
            const challenges = await db
              .insert(schema.challenges)
              .values([
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : ounje', order: 1 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : isu', order: 2 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : eja', order: 3 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : Ounje', order: 4 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : Isu', order: 5 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : Eja', order: 6 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen to the translations : Ounje', order: 7 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : iresi', order: 8 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : akara', order: 9 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : moinmoin', order: 10 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : iresi', order: 11 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : akara', order: 12 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : moinmoin', order: 13 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : epo', order: 14 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : omi', order: 15 },
                { lessonId: lesson.id, type: "SELECT", question: 'Listen and repeat : bota', order: 16 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : epo', order: 17 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : omi', order: 18 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : bota', order: 19 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : iresi', order: 20 },
                { lessonId: lesson.id, type: "SELECT", question: 'Choose the correct translation : akara', order: 21 },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Food", imageSrc: "/(Quiz pictures)/food.png", audioSrc: "/(Yoruba)/audios/yo_ounje.mp3" },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Yam", imageSrc: "/(Quiz pictures)/yam.png", audioSrc: "/(Yoruba)/audios/yo_isu.mp3" },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Fish", imageSrc: "/(Quiz pictures)/fish.png", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "Yam", audioSrc: "/(Yoruba)/audios/yo_isu.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Food", audioSrc: "/(Yoruba)/audios/yo_ounje.mp3" },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Yam", audioSrc: "/(Yoruba)/audios/yo_isu.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Food", audioSrc: "/(Yoruba)/audios/yo_ounje.mp3" },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "Yam", audioSrc: "/(Yoruba)/audios/yo_isu.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Food", audioSrc: "/(Yoruba)/audios/yo_ounje.mp3" },
                ]);
              }

              if (challenge.order === 7) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Food", audioSrc: "/(Yoruba)/audios/yo_ounje.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Yam", audioSrc: "/(Yoruba)/audios/yo_isu.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                ]);
              }

              if (challenge.order === 8) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Rice", imageSrc: "/(Quiz pictures)/rice.png", audioSrc: "/(Yoruba)/audios/yo_iresi.mp3" },
                ]);
              }

              if (challenge.order === 9) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Beans cake", imageSrc: "/(Quiz pictures)/beans_cake.png", audioSrc: "/(Yoruba)/audios/yo_akara.mp3" },
                ]);
              }

              if (challenge.order === 10) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Beans cake", imageSrc: "/(Quiz pictures)/beans_cake.png", audioSrc: "/(Yoruba)/audios/yo_moinmoin.mp3" },
                ]);
              }

              if (challenge.order === 11) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Rice", audioSrc: "/(Yoruba)/audios/yo_iresi.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Beans cake", audioSrc: "/(Yoruba)/audios/yo_akara.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                ]);
              }

              if (challenge.order === 12) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "Rice", audioSrc: "/(Yoruba)/audios/yo_iresi.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Beans cake", audioSrc: "/(Yoruba)/audios/yo_akara.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                ]);
              }

              if (challenge.order === 13) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "Rice", audioSrc: "/(Yoruba)/audios/yo_iresi.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Beans cake", audioSrc: "/(Yoruba)/audios/yo_moinmoin.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                ]);
              }

              if (challenge.order === 14) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Oil", imageSrc: "/(Quiz pictures)/oil.png", audioSrc: "/(Yoruba)/audios/yo_epo.mp3" },
                ]);
              }

              if (challenge.order === 15) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Water", imageSrc: "/(Quiz pictures)/water.png", audioSrc: "/(Yoruba)/audios/yo_omi.mp3" },
                ]);
              }

              if (challenge.order === 16) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Butter", imageSrc: "/(Quiz pictures)/butter.png", audioSrc: "/(Yoruba)/audios/yo_bota.mp3" },
                ]);
              }

              if (challenge.order === 17) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Oil", audioSrc: "/(Yoruba)/audios/yo_epo.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Water", audioSrc: "/(Yoruba)/audios/yo_omi.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Butter", audioSrc: "/(Yoruba)/audios/yo_bota.mp3" },
                ]);
              }

              if (challenge.order === 18) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "Oil", audioSrc: "/(Yoruba)/audios/yo_epo.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Water", audioSrc: "/(Yoruba)/audios/yo_omi.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Butter", audioSrc: "/(Yoruba)/audios/yo_bota.mp3" },
                ]);
              }

              if (challenge.order === 19) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "Oil", audioSrc: "/(Yoruba)/audios/yo_epo.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Water", audioSrc: "/(Yoruba)/audios/yo_omi.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Butter", audioSrc: "/(Yoruba)/audios/yo_bota.mp3" },
                ]);
              }

              if (challenge.order === 20) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: true, text: "Rice", audioSrc: "/(Yoruba)/audios/yo_iresi.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Beans cake", audioSrc: "/(Yoruba)/audios/yo_akara.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Oil", audioSrc: "/(Yoruba)/audios/yo_epo.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Water", audioSrc: "/(Yoruba)/audios/yo_omi.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Food", audioSrc: "/(Yoruba)/audios/yo_ounje.mp3" },
                ]);
              }

              if (challenge.order === 21) {
                await db.insert(schema.challengeOptions).values([
                  { challengeId: challenge.id, correct: false, text: "Rice", audioSrc: "/(Yoruba)/audios/yo_iresi.mp3" },
                  { challengeId: challenge.id, correct: true, text: "Beans cake", audioSrc: "/(Yoruba)/audios/yo_akara.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Fish", audioSrc: "/(Yoruba)/audios/yo_eja.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Oil", audioSrc: "/(Yoruba)/audios/yo_epo.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Water", audioSrc: "/(Yoruba)/audios/yo_omi.mp3" },
                  { challengeId: challenge.id, correct: false, text: "Food", audioSrc: "/(Yoruba)/audios/yo_ounje.mp3" },
                ]);
              }
            }
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
