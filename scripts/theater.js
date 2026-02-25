// 法影剧场功能
const comicData = [
    {
        id: 1,
        title: '大学生求职防诈骗：兼职“刷漏洞”背后的套路',
        category: 'consumer',
        desc: '虚假“高薪兼职”“刷漏洞不用还款”，大学生一脚踏入诈骗陷阱背上高额债务。',
        emoji: '🎓',
        cover: '漫画/1.1.jpg',
        views: 1234,
        likes: 89,
        points: 10
    },
    {
        id: 2,
        title: '被公司违法辞退',
        category: 'labor',
        desc: '小李突然收到公司辞退通知，没有任何补偿...',
        emoji: '💼',
        views: 2345,
        likes: 156,
        points: 10
    },
    {
        id: 3,
        title: '租房遇到黑中介',
        category: 'property',
        desc: '小张租的房子突然被要求搬走，押金也不退...',
        emoji: '🏠',
        views: 1890,
        likes: 134,
        points: 10
    },
    {
        id: 4,
        title: '网购商品有质量问题',
        category: 'consumer',
        desc: '小刘买的手机用了三天就坏了，商家拒绝退货...',
        emoji: '📱',
        views: 3456,
        likes: 234,
        points: 10
    },
    {
        id: 5,
        title: '女寝矛盾升级',
        category: 'property',
        desc: '大学宿舍里的矛盾如何通过法律途径解决...',
        emoji: '👭',
        views: 5678,
        likes: 456,
        points: 10
    },
    {
        id: 6,
        title: '遭遇暴力裁员',
        category: 'labor',
        desc: '公司以各种理由逼迫员工主动离职...',
        emoji: '⚡',
        views: 4321,
        likes: 345,
        points: 10
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    renderComics();
    
    // 筛选按钮事件
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderComics();
        });
    });

    // 漫画详情模态框关闭逻辑
    const comicModal = document.getElementById('comicModal');
    if (comicModal) {
        const closeBtn = comicModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                comicModal.style.display = 'none';
            });
        }
        comicModal.addEventListener('click', function(e) {
            if (e.target === comicModal) {
                comicModal.style.display = 'none';
            }
        });
    }
});

function renderComics() {
    const comicGrid = document.getElementById('comicGrid');
    if (!comicGrid) return;

    const filteredComics = currentFilter === 'all' 
        ? comicData 
        : comicData.filter(comic => comic.category === currentFilter);

    comicGrid.innerHTML = filteredComics.map(comic => `
        <div class="comic-card" data-id="${comic.id}">
            <div class="comic-image ${comic.cover ? 'comic-image--cover' : ''}" ${comic.cover ? `style="background-image: url('${comic.cover}');"` : ''}>
                <span class="comic-emoji">${comic.emoji}</span>
                <span class="comic-badge">${getCategoryName(comic.category)}</span>
            </div>
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <p class="comic-desc">${comic.desc}</p>
                <div class="comic-meta">
                    <div class="comic-stats">
                        <span>👁️ ${comic.views}</span>
                        <span>❤️ ${comic.likes}</span>
                    </div>
                    <span class="points-badge">+${comic.points}法力值</span>
                </div>
            </div>
        </div>
    `).join('');

    // 添加点击事件
    comicGrid.querySelectorAll('.comic-card').forEach(card => {
        card.addEventListener('click', function() {
            const comicId = parseInt(this.getAttribute('data-id'));
            openComic(comicId);
        });
    });
}

function getCategoryName(category) {
    const names = {
        'contract': '合同纠纷',
        'labor': '劳动争议',
        'property': '财产纠纷',
        'consumer': '消费维权'
    };
    return names[category] || '其他';
}

function openComic(comicId) {
    const comic = comicData.find(c => c.id === comicId);
    if (!comic) return;

    // 增加阅读量
    comic.views++;
    
    // 奖励法力值
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', userPoints + comic.points);
    updatePointsDisplay();

    // 记录已读漫画
    const comicsRead = parseInt(localStorage.getItem('comicsRead') || '0');
    localStorage.setItem('comicsRead', comicsRead + 1);
    updateProfileStats();

    const comicModal = document.getElementById('comicModal');
    const comicContent = document.getElementById('comicContent');
    if (!comicModal || !comicContent) {
        return;
    }

    if (comicId === 1) {
        comicContent.innerHTML = `
            <div class="personality-result">
                <h2 style="text-align: center; color: var(--primary-blue); margin-bottom: var(--spacing-md);">
                    大学生求职防诈骗：在这部“法治爽文”里别当炮灰
                </h2>
                <p style="text-align:center; color: var(--gray-600); margin-bottom: var(--spacing-lg);">
                    漫画 + 真实案例 + 法律解析，一起拆穿“高薪兼职”“刷漏洞不用还款”的骗局。
                </p>
                <div class="comic-detail">
                    <!-- 真实案例配图：1.3 -->
                    <div class="comic-detail-section">
                        <div class="comic-detail-text">
                            <h3 style="color: var(--primary-blue); margin-bottom: var(--spacing-sm);">真实案例回溯：尹东彬诈骗案</h3>
                            <p style="color: var(--gray-700); line-height: 1.8; margin-bottom: var(--spacing-sm);">
                                2015–2016 年间，尹东彬等人在网上发布“分期贷款代理”“网站分期购物代理”等虚假招聘信息，
                                谎称可以“利用网站漏洞”，让大学生用自己的身份信息办理分期贷款或分期购机：
                            </p>
                            <ul style="color: var(--gray-700); line-height: 1.8; margin-left: 1.2rem; margin-bottom: var(--spacing-sm);">
                                <li>贷款所得款项，大学生可以“白得一半”；</li>
                                <li>分期购得的手机、平板上交后可以拿“好处费”；</li>
                                <li>最关键的谎言：所有债务都“无需本人偿还”。</li>
                            </ul>
                            <p style="color: var(--gray-700); line-height: 1.8; margin-bottom: var(--spacing-md);">
                                事实却是：所谓“漏洞”根本不存在，大学生申到的贷款被犯罪团伙瓜分，分期购得的实物被取走变卖，
                                所有债务却要由学生本人偿还。该团伙共诈骗 10 名大学生，涉案金额 205760 元，
                                尹东彬最终因诈骗罪被判处有期徒刑三年，并处罚金。
                            </p>
                        </div>
                        <div class="comic-detail-illustration">
                            <img src="漫画/1.3.jpg" alt="真实案例配图">
                        </div>
                    </div>

                    <!-- 概念辨析配图：1.1 -->
                    <div class="comic-detail-section alt">
                        <div class="comic-detail-illustration">
                            <img src="漫画/1.1.jpg" alt="概念辨析配图">
                        </div>
                        <div class="comic-detail-text">
                            <h3 style="color: var(--primary-blue); margin-bottom: var(--spacing-sm);">概念辨析：为什么是诈骗罪？</h3>
                            <p style="color: var(--gray-700); line-height: 1.8; margin-bottom: var(--spacing-sm);">
                                该案是诈骗罪的典型表现，其犯罪构成与求职场景完全对应：
                            </p>
                            <ul style="color: var(--gray-700); line-height: 1.8; margin-left: 1.2rem; margin-bottom: var(--spacing-sm);">
                                <li>欺骗行为：虚构“高薪兼职”“利用漏洞不用还款”等事实；</li>
                                <li>错误认识：使被害大学生误以为这是“有利可图且无风险”的合法代理工作；</li>
                                <li>处分财产：基于错误认识，学生处分了自己的信用权益和财产性利益；</li>
                                <li>获得财产与造成损失：犯罪分子获利，学生背负真金白银的债务。</li>
                            </ul>
                            <p style="color: var(--gray-700); line-height: 1.8; margin-bottom: var(--spacing-md);">
                                根据《刑法》第二百六十六条【诈骗罪】，诈骗公私财物数额较大的，将被追究刑事责任，处以相应刑罚和罚金。
                            </p>
                        </div>
                    </div>

                    <!-- 骗局剖析配图：1.2 -->
                    <div class="comic-detail-section">
                        <div class="comic-detail-text">
                            <h3 style="color: var(--primary-blue); margin-bottom: var(--spacing-sm);">骗局剖析：求职路上的高发陷阱</h3>
                            <ul style="color: var(--gray-700); line-height: 1.8; padding-left: 1.2rem; margin: 0 0 var(--spacing-sm);">
                                <li><strong>培训贷 / 内推费诈骗：</strong>以“保证录用”“内部名额”为由收取高额费用，随后失联。</li>
                                <li><strong>刷单兼职诈骗：</strong>打着“轻松赚佣金”的幌子，先给小额回报博信任，再诱导不断加大投入，最终无法提现。</li>
                                <li><strong>虚假实习协议：</strong>签订不具法律效力的“实习协议”，不支付报酬或随意辞退。</li>
                            </ul>
                            <p style="color: var(--gray-700); line-height: 1.8;">
                                这些骗局的共同特点是：承诺“高回报、零风险”，却要求你先掏钱或出借身份信息，一旦上钩就很难脱身。
                            </p>
                        </div>
                        <div class="comic-detail-illustration">
                            <img src="漫画/1.2.jpg" alt="骗局剖析配图">
                        </div>
                    </div>

                    <!-- 防骗指南配图：1.4 -->
                    <div class="comic-detail-section alt">
                        <div class="comic-detail-illustration">
                            <img src="漫画/1.4.jpg" alt="防骗指南配图">
                        </div>
                        <div class="comic-detail-text">
                            <h3 style="color: var(--primary-blue); margin-bottom: var(--spacing-sm);">防骗指南：守护你的身份和征信</h3>
                            <ul style="color: var(--gray-700); line-height: 1.8; padding-left: 1.2rem; margin: 0 0 var(--spacing-sm);">
                                <li><strong>任何“借用”实名账号的兼职，99% 有问题：</strong>身份证、学生证、银行卡、手机卡及各类实名 App 账号在法律上都是“你本人”的延伸。</li>
                                <li><strong>识破“漏洞”“灰色地带”话术：</strong>合法报酬来自真实劳动和服务，而不是所谓“系统缺陷”或“钻空子”。</li>
                                <li><strong>建立“债务防火墙”：</strong>以你名义发起的贷款、分期消费，法律责任最终都由你自己承担。</li>
                                <li><strong>立刻核实与求助：</strong>通过企业信息公示系统查公司真伪，并向老师、家长、学校保卫部门或警方求助。</li>
                            </ul>
                            <h4 style="color: var(--primary-blue); margin: var(--spacing-md) 0 var(--spacing-xs);">一句话总结</h4>
                            <p style="color: var(--gray-700); line-height: 1.8; margin-bottom: var(--spacing-sm);">
                                求职路上，最大的风险往往披着“机遇”的外衣。保护好自己的身份信息和征信记录，
                                比任何“轻松赚大钱”的机会都重要得多。
                            </p>
                            <p style="color: var(--gray-700); line-height: 1.8; margin: 0;">
                                不轻信、不乱签、不随意出借账号，用知识和法律武装自己，才能在现实版“法治爽文”里，当主角而不是炮灰。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        comicContent.innerHTML = `
            <div class="personality-result">
                <h2 style="text-align: center; color: var(--primary-blue); margin-bottom: var(--spacing-md);">
                    ${comic.title}
                </h2>
                <p style="text-align:center; color: var(--gray-600); margin-bottom: var(--spacing-lg);">
                    该漫画案例的详细图文内容即将上线，当前为预览模式。
                </p>
                <p style="color: var(--gray-700); line-height: 1.8;">
                    ${comic.desc}
                </p>
            </div>
        `;
    }

    comicModal.style.display = 'block';
    renderComics();
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        pointsElement.textContent = localStorage.getItem('userPoints') || '0';
    }
}

function updateProfileStats() {
    const comicsReadElement = document.getElementById('comicsRead');
    if (comicsReadElement) {
        comicsReadElement.textContent = localStorage.getItem('comicsRead') || '0';
    }
}
