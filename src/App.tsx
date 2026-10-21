import { useState, useEffect } from 'react';
import type { PageName } from "./types/page";
import { events } from './data/events';
import { filterEvents } from './utils/filter-events';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import EventList from './components/events/EventList';
import EventFilter from './components/events/EventFilter';
import EventDetail from './components/events/EventDetail';
import EventForm from './components/forms/EventForm';

function App() {
  const [page, setPage] = useState<PageName>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    const titles: Record<PageName, string> = {
      home: 'Kampüs Etkinlikleri',
      events: 'Tüm Etkinlikler',
      detail: 'Etkinlik Detayı',
      add: 'Etkinlik Ekle',
      update: 'Etkinlik Güncelle'
    };
    document.title = titles[page];
  }, [page]);

  const go = (newPage: PageName, id: string | null = null) => {
    setPage(newPage);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };
  const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filteredEvents = filterEvents(events, searchText, category);
  const categories = Array.from(new Set(events.map(e => e.category)));
  const selectedEvent = events.find(e => e.id === selectedId);

  let headerTitle = "Kampüs Etkinlikleri";
  if (page === 'events') headerTitle = "Tüm Etkinlikler";
  else if (page === 'detail' && selectedEvent) headerTitle = selectedEvent.title;
  else if (page === 'detail') headerTitle = "Etkinlik Bulunamadı";
  else if (page === 'add') headerTitle = "Etkinlik Ekle";
  else if (page === 'update') headerTitle = "Etkinlik Güncelle";

  return (
    <>
      <Header title={headerTitle}>
        <Navigation current={page} onNavigate={(p) => go(p)} />
      </Header>

      <main>
        {page === 'home' && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 etkinlik</h2>
            <EventList 
              events={upcomingEvents} 
              onShowDetail={(id) => go('detail', id)} 
              limit={2} 
            />
            <br />
            <button className="link-button" onClick={() => go('events')}>Tüm etkinlikleri gör &rarr;</button>
          </>
        )}
        {page === 'events' && (
          <>
            <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>
            <EventFilter 
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchTerm}
              onCategoryChange={setCategory}
            />
            <p className="sonuc">{filteredEvents.length > 0 ? `${filteredEvents.length} etkinlik listeleniyor.` : 'Aramanıza uygun etkinlik bulunamadı.'}</p>
            <EventList 
              events={filteredEvents} 
              onShowDetail={(id) => go('detail', id)} 
            />
          </>
        )}
        {page === 'detail' && (
          <>
            {selectedEvent ? (
              <EventDetail 
                event={selectedEvent} 
                onBack={() => go('events')} 
                onEdit={(id) => go('update', id)} 
              />
            ) : (
              <>
                <div className="hata-kutu">
                  "{selectedId || 'Bilinmeyen'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
                </div>
                <br />
                <button className="link-button" onClick={() => go('events')}>&larr; Listeye dön</button>
              </>
            )}
          </>
        )}
        {(page === 'add' || page === 'update') && (
          <>
            <p>
              {page === 'add' 
                ? "Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez." 
                : "Alanlar mevcut etkinliğin bilgileriyle dolu gelir. Bu sprintte form veriyi güncellemez."}
            </p>
            {page === 'update' && !selectedEvent ? (
              <>
                <div className="hata-kutu">
                  Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin.
                </div>
                <br />
                <button className="link-button" onClick={() => go('events')}>Etkinliklere git &rarr;</button>
              </>
            ) : (
              <EventForm 
                event={selectedEvent} 
                onSubmit={() => window.scrollTo(0,0)} 
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
export default App;