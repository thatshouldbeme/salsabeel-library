# Salsabeel Library

Portfolio ชั้นหนังสือสามมิติ โปรเจกต์นี้แยกจากพอร์ตเดิมโดยสมบูรณ์ ใช้ HTML, CSS และ JavaScript ไม่ต้องติดตั้งแพ็กเกจ

## พรีวิวในเครื่อง

เปิด `dist/index.html` ในเบราว์เซอร์ หรือใช้:

```sh
python3 -m http.server 4173 --directory dist
```

จากนั้นเปิด http://localhost:4173

## อัปโหลดเป็น repository ใหม่

สร้าง repository ว่างชื่อ `salsabeel-library` ในบัญชี `thatshouldbeme` โดยไม่เพิ่ม README, .gitignore หรือ license จาก GitHub เพราะโฟลเดอร์นี้เตรียมไฟล์และ commit ไว้แล้ว

โฟลเดอร์นี้ตั้ง remote ของ repository ใหม่ไว้แล้ว:

```sh
cd "/Users/salsabeelderemah/Desktop/salsabeel-library"
git push -u origin main
```

## เปิดเว็บไซต์ GitHub Pages

ใน repository ใหม่ ไปที่ Settings → Pages → Build and deployment → Source เลือก GitHub Actions แล้วเปิด Actions → Publish Salsabeel Library → Run workflow

เมื่อเผยแพร่สำเร็จ URL ที่คาดไว้คือ https://thatshouldbeme.github.io/salsabeel-library/ — URL นี้ยังไม่ใช่หลักฐานว่ามีการเผยแพร่แล้ว

หลังจากนั้นเมื่อแก้ไขไฟล์:

```sh
git add .
git commit -m "Update portfolio"
git push
```

Workflow จะเผยแพร่เฉพาะเนื้อหาใน `dist` พอร์ตเดิมและเว็บไซต์ Sites เดิมไม่ได้เชื่อมกับ Git ของโฟลเดอร์นี้

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
