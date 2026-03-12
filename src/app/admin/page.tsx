'use client';

import { useState, useEffect } from 'react';
import { supabase } from "@/src/lib/supabase";
import { 
  Camera, Calendar, MapPin, Send, Plus, X, 
  Loader2, Edit3, Trash2, Search, AlertCircle, CheckCircle2 
} from 'lucide-react';

export default function AdminPortal() {
  // App State
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Fetch Error:", error.message);
    if (data) setEvents(data);
    setLoading(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setPreviews([]);
    setSelectedFiles([]);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return alert("Title and Date are required!");
    setIsPublishing(true);

    try {
      let finalMediaUrls = [...previews.filter(p => p.startsWith('http'))];

      // 1. Upload New Files to Storage
      for (const file of selectedFiles) {
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const { error: storageError } = await supabase.storage
          .from('event-media')
          .upload(fileName, file);

        if (storageError) throw new Error(`Storage Error: ${storageError.message}`);

        const { data: { publicUrl } } = supabase.storage
          .from('event-media')
          .getPublicUrl(fileName);
        
        finalMediaUrls.push(publicUrl);
      }

      const eventData = {
        title,
        date,
        location,
        description,
        media: finalMediaUrls
      };

      // 2. Insert or Update Database Row
      const { error: dbError } = editingId 
        ? await supabase.from('events').update(eventData).eq('id', editingId)
        : await supabase.from('events').insert([eventData]);

      if (dbError) throw new Error(`Database Sync Error: ${dbError.message}`);

      alert(editingId ? "Update Successful!" : "Published Successfully!");
      resetForm();
      fetchEvents();
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleEdit = (event: any) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setPreviews(event.media || []);
    setSelectedFiles([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event permanently?")) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) alert("Delete failed: " + error.message);
      else fetchEvents();
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* --- INPUT FORM --- */}
        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-black text-[#000080] uppercase tracking-tighter">
              {editingId ? 'Edit Milestone' : 'New Field Update'}
            </h1>
            {editingId && (
              <button onClick={resetForm} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500">
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title (e.g. Ward Inspection)" 
              className="w-full bg-slate-50 p-6 rounded-2xl outline-none text-xl font-bold text-[#000080]"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="bg-slate-50 p-5 rounded-xl font-bold text-slate-500 outline-none"
              />
              <input 
                type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="Location / Ward" 
                className="bg-slate-50 p-5 rounded-xl font-bold outline-none"
              />
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">Media Upload</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <label className="aspect-square border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all group">
                  <Plus className="text-slate-200 group-hover:text-[#000080]" />
                  <input type="file" multiple className="hidden" onChange={handleFileChange} />
                </label>
                {previews.map((src, i) => (
                  <div key={i} className="aspect-square rounded-3xl overflow-hidden relative group">
                    <img src={src} className="w-full h-full object-cover" alt="" />
                    <button 
                      type="button" 
                      onClick={() => {
                        setPreviews(previews.filter((_, idx) => idx !== i));
                        setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i));
                      }}
                      className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-black text-[10px]"
                    >
                      REMOVE
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <textarea 
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event..." 
              className="w-full bg-slate-50 p-6 rounded-3xl min-h-[120px] outline-none font-medium text-slate-600"
            />

            <button 
              type="submit" 
              disabled={isPublishing} 
              className="w-full bg-[#000080] text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPublishing ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              {isPublishing ? 'Syncing...' : editingId ? 'Update Live Record' : 'Publish to Website'}
            </button>
          </form>
        </section>

        {/* --- MANAGEMENT & SEARCH --- */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="w-full p-5 pl-12 bg-white rounded-2xl border border-slate-100 outline-none focus:border-[#000080] font-bold"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="bg-white px-6 py-5 rounded-2xl border border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
              {filteredEvents.length} Entries
            </div>
          </div>

          <div className="grid gap-4">
            {loading ? (
              <div className="py-20 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest">Loading Records...</div>
            ) : filteredEvents.map((event) => (
              <div key={event.id} className="bg-white p-5 rounded-[2rem] flex items-center gap-6 shadow-sm border border-slate-50 hover:shadow-md transition-all">
                <img src={event.media?.[0]} className="w-16 h-16 rounded-2xl object-cover bg-slate-50" alt="" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[#000080] uppercase text-sm truncate">{event.title}</h3>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">{event.date} • {event.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(event)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-[#000080] transition-colors"><Edit3 size={16}/></button>
                  <button onClick={() => handleDelete(event.id)} className="p-3 bg-red-50 rounded-xl text-red-300 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}