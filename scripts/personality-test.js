// 人格测试题库（来源：人格测试题-清洁版.pdf）
const personalityQuiz = {
    title: '法影·高能法商挑战赛',
    subtitle: '在这部“法治爽文”里，你是主角还是炮灰？',
    // 计分规则：与 PDF 中 Q4 的示例一致（B=2，C=5）；其余题未标明分值，统一按 A=0、B=2、C=5。
    scoring: { A: 0, B: 2, C: 5 },
    questions: [
        {
            section: '第一关：钱包保卫战（消费与纠纷）',
            question: '你在二手平台买了个“99新”的平板，到手发现屏幕有划痕，卖家却说：“发货时是好的，是你掉包了，不退！”此时你会？',
            options: [
                { key: 'A', text: '气急败坏，在聊天框对卖家进行言语辱骂和人身攻击，发泄完直接拉黑。' },
                { key: 'B', text: '算了，几百块的东西，投诉太累，挂闲鱼低价卖了回点血。' },
                { key: 'C', text: '拿出“开箱视频”（不仅拍了快递面单还拍了拆封全过程），直接申请平台“小法庭”介入，并甩出一句“欺诈消费者，退一赔三了解一下？”' }
            ]
        },
        {
            section: '第一关：钱包保卫战（消费与纠纷）',
            question: '去理发店染发，结果 Tony 老师把你头发烫焦了，像枯草一样。店长说送你两次护理卡作为补偿。你会？',
            options: [
                { key: 'A', text: '勉强接受，反正头发已经坏了，能补救一点是一点。' },
                { key: 'B', text: '当场报警，并在小红书发避雷贴：“家人们谁懂啊，避雷这家黑店！”' },
                { key: 'C', text: '拒绝办卡，保留消费凭证和头发受损照片，去医院开具毛囊受损证明或去市监局投诉，要求退款并赔偿修复费用。' }
            ]
        },
        {
            section: '第一关：钱包保卫战（消费与纠纷）',
            question: '好兄弟找你借 5000 元应急，说好下周还。微信转账时，为了显得不生分，你会怎么做？',
            options: [
                { key: 'A', text: '直接发个“微信红包”或者转账，备注里发个表情包。' },
                { key: 'B', text: '转账过去，口头打个电话说一下。' },
                { key: 'C', text: '使用“微信转账”，并在备注栏明确写上“借款给 XX 用于应急，下周归还”，并截屏保存。' }
            ]
        },
        {
            section: '第二关：职场大逃杀（劳动与合同）',
            question: '入职第 29 天（试用期一个月），HR 突然找你谈话：“你性格不太适合我们团队，明天不用来了。”并拿出一张《主动离职申请单》让你签字。你签吗？',
            options: [
                { key: 'A', text: '觉得自己确实可能没表现好，尴尬地签了字走人。' },
                { key: 'B', text: '拍桌子不签，赖在公司不走，直到保安上来赶人。' },
                { key: 'C', text: '掏出手机打开录音，微笑着说：“如果是公司辞退，请出具《解除劳动合同通知书》，我不主动辞职。”转身就去玩法影随行的“AI 模拟仲裁”。' }
            ],
            pointsOverride: { B: 2, C: 5, A: 0 }
        },
        {
            section: '第二关：职场大逃杀（劳动与合同）',
            question: '老板周五半夜在群里发消息：“所有人，这份方案周一早上要用，辛苦大家周末在家优化一下。”你会怎么回？',
            options: [
                { key: 'A', text: '没有任何回复，默默在家干了两天，周一准时交货。' },
                { key: 'B', text: '假装没看见，周一上班说：“哎呀周末去山里露营没信号。”' },
                { key: 'C', text: '群里回复“收到，正在处理”，并在电脑上保存文档修改时间记录和微信聊天记录，离职时把这些作为“加班证据”一起算账。' }
            ]
        },
        {
            section: '第二关：职场大逃杀（劳动与合同）',
            question: '入职时老板画大饼：“我们是创业公司，前半年暂不交社保，把这部分钱直接折现发到你工资里，你到手钱更多哦！”你心里想？',
            options: [
                { key: 'A', text: '好像挺划算的，反正我年轻也不生病，同意！' },
                { key: 'B', text: '觉得不太对劲，但怕失去工作机会，勉强答应。' },
                { key: 'C', text: '即使表面答应，也会保留工资条和劳动合同。因为你知道：社保是法定义务，不能协议免除。只要举报，一告一个准，公司还得补缴。' }
            ]
        },
        {
            section: '第三关：生活修罗场（租房与侵权）',
            question: '退房时，房东拿着放大镜检查，指着墙上一个原本就有的钉眼说要扣 500 块。此时你最后悔没有做哪件事？',
            options: [
                { key: 'A', text: '后悔没给房东买点水果搞好关系。' },
                { key: 'B', text: '后悔当时没找中介，觉得中介能管这事。' },
                { key: 'C', text: '后悔入住第一天没有拍一个全屋细节视频并微信发给房东确认。现在只能去法影随行生成一份“律师函”吓唬他了。' }
            ]
        },
        {
            section: '第三关：生活修罗场（租房与侵权）',
            question: '你接到了一个推销电话，对方精准报出了你的姓名、住址甚至刚买的商品信息。你意识到这是某 APP 泄露的。你会？',
            options: [
                { key: 'A', text: '骂一句“神经病”挂断电话，继续过日子。' },
                { key: 'B', text: '以后收快递都用化名，地址写到小区门口蜂巢柜。' },
                { key: 'C', text: '对骚扰电话录音，询问数据来源，并向 12321 网络不良与垃圾信息举报中心投诉，或者使用平台的“一键生成投诉模板”发给涉事平台客服。' }
            ]
        },
        {
            section: '第四关：逻辑试金石',
            question: '如果你要打官司，对方死不认账。以下哪种证据在法官面前最“能打”？',
            options: [
                { key: 'A', text: '我七大姑八大姨写的一份联名保证书。' },
                { key: 'B', text: '我在他不知情的情况下，在他家卧室里偷偷装窃听器录的音。' },
                { key: 'C', text: '经过区块链存证或公证处公证的原始微信聊天记录和电子合同。' }
            ]
        },
        {
            section: '第四关：逻辑试金石',
            question: '当听说“AI 技术可以辅助普通人打官司”时，你内心最真实的反应是？',
            options: [
                { key: 'A', text: '怀疑与排斥。觉得法律是讲人情世故的，冷冰冰的机器怎么可能懂我的委屈？还是找熟人托关系更靠谱。' },
                { key: 'B', text: '谨慎尝试。觉得拿来查查法条、写写文书还行，能省点事，但真到了关键时刻，还是得花钱请真人律师才安心。' },
                { key: 'C', text: '拥抱机遇。这是一个打破阶层壁垒的机会！利用技术消除信息差，让我这种普通人在面对大公司或强势方时，也能拥有对等的博弈能力。' }
            ]
        }
    ],
    resultLevels: [
        {
            min: 45,
            title: '法治爽文·天选主角',
            icon: '👑',
            desc: '你知道在关键时刻该留证据、走流程、用规则反制，主角光环基本拉满。',
            advice: ['继续保持“证据先行”的习惯', '遇到纠纷先固定证据再沟通', '重要事项尽量书面/留痕']
        },
        {
            min: 30,
            title: '法治爽文·进阶主角',
            icon: '🧩',
            desc: '你已经具备不错的法商，但偶尔还会被情绪或侥幸心理带偏一点点。',
            advice: ['把“截图/录音/凭证”当成日常动作', '关键节点多用平台/官方渠道', '别怕麻烦：一次维权=一次护城河']
        },
        {
            min: 15,
            title: '法治爽文·谨慎路人',
            icon: '🧭',
            desc: '你能感到“不对劲”，但往往缺少可执行的维权动作，容易错过最佳证据窗口。',
            advice: ['先学会固定证据（聊天记录、凭证、视频）', '遇到劳动/消费纠纷先查流程再行动', '必要时寻求专业帮助或用 AI 工具辅助']
        },
        {
            min: 0,
            title: '法治爽文·高风险炮灰',
            icon: '🧨',
            desc: '你的维权意识和留痕习惯还比较弱，容易在关键时刻“无证据、无抓手”。',
            advice: ['把“留痕”设成默认：转账备注、合同、聊天记录', '情绪输出不解决问题，流程和证据才是硬通货', '从一个小习惯开始：开箱/入住/交接都录视频']
        }
    ]
};

