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
      username: 'PixelMaster_01',
      time: 123,
      photoId: photos[0].id,
      date: new Date('2024-10-01T10:00:00Z'),
    },
    {
      username: 'GamingGal_42',
      time: 181,
      photoId: photos[0].id,
      date: new Date('2024-10-02T11:00:00Z'),
    },
    {
      username: 'ShadowHunterX',
      time: 159,
      photoId: photos[0].id,
      date: new Date('2024-10-03T12:00:00Z'),
    },
    {
      username: 'NiteRaven_88',
      time: 165,
      photoId: photos[0].id,
      date: new Date('2024-10-04T13:00:00Z'),
    },
    {
      username: 'Speedster_7',
      time: 147,
      photoId: photos[0].id,
      date: new Date('2024-10-05T14:00:00Z'),
    },
    {
      username: 'CyberKnightX',
      time: 136,
      photoId: photos[1].id,
      date: new Date('2024-10-06T15:00:00Z'),
    },
    {
      username: 'VortexVoyager',
      time: 170,
      photoId: photos[1].id,
      date: new Date('2024-10-07T16:00:00Z'),
    },
    {
      username: 'LunarElite_11',
      time: 112,
      photoId: photos[1].id,
      date: new Date('2024-10-08T17:00:00Z'),
    },
    {
      username: 'ViperX_23',
      time: 186,
      photoId: photos[1].id,
      date: new Date('2024-10-09T18:00:00Z'),
    },
    {
      username: 'Ghost_9X',
      time: 193,
      photoId: photos[1].id,
      date: new Date('2024-10-10T19:00:00Z'),
    },
    {
      username: 'TurboTornadoX',
      time: 208,
      photoId: photos[2].id,
      date: new Date('2024-10-11T20:00:00Z'),
    },
    {
      username: 'ArcadeKing_77',
      time: 215,
      photoId: photos[2].id,
      date: new Date('2024-10-12T21:00:00Z'),
    },
    {
      username: 'MysticBlaze_21',
      time: 227,
      photoId: photos[2].id,
      date: new Date('2024-10-13T22:00:00Z'),
    },
    {
      username: 'DragonSoulX',
      time: 239,
      photoId: photos[2].id,
      date: new Date('2024-10-14T23:00:00Z'),
    },
    {
      username: 'StormRiderX',
      time: 241,
      photoId: photos[2].id,
      date: new Date('2024-10-15T00:00:00Z'),
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
