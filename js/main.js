/**
 * Novenda Portfolio - Main Interactive Controller
 * Mobile Navigation, Scroll Spy, Skill Filtering, Form Feedback, and Clipboard utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Header & Navigation ---
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.querySelector('.back-to-top');

  // Sticky header on scroll
  const handleScrollHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Mobile menu toggle
  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinksList.classList.contains('open')) {
          navLinksList.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksList.classList.contains('open')) {
        navLinksList.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active section indicator using IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
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
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // --- 2. Technical Skills Filter ---
  const skillFilterButtons = document.querySelectorAll('#skills .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (skillFilterButtons.length > 0 && skillCards.length > 0) {
    skillFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        skillFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 2b. Projects Filter (Production / Case Study / Lab) ---
  const projectFilterButtons = document.querySelectorAll('#projects .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectFilterButtons.length > 0 && projectCards.length > 0) {
    projectFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-project-filter');

        projectFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach(card => {
          const projectType = card.getAttribute('data-project-type');
          if (filter === 'all' || projectType === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 3. Scroll Reveal Effect ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // --- 4. Copy to Clipboard Utility ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast-notice');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for non-HTTPS or older contexts
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast(`Copied "${textToCopy}" to clipboard!`);
      } catch (err) {
        showToast(`Selected: ${textToCopy}`);
      }
    });
  });

  // --- 5. Contact Form Handler (Client-Side) ---
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-status-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill out all required fields.');
        return;
      }

      // Simulated clean send feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (formAlert) {
          formAlert.className = 'form-status-alert success';
          formAlert.textContent = 'Message sent successfully! (Or use direct email/WhatsApp links above).';
          formAlert.style.display = 'block';
        }
        contactForm.reset();
        setTimeout(() => {
          if (formAlert) formAlert.style.display = 'none';
        }, 6000);
      }, 700);
    });
  }

  // --- 6. Back to Top Smooth Action ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  // --- 7. Dynamic Footer Year ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
