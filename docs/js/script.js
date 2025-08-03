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
    // 初始化语言设置
    initializeLanguage();
    
    // 初始化标签页
    initializeTabs();
    
    // 添加语言切换事件
    addLanguageSwitcher();
    
    // 添加动画效果
    addAnimations();
    
    // 添加交互效果
    addInteractiveEffects();
    
    // 添加键盘快捷键
    addKeyboardShortcuts();
});

// 初始化语言设置
function initializeLanguage() {
    // 从本地存储获取语言偏好，默认英文
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    currentLanguage = savedLanguage;
    
    // 更新页面语言
    updatePageLanguage(currentLanguage);
    
    // 更新语言按钮显示
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
    // 移除所有活动状态
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 添加新的活动状态
    document.querySelector(`[data-tab="${targetTab}"]`).classList.add('active');
    document.getElementById(targetTab).classList.add('active');
    
    // 平滑滚动到顶部
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
        // 切换语言
        currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
        
        // 添加切换动画
        document.body.classList.add('lang-switching');
        
        // 延迟更新内容以实现平滑过渡
        setTimeout(() => {
            updatePageLanguage(currentLanguage);
            updateLanguageButton();
            
            // 保存语言偏好
            localStorage.setItem('preferred-language', currentLanguage);
            
            // 移除切换动画
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
    
    // 更新页面语言属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// 更新语言按钮显示
function updateLanguageButton() {
    const currentLangSpan = document.getElementById('currentLang');
    currentLangSpan.textContent = languages[currentLanguage].code;
}

// 添加动画效果
function addAnimations() {
    // 观察器选项
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .hero-section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 添加交互效果
function addInteractiveEffects() {
    // 项目卡片悬停效果
    addProjectCardEffects();
    
    // 头像悬停效果
    addAvatarEffects();
    
    // 技能标签效果
    addSkillTagEffects();
    
    // 导航标签效果
    addNavTabEffects();
}

// 项目卡片效果
function addProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card:not(.placeholder)');
    
    projectCards.forEach(card => {
        // 鼠标进入效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 点击涟漪效果
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // 跳过链接点击
            
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

// 技能标签效果
function addSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tags span');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
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
        // Alt + 1/2/3 切换标签页
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
        
        // Ctrl/Cmd + Shift + L 切换语言
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

// 插入动画样式
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

// 启动加载进度
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

// 添加鼠标跟踪效果（可选）
function addMouseTracker() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 为某些元素添加鼠标跟踪效果
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const rect = hero.getBoundingClientRect();
            const x = ((mouseX - rect.left) / rect.width - 0.5) * 10;
            const y = ((mouseY - rect.top) / rect.height - 0.5) * 10;
            
            const avatar = hero.querySelector('.avatar');
            if (avatar) {
                avatar.style.transform = `translate(${x}px, ${y}px)`;
            }
        }
    });
}

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

// 性能优化：图片懒加载（如果有图片）
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
    // addMouseTracker(); // 可选：取消注释以启用鼠标跟踪效果
}

// 页面完全加载后执行额外初始化
window.addEventListener('load', initializeAll);