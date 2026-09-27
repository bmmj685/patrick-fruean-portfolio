export type Project = {
  slug: string;
  title: string;
  category: "Full-stack" | "Software" | "Networking" | "Concept";
  status: string;
  period: string;
  summary: string;
  challenge: string;
  solution: string;
  role: string;
  technologies: string[];
  highlights: string[];
  accent: string;
  featured?: boolean;
};

export const profile = {
  name: "Patrick Fruean",
  location: "Samoa • The University of the South Pacific, Fiji",
  email: "patrickfruean.dev@gmail.com",
  phone: "7130621",
  headline:
    "Computer Science Student | Full-Stack Developer | Networking & Systems | Aspiring Cybersecurity Professional",
  shortHeadline:
    "Computer Science Student | Full-Stack Developer | Future Cybersecurity Professional",
  summary:
    "I build practical, database-backed software while developing a deeper understanding of the networks, operating systems, and security principles beneath it.",
  cvPath: "/documents/Patrick_Fruean_CV_2026_Updated.docx",
};

export const skillGroups = [
  {
    title: "Frontend",
    description: "Responsive, accessible interfaces for real workflows.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Bootstrap", "React", "Next.js", "Vite"],
  },
  {
    title: "Backend",
    description: "Structured application logic, authentication, and APIs.",
    skills: ["PHP", "Laravel", "Java", "Java RMI", "Python", "REST / API concepts", "CRUD", "Authentication"],
  },
  {
    title: "Databases",
    description: "Relational modelling and data-driven application design.",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Aiven MySQL", "SQL", "Schema design", "Laravel migrations"],
  },
  {
    title: "Networks & security",
    description: "A systems-level foundation for reliable, security-aware software.",
    skills: ["TCP/IP", "IPv4", "Subnetting", "VLSM", "NAT", "ACLs", "Routing", "Wireshark", "Cisco Packet Tracer"],
  },
  {
    title: "Systems & distributed computing",
    description: "From process scheduling to concurrent client/server systems.",
    skills: ["Linux", "Windows Server 2022", "VirtualBox", "Operating systems", "Concurrency", "Thread pools", "Distributed systems"],
  },
  {
    title: "Cloud & developer tools",
    description: "Modern collaborative development and deployment workflows.",
    skills: ["Git", "GitHub", "GitHub Codespaces", "VS Code", "Composer", "npm", "NetBeans", "Environment variables", "Deployment concepts"],
  },
] as const;

