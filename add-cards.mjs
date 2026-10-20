// Thêm 13 card mới vào index.html + 13 loc vào sitemap.xml của site sotay.
import { readFileSync, writeFileSync } from 'node:fs';

const NEW = [
  ['quan-ly-tiem-dien-lanh-va-bao-tri.html', 'Tiệm điện lạnh: quản lý lịch lắp máy, bảo trì và công nợ thợ', 'Hồ sơ công trình theo serial, lịch bảo trì 6 tháng, vật tư tính theo mét và kg, chốt công nợ thợ.'],
  ['quan-ly-tiem-vang-bac-va-da-quy.html', 'Tiệm vàng bạc đá quý: quản lý niêm yến, thu mua và công nợ', 'Mỗi giao dịch là một niêm yến, tách hàng cửa hàng và hàng khách gửi bán, tính lãi từng món.'],
  ['quan-ly-phong-kham-thu-y.html', 'Phòng khám thú y: lịch tiêm, hồ sơ bệnh, doanh thu theo dịch vụ', 'Nhắc lịch tiêm lại trước, hồ sơ theo mã khách, theo dõi lô vaccine và hạn dùng.'],
  ['quan-ly-cua-hang-may-anh-va-serial.html', 'Cửa hàng máy ảnh: tồn theo serial, bảo hành, hàng ký gửi', 'Tồn kho tính theo từng serial, tách hàng của cửa hàng với hàng ký gửi và hàng demo.'],
  ['quan-ly-tiem-hoa-tuoi.html', 'Tiệm hoa tươi: hàng dễ hỏng, giá theo dạng, chống bán nhầm', 'Giá theo cành hay bó, hạn theo lô nhập, giao đúng màu và đúng đơn vị khách hiểu.'],
  ['quan-ly-tiem-may-do.html', 'Tiệm may đo: đơn hàng, số đo, lịch giao hàng', 'Mỗi đơn là một đơn vị quản lý, vải tính theo mét, lịch giao theo ngày và tỷ lệ sửa lại.'],
  ['quan-ly-quan-cafe-va-tra-sua.html', 'Quán cafe, trà sữa: gọi món nhanh, đối chiếu quầy cuối ca', 'Gọi món và tính tiền là một thao tác, đếm bàn theo ca, khớp ba số cuối ca.'],
  ['quan-ly-cua-hang-vat-lieu-xay-dung.html', 'Cửa hàng vật liệu xây dựng: đơn vị, cắt theo yêu cầu, công nợ', 'Bán theo cái, cây, mét; ghi phần dư khi cắt; công nợ hai chiều với khách và nhà cung cấp.'],
  ['quan-ly-tiem-rua-xe-va-giat-say.html', 'Tiệm rửa xe, tiệm giặt sấy: giao việc theo ca, quản lý thiết bị', 'Giao việc theo xe, lịch bảo dưỡng máy, tách khách hợp đồng và khách lẻ.'],
  ['quan-ly-cua-hang-noi-that.html', 'Cửa hàng nội thất: mẫu, đơn đặt, giao lắp', 'Mã hàng phân biệt được biến thể, đơn đặt có cọ và hạn, lịch giao lắp theo tuần.'],
  ['quan-ly-cua-hang-nuoc-hoa.html', 'Cửa hàng nước hoa: mẫu thử, serial, hàng nhập khẩu', 'Tách mẫu thử khỏi hàng bán, đối chiếu serial ngoài hộp, theo dõi hạn dùng.'],
  ['quan-ly-shop-thoi-trang.html', 'Shop thời trang: size, màu, tồn kho theo mùa', 'Mã xuống tới biến thể, tồn kho theo mùa là vấn đề dòng tiền, đổi size là chỉ số chất lượng.'],
  ['quan-ly-tiem-cat-toc.html', 'Tiệm cắt tóc: lịch thợ, ca, bán thêm dịch vụ', 'Xếp lịch theo thợ và thời lượng, đo doanh thu theo từng thợ, theo dõi tồn thuốc nhuộm.'],
  ['quan-ly-the-thanh-vien-va-diem-thuong.html', 'Thẻ thành viên và điểm thưởng: quy đổi, hạn thẻ, giữ khách', 'Điểm quy đổi được và công khai, cộng điểm kèm hoá đơn, đo bằng tần suất mua.'],
];

let idx = readFileSync('index.html', 'utf8');
const anchor = '</div>\n\n<h2>Vì sao bốn việc này đi cùng nhau</h2>';
if (!idx.includes(anchor)) throw new Error('anchor index.html không đúng');
const cards = NEW.map(([h, t, d]) =>
  `  <div class="card">\n    <a href="${h}">${t}</a>\n    <p>${d}</p>\n  </div>\n`).join('');
idx = idx.replace(anchor, cards + '</div>\n\n<h2>Vì sao bốn việc này đi cùng nhau</h2>');
writeFileSync('index.html', idx);
console.log('index.html: +' + NEW.length + ' card');

let sm = readFileSync('sitemap.xml', 'utf8');
const locs = NEW.map(([h]) =>
  `  <url><loc>https://hakiet.github.io/so-tay-quan-ly-cua-hang/${h}</loc><lastmod>2026-10-20</lastmod><priority>0.8</priority></url>\n`).join('');
sm = sm.replace('</urlset>', locs + '</urlset>');
writeFileSync('sitemap.xml', sm);
console.log('sitemap.xml: +' + NEW.length + ' loc');
