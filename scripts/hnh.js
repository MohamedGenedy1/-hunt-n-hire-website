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

// ─── FIREBASE CONFIGURATION & API ───
const firebaseConfig = {
  apiKey: "AIzaSyCK8sUAgybTuzeRU8_VCPmK2uRS3Kt9-hU",
  authDomain: "hunt-n-hire.firebaseapp.com",
  projectId: "hunt-n-hire",
  storageBucket: "hunt-n-hire.firebasestorage.app",
  messagingSenderId: "137884389383",
  appId: "1:137884389383:web:b1ea5a2e1ace0eb035daa2",
  measurementId: "G-YE980QM2EH"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DB = {
  db: typeof firebase !== 'undefined' ? firebase.firestore() : null,


  async getJobs() {
    if (!this.db) return [];
    try {
      const snapshot = await this.db.collection('jobs').get();
      return snapshot.docs.map(doc => ({ fbId: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Error fetching jobs", e);
      return [];
    }
  },
  
  async saveJob(job) {
    if (!this.db) return;
    try {
      job.timestamp = new Date().toISOString();
      await this.db.collection('jobs').add(job);
      return job;
    } catch (e) {
      console.error("Error saving job", e);
    }
  },
  
  async updateJob(id, data) {
    if (!this.db) return;
    try {
      await this.db.collection('jobs').doc(id).update(data);
    } catch (e) {}
  },
  
  async deleteJob(id) {
    if (!this.db) return;
    try {
      await this.db.collection('jobs').doc(id).delete();
    } catch (e) {}
  },

  async getApplications() {
    if (!this.db) return [];
    try {
      const snapshot = await this.db.collection('applications').orderBy('timestamp', 'desc').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Error fetching apps", e);
      return [];
    }
  },
  
  async saveApplication(app) {
    if (!this.db) return;
    try {
      app.timestamp = new Date().toISOString();
      await this.db.collection('applications').add(app);
      return app;
    } catch (e) {
      console.error("Error saving app", e);
    }
  },
  
  async deleteApplication(id) {
    if (!this.db) return;
    try {
      await this.db.collection('applications').doc(id).delete();
    } catch (e) {}
  },
  
  async getPartnerRequests() {
    if (!this.db) return [];
    try {
      const snapshot = await this.db.collection('partner_requests').orderBy('timestamp', 'desc').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Error fetching partners", e);
      return [];
    }
  },
  
  async savePartnerRequest(req) {
    if (!this.db) return;
    try {
      req.timestamp = new Date().toISOString();
      await this.db.collection('partner_requests').add(req);
      return req;
    } catch (e) {
      console.error("Error saving partner", e);
    }
  },
  
  async deletePartnerRequest(id) {
    if (!this.db) return;
    try {
      await this.db.collection('partner_requests').doc(id).delete();
    } catch (e) {}
  }
};

function initMockData() {
  // Mock data initialization removed since we use live Firebase.
}
