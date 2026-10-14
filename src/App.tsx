import { useState, useEffect } from 'react';
import './App.css';
import { events } from './data/events';
import { filterEvents } from './utils/filter-events';
import { CampusEvent } from './types/event';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  // Adım 11: Side-Effect (Sekme başlığı güncelleme)
  useEffect(() => {
    if (currentPage === 'home') document.title = 'Kampüs Etkinlikleri';
    else if (currentPage === 'events') document.title = 'Tüm Etkinlikler';
    else if (currentPage === 'detail') document.title = 'Etkinlik Detayı';
    else if (currentPage === 'add') document.title = 'Etkinlik Ekle';
    else if (currentPage === 'edit') document.title = 'Etkinlik Güncelle';
  }, [currentPage]);

  const navigate = (page: string, id: string | null = null) => {
    setCurrentPage(page);
    setCurrentId(id);
    window.scrollTo(0, 0);
  };

  const formatTarih = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Etkinlik Kartı Component
  const EventCard = ({ event }: { event: CampusEvent }) => (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>{event.category}<br/>Tarih: {formatTarih(event.date)}, {event.time}<br/>Yer: {event.location}<br/>Kontenjan: {event.capacity || "Belirtilmemiş"} kişi</p>
      <p>{event.description}</p>
      <button className="link-button" onClick={() => navigate('detail', event.id)}>
        Detayları gör &rarr;
      </button>
    </article>
  );

  return (
    <>
      <header>
        <h1>
          {currentPage === 'home' && 'Kampüs Etkinlikleri'}
          {currentPage === 'events' && 'Tüm Etkinlikler'}
          {currentPage === 'detail' && 'Etkinlik Detayı'}
          {currentPage === 'add' && 'Etkinlik Ekle'}
          {currentPage === 'edit' && 'Etkinlik Güncelle'}
        </h1>
        <nav>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Ana Sayfa</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('events'); }}>Etkinlikler</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('add'); }}>Ekle</a>
        </nav>
      </header>

      <main>
        {/* Adım 9: ANA SAYFA */}
        {currentPage === 'home' && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 etkinlik</h2>
            <section className="etkinlik-listesi" data-limit="2">
              {events
                .slice()
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(0, 2)
                .map(ev => <EventCard key={ev.id} event={ev} />)}
            </section>
            <br />
            <button className="link-button" onClick={() => navigate('events')}>Tüm etkinlikleri gör &rarr;</button>
          </>
        )}

        {/* Adım 10: ETKİNLİKLER SAYFASI */}
        {currentPage === 'events' && (
          <>
            <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>
            <form className="filtre" onSubmit={e => e.preventDefault()}>
              <label htmlFor="arama">Etkinlik ara</label>
              <input 
                type="search" 
                id="arama" 
                placeholder="Örn: atölye, kariyer" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              
              <label htmlFor="kategori-filtre">Kategori</label>
              <select 
                id="kategori-filtre"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Tümü</option>
                {Array.from(new Set(events.map(e => e.category))).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </form>
            
            {(() => {
              const filtered = filterEvents(events, searchTerm, category);
              return (
                <>
                  <p>{filtered.length > 0 ? `${filtered.length} etkinlik listeleniyor.` : 'Aramanıza uygun etkinlik bulunamadı.'}</p>
                  <section className="etkinlik-listesi">
                    {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
                  </section>
                </>
              );
            })()}
          </>
        )}

        {/* Adım 12: DETAY SAYFASI */}
        {currentPage === 'detail' && (
          <>
            {(() => {
              const event = events.find(e => e.id === currentId);
              if (!event) {
                return (
                  <>
                    <div className="hata-kutu">
                      "{currentId || 'Bilinmeyen'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
                    </div>
                    <br />
                    <button className="link-button" onClick={() => navigate('events')}>&larr; Listeye dön</button>
                  </>
                );
              }
              return (
                <div className="detay-grid">
                  <div className="gorsel-alani">
                    <img src="/afis.jpeg" alt={`${event.title} Afişi`} className="afis" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Afis+Gorseli'} />
                    <p>Şekil 1: {event.title} afişi</p>
                  </div>
                  <div className="kunye-alani">
                    <h2>Etkinlik Künyesi</h2>
                    <dl>
                      <dt>Tarih</dt>
                      <dd>{formatTarih(event.date)}, {event.time}</dd>
                      
                      <dt>Yer</dt>
                      <dd>{event.location}</dd>
                      
                      <dt>Kategori</dt>
                      <dd>{event.category}</dd>
                      
                      <dt>Kontenjan</dt>
                      <dd>{event.capacity || "Belirtilmemiş"} kişi</dd>
                    </dl>
                    <p><strong>Açıklama:</strong> {event.description}</p>
                    <br />
                    <button className="link-button" onClick={() => navigate('events')}>&larr; Listeye dön</button> | 
                    <button className="link-button" onClick={() => navigate('edit', event.id)}>Bu etkinliği güncelle</button>
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {/* Adım 13: EKLE VE GÜNCELLE SAYFALARI */}
        {(currentPage === 'add' || currentPage === 'edit') && (
          <>
            <p>
              {currentPage === 'add' 
                ? "Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez." 
                : "Alanlar mevcut etkinliğin bilgileriyle dolu gelir. Bu sprintte form veriyi güncellemez."}
            </p>
            {(() => {
              const event = currentPage === 'edit' ? events.find(e => e.id === currentId) : null;
              if (currentPage === 'edit' && !event) {
                 return (
                   <>
                     <div className="hata-kutu">
                       Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin.
                     </div>
                     <br />
                     <button className="link-button" onClick={() => navigate('events')}>Etkinliklere git &rarr;</button>
                   </>
                 );
              }

              return (
                <form className="form-container" onSubmit={e => e.preventDefault()}>
                  <label htmlFor="ad">Etkinlik Adı <span className="zorunlu">*</span></label>
                  <input type="text" id="ad" name="ad" defaultValue={event?.title || ''} placeholder="Etkinlik adını girin" />

                  <label htmlFor="kategori">Kategori <span className="zorunlu">*</span></label>
                  <select id="kategori" name="kategori" defaultValue={event?.category || ''}>
                    <option value="">Seçiniz</option>
                    <option value="Seminer">Seminer</option>
                    <option value="Atölye">Atölye</option>
                    <option value="Söyleşi">Söyleşi</option>
                  </select>

                  <label htmlFor="tarih">Tarih <span className="zorunlu">*</span></label>
                  <input type="date" id="tarih" name="tarih" defaultValue={event?.date || ''} />
                  
                  <label htmlFor="saat">Saat <span className="zorunlu">*</span></label>
                  <input type="time" id="saat" name="saat" defaultValue={event?.time || ''} />

                  <label htmlFor="yer">Yer <span className="zorunlu">*</span></label>
                  <input type="text" id="yer" name="yer" defaultValue={event?.location || ''} placeholder="Örn: A Blok Konferans Salonu" />
                  
                  <label htmlFor="kontenjan">Kontenjan</label>
                  <input type="number" id="kontenjan" name="kontenjan" min="1" max="1000" defaultValue={event?.capacity || ''} />

                  <label htmlFor="aciklama">Açıklama</label>
                  <textarea id="aciklama" name="aciklama" defaultValue={event?.description || ''} placeholder="Etkinlik detayı..."></textarea>

                  <button type="submit" className="btn-primary">{currentPage === 'add' ? 'Kaydet' : 'Güncelle'}</button>
                </form>
              );
            })()}
          </>
        )}
      </main>
    </>
  );
}

export default App;
