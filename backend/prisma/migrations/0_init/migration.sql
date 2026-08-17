-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LayoutType" AS ENUM ('full-width', 'side-by-side', 'landscape-text');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('New', 'Contacted', 'Closed');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ta" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ta" TEXT,
    "description_en" TEXT NOT NULL,
    "description_ta" TEXT,
    "image_path" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ta" TEXT,
    "subtitle_en" TEXT NOT NULL,
    "subtitle_ta" TEXT,
    "description_en" TEXT NOT NULL,
    "description_ta" TEXT,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageFeature" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "feature_en" TEXT NOT NULL,
    "feature_ta" TEXT,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "PackageFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ta" TEXT,
    "title_en" TEXT NOT NULL,
    "title_ta" TEXT,
    "subtitle_en" TEXT NOT NULL,
    "subtitle_ta" TEXT,
    "location_en" TEXT NOT NULL,
    "location_ta" TEXT,
    "event_date" DATE NOT NULL,
    "hero_image_path" TEXT NOT NULL,
    "quote_en" TEXT NOT NULL,
    "quote_ta" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryRelated" (
    "story_id" TEXT NOT NULL,
    "related_story_id" TEXT NOT NULL,

    CONSTRAINT "StoryRelated_pkey" PRIMARY KEY ("story_id","related_story_id")
);

-- CreateTable
CREATE TABLE "StorySection" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ta" TEXT,
    "description_en" TEXT,
    "description_ta" TEXT,
    "layout_type" "LayoutType" NOT NULL,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "StorySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorySectionImage" (
    "id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "caption_en" TEXT,
    "caption_ta" TEXT,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "StorySectionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "client_name_en" TEXT NOT NULL,
    "client_name_ta" TEXT,
    "event_type_en" TEXT NOT NULL,
    "event_type_ta" TEXT,
    "location_en" TEXT NOT NULL,
    "location_ta" TEXT,
    "review_en" TEXT NOT NULL,
    "review_ta" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "avatar_path" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryPhoto" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "caption_en" TEXT,
    "caption_ta" TEXT,
    "order_index" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GalleryPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "event_date" DATE NOT NULL,
    "location" TEXT NOT NULL,
    "budget_range" TEXT,
    "message" TEXT,
    "package_id" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'New',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "whatsapp_message_en" TEXT NOT NULL,
    "address_en" TEXT NOT NULL,
    "address_ta" TEXT,
    "instagram_url" TEXT,
    "facebook_url" TEXT,
    "youtube_url" TEXT,

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteStat" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "label_en" TEXT NOT NULL,
    "label_ta" TEXT,
    "suffix" TEXT,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "SiteStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Story_slug_key" ON "Story"("slug");

-- AddForeignKey
ALTER TABLE "PackageFeature" ADD CONSTRAINT "PackageFeature_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryRelated" ADD CONSTRAINT "StoryRelated_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryRelated" ADD CONSTRAINT "StoryRelated_related_story_id_fkey" FOREIGN KEY ("related_story_id") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorySection" ADD CONSTRAINT "StorySection_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorySectionImage" ADD CONSTRAINT "StorySectionImage_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "StorySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryPhoto" ADD CONSTRAINT "GalleryPhoto_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

