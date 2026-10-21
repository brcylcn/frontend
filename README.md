Canlı site: https://frontend-bay-gamma-uhwb3rbx47.vercel.app/

# Kampüs Etkinlikleri · Sprint 5 (React Bileşenleri)

Burcu Yalçın · C2221031010

Sprint 3'teki 5 sayfalık site React + TypeScript ile yeniden yazıldı (Sprint 4). Sprint 5'te tek büyük App.tsx, her biri kendi dosyasında olan 9 bileşene bölündü. Bileşenler veriyi props ile alır, olayları callback ile App'e bildirir; state App'te kalır (lifting state).

## Dosyalar

| Dosya | Görevi |
| --- | --- |
| `package.json` | Projenin adını, komutlarını (dev, build, preview) ve kullanılan paketleri tutar. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kaydeder, herkes aynı sürümü kurar. |
| `node_modules/` | `npm install` ile indirilen paketler; GitHub'a gönderilmez. |
| `tsconfig*.json` | TypeScript'in hangi kurallarla kontrol yapacağını belirler. |
| `vite.config.ts` | Vite ayarları; React eklentisi burada tanımlıdır. |
| `index.html` | Tek HTML sayfası; React uygulaması içindeki `div#root`'a çizilir. |
| `src/main.tsx` | React'i başlatır ve `App` bileşenini `root`'a çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın hepsi burada. |
| `src/App.css` | Sprint 3'teki CSS (C2221031010.css) ve React sürümü için küçük eklemeler. |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `public/` | Olduğu gibi kopyalanan dosyalar (afis.jpeg). |
| `src/types/campus-event.ts` | Bir etkinliğin tipi (`CampusEvent`) ve 4 kategoriden oluşan `Category` tipi. |
| `src/data/events.ts` | 6 etkinliğin tipli verisi. |
| `src/utils/filter-events.ts` | Arama, kategori filtresi ve id ile bulma yapan saf fonksiyonlar. |

## Bileşenler (Sprint 5)

| Bileşen | Props | Görevi |
| --- | --- | --- |
| `layout/Header.tsx` | `title`, `text?` | Sayfa başlığı ve isteğe bağlı alt yazı |
| `layout/Navigation.tsx` | `current`, `onNavigate` | Menü; aktif sayfayı işaretler, tıklamayı App'e bildirir |
| `layout/Footer.tsx` | (yok) | Sayfa altı |
| `events/EventCard.tsx` | `event`, `onShowDetail` | Tek etkinlik kartı |
| `events/EventList.tsx` | `events`, `onShowDetail`, `emptyText?`, `twoColumns?` | Kart listesi; boşsa mesaj gösterir |
| `events/EventFilter.tsx` | `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange` | Arama kutusu ve kategori seçimi (kontrollü) |
| `events/EventDetail.tsx` | `event`, `onBack`, `onEdit` | Etkinlik detayı, afiş ve künye |
| `forms/EventForm.tsx` | `onSubmit` | Ekle / Güncelle formu |
| `types/page.ts`, `utils/format-date.ts` | | Ortak `PageName` tipi ve tarih biçimlendirme |

## Çalıştırma

```bash
npm install
npm run dev
```