export const projects: Project[] = [
  {
    slug: "fsc-sports-facility-booking",
    title: "FSC Sports Facility Booking System",
    category: "Full-stack",
    status: "Working full-stack system",
    period: "Portfolio project",
    summary:
      "A complete sports facility discovery, availability, booking, and administration platform designed around real operational constraints.",
    challenge:
      "Facility bookings require more than a form: schedules, maintenance windows, account permissions, uploads, and conflicting reservations all need to stay consistent.",
    solution:
      "A Laravel application with role-based dashboards, transaction-safe availability checks, facility and image management, booking workflows, maintenance periods, and comprehensive validation.",
    role: "Full-stack application design and implementation",
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap", "JavaScript"],
    highlights: [
      "Customer and administrator workflows",
      "Availability and conflict prevention",
      "Facility images and maintenance scheduling",
      "Database migrations, seed data, and automated tests",
    ],
    accent: "cyan",
    featured: true,
  },
  {
    slug: "zero-tech",
    title: "Zero Tech",
    category: "Full-stack",
    status: "In development",
    period: "Personal project",
    summary:
      "An e-commerce and technology-services platform concept shaped for customers in Samoa, with a modern catalogue and secure account flows.",
    challenge:
      "Bring products and technology services into one coherent, trustworthy customer journey while keeping the underlying application maintainable.",
    solution:
      "A typed Next.js architecture with catalogue, cart, checkout, account, authentication, database, and administrative foundations designed for cloud deployment.",
    role: "Application architecture and full-stack development",
    technologies: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS"],
    highlights: [
      "Product catalogue and cart experience",
      "Account and authentication flows",
      "Administrative product workflows",
      "Cloud database and deployment-oriented architecture",
    ],
    accent: "violet",
    featured: true,
  },
  {
    slug: "distributed-java-rmi",
    title: "Distributed Java / RMI System",
    category: "Software",
    status: "Academic practical",
    period: "University coursework",
    summary:
      "A distributed client/server application exploring coordinator-worker design, remote methods, concurrency, and reliable task execution.",
    challenge:
      "Coordinate work across process boundaries while keeping concurrent operations understandable and controlled.",
    solution:
      "Java RMI interfaces and implementations with client/server separation, a coordinator/worker structure, and fixed thread pools.",
    role: "Software design and Java implementation",
    technologies: ["Java", "Java RMI", "Concurrency", "Thread pools", "NetBeans"],
    highlights: ["Remote interfaces", "Client/server architecture", "Coordinator/worker flow", "Concurrent processing"],
    accent: "amber",
  },
  {
    slug: "network-engineering-labs",
    title: "Network Engineering Labs",
    category: "Networking",
    status: "Academic labs",
    period: "University coursework",
    summary:
      "Practical network design and troubleshooting exercises spanning addressing, routing, packet inspection, and access control.",
    challenge:
      "Translate networking theory into correctly addressed, routed, and testable lab environments.",
    solution:
      "Designed and analysed topologies using subnetting, VLSM, NAT, ACLs, ICMP, TCP, routing algorithms, Packet Tracer, and Wireshark.",
    role: "Network design, configuration, and analysis",
    technologies: ["Cisco Packet Tracer", "Wireshark", "TCP/IP", "IPv4", "VLSM", "NAT", "ACLs"],
    highlights: ["IPv4 subnet planning", "Routing analysis", "Traffic inspection", "Access-control configuration"],
    accent: "emerald",
  },
  {
    slug: "car-rental-booking-concept",
    title: "Car Rental Booking Concept",
    category: "Concept",
    status: "System concept",
    period: "Project work",
    summary:
      "A booking-system concept focused on translating customer and fleet requirements into a clear application structure.",
    challenge:
      "Model the relationship between vehicles, customers, availability, and reservations in a practical booking flow.",
    solution:
      "Produced a structured system concept around data modelling, availability, customer journeys, and administrative management.",
    role: "Requirements and system design",
    technologies: ["System design", "Database concepts", "Booking workflows", "Requirements analysis"],
    highlights: ["Requirements mapping", "Booking workflow", "Data modelling", "Administrative concepts"],
    accent: "rose",
  },
];

export const journey = [
  {
    marker: "Foundation",
    title: "Computer Science + Physics",
    text: "Began a Bachelor of Science at The University of the South Pacific in 2023, combining a Computer Science major with a Physics minor.",
  },
  {
    marker: "Systems",
    title: "Programming beneath the interface",
    text: "Expanded from application programming into operating systems, networking, reliable transport, and distributed Java systems.",
  },
  {
    marker: "Build",
    title: "Full-stack applications",
    text: "Applied PHP, Laravel, JavaScript, TypeScript, and relational databases to e-commerce and booking-system projects.",
  },
  {
    marker: "Deploy",
    title: "Cloud-ready workflows",
    text: "Worked with Codespaces, hosted databases, environment-based configuration, Git workflows, and deployment troubleshooting.",
  },
  {
    marker: "Direction",
    title: "Reliable, security-aware software",
    text: "Now building toward professional software and cybersecurity work grounded in a practical understanding of applications, networks, and systems.",
  },
] as const;

export const services = [
  {
    title: "Web experiences",
    text: "Responsive business and portfolio websites with clear structure, accessible interactions, and a polished customer experience.",
  },
  {
    title: "Full-stack applications",
    text: "Database-backed web applications with authentication, role-based workflows, dashboards, validation, and administration tools.",
  },
  {
    title: "Booking & commerce systems",
    text: "Practical booking, catalogue, cart, facility, and operational management flows shaped around real requirements.",
  },
  {
    title: "Database systems",
    text: "Relational schema design, SQL, migrations, and integration across MySQL and PostgreSQL-backed applications.",
  },
  {
    title: "Deployment support",
    text: "Environment configuration, Git-based workflows, cloud database setup, and application deployment troubleshooting.",
  },
  {
    title: "Network-aware development",
    text: "Software decisions informed by TCP/IP, routing, access controls, operating systems, and cybersecurity principles.",
  },
] as const;
