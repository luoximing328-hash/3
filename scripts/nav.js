// 共享导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 设置当前页面的导航链接激活状态
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 个人中心链接
    const profileLinks = document.querySelectorAll('#profileLink, a[href="#profile"]');
    const profileModal = document.getElementById('profileModal');
    
    profileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (profileModal) {
                profileModal.style.display = 'block';
            }
        });
    });

    // 模态框控制
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                // 如果是志愿者模态框关闭，重置表单
                if (modal.id === 'volunteerModal') {
                    const form = document.getElementById('certificationForm');
                    if (form) form.reset();
                    // 重置内容为申请表单
                    const content = document.getElementById('volunteerModalContent');
                    if (content && !content.querySelector('#certificationForm')) {
                        location.reload();
                    }
                }
            }
        });
    });
});
