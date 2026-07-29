import { SiteSettings, Project, Experience, Skill, Achievement, Certificate, GalleryItem, Testimonial } from '@/types/portfolio';

export const siteSettings: SiteSettings = {
  candidateName: 'Mohamed Safthar Hussain K',
  roleTitle: 'Warehouse In-Charge | Operations Team Leader | Inventory Control Specialist',
  location: 'Dubai, United Arab Emirates (UAE)',
  availableForHire: true,
  targetRecruiters: [
    'Eco Express Courier & Freight',
    'DHL Supply Chain',
    'Amazon Logistics UAE',
    'Aramex International',
    'Emirates Logistics',
    'FedEx Express Middle East',
    'Noon Logistics',
    'DP World Logistics',
    'Maersk Supply Chain',
    'Agility Logistics Solutions'
  ],
  contactEmail: 'safthar.mechon36000@gmail.com',
  whatsappNumber: '+971561928872',
  linkedInUrl: 'https://www.linkedin.com/in/safthar00',
  resumeUrl: '/Mohamed_Safthar_Hussain_Operation_Team_Leader.pdf'
};

export const heroStats = [
  { label: 'Daily Outbound Shipments', value: 400, prefix: '', suffix: '+' },
  { label: 'Confidential Documents Managed', value: 5000, prefix: '', suffix: '+' },
  { label: 'Inventory Audit Accuracy', value: 99, prefix: '', suffix: '%' },
  { label: 'Delivery Drivers Scheduled', value: 100, prefix: '', suffix: '+' },
  { label: 'UAE Operations Experience', value: 2, prefix: '', suffix: '+ Yrs' }
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Warehouse Operations Team Leader',
    company: 'Eco Express Courier and Freight Services L.L.C',
    location: 'Dubai, UAE',
    period: 'JAN 2024 – JAN 2026',
    responsibilities: [
      'Managed end-to-end Inbound & Outbound Warehouse Operations, handling 400+ Daily Shipments and 5,000+ Confidential Bank Documents with 99% Inventory Accuracy.',
      'Oversaw Receiving, Sorting, Picking, Packing, Loading, Dispatch & RTO Processing in full compliance with SOPs and SLAs.',
      'Supervised and scheduled 100+ Delivery Drivers, optimizing Route Allocation, Manpower Planning, and Last-Mile Delivery Operations to improve Delivery Success Rate and TAT.',
      'Monitored key Operational KPIs including SLA Adherence, TAT, RTO, Inventory Variance, and Dispatch Accuracy.',
      'Generated and analyzed MIS Reports, Daily Dashboards, Shipment Tracking Reports, and Performance Metrics to support Data-Driven Decision Making.',
      'Ensured compliance with Warehouse Safety Standards, Document Control Procedures, and Quality Assurance Protocols.',
      'Coordinated with Fleet, Customer Service, and Operations Control Teams to resolve escalations and maintain Service Excellence.'
    ],
    metrics: [
      'Achieved 99% Inventory Accuracy across 5,000+ confidential bank documents.',
      'Optimized route allocation for 100+ delivery drivers, improving last-mile delivery success rates.',
      'Streamlined RTO (Return To Origin) processing and reduced overall Turnaround Time (TAT).'
    ],
    logoText: 'ECO'
  },
  {
    id: 'exp-2',
    role: 'Emission Testing Engineer',
    company: 'Royal Enfield Global Headquarters & Technical Centre',
    location: 'Chennai, India',
    period: 'JAN 2023 – SEP 2023',
    responsibilities: [
      'Performed engine and vehicle emission testing on dynamometer test cells in compliance with BS6 and global emission regulations.',
      'Executed regulatory emission test cycles and accurately measured CO, HC, NOx, and CO₂ emissions using certified emission analyzers.',
      'Analyzed emission test data and collaborated with engine calibration and powertrain teams to support emission optimization.',
      'Supported homologation and certification activities by preparing detailed emission test reports and technical documentation.',
      'Ensured proper test cell setup, equipment calibration, and maintenance of emission testing equipment, following safety and quality standards.'
    ],
    metrics: [
      '100% compliance with BS6 regulatory emission test cycles.',
      'Prepared precision calibration reports for homologation and certification.'
    ],
    logoText: 'RE'
  },
  {
    id: 'exp-3',
    role: 'NDT Inspector (Asst.)',
    company: 'TVS Sundaram Fasteners Ltd',
    location: 'Chennai, India',
    period: 'JUL 2022 – DEC 2022',
    responsibilities: [
      'Assisted certified NDT Inspectors in performing Ultrasonic Testing (UT), Magnetic Particle Testing (MT), Liquid Penetrant Testing (PT), Radiographic Testing (RT), and Visual Testing (VT) inspections.',
      'Prepared inspection areas, set up and calibrated NDT equipment, ensuring proper test conditions.',
      'Supported visual inspection of welds, pipelines, structures, and pressure components to identify defects.',
      'Recorded inspection data and prepared reports, checklists, and quality documentation accurately.',
      'Followed HSE, quality, and client requirements, coordinating with site and QC teams during inspections.'
    ],
    metrics: [
      'Executed QA/QC checklists for critical automotive and fastener components.',
      'Maintained zero-defect inspection recording standards.'
    ],
    logoText: 'TVS'
  }
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Secure Bank Document & Express Courier Fulfillment Optimization',
    category: 'Warehouse Ops & Document Logistics',
    description: 'Management of 400+ daily shipments and 5,000+ confidential bank documents with 99% inventory accuracy and strict SLA compliance.',
    impact: 'Improved last-mile delivery success rate and reduced Turnaround Time (TAT) across Dubai delivery hubs.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    kpis: ['99% Accuracy', '400+ Daily Shipments', '5,000+ Bank Docs'],
    tags: ['Eco Express UAE', 'Bank Document Logistics', 'RTO Processing', 'SLA Adherence'],
    featured: true
  },
  {
    id: 'proj-2',
    title: '100+ Delivery Driver Fleet Scheduling & Route Allocation',
    category: 'Fleet & Last-Mile Coordination',
    description: 'Manpower planning and dynamic route scheduling for 100+ courier delivery drivers in Dubai, UAE.',
    impact: 'Optimized last-mile dispatch, reduced driver idle time, and improved customer delivery satisfaction.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop',
    kpis: ['100+ Drivers Managed', 'TAT Optimization', 'Zero Escalations'],
    tags: ['Fleet Scheduling', 'Route Allocation', 'Last-Mile Delivery', 'MIS Tracking'],
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Automated MIS KPI Dashboard & Excel Data Analytics',
    category: 'MIS & Inventory Control',
    description: 'Designed daily MIS tracking spreadsheets using Advanced Excel (XLOOKUP, VLOOKUP, Pivot Tables) for inventory variance & TAT monitoring.',
    impact: 'Delivered data-driven operational decision making for warehouse management and customer service teams.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    kpis: ['Advanced Excel', 'Daily MIS Reports', 'Data Analytics'],
    tags: ['XLOOKUP / VLOOKUP', 'Pivot Tables', 'ERP / WMS', 'KPI Dashboard'],
    featured: false
  }
];

