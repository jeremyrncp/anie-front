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
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'New expression',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Complete the sentence : .......... !',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Jina langu ni Tendaji.',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Complete the sentence : Jina .......... Tendaji !',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Jina lako nani ?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Complete the sentence : .......... nani ?',
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
                  imageSrc: "/Habari.png",
                  audioSrc: "/sw_habari.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Habali !",
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
                  text: "My name is Tendaji",
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
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
