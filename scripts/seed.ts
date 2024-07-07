import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!); 
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Swahili",
        imageSrc: "/SwahiliFlag.jpg",
      },
      {
        id: 2,
        title: "Yoruba",
        imageSrc: "/YorubaFlag.png",
      },
      {
        id: 3,
        title: "Amharic",
        imageSrc: "/AmharicFlag.png",
      },
      {
        id: 4,
        title: "Igbo",
        imageSrc: "/IgboFlag.png",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Swahili
        title: "Unit 1",
        description: "Learn the basics of Swahili",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 2,
        title: "Verbs",
      }
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
      {
        id: 4,
        lessonId: 1, // Nouns
        type: "ORDER",
        order: 4,
        question: 'Arrange the letters to form the word "robot"',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/man.svg",
        correct: true,
        text: "Mwanaume",
        audioSrc: "/sw_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "Mke",
        audioSrc: "/sw_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "Roboti",
        audioSrc: "/sw_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // "the man"?
        correct: true,
        text: "Mwanaume",
        audioSrc: "/sw_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Mke",
        audioSrc: "/sw_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Roboti",
        audioSrc: "/sw_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "Mwanaume",
        audioSrc: "/sw_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: false,
        text: "Mke",
        audioSrc: "/sw_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "Roboti",
        audioSrc: "/sw_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4, // Arrange the letters to form the word "robot"
        text: "R",
        correct: true,
      },
      {
        challengeId: 4,
        text: "O",
        correct: true,
      },
      {
        challengeId: 4,
        text: "B",
        correct: true,
      },
      {
        challengeId: 4,
        text: "O",
        correct: true,
      },
      {
        challengeId: 4,
        text: "T",
        correct: true,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
