import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const GALLERY_DIR = "public/images/gallery";
const THUMB_DIR = "public/images/gallery/thumbs";
const WEB_DIR = "public/images/gallery/web";
const IMAGES_DIR = "public/images";

const THUMB_WIDTH = 400;
const THUMB_QUALITY = 75;
const WEB_MAX = 2000;
const WEB_QUALITY = 90;

const galleryFiles = readdirSync(GALLERY_DIR).filter((f) => {
  const ext = extname(f).toLowerCase();
  return [".jpg", ".jpeg", ".png"].includes(ext);
});

if (galleryFiles.length === 0) {
  console.log("⏭️  No source images found, skipping thumbnail generation.");
  process.exit(0);
}

// ── 갤러리 썸네일 (webp) ──
if (!existsSync(THUMB_DIR)) mkdirSync(THUMB_DIR, { recursive: true });
console.log(`\n📸 Gallery thumbnails (${galleryFiles.length} images)...`);
for (const file of galleryFiles) {
  const webpName = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  await sharp(join(GALLERY_DIR, file))
    .resize(THUMB_WIDTH, THUMB_WIDTH, { fit: "cover" })
    .webp({ quality: THUMB_QUALITY })
    .toFile(join(THUMB_DIR, webpName));
  console.log(`  thumb ✓ ${webpName}`);
}

// ── 갤러리 웹용 (webp) ──
if (!existsSync(WEB_DIR)) mkdirSync(WEB_DIR, { recursive: true });
console.log(`\n🖼️  Gallery web-optimized...`);
for (const file of galleryFiles) {
  const webpName = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  await sharp(join(GALLERY_DIR, file))
    .resize(WEB_MAX, WEB_MAX, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEB_QUALITY })
    .toFile(join(WEB_DIR, webpName));
  console.log(`  web  ✓ ${webpName}`);
}

// ── baby 사진 (webp) ──
const babyFiles = readdirSync(IMAGES_DIR).filter((f) => /\-baby\.(jpg|jpeg|png)$/i.test(f));
if (babyFiles.length > 0) {
  console.log(`\n👶 Baby photos...`);
  for (const file of babyFiles) {
    const webpName = basename(file, extname(file)) + ".webp";
    await sharp(join(IMAGES_DIR, file))
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(join(IMAGES_DIR, webpName));
    console.log(`  baby ✓ ${webpName}`);
  }
}

// ── OG 이미지 (webp) ──
const ogFiles = readdirSync(IMAGES_DIR).filter((f) => /\-og\.(jpg|jpeg|png)$/i.test(f));
if (ogFiles.length > 0) {
  console.log(`\n🔗 OG image...`);
  for (const file of ogFiles) {
    const webpName = basename(file, extname(file)) + ".webp";
    await sharp(join(IMAGES_DIR, file))
      .resize(1200, 630, { fit: "cover" })
      .webp({ quality: 85 })
      .toFile(join(IMAGES_DIR, webpName));
    console.log(`  og   ✓ ${webpName}`);
  }
}

console.log("\n✅ Done!");
