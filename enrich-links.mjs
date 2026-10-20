// Thêm "Bài viết liên quan" (4 link bài viết phanmempos) vào mỗi trang sotay.
// Khớp theo TỪ KHOÁ LÕI khai tay cho từng trang (không suy đoán) → tránh link không liên quan.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const DIR = 'C:/tmp/sotay';
const IDX = 'C:/Projects/Website/phanmempos/tmp-post/posts-index.tsv';
const A = 'https://www.phanmempos.com/';
const posts = readFileSync(IDX, 'utf8').split('\n').filter(Boolean).map(l => {
  const [slug, ...rest] = l.split('\t');
  return { slug, title: rest.join('\t') };
});

// từ khoá lõi cho từng trang sotay
const CORE = {
  'ban-hang-thuc-pham-dien-thoai-va-camera': ['thuc-pham', 'dien-thoai', 'camera'],
  'ban-le-offline-va-hoa-don-dien-tu': ['ban-le', 'hoa-don', 'dien-tu'],
  'ban-si-cong-no-va-quan-ly-khach-hang': ['ban-si', 'cong-no'],
  'bang-gia-va-khuyen-mai': ['bang-gia', 'khuyen-mai', 'chiet-khau'],
  'bao-cao-lai-lo-theo-mat-hang': ['bao-cao', 'loi-nhuuan', 'mat-hang'],
  'cua-hang-me-va-be-va-phu-kien': ['me-va-be', 'phu-kien'],
  'doi-chieu-tien-mat-cuoi-ca': ['doi-chieu', 'tien-mat'],
  'kiem-ke-ton-kho-dinh-ky': ['kiem-ke', 'ton-kho'],
  'kiem-soat-hao-hut-gas-va-hang-cong-kenh': ['ban-gas', 'cong-kenh'],
  'quan-ly-ban-hang-theo-gio-bida-karaoke': ['bida', 'karaoke'],
  'quan-ly-bao-hanh-va-doi-tra': ['bao-hanh', 'doi-tra'],
  'quan-ly-ca-ban-va-nhan-vien': ['ca-ban', 'nhan-vien'],
  'quan-ly-cong-no-khach-hang': ['cong-no'],
  'quan-ly-cua-hang-may-anh-va-serial': ['may-anh', 'serial'],
  'quan-ly-cua-hang-noi-that': ['noi-that'],
  'quan-ly-cua-hang-nuoc-hoa': ['nuoc-hoa'],
  'quan-ly-cua-hang-vat-lieu-xay-dung': ['vat-lieu', 'xay-dung', 'cong-trinh'],
  'quan-ly-khach-san-nha-hang': ['khach-san', 'nha-hang'],
  'quan-ly-lich-hen-spa-salon': ['lich-hen', 'spa', 'salon', 'clinic'],
  'quan-ly-phong-kham-thu-y': ['phong-kham', 'thu-y', 'clinic'],
  'quan-ly-quan-an-quan-nhau': ['quan-an', 'quan-nhau', 'nha-hang'],
  'quan-ly-quan-cafe-va-tra-sua': ['cafe', 'tra-sua'],
  'quan-ly-shop-thoi-trang': ['thoi-trang', 'shop-thoi-trang'],
  'quan-ly-sieu-thi-va-cua-hang-tap-hoa': ['sieu-thi', 'tap-hoa'],
  'quan-ly-the-thanh-vien-va-diem-thuong': ['the-thanh-vien', 'diem-thuong', 'tich-diem'],
  'quan-ly-tiem-cat-toc': ['cat-toc', 'salon-toc'],
  'quan-ly-tiem-dien-lanh-va-bao-tri': ['dien-lanh', 'bao-tri'],
  'quan-ly-tiem-hoa-tuoi': ['hoa-tuoi'],
  'quan-ly-tiem-may-do': ['may-do', 'thoi-trang'],
  'quan-ly-tiem-rua-xe-va-giat-say': ['rua-xe', 'giat-say', 'giat-ui'],
  'quan-ly-tiem-vang-bac-va-da-quy': ['vang-bac', 'da-quy'],
  'quan-ly-ton-kho-nhieu-chi-nhanh': ['ton-kho', 'chi-nhanh'],
  'quan-ly-van-hanh-chung-cho-cua-hang': ['van-hanh', 'chuoi'],
  'shop-my-pham-va-kho-mua-hang': ['my-pham', 'kho-mua-hang'],
};

const BLOCK_RE = /<h2>Bài viết liên quan<\/h2>\n<ul>\n[\s\S]*?<\/ul>\n/g;
const ANCHOR = '<p><a href="index.html">← Về trang chủ sổ tay</a></p>';

const files = readdirSync(DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
let totalAdded = 0; const skipped = [];

for (const f of files) {
  const full = path.join(DIR, f);
  const key = f.replace(/\.html$/, '');
  const core = CORE[key];
  if (!core) { skipped.push(`${f} (không có từ khoá lõi)`); continue; }

  // gỡ khối cũ nếu có (idempotent)
  let html = readFileSync(full, 'utf8').replace(BLOCK_RE, '');

  const linked = new Set([...html.matchAll(/phanmempos\.com\/([a-z0-9-]+)/g)].map(m => m[1]));
  const scored = posts
    .filter(p => !linked.has(p.slug))
    .map(p => {
      const hit = core.filter(k => p.slug.includes(k));
      return { ...p, n: hit.length, soft: /phan-mem|pos|ban-hang-offline/.test(p.slug) ? 1 : 0 };
    })
    .filter(p => p.n > 0)
    .sort((a, b) => b.soft - a.soft || b.n - a.n || a.slug.length - b.slug.length);

  const pick = scored.slice(0, 4);
  if (!pick.length) { skipped.push(`${f} (không có bài khớp)`); writeFileSync(full, html); continue; }

  const block = `<h2>Bài viết liên quan</h2>\n<ul>\n${pick.map(p => `  <li><a href="${A}${p.slug}">${p.title}</a></li>`).join('\n')}\n</ul>\n`;
  const at = html.indexOf(ANCHOR);
  if (at < 0) { skipped.push(`${f} (không có anchor)`); continue; }
  html = html.slice(0, at) + block + html.slice(at);
  writeFileSync(full, html);
  totalAdded += pick.length;
  console.log(f, '->', pick.map(p => p.slug).join(' | '));
}
console.log('\ntổng link thêm:', totalAdded);
console.log('bỏ qua:', skipped.join('; ') || '(không)');
