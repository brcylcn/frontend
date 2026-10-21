import type { CampusEvent } from "../../types/campus-event";

interface EventFormProps {
  event?: CampusEvent | null;
  onSubmit: () => void;
}

function EventForm({ event, onSubmit }: EventFormProps) {
  return (
    <form className="form-container" onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
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

      <button type="submit" className="btn-primary">{!event ? 'Kaydet' : 'Güncelle'}</button>
    </form>
  );
}

export default EventForm;