let personalityQuestionIndex = 0;
let personalityTotalScore = 0;
let personalityAnswers = [];

function startPersonalityTest() {
    personalityQuestionIndex = 0;
    personalityTotalScore = 0;
    personalityAnswers = [];
    renderPersonalityQuestion();
}

function renderPersonalityQuestion() {
    const simulatorContent = document.getElementById('simulatorContent');
    if (!simulatorContent) return;

    if (personalityQuestionIndex >= personalityQuiz.questions.length) {
        showPersonalityResult();
        return;
    }

    const question = personalityQuiz.questions[personalityQuestionIndex];
    const progressPct = ((personalityQuestionIndex + 1) / personalityQuiz.questions.length) * 100;
    
    simulatorContent.innerHTML = `
        <div class="personality-test-container">
            <div class="test-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPct}%"></div>
                </div>
                <p class="progress-text">${personalityQuiz.title} · ${personalityQuiz.subtitle}</p>
                <p class="progress-text" style="margin-top: 4px;">${question.section} ｜ 第 ${personalityQuestionIndex + 1} / ${personalityQuiz.questions.length} 题</p>
            </div>
            <div class="test-question">
                <h3>${question.question}</h3>
            </div>
            <div class="test-options">
                ${question.options
                    .map((option, index) => `
                        <div class="test-option" data-index="${index}">
                            <strong style="margin-right: 6px;">${option.key}.</strong>${option.text}
                        </div>
                    `)
                    .join('')}
            </div>
        </div>
    `;

    // 添加选项点击事件
    simulatorContent.querySelectorAll('.test-option').forEach(option => {
        option.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            handlePersonalityAnswer(question, question.options[index]);
        });
    });
}