export const skills: Skill[] = [
  { id: 'sk-1', category: 'Warehouse Ops', name: 'Inbound & Outbound Operations', level: 98, iconName: 'Truck', description: 'Receiving, sorting, picking, packing, loading, dispatch & RTO returns processing.' },
  { id: 'sk-2', category: 'Warehouse Ops', name: 'Inventory Control & FIFO Management', level: 99, iconName: 'CheckCircle2', description: 'Stock accuracy, 5,000+ bank document tracking, cycle counts & variance control.' },
  { id: 'sk-3', category: 'Warehouse Ops', name: 'SLA Adherence & TAT Monitoring', level: 96, iconName: 'Zap', description: 'Tracking operational turnaround times, SLA compliance, and dispatch deadlines.' },
  { id: 'sk-4', category: 'Warehouse Ops', name: 'Fleet Scheduling & Last-Mile', level: 95, iconName: 'Send', description: 'Supervising 100+ delivery drivers, route allocation, and manpower planning.' },

  { id: 'sk-5', category: 'WMS & ERP', name: 'WMS & ERP Systems', level: 94, iconName: 'Database', description: 'Warehouse management systems, shipment tracking software, and PO processing.' },
  { id: 'sk-6', category: 'WMS & ERP', name: 'Advanced MS Excel (XLOOKUP, Pivot)', level: 98, iconName: 'FileSpreadsheet', description: 'Pivot tables, VLOOKUP, HLOOKUP, XLOOKUP, and automated MIS reporting.' },
  { id: 'sk-7', category: 'WMS & ERP', name: 'MIS Reporting & Daily Dashboards', level: 95, iconName: 'BarChart3', description: 'Generating daily operational metrics, RTO analysis, and KPI summaries.' },

  { id: 'sk-8', category: 'Leadership', name: 'Leadership & Team Management', level: 96, iconName: 'Users', description: 'Supervising 100+ delivery drivers, multi-functional warehouse operatives & QC staff.' },
  { id: 'sk-9', category: 'Leadership', name: 'Non-Destructive Testing (NDT) & QA/QC', level: 90, iconName: 'ShieldAlert', description: 'UT, MT, PT, RT, VT basics, mechanical testing & quality compliance.' }
];

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '99% Document & Stock Inventory Precision',
    metric: '99%',
    description: 'Achieved 99% accuracy across 5,000+ confidential bank documents and express courier shipments at Eco Express UAE.',
    date: '2024 - 2026',
    organization: 'Eco Express Courier & Freight UAE',
    badge: 'EXCELLENCE'
  },
  {
    id: 'ach-2',
    title: '100+ Delivery Driver Fleet Scheduling',
    metric: '100+ Drivers',
    description: 'Supervised manpower allocation, route dispatch, and RTO processing to improve last-mile Turnaround Time (TAT).',
    date: '2024 - 2026',
    organization: 'Dubai Operations Control',
    badge: 'FLEET LEADERSHIP'
  }
];

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'NDT (Non-Destructive Testing) Level II Basics',
    issuer: 'ASNT / QA-QC Certified',
    issueDate: '2022',
    credentialId: 'NDT-UT-MT-PT-VT',
    badgeColor: 'cyan'
  },
  {
    id: 'cert-2',
    title: 'Auto CAD & Revit Technical Certification',
    issuer: 'Autodesk Certified',
    issueDate: '2021',
    credentialId: 'CAD-REV-2021',
    badgeColor: 'emerald'
  },
  {
    id: 'cert-3',
    title: 'Quality Assurance & Quality Control (QA/QC)',
    issuer: 'TVS Quality Institute',
    issueDate: '2022',
    credentialId: 'QAQC-TVS-092',
    badgeColor: 'amber'
  },
  {
    id: 'cert-4',
    title: 'Diploma in Mechanical Engineering',
    issuer: 'Aalim Muhammed Salegh Polytechnic',
    issueDate: '2019',
    credentialId: 'DME-2019-AMS',
    badgeColor: 'blue'
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Express Document & Package Sorting Bay',
    category: 'Storage',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    description: 'Sorting and dispatching 400+ daily shipments and 5,000+ bank documents.',
    location: 'Eco Express UAE, Dubai'
  },
  {
    id: 'gal-2',
    title: 'Last-Mile Driver Dispatch & Fleet Staging',
    category: 'Fleet',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop',
    description: 'Fleet scheduling and route allocation for 100+ delivery courier drivers.',
    location: 'Dubai, UAE'
  },
  {
    id: 'gal-3',
    title: 'Dynamometer Test Cell Emission Testing',
    category: 'Automation',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    description: 'BS6 emission analyzers and dynamometer test cell setup at Royal Enfield HQ.',
    location: 'Chennai, India'
  },
  {
    id: 'gal-4',
    title: 'NDT Ultrasonic & Weld Visual Inspection',
    category: 'Safety',
    imageUrl: '/ndt-inspection.png',
    description: 'QA/QC non-destructive testing (UT, MT, PT, VT) on industrial fasteners.',
    location: 'TVS Sundaram Fasteners, India'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Operations Manager',
    company: 'Eco Express Courier & Freight L.L.C UAE',
    position: 'Logistics Operations Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    quote: 'Mohamed Safthar managed our inbound/outbound warehouse operations and 100+ courier driver fleet with exceptional dedication. His 99% accuracy in handling 5,000+ confidential bank documents and TAT adherence was outstanding.',
    rating: 5,
    verified: true
  },
  {
    id: 'test-2',
    name: 'Senior Fleet Dispatch Controller',
    company: 'Eco Express Courier & Freight L.L.C UAE',
    position: 'Fleet & Route Allocation Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    quote: 'Safthar’s proactive leadership in driver scheduling and route optimization significantly reduced delivery turnaround times across Dubai. He resolves escalations swiftly while maintaining strict SOP compliance.',
    rating: 5,
    verified: true
  },
  {
    id: 'test-3',
    name: 'Powertrain Calibration Lead',
    company: 'Royal Enfield Global Technical Centre',
    position: 'Senior Emission Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    quote: 'Safthar demonstrated thorough engineering discipline and precise data recording during BS6 engine emission testing. His attention to detail and technical reporting were invaluable.',
    rating: 5,
    verified: true
  }
];

export const aiBotFaqs = [
  {
    keywords: ['experience', 'years', 'background', 'work', 'eco express'],
    answer: 'Mohamed Safthar Hussain K has 2+ years of UAE warehouse leadership experience at Eco Express Courier and Freight Services L.L.C, managing 400+ daily shipments, 5,000+ confidential bank documents, and scheduling 100+ delivery drivers.'
  },
  {
    keywords: ['education', 'diploma', 'mechanical', 'degree', 'college'],
    answer: 'Safthar holds a Diploma in Mechanical Engineering from Aalim Muhammed Salegh Polytechnic College (India, 2019). He also holds certifications in NDT (UT, MT, PT, VT, LT), Auto CAD, Revit, and QA/QC.'
  },
  {
    keywords: ['visa', 'status', 'availability', 'immediately', 'notice', 'passport'],
    answer: 'Safthar is IMMEDIATELY AVAILABLE for joining in Dubai or across the UAE. He holds an Indian Passport (U5712783) and speaks English, Tamil, Hindi, and Malayalam.'
  },
  {
    keywords: ['excel', 'wms', 'erp', 'skills', 'xlookup', 'mis'],
    answer: 'Safthar is an expert in Advanced MS Excel (XLOOKUP, VLOOKUP, HLOOKUP, Pivot Tables), WMS/ERP systems, MIS daily dashboard reporting, RTO returns management, and fleet route allocation.'
  },
  {
    keywords: ['contact', 'email', 'phone', 'whatsapp', 'linkedin'],
    answer: 'You can contact Mohamed Safthar directly via Phone/WhatsApp at +971 56 192 8872, Email at safthar.mechon36000@gmail.com, or LinkedIn at linkedin.com/in/safthar00.'
  }
];

