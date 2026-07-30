'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Download, 
  Mail, 
  Users, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Search, 
  FileSpreadsheet, 
  CheckCircle2, 
  Building2,
  Trash2,
  Edit,
  Eye,
  X,
  RotateCcw,
  Briefcase,
  Layers,
  Award,
  Camera,
  MessageSquare,
  Settings as SettingsIcon,
  Save,
  Check
} from 'lucide-react';
import { exportToCSV } from '@/lib/utils';
import { Message, Project, Experience, Skill, Certificate, GalleryItem, Testimonial, SiteSettings } from '@/types/portfolio';
import { 
  getSiteSettings, saveSiteSettings,
  getProjects, saveProjects,
  getExperiences, saveExperiences,
  getSkills, saveSkills,
  getCertificates, saveCertificates,
  getGalleryItems, saveGalleryItems,
  getTestimonials, saveTestimonials,
  resetPortfolioDataToDefault
} from '@/lib/portfolioData';
import { fetchContactMessages, updateMessageStatus, deleteContactMessage } from '@/lib/firebase';

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    name: 'Tariq Al-Mansoori',
    email: 'tariq@emirateslogistics.ae',
    company: 'Emirates Logistics',
    phone: '+971 50 111 2222',
    subject: 'Senior Warehouse Manager Role - JAFZA',
    message: 'Safthar, we reviewed your CV and 99.8% inventory accuracy metrics. Would like to arrange an interview for our new 300k sq ft fulfillment hub.',
    date: '2026-07-28',
    read: false,
    status: 'new'
  },
  {
    id: 'msg-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@dhl.com',
    company: 'DHL Supply Chain UAE',
    phone: '+971 52 333 4444',
    subject: 'DHL Supply Chain - Lead Operations Specialist',
    message: 'Interested in your SAP EWM expertise and OSHA zero-harm safety record.',
    date: '2026-07-27',
    read: true,
    status: 'reviewed'
  },
  {
    id: 'msg-3',
    name: 'Rahul Varma',
    email: 'rahul.v@amazon.ae',
    company: 'Amazon UAE Fulfillment',
    phone: '+971 55 888 9999',
    subject: 'Inbound Dock Supervisor - DWC Hub',
    message: 'Impression by your container turnaround time reduction from 4.5h to 1.8h.',
    date: '2026-07-25',
    read: true,
    status: 'contacted'
  }
];