function getOptionPoints(question, optionKey) {
    if (question && question.pointsOverride && typeof question.pointsOverride[optionKey] === 'number') {
        return question.pointsOverride[optionKey];
    }
    return personalityQuiz.scoring[optionKey] ?? 0;
}

function handlePersonalityAnswer(question, option) {
    const points = getOptionPoints(question, option.key);
    personalityTotalScore += points;
    personalityAnswers.push({ q: personalityQuestionIndex + 1, key: option.key, points });

    personalityQuestionIndex++;
    
    // 延迟显示下一题，增加过渡效果
    setTimeout(() => {
        renderPersonalityQuestion();
    }, 300);
}

function showPersonalityResult() {
    const simulatorContent = document.getElementById('simulatorContent');
    if (!simulatorContent) return;
    const maxScore = personalityQuiz.questions.length * 5;
    const level =
        personalityQuiz.resultLevels.find(l => personalityTotalScore >= l.min) ||
        personalityQuiz.resultLevels[personalityQuiz.resultLevels.length - 1];

    // 奖励法力值
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', userPoints + 15);
    updatePointsDisplay();

    simulatorContent.innerHTML = `
        <div class="personality-result">
            <h2 style="text-align: center; color: var(--primary-blue); margin-bottom: var(--spacing-lg);">测试完成！</h2>
            
            <div class="result-main">
                <div class="personality-card-primary">
                    <div class="personality-icon-large">${level.icon}</div>
                    <h3>${level.title}</h3>
                    <p class="personality-desc">${personalityQuiz.title} · ${personalityQuiz.subtitle}</p>
                    <div class="personality-strengths">
                        <h4>你的得分：</h4>
                        <p style="margin: 0; opacity: 0.95;">${personalityTotalScore} / ${maxScore}</p>
                    </div>
                    <div class="personality-strengths">
                        <h4>解读：</h4>
                        <p style="margin: 0; opacity: 0.95;">${level.desc}</p>
                    </div>
                    <div class="personality-advice">
                        <h4>建议：</h4>
                        <ul>
                            ${level.advice.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="personality-card-secondary">
                    <div class="personality-icon">🧾</div>
                    <h4>你的选择分布</h4>
                    <p style="margin-bottom: 0;">
                        ${personalityAnswers
                            .map(a => `Q${a.q}：${a.key}（+${a.points}）`)
                            .join('<br>')}
                    </p>
                </div>
            </div>

            <div class="result-footer">
                <p style="text-align: center; color: var(--gray-600); margin-top: var(--spacing-lg);">
                    获得 15 法力值！
                </p>
                <button class="btn-primary" style="margin-top: var(--spacing-md);" onclick="location.reload()">
                    重新测试
                </button>
            </div>
        </div>
    `;
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        pointsElement.textContent = localStorage.getItem('userPoints') || '0';
    }
}

// 暴露函数到全局
window.startPersonalityTest = startPersonalityTest;
