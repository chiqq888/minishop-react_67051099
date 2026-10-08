# MiniShop React · 67051099

MiniShop ตามใบงาน Week 6–8 ใช้ React, Vite และ Tailwind CSS ธีมขาว เทา ดำ ฟอนต์ IBM Plex Sans Thai Looped ขนาดพื้นฐาน 16px มุมโค้งหลัก 15px ฟอนต์ติดตั้งในโปรเจค

จัดรูปแบบทุก component ด้วย Tailwind utilities ใน JSX โดยตรง ใช้ `rounded-shop` จาก Tailwind theme สำหรับมุมโค้ง 15px และ `font-sans` สำหรับ IBM Plex Sans Thai Looped ไม่มีไฟล์ App.css ส่วน index.css มีเพียง Tailwind import, theme และ base utilities

## เริ่มใช้งาน

```sh
cd minishop-react
npm install
npm run dev
```

`npm run build` สร้าง production build, `npm run preview` เปิด build, `npm run lint` ตรวจโค้ด

## Components และการทำงาน

- Header: ความสูง 64px, ชื่อ MiniShop 20px, โลโก้ 32px, ไอคอน 18px, ข้อความตะกร้า 12px ไม่มีเมนู Products / Profile
- Hero: ภาพที่ผู้ใช้ให้ไว้ 4 ภาพตัดพื้นหลังเป็น PNG โปร่งใส ใช้สำหรับแบนเนอร์เท่านั้น เลื่อนอัตโนมัติทุก 5 วินาที พักเมื่อชี้เมาส์ โฟกัส หรือปัดภาพ และมีปุ่มหยุด/เล่น เลื่อนด้วยปุ่มซ้าย/ขวา จุดเลือกภาพ keyboard ArrowLeft/ArrowRight หรือปัดบนมือถือได้
- ProductList / ProductCard: แสดงสินค้าจาก Fake Store API เท่านั้น รับชื่อ ราคา ภาพ หมวดหมู่ และ Rating ผ่าน Props
- Profile: แสดงผู้จัดทำ **Ratchatapong Atteephok** รหัสนักศึกษา **67051099** ใน Footer โดยอ้างอิงข้อมูลจากหน้า Profile ของโปรเจคเดิม
- Modal / ProductImage / Icon: หน้าต่างรายละเอียดและตะกร้า ภาพสำรองกรณีโหลดไม่ได้ และไอคอน SVG ที่ผู้ใช้ให้มา

## ข้อมูล API

`useEffect` ดึง https://fakestoreapi.com/products ตรวจ HTTP status และโครงสร้างข้อมูล ยกเลิก request เมื่อ unmount และ timeout 15 วินาที

ใช้ `id`, `title`, `price`, `image`, `category`, `description`, `rating` จาก API โดยตรง ไม่มีสินค้าตัวอย่างแทรก ไม่มีการแปลงราคาและไม่มีการเปลี่ยนหมวดหมู่ แสดงราคาเป็น USD เช่น `$109.95` ตามหน่วยของ API

หมวดหมู่ Filter สร้างจากข้อมูลที่โหลด เช่น electronics, jewelery, men's clothing, women's clothing

แสดง Loading / Error พร้อมปุ่มลองใหม่ / Empty State ไม่แสดงรายการสินค้าเมื่อโหลดไม่สำเร็จ ภาพ JPG ที่ให้มาใช้เฉพาะ Hero ส่วนภาพสินค้าในการ์ด รายละเอียด และตะกร้าใช้ URL จาก API

## State และโบนัส

มี cartCount, search, category, sort, products, loading, error และ cart รองรับ onClick / onChange ค้นหาชื่อแบบไม่แยกตัวพิมพ์ใหญ่เล็ก กรองหมวดหมู่ เรียงราคาสองทิศทาง ดูรายละเอียดและ Rating เพิ่ม/ลดจำนวนสินค้า ลบสินค้าและรวมราคาตะกร้า

ตะกร้าอยู่ในหน่วยความจำระหว่างการใช้งาน รีเฟรชแล้วเริ่มใหม่ ไม่มีการชำระเงินจริง รองรับมือถือ native dialog และ Escape

## ทดสอบด้วยตนเอง

1. ค้นหา `Backpack` ต้องแสดงสินค้า API ที่ตรงชื่อ; ค้นหา `XYZ` แสดง “ไม่พบสินค้าที่ค้นหา”
2. เลือกหมวดหมู่และเรียงราคา ตรวจจำนวนและราคาจากบนลงล่าง
3. กด Add to Cart สองครั้ง ตรวจจำนวนตะกร้า เพิ่ม/ลด/ลบ และราคารวม USD
4. กด View Detail ตรวจชื่อ ราคา รายละเอียดและ Rating จาก API
5. เลื่อน Hero ซ้าย/ขวา ใช้จุดเลือกภาพ keyboard และปัดบนมือถือ
6. ตรวจชื่อและรหัสนักศึกษาใน Footer
7. ตั้ง Network เป็น offline แล้วรีเฟรช ตรวจ Error คืน online แล้วกดลองใหม่