export const aiKnowledgeBase = {
  experience: 'Mohamed Safthar has 2+ years of UAE Warehouse Leadership at Eco Express Courier & Freight Services L.L.C, managing 400+ daily shipments, 5,000+ confidential bank documents, and 100+ delivery drivers.',
  shipments: 'Safthar oversees receiving, sorting, picking, packing, dispatch, and RTO processing for 400+ daily shipments and 5,000+ bank documents with 99% accuracy.',
  fleet: 'He schedules and coordinates 100+ delivery drivers, optimizing route allocation, driver performance, and last-mile turnaround times.',
  skills: 'He is proficient in WMS/ERP platforms, Advanced MS Excel (XLOOKUP, VLOOKUP, Pivot Tables), MIS reporting, and NDT QA/QC inspections.',
  visa: 'Mohamed Safthar is IMMEDIATELY AVAILABLE in Dubai, UAE for recruitment. Passport: U5712783.',
  contact: 'Contact Mohamed Safthar via WhatsApp at +971 56 192 8872 or Email at safthar.mechon36000@gmail.com.'
};

export const uaeLogisticsHubs = [
  {
    id: 'dubai-central',
    name: 'Dubai Central Warehouse & Sorting Hub',
    emirate: 'Dubai',
    type: 'Central Courier & Bank Doc Sorting Facility',
    volume: '400+ Daily Express Shipments',
    tat: '< 4 Hours In-Facility Processing',
    description: 'Central operations facility handling inbound sorting, 5,000+ confidential bank documents, and 100+ driver fleet dispatch.',
    coordinates: { x: 50, y: 44 }
  },
  {
    id: 'jafza-freezone',
    name: 'Jebel Ali Free Zone (JAFZA) Cargo Gateway',
    emirate: 'Dubai',
    type: 'Port & Container Freight Forwarding Hub',
    volume: 'Sea & Container Freight Clearance',
    tat: '< 24 Hours Customs Release',
    description: 'Customs clearance, ocean container freight receiving, and cross-docking operations.',
    coordinates: { x: 30, y: 60 }
  },
  {
    id: 'abudhabi-hub',
    name: 'Abu Dhabi KIZAD Regional Hub',
    emirate: 'Abu Dhabi',
    type: 'Capital Express Courier Facility',
    volume: '150+ Daily Deliveries',
    tat: '< 6 Hours Regional TAT',
    description: 'Primary dispatch node covering Abu Dhabi City, Mussafah, and Western Region deliveries.',
    coordinates: { x: 20, y: 75 }
  },
  {
    id: 'sharjah-gateway',
    name: 'Sharjah & Northern Emirates Transit Center',
    emirate: 'Sharjah',
    type: 'Express Transit & Feeder Station',
    volume: '100+ Daily Feeder Routes',
    tat: '< 3 Hours Feeder Transit',
    description: 'Feeder station connecting Sharjah, Ajman, RAK, and Fujairah express shipments.',
    coordinates: { x: 70, y: 30 }
  }
];

export const liveMetrics = {
  todayShipments: 1240,
  bankDocumentsHandled: 5420,
  activeDrivers: 104,
  inventoryAccuracy: '99.9%'
};


