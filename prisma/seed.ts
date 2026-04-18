import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const pw = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@eslbyrayane.com" }, update: {},
    create: { email: "admin@eslbyrayane.com", name: "Rayane", hashedPassword: pw, role: "admin" },
  });
  console.log("Admin OK: admin@eslbyrayane.com / Admin123!");

  await prisma.course.upsert({
    where: { slug: "english-a1" }, update: {},
    create: { title: "English beginner A1", description: "Learn the basics of English.", slug: "english-a1", level: "A1", published: true, authorId: admin.id,
      sections: { create: [
        { title: "Introducing yourself", position: 0, lessons: { create: [
          { title: "Hello, my name is...", type: "TEXT", position: 0, blocks: { create: [
            { position: 0, type: "text", content: "<h2>Introducing yourself in English</h2><p>When you meet someone, you say:</p><ul><li><strong>Hello!</strong></li><li><strong>My name is...</strong></li><li><strong>How are you?</strong></li></ul><p>Try the exercise below!</p>" },
          ]}},
        ]}},
        { title: "Articles", position: 1, lessons: { create: [
          { title: "A, an, the", type: "TEXT", position: 0 },
        ]}},
      ]},
    },
  });
  console.log("Course A1 OK");

  await prisma.course.upsert({
    where: { slug: "english-b1" }, update: {},
    create: { title: "English intermediate B1", description: "Improve your English.", slug: "english-b1", level: "B1", published: true, authorId: admin.id, requiresEnrollment: true, enrollmentCode: "ESL2024" },
  });
  console.log("Course B1 OK (code: ESL2024)");

  const configs = [
    { title: "MCQ - Articles", type: "QCM", level: "A1", config: { questions: [{ question: "Which article before 'apple'?", options: ["a","an","the","no article"], correctIndex: 1, explanation: "'An' is used before vowel sounds." }, { question: "___ flowers are beautiful.", options: ["A","An","The","No article"], correctIndex: 2 }] } },
    { title: "Memory - Colors", type: "MEMORY", level: "A1", config: { pairs: [{ front:"Red", back:"🔴" },{ front:"Blue", back:"🔵" },{ front:"Green", back:"🟢" },{ front:"Yellow", back:"🟡" }] } },
    { title: "Hangman - Animals", type: "HANGMAN", level: "A1", config: { words: [{ word:"CAT", hint:"It meows" },{ word:"DOG", hint:"It barks" },{ word:"BIRD", hint:"It flies" }] } },
    { title: "True/False - UK", type: "TRUE_FALSE", level: "A2", config: { questions: [{ statement:"London is the capital of the UK.", isTrue:true },{ statement:"The UK has 50 states.", isTrue:false, explanation:"The UK has 4 nations: England, Scotland, Wales, Northern Ireland." }] } },
    { title: "Matching - Verb 'to be'", type: "MATCHING", level: "A1", config: { pairs: [{ left:"I", right:"am" },{ left:"You", right:"are" },{ left:"We", right:"are" }] } },
    { title: "Fill in the blanks - Introducing yourself", type: "FILL_BLANKS", level: "A1", config: { text: "I {{am}} English. I {{am}} 25 years old." } },
    { title: "Drag and drop - Seasons", type: "DRAG_DROP", level: "A1", config: { pairs: [{ item:"Snow", target:"Winter" },{ item:"Sun", target:"Summer" },{ item:"Leaves", target:"Autumn" },{ item:"Flowers", target:"Spring" }] } },
    { title: "Sorting - Days", type: "SORTING", level: "A1", config: { items:["Monday","Tuesday","Wednesday","Thursday","Friday"], correctOrder:["Monday","Tuesday","Wednesday","Thursday","Friday"], instruction:"Put in order" } },
    { title: "Categorization - Countable/Uncountable", type: "CATEGORIZE", level: "A1", config: { categories:["Countable","Uncountable"], items:[{ text:"Book", category:"Countable" },{ text:"Water", category:"Uncountable" },{ text:"Cat", category:"Countable" },{ text:"Music", category:"Uncountable" }] } },
  ];

  for (const c of configs) {
    await prisma.activity.create({ data: { title: c.title, type: c.type, level: c.level, isPublic: true, createdById: admin.id, config: JSON.stringify(c.config) } });
  }
  console.log("9 activities OK");
  console.log("\nSign in: admin@eslbyrayane.com / Admin123!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
