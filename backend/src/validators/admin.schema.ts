import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const categorySchema = z.object({
  slug: z.string().min(1),
  name_en: z.string().min(1),
  name_ta: z.string().nullable().optional(),
  description_en: z.string().nullable().optional(),
  description_ta: z.string().nullable().optional(),
  order_index: z.number().int().optional().default(0),
  image_url: z.string().nullable().optional(),
});

export const serviceSchema = z.object({
  slug: z.string().min(1),
  name_en: z.string().min(1),
  name_ta: z.string().nullable().optional(),
  description_en: z.string().min(1),
  description_ta: z.string().nullable().optional(),
  image_path: z.string().min(1),
  is_active: z.boolean().optional(),
  order_index: z.number().int(),
});

export const packageFeatureSchema = z.object({
  feature_en: z.string().min(1),
  feature_ta: z.string().nullable().optional(),
  order_index: z.number().int(),
});

export const packageSchema = z.object({
  slug: z.string().min(1),
  name_en: z.string().min(1),
  name_ta: z.string().nullable().optional(),
  subtitle_en: z.string().min(1),
  subtitle_ta: z.string().nullable().optional(),
  description_en: z.string().min(1),
  description_ta: z.string().nullable().optional(),
  is_popular: z.boolean().optional(),
  is_active: z.boolean().optional(),
  order_index: z.number().int(),
  features: z.array(packageFeatureSchema).optional(),
});

export const storySectionImageSchema = z.object({
  image_path: z.string().min(1),
  caption_en: z.string().nullable().optional(),
  caption_ta: z.string().nullable().optional(),
  order_index: z.number().int(),
});

export const storySectionSchema = z.object({
  title_en: z.string().min(1),
  title_ta: z.string().nullable().optional(),
  description_en: z.string().nullable().optional(),
  description_ta: z.string().nullable().optional(),
  layout_type: z.enum(['full-width', 'side-by-side', 'landscape-text']),
  order_index: z.number().int(),
  images: z.array(storySectionImageSchema).optional(),
});

export const storySchema = z.object({
  slug: z.string().min(1),
  category_id: z.string().uuid(),
  name_en: z.string().min(1),
  name_ta: z.string().nullable().optional(),
  title_en: z.string().min(1),
  title_ta: z.string().nullable().optional(),
  subtitle_en: z.string().min(1),
  subtitle_ta: z.string().nullable().optional(),
  location_en: z.string().min(1),
  location_ta: z.string().nullable().optional(),
  event_date: z.string().transform((str) => new Date(str)),
  hero_image_path: z.string().min(1),
  quote_en: z.string().min(1),
  quote_ta: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
  sections: z.array(storySectionSchema).optional(),
  related_story_ids: z.array(z.string().uuid()).optional(),
});

export const testimonialSchema = z.object({
  client_name_en: z.string().min(1),
  client_name_ta: z.string().nullable().optional(),
  event_type_en: z.string().min(1),
  event_type_ta: z.string().nullable().optional(),
  location_en: z.string().min(1),
  location_ta: z.string().nullable().optional(),
  review_en: z.string().min(1),
  review_ta: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5),
  avatar_path: z.string().min(1),
  is_active: z.boolean().optional(),
});

export const portfolioSchema = z.object({
  category_id: z.string().uuid(),
  image_path: z.string().min(1),
  caption_en: z.string().nullable().optional(),
  caption_ta: z.string().nullable().optional(),
  order_index: z.number().int(),
  is_active: z.boolean().optional(),
});

export const inquiryStatusUpdateSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Closed']),
});

export const siteConfigSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1),
  whatsapp_number: z.string().min(1),
  whatsapp_message_en: z.string().min(1),
  address_en: z.string().min(1),
  address_ta: z.string().nullable().optional(),
  instagram_url: z.string().nullable().optional(),
  facebook_url: z.string().nullable().optional(),
  youtube_url: z.string().nullable().optional(),
});

export const siteStatSchema = z.object({
  value: z.number().int(),
  label_en: z.string().min(1),
  label_ta: z.string().nullable().optional(),
  suffix: z.string().nullable().optional(),
  order_index: z.number().int(),
});
