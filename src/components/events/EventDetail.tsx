import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
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
          <dd>{formatDate(event.date)}, {event.time}</dd>
          
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          
          <dt>Kontenjan</dt>
          <dd>{event.capacity || "Belirtilmemiş"} kişi</dd>
        </dl>
        <p><strong>Açıklama:</strong> {event.description}</p>
        <br />
        <button className="link-button" onClick={onBack}>&larr; Listeye dön</button> | 
        <button className="link-button" onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
      </div>
    </div>
  );
}

export default EventDetail;