# Salsabeel Library

Portfolio ชั้นหนังสือสามมิติ โปรเจกต์นี้แยกจากพอร์ตเดิมโดยสมบูรณ์ ใช้ HTML, CSS และ JavaScript ไม่ต้องติดตั้งแพ็กเกจ

## พรีวิวในเครื่อง

เปิด `dist/index.html` ในเบราว์เซอร์ หรือใช้:

```sh
python3 -m http.server 4173 --directory dist
```

จากนั้นเปิด http://localhost:4173

## Repository และสถานะเว็บ

โค้ดถูกอัปโหลดแล้วที่ https://github.com/thatshouldbeme/salsabeel-library เป็น **Private** แยกจากพอร์ตเดิม

โฟลเดอร์ในเครื่องเชื่อมกับสาขา `main` ของ repository นี้แล้ว หลังแก้ไขไฟล์ให้อัปเดตด้วย:

```sh
cd "/Users/salsabeelderemah/Desktop/salsabeel-library"
git add .
git commit -m "Update portfolio"
git push
```

## GitHub Pages

ตรวจเมื่อ 31 ตุลาคม 2026: หน้าตั้งค่า GitHub แจ้งว่าต้องอัปเกรดแพ็กเกจหรือเปลี่ยน repository เป็น Public จึงจะเปิด Pages ได้ ขณะนี้คง repository เป็น Private ตามที่เจ้าของเลือก จึงยังไม่มีเว็บที่เผยแพร่จาก GitHub Pages

เก็บ workflow ไว้สำหรับสั่งเผยแพร่เอง (`workflow_dispatch`) โดยไม่รันอัตโนมัติทุกครั้งที่ push เพื่อไม่ให้เกิดงานเผยแพร่ที่ล้มเหลวซ้ำ เมื่อบัญชีรองรับแล้ว ไปที่ Settings → Pages เลือก GitHub Actions และสั่ง Actions → Publish Salsabeel Library → Run workflow

เว็บต้นแบบเดิมยังอยู่ที่ https://little-library-portfolio-1031.satiny-knoll-9335.chatgpt.site/ การ push ไป GitHub จะไม่เปลี่ยนเว็บ Sites เดิมโดยอัตโนมัติ

## ไฟล์หลัก

- `dist/index.html` — หน้าแรก โปรไฟล์ ช่องทางติดต่อและชั้นหนังสือ
- `dist/style.css` — รูปแบบและการแสดงผลบนมือถือ
- `dist/app.js` — หยิบหนังสือ กางปก พลิกหน้าและภาพขยาย
- `dist/content.js` — หนังสือ 8 เล่มและเนื้อหา
- `dist/icons.js` — SVG จาก Lucide แบบเส้นบาง 1.25 px
- `dist/assets/` — ภาพ เอกสาร และใบอนุญาตไอคอน Lucide
- `.github/workflows/pages.yml` — เผยแพร่ GitHub Pages จากโฟลเดอร์ dist

Lucide: https://lucide.dev — ใบอนุญาต ISC อยู่ใน `dist/assets/lucide-LICENSE.txt`
เอกสาร GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
