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

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeTabs();
    addLanguageSwitcher();
    addAnimations();
    addInteractiveEffects();
    addKeyboardShortcuts();
});

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