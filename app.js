'use strict';
(() => {
  const p = window.PROFILE;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const copy = {
    zh: {
      skip: '跳转至主要内容', navigation: '主导航', navResearch: '科研', navExperience: '实习', navEducation: '教育', navContact: '联系', resume: '导出履历', explore: '探索我的研究', profile: '个人资料', basedAt: '教育背景', overview: '概览', overviewText: '连接算法、系统与硬件。<br>从研究想法，走向真实计算。', researchTitle: '科研工作<span class="accent">.</span>', researchIntro: '围绕智能计算的性能与能效，<br>探索算法与体系结构之间的设计空间。', filterLabel: '筛选研究', filterAll: '全部研究', filterArchitecture: '体系结构与系统', filterEmbodied: '具身智能', researchNote: '性能数据对应各研究工作的实验设置，具体基线与条件见论文。', experienceTitle: '实习经历<span class="accent">.</span>', experienceIntro: '在真实的工作负载中，<br>检验每一次性能优化。', educationTitle: '教育与积累<span class="accent">.</span>', skillsTitle: '技术工具箱', honorsTitle: '荣誉与认证', contactTitle: '让好的想法，<br>从一次交流开始。', contactIntro: '欢迎交流计算机体系结构、AI 系统与 GPU 优化，<br>也期待科研合作与工作机会。', copyEmail: '复制邮箱', copied: '邮箱已复制', copyFallback: '请点击邮箱地址发送邮件，或选中地址复制。', backTop: '返回顶部 ↑', paper: '论文', code: '代码', project: '项目', researchCount: '项科研工作', educationCount: '段教育经历', experienceCount: '段产业实习', works: '项研究', footer: '研究、构建、持续探索。', description: '刘峥的个人主页：计算机体系结构、AI 系统、GPU 算子优化与软硬件协同设计。科研、教育与实习经历。'
    },
    en: {
      skip: 'Skip to main content', navigation: 'Main navigation', navResearch: 'Research', navExperience: 'Experience', navEducation: 'Education', navContact: 'Contact', resume: 'Print CV', explore: 'Explore my research', profile: 'Profile', basedAt: 'EDUCATION', overview: 'Overview', overviewText: 'Connecting algorithms, systems & hardware.<br>From ideas to real-world computing.', researchTitle: 'Selected research<span class="accent">.</span>', researchIntro: 'Exploring the design space between<br>algorithms and computer architecture.', filterLabel: 'Filter research', filterAll: 'All research', filterArchitecture: 'Architecture & systems', filterEmbodied: 'Embodied AI', researchNote: 'Performance figures reflect each work’s evaluation setup. See the papers for baselines and experimental conditions.', experienceTitle: 'Industry experience<span class="accent">.</span>', experienceIntro: 'Putting performance optimizations<br>to the test in real workloads.', educationTitle: 'Education & toolkit<span class="accent">.</span>', skillsTitle: 'Technical toolkit', honorsTitle: 'Honors & certifications', contactTitle: 'Good ideas start<br>with a conversation.', contactIntro: 'Let’s talk about computer architecture, AI systems, or GPUs.<br>Open to research collaborations and career opportunities.', copyEmail: 'Copy email', copied: 'Email copied', copyFallback: 'Click the address to email me, or select it to copy.', backTop: 'Back to top ↑', paper: 'Paper', code: 'Code', project: 'Project', researchCount: 'Research works', educationCount: 'Education entries', experienceCount: 'Industry internship', works: 'works', footer: 'Research. Build. Keep exploring.', description: 'Zheng Liu — computer architecture, AI systems, GPU kernel optimization, and hardware–software co-design. Research, education, and industry experience.'
    }
  };
  let language = 'zh';
  let filter = 'all';
  let copyTimeout;
  const query = new URLSearchParams(location.search).get('lang');
  if (['en', 'zh'].includes(query)) language = query;
  else {
    try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'zh'; }
    catch (_) { /* Local files and privacy modes can restrict storage. */ }
  }
  const tr = (value) => typeof value === 'object' && value !== null ? (value[language] ?? value.zh ?? '') : value;
  const safeUrl = (value) => {
    if (!value) return '';
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch (_) { return ''; }
  };
  const externalLink = (url, label) => safeUrl(url) ? `<a href="${escape(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${escape(label)} ↗</a>` : '';
  function illustration(id) {
    const frame = (content) => `<svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${content}</svg>`;
    if (id === 'deltoris') return frame('<path d="M47 141h40V97l32-34 38 26v50h24" stroke="#617b4c" stroke-width="2"/><path d="M45 153h50v-50l27-28 24 17v61h39" stroke="#617b4c" stroke-width="1" opacity=".35"/><circle cx="119" cy="63" r="13" fill="#d6e2b5" stroke="#617b4c"/><circle cx="87" cy="98" r="10" fill="#e2e9dd" stroke="#617b4c"/><circle cx="157" cy="89" r="10" fill="#e2e9dd" stroke="#617b4c"/><rect x="36" y="135" width="25" height="14" rx="2" fill="#c4d39f" stroke="#617b4c"/><rect x="168" y="132" width="21" height="14" rx="2" fill="#c4d39f" stroke="#617b4c"/><path d="M119 30V17M151 42l10-10M84 42 74 32" stroke="#8da369"/><circle cx="119" cy="63" r="4" fill="#617b4c"/><path d="M50 175h122" stroke="#9dac8a" stroke-dasharray="3 4"/>');
    if (id === 'nebula') {
      let points = '';
      for (let i = 0; i < 64; i++) {
        const angle = i * 2.399963;
        const radius = Math.sqrt(i / 64) * 72;
        const x = 110 + Math.cos(angle) * radius;
        const y = 98 + Math.sin(angle) * radius * .68;
        points += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${2 + i % 4}" fill="${['#5b7747','#91a876','#becd9d','#d1dcba'][i % 4]}" opacity=".8"/>`;
      }
      return frame(`<ellipse cx="110" cy="99" rx="82" ry="49" transform="rotate(-25 110 99)" stroke="#9aaa80" stroke-width=".7"/><ellipse cx="110" cy="99" rx="72" ry="65" transform="rotate(30 110 99)" stroke="#9aaa80" stroke-width=".7"/>${points}<path d="M43 161h34m-17-17v34M157 43h21m-11-10v21" stroke="#7b9163"/>`);
    }
    let blocks = '';
    for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) {
      const x = 45 + col * 27 + row * 7;
      const y = 63 + row * 22 - col * 6;
      blocks += `<path d="M${x} ${y}l20-5 8 12-20 5Z" fill="${['#9eb681','#c6d5ae','#dce5cd'][(row + col) % 3]}" stroke="#6f8657" stroke-width=".8"/><path d="M${x} ${y}v15l8 12v-15m0 15 20-5v-15" stroke="#6f8657" stroke-width=".8"/>`;
    }
    return frame(`${blocks}<path d="M43 162h118l15-7" stroke="#7d9362"/><path d="m169 151 7 4-4 7" stroke="#7d9362"/>`);
  }
  function renderResearch() {
    const c = copy[language];
    $('#research-list').innerHTML = p.research.map((work, index) => `<article class="research-card" data-category="${escape(work.category)}"${filter !== 'all' && filter !== work.category ? ' hidden' : ''}>
      <div class="research-art" aria-hidden="true"><span class="research-art-number">0${index + 1}</span>${illustration(work.id)}<span class="research-art-label">${escape(work.id.toUpperCase())} / ${escape(work.year)}</span></div>
      <div class="research-content"><div class="paper-meta"><span class="venue">${escape(work.venue)}</span>${tr(work.role) ? `<span class="author-role">${escape(tr(work.role))}</span>` : ''}</div><h3>${escape(work.name)}</h3><p class="research-subtitle">${escape(tr(work.subtitle))}</p><p class="paper-title">${escape(work.title)}</p><p class="research-description">${escape(tr(work.description))}</p><div class="research-bottom"><div class="metrics">${work.metrics.map(metric => `<div class="metric"><strong>${escape(metric.value)}</strong><span>${escape(tr(metric.label))}</span></div>`).join('')}</div><div class="paper-links">${externalLink(work.paper, c.paper)}${externalLink(work.project, c.project)}${externalLink(work.code, c.code)}</div></div></div></article>`).join('');
    const visible = p.research.filter(work => filter === 'all' || work.category === filter).length;
    $('#result-count').textContent = `${String(visible).padStart(2, '0')} ${c.works}`;
    $$('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  }
  function render() {
    const c = copy[language];
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = `${tr(p.name)} | AI Systems & Architecture`;
    $('meta[name="description"]').content = tr(p.intro);
    $('.brand-name').textContent = p.name.en.toUpperCase();
    $$('[data-i18n]').forEach(element => { element.innerHTML = c[element.dataset.i18n]; });
    $$('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label', c[element.dataset.i18nAria]); });
    $('#language-label').textContent = language === 'zh' ? 'EN' : '中文';
    $('#language-button').setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
    $('#hero-name').innerHTML = `${escape(tr(p.name))} <span>${escape(p.name[language === 'zh' ? 'en' : 'zh'])}</span>`;
    $('#headline').innerHTML = p.headline[language].map(line => `<span>${escape(line)}</span>`).join('');
    $('#intro').textContent = tr(p.intro);
    $('#affiliation').textContent = tr(p.affiliation);
    $('#portrait').src = p.portrait;
    $('#portrait').alt = tr(p.name);
    $('#interests').innerHTML = p.interests.map(interest => `<span>${escape(interest)}</span>`).join('');
    for (const selector of ['#hero-github', '#contact-github']) {
      $(selector).hidden = !safeUrl(p.github);
      if (safeUrl(p.github)) $(selector).href = safeUrl(p.github);
    }
    $('#stats').innerHTML = [[p.research.length, c.researchCount], [p.education.length, c.educationCount], [p.experience.length, c.experienceCount]].map(([number, label]) => `<div class="stat"><span class="stat-number">${String(number).padStart(2, '0')}</span><span class="stat-label">${escape(label)}</span></div>`).join('');
    renderResearch();
    $('#experience-list').innerHTML = p.experience.map(job => `<article class="experience-card"><div class="experience-meta"><span class="period">${escape(job.period)}</span><h3>${escape(tr(job.company))}</h3><p class="team">${escape(tr(job.team))}</p></div><div class="experience-body"><h4>${escape(tr(job.role))}</h4><p>${escape(tr(job.description))}</p><ul>${job.bullets.map(bullet => `<li>${escape(tr(bullet))}</li>`).join('')}</ul><div class="tag-list">${job.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div></div></article>`).join('');
    $('#education-list').innerHTML = p.education.map(item => `<article class="education-card"><div class="school-mark" aria-hidden="true">${escape(item.abbreviation)}</div><div><h3>${escape(tr(item.school))}</h3><p class="degree">${escape(tr(item.degree))}</p><span class="period">${escape(item.period)}</span>${tr(item.note) ? `<p class="education-note">${escape(tr(item.note))}</p>` : ''}</div></article>`).join('');
    $('#skills-list').innerHTML = p.skills.map((skill, index) => `<article class="skill-card"><span class="skill-number">0${index + 1}</span><h4>${escape(tr(skill.title))}</h4><p>${skill.items.map(escape).join(' / ')}</p></article>`).join('');
    $('#honors-list').innerHTML = p.honors.map(item => `<div class="honor"><time>${escape(item.year)}</time><span>${escape(tr(item.title))}</span></div>`).join('');
    const hasEmail = typeof p.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email);
    $('#email-link').hidden = !hasEmail;
    $('#copy-email').hidden = !hasEmail;
    if (hasEmail) { $('#email-link').textContent = p.email; $('#email-link').href = `mailto:${p.email}`; }
    $('#copy-status').textContent = '';
    $('#copyright').textContent = `© ${new Date().getFullYear()} ${tr(p.name)} · ${c.footer}`;
  }
  $('#language-button').addEventListener('click', () => {
    language = language === 'zh' ? 'en' : 'zh';
    try { localStorage.setItem('portfolio-language', language); } catch (_) { /* No storage needed to switch. */ }
    try { const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url); } catch (_) { /* file:// may restrict history. */ }
    render();
  });
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; renderResearch(); }));
  $$('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
  $('#copy-email').addEventListener('click', async () => {
    let success = false;
    try { await navigator.clipboard.writeText(p.email); success = true; } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = p.email;
      textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.append(textarea);
      textarea.select();
      try { success = document.execCommand('copy'); } catch (_) { /* Show a manual fallback. */ }
      textarea.remove();
      $('#copy-email').focus({ preventScroll: true });
    }
    clearTimeout(copyTimeout);
    $('#copy-status').textContent = copy[language][success ? 'copied' : 'copyFallback'];
    copyTimeout = setTimeout(() => { $('#copy-status').textContent = ''; }, 5000);
  });
  render();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) $$('.desktop-nav a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    $$('main section[id]').forEach(section => observer.observe(section));
  }
})();
