/**
 * Amos Nunes Portfolio JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressBar = document.getElementById('scroll-progress');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Modal Elements
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-content-body');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  // 1. Theme Switcher Logic
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      showToast('Switched to Dark Mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      showToast('Switched to Light Mode');
    }
  });

  // 2. Mobile Menu Navigation
  mobileToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggleBtn.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggleBtn.classList.remove('open');
    });
  });

  // 3. Reading Scroll Progress Bar & ScrollSpy & Back to Top
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Scroll progress calculation
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = `${scrolled}%`;
    }

    // Show/Hide Back to top button
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // ScrollSpy active link
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 4. Reveal Elements on Scroll (User-Oriented Observer)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  const animatableElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category-card, .achievement-card, .contact-method-card, .stat-card');
  animatableElements.forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
  });

  // 5. Skills Category Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forward';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Copy to Clipboard Functionality
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast('Failed to copy to clipboard.');
      });
    });
  });

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 7. Project Details Modal Content & Direct GitHub Repos
  const projectDetails = {
    'student-platform': {
      title: 'Student Learning Platform',
      type: 'Desktop Application (JavaFX & MySQL)',
      image: 'student_learning_platform.png',
      summary: 'A robust desktop-based learning management system designed to streamline course interactions, quizzes, and academic content delivery.',
      technologies: ['JavaFX', 'JDBC', 'MySQL', 'Java', 'SQL Architecture', 'Desktop UI/UX'],
      keyFeatures: [
        'User Authentication & Role-Based Access (Student / Instructor)',
        'Interactive Course Directory & Learning Content Navigation',
        'Quiz Module with Automated Scoring & Progress Tracking',
        'JDBC Database Layer connected to local/remote MySQL Instance',
        'Intuitive Navigation Dashboard built with modular JavaFX FXML components'
      ],
      github: 'https://github.com/amosnunes01/Student-Learning-Platform'
    },
    'digital-literacy': {
      title: 'Digital Literacy Platform',
      type: 'Interactive Web & Mobile App',
      image: 'digital_literacy_app.png',
      summary: 'An inclusive learning platform focused on empowering citizens with essential digital skills, step-by-step UPI payment guides, digital safety protocols, and offline guidance.',
      technologies: ['React', 'JavaScript (ES6+)', 'Web Speech API', 'PWA / Offline DB', 'CSS3 / Glassmorphism'],
      keyFeatures: [
        'Interactive Step-by-Step Simulated Tutorials for UPI & Mobile Banking',
        'Local-Language Voice Guidance powered by Web Speech API',
        'Offline-First Architecture allowing seamless learning in low-connectivity areas',
        'Practice-Based Modules for Online Cyber Safety & Scams Prevention',
        'Progress Dashboard tracking completed modules and achievements'
      ],
      github: 'https://github.com/amosnunes01/Digisaathi_platform'
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const projId = trigger.getAttribute('data-project');
      const data = projectDetails[projId];

      if (data) {
        modalBody.innerHTML = `
          <div class="modal-project-header">
            <span class="project-type-badge">${data.type}</span>
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin: 0.5rem 0 1rem 0; color: var(--text-main);">${data.title}</h2>
          </div>
          <img src="${data.image}" alt="${data.title}" style="width:100%; border-radius:12px; margin-bottom:1.5rem; max-height:300px; object-fit:cover;">
          <p style="color:var(--text-muted); font-size:1rem; margin-bottom:1.5rem; line-height:1.6;">${data.summary}</p>
          
          <h4 style="font-family:var(--font-heading); color:var(--text-main); margin-bottom:0.75rem;">Key Architecture & Features:</h4>
          <ul style="margin-bottom:1.5rem; padding-left:1.2rem; color:var(--text-muted);">
            ${data.keyFeatures.map(f => `<li style="margin-bottom:0.4rem;">${f}</li>`).join('')}
          </ul>

          <h4 style="font-family:var(--font-heading); color:var(--text-main); margin-bottom:0.75rem;">Technologies Used:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:2rem;">
            ${data.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>

          <div style="display:flex; gap:1rem;">
            <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <i class="fa-brands fa-github"></i> View GitHub Repository Code
            </a>
          </div>
        `;
        projectModal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
      }
    });
  }

  // 8. Real Formspree Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://formspree.io/f/mdekwvva', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showToast('Thank you! Your message has been sent to Amos successfully.');
          contactForm.reset();
        } else {
          const data = await response.json();
          if (data && data.errors) {
            showToast(data.errors.map(error => error.message).join(", "));
          } else {
            showToast('Oops! There was a problem submitting your form.');
          }
        }
      } catch (error) {
        showToast('Network error! Please check your connection and try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
