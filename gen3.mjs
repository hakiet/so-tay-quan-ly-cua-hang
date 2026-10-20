import { writeFileSync } from 'node:fs';
const BASE = 'https://hakiet.github.io/so-tay-quan-ly-cua-hang/';
const CSS = `:root{--ink:#17202a;--muted:#5b6b7b;--line:#e2e8ee;--bg:#fbfcfd;--accent:#0b6bcb}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{max-width:760px;margin:0 auto;padding:40px 20px 80px}
h1{font-size:2rem;line-height:1.2;margin:0 0 .4em}
h2{font-size:1.25rem;margin:2em 0 .5em}
p{margin:0 0 1em}
a{color:var(--accent)}
.lead{font-size:1.08rem;color:var(--muted)}
ul,ol{padding-left:1.2em}
li{margin:.4em 0}
table{border-collapse:collapse;width:100%;margin:1em 0;font-size:.95rem}
th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
th{background:#f1f5f9}
footer{margin-top:3em;padding-top:1.5em;border-top:1px solid var(--line);color:var(--muted);font-size:.9rem}`;
const P = 'https://www.phanmempos.com/san-pham/';
const A = 'https://www.phanmempos.com/';
const L = {
  pos: ['phan-mem-quan-ly-ban-hang-offline-ebiz-pos', 'phần mềm quản lý bán hàng offline'],
  kho: ['phan-mem-quan-ly-kho-offline-kiem-soat-ton-kho-giam-that-thoat-hieu-qua', 'quản lý kho offline'],
  baoHanh: ['phan-mem-quan-ly-bao-hanh-offline-toi-uu-quy-trinh-nang-cao-chat-luong-dich-vu', 'quản lý bảo hành'],
  quanAn: ['ebiz-giai-phap-phan-mem-quan-ly-quan-an-quan-nhau-offline-on-gian-hieu-qua-nang-cao-trai-nghiem-khach-hang', 'quản lý quán ăn, quán nhậu'],
  spa: ['phan-mem-quan-ly-spa-clinic-salon-hieu-qua-toi-uu-doanh-thu-offline-pos-ebiz', 'quản lý spa, salon'],
  salon: ['phan-mem-tinh-tien-beauty-salon-toc-don-gian-offline-quan-ly-de-dang-tang-hieu-qua', 'tính tiền salon tóc'],
  thoiTrang: ['ebiz-phan-mem-ban-hang-offline-cho-shop-thoi-trang-quan-ao-giay-dep-cua-ban', 'bán hàng cho shop thời trang'],
  myPham: ['ebiz-phan-mem-ban-hang-offline-giai-phap-quan-ly-toan-dien-cho-shop-my-pham-cua-ban', 'quản lý shop mỹ phẩm'],
  dienThoai: ['ebiz-phan-mem-quan-ly-ban-hang-dien-thoai-camera-dien-tu-offline-but-pha-hieu-suat-toi-uu-loi-nhuan', 'bán hàng điện thoại, camera'],
  the: ['phan-mem-quan-ly-the-thanh-vien-tich-diem-giu-chan-khach-hang-tang-doanh-thu', 'thẻ thành viên, tích điểm'],
  banSi: ['ebiz-giai-phap-phan-mem-quan-ly-ban-buon-ban-si-cong-no-offline-chuyen-nghiep-chinh-xac-hieu-qua', 'quản lý bán buôn, bán sỉ, công nợ'],
  hoKD: ['phan-mem-ban-hang-offline-cho-ho-kinh-doanh-giai-phap-toi-uu-de-quan-ly-hieu-qua-va-but-pha-doanh-thu', 'bán hàng offline cho hộ kinh doanh'],
};
const prod = (k) => `<a href="${P}${L[k][0]}">${L[k][1]}</a>`;
const post = (slug, text) => `<a href="${A}${slug}">${text}</a>`;

