const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");
const pptxgen = require("pptxgenjs");

const root = path.resolve(__dirname, "..");
const sourceHtml = path.join(root, "rebuild_html", "index.html");
const outDir = __dirname;
const imageDir = path.join(outDir, "rendered_slides");
const pptxPath = path.join(outDir, "sanko-kikan-html-trial-google-slides.pptx");

fs.mkdirSync(imageDir, { recursive: true });

async function renderSlides() {
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const launchOptions = fs.existsSync(chromePath)
    ? { headless: true, executablePath: chromePath }
    : { headless: true };
  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(sourceHtml).href, { waitUntil: "networkidle" });
  const slides = await page.locator(".slide").count();
  const imagePaths = [];

  for (let i = 0; i < slides; i += 1) {
    const imagePath = path.join(imageDir, `slide_${String(i + 1).padStart(2, "0")}.png`);
    await page.locator(".slide").nth(i).screenshot({ path: imagePath });
    imagePaths.push(imagePath);
  }

  await browser.close();
  return imagePaths;
}

async function buildPptx(imagePaths) {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Field X";
  pptx.subject = "HTML deck trial conversion";
  pptx.title = "三幸様 基幹管理システムご提案資料 HTML変換テスト";
  pptx.company = "Field X";
  pptx.lang = "ja-JP";
  pptx.defineLayout({ name: "HTML16x9", width: 13.333333, height: 7.5 });
  pptx.layout = "HTML16x9";

  imagePaths.forEach((imagePath) => {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({ path: imagePath, x: 0, y: 0, w: 13.333333, h: 7.5 });
  });

  await pptx.writeFile({ fileName: pptxPath });
  return pptxPath;
}

(async () => {
  const imagePaths = await renderSlides();
  const output = await buildPptx(imagePaths);
  console.log(JSON.stringify({ output, slideCount: imagePaths.length, imageDir }, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
