import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { siteConfig } from '../../../FOOTBEE-PHOTOGRAPHY-FRONTEND/src/data/siteConfig';
import { packages } from '../../../FOOTBEE-PHOTOGRAPHY-FRONTEND/src/data/packages';
import { services } from '../../../FOOTBEE-PHOTOGRAPHY-FRONTEND/src/data/services';
import { stories, testimonials, galleryPhotos } from '../../../FOOTBEE-PHOTOGRAPHY-FRONTEND/src/data/stories';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  // 1. SiteConfig & SiteStat
  console.log('Seeding SiteConfig...');
  await prisma.siteConfig.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      email: siteConfig.email,
      phone: siteConfig.phone,
      whatsapp_number: siteConfig.whatsapp.number,
      whatsapp_message_en: siteConfig.whatsapp.prefilledMessage,
      address_en: siteConfig.address,
      address_ta: null,
      instagram_url: siteConfig.socials.instagram,
      facebook_url: siteConfig.socials.facebook,
      youtube_url: siteConfig.socials.youtube,
    },
  });

  for (let i = 0; i < siteConfig.stats.length; i++) {
    const stat = siteConfig.stats[i]!;
    await prisma.siteStat.create({
      data: {
        value: stat.value,
        label_en: stat.label,
        label_ta: null,
        suffix: stat.suffix,
        order_index: i,
      },
    });
  }

  // 2. Services
  console.log('Seeding Services...');
  for (let i = 0; i < services.length; i++) {
    const s = services[i]!;
    await prisma.service.upsert({
      where: { slug: s.id },
      update: {},
      create: {
        slug: s.id,
        name_en: s.name,
        name_ta: null,
        description_en: s.description,
        description_ta: null,
        image_path: s.image,
        order_index: i,
      },
    });
  }

  // 3. Packages & Features
  console.log('Seeding Packages...');
  for (let i = 0; i < packages.length; i++) {
    const p = packages[i]!;
    const pkg = await prisma.package.upsert({
      where: { slug: p.id },
      update: {},
      create: {
        slug: p.id,
        name_en: p.name,
        name_ta: null,
        subtitle_en: p.subtitle,
        subtitle_ta: null,
        description_en: p.description,
        description_ta: null,
        is_popular: p.isPopular || false,
        order_index: i,
      },
    });

    for (let j = 0; j < p.features.length; j++) {
      await prisma.packageFeature.create({
        data: {
          package_id: pkg.id,
          feature_en: p.features[j]!,
          feature_ta: null,
          order_index: j,
        },
      });
    }
  }

  // 4. Categories
  console.log('Seeding Categories...');
  const categoryNames = new Set([
    ...stories.map((s: any) => s.category),
    ...galleryPhotos.map((g: any) => g.category),
  ]);

  const categoriesMap = new Map<string, string>();
  for (const cName of categoryNames) {
    const slug = cName.toLowerCase().replace(/\s+/g, '-');
    const port = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name_en: cName,
        name_ta: null,
      },
    });
    categoriesMap.set(cName, port.id);
  }

  // 5. Testimonials
  console.log('Seeding Testimonials...');
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        client_name_en: t.name,
        client_name_ta: null,
        event_type_en: t.eventType,
        event_type_ta: null,
        location_en: t.location,
        location_ta: null,
        review_en: t.review,
        review_ta: null,
        rating: t.rating,
        avatar_path: t.avatar,
      },
    });
  }

  // 6. Portfolio (Gallery Photos)
  console.log('Seeding Portfolio...');
  for (let i = 0; i < galleryPhotos.length; i++) {
    const g = galleryPhotos[i]!;
    await prisma.portfolio.create({
      data: {
        category_id: categoriesMap.get(g.category)!,
        image_path: g.src,
        caption_en: g.caption,
        caption_ta: null,
        order_index: i,
      },
    });
  }

  // 7. Stories & Sections & Images
  console.log('Seeding Stories...');
  const storyIdMap = new Map<string, string>();

  for (const s of stories) {
    const parsedDate = new Date(s.date); // e.g. "14 February 2026"
    
    const story = await prisma.story.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        category_id: categoriesMap.get(s.category)!,
        name_en: s.name,
        name_ta: null,
        title_en: s.title,
        title_ta: null,
        subtitle_en: s.subtitle,
        subtitle_ta: null,
        location_en: s.location,
        location_ta: null,
        event_date: parsedDate,
        hero_image_path: s.heroImage,
        quote_en: s.quote,
        quote_ta: null,
      },
    });
    storyIdMap.set(s.slug, story.id);

    // Sections
    for (let i = 0; i < s.sections.length; i++) {
      const sec = s.sections[i]!;
      let layoutType: any = "FULL_WIDTH";
      if (sec.type === "side-by-side") layoutType = "SIDE_BY_SIDE";
      else if (sec.type === "landscape-text") layoutType = "LANDSCAPE_TEXT";

      const sectionRecord = await prisma.storySection.create({
        data: {
          story_id: story.id,
          title_en: sec.title,
          title_ta: null,
          description_en: sec.description || null,
          description_ta: null,
          layout_type: layoutType,
          order_index: i,
        },
      });

      // Images inside section
      for (let j = 0; j < sec.images.length; j++) {
        await prisma.storySectionImage.create({
          data: {
            section_id: sectionRecord.id,
            image_path: sec.images[j]!,
            caption_en: sec.captions ? sec.captions[j] : null,
            caption_ta: null,
            order_index: j,
          },
        });
      }
    }
  }

  // 8. Story Related (Junction Table)
  console.log('Seeding StoryRelated relationships...');
  for (const s of stories) {
    const sourceId = storyIdMap.get(s.slug)!;
    for (const relatedSlug of s.relatedSlugs) {
      const targetId = storyIdMap.get(relatedSlug);
      if (targetId) {
        // Need to catch errors if dupes exist (Prisma upsert on compound key can be tricky, so try/catch or find first)
        const exists = await prisma.storyRelated.findUnique({
          where: {
            story_id_related_story_id: {
              story_id: sourceId,
              related_story_id: targetId
            }
          }
        });
        
        if (!exists) {
          await prisma.storyRelated.create({
            data: {
              story_id: sourceId,
              related_story_id: targetId,
            }
          });
        }
      }
    }
  }

  // 9. Admin User
  console.log('Seeding Admin User...');
  const bcrypt = await import('bcryptjs');
  const passwordHash = await bcrypt.default.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@fotobee.com' },
    update: { password: passwordHash, is_active: true },
    create: { email: 'admin@fotobee.com', password: passwordHash, is_active: true }
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
