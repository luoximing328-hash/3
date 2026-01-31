// 人格测试功能
const personalityQuestions = [
    {
        question: '当您遇到不公平待遇时，您首先会？',
        options: [
            { text: '立即收集证据，准备维权', score: { rational: 3, proactive: 2 } },
            { text: '先冷静分析情况，再决定是否维权', score: { rational: 2, cautious: 2 } },
            { text: '寻求朋友或专业人士的建议', score: { collaborative: 3, cautious: 1 } },
            { text: '先尝试私下协商解决', score: { collaborative: 2, cautious: 2 } }
        ]
    },
    {
        question: '在法庭上，您更倾向于？',
        options: [
            { text: '用事实和证据说话，逻辑清晰', score: { rational: 3, assertive: 2 } },
            { text: '表达自己的情感和诉求', score: { emotional: 3, assertive: 1 } },
            { text: '听从律师的建议，配合策略', score: { collaborative: 3, cautious: 1 } },
            { text: '保持冷静，观察对方反应', score: { cautious: 3, rational: 1 } }
        ]
    },
    {
        question: '面对复杂的法律问题，您会？',
        options: [
            { text: '深入研究相关法律条文', score: { rational: 3, proactive: 2 } },
            { text: '咨询专业律师', score: { collaborative: 3, cautious: 1 } },
            { text: '先了解类似案例', score: { cautious: 2, rational: 2 } },
            { text: '根据直觉和常识判断', score: { emotional: 2, proactive: 1 } }
        ]
    },
    {
        question: '您认为维权最重要的是？',
        options: [
            { text: '充分的证据和事实', score: { rational: 3, proactive: 1 } },
            { text: '专业的法律知识', score: { rational: 2, collaborative: 2 } },
            { text: '坚定的决心和勇气', score: { assertive: 3, proactive: 2 } },
            { text: '合理的策略和时机', score: { cautious: 3, rational: 1 } }
        ]
    },
    {
        question: '在维权过程中遇到挫折，您会？',
        options: [
            { text: '分析原因，调整策略继续', score: { rational: 3, proactive: 2 } },
            { text: '寻求更多支持和帮助', score: { collaborative: 3, emotional: 1 } },
            { text: '重新评估是否值得继续', score: { cautious: 3, rational: 1 } },
            { text: '坚持到底，不轻易放弃', score: { assertive: 3, proactive: 2 } }
        ]
    },
    {
        question: '您更倾向于哪种维权方式？',
        options: [
            { text: '直接起诉，通过法律途径解决', score: { assertive: 3, proactive: 2 } },
            { text: '先协商，协商不成再起诉', score: { collaborative: 2, cautious: 2 } },
            { text: '寻求调解或仲裁', score: { collaborative: 3, cautious: 2 } },
            { text: '根据具体情况灵活选择', score: { rational: 2, cautious: 2 } }
        ]
    }
];

const personalityTypes = {
    rational: {
        name: '理性分析型',
        icon: '🧠',
        desc: '您善于用逻辑和事实分析问题，注重证据和法律依据。在维权过程中，您会深入研究相关法律条文，用理性的方式解决问题。',
        strengths: ['逻辑思维强', '注重证据', '理性决策'],
        advice: '建议您继续保持理性分析的习惯，同时也要注意情感表达，让法官和对方更能理解您的诉求。'
    },
    assertive: {
        name: '坚定果断型',
        icon: '⚡',
        desc: '您有强烈的维权意识，面对不公不会轻易妥协。您敢于直接面对问题，用坚定的态度维护自己的权益。',
        strengths: ['意志坚定', '行动果断', '不轻易妥协'],
        advice: '您的坚定态度是优势，但也要注意策略和时机，避免过于激进导致不必要的冲突。'
    },
    collaborative: {
        name: '合作协商型',
        icon: '🤝',
        desc: '您倾向于通过协商和合作解决问题，善于寻求帮助和支持。您相信通过沟通可以找到双方都能接受的解决方案。',
        strengths: ['善于沟通', '寻求合作', '灵活变通'],
        advice: '您的协商能力很强，但在面对恶意侵权时，也要有坚定的底线，必要时果断采取法律手段。'
    },
    cautious: {
        name: '谨慎稳妥型',
        icon: '🛡️',
        desc: '您在维权前会充分评估风险和收益，倾向于选择稳妥的方式。您会仔细研究案例，避免不必要的风险。',
        strengths: ['谨慎评估', '风险意识强', '策略性强'],
        advice: '您的谨慎是优点，但也要避免过度犹豫，在证据充分的情况下要敢于行动。'
    },
    proactive: {
        name: '积极主动型',
        icon: '🚀',
        desc: '您会主动收集证据，提前准备，不等待问题发生。您相信预防胜于治疗，主动维护自己的权益。',
        strengths: ['主动准备', '预防意识强', '执行力强'],
        advice: '您的积极主动是很好的习惯，继续保持，同时也要注意不要过度敏感，合理评估风险。'
    },
    emotional: {
        name: '情感表达型',
        icon: '❤️',
        desc: '您重视情感和感受，在维权时会表达自己的真实情感。您相信情感的力量，能够打动人心。',
        strengths: ['情感丰富', '表达能力强', '有感染力'],
        advice: '情感表达很重要，但也要结合事实和证据，让情感成为支持诉求的有力工具。'
    }
};

