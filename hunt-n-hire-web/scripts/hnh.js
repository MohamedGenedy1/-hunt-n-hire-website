/* =========================================================
   HUNT N' HIRE — COMMON APPS & DATABASE CONTROLLER
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initMockData();
  highlightActiveLink();
});

// ─── THEME MANAGER (LIGHT/DARK) ───
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(toggleBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('.material-icons');
  if (icon) {
    icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }
}

// ─── MOBILE NAVIGATION ───
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    navLinks.style.display = isVisible ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '72px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.backgroundColor = 'var(--bg-card)';
    navLinks.style.padding = '20px';
    navLinks.style.borderBottom = '1px solid var(--border)';
    hamburger.textContent = isVisible ? 'menu' : 'close';
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = '';
      navLinks.style.position = '';
      navLinks.style.flexDirection = '';
      hamburger.textContent = 'menu';
    }
  });
}

// ─── ACTIVE LINK HIGHLIGHTER ───
function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (page === href || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ─── LOCAL STORAGE DATABASE API ───
const DB = {
  getApplications() {
    return JSON.parse(localStorage.getItem('hnh_applications') || '[]');
  },
  
  saveApplication(app) {
    const apps = this.getApplications();
    app.id = app.id || Date.now();
    app.timestamp = app.timestamp || new Date().toISOString();
    apps.unshift(app);
    localStorage.setItem('hnh_applications', JSON.stringify(apps));
    return app;
  },
  
  deleteApplication(id) {
    let apps = this.getApplications();
    apps = apps.filter(a => a.id !== parseInt(id) && a.id !== id);
    localStorage.setItem('hnh_applications', JSON.stringify(apps));
  },
  
  getPartnerRequests() {
    return JSON.parse(localStorage.getItem('hnh_partner_requests') || '[]');
  },
  
  savePartnerRequest(req) {
    const requests = this.getPartnerRequests();
    req.id = req.id || Date.now();
    req.timestamp = req.timestamp || new Date().toISOString();
    requests.unshift(req);
    localStorage.setItem('hnh_partner_requests', JSON.stringify(requests));
    return req;
  },
  
  deletePartnerRequest(id) {
    let requests = this.getPartnerRequests();
    requests = requests.filter(r => r.id !== parseInt(id) && r.id !== id);
    localStorage.setItem('hnh_partner_requests', JSON.stringify(requests));
  }
};

// ─── PRE-POPULATE DEMO DATA ───
function initMockData() {
  if (localStorage.getItem('hnh_db_initialized')) return;
  
  // 1. Mock Candidates
  const mockApps = [
    {
      id: 10001,
      name: "Ahmed Ali",
      phone: "+20 101 234 5678",
      email: "ahmed.ali@gmail.com",
      jobId: 1, // CNX Customer Service
      jobTitle: "Customer Service Representative",
      companyName: "CNX",
      cvName: "Ahmed_Ali_CV.pdf",
      cvSize: "142 KB",
      message: "I have 1 year of experience in English call centers. Looking forward to interviewing.",
      timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() // 2 hrs ago
    },
    {
      id: 10002,
      name: "Sarah Mansour",
      phone: "+20 122 987 6543",
      email: "sarah.m@outlook.com",
      jobId: 8, // TTEC French Customer Service
      jobTitle: "Customer Service – Bilingual (French/English)",
      companyName: "TTEC",
      cvName: "Sarah_French_Resume.pdf",
      cvSize: "210 KB",
      message: "Bonjour, I am a native French speaker living in Cairo. I've worked for 2 years in customer care.",
      timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString() // 18 hrs ago
    },
    {
      id: 10003,
      name: "Sherif Mahmoud",
      phone: "+20 155 777 8888",
      email: "sherif.m@gmail.com",
      jobId: 3, // Dial Expert Remote Sales Closer
      jobTitle: "Remote Sales Closer – Debt Settlement",
      companyName: "Dial Expert",
      cvName: "Sherif_Sales_CV.pdf",
      cvSize: "98 KB",
      message: "Interested in the Remote Sales Closer position. I have a stable PC, high speed fiber connection, and USB headset.",
      timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString() // 1.5 days ago
    }
  ];
  
  // 2. Mock Recruiters
  const mockPartners = [
    {
      id: 20001,
      name: "Mariam Hassan",
      phone: "+20 111 555 4444",
      email: "mariam.recruits@yahoo.com",
      experience: "3-5 years",
      specialties: "IT & Telecommunications, English BPO accounts",
      message: "I currently source candidates for English BPO jobs in Maadi and New Cairo. I'd love to join your partner team to submit candidates and earn commissions.",
      timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString() // 4 hrs ago
    },
    {
      id: 20002,
      name: "Tarek Osman",
      phone: "+20 100 222 3333",
      email: "t.osman@hrconsult.com",
      experience: "5+ years",
      specialties: "German & French Language Profiles, Executive Search",
      message: "Independent recruiter based in Alexandria. I have a pipeline of German speakers. Let's collaborate.",
      timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() // 2 days ago
    }
  ];
  
  localStorage.setItem('hnh_applications', JSON.stringify(mockApps));
  localStorage.setItem('hnh_partner_requests', JSON.stringify(mockPartners));
  localStorage.setItem('hnh_db_initialized', 'true');
  
  console.log("Hunt N' Hire Local Storage Database Initialized with Mock Data.");
}
