import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultServicesSeed = [
  { slug: 'traditional-photography', name_en: 'Traditional Photography', name_ta: 'பாரம்பரிய புகைப்படம்', description_en: 'Capture every important moment with timeless, detailed photographs that beautifully preserve your special occasions and memories.', image_path: 'Camera', order_index: 0 },
  { slug: 'traditional-videography', name_en: 'Traditional Videography', name_ta: 'பாரம்பரிய வீடியோ', description_en: 'Relive your memorable moments through professionally recorded videos that capture the complete flow, emotions, and highlights of your event.', image_path: 'Video', order_index: 1 },
  { slug: 'candid-photography', name_en: 'Candid Photography', name_ta: 'இயல்பான புகைப்படங்கள்', description_en: 'Natural emotions, genuine smiles, and unexpected moments—our candid photography captures your special memories as they truly happen.', image_path: 'Heart', order_index: 2 },
  { slug: 'candid-videography', name_en: 'Candid Videography', name_ta: 'இயல்பான வீடியோ', description_en: 'Experience your special moments all over again with cinematic candid videos that focus on real emotions, natural interactions, and unforgettable memories.', image_path: 'Film', order_index: 3 },
  { slug: 'drone-videography', name_en: 'Drone Videography', name_ta: 'ட்ரோன் வீடியோ', description_en: 'Get a stunning aerial perspective of your event, location, and celebrations with professional drone videography that adds a cinematic touch to your memories.', image_path: 'Plane', order_index: 4 },
  { slug: 'street-photography', name_en: 'Street Photography', name_ta: 'தெரு புகைப்படம்', description_en: 'Explore everyday life through authentic frames. Our street photography captures people, places, culture, emotions, and spontaneous moments.', image_path: 'MapPin', order_index: 5 },
  { slug: 'festival-photography', name_en: 'Festival Photography', name_ta: 'திருவிழா புகைப்படம்', description_en: 'Capture the colours, traditions, celebrations, emotions, and vibrant atmosphere of festivals with beautifully detailed photography.', image_path: 'Sparkles', order_index: 6 },
  { slug: 'travel-photography', name_en: 'Travel Photography', name_ta: 'பயண புகைப்படம்', description_en: 'Turn your journeys into lasting visual stories. We capture landscapes, people, culture, destinations, and memorable experiences throughout your travels.', image_path: 'Compass', order_index: 7 },
];

async function main() {
  console.log('Cleaning up existing services...');
  await prisma.service.deleteMany({});
  
  console.log('Seeding original services into the database...');
  for (const srv of defaultServicesSeed) {
    await prisma.service.create({
      data: {
        ...srv,
        is_active: true
      }
    });
  }
  
  console.log('Successfully seeded all 8 original services!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
