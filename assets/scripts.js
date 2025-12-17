/**
 * Gaia Pet Sitter - Main JavaScript
 * Gerencia funcionalidades de agendamento e navegação mobile
 * 
 * @fileoverview Script principal do site Gaia Pet Sitter
 * @author Gaia Pet Sitter
 * @version 1.0.0
 */

'use strict';

// ============================================
// Configuration
// ============================================

/**
 * Configurações da aplicação
 * @type {Object}
 */
const CONFIG = {
    whatsappNumber: '5575999652757',
    formResetDelay: 3000, // milissegundos
    messageBoxHideDelay: 3000, // milissegundos
};

// ============================================
// DOM Elements
// ============================================

/**
 * Elementos do DOM necessários para o funcionamento
 * @type {Object}
 */
const elements = {
    scheduleForm: null,
    menuButton: null,
    mobileMenu: null,
    messageBox: null,
    mobileMenuLinks: null,
};

// ============================================
// Utility Functions
// ============================================

/**
 * Aguarda o DOM estar completamente carregado
 * @param {Function} callback - Função a ser executada quando o DOM estiver pronto
 */
function domReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Obtém um elemento do DOM de forma segura
 * @param {string} selector - Seletor CSS
 * @param {string} errorMessage - Mensagem de erro caso o elemento não seja encontrado
 * @returns {HTMLElement|null} Elemento encontrado ou null
 */
function getElement(selector, errorMessage) {
    const element = document.querySelector(selector);
    if (!element && errorMessage) {
        console.error(errorMessage);
    }
    return element;
}

/**
 * Formata data para o padrão brasileiro (DD/MM/YYYY)
 * @param {string} dateString - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada no padrão brasileiro
 */
function formatDateToBrazilian(dateString) {
    if (!dateString) return '';
    
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) {
        console.warn('Formato de data inválido:', dateString);
        return dateString;
    }
    
    return `${day}/${month}/${year}`;
}

/**
 * Formata texto de quantidade de pets
 * @param {string} petType - Tipo do pet
 * @param {number} petCount - Quantidade de pets
 * @returns {string} Texto formatado
 */
function formatPetText(petType, petCount) {
    if (!petType || !petCount) return '';
    
    const petTypeLower = petType.toLowerCase();
    const count = parseInt(petCount, 10);
    
    if (isNaN(count) || count < 1) {
        return petTypeLower;
    }
    
    return count === 1 
        ? `${count} ${petTypeLower}` 
        : `${count} ${petTypeLower}s`;
}

/**
 * Valida se todos os campos obrigatórios estão preenchidos
 * @param {HTMLFormElement} form - Formulário a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
function validateForm(form) {
    const requiredFields = [
        'tutorName',
        'petType',
        'petCount',
        'service',
        'neighborhood',
        'date',
        'time'
    ];
    
    for (const fieldName of requiredFields) {
        const field = form[fieldName];
        if (!field || !field.value.trim()) {
            return false;
        }
    }
    
    return true;
}

/**
 * Exibe mensagem de feedback ao usuário
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da mensagem ('success' ou 'error')
 */
function showMessage(message, type = 'success') {
    if (!elements.messageBox) return;
    
    elements.messageBox.textContent = message;
    elements.messageBox.classList.remove('hidden', 'message-box', 'success', 'error');
    elements.messageBox.classList.add('message-box', type);
    
    // Auto-hide após delay
    setTimeout(() => {
        if (elements.messageBox) {
            elements.messageBox.classList.add('hidden');
        }
    }, CONFIG.messageBoxHideDelay);
}

/**
 * Constrói a mensagem formatada para WhatsApp
 * @param {Object} formData - Dados do formulário
 * @returns {string} Mensagem formatada
 */
function buildWhatsAppMessage(formData) {
    const {
        tutorName,
        petType,
        petCount,
        service,
        neighborhood,
        date,
        time,
        notes
    } = formData;
    
    const formattedDate = formatDateToBrazilian(date);
    const petText = formatPetText(petType, petCount);
    
    let message = `Olá! Meu nome é ${tutorName} e gostaria de solicitar um serviço de pet sitter.`;
    message += `\n\n🐕 Para agilizar o atendimento, seguem as informações:`;
    message += `\n\n1️⃣ *Meu nome:* ${tutorName}`;
    message += `\n2️⃣ *Animais:* ${petText}`;
    message += `\n3️⃣ *Bairro/Condomínio:* ${neighborhood}`;
    message += `\n4️⃣ *Datas:* ${formattedDate} às ${time}`;
    message += `\n5️⃣ *Serviço desejado:* ${service}`;
    
    if (notes && notes.trim()) {
        message += `\n\n*Observações adicionais:*\n${notes.trim()}`;
    }
    
    message += `\n\nAguardo retorno para confirmar disponibilidade! 😊`;
    
    return message;
}

/**
 * Abre WhatsApp com mensagem pré-formatada
 * @param {string} message - Mensagem a ser enviada
 */
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodedMessage}`;
    
    try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.error('Erro ao abrir WhatsApp:', error);
        showMessage('Erro ao abrir WhatsApp. Por favor, tente novamente.', 'error');
    }
}

/**
 * Coleta dados do formulário
 * @param {HTMLFormElement} form - Formulário
 * @returns {Object} Dados do formulário
 */
function getFormData(form) {
    return {
        tutorName: form.tutorName?.value.trim() || '',
        petType: form.petType?.value || '',
        petCount: form.petCount?.value || '',
        service: form.service?.value || '',
        neighborhood: form.neighborhood?.value.trim() || '',
        date: form.date?.value || '',
        time: form.time?.value || '',
        notes: form.notes?.value.trim() || '',
    };
}

// ============================================
// Event Handlers
// ============================================

/**
 * Manipula o envio do formulário de agendamento
 * @param {Event} event - Evento de submit
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = getFormData(form);
    
    // Validação
    if (!validateForm(form)) {
        showMessage('Por favor, preencha todos os campos obrigatórios do formulário.', 'error');
        return;
    }
    
    // Constrói e envia mensagem
    const message = buildWhatsAppMessage(formData);
    openWhatsApp(message);
    
    // Feedback de sucesso
    showMessage('Mensagem pronta! Abrindo o WhatsApp em uma nova aba para você enviar o agendamento.', 'success');
    
    // Limpa formulário após delay
    setTimeout(() => {
        form.reset();
    }, CONFIG.formResetDelay);
}

/**
 * Alterna visibilidade do menu mobile
 */
function toggleMobileMenu() {
    if (!elements.mobileMenu) return;
    
    const isHidden = elements.mobileMenu.classList.contains('hidden');
    elements.mobileMenu.classList.toggle('hidden');
    
    // Atualiza aria-expanded
    if (elements.menuButton) {
        elements.menuButton.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    }
}

/**
 * Fecha o menu mobile
 */
function closeMobileMenu() {
    if (!elements.mobileMenu) return;
    
    elements.mobileMenu.classList.add('hidden');
    
    if (elements.menuButton) {
        elements.menuButton.setAttribute('aria-expanded', 'false');
    }
}

// ============================================
// Initialization
// ============================================

/**
 * Inicializa todos os event listeners
 */
function initializeEventListeners() {
    // Formulário de agendamento
    if (elements.scheduleForm) {
        elements.scheduleForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Menu mobile
    if (elements.menuButton) {
        elements.menuButton.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar menu ao clicar em links
    if (elements.mobileMenuLinks && elements.mobileMenuLinks.length > 0) {
        elements.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

/**
 * Inicializa referências aos elementos do DOM
 */
function initializeElements() {
    elements.scheduleForm = getElement('#schedule-form', 'Formulário de agendamento não encontrado');
    elements.menuButton = getElement('#menu-button', 'Botão do menu mobile não encontrado');
    elements.mobileMenu = getElement('#mobile-menu', 'Menu mobile não encontrado');
    elements.messageBox = getElement('#message-box', 'Caixa de mensagem não encontrada');
    elements.mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
}

/**
 * Função principal de inicialização
 */
function init() {
    initializeElements();
    initializeEventListeners();
    
    console.log('Gaia Pet Sitter - Site inicializado com sucesso');
}

// ============================================
// Start Application
// ============================================

// Aguarda o DOM estar pronto antes de inicializar
domReady(init);