let currentQuestionIndex = 0;
let personalityScores = {
    rational: 0,
    assertive: 0,
    collaborative: 0,
    cautious: 0,
    proactive: 0,
    emotional: 0
};

function startPersonalityTest() {
    currentQuestionIndex = 0;
    personalityScores = {
        rational: 0,
        assertive: 0,
        collaborative: 0,
        cautious: 0,
        proactive: 0,
        emotional: 0
    };
    renderPersonalityQuestion();
}

function renderPersonalityQuestion() {
    const simulatorContent = document.getElementById('simulatorContent');
    if (!simulatorContent) return;

    if (currentQuestionIndex >= personalityQuestions.length) {
        showPersonalityResult();
        return;
    }

    const question = personalityQuestions[currentQuestionIndex];
    
    simulatorContent.innerHTML = `
        <div class="personality-test-container">
            <div class="test-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((currentQuestionIndex + 1) / personalityQuestions.length) * 100}%"></div>
                </div>
                <p class="progress-text">第 ${currentQuestionIndex + 1} / ${personalityQuestions.length} 题</p>
            </div>
            <div class="test-question">
                <h3>${question.question}</h3>
            </div>
            <div class="test-options">
                ${question.options.map((option, index) => `
                    <div class="test-option" data-index="${index}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 添加选项点击事件
    simulatorContent.querySelectorAll('.test-option').forEach(option => {
        option.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            handlePersonalityAnswer(question.options[index].score);
        });
    });
}

function handlePersonalityAnswer(score) {
    // 累加分数
    Object.keys(score).forEach(key => {
        personalityScores[key] += score[key];
    });

    currentQuestionIndex++;
    
    // 延迟显示下一题，增加过渡效果
    setTimeout(() => {
        renderPersonalityQuestion();
    }, 300);
}

function showPersonalityResult() {
    const simulatorContent = document.getElementById('simulatorContent');
    if (!simulatorContent) return;

    // 找出得分最高的类型
    const sortedTypes = Object.entries(personalityScores)
        .sort((a, b) => b[1] - a[1]);
    
    const primaryType = sortedTypes[0][0];
    const secondaryType = sortedTypes[1][0];
    
    const primaryPersonality = personalityTypes[primaryType];
    const secondaryPersonality = personalityTypes[secondaryType];

    // 奖励法力值
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', userPoints + 15);
    updatePointsDisplay();

    simulatorContent.innerHTML = `
        <div class="personality-result">
            <h2 style="text-align: center; color: var(--primary-blue); margin-bottom: var(--spacing-lg);">测试完成！</h2>
            
            <div class="result-main">
                <div class="personality-card-primary">
                    <div class="personality-icon-large">${primaryPersonality.icon}</div>
                    <h3>${primaryPersonality.name}</h3>
                    <p class="personality-desc">${primaryPersonality.desc}</p>
                    <div class="personality-strengths">
                        <h4>您的优势：</h4>
                        <ul>
                            ${primaryPersonality.strengths.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="personality-advice">
                        <h4>建议：</h4>
                        <p>${primaryPersonality.advice}</p>
                    </div>
                </div>
                
                <div class="personality-card-secondary">
                    <div class="personality-icon">${secondaryPersonality.icon}</div>
                    <h4>次要特质：${secondaryPersonality.name}</h4>
                    <p>${secondaryPersonality.desc}</p>
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