type AdminTab = 'leads' | 'projects' | 'experiences' | 'skills' | 'certificates' | 'gallery' | 'testimonials' | 'settings';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('leads');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data States
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadCount, setDownloadCount] = useState(142);
  
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(getSiteSettings());
  const [projectsList, setProjectsList] = useState<Project[]>(getProjects());
  const [experiencesList, setExperiencesList] = useState<Experience[]>(getExperiences());
  const [skillsList, setSkillsList] = useState<Skill[]>(getSkills());
  const [certificatesList, setCertificatesList] = useState<Certificate[]>(getCertificates());
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(getGalleryItems());
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(getTestimonials());

  // Modal Control States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [modalType, setModalType] = useState<AdminTab | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('safthar_admin_session');
      if (!session) {
        router.push('/admin/login');
        return;
      }
      setAuthenticated(true);

      // Load Firestore real-time & backup messages
      fetchContactMessages().then((data) => {
        if (data && data.length > 0) {
          setMessages(data);
        } else {
          setMessages(mockMessages);
        }
      });

      const count = parseInt(localStorage.getItem('safthar_download_count') || '142', 10);
      setDownloadCount(count);
    }
  }, [router]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-slate-400 font-mono text-xs">
        Authenticating Admin Credentials...
      </div>
    );
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('safthar_admin_session');
    }
    router.push('/admin/login');
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all portfolio content to default settings?')) {
      resetPortfolioDataToDefault();
      setSiteSettingsState(getSiteSettings());
      setProjectsList(getProjects());
      setExperiencesList(getExperiences());
      setSkillsList(getSkills());
      setCertificatesList(getCertificates());
      setGalleryList(getGalleryItems());
      setTestimonialsList(getTestimonials());
      showToast('All portfolio data reset to original defaults!');
    }
  };

  // --- CRUD HELPERS ---
  const saveItem = (type: AdminTab, formData: any) => {
    if (type === 'projects') {
      const exists = projectsList.some(p => p.id === formData.id);
      const updated = exists ? projectsList.map(p => p.id === formData.id ? formData : p) : [formData, ...projectsList];
      setProjectsList(updated);
      saveProjects(updated);
    } else if (type === 'experiences') {
      const exists = experiencesList.some(e => e.id === formData.id);
      const updated = exists ? experiencesList.map(e => e.id === formData.id ? formData : e) : [formData, ...experiencesList];
      setExperiencesList(updated);
      saveExperiences(updated);
    } else if (type === 'skills') {
      const exists = skillsList.some(s => s.id === formData.id);
      const updated = exists ? skillsList.map(s => s.id === formData.id ? formData : s) : [formData, ...skillsList];
      setSkillsList(updated);
      saveSkills(updated);
    } else if (type === 'certificates') {
      const exists = certificatesList.some(c => c.id === formData.id);
      const updated = exists ? certificatesList.map(c => c.id === formData.id ? formData : c) : [formData, ...certificatesList];
      setCertificatesList(updated);
      saveCertificates(updated);
    } else if (type === 'gallery') {
      const exists = galleryList.some(g => g.id === formData.id);
      const updated = exists ? galleryList.map(g => g.id === formData.id ? formData : g) : [formData, ...galleryList];
      setGalleryList(updated);
      saveGalleryItems(updated);
    } else if (type === 'testimonials') {
      const exists = testimonialsList.some(t => t.id === formData.id);
      const updated = exists ? testimonialsList.map(t => t.id === formData.id ? formData : t) : [formData, ...testimonialsList];
      setTestimonialsList(updated);
      saveTestimonials(updated);
    }
    setModalType(null);
    setEditingItem(null);
    showToast(`Successfully saved ${type.slice(0, -1)} item!`);
  };

  const deleteItem = (type: AdminTab, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    if (type === 'projects') {
      const updated = projectsList.filter(p => p.id !== id);
      setProjectsList(updated);
      saveProjects(updated);
    } else if (type === 'experiences') {
      const updated = experiencesList.filter(e => e.id !== id);
      setExperiencesList(updated);
      saveExperiences(updated);
    } else if (type === 'skills') {
      const updated = skillsList.filter(s => s.id !== id);
      setSkillsList(updated);
      saveSkills(updated);
    } else if (type === 'certificates') {
      const updated = certificatesList.filter(c => c.id !== id);
      setCertificatesList(updated);
      saveCertificates(updated);
    } else if (type === 'gallery') {
      const updated = galleryList.filter(g => g.id !== id);
      setGalleryList(updated);
      saveGalleryItems(updated);
    } else if (type === 'testimonials') {
      const updated = testimonialsList.filter(t => t.id !== id);
      setTestimonialsList(updated);
      saveTestimonials(updated);
    }
    showToast(`Deleted item from ${type}`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(siteSettings);
    showToast('Site & Profile Settings updated!');
  };

  // Leads Export
  const handleExportCSV = () => {
    exportToCSV(
      messages.map(m => ({
        Name: m.name,
        Email: m.email,
        Company: m.company,
        Phone: m.phone,
        Subject: m.subject,
        Message: m.message,
        Date: m.date,
        Status: m.status
      })),
      'Safthar_Recruiter_Leads'
    );
  };

  const filteredMessages = messages.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] p-4 sm:p-8">
      
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl bg-[#3B82F6] text-white font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 saas-card p-6 bg-[#141D35] border-[#283454] shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6] flex items-center justify-center text-white font-bold shadow-md">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Enterprise Operations Admin Portal
              </h1>
              <p className="text-xs font-mono text-[#CBD5E1]">
                Full Portfolio CRUD Control • Dubai Central Dispatch
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-[#0A1025] border border-[#283454] text-xs font-semibold text-[#CBD5E1] hover:text-white hover:border-[#3B82F6] transition-all"
            >
              View Public Site ↗
            </a>
            <button
              onClick={handleResetData}
              className="px-3.5 py-2 rounded-xl bg-[#0A1025] border border-[#283454] text-xs font-mono text-[#F5C242] hover:bg-[#F5C242]/10 transition-all flex items-center gap-1.5"
              title="Reset all content to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-bold text-rose-300 hover:bg-rose-500/25 flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#283454]">
          {[
            { id: 'leads', label: 'Leads & Messages', icon: Mail, count: messages.length },
            { id: 'projects', label: 'Projects', icon: Briefcase, count: projectsList.length },
            { id: 'experiences', label: 'Experience', icon: Building2, count: experiencesList.length },
            { id: 'skills', label: 'Skills', icon: Layers, count: skillsList.length },
            { id: 'certificates', label: 'Certificates', icon: Award, count: certificatesList.length },
            { id: 'gallery', label: 'Gallery', icon: Camera, count: galleryList.length },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, count: testimonialsList.length },
            { id: 'settings', label: 'Site Settings', icon: SettingsIcon, count: null },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#3B82F6] text-white shadow-lg'
                    : 'bg-[#0A1025] border border-[#283454] text-[#CBD5E1] hover:text-white hover:border-[#3B82F6]'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-[#141D35] text-[#CBD5E1]'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: RECRUITER LEADS & MESSAGES */}
        {activeTab === 'leads' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="saas-card p-6 bg-[#141D35] border-[#283454]">
                <div className="flex justify-between items-center text-xs font-mono text-[#CBD5E1] mb-2">
                  <span>RECRUITER MESSAGES</span>
                  <Mail className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <span className="text-3xl font-extrabold font-mono text-white">{messages.length}</span>
                <p className="text-[11px] text-[#22C55E] font-mono mt-2">+100% Verified Contact Inquiries</p>
              </div>

              <div className="saas-card p-6 bg-[#141D35] border-[#283454]">
                <div className="flex justify-between items-center text-xs font-mono text-[#CBD5E1] mb-2">
                  <span>PDF CV DOWNLOADS</span>
                  <Download className="w-4 h-4 text-[#22C55E]" />
                </div>
                <span className="text-3xl font-extrabold font-mono text-[#22C55E]">{downloadCount}</span>
                <p className="text-[11px] text-[#CBD5E1] font-mono mt-2">Tracked Recruiter Downloads</p>
              </div>

              <div className="saas-card p-6 bg-[#141D35] border-[#283454]">
                <div className="flex justify-between items-center text-xs font-mono text-[#CBD5E1] mb-2">
                  <span>DUBAI RECRUITER REACH</span>
                  <Users className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <span className="text-3xl font-extrabold font-mono text-white">2,040</span>
                <p className="text-[11px] text-[#3B82F6] font-mono mt-2">Unique Operations Recruiters</p>
              </div>

              <div className="saas-card p-6 bg-[#141D35] border-[#283454]">
                <div className="flex justify-between items-center text-xs font-mono text-[#CBD5E1] mb-2">
                  <span>CONVERSION RATE</span>
                  <BarChart3 className="w-4 h-4 text-[#22C55E]" />
                </div>
                <span className="text-3xl font-extrabold font-mono text-[#22C55E]">11.4%</span>
                <p className="text-[11px] text-[#CBD5E1] font-mono mt-2">Interview Invitation Rate</p>
              </div>
            </div>

            {/* Recruiter Messages Table */}
            <div className="saas-card p-6 sm:p-8 bg-[#141D35] border-[#283454] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#3B82F6]" />
                    Recruiter Inquiries & Contact Submissions
                  </h3>
                  <p className="text-xs text-[#CBD5E1]">Inbound messages from logistics hiring managers</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter recruiter..."
                      className="pl-9 pr-4 py-2.5 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white placeholder:text-slate-500 w-48 sm:w-64 focus:outline-none focus:border-[#3B82F6]"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-[#22C55E]/25 transition-all"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#283454] text-[#CBD5E1] font-mono">
                      <th className="p-3">DATE</th>
                      <th className="p-3">RECRUITER / NAME</th>
                      <th className="p-3">COMPANY</th>
                      <th className="p-3">SUBJECT</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#283454]/60">
                    {filteredMessages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-[#0A1025]/60 transition-colors">
                        <td className="p-3 font-mono text-[#CBD5E1]">{msg.date}</td>
                        <td className="p-3">
                          <div className="font-bold text-white">{msg.name}</div>
                          <div className="text-[10px] text-[#CBD5E1]">{msg.email}</div>
                        </td>
                        <td className="p-3 font-semibold text-[#3B82F6]">{msg.company}</td>
                        <td className="p-3 text-slate-300 max-w-xs truncate">{msg.subject}</td>
                        <td className="p-3">
                          <button
                            onClick={async () => {
                              const nextStatus = msg.status === 'new' ? 'reviewed' : msg.status === 'reviewed' ? 'contacted' : 'new';
                              setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: nextStatus } : m));
                              await updateMessageStatus(msg.id, nextStatus);
                              showToast(`Updated status to ${nextStatus}`);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border transition-all ${
                              msg.status === 'new' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30' : msg.status === 'reviewed' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40 hover:bg-[#3B82F6]/30' : 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40 hover:bg-[#22C55E]/30'
                            }`}
                            title="Click to toggle status"
                          >
                            {msg.status}
                          </button>
                        </td>
                        <td className="p-3 text-right flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => alert(`Recruiter Lead from ${msg.name} (${msg.company}):\n\nSubject: ${msg.subject}\n\nMessage:\n"${msg.message}"\n\nPhone: ${msg.phone}\nEmail: ${msg.email}`)}
                            className="p-2 rounded-lg bg-[#0A1025] border border-[#283454] text-[#CBD5E1] hover:text-white hover:border-[#3B82F6]"
                            title="View Message Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm('Are you sure you want to delete this lead?')) return;
                              setMessages(prev => prev.filter(m => m.id !== msg.id));
                              await deleteContactMessage(msg.id);
                              showToast('Lead message deleted');
                            }}
                            className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS CRUD */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#3B82F6]" />
                Logistics Case Studies & Projects ({projectsList.length})
              </h3>
              <button
                onClick={() => {
                  setEditingItem({
                    id: `proj-${Date.now()}`,
                    title: '',
                    category: 'Warehouse Ops & Document Logistics',
                    description: '',
                    impact: '',
                    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
                    kpis: ['99% Accuracy', '400+ Daily Shipments'],
                    tags: ['Eco Express UAE', 'Document Logistics'],
                    featured: true
                  });
                  setModalType('projects');
                }}
                className="saas-button-luxury text-xs px-4 py-2.5 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsList.map((proj) => (
                <div key={proj.id} className="saas-card p-6 bg-[#141D35] border-[#283454] flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#3B82F6] uppercase tracking-wider block mb-1">
                      {proj.category}
                    </span>
                    <h4 className="text-base font-bold text-white mb-2">{proj.title}</h4>
                    <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed mb-4">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.kpis.map((kpi, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#3B82F6]/15 text-[#3B82F6] font-mono text-[10px] font-bold">
                          {kpi}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#283454] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(proj);
                        setModalType('projects');
                      }}
                      className="p-2 rounded-lg bg-[#0A1025] border border-[#283454] text-[#CBD5E1] hover:text-white hover:border-[#3B82F6]"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('projects', proj.id)}
                      className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCES CRUD */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#3B82F6]" />
                Employment History & Roles ({experiencesList.length})
              </h3>
              <button
                onClick={() => {
                  setEditingItem({
                    id: `exp-${Date.now()}`,
                    role: '',
                    company: '',
                    location: 'Dubai, UAE',
                    period: 'JAN 2024 – PRESENT',
                    responsibilities: ['Managed warehouse inbound & outbound logistics operations.'],
                    metrics: ['Achieved 99% stock inventory precision.'],
                    logoText: 'ECO'
                  });
                  setModalType('experiences');
                }}
                className="saas-button-luxury text-xs px-4 py-2.5 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience Role</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiencesList.map((exp) => (
                <div key={exp.id} className="saas-card p-6 bg-[#141D35] border-[#283454] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#3B82F6]/15 text-[#3B82F6] font-mono text-xs font-bold">
                        {exp.period}
                      </span>
                      <span className="text-xs font-mono text-[#CBD5E1]">{exp.location}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                    <p className="text-xs font-mono text-[#22C55E] font-bold">{exp.company}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(exp);
                        setModalType('experiences');
                      }}
                      className="p-2.5 rounded-lg bg-[#0A1025] border border-[#283454] text-[#CBD5E1] hover:text-white hover:border-[#3B82F6]"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('experiences', exp.id)}
                      className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS CRUD */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#3B82F6]" />
                Technical Skills & Capabilities ({skillsList.length})
              </h3>
              <button
                onClick={() => {
                  setEditingItem({
                    id: `sk-${Date.now()}`,
                    category: 'Warehouse Ops',
                    name: '',
                    level: 95,
                    iconName: 'Truck',
                    description: ''
                  });
                  setModalType('skills');
                }}
                className="saas-button-luxury text-xs px-4 py-2.5 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsList.map((skill) => (
                <div key={skill.id} className="saas-card p-5 bg-[#141D35] border-[#283454] flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#3B82F6] font-bold uppercase">{skill.category}</span>
                    <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                    <p className="text-[11px] text-[#CBD5E1]">{skill.description}</p>
                    <div className="w-24 h-1.5 rounded-full bg-[#0A1025] overflow-hidden mt-2">
                      <div className="h-full bg-[#3B82F6]" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingItem(skill);
                        setModalType('skills');
                      }}
                      className="p-2 rounded-lg bg-[#0A1025] border border-[#283454] text-[#CBD5E1] hover:text-white"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteItem('skills', skill.id)}
                      className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CERTIFICATES CRUD */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#3B82F6]" />
                Certifications & Quality Accreditations ({certificatesList.length})
              </h3>
              <button
                onClick={() => {
                  setEditingItem({
                    id: `cert-${Date.now()}`,
                    title: '',
                    issuer: 'ASNT / QA-QC',
                    issueDate: '2024',
                    credentialId: 'CERT-ID-100',
                    badgeColor: 'blue'
                  });
                  setModalType('certificates');
                }}
                className="saas-button-luxury text-xs px-4 py-2.5 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificatesList.map((cert) => (
                <div key={cert.id} className="saas-card p-5 bg-[#141D35] border-[#283454] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#22C55E] font-bold block">{cert.issuer} • {cert.issueDate}</span>
                    <h4 className="text-base font-bold text-white mb-1">{cert.title}</h4>
                    <p className="text-xs font-mono text-[#CBD5E1]">ID: {cert.credentialId}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(cert);
                        setModalType('certificates');
                      }}
                      className="p-2 rounded-lg bg-[#0A1025] border border-[#283454] text-[#CBD5E1] hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('certificates', cert.id)}
                      className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GALLERY CRUD */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#3B82F6]" />
                Facility & Operational Gallery ({galleryList.length})
              </h3>
              <button
                onClick={() => {
                  setEditingItem({
                    id: `gal-${Date.now()}`,
                    title: '',
                    category: 'Storage',
                    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
                    description: '',
                    location: 'Dubai, UAE'
                  });
                  setModalType('gallery');
                }}
                className="saas-button-luxury text-xs px-4 py-2.5 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Image</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryList.map((item) => (
                <div key={item.id} className="saas-card p-4 bg-[#141D35] border-[#283454] space-y-3">
                  <div className="h-32 rounded-xl overflow-hidden bg-slate-900">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#3B82F6] font-bold">{item.category} • {item.location}</span>
                    <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#283454]">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setModalType('gallery');
                      }}
                      className="p-1.5 rounded bg-[#0A1025] text-[#CBD5E1]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteItem('gallery', item.id)}
                      className="p-1.5 rounded bg-rose-500/10 text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: TESTIMONIALS CRUD */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#3B82F6]" />
                Recruiter & Manager Endorsements ({testimonialsList.length})
              </h3>
              <button
                onClick={() => {
                  setEditingItem({
                    id: `test-${Date.now()}`,
                    name: '',
                    position: 'Logistics Operations Director',
                    company: 'Eco Express Courier & Freight L.L.C UAE',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
                    quote: '',
                    rating: 5,
                    verified: true
                  });
                  setModalType('testimonials');
                }}
                className="saas-button-luxury text-xs px-4 py-2.5 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Endorsement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonialsList.map((t) => (
                <div key={t.id} className="saas-card p-6 bg-[#141D35] border-[#283454] flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-[#CBD5E1] italic leading-relaxed mb-4">"{t.quote}"</p>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-[#3B82F6] font-mono">{t.position} • {t.company}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#283454]">
                    <button
                      onClick={() => {
                        setEditingItem(t);
                        setModalType('testimonials');
                      }}
                      className="p-2 rounded bg-[#0A1025] text-[#CBD5E1]"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('testimonials', t.id)}
                      className="p-2 rounded bg-rose-500/10 text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: PROFILE & SITE SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="saas-card p-6 sm:p-10 bg-[#141D35] border-[#283454] space-y-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#283454] pb-4">
              <SettingsIcon className="w-5 h-5 text-[#3B82F6]" />
              Candidate Profile & Contact Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block">CANDIDATE FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={siteSettings.candidateName}
                  onChange={(e) => setSiteSettingsState({ ...siteSettings, candidateName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block">ROLE TITLE *</label>
                <input
                  type="text"
                  required
                  value={siteSettings.roleTitle}
                  onChange={(e) => setSiteSettingsState({ ...siteSettings, roleTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block">LOCATION *</label>
                <input
                  type="text"
                  required
                  value={siteSettings.location}
                  onChange={(e) => setSiteSettingsState({ ...siteSettings, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block">CONTACT EMAIL *</label>
                <input
                  type="email"
                  required
                  value={siteSettings.contactEmail}
                  onChange={(e) => setSiteSettingsState({ ...siteSettings, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block">WHATSAPP PHONE *</label>
                <input
                  type="text"
                  required
                  value={siteSettings.whatsappNumber}
                  onChange={(e) => setSiteSettingsState({ ...siteSettings, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block">LINKEDIN URL</label>
                <input
                  type="text"
                  value={siteSettings.linkedInUrl}
                  onChange={(e) => setSiteSettingsState({ ...siteSettings, linkedInUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-[#CBD5E1] mb-2 block">RESUME PDF URL</label>
              <input
                type="text"
                value={siteSettings.resumeUrl}
                onChange={(e) => setSiteSettingsState({ ...siteSettings, resumeUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="saas-button-luxury py-3.5 px-6 text-xs font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Settings</span>
            </button>
          </form>
        )}

      </div>

      {/* DYNAMIC EDIT/CREATE MODAL DIALOG */}
      {modalType && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="saas-card p-6 sm:p-8 bg-[#141D35] border-[#283454] max-w-xl w-full my-8 space-y-6 relative">
            <div className="flex items-center justify-between border-b border-[#283454] pb-4">
              <h3 className="text-base font-bold text-white uppercase font-mono">
                {editingItem.title || editingItem.name || editingItem.role ? 'Edit Item' : 'Add New Item'} ({modalType})
              </h3>
              <button
                onClick={() => {
                  setModalType(null);
                  setEditingItem(null);
                }}
                className="p-1.5 rounded-lg bg-[#0A1025] text-[#CBD5E1] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FORM INPUTS ACCORDING TO MODAL TYPE */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              
              {/* Projects Form */}
              {modalType === 'projects' && (
                <>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">TITLE *</label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">CATEGORY</label>
                    <input
                      type="text"
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">DESCRIPTION *</label>
                    <textarea
                      rows={3}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">IMAGE URL</label>
                    <input
                      type="text"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* Experiences Form */}
              {modalType === 'experiences' && (
                <>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">ROLE TITLE *</label>
                    <input
                      type="text"
                      value={editingItem.role}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">COMPANY NAME *</label>
                    <input
                      type="text"
                      value={editingItem.company}
                      onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">PERIOD (e.g. JAN 2024 – PRESENT)</label>
                    <input
                      type="text"
                      value={editingItem.period}
                      onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* Skills Form */}
              {modalType === 'skills' && (
                <>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">SKILL NAME *</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">PROFICIENCY % (0 - 100)</label>
                    <input
                      type="number"
                      value={editingItem.level}
                      onChange={(e) => setEditingItem({ ...editingItem, level: parseInt(e.target.value, 10) || 90 })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">DESCRIPTION</label>
                    <input
                      type="text"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* Certificates Form */}
              {modalType === 'certificates' && (
                <>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">CERTIFICATE TITLE *</label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">ISSUING BODY</label>
                    <input
                      type="text"
                      value={editingItem.issuer}
                      onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">CREDENTIAL ID</label>
                    <input
                      type="text"
                      value={editingItem.credentialId}
                      onChange={(e) => setEditingItem({ ...editingItem, credentialId: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* Gallery Form */}
              {modalType === 'gallery' && (
                <>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">TITLE *</label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">IMAGE URL *</label>
                    <input
                      type="text"
                      value={editingItem.imageUrl}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">LOCATION</label>
                    <input
                      type="text"
                      value={editingItem.location}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* Testimonials Form */}
              {modalType === 'testimonials' && (
                <>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">PERSON NAME *</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">POSITION / COMPANY</label>
                    <input
                      type="text"
                      value={editingItem.position}
                      onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#CBD5E1] mb-1 block">QUOTE / FEEDBACK *</label>
                    <textarea
                      rows={3}
                      value={editingItem.quote}
                      onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1025] border border-[#283454] text-xs text-white"
                    />
                  </div>
                </>
              )}

            </div>

            <div className="pt-4 border-t border-[#283454] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalType(null);
                  setEditingItem(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0A1025] border border-[#283454] text-xs font-semibold text-[#CBD5E1]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveItem(modalType, editingItem)}
                className="saas-button-luxury px-5 py-2.5 text-xs font-bold flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
