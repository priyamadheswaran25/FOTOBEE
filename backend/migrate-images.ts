import { prisma } from './src/db';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(__dirname, 'uploads');

async function migrate() {
  console.log("Starting migration...");
  
  // Ensure directories exist
  ['stories', 'services', 'portfolio'].forEach(folder => {
    const dir = path.join(uploadsDir, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const replacePath = async (url: string, module: string) => {
    if (!url || !url.includes('/uploads/')) return url;
    if (url.includes(`/uploads/${module}/`)) return url; // Already migrated

    const parts = url.split('/uploads/');
    const filename = parts[1];
    const pureFilename = filename.split('?')[0];

    const oldFilePath = path.join(uploadsDir, pureFilename);
    const newFilePath = path.join(uploadsDir, module, pureFilename);

    if (fs.existsSync(oldFilePath)) {
      try {
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`Moved ${pureFilename} to ${module}/`);
      } catch (err) {
        console.error(`Failed to move ${pureFilename}:`, err);
      }
    } else {
      console.log(`File not found physically on disk, but updating DB anyway: ${oldFilePath}`);
    }

    return parts[0] + `/uploads/${module}/` + filename;
  };

  // Stories
  const stories = await prisma.story.findMany();
  for (const s of stories) {
    const newPath = await replacePath(s.hero_image_path, 'stories');
    if (newPath !== s.hero_image_path) {
      await prisma.story.update({ where: { id: s.id }, data: { hero_image_path: newPath } });
      console.log(`Updated Story ${s.id} in DB.`);
    }
  }

  // StorySectionImage
  const sectionImages = await prisma.storySectionImage.findMany();
  for (const img of sectionImages) {
    const newPath = await replacePath(img.image_path, 'stories');
    if (newPath !== img.image_path) {
      await prisma.storySectionImage.update({ where: { id: img.id }, data: { image_path: newPath } });
      console.log(`Updated StorySectionImage ${img.id} in DB.`);
    }
  }

  // Services
  const services = await prisma.service.findMany();
  for (const s of services) {
    const newPath = await replacePath(s.image_path, 'services');
    if (newPath !== s.image_path) {
      await prisma.service.update({ where: { id: s.id }, data: { image_path: newPath } });
      console.log(`Updated Service ${s.id} in DB.`);
    }
  }

  // Portfolio
  const portfolios = await prisma.portfolio.findMany();
  for (const p of portfolios) {
    const newPath = await replacePath(p.image_path, 'portfolio');
    if (newPath !== p.image_path) {
      await prisma.portfolio.update({ where: { id: p.id }, data: { image_path: newPath } });
      console.log(`Updated Portfolio ${p.id} in DB.`);
    }
  }

  console.log("Migration complete.");
}

migrate().catch(console.error).finally(() => prisma.$disconnect());
