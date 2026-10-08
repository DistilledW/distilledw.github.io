'use strict';

(() => {
  const profile = window.PROFILE;
  if (!profile) return;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
  const copy = {
    zh: {
      skip: '跳转到主要内容', navigation: '主导航', profile: '个人资料',
      navAbout: '关于', navResearch: '科研', navExperience: '实习', navEducation: '教育', navHonors: '荣誉', navContact: '联系',
      resume: '简历 PDF', researchTitle: '精选论文', experienceTitle: '实习经历', educationTitle: '教育背景',
      honorsTitle: '荣誉与奖项', skillsTitle: '技能', contactTitle: '联系',
      contactIntro: '欢迎交流计算机体系结构、AI 系统与 GPU 优化，也欢迎科研合作与工作机会。',
      emailLabel: '邮箱', cvLabel: '简历 / PDF', githubText: 'GitHub',
      copyEmail: '复制邮箱', copied: '邮箱已复制', copyFallback: '请选择邮箱地址并复制，或点击地址发送邮件。',
      backTop: '回到顶部', paper: '论文', code: '代码', project: '项目',
      detailLabel: '研究要点', detailLabel2: '工作内容', equalContribution: '共同第一作者',
      viewFigure: '查看 {name} 论文配图', imageSource: '查看原始出处', closeFigure: '关闭图片'
    },
    en: {
      skip: 'Skip to main content', navigation: 'Main navigation', profile: 'Profile',
      navAbout: 'About', navResearch: 'Research', navExperience: 'Experience', navEducation: 'Education', navHonors: 'Honors', navContact: 'Contact',
      resume: 'CV (中文)', researchTitle: 'Selected Publications', experienceTitle: 'Experience', educationTitle: 'Education',
      honorsTitle: 'Honors & Awards', skillsTitle: 'Skills', contactTitle: 'Contact',
      contactIntro: 'Happy to discuss computer architecture, AI systems, and GPU optimization. Open to research collaborations and career opportunities.',
      emailLabel: 'Email', cvLabel: 'CV / PDF (Chinese)', githubText: 'GitHub',
      copyEmail: 'Copy email', copied: 'Email copied', copyFallback: 'Select the email address to copy it, or click it to send an email.',
      backTop: 'Back to top', paper: 'Paper', code: 'Code', project: 'Project',
      detailLabel: 'Research highlights', detailLabel2: 'What I worked on', equalContribution: 'Equal contribution',
      viewFigure: 'View {name} figure', imageSource: 'Original figure', closeFigure: 'Close figure'
    }
  };
  const icons = {
    paper: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>',
    project: '<path d="M15 3h6v6m0-6L10 14"/><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>'
  };
  let language = 'zh';
  let copyTimeout;
  let printSnapshot = null;
  let figureTrigger = null;
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  if (queryLanguage === 'zh' || queryLanguage === 'en') language = queryLanguage;
  else {
    try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'zh'; }
    catch (_) { /* Language switching also works without browser storage. */ }
  }
  const tr = (value) => value && typeof value === 'object' ? (value[language] ?? value.zh ?? value.en ?? '') : (value ?? '');
  const list = (value) => Array.isArray(value) ? value : [];
  const safeUrl = (value) => {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch (_) { return ''; }
  };
  const safeAssetUrl = (value) => {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value, location.href);
      return ['https:', 'http:'].includes(url.protocol) || (location.protocol === 'file:' && url.protocol === 'file:') ? url.href : '';
    } catch (_) { return ''; }
  };
  const hasEmail = typeof profile.email === 'string' && /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(profile.email);
  const setText = (selector, value) => { const element = $(selector); if (element) element.textContent = value; };
  const setHTML = (selector, value) => { const element = $(selector); if (element) element.innerHTML = value; };
  const svg = (type) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[type]}</svg>`;
  const externalLink = (value, label, type) => {
    const url = safeUrl(value);
    return url ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${svg(type)}<span>${escape(label)}</span></a>` : '';
  };
  const detailsState = () => new Map($$('details[data-details]').map((element) => [element.dataset.details, element.open]));

  function renderResearch() {
    const c = copy[language];
    setHTML('#research-list', list(profile.research).map((work, index) => {
      const paperUrl = safeUrl(work.paper);
      const figureUrl = safeAssetUrl(work.image);
      const title = [work.name, work.title].filter(Boolean).join(': ');
      const equals = new Set(list(work.equalAuthors));
      const authors = list(work.authors).map((author) => {
        const name = String(author);
        const label = name === profile.name.en ? `<strong>${escape(name)}</strong>` : escape(name);
        return `<span class="paper-author">${label}${equals.has(name) ? `<sup title="${escape(c.equalContribution)}" aria-label="${escape(c.equalContribution)}">*</sup>` : ''}</span>`;
      }).join(', ');
      const metrics = list(work.metrics).map((metric) => `<span class="metric-inline"><strong>${escape(metric.value)}</strong> ${escape(tr(metric.label))}</span>`).join('');
      const links = externalLink(work.paper, c.paper, 'paper') + externalLink(work.project, c.project, 'project') + externalLink(work.code, c.code, 'code');
      const role = tr(work.role);
      const description = tr(work.description);
      const summary = tr(work.summary) || description;
      return `<article class="research-card${work.featured ? ' featured' : ''}${figureUrl ? '' : ' no-figure'}" id="paper-${escape(work.id || index)}">
        ${figureUrl ? `<figure class="paper-media"><button class="paper-preview" type="button" data-figure="${escape(work.id || index)}" aria-haspopup="dialog" aria-label="${escape(c.viewFigure.replace('{name}', work.name || ''))}"><img src="${escape(figureUrl)}" alt="${escape(tr(work.imageAlt))}" width="180" height="132" loading="lazy"></button></figure>` : ''}
        <div class="paper-content">
        <div class="paper-meta"><span class="venue">${escape(work.venue)}</span>${role ? `<span class="author-role">${escape(role)}</span>` : ''}</div>
        <h3 class="paper-title">${paperUrl ? `<a href="${escape(paperUrl)}" target="_blank" rel="noopener noreferrer">${escape(title)}</a>` : escape(title)}</h3>
        ${authors ? `<p class="paper-authors">${authors}${equals.size && !role ? ` <span class="equal-contribution">(* ${escape(c.equalContribution)})</span>` : ''}</p>` : ''}
        ${summary ? `<p class="research-description">${escape(summary)}</p>` : ''}
        ${links ? `<div class="paper-links">${links}</div>` : ''}
        ${description || metrics ? `<details class="paper-details" data-details="research-${escape(work.id || index)}"><summary>${escape(c.detailLabel)}</summary><div class="paper-detail-content">${description ? `<p class="paper-abstract">${escape(description)}</p>` : ''}${metrics ? `<div class="paper-metrics">${metrics}</div>` : ''}</div></details>` : ''}
        </div>
      </article>`;
    }).join(''));
  }

  function renderExperience() {
    const c = copy[language];
    setHTML('#experience-list', list(profile.experience).map((job, index) => {
      const bullets = list(job.bullets).map((bullet) => `<li>${escape(tr(bullet))}</li>`).join('');
      const tags = list(job.tags).map((tag) => escape(tr(tag))).join(' · ');
      return `<article class="experience-card">
        <div class="experience-content"><div class="record-header"><h3>${escape(tr(job.company))}${tr(job.role) ? `<span class="experience-separator"> · </span><span class="experience-role">${escape(tr(job.role))}</span>` : ''}</h3><div class="experience-date">${escape(job.period)}</div></div>
          ${tr(job.team) ? `<p class="team">${escape(tr(job.team))}</p>` : ''}
          ${tr(job.description) ? `<p class="experience-summary">${escape(tr(job.description))}</p>` : ''}
          ${bullets || tags ? `<details class="experience-details" data-details="experience-${index}"><summary>${escape(c.detailLabel2)}</summary>${bullets ? `<ul>${bullets}</ul>` : ''}${tags ? `<p class="experience-tags">${tags}</p>` : ''}</details>` : ''}
        </div>
      </article>`;
    }).join(''));
  }

  function openFigure(work, trigger) {
    const dialog = $('#figure-dialog');
    const image = $('#figure-image');
    const imageUrl = safeAssetUrl(work.image);
    if (!dialog || !image || !imageUrl || typeof dialog.showModal !== 'function') return;
    figureTrigger = trigger;
    image.src = imageUrl;
    image.alt = tr(work.imageAlt);
    setText('#figure-caption', `${work.name || ''} — ${tr(work.imageAlt)}`);
    const source = $('#figure-source');
    if (source) {
      const sourceUrl = safeUrl(work.imageSource);
      source.hidden = !sourceUrl;
      source.textContent = copy[language].imageSource;
      if (sourceUrl) {
        source.href = sourceUrl;
        source.target = '_blank';
        source.rel = 'noopener noreferrer';
      } else source.removeAttribute('href');
    }
    if (!dialog.open) dialog.showModal();
    const closeButton = $('#figure-close');
    if (closeButton) {
      closeButton.setAttribute('aria-label', copy[language].closeFigure);
      closeButton.focus({ preventScroll: true });
    }
  }

  function closeFigure(focusTarget) {
    const dialog = $('#figure-dialog');
    if (!dialog?.open) return;
    if (focusTarget) figureTrigger = focusTarget;
    dialog.close();
  }

  function renderContact() {
    const github = safeUrl(profile.github);
    for (const selector of ['#hero-github', '#contact-github']) {
      const anchor = $(selector);
      if (!anchor) continue;
      anchor.hidden = !github;
      if (github) {
        anchor.href = github;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      } else anchor.removeAttribute('href');
    }
    for (const selector of ['#sidebar-email', '#sidebar-email-address', '#email-link', '#copy-email']) {
      const element = $(selector);
      if (element) element.hidden = !hasEmail;
    }
    for (const selector of ['#sidebar-email', '#email-link']) {
      const anchor = $(selector);
      if (!anchor) continue;
      if (hasEmail) anchor.href = `mailto:${profile.email}`;
      else anchor.removeAttribute('href');
    }
    setText('#sidebar-email-address', hasEmail ? profile.email : '');
    setText('#email-link', hasEmail ? profile.email : '');
    clearTimeout(copyTimeout);
    setText('#copy-status', '');
  }

  function render() {
    const c = copy[language];
    const expanded = detailsState();
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = `${tr(profile.name)} | AI Systems & Architecture`;
    const description = $('meta[name="description"]');
    if (description) description.content = tr(profile.intro);
    $$('[data-i18n]').forEach((element) => {
      const value = c[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });
    $$('[data-i18n-aria]').forEach((element) => {
      const value = c[element.dataset.i18nAria];
      if (value !== undefined) element.setAttribute('aria-label', value);
    });
    setText('#language-label', language === 'zh' ? 'EN' : '中文');
    const languageButton = $('#language-button');
    if (languageButton) {
      languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
      languageButton.setAttribute('lang', language === 'zh' ? 'en' : 'zh-CN');
    }
    const otherLanguage = language === 'zh' ? 'en' : 'zh';
    setHTML('#hero-name', `${escape(tr(profile.name))} <span lang="${otherLanguage === 'zh' ? 'zh-CN' : 'en'}">${escape(profile.name[otherLanguage])}</span>`);
    setText('#sidebar-name', tr(profile.name));
    setText('#site-name', profile.name.en);
    setText('#sidebar-role', tr(profile.role));
    setText('#affiliation', tr(profile.affiliation));
    setText('#intro', tr(profile.intro));
    setText('#intro-secondary', tr(profile.introSecondary));
    const secondaryIntro = $('#intro-secondary');
    if (secondaryIntro) secondaryIntro.hidden = !tr(profile.introSecondary);
    const portrait = $('#portrait');
    if (portrait) {
      const source = safeAssetUrl(profile.portrait);
      portrait.hidden = !source;
      if (source) portrait.src = source;
      else portrait.removeAttribute('src');
      portrait.alt = tr(profile.name);
    }
    const cvUrl = safeAssetUrl(profile.cv);
    $$('[data-cv]').forEach((anchor) => {
      anchor.hidden = !cvUrl;
      if (cvUrl) {
        anchor.href = cvUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      } else anchor.removeAttribute('href');
    });
    setHTML('#interest-list', list(profile.interests).map((interest) => `<li>${escape(tr(interest))}</li>`).join(''));
    renderResearch();
    renderExperience();
    setHTML('#education-list', list(profile.education).map((item) => `<article class="education-card"><div class="education-content"><div class="record-header"><h3>${escape(tr(item.school))}</h3><div class="education-period">${escape(item.period)}</div></div><p class="degree">${escape(tr(item.degree))}</p>${tr(item.note) ? `<p class="education-note">${escape(tr(item.note))}</p>` : ''}</div></article>`).join(''));
    setHTML('#honors-list', list(profile.honors).map((item, index) => `<div class="honor${index === 0 ? ' highlighted' : ''}"><time>${escape(item.year)}</time><span class="honor-title">${escape(tr(item.title))}</span></div>`).join(''));
    setHTML('#skills-list', list(profile.skills).map((skill) => `<div class="skill-row"><h3>${escape(tr(skill.title))}</h3><p>${list(skill.items).map((item) => escape(tr(item))).join(', ')}</p></div>`).join(''));
    renderContact();
    setText('#copyright', `© ${new Date().getFullYear()} ${tr(profile.name)}`);
    $$('details[data-details]').forEach((element) => { element.open = expanded.get(element.dataset.details) ?? false; });
  }

  function preparePrint() {
    if (printSnapshot) return;
    closeFigure();
    printSnapshot = { title: document.title, details: detailsState() };
    document.title = `${tr(profile.name)} — ${language === 'zh' ? '个人履历' : 'CV'}`;
    $$('details[data-details]').forEach((element) => { element.open = true; });
  }

  function restoreAfterPrint() {
    if (!printSnapshot) return;
    document.title = printSnapshot.title;
    $$('details[data-details]').forEach((element) => { element.open = printSnapshot.details.get(element.dataset.details) ?? false; });
    printSnapshot = null;
  }

  $('#research-list')?.addEventListener('click', (event) => {
    const trigger = event.target.closest?.('button[data-figure]');
    if (!trigger || !event.currentTarget.contains(trigger)) return;
    const work = list(profile.research).find((item, index) => String(item.id || index) === trigger.dataset.figure);
    if (work) openFigure(work, trigger);
  });
  $('#figure-close')?.addEventListener('click', () => closeFigure());
  $('#figure-dialog')?.addEventListener('click', (event) => {
    const dialog = event.currentTarget;
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) closeFigure();
  });
  $('#figure-dialog')?.addEventListener('close', () => {
    const target = figureTrigger;
    figureTrigger = null;
    if (target?.isConnected) target.focus({ preventScroll: true });
  });

  $('#language-button')?.addEventListener('click', () => {
    closeFigure($('#language-button'));
    language = language === 'zh' ? 'en' : 'zh';
    try { localStorage.setItem('portfolio-language', language); }
    catch (_) { /* Browser storage is optional. */ }
    try {
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
    } catch (_) { /* Some local-file contexts do not allow history changes. */ }
    render();
    scheduleNavigationUpdate();
  });
  window.addEventListener('beforeprint', preparePrint);
  window.addEventListener('afterprint', restoreAfterPrint);
  $('#copy-email')?.addEventListener('click', async () => {
    if (!hasEmail) return;
    let success = false;
    try {
      await navigator.clipboard.writeText(profile.email);
      success = true;
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = profile.email;
      textarea.readOnly = true;
      textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.append(textarea);
      textarea.select();
      try { success = document.execCommand('copy'); }
      catch (_) { /* Show a manual-copy fallback if clipboard access is unavailable. */ }
      textarea.remove();
      $('#copy-email')?.focus({ preventScroll: true });
    }
    clearTimeout(copyTimeout);
    setText('#copy-status', copy[language][success ? 'copied' : 'copyFallback']);
    copyTimeout = setTimeout(() => setText('#copy-status', ''), 5000);
  });
  render();

  const navigationLinks = $$('.desktop-nav a[href^="#"]');
  const setActiveSection = (id) => navigationLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const sections = $$('main section[id]').filter((section) => navigationLinks.some((link) => link.hash === `#${section.id}`));
  let navigationFrame = null;
  const updateActiveSection = () => {
    const scrollOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const threshold = Math.max(($('.site-header')?.getBoundingClientRect().height ?? 0) + 20, scrollOffset) + 1;
    let activeSection = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) activeSection = section;
    }
    setActiveSection(activeSection?.id || 'about');
  };
  const scheduleNavigationUpdate = () => {
    if (navigationFrame !== null) return;
    navigationFrame = window.requestAnimationFrame(() => {
      navigationFrame = null;
      updateActiveSection();
    });
  };
  window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
  window.addEventListener('resize', scheduleNavigationUpdate);
  window.addEventListener('hashchange', scheduleNavigationUpdate);
  window.addEventListener('load', scheduleNavigationUpdate);
  navigationLinks.forEach((link) => link.addEventListener('click', scheduleNavigationUpdate));
  updateActiveSection();
})();
