// 维权工具箱功能
const aiResponses = {
    '起诉状': {
        free: '我可以帮您了解起诉状的基本结构：1. 原告被告信息 2. 诉讼请求 3. 事实与理由 4. 证据清单。如需生成完整文书，可使用积分兑换或增值服务。',
        points: '好的，我将为您生成起诉状。请提供：1. 您的姓名和对方姓名 2. 具体纠纷情况 3. 您的诉求。生成后，我们的志愿者会进行人工复核。',
        premium: '已为您生成专业起诉状，包含完整的法律依据和格式要求。同时提供证据清单建议和诉讼风险评估报告。'
    },
    '答辩状': {
        free: '答辩状需要针对原告的诉讼请求进行回应。基本结构包括：1. 答辩人信息 2. 对原告诉讼请求的回应 3. 答辩理由 4. 证据。',
        points: '正在为您生成答辩状，请稍候...',
        premium: '已生成答辩状，并附有法律依据分析和应对策略建议。'
    },
    '证据': {
        free: '证据收集要点：1. 书面证据（合同、协议）2. 电子证据（聊天记录、转账记录）3. 证人证言 4. 物证。建议按时间顺序整理。',
        points: '已为您整理证据清单，并标注每项证据的证明目的和重要性。',
        premium: '已生成完整证据清单，包含证据说明、证明目的、证据形式要求，并附有证据保全建议。'
    },
    '风险评估': {
        free: '诉前风险评估主要考虑：1. 证据是否充分 2. 诉讼时效是否过期 3. 对方履行能力 4. 诉讼成本。',
        points: '正在为您进行风险评估...',
        premium: '已完成综合风险评估，包括胜诉率预测、诉讼成本分析、执行风险评估和替代方案建议。'
    }
};

let currentServiceTier = 'free';

document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // 服务等级选择（这里简化处理，实际应该根据用户积分和付费情况）
    updateServiceTier();
});

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // 添加用户消息
    addMessage('user', message);
    chatInput.value = '';

    // 模拟AI响应
    setTimeout(() => {
        const response = generateAIResponse(message);
        addMessage('bot', response);
    }, 1000);
}

function addMessage(type, content) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = type === 'user' ? '👤' : '🤖';
    const isList = content.includes('•') || content.includes('1.');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            ${isList ? formatListContent(content) : `<p>${content}</p>`}
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatListContent(content) {
    // 简单的列表格式化
    return content.split('\n').map(line => {
        if (line.trim().startsWith('•') || line.trim().match(/^\d+\./)) {
            return `<p style="margin: 0.25rem 0;">${line}</p>`;
        }
        return `<p>${line}</p>`;
    }).join('');
}

function generateAIResponse(message) {
    // 简单的关键词匹配（实际应该使用AI API）
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('起诉状') || lowerMessage.includes('起诉')) {
        return aiResponses['起诉状'][currentServiceTier];
    } else if (lowerMessage.includes('答辩') || lowerMessage.includes('答辩状')) {
        return aiResponses['答辩状'][currentServiceTier];
    } else if (lowerMessage.includes('证据') || lowerMessage.includes('证据清单')) {
        return aiResponses['证据'][currentServiceTier];
    } else if (lowerMessage.includes('风险') || lowerMessage.includes('评估')) {
        return aiResponses['风险评估'][currentServiceTier];
    } else {
        return getDefaultResponse();
    }
}

function getDefaultResponse() {
    const responses = {
        free: '感谢您的咨询。我可以帮您了解基本的法律问题。如需生成法律文书或深度分析，建议使用积分兑换或增值服务。',
        points: '正在为您分析问题，请稍候...',
        premium: '已为您提供专业的法律分析和建议。如需进一步服务，请联系我们的专业律师团队。'
    };
    return responses[currentServiceTier];
}

function updateServiceTier() {
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    
    // 根据积分决定服务等级（简化逻辑）
    if (userPoints >= 100) {
        currentServiceTier = 'points';
    } else {
        currentServiceTier = 'free';
    }
}
