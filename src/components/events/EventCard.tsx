import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>
        {event.category}<br/>
        Tarih: {formatDate(event.date)}, {event.time}<br/>
        Yer: {event.location}<br/>
        Kontenjan: {event.capacity || "Belirtilmemiş"} kişi
      </p>
      <p>{event.description}</p>
      <button className="link-button" onClick={() => onShowDetail(event.id)}>
        Detayları gör &rarr;
      </button>
    </article>
  );
}

export default EventCard;