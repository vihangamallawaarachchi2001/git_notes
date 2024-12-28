import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

//sample query for my reference
// async function sample() {
//     const allPosts = await prisma.post.findMany();
//     console.log(allPosts);
// }

// sample();


// async function sampleCreate() {
// await prisma.post.create({
// data: {
// the data goes here as object manner
//}
//})
// }

// sample();