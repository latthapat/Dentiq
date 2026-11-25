# PureSmile - ระบบขายแปรงสีฟันออนไลน์ & ระบบหยิบ-แพ็คสินค้า (Pick & Pack)

โปรเจกต์ Landing Page ขายแปรงสีฟัน 2 SKUs พร้อมระบบจัดการออเดอร์และพิมพ์ใบจ่าหน้าพัสดุ เชื่อมต่อฐานข้อมูลด้วย Google Sheets และโฮสต์บน GitHub + Vercel

## โครงสร้างไฟล์ในโปรเจกต์
- `index.html` : หน้า Landing Page สำหรับลูกค้าเลือกซื้อสินค้าและกรอกที่อยู่จัดส่ง
- `admin.html` : หน้าหลังบ้านสำหรับดูรายการหยิบสินค้า (Pick List), ยืนยันการแพ็ค และพิมพ์ใบจ่าหน้าพัสดุ
- `Code.gs` : โค้ด Google Apps Script สำหรับเชื่อมต่อกับ Google Sheets
- `images/` : โฟลเดอร์เก็บรูปภาพสินค้า (`sku1-soft.jpg`, `sku2-bamboo.jpg`)

## ขั้นตอนการติดตั้งและใช้งาน
1. **ตั้งค่า Google Sheets:**
   - สร้าง Google Sheet ใหม่ เปลี่ยนชื่อแท็บด้านล่างเป็น `Orders`
   - ตั้งชื่อหัวคอลัมน์แถวที่ 1 (A1:I1) ดังนี้:
     `OrderID` | `Timestamp` | `CustomerName` | `Phone` | `Address` | `SKU1_Qty` | `SKU2_Qty` | `TotalPrice` | `Status`
   - ไปที่เมนู **Extensions > Apps Script** นำโค้ดจากไฟล์ `Code.gs` ไปวาง แล้วกด **Deploy > New deployment > Web app** (ตั้งค่า Who has access เป็น **Anyone**)
   - คัดลอก **Web app URL** มาใส่แทนที่คำว่า `YOUR_GOOGLE_SCRIPT_URL` ในไฟล์ `index.html` และ `admin.html`

2. **อัปโหลดขึ้น GitHub & Deploy บน Vercel:**
   - สร้าง Repository ใหม่บน GitHub และอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้นไป
   - นำ Repository ดังกล่าวไป Import และกด Deploy บน Vercel เพื่อรับลิงก์เว็บไซต์ใช้งานจริง