function page({ slug, title, desc, h1, lead, body, links, related = [] }) {
  const rel = related.length
    ? `\n<h2>Đọc thêm</h2>\n<ul>\n${related.map(r => `  <li>${post(r[0], r[1])}</li>`).join('\n')}\n</ul>\n`
    : '';
  const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${BASE}${slug}">
<style>
${CSS}
</style>
</head>
<body>
<main>
<h1>${h1}</h1>
<p class="lead">${lead}</p>
${body}
${rel}
<p>Khi số lượng hàng, ca và khách đủ lớn, sổ tay giấy bắt đầu thua thiệt. Lúc đó nên dùng ${links.map(prod).join(', ')}.</p>
<p><a href="index.html">← Về trang chủ sổ tay</a></p>
<footer>Sổ tay quản lý cửa hàng.</footer>
</main>
</body>
</html>
`;
  writeFileSync(slug, html);
  console.log('wrote', slug, html.length);
}

page({
  slug: 'quan-ly-tiem-dien-lanh-va-bao-tri.html',
  title: 'Quản lý tiệm điện lạnh: lịch lắp máy, bảo trì, công nợ thợ',
  desc: 'Quy trình quản lý tiệm điện lạnh: hồ sơ công trình theo serial, lịch bảo trì 6 tháng, quản lý vật tư theo mét và kg, đối chiếu công nợ thợ cuối ca.',
  h1: 'Tiệm điện lạnh: quản lý lịch lắp máy, bảo trì và công nợ thợ',
  lead: 'Tiệm điện lạnh sống bằng hai việc: lắp máy mới và bảo trì máy đã lắp. Lắp thì có lịch hẹn với khách, bảo trì thì có chu kỳ 6 tháng hoặc 1 năm. Cả hai đều là việc phải nhớ, mà thợ thì ngoài đường, chủ tiệm thì không có mặt tại công trường.',
  body: `<h2>Hồ sơ công trình thay vì nhớ</h2>
<p>Mỗi máy lắp xong nên có một hồ sơ: serial, chủ nhà, địa chỉ, ngày lắp, hạn bảo trì kế tiếp. Hồ sơ này trả lời được ba câu hỏi mà miệng không trả lời được: máy nào còn trong hạn, khách nào đến hạn, và máy nào vừa lắp xong còn nợ thợ.</p>
<h2>Bảo trì định kỳ là doanh thu, không phải chi phí</h2>
<p>Một chiếc máy lắp năm năm trung bình bốn lần bảo trì. Nếu chủ tiệm không nhớ lịch, đến bảy phần mười sẽ không bao giờ quay lại. Ngược lại, nếu có danh sách máy đến hạn, mỗi tháng có sẵn một danh sách khách để gọi — và đó là doanh thu không tốn thêm chi phí quảng cáo nào.</p>
<h2>Vật tư tính theo mét và kilôgam</h2>
<p>Ống đồng, dây điện, gas và nước không bán theo cái mà bán theo mét và cân. Khi nhập vật tư mà chỉ ghi "một cuộn ống", cuối tháng không ai biết còn bao nhiêu. Ghi số mét thực nhận và số kg gas bơm là hai dòng bắt buộc trong phiếu.</p>
<h2>Công nợ thợ: chốt theo công trình</h2>
<p>Thợ đi lắp máy, tiền công tính theo công trình chứ không theo ngày. Cuối ngày, thợ bàn giao danh sách công trình đã hoàn thành kèm ảnh. Quản lý theo công trình thì chủ tiệm đối chiếu được với ảnh, và không có chuyện "thợ báo nhiều hơn thực tế".</p>`,
  links: ['baoHanh', 'pos'],
  related: [
    ['phan-mem-quan-ly-tiem-dien-lanh-offline-6-tinh-nang', 'Phần Mềm Quản Lý Tiệm Điện Lạnh Offline: 6 Tính Năng Theo Dõi Lịch Lắp Máy, Bảo Trì Và Công Nợ Thợ'],
    ['phan-mem-quan-ly-bao-hanh-va-doi-tra', 'Bảo hành và đổi trả: quản lý bằng phiếu, không bằng trí nhớ'],
  ],
});

page({
  slug: 'quan-ly-tiem-vang-bac-va-da-quy.html',
  title: 'Quản lý tiệm vàng bạc đá quý: niêm yến, thu mua, công nợ',
  desc: 'Quy trình quản lý tiệm vàng bạc đá quý: ghi nhận niêm yến, lưu lịch thu mua và bán ra, tính lãi theo từng món, đối chiếu công nợ cuối ngày.',
  h1: 'Tiệm vàng bạc đá quý: quản lý niêm yến, thu mua và công nợ',
  lead: 'Tiệm vàng khác cửa hàng thường ở chỗ mỗi món hàng có giá trị lớn và mỗi giao dịch đều để lại dấu vết. Nếu chỉ ghi "mua vàng" mà không ghi trọng lượng, giá mua, niêm yến thì đến cuối ngày không ai dám khẳng định quầy còn bao nhiêu.',
  body: `<h2>Mỗi giao dịch là một niêm yến</h2>
<p>Khách mang vàng đến, thợ thử vàng ra kết quả, cửa hàng thu mua. Ba thông tin đó phải nằm cùng một phiếu: trọng lượng thô, độ thuần, giá mua. Không có phiếu, cửa hàng chỉ còn cách đoán. Với món có giá trị lớn, sự mơ hồ đó tốn kém hơn cả việc in giấy.</p>
<h2>Lưu lịch thu mua và bán ra riêng biệt</h2>
<p>Hàng của cửa hàng và hàng khách gửi bán (khi giá vàng giảm) phải nằm ở hai sổ khác nhau. Khi giá tăng, cửa hàng mua thêm; khi giá giảm, cửa hàng phải bán hàng khách gửi bán trước. Trộn hai loại này là nguồn lỗ rò rỉ phổ biến nhất ở tiệm vàng.</p>
<h2>Tính lãi trên từng món, không tính tổng</h2>
<p>Nếu tính lãi gộp cho cả quầy, sẽ không biết món nào đang lãi và món nào đang lỗ. Mỗi món cần giá vốn và giá bán riêng. Món lãi nhỏ nhưng bán nhanh thì có thể tốt hơn món lãi cao nhưng nằm hàng cả năm.</p>
<h2>Đối chiếu quầy cuối ngày</h2>
<p>Cuối ngày, ba con số phải khớp: tổng trọng lượng vàng tồn, tổng tiền thu mua trong ngày, và số dư tiền mặt thực tế. Lệch một trong ba là dấu hiệu cần tra, không phải lỗi làm tròn.</p>`,
  links: ['pos', 'kho'],
  related: [
    ['phan-mem-quan-ly-tiem-vang-bac-da-quy-offline-6-tinh-nang', 'Phần Mềm Quản Lý Tiệm Vàng Bạc Đá Quý Offline: 6 Tính Năng Kiểm Soát'],
    ['bi-quyet-lua-chon-cua-hang-vang-bac-da-quy-uy-tin-huong-dan-chi-tiet', 'Bí quyết lựa chọn cửa hàng vàng bạc đá quý uy tín'],
  ],
});

page({
  slug: 'quan-ly-phong-kham-thu-y.html',
  title: 'Quản lý phòng khám thú y: lịch tiêm, hồ sơ bệnh, doanh thu theo dịch vụ',
  desc: 'Quy trình quản lý phòng khám thú y: lịch tiêm chủng nhắc trước, hồ sơ bệnh theo mã khách, quản lý vắt vaccine và báo cáo doanh thu theo từng dịch vụ.',
  h1: 'Phòng khám thú y: quản lý lịch tiêm, hồ sơ bệnh và doanh thu dịch vụ',
  lead: 'Phòng khám thú y bán hai thứ: dịch vụ hôm nay và sự tin tưởng cho lần sau. Lần sau chỉ đến khi khách nhớ đúng ngày tiêm lại. Mất lịch nhắc là mất khách, không phải chỉ mất một món.',
  body: `<h2>Lịch nhắc là tài sản của phòng khám</h2>
<p>Mỗi con vật có lịch tiêm lại theo chu kỳ. Nếu lịch nằm trong đầu bác sĩ, mỗi tháng có một phần khách quay lại đúng hạn và một phần không. Danh sách "đến hạn trong 7 ngày" nên được lấy ra mỗi sáng, và nhắc khách trước một ngày.</p>
<h2>Hồ sơ theo mã khách, không theo tên</h2>
<p>Chó đi có thể trùng tên, trùng giống. Mã khách gắn với chủ và với con vật riêng biệt: hồ sơ của con vật lưu lịch tiêm, dịch vụ đã làm, dị ứ thuốc. Khi cần tra lại lịch sử, chỉ cần mã là ra.</p>
<h2>Vắt vaccine và vật tư tiêu hao</h2>
<p>Thuốc, vaccine, kim tiêm và dụng cụ đều có hạn và lượng. Nếu không theo dõi lô và hạn, tình huống thường gặp là còn đúng một mũi nhưng đã quá hạn. Ghi rõ lô hàng và hạn khi nhập, và trừ kho theo từng ca điều trị thay vì theo tổng ngày.</p>
<h2>Doanh thu theo từng dịch vụ</h2>
<p>Tiêm phòng, khám bệnh, xét nghiệm, cắt lông — mỗi dịch vụ một biên lời khác nhau. Báo cáo gộp sẽ cho biết tổng tiền, nhưng không cho biết dịch vụ nào đáng đẩy mạnh và dịch vụ nào đang làm mất thời gian của bác sĩ mà không đổi lại tiền.</p>`,
  links: ['pos', 'the'],
  related: [
    ['phan-mem-quan-ly-phong-kham-thu-y-offline-6-tinh-nang', 'Phần Mềm Quản Lý Phòng Khám Thú Y Offline: 6 Tính Năng'],
    ['quan-ly-lich-hen-spa-salon', 'Quản lý lịch hẹn: chống trùng giờ, chống khách quên'],
  ],
});

page({
  slug: 'quan-ly-cua-hang-may-anh-va-serial.html',
  title: 'Quản lý cửa hàng máy ảnh: tồn theo serial, bảo hành, hàng ký gửi',
  desc: 'Quy trình quản lý cửa hàng máy ảnh: tồn kho theo serial, bảo hành theo số máy, tách hàng ký gửi, định giá thu cũ và hóa đơn in kèm serial.',
  h1: 'Cửa hàng máy ảnh: quản lý tồn theo serial, bảo hành và hàng ký gửi',
  lead: 'Cửa hàng máy ảnh tồn ít món nhưng mỗi món là một serial riêng. Quản lý kiểu "còn 3 máy" là quản lý không có gì để đối chiếu, vì không có cách nào biết 3 máy đó là máy nào.',
  body: `<h2>Tồn kho phải tính đến từng serial</h2>
<p>Máy ảnh bán kèm thẻ nhớ, pin sạc, cáp và túi. Tồn kho theo mã sản phẩm cho biết còn bao nhiêu thẻ nhớ, nhưng không cho biết máy nào còn. Với cửa hàng máy ảnh, danh sách serial là danh sách tồn kho thật.</p>
<h2>Ba loại hàng phải tách riêng</h2>
<p>Hàng của cửa hàng, hàng ký gửi của khách và hàng demo đang trưng bày là ba kho khác nhau. Trộn chúng sẽ cho ra số tồn đẹp nhưng không bán được, vì không ai sở hữu. Tách riêng từ đầu thì mỗi loại có con số riêng và câu hỏi "còn món nào hợp lệ để bán" luôn có đáp án.</p>
<h2>Bảo hành gắn với số máy</h2>
<p>Bảo hành theo hóa đơn thì tra cứu chậm và dễ nhầm khi khách mua nhiều máy. Gắn hạn bảo hành vào serial từ ngày nhập: khi khách mang máy đến, tra serial là ra ngày mua và ngày hết hạn.</p>
<h2>Định giá thu cũ</h2>
<p>Mỗi lần thu cũ nên ghi lại mức giá trị thu hồi và mức chiết khấu. Sau vài chục lần, bạn sẽ thấy mức thu hồi thực tế theo từng dòng — đây là con số quyết định có nên nhận thu cũ dòng đó hay không.</p>`,
  links: ['dienThoai', 'baoHanh'],
  related: [
    ['phan-mem-quan-ly-cua-hang-may-anh-offline-6-tinh-nang', 'Phần Mềm Quản Lý Cửa Hàng Máy Ảnh Offline: 6 Tính Năng Quản Lý Serial, Bảo Hành Và Hàng Ký Gửi'],
    ['quan-ly-bao-hanh-va-doi-tra', 'Bảo hành và đổi trả: quản lý bằng phiếu, không bằng trí nhớ'],
  ],
});

page({
  slug: 'quan-ly-tiem-hoa-tuoi.html',
  title: 'Quản lý tiệm hoa tươi: hàng dễ hỏng, giá theo dạng, chống bán nhầm',
  desc: 'Quy trình quản lý tiệm hoa tươi: ghi giá theo dạng và bó, hạn sử dụng theo lô, chống bán nhầm màu, báo cáo doanh thu theo ngày lễ.',
  h1: 'Tiệm hoa tươi: quản lý hàng dễ hỏng, giá theo dạng, chống bán nhầm',
  lead: 'Hoa tươi hỏng theo giờ, không theo ngày. Một bó hồng mua sáng có thể phải giảm giá lúc 16 giờ. Quản lý kiểu số lượng thuần không nói lên được điều đó.',
  body: `<h2>Giá bán theo dạng và theo bó</h2>
<p>Hoa bán theo cành, theo bó, theo lễ, và giá khác nhau cho cùng một loại hoa. Nếu giá lưu trong sổ dạng "hoa hồng 15k", không ai biết 15k là cành hay bó. Ghi rõ đơn vị bán ngay từ đầu, và tách giá gốc khỏi giá bán để thấy được biên.</p>
<h2>Theo dõi hạn theo lô nhập</h2>
<p>Hoa nhập buổi sáng và bán được trong ngày, nhập chiều và phải giảm giá sáng hôm sau. Ghi lô nhập kèm giờ nhập thực tế, thay vì dùng ngày. Khi đến giờ giảm giá, bạn biết chính xác lô nào cần xử lý.</p>
<h2>Chống bán nhầm màu và chống bán theo đơn vị</h2>
<p>Hai lỗi phổ biến nhất ở tiệm hoa là giao sai màu khách đặt và bán theo "bó" trong khi khách hiểu là "cành". Cả hai đều giải được bằng cách lưu ảnh mẫu theo từng mã màu và hiển thị đơn vị lên hoá đơn.</p>
<h2>Doanh thu theo ngày lễ</h2>
<p>Hoành sựa là ngày kiếm tiền, ngày thường là ngày giữ khách. Nếu báo cáo chung cả tháng, hai loại ngày này trộn vào nhau. Tách báo cáo theo ngày lễ giúp biết mình đang chuẩn bị tốt hay chưa, và mức tăng doanh thu so với cùng kỳ năm trước có đáng hay không.</p>`,
  links: ['pos', 'kho'],
  related: [
    ['phan-mem-quan-ly-tiem-hoa-tuoi-offline-6-tinh-nang', 'Phần Mềm Quản Lý Tiệm Hoa Tươi Offline: 6 Tính Năng Tránh Bán Nhầm'],
    ['phan-mem-quan-ly-shop-hoa-tuoi-toi-uu-hoa-kinh-doanh-hieu-qua', 'Phần mềm quản lý shop hoa tươi tối ưu hoá kinh doanh'],
  ],
});

page({
  slug: 'quan-ly-tiem-may-do.html',
  title: 'Quản lý tiệm may đo: đơn hàng, đo lấy số, giao hàng đúng hẹn',
  desc: 'Quy trình quản lý tiệm may đo: ghi đơn theo số đo, quản lý hàng vải theo mét, lịch giao hàng và xử lý sửa lại sau khi khách mặc thử.',
  h1: 'Tiệm may đo: quản lý đơn hàng, số đo và lịch giao hàng',
  lead: 'Tiệm may đo không có sẵn hàng để bán. Tất cả bắt đầu từ một đơn khách, và sản phẩm chỉ tồn tại sau khi thợ may xong. Quản lý đơn là quản lý tiền.',
  body: `<h2>Đơn hàng là đơn vị quản lý, không phải tờ giấy</h2>
<p>Mỗi đơn có số đo riêng, loại vải, phụ kiện đi kèm và ngày giao dự kiến. Khi có ba mươi đơn chạy cùng lúc, danh sách "đơn chưa xong" trên giấy là nguồn lỗi. Một đơn nằm trên hệ thống có thể tra được: đang may ở đâu, còn bao lâu, có đúng hẹn không.</p>
<h2>Vải tính theo mét, theo cây</h2>
<p>Vải cắt theo mét, còn theo cây khi mua số lượng lớn. Cần biết còn bao nhiêu mét của từng màu sau mỗi đơn cắt. Không theo dõi, cửa hàng sẽ tự nhiên phát hiện ra mình thiếu vải đúng lúc có khách đặt.</p>
<h2>Lịch giao hàng là lịch hẹn với khách</h2>
<p>Khách đến lấy đồ đúng ngày giao là mốc quan hệ. Nếu giao trễ một ngày, chi phí xin lỗi lớn hơn nhiều so với việc sửa một lỗi đo. Lịch giao theo ngày giúp chủ tiệm biết hôm nào cần người phụ, và biết ngày nào không thể nhận thêm đơn.</p>
<h2>Sửa lại sau khi khách mặc thử</h2>
<p>Đồ may xong khách mặc thử và thường cần chỉnh lại một chút. Nên ghi nhận lượt sửa theo đơn: đơn nào sửa nhiều lần thì thợ đó cần được kiểm tra lại cách đo, và tỷ lệ sửa là một chỉ số chất lượng của tiệm.</p>`,
  links: ['thoiTrang', 'pos'],
  related: [
    ['phan-mem-quan-ly-tiem-may-do-offline-6-tinh-nang', 'Phần Mềm Quản Lý Tiệm May Đo Offline: 6 Tính Năng Theo Dõi Đơn May'],
    ['cua-hang-me-va-be-va-phu-kien', 'Cửa hàng mẹ và bé, cửa hàng phụ kiện: mã hàng theo size và màu'],
  ],
});

page({
  slug: 'quan-ly-quan-cafe-va-tra-sua.html',
  title: 'Quản lý quán cafe, trà sữa: gọi món nhanh, ca thu ngân, tồn nguyên liệu',
  desc: 'Quy trình quản lý quán cafe và trà sữa: gọi món và in bill nhanh, bàn theo ca, đối chiếu quầy cuối ca, tồn kho nguyên liệu theo lô.',
  h1: 'Quán cafe, trà sữa: gọi món nhanh, đối chiếu quầy cuối ca',
  lead: 'Quán cafe bán một sản phẩm nhưng vận hành rất nhiều thứ cùng lúc: bàn, ca, nguyên liệu, thu ngân. Giữa lúc đông khách, mọi thao tác thủ công đều bị đẩy ra sau và biến thành lỗi cuối ngày.',
  body: `<h2>Gọi món và tính tiền là một thao tác</h2>
<p>Quán bán nhanh, mỗi phút chậm là mất khách. Bàn ghi món và bàn tính tiền nên là một chuỗi, không phải hai việc tách rời với việc ghi nhớ. Khi bàn đã gọi xong, đồng nghiệp khác phải nhìn thấy được đó là bàn nào, món gì, đã gọi chưa.</p>
<h2>Đếm bàn theo ca, không đếm bàn trong ngày</h2>
<p>Ca là đơn vị doanh thu thật. Số bàn theo ca cho biết lúc nào đông, cần thêm người, và chất lượng phục vụ có ổn không. Đếm bàn cả ngày chỉ cho biết tổng, không cho biết ca nào đang lỗ.</p>
<h2>Đối chiếu quầy cuối ca</h2>
<p>Cuối ca cần khớp: tổng số hóa đơn với số giao dịch trên máy, tổng tiền mặt thực tế trong két với tổng doanh thu ghi nhận, và tiền mặt đầu ca với tiền bán được. Lệch một trong ba là lỗi cần tra ngay trong ca, không để sang hôm sau.</p>
<h2>Nguyên liệu theo lô và hạn</h2>
<p>Sữa tươi, trà, siro, topping đều có lô và hạn. Một quán bán 200 ly mỗi ngày sẽ hao hàng nhanh hơn mức nhớ được. Ghi lô nhập và trừ kho theo công thức từng món là cách duy nhất để biết thứ gì sắp hết trước khi nó hết.</p>`,
  links: ['quanAn', 'pos'],
  related: [
    ['phan-mem-quan-ly-quan-cafe-takeaway-5-tinh-nang', 'Phần mềm quản lý quán cafe takeaway'],
    ['quan-tra-sua-offline-7-tinh-nang-phan-mem-quan-ly-tang-doanh-thu', 'Phần mềm quản lý quán trà sữa offline'],
  ],
});

page({
  slug: 'quan-ly-cua-hang-vat-lieu-xay-dung.html',
  title: 'Quản lý cửa hàng vật liệu xây dựng: đơn vị, cắt theo yêu cầu, công nợ',
  desc: 'Quy trình quản lý cửa hàng vật liệu xây dựng: quản lý theo đơn vị (cái, cây, mét), cắt theo yêu cầu, công nợ khách và công nợ nhà thầu.',
  h1: 'Cửa hàng vật liệu xây dựng: quản lý theo đơn vị và công nợ hai chiều',
  lead: 'Cửa hàng vật liệu bán theo nhiều đơn vị cùng lúc trên cùng một mã hàng: một cây gỗ, năm mét ống, ba bao xi măng. Nếu quy đổi không ghi lại, số tồn trên giấy và số tồn thật lệch nhau ngay trong tuần đầu.',
  body: `<h2>Đơn vị bán phải ghi rõ trên từng dòng</h2>
<p>Cùng một mã thép có thể bán theo cây, theo mét, theo tấn. Mỗi lần bán ghi rõ đơn vị và số lượng quy đổi. Đây là việc mà sổ tay làm tốt nhất: nếu mỗi dòng ghi "2 cây 3m", con số tồn còn lại luôn kiểm tra được bằng cách đếm hiện vật.</p>
<h2>Cắt theo yêu cầu phải ghi phần dư</h2>
<p>Khi khách mua 2 cây và cửa hàng cắt cho, phần dư phải được ghi lại kèm vị trí. Nếu không, phần dư tồn tại trong đầu thợ cưa và sẽ mất. Mỗi lần cắt sinh ra hai thông tin: số thực giao và số dư còn lại.</p>
<h2>Công nợ hai chiều</h2>
<p>Cửa hàng vật liệu nợ nhà cung cấp và khách nợ cửa hàng — hai danh sách tách biệt với hạn thanh toán khác nhau. Nếu gộp, sẽ tưởng đang có tiền khi thực ra đã cần trả. Đối chiếu hai danh sách theo tuần là việc bắt buộc, không phải tuỳ chọn.</p>
<h2>Giá và chiết khấu theo khách</h2>
<p>Khách lấy số lượng lớn thường có giá riêng. Nếu giá theo khách ghi trong đầu, khi nhân viên mới phục vụ sẽ tính nhầm và mất tiền mà không biết mình đã tính sai. Bảng giá theo khách cần nằm trong hệ thống, và mỗi dòng bán ghi lại giá đã áp dụng.</p>`,
  links: ['kho', 'banSi'],
  related: [
    ['phan-mem-quan-ly-cua-hang-vat-lieu-xay-dung-offline-6-tinh-nang', 'Phần Mềm Quản Lý Cửa Hàng Vật Liệu Xây Dựng Offline: 6 Tính Năng'],
    ['quan-ly-ton-kho-nhieu-chi-nhanh', 'Quản lý tồn kho nhiều chi nhánh: chuyển hàng, định mức, tồn âm'],
  ],
});

page({
  slug: 'quan-ly-tiem-rua-xe-va-giat-say.html',
  title: 'Quản lý tiệm rửa xe, tiệm giặt sấy: ca thợ, thiết bị, hợp đồng',
  desc: 'Quy trình quản lý tiệm rửa xe và tiệm giặt sấy: giao việc theo ca, trạng thái thiết bị, hợp đồng khách tháng và đối chiệu doanh thu cuối ngày.',
  h1: 'Tiệm rửa xe, tiệm giặt sấy: giao việc theo ca, quản lý thiết bị',
  lead: 'Tiệm rửa xe và tiệm giặt sấy có điểm chung: doanh thu đến từ công việc lặp lại hằng ngày, còn chi phí đến từ máy móc. Quản lý ca quyết định năng suất, quản lý thiết bị quyết định lợi nhuận.',
  body: `<h2>Giao việc theo ca, ghi theo xe</h2>
<p>Mỗi xe rửa trong ca đều cần thợ nhận và bàn giao. Ghi việc theo xe thay vì theo thợ giúp biết xe nào đang chờ, xe nào xong, và thợ nào đang quá tải. Với khách hợp đồng, việc này còn tạo ra lịch sử phục vụ theo từng xe.</p>
<h2>Thiết bị là tài sản cần lịch bảo dưỡng</h2>
<p>Máy rửa áp suất cao, máy giặt, máy sấy — mỗi thiết bị có chu kỳ bảo dưỡng. Một máy hỏng giữa ca giữa khách là mất doanh thu và mất khách. Lịch bảo dưỡng theo số giờ chạy giúp việc bảo trì xảy ra vào lúc vắng, thay vì vào lúc đông nhất.</p>
<h2>Khách hợp đồng và khách lẻ là hai sổ khác nhau</h2>
<p>Khách hợp đồng trả tháng, khách lẻ trả từng lần. Trộn hai nhóm vào một sổ là mất khả năng biết doanh thu lặp lại đang chiếm bao nhiêu phần — và đó là con số quyết định có nên đầu tư thêm máy hay không.</p>
<h2>Đối chiệu cuối ngày theo ca</h2>
<p>Cuối ca, số xe hoàn thành trên bảng phải khớp với số phiếu đã thu tiền. Lệch là dấu hiệu mất tiền hoặc mất xe, và cần tra trong ca vì sang hôm sau thì nhân viên đã về.</p>`,
  links: ['pos', 'kho'],
  related: [
    ['phan-mem-quan-ly-tiem-rua-xe-offline-6-tinh-nang', 'Phần Mềm Quản Lý Tiệm Rửa Xe Offline: 6 Tính Năng Xử Lý Giờ Ca'],
    ['quan-ly-ca-ban-va-nhan-vien', 'Quản lý ca bán và nhân viên: phân quyền, chấm công, trách nhiệm'],
  ],
});

page({
  slug: 'quan-ly-cua-hang-noi-that.html',
  title: 'Quản lý cửa hàng nội thất: mẫu, đơn đặt, giao lắp',
  desc: 'Quy trình quản lý cửa hàng nội thất: quản lý mẫu và phụ kiện, đơn đặt hàng theo yêu cầu, lịch giao lắp và theo dõi công nợ khách.',
  h1: 'Cửa hàng nội thất: quản lý mẫu, đơn đặt và lịch giao lắp',
  lead: 'Cửa hàng nội thất bán một mẫu nhưng giao nhiều biến thể: màu, kích cỡ, phụ kiện đi kèm. Quản lý theo mã hàng thuần sẽ không biết mình còn mẫu sofa 3 chỗ màu xám hay không.',
  body: `<h2>Mã hàng phải phân biệt được biến thể</h2>
<p>Sofa 3 chỗ màu xám và sofa 3 chỗ màu be là hai mã khác nhau về mặt kho, dù cùng một thiết kế. Ghi rõ màu và kích cỡ trong mã giúp tồn kho trả lời được câu hỏi duy nhất quan trọng: còn mẫu này đúng biến thể khách vừa hỏi không.</p>
<h2>Đơn đặt hàng là phần lớn doanh thu</h2>
<p>Khách thường chọn trong showroom rồi đặt hàng với màu và kích cỡ riêng. Đơn đặt cần hạn giao và cọ. Quản lý cọ và hạn giao trong hệ thống giúp không nhận quá nhiều đơn cùng lúc so với năng lực giao.</p>
<h2>Lịch giao lắp là phần khó nhất</h2>
<p>Giao lắp cần đủ người, đủ xe và đúng kỹ thuật. Lịch giao theo tuần, mỗi đơn gắn với số người và thời gian cần, là cách biết trước tuần đó có dư người hay thiếu. Đơn nào trễ giao sẽ sinh ra đơn đổi và chi phí xin lỗi lớn hơn nhiều so với lợi nhuận trên đơn đó.</p>
<h2>Công nợ và chi phí lắp đặt</h2>
<p>Phần lắp đặt thường là biệt lệ so với giá sản phẩm. Tách rõ tiền hàng và tiền lắp đặt trên hoá đơn giúp tránh hiểu nhầm về doanh thu thuần, và giúp tính được biên lợi nhuận thật của từng đơn.</p>`,
  links: ['pos', 'kho'],
  related: [
    ['phan-mem-quan-ly-cua-hang-noi-that-offline-6-tinh-nang', 'Phần Mềm Quản Lý Cửa Hàng Nội Thất Offline: 6 Tính Năng Xử Lý Đơn'],
    ['ban-le-offline-va-hoa-don-dien-tu', 'Bán lẻ offline và hóa đơn điện tử: quy trình mở ca đến chốt ca'],
  ],
});

page({
  slug: 'quan-ly-cua-hang-nuoc-hoa.html',
  title: 'Quản lý cửa hàng nước hoa: mẫu thử, serial, hàng nhập khẩu',
  desc: 'Quy trình quản lý cửa hàng nước hoa: quản lý mẫu thử và hàng demo, đối chiếu serial với hộp, hạn dùng và kiểm soát hàng nhập khẩu.',
  h1: 'Cửa hàng nước hoa: quản lý mẫu thử, serial và hàng nhập khẩu',
  lead: 'Cửa hàng nước hoa có hai loại hàng: hàng bán và hàng mẫu thử. Chúng đều bị mở, đều hao, nhưng chỉ một loại tạo ra tiền. Nếu không tách, số tồn luôn đẹp và con số lợi nhuận luôn thấp.',
  body: `<h2>Tách hàng mẫu khỏi hàng bán</h2>
<p>Mỗi mẫu thử đã mở nên vẫn nằm trên kệ nhưng không bán được, và có hạn dùng riêng. Ghi rõ mẫu thử đã mở, số lượng còn lại trong chai, và ngày mở. Khi mẫu gần hết, nhân viên cần biết để không tư vấn thứ không còn dùng được.</p>
<h2>Đối chiếu serial với hộp</h2>
<p>Nước hoa nhập khẩu có mã serial ngoài hộp. Đối chiếu serial với số lượng thực trong tủ là việc kiểm kê tốn thời gian nhất, nhưng là cách duy nhất phát hiện hàng thiếu hoặc hàng thừa trước khi ký nhận lô mới.</p>
<h2>Hạn dùng ngắn, xuất nhập nhanh</h2>
<p>Nước hoa thường hạn dùng vài năm nhưng mùi và chất lượng suy giảm sớm hơn nhiều. Ghi ngày nhập cùng lô và đều đặt hàng mua lại sau khoảng thời gian đó, thay vì để hàng nằm trong tủ quá lâu rồi mới phát hiện.</p>
<h2>Bán theo mùi và theo dịp</h2>
<p>Nước hoa bán theo mùi khách thích và theo dịp tặng. Quản lý danh sách mùi đang bán chạy giúp phân bổ tồn kho hợp lý: mùi bán chạy cần luôn có, mùi chạy chậm nên giữ lượng vừa phải để tránh vốn bị khoá.</p>`,
  links: ['myPham', 'pos'],
  related: [
    ['phan-mem-quan-ly-cua-hang-nuoc-hoa-offline-6-tinh-nang', 'Phần Mềm Quản Lý Cửa Hàng Nước Hoa Offline: 6 Tính Năng Bán Đúng'],
    ['shop-my-pham-va-kho-mua-hang', 'Shop mỹ phẩm: hạn dùng, lô hàng và lợi nhuận sau khuyến mãi'],
  ],
});

page({
  slug: 'quan-ly-shop-thoi-trang.html',
  title: 'Quản lý shop thời trang: size, màu, tồn kho theo mùa',
  desc: 'Quy trình quản lý shop thời trang: mã hàng theo size và màu, tồn kho theo mùa, xử lý đổi size và báo cáo mặt hàng bán chạy.',
  h1: 'Shop thời trang: quản lý size, màu và tồn kho theo mùa',
  lead: 'Cùng một kiểu áo có sáu size và ba màu. Quản lý theo mã kiểu áo sẽ cho biết còn bao nhiêu chiếc áo, nhưng không biết còn size M màu đen hay không — và đó mới là câu hỏi khách hỏi mỗi ngày.',
  body: `<h2>Mã hàng phải xuống tới biến thể</h2>
<p>Mã kiểu áo, mã size và màu là ba chiều độc lập. Khi tồn kho tính ở cấp kiểu áo, số liệu luôn đẹp nhưng không dùng được để trả lời khách. Quản lý tồn theo tổ hợp mã + size + màu là điều kiện để nhân viên không phải đi đếm kệ.</p>
<h2>Tồn kho theo mùa là vấn đề dòng tiền</h2>
<p>Áo thu về giữa mùa chiếm phần lớn vốn nằm im. Nếu nhập theo cảm tính, một nửa vốn nằm trong mùa đã qua. Theo dõi tồn theo mùa và tỷ lệ bán theo tháng giúp quyết định nhập mùa sau dựa trên số thật của mùa trước, không dựa vào trí nhớ.</p>
<h2>Đổi size là chỉ số chất lượng, không phải chi phí</h2>
<p>Tỷ lệ đổi size cho biết chất lượng cỡ đo của từng mẫu. Mẫu nào có tỷ lệ đổi cao nên sửa bảng thông số hoặc ngừng nhập. Ghi nhận lý do đổi trả giúp tìm ra nguyên nhân thật thay vì quy cho "khách mua rồi đổi".</p>
<h2>Báo cáo mặt hàng bán chạy theo size</h2>
<p>Không phải mọi size đều bán như nhau. Báo cáo theo size cho biết size nào hết nhanh và size nào tồn lâu — cơ sở để đặt số lượng nhập cho mùa sau chính xác hơn.</p>`,
  links: ['thoiTrang', 'kho'],
  related: [
    ['phan-mem-quan-ly-shop-thoi-trang-giai-phap-toan-dien-cho-kinh-doanh-hieu-qua', 'Phần mềm quản lý shop thời trang giải pháp toàn diện cho kinh doanh hiệu quả'],
    ['phan-mem-quan-ly-kho-quan-ao-hieu-qua-nhat-cho-cua-hang-thoi-trang', 'Phần mềm quản lý kho quần áo hiệu quả nhất cho cửa hàng thời trang'],
  ],
});

page({
  slug: 'quan-ly-tiem-cat-toc.html',
  title: 'Quản lý tiệm cắt tóc: lịch thợ, ca, bán thêm dịch vụ',
  desc: 'Quy trình quản lý tiệm cắt tóc: xếp lịch theo thợ và thời lượng, đo doanh thu theo từng người, theo dõi tồn thuốc nhuộm và sản phẩm chăm sóc.',
  h1: 'Tiệm cắt tóc: xếp lịch theo thợ, đo doanh thu theo từng người',
  lead: 'Tiệm cắt tóc có nhiều thợ, mỗi thợ một tay nghề và một tệp khách riêng. Doanh thu của tiệm là tổng của các tệp khách đó, nên không đo được từng thợ thì không biết ai đang làm tốt và ai cần hỗ trợ.',
  body: `<h2>Lịch hẹn gắn với thợ và thời lượng</h2>
<p>Đặt lịch theo thợ chứ không theo giờ trống. Mỗi kiểu tóc có thời lượng riêng, và một thợ có thể nhận nhiều việc nếu xếp đúng khoảng trống. Lịch sai một phút ở cuối ca là cả ca bị dồn.</p>
<h2>Đo doanh thu theo từng thợ</h2>
<p>Doanh thu thợ cần tách phần dịch vụ và phần sản phẩm bán kèm. Biết thợ nào bán được sản phẩm kèm giúp điều chỉnh tư vấn, và biết thợ nào có doanh thu thấp so với số giờ làm việc để cân nhắc lại lịch phân ca.</p>
<h2>Tồn thuốc nhuộm và sản phẩm chăm sóc</h2>
<p>Thuốc nhuộm có số hiệu màu cụ thể; sản phẩm chăm sóc có hạn. Tồn kho theo mã màu nhuộm giúp biết màu nào sắp hết trước khi khách chọn — một chi tiết nhỏ nhưng tạo ra cảm giác chuyên nghiệp.</p>
<h2>Khách quay lại là chỉ số quan trọng nhất</h2>
<p>Tiệm tóc không có sản phẩm mua một lần. Khách quay lại là toàn bộ giá trị của tiệm. Ghi lịch quay lại theo thời gian thực tế (khoảng 6–8 tuần với tóc nữ) giúp biết cần nhắc khách trước khi họ tìm tiệm khác.</p>`,
  links: ['salon', 'spa'],
  related: [
    ['phan-mem-quan-ly-tiem-cat-toc-offline-6-tinh-nang', 'Phần Mềm Quản Lý Tiệm Cắt Tóc Offline: 6 Tính Năng Giữ Khách Quay'],
    ['bi-quyet-mo-tiem-cat-toc-thanh-cong-huong-dan-toan-dien-tu-a-z', 'Bí quyết mở tiệm cắt tóc thành công: hướng dẫn toàn diện từ A-Z'],
  ],
});

page({
  slug: 'quan-ly-the-thanh-vien-va-diem-thuong.html',
  title: 'Quản lý thẻ thành viên và điểm thưởng: hạn thẻ, điểm, giữ khách',
  desc: 'Quy trình quản lý thẻ thành viên tích điểm: quy đổi điểm, hạn thẻ, theo dõi tần suất mua, chương trình ưu đãi theo nhóm khách.',
  h1: 'Thẻ thành viên và điểm thưởng: quy đổi điểm, hạn thẻ, giữ khách',
  lead: 'Chương trình thẻ thành viên thường hỏng vì một lý do duy nhất: không ai biết khách đã tích bao nhiêu và đổi được gì. Điểm không quy đổi được thì không phải điểm, chỉ là con số vô nghĩa trên thẻ.',
  body: `<h2>Quy tắc quy đổi phải công khai và đơn giản</h2>
<p>Một điểm ăn bao nhiêu tiền, quy đổi thành phiếu giảm giá hay giảm trực tiếp, còn hiệu lực bao lâu — ba câu hỏi này khách hỏi ngay khi phát thẻ. Trả lời được rõ thì thẻ có giá trị; trả lời mơ hồ thì khách không dùng, và chương trình trở thành chi phí in thẻ.</p>
<h2>Điểm phải được cộng đúng vào ngày mua</h2>
<p>Điểm cộng theo tổng đơn thì dễ sai khi có nhiều dòng, hoặc khi khách hủy một dòng. Nếu điểm được ghi kèm hoá đơn, khách tự kiểm được và không phải gọi đi hỏi. Mỗi lần hủy đơn phải trừ lại đúng số điểm đã cộng.</p>
<h2>Hạn thẻ và cảnh báo trước</h2>
<p>Thẻ có hạn thì phải biết trước. Gửi thông báo nhắc gia hạn trước một tháng là cách giữ khách cũ mà không tốn chi phí quảng cáo. Đồng thời, số thẻ đã quá hạn không được cộng điểm là lỗi phổ biến gây mất niềm tin nếu khách phát hiện.</p>
<h2>Đo chương trình bằng tần suất mua</h2>
<p>Doanh thu từ khách thành viên không đủ để đánh giá chương trình. Cần đo tần suất mua của nhóm thành viên so với nhóm không thành viên, và tỷ lệ quay lại trong 90 ngày. Nếu hai nhóm gần bằng nhau, chương trình đang tốn tiền mà không tạo ra hành vi khác biệt.</p>`,
  links: ['the', 'pos'],
  related: [
    ['bi-quyet-quan-ly-diem-thuong-khach-hang-hieu-qua-de-tang-doanh-thu', 'Bí quyết quản lý điểm thưởng khách hàng hiệu quả để tăng doanh thu'],
    ['quan-ly-cong-no-khach-hang', 'Quản lý công nợ khách hàng: hạn mức tín dụng, hạn trả nợ, thu hồi'],
  ],
});
