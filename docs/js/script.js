// 语言数据
const languages = {
    en: {
        code: 'EN',
        name: 'English'
    },
    zh: {
        code: '中文',
        name: '中文'
    }
};

// 当前语言状态
let currentLanguage = 'en';
let portfolioData = null;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData().then(() => {
        initializeLanguage();
        initializeTabs();
        addLanguageSwitcher();
        addAnimations();
        addInteractiveEffects();
        addKeyboardShortcuts();
        renderContent();
    });
});

// 加载作品集数据
async function loadPortfolioData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        portfolioData = await response.json();
        console.log('Portfolio data loaded successfully');
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // 如果加载失败，使用默认数据或显示错误信息
        portfolioData = getDefaultData();
    }
}

// 获取默认数据（备用）
function getDefaultData() {
    return {
        personal: {
            name: "keta1930",
            tags: [
                { en: "Independent Developer", zh: "独立开发者" },
                { en: "AI Agent Engineer", zh: "AI Agent工程师" }
            ],
            bio: {
                en: "Passionate about building intelligent agent systems and contributing to open-source projects.",
                zh: "专注于构建智能Agent系统并为开源项目做贡献。"
            },
            contact: []
        },
        projects: [],
        papers: [],
        placeholders: {
            projects: { en: "More projects coming soon...", zh: "更多项目即将到来..." },
            papers: { en: "More papers coming soon...", zh: "更多论文即将到来..." }
        }
    };
}

// 渲染所有内容
function renderContent() {
    if (!portfolioData) return;

    renderPersonalInfo();
    renderProjects();
    renderPapers();
    renderNavigation();
    renderFooter();
}

// 渲染个人信息
function renderPersonalInfo() {
    const { personal } = portfolioData;

    // 渲染姓名
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        nameElement.textContent = personal.name;
    }

    // 渲染头像
    if (personal.avatar) {
        const avatarIcon = document.querySelector('.avatar i');
        if (avatarIcon && personal.avatar.icon) {
            avatarIcon.className = personal.avatar.icon;
        }
    }

    // 渲染标签
    const tagsContainer = document.querySelector('.tags');
    if (tagsContainer && personal.tags) {
        tagsContainer.innerHTML = '';
        personal.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.setAttribute('data-en', tag.en);
            tagElement.setAttribute('data-zh', tag.zh);
            tagElement.textContent = tag[currentLanguage];
            tagsContainer.appendChild(tagElement);
        });
    }

    // 渲染简介
    const bioElement = document.querySelector('.bio');
    if (bioElement && personal.bio) {
        bioElement.setAttribute('data-en', personal.bio.en);
        bioElement.setAttribute('data-zh', personal.bio.zh);
        bioElement.textContent = personal.bio[currentLanguage];
    }

    // 渲染联系方式
    const contactContainer = document.querySelector('.contact-links');
    if (contactContainer && personal.contact) {
        contactContainer.innerHTML = '';
        personal.contact.forEach(contact => {
            const linkElement = document.createElement('a');
            linkElement.href = contact.url;
            linkElement.className = 'contact-link';
            if (contact.type === 'github') {
                linkElement.target = '_blank';
            }

            linkElement.innerHTML = `
                <i class="${contact.icon}"></i>
                <span>${contact.label}</span>
            `;

            contactContainer.appendChild(linkElement);
        });
    }
}

// 渲染项目
function renderProjects() {
    const projectsGrid = document.querySelector('#projects .projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    // 渲染实际项目
    if (portfolioData.projects) {
        portfolioData.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }

    // 添加占位符卡片
    const placeholderCard = createPlaceholderCard('projects');
    projectsGrid.appendChild(placeholderCard);
}

// 渲染论文
function renderPapers() {
    const papersGrid = document.querySelector('#papers .projects-grid');
    if (!papersGrid) return;

    papersGrid.innerHTML = '';

    // 渲染实际论文
    if (portfolioData.papers) {
        portfolioData.papers.forEach(paper => {
            const paperCard = createPaperCard(paper);
            papersGrid.appendChild(paperCard);
        });
    }

    // 添加两个占位符卡片
    for (let i = 0; i < 2; i++) {
        const placeholderCard = createPlaceholderCard('papers');
        papersGrid.appendChild(placeholderCard);
    }
}

// 创建项目卡片
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const starsText = typeof project.stars === 'number' ? project.stars.toString() : project.stars;

    card.innerHTML = `
        <div class="project-header">
            <h3>
                <a href="${project.url}" target="_blank">${project.title}</a>
            </h3>
            <div class="project-stats">
                <span class="stars">
                    <i class="fas fa-star"></i>
                    ${starsText}
                </span>
            </div>
        </div>
        <p class="project-description" data-en="${project.description.en}" data-zh="${project.description.zh}">
            ${project.description[currentLanguage]}
        </p>
        <div class="project-links">
            ${project.links.map(link => `
                <a href="${link.url}" target="_blank" class="project-link">
                    <i class="${link.icon}"></i>
                    <span data-en="${link.label.en}" data-zh="${link.label.zh}">${link.label[currentLanguage]}</span>
                </a>
            `).join('')}
        </div>
    `;

    return card;
}

