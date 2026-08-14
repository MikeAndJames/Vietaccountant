// Anh Đào Carrick (FCCA) - Main Application Logic
// Direct ACCA Chartered Certified Accountant Website

let currentLang = localStorage.getItem('carrick_acc_lang') || 'vi'; // Default to Vietnamese for target community

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initModal();
  initMobileMenu();
  initSmoothScroll();
});

// Language Switcher Engine
function initLanguage() {
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'vi' : 'en';
      localStorage.setItem('carrick_acc_lang', currentLang);
      applyLanguage();
    });
  }
  applyLanguage();
}

function applyLanguage() {
  const t = TRANSLATIONS[currentLang];
  if (!t) return;

  // Update HTML lang attribute
  document.documentElement.lang = currentLang;

  // Update toggle button text
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.innerHTML = currentLang === 'en'
      ? `🇻🇳 <span>Chuyển sang Tiếng Việt</span>`
      : `🇬🇧 <span>Switch to English</span>`;
    langToggleBtn.title = currentLang === 'en'
      ? 'Chuyển đổi giao diện sang Tiếng Việt'
      : 'Switch website interface to English';
  }

  // Update all elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const keyPath = elem.getAttribute('data-i18n').split('.');
    let val = t;
    for (const key of keyPath) {
      if (val && val[key]) {
        val = val[key];
      } else {
        val = null;
        break;
      }
    }
    if (val) {
      if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
        elem.placeholder = val;
      } else {
        elem.innerHTML = val;
      }
    }
  });
}

// Modal System with Direct WhatsApp & Zalo Integration
function initModal() {
  const modal = document.getElementById('consultation-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  const btnWa = document.getElementById('modal-submit-wa');
  const btnZalo = document.getElementById('modal-submit-zalo');

  if (btnWa) {
    btnWa.addEventListener('click', (e) => {
      e.preventDefault();
      sendAccountingInquiry('wa');
    });
  }

  if (btnZalo) {
    btnZalo.addEventListener('click', (e) => {
      e.preventDefault();
      sendAccountingInquiry('zalo');
    });
  }
}

function sendAccountingInquiry(channel) {
  const name = document.getElementById('modal-name')?.value || '';
  const phone = document.getElementById('modal-phone')?.value || '';
  const email = document.getElementById('modal-email')?.value || '';
  const service = document.getElementById('modal-service')?.value || '';
  const message = document.getElementById('modal-message')?.value || '';

  if (!name.trim() || !phone.trim()) {
    alert(currentLang === 'vi' 
      ? 'Vui lòng nhập Họ tên và Số điện thoại/Zalo để Bà Anh Đào Carrick hỗ trợ kịp thời!' 
      : 'Please enter your Name and Phone/WhatsApp number!');
    return;
  }

  const text = `[ANH DAO CARRICK ACCA INQUIRY]%0A• Họ tên: ${name}%0A• SĐT / WhatsApp: ${phone}%0A• Email: ${email}%0A• Dịch vụ quan tâm: ${service}%0A• Nội dung chi tiết: ${message}`;
  
  if (channel === 'wa') {
    window.open(`https://wa.me/447490130207?text=${text}`, '_blank');
  } else {
    window.open(`https://zalo.me/84949686098`, '_blank');
  }

  const modal = document.getElementById('consultation-modal');
  if (modal) modal.classList.remove('active');
}

function openConsultationModal(presetService = '') {
  const modal = document.getElementById('consultation-modal');
  if (modal) {
    modal.classList.add('active');
    if (presetService) {
      const serviceDropdown = document.getElementById('modal-service');
      const msgElem = document.getElementById('modal-message');
      
      if (serviceDropdown) {
        for (let i = 0; i < serviceDropdown.options.length; i++) {
          if (serviceDropdown.options[i].text.toLowerCase().includes(presetService.toLowerCase()) ||
              serviceDropdown.options[i].value.toLowerCase().includes(presetService.toLowerCase())) {
            serviceDropdown.selectedIndex = i;
            break;
          }
        }
      }

      if (msgElem && !msgElem.value) {
        msgElem.value = currentLang === 'vi' 
          ? `Tôi muốn nhận báo giá và tư vấn về dịch vụ: ${presetService}` 
          : `I would like to request a quote and consultation regarding: ${presetService}`;
      }
    }
  }
}

// Mobile Navigation Drawer Toggle
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking on any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

// Smooth Scrolling for in-page anchors
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
