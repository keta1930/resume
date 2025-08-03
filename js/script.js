// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    addSmoothScrolling();
    
    // 添加动画观察器
    addScrollAnimations();
    
    // 添加技能标签悬停效果
    addSkillTagEffects();
    
    // 添加项目卡片交互
    addProjectCardEffects();
});

// 平滑滚动效果
function addSmoothScrolling() {
    // 为页面内锚点链接添加平滑滚动
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

// 滚动动画效果
function addScrollAnimations() {
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

    // 观察所有section元素
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 技能标签效果
function addSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tags span');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 项目卡片效果
function addProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // 添加悬停时的倾斜效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateX(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
        
        // 添加点击涟漪效果
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = 60;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(52, 152, 219, 0.3);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
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

// 添加涟漪动画CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// 添加页面加载进度条
function addLoadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2ecc71);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => progressBar.remove(), 300);
            }, 200);
        }
        progressBar.style.width = progress + '%';
    }, 100);
}

// 启动加载进度条
addLoadingProgress();

// 添加快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 快速跳转到联系部分
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const contactSection = document.querySelector('.section:last-of-type');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// 添加右键菜单禁用（可选）
document.addEventListener('contextmenu', function(e) {
    // 如果需要禁用右键菜单，取消注释下面这行
    // e.preventDefault();
});

// 控制台彩蛋
console.log(`
%c👋 Hello there! 
%cWelcome to keta1930's resume
%cInterested in the code? Check out: https://github.com/keta1930
`, 
'font-size: 20px; color: #3498db;',
'font-size: 14px; color: #2c3e50;',
'font-size: 12px; color: #7f8c8d;'
);