// 创建论文卡片
function createPaperCard(paper) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const titleText = typeof paper.title === 'string' ? paper.title : paper.title[currentLanguage];

    card.innerHTML = `
        <div class="project-header">
            <h3>
                <a href="${paper.url}" target="_blank">
                    <span data-en="${paper.title.en}" data-zh="${paper.title.zh}">${titleText}</span>
                </a>
            </h3>
        </div>
        <div class="paper-badges">
            ${paper.badges.map(badge => {
                if (badge.type === 'venue') {
                    return `<span class="venue-badge">${badge.text}</span>`;
                } else if (badge.type === 'corresponding') {
                    return `
                        <span class="venue-badge corresponding-author">
                            <i class="${badge.icon}"></i>
                            <span data-en="${badge.text.en}" data-zh="${badge.text.zh}">${badge.text[currentLanguage]}</span>
                        </span>
                    `;
                }
                return '';
            }).join('')}
        </div>
        <div class="project-links">
            ${paper.links.map(link => `
                <a href="${link.url}" target="_blank" class="project-link">
                    <i class="${link.icon}"></i>
                    <span data-en="${link.label.en}" data-zh="${link.label.zh}">${link.label[currentLanguage]}</span>
                </a>
            `).join('')}
        </div>
    `;

    return card;
}

// 创建占位符卡片
function createPlaceholderCard(type) {
    const card = document.createElement('div');
    card.className = 'project-card placeholder';

    const placeholderText = portfolioData.placeholders[type];

    card.innerHTML = `
        <div class="placeholder-content">
            <i class="fas fa-plus-circle"></i>
            <p data-en="${placeholderText.en}" data-zh="${placeholderText.zh}">${placeholderText[currentLanguage]}</p>
        </div>
    `;

    return card;
}

// 渲染导航
function renderNavigation() {
    if (!portfolioData.ui || !portfolioData.ui.nav) return;

    const navTabs = document.querySelectorAll('.nav-tab span');
    navTabs.forEach(span => {
        const tabName = span.getAttribute('data-en').toLowerCase();
        const navData = portfolioData.ui.nav[tabName];
        if (navData) {
            span.setAttribute('data-en', navData.en);
            span.setAttribute('data-zh', navData.zh);
            span.textContent = navData[currentLanguage];
        }
    });

    // 渲染页面标题
    const pageHeaders = portfolioData.ui.pageHeaders;
    if (pageHeaders) {
        // 项目页面标题
        const projectsHeader = document.querySelector('#projects .page-header');
        if (projectsHeader && pageHeaders.projects) {
            const title = projectsHeader.querySelector('h1');
            const subtitle = projectsHeader.querySelector('p');

            if (title) {
                title.setAttribute('data-en', pageHeaders.projects.title.en);
                title.setAttribute('data-zh', pageHeaders.projects.title.zh);
                title.textContent = pageHeaders.projects.title[currentLanguage];
            }

            if (subtitle) {
                subtitle.setAttribute('data-en', pageHeaders.projects.subtitle.en);
                subtitle.setAttribute('data-zh', pageHeaders.projects.subtitle.zh);
                subtitle.textContent = pageHeaders.projects.subtitle[currentLanguage];
            }
        }

        // 论文页面标题
        const papersHeader = document.querySelector('#papers .page-header');
        if (papersHeader && pageHeaders.papers) {
            const title = papersHeader.querySelector('h1');
            const subtitle = papersHeader.querySelector('p');

            if (title) {
                title.setAttribute('data-en', pageHeaders.papers.title.en);
                title.setAttribute('data-zh', pageHeaders.papers.title.zh);
                title.textContent = pageHeaders.papers.title[currentLanguage];
            }

            if (subtitle) {
                subtitle.setAttribute('data-en', pageHeaders.papers.subtitle.en);
                subtitle.setAttribute('data-zh', pageHeaders.papers.subtitle.zh);
                subtitle.textContent = pageHeaders.papers.subtitle[currentLanguage];
            }
        }
    }
}

