import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.score.deleteMany({});
  await prisma.character.deleteMany({});
  await prisma.photo.deleteMany({});

  const photoData = [
    {
      image: '/images/illustrations/space.jpg',
      name: 'Space',
      slug: 'space',
    },
    {
      image: '/images/illustrations/town.jpg',
      name: 'Town',
      slug: 'town',
    },
    {
      image: '/images/illustrations/gamer-hub.jpg',
      name: 'Gamer Hub',
      slug: 'gamer-hub',
    },
  ];

  await prisma.photo.createMany({
    data: photoData,
    skipDuplicates: true,
  });
  console.log(`Photos created!`);

  const photos = await prisma.photo.findMany();

  const characterData = [
    {
      name: 'Little Waldo',
      image: '/images/characters/space/little-waldo.png',
      positionX: 0.29,
      positionY: 0.71,
      photoId: photos[0].id,
    },
    {
      name: 'Other Waldo',
      image: '/images/characters/space/other-waldo.png',
      positionX: 0.01,
      positionY: 0.88,
      photoId: photos[0].id,
    },
    {
      name: 'Wizard',
      image: '/images/characters/space/wizard.png',
      positionX: 0.405,
      positionY: 0.58,
      photoId: photos[0].id,
    },
    {
      name: 'Panda',
      image: '/images/characters/town/panda.png',
      positionX: 0.4,
      positionY: 0.35,
      photoId: photos[1].id,
    },
    {
      name: 'Porcupine',
      image: '/images/characters/town/porcupine.png',
      positionX: 0.04,
      positionY: 0.77,
      photoId: photos[1].id,
    },
    {
      name: 'Waldo',
      image: '/images/characters/town/waldo.png',
      positionX: 0.46,
      positionY: 0.92,
      photoId: photos[1].id,
    },
    {
      name: 'Finn',
      image: '/images/characters/gamer-hub/finn.png',
      positionX: 0.035,
      positionY: 0.49,
      photoId: photos[2].id,
    },
    {
      name: 'R2-D2',
      image: '/images/characters/gamer-hub/R2-D2.png',
      positionX: 0.8,
      positionY: 0.77,
      photoId: photos[2].id,
    },
    {
      name: 'Sonic',
      image: '/images/characters/gamer-hub/sonic.png',
      positionX: 0.77,
      positionY: 0.66,
      photoId: photos[2].id,
    },
  ];

  await prisma.character.createMany({
    data: characterData,
    skipDuplicates: true,
  });

  console.log(`Characters created!`);

  const scoreData = [
    {
      username: 'Test Player 1',
      time: 120,
      photoId: photos[0].id,
    },
    {
      username: 'Test Player 2',
      time: 180,
      photoId: photos[0].id,
    },
  ];

  await prisma.score.createMany({
    data: scoreData,
    skipDuplicates: true,
  });

  console.log(`Scores created!`);

  const scores = await prisma.score.findMany();
  const characters = await prisma.character.findMany();

  console.log(`Created ${photos.length} photos`);
  console.log(`Created ${characters.length} characters`);
  console.log(`Created ${scores.length} scores`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
