import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";

const GALLERY_DIR = "public/images/gallery";
const THUMB_DIR = "public/images/gallery/thumbs";
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 75;

if (!existsSync(THUMB_DIR)) {
  mkdirSync(THUMB_DIR, { recursive: true });
}

const files = readdirSync(GALLERY_DIR).filter((f) => {
  const ext = extname(f).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
});

console.log(`Found ${files.length} images, generating thumbnails...`);

for (const file of files) {
  const input = join(GALLERY_DIR, file);
  const output = join(THUMB_DIR, file);

  await sharp(input)
    .resize(THUMB_WIDTH, THUMB_WIDTH, { fit: "cover" })
    .jpeg({ quality: THUMB_QUALITY })
    .toFile(output);

  console.log(`  ✓ ${file}`);
}

console.log("Done!");
