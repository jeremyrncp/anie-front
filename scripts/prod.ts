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
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { id: 1, title: "Swahili", imageSrc: "/SwahiliFlag.jpg" },
        { id: 2, title: "Yoruba", imageSrc: "/YorubaFlag.png" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Greetings", order: 1 },
            { unitId: unit.id, title: "Personal Introduction", order: 2 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          let challenges = [];
          if (course.title === "Swahili" && lesson.title === "Greetings") {
            challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "New expression",
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : .......... !",
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Jina langu ni Tendaji.",
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Jina .......... Tendaji.",
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Jina lako nani ?",
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : .......... nani ?",
                  order: 6,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Habari",
                    imageSrc: "/hello.png",
                    audioSrc: "/sw_habari.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Habali",
                    audioSrc: "/sw_habali.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Habari",
                    audioSrc: "/sw_habari.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "My name is Tendaji.",
                    imageSrc: "/my_name_is.png",
                    audioSrc: "/sw_jina_langu_ni_Tendaji.mp3",
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "lanu ni",
                    audioSrc: "/sw_lanu_ni.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "langu ni",
                    audioSrc: "/sw_langu_ni.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "What's your name ?",
                    imageSrc: "/whatsyourname.png",
                    audioSrc: "/sw_jina_lako_nani.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "jina lako",
                    audioSrc: "/sw_jina_lako.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "jena lako",
                    audioSrc: "/sw_jena_lako.mp3",
                  },
                ]);
              }
            }
          }

          if (course.title === "Swahili" && lesson.title === "Personal Introduction") {
            challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Jina langu ni Tendaji.",
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Nina miaka ishirini na tano.",
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Ninatoka Tanzania.",
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Jina .......... Tendaji.",
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Nina miaka .......... na tano.",
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Ninatoka ..........",
                  order: 6,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "My name is Tendaji.",
                    imageSrc: "/my_name_is.png",
                    audioSrc: "/sw_jina_langu_ni_Tendaji.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "I am twenty-five years old.",
                    audioSrc: "/sw_nina_miaka_ishirini_na_tano.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "I am from Tanzania.",
                    audioSrc: "/sw_ninatoka_Tanzania.mp3",
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "lanu ni",
                    audioSrc: "/sw_lanu_ni.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "langu ni",
                    audioSrc: "/sw_langu_ni.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ishirini",
                    audioSrc: "/sw_ishirini.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ishirini na tano",
                    audioSrc: "/sw_ishirini_na_tano.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Tanzania",
                    audioSrc: "/sw_Tanzania.mp3",
                  },
                ]);
              }
            }
          }

          if (course.title === "Yoruba" && lesson.title === "Greetings") {
            challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "New expression",
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : .......... !",
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Orukọ mi ni Durojaiye.",
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Orukọ .......... Durojaiye.",
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Kini orukọ rẹ?",
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : .......... rẹ?",
                  order: 6,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Bawo !",
                    imageSrc: "/hello.png",
                    audioSrc: "/yo_bawo.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Bawa",
                    audioSrc: "/yo_bawa.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Bawo",
                    audioSrc: "/yo_bawo.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "My name is Durojaiye.",
                    imageSrc: "/my_name_is.png",
                    audioSrc: "yo_oruko_mi_ni_durojaiye.mp3"
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ranu ni",
                    audioSrc: "/yo_ranu_ni.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "mi ni",
                    audioSrc: "/yo_mi_ni.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "What's your name?",
                    imageSrc: "/whatsyourname.png",
                    audioSrc: "/yo_kini_oruko_re.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "orukọ",
                    audioSrc: "/yo_oruko.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "oruko",
                    audioSrc: "/yo_oruko.mp3",
                  },
                ]);
              }
            }
          }

          if (course.title === "Yoruba" && lesson.title === "Personal Introduction") {
            challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Orukọ mi ni Durojaiye.",
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Mo wa láti Nàìjíríà.",
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Mo jẹ́ ẹni ọdún mẹ́rìnlá.",
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Orukọ .......... Durojaiye.",
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Mo wa láti ..........",
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: "Complete the sentence : Mo jẹ́ ẹni ọdún ..........",
                  order: 6,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "My name is Durojaiye.",
                    imageSrc: "/my_name_is.png",
                    audioSrc: "/yo_oruko_mi_ni_Durojaiye.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "I am from Nigeria.",
                    audioSrc: "/yo_mo_wa_lati_Naijiria.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "I am fourteen years old.",
                    audioSrc: "/yo_mo_je_eni_odun_merinla.mp3",
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ranu ni",
                    audioSrc: "/yo_ranu_ni.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "mi ni",
                    audioSrc: "/yo_mi_ni.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Nigeria",
                    audioSrc: "/yo_Naijiria.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "mẹ́ta",
                    audioSrc: "/yo_meta.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "mẹ́rìnlá",
                    audioSrc: "/yo_merinla.mp3",
                  },
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
