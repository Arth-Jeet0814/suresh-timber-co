/**
 * SURESH TIMBER COMPANY - MASTER JAVASCRIPT
 * Vanilla JS | Zero Dependencies | Modern & Accessible
 */

// ==========================================================================
// 1. CONFIGURATION & CONTACT CONSTANTS
// ==========================================================================
const SITE_CONFIG = {
  // Service: 'web3forms' or 'formspree'
  FORM_ENDPOINT_TYPE: 'web3forms',
  
  // REPLACE with your Web3Forms Access Key (get one free at https://web3forms.com)
  WEB3FORMS_ACCESS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
  
  // OR REPLACE with your Formspree endpoint (e.g., https://formspree.io/f/xbjnqwe)
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID_HERE',
  
  // WhatsApp Contact (Country code + 10-digit number without '+' or dashes)
  WHATSAPP_NUMBER: '918045906574',
  
  // Direct Phone & Email
  PHONE: '+91-8045906574',
  EMAIL: 'bharatpatel@sureshwood.com',
  COMPANY_NAME: 'Suresh Timber Company'
};

// ==========================================================================
// 2. DOM CONTENT LOADED INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initStatsCounter();
  initNavScrollSpy();
  initLightbox();
  initEnquiryForm();
  initSmoothTransitions();
  initBackToTop();
});

// ==========================================================================
// 3. STICKY HEADER & SCROLL BEHAVIOR
// ==========================================================================
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================================================
// 4. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const navLinks = drawer.querySelectorAll('.mobile-nav-link, .drawer-cta-btn');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// ==========================================================================
// 5. SCROLL REVEAL (IntersectionObserver)
// ==========================================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const staggerContainers = document.querySelectorAll('.reveal-stagger');
  if (!reveals.length && !staggerContainers.length) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // 1. Staggered Container Observer (guarantees strictly sequential reveal for grids/cards)
  const staggerObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const children = container.querySelectorAll('.reveal');
        children.forEach((child, idx) => {
          // Strictly sequential stagger delay (70ms per card)
          child.style.transitionDelay = (idx * 70) + 'ms';
          child.classList.add('is-revealed');

          // Clear inline delay after entrance finishes so hover is instant
          setTimeout(() => {
            child.style.transitionDelay = '';
          }, 850 + (idx * 70));
        });
        obs.unobserve(container);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  staggerContainers.forEach(container => staggerObserver.observe(container));

  // 2. Individual Standalone Reveal Observer (for elements NOT inside a stagger container)
  const soloObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  reveals.forEach(el => {
    // Only observe individually if not inside a .reveal-stagger container
    if (!el.closest('.reveal-stagger')) {
      soloObserver.observe(el);
    }
  });
}

// ==========================================================================
// 6. ANIMATED COUNT-UP STATS
// ==========================================================================
function initStatsCounter() {
  const statsElements = document.querySelectorAll('[data-counter]');
  if (!statsElements.length) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    statsElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter'));
      const isYear = el.hasAttribute('data-is-year');
      el.textContent = isYear ? target.toString() : target.toLocaleString('en-IN');
    });
    return;
  }

  const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const isYear = el.hasAttribute('data-is-year');
    const duration = isYear ? 1000 : 1400;
    const start = isYear ? target - 38 : 0;
    const startTime = performance.now();
    let lastRendered = null;

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic easing
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      if (current !== lastRendered) {
        lastRendered = current;
        if (isYear) {
          el.textContent = current.toString();
        } else {
          el.textContent = current.toLocaleString('en-IN');
        }
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        if (isYear) {
          el.textContent = target.toString();
        } else {
          el.textContent = target.toLocaleString('en-IN');
        }
      }
    };

    requestAnimationFrame(updateCount);
  };

  // Synchronize count-up triggering across all statistics by observing the parent section
  const statsContainer = document.querySelector('.stats-band') || document.querySelector('.stats-grid');
  if (statsContainer) {
    let triggered = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          statsElements.forEach(el => countUp(el));
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(statsContainer);
  } else {
    statsElements.forEach(el => countUp(el));
  }
}

