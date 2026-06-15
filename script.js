(function() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  const navLinks = [...document.querySelectorAll('nav a')];
  const anchorLinks = navLinks.filter(link => link.getAttribute('href').startsWith('#'));
  const pageLinks = navLinks.filter(link => !link.getAttribute('href').startsWith('#'));
  const sections = anchorLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setPageActiveLink() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    pageLinks.forEach(link => {
      const linkPath = new URL(link.href, location.origin).pathname.split('/').pop() || 'index.html';
      const isCurrent = linkPath === currentPage || (currentPage === '' && linkPath === 'index.html');
      link.classList.toggle('active', isCurrent);
    });
  }

  function updateActiveLink() {
    setPageActiveLink();

    if (!sections.length) {
      return;
    }

    const position = window.scrollY + window.innerHeight * 0.35;
    let activeSection = sections[0];

    for (const section of sections) {
      if (section.offsetTop <= position) {
        activeSection = section;
      }
    }

    anchorLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeSection.id);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink);
  updateActiveLink();
})();