// 渲染页脚
function renderFooter() {
    if (!portfolioData.ui || !portfolioData.ui.footer) return;

    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.setAttribute('data-en', portfolioData.ui.footer.en);
        footerText.setAttribute('data-zh', portfolioData.ui.footer.zh);
        footerText.textContent = portfolioData.ui.footer[currentLanguage];
    }
}

// 初始化语言设置
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    currentLanguage = savedLanguage;
    updatePageLanguage(currentLanguage);
    updateLanguageButton();
}

// 初始化标签页
function initializeTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

// 切换标签页
function switchTab(targetTab) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelector(`[data-tab="${targetTab}"]`).classList.add('active');
    document.getElementById(targetTab).classList.add('active');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加语言切换功能
function addLanguageSwitcher() {
    const langSwitcher = document.getElementById('langSwitcher');
    const currentLangSpan = document.getElementById('currentLang');

    langSwitcher.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';

        document.body.classList.add('lang-switching');

        setTimeout(() => {
            updatePageLanguage(currentLanguage);
            updateLanguageButton();
            localStorage.setItem('preferred-language', currentLanguage);
            document.body.classList.remove('lang-switching');
        }, 150);
    });
}

// 更新页面语言
function updatePageLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-zh]');

    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// 更新语言按钮显示
function updateLanguageButton() {
    const currentLangSpan = document.getElementById('currentLang');
    currentLangSpan.textContent = languages[currentLanguage].code;
}

// 添加动画效果
function addAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.project-card, .hero-section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 添加交互效果
function addInteractiveEffects() {
    addProjectCardEffects();
    addAvatarEffects();
    addNavTabEffects();
}

// 项目卡片效果
function addProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card:not(.placeholder)');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return;

            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = 60;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 107, 107, 0.3);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 10;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 头像效果
function addAvatarEffects() {
    const avatar = document.querySelector('.avatar');

    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(255, 107, 107, 0.3)';
        });

        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.2)';
        });
    }
}

// 导航标签效果
function addNavTabEffects() {
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// 添加键盘快捷键
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    switchTab('about');
                    break;
                case '2':
                    e.preventDefault();
                    switchTab('projects');
                    break;
                case '3':
                    e.preventDefault();
                    switchTab('papers');
                    break;
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            document.getElementById('langSwitcher').click();
        }
    });
}

// 添加涟漪动画CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// 页面加载进度效果
function showLoadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF6B6B, #FF8E8E);
        z-index: 9999;
        transition: width 0.3s ease;
    `;

    document.body.appendChild(progressBar);

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => progressBar.remove(), 300);
            }, 200);
        }
        progressBar.style.width = progress + '%';
    }, 50);
}

showLoadingProgress();

// 平滑滚动到锚点
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 性能优化：图片懒加载
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 初始化所有功能
function initializeAll() {
    addSmoothScrolling();
    lazyLoadImages();
}

// 页面完全加载后执行额外初始化
window.addEventListener('load', initializeAll);

// 控制台彩蛋
console.log(`
%c🍑 Welcome to keta1930's Portfolio! 
%c🌟 Built with love using peach-themed design
%c💻 Keyboard shortcuts:
   Alt + 1/2/3: Switch tabs
   Ctrl/Cmd + Shift + L: Toggle language
%c🔗 Check out the source: https://github.com/keta1930/resume
`,
'font-size: 18px; color: #FF6B6B; font-weight: bold;',
'font-size: 14px; color: #FF8E8E;',
'font-size: 12px; color: #636E72;',
'font-size: 12px; color: #B2BEC3;'
);

// 添加页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '👋 Come back! - keta1930';
    } else {
        document.title = 'keta1930 - Portfolio';
    }
});