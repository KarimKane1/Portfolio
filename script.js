document.addEventListener('DOMContentLoaded', function () {

  // ── Smooth scroll with header + nav offset ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('header')?.offsetHeight || 73;
      const navH    = document.querySelector('.timeline-nav')?.offsetHeight || 0;
      const offset  = headerH + navH + 16;
      const top     = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Fade-in-up on scroll ──────────────────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in-up');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease-out, transform 0.65s ease-out';
    fadeObserver.observe(el);
  });

  // ── Header scroll shadow ──────────────────────────────────────────────────
  const header = document.querySelector('header');
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 20px rgba(44, 20, 8, 0.1)';
      header.style.background = 'rgba(250, 247, 242, 0.97)';
    } else {
      header.style.boxShadow = '';
      header.style.background = '';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Timeline nav — highlight active pill on scroll ────────────────────────
  const timelineEntries = document.querySelectorAll('.timeline-entry[id]');
  const navPills = document.querySelectorAll('.timeline-nav-pill');

  if (timelineEntries.length && navPills.length) {
    const pillMap = {};
    navPills.forEach(pill => {
      const id = pill.getAttribute('href')?.replace('#', '');
      if (id) pillMap[id] = pill;
    });

    const activatePill = id => {
      navPills.forEach(p => p.classList.remove('is-active'));
      if (pillMap[id]) pillMap[id].classList.add('is-active');
    };

    const entryObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activatePill(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    timelineEntries.forEach(el => entryObserver.observe(el));
  }

  // ── Project nav — highlight active pill on scroll ────────────────────────
  const projCards = document.querySelectorAll('.proj-card[id]');
  const projPills = document.querySelectorAll('.proj-nav-pill');

  if (projCards.length && projPills.length) {
    const projPillMap = {};
    projPills.forEach(pill => {
      const id = pill.getAttribute('href')?.replace('#', '');
      if (id) projPillMap[id] = pill;
    });

    const activateProjPill = id => {
      projPills.forEach(p => p.classList.remove('is-active'));
      if (projPillMap[id]) projPillMap[id].classList.add('is-active');
    };

    const projObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activateProjPill(entry.target.id);
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });

    projCards.forEach(card => projObserver.observe(card));
  }

  // ── Experience sidebar switcher ───────────────────────────────────────────
  const expNavItems = document.querySelectorAll('.exp-nav-item');
  const expPanels   = document.querySelectorAll('.exp-panel');

  if (expNavItems.length) {
    expNavItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.target;

        expNavItems.forEach(i => i.classList.remove('is-active'));
        expPanels.forEach(p => p.classList.remove('is-active'));

        item.classList.add('is-active');
        const panel = document.getElementById(target);
        if (panel) panel.classList.add('is-active');
      });
    });
  }

  // ── Skills logos stagger in ───────────────────────────────────────────────
  const skillLogos = document.querySelectorAll('.skills-logos img');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '0.85';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, i * 80);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillLogos.forEach(logo => {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(12px) scale(0.9)';
    logo.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
    skillObserver.observe(logo);
  });

  // ── Button ripple ─────────────────────────────────────────────────────────
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .btn { position: relative; overflow: hidden; }
    .ripple {
      position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.28);
      transform: scale(0); pointer-events: none;
      animation: ripple-anim 0.55s linear;
    }
    @keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }
  `;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
      r.classList.add('ripple');
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

});