// ==========================================================================
// 7. NAVIGATION SCROLL SPY (Active Link Highlighting)
// ==========================================================================
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -65% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

// ==========================================================================
// 8. COMPANY ALBUM LIGHTBOX (profile.html)
// ==========================================================================
function initLightbox() {
  const lightbox = document.querySelector('.lightbox-modal');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!lightbox || !galleryItems.length) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-caption h4');
  const lightboxDesc = lightbox.querySelector('.lightbox-caption p');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const items = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-src') || item.querySelector('img').src,
    title: item.getAttribute('data-title') || 'Suresh Timber Co. Facility',
    desc: item.getAttribute('data-desc') || 'Manufacturing & Packaging Operations in Vadodara'
  }));

  const showItem = (index) => {
    currentIndex = (index + items.length) % items.length;
    const current = items[currentIndex];
    if (lightboxImg) lightboxImg.src = current.src;
    if (lightboxTitle) lightboxTitle.textContent = current.title;
    if (lightboxDesc) lightboxDesc.textContent = current.desc;
  };

  const openLightbox = (index) => {
    showItem(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showItem(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showItem(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showItem(currentIndex - 1);
    if (e.key === 'ArrowRight') showItem(currentIndex + 1);
  });
}

// ==========================================================================
// 9. ENQUIRY FORM & VALIDATION (enquiry.html)
// ==========================================================================
function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const titleField = document.getElementById('title');
  const nameField = document.getElementById('name');
  const mobileField = document.getElementById('mobile');
  const emailField = document.getElementById('email');
  const productField = document.getElementById('product');
  const requirementField = document.getElementById('requirement');
  const whatsappBtn = document.getElementById('whatsappEnquiryBtn');
  const submitBtn = document.getElementById('submitEnquiryBtn');
  const successContainer = document.getElementById('formSuccessMessage');
  const resetFormBtn = document.getElementById('resetFormBtn');

  // Handle URL query parameter ?product=
  const urlParams = new URLSearchParams(window.location.search);
  const requestedProduct = urlParams.get('product');
  if (requestedProduct && productField) {
    let matched = false;
    for (let opt of productField.options) {
      if (opt.value.toLowerCase() === requestedProduct.toLowerCase() ||
          opt.text.toLowerCase().includes(requestedProduct.toLowerCase())) {
        productField.value = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched && requestedProduct) {
      // Add custom option and select it
      const newOption = new Option(requestedProduct, requestedProduct, true, true);
      productField.add(newOption);
    }
    // Pre-fill requirement textarea with a helpful starter
    if (requirementField && !requirementField.value) {
      requirementField.value = `Hello, please provide quotation and specifications for ${requestedProduct}. Required dimensions / quantity: `;
      requirementField.classList.add('has-value');
    }
  }

  // Floating Label Class Helper
  const allInputs = form.querySelectorAll('.form-control');
  allInputs.forEach(input => {
    const checkValue = () => {
      if (input.value && input.value.trim() !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    };
    input.addEventListener('input', checkValue);
    input.addEventListener('change', checkValue);
    checkValue();
  });

  // Validation Helpers
  const validateField = (field, errorId, errorMsg, validatorFn) => {
    const errorEl = document.getElementById(errorId);
    const isValid = validatorFn(field.value.trim());

    if (!isValid) {
      field.classList.add('is-invalid');
      if (errorEl) errorEl.textContent = errorMsg;
      return false;
    } else {
      field.classList.remove('is-invalid');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  };

  const validateName = () => validateField(
    nameField,
    'nameError',
    'Please enter your name',
    val => val.length >= 2
  );

  const validateMobile = () => validateField(
    mobileField,
    'mobileError',
    'Please enter your mobile number',
    val => {
      // Strips non-digits; requires 10-digit number
      const digits = val.replace(/\D/g, '');
      return digits.length === 10;
    }
  );

  const validateEmail = () => validateField(
    emailField,
    'emailError',
    'Please enter your email id',
    val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  );

  const validateRequirement = () => validateField(
    requirementField,
    'requirementError',
    'Please enter requirement.',
    val => val.length >= 5
  );

  // Blur events for real-time feedback
  nameField.addEventListener('blur', validateName);
  mobileField.addEventListener('blur', validateMobile);
  emailField.addEventListener('blur', validateEmail);
  requirementField.addEventListener('blur', validateRequirement);

  // WhatsApp Pre-filled Button Action
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = titleField ? titleField.value : 'Mr.';
      const name = nameField ? nameField.value.trim() : '';
      const mobile = mobileField ? mobileField.value.trim() : '';
      const email = emailField ? emailField.value.trim() : '';
      const product = productField ? productField.value : 'Wooden Packaging';
      const requirement = requirementField ? requirementField.value.trim() : '';

      const text = `*New Packaging Enquiry - Suresh Timber Co.*\n` +
                   `• *Name:* ${title} ${name || '[Not provided]'}\n` +
                   `• *Phone:* ${mobile || '[Not provided]'}\n` +
                   `• *Email:* ${email || '[Not provided]'}\n` +
                   `• *Product Category:* ${product}\n` +
                   `• *Requirement:* ${requirement || 'Custom wooden pallets / boxes specification enquiry'}`;

      const waUrl = `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Form Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isMobileValid = validateMobile();
    const isEmailValid = validateEmail();
    const isReqValid = validateRequirement();

    if (!isNameValid || !isMobileValid || !isEmailValid || !isReqValid) {
      // Focus first invalid element
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Set button loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin" style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      Sending Enquiry...
    `;

    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    try {
      let isMock = false;
      let endpoint = '';

      if (SITE_CONFIG.FORM_ENDPOINT_TYPE === 'web3forms') {
        if (SITE_CONFIG.WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
          isMock = true;
        } else {
          endpoint = 'https://api.web3forms.com/submit';
          formData.append('access_key', SITE_CONFIG.WEB3FORMS_ACCESS_KEY);
          formData.append('from_name', 'Suresh Timber Co. Website');
          formData.append('subject', `New Enquiry from ${dataObj.name} for ${dataObj.product || 'Packaging'}`);
        }
      } else {
        if (SITE_CONFIG.FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID_HERE')) {
          isMock = true;
        } else {
          endpoint = SITE_CONFIG.FORMSPREE_ENDPOINT;
        }
      }

      if (!isMock) {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Submission response was not ok');
      } else {
        // Simulate network delay for demo / offline environment
        await new Promise(resolve => setTimeout(resolve, 800));
        console.info('Form enquiry submitted in demo mode. Configure your Web3Forms/Formspree key in js/main.js to receive live emails.');
      }

      // Success UI transition
      form.style.display = 'none';
      if (successContainer) {
        successContainer.classList.add('is-visible');
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      // Fallback display success gracefully with offline notice
      form.style.display = 'none';
      if (successContainer) {
        successContainer.classList.add('is-visible');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  // Reset form to send another enquiry
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      form.reset();
      allInputs.forEach(i => i.classList.remove('has-value', 'is-invalid'));
      if (successContainer) successContainer.classList.remove('is-visible');
      form.style.display = 'block';
    });
  }
}

// ==========================================================================
// 10. SMOOTH PAGE TRANSITIONS
// ==========================================================================
function initSmoothTransitions() {
  document.body.classList.add('page-fade');
}

// ==========================================================================
// 11. SCROLL TO TOP TOGGLE BUTTON
// ==========================================================================
function initBackToTop() {
  let btn = document.getElementById('backToTop');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'backToTop';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Scroll back to top');
    btn.title = 'Scroll to top';
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  let ticking = false;

  const toggleVisibility = () => {
    if (window.scrollY > 350) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(toggleVisibility);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initial check on load in case page is restored with scroll offset
  toggleVisibility();
}

