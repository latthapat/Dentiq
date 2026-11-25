const SHEET_NAME = 'Orders';

// ดึงข้อมูลออเดอร์ทั้งหมดไปแสดงที่หน้า Admin (หยิบ/แพ็คสินค้า)
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const orders = rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify(orders))
    .setMimeType(ContentService.MimeType.JSON);
}

// รับคำสั่งซื้อใหม่ หรืออัปเดตสถานะการแพ็คสินค้า
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const body = JSON.parse(e.postData.contents);

  // กรณีอัปเดตสถานะเป็น "แพ็คแล้ว"
  if (body.action === 'updateStatus') {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === body.orderId) {
        sheet.getRange(i + 1, 9).setValue(body.status); // คอลัมน์ที่ 9 คือ Status
        return ContentService.createTextOutput(JSON.stringify({ result: 'updated' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  // กรณีสร้างออเดอร์ใหม่จากหน้า Landing Page
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleString('th-TH');
  
  sheet.appendRow([
    orderId,
    timestamp,
    body.customerName,
    "'" + body.phone, // ใส่ ' นำหน้าเพื่อไม่ให้เลข 0 หาย
    body.address,
    body.sku1Qty,
    body.sku2Qty,
    body.totalPrice,
    'รอหยิบสินค้า'
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: 'success', orderId: orderId }))
    .setMimeType(ContentService.MimeType.JSON);
}
