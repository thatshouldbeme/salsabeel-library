# Salsabeel Library

Portfolio ชั้นหนังสือสามมิติ โปรเจกต์นี้แยกจากพอร์ตเดิมโดยสมบูรณ์ ใช้ HTML, CSS และ JavaScript ไม่ต้องติดตั้งแพ็กเกจ

## พรีวิวในเครื่อง

เปิด `dist/index.html` ในเบราว์เซอร์ หรือใช้:

```sh
python3 -m http.server 4173 --directory dist
```

จากนั้นเปิด http://localhost:4173

## การใช้งาน

- กด Explore Projects เพื่อไปยังหนังสือผลงานเด่น บนมือถือปัดในช่องผลงานเด่นเพื่อดูครบทั้ง 4 เล่ม
- กดหนังสือเพื่อเปิด คลิกหน้าขวาเพื่อไปต่อ หรือหน้าซ้ายเพื่อย้อนกลับ และใช้ปุ่ม Previous / Next ได้
- ใช้ปุ่มลูกศรซ้าย–ขวาเพื่อเปลี่ยนหน้า, Home / End เพื่อไปต้น–ท้ายเล่ม และ Esc เพื่อปิด
- เนื้อหาที่ยาวเลื่อนอ่านได้ โดยเลขหน้ายังคงอยู่ด้านล่าง กด Tab เพื่อโฟกัสพื้นที่อ่านแล้วใช้ลูกศรขึ้น–ลงเพื่อเลื่อน
- หน้าจอไม่เกิน 760 px แสดงครั้งละหนึ่งหน้า การตั้งค่า prefers-reduced-motion จะปิดแอนิเมชันสามมิติและประกายโดยอัตโนมัติ
- ฟอนต์ภาษาไทยและอังกฤษ รวมถึงเนื้อหาและภาพผลงาน คงไว้ตามเดิม

## Repository และสถานะเว็บ

โค้ดอยู่ที่ https://github.com/thatshouldbeme/salsabeel-library เป็น **Public** แยกจากพอร์ตเดิม

โฟลเดอร์ในเครื่องเชื่อมกับสาขา `main` ของ repository นี้แล้ว หลังแก้ไขไฟล์ให้อัปเดตด้วย:

```sh
cd "/Users/salsabeelderemah/Desktop/salsabeel-library"
git add .
git commit -m "Update portfolio"
git push
```

## GitHub Pages

เว็บเผยแพร่ผ่าน GitHub Pages โดย workflow `Publish Salsabeel Library` จะอัปเดตอัตโนมัติเมื่อ push การเปลี่ยนแปลงใน `dist/` หรือไฟล์ workflow ขึ้นสาขา `main` และยังสั่ง `Run workflow` ได้ตามเดิม

เมื่อเผยแพร่ workflow จะเติมเวอร์ชัน commit ให้ URL ของไฟล์ CSS และ JavaScript ในหน้าเว็บที่เผยแพร่ เพื่อให้โหลดไฟล์ตรงกับเวอร์ชันใหม่แทนไฟล์เก่าที่อาจอยู่ใน cache โดยไม่แก้ไฟล์ต้นฉบับในเครื่อง

ใน GitHub Desktop หลังแก้ไขเว็บ ให้กรอกข้อความสรุป → `Commit to main` → `Push origin` แล้วรอการเผยแพร่สำเร็จในแท็บ Actions โดยไม่ต้องสั่งเผยแพร่เองทุกครั้ง ส่วน `Fetch origin` ใช้ตรวจข้อมูลจาก GitHub และ `Pull origin` ใช้ดึงงานจาก GitHub ลงเครื่อง จึงไม่ส่งงานที่แก้ในเครื่องขึ้นเว็บ

หากตั้งค่าโฮสต์ใหม่ ให้ไปที่ Settings → Pages แล้วเลือก GitHub Actions เป็นแหล่งเผยแพร่

เว็บต้นแบบเดิมยังอยู่ที่ https://little-library-portfolio-1031.satiny-knoll-9335.chatgpt.site/ การ push ไป GitHub จะไม่เปลี่ยนเว็บ Sites เดิมโดยอัตโนมัติ

## ไฟล์หลัก

- `dist/index.html` — หน้าแรก โปรไฟล์ ช่องทางติดต่อและชั้นหนังสือ
- `dist/style.css` — รูปแบบเดิมและระบบตัวอักษร
- `dist/refinements.css` — ปรับรายละเอียดชั้นหนังสือ พื้นที่อ่าน ปุ่มควบคุม และหน้าจอมือถือ
- `dist/app.js` — หยิบหนังสือ กางปก พลิกหน้าและภาพขยาย
- `dist/content.js` — หนังสือ 8 เล่มและเนื้อหา
- `dist/i18n.js` — ตัวสลับไทย–อังกฤษและข้อความส่วนติดต่อ จำภาษาที่เลือกในเครื่อง
- `dist/translations.js` — คำแปลหัวข้อและเนื้อหาหนังสือ โดยคงชื่อโปรเจกต์และศัพท์เทคนิค
- `dist/icons.js` — SVG จาก Lucide แบบเส้นบาง 1.25 px
- `dist/assets/` — ภาพ เอกสาร และใบอนุญาตไอคอน Lucide
- `.github/workflows/pages.yml` — เผยแพร่ GitHub Pages จากโฟลเดอร์ dist

Lucide: https://lucide.dev — ใบอนุญาต ISC อยู่ใน `dist/assets/lucide-LICENSE.txt`
เอกสาร GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
