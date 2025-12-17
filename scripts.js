// --- JavaScript para o Agendamento via WhatsApp ---
const PET_SITTER_WHATSAPP_NUMBER = '5575999652757';

document.getElementById('schedule-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const tutorName = form.tutorName.value.trim();
    const petType = form.petType.value;
    const petCount = form.petCount.value;
    const service = form.service.value;
    const neighborhood = form.neighborhood.value.trim();
    const date = form.date.value;
    const time = form.time.value;
    const notes = form.notes.value.trim();

    const msgBox = document.getElementById('message-box');
    msgBox.classList.add('hidden');

    if (!tutorName || !petType || !petCount || !service || !neighborhood || !date || !time) {
        msgBox.textContent = 'Por favor, preencha todos os campos obrigatórios do formulário.';
        msgBox.classList.remove('hidden', 'bg-green-100', 'text-green-700');
        msgBox.classList.add('bg-red-100', 'text-red-700');
        return;
    }

    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const petText = petCount == 1 ? `${petCount} ${petType.toLowerCase()}` : `${petCount} ${petType.toLowerCase()}s`;

    let message = `Olá! Meu nome é ${tutorName} e gostaria de solicitar um serviço de pet sitter.`;
    message += `\n\n🐕 Para agilizar o atendimento, seguem as informações:`;
    message += `\n\n1️⃣ *Meu nome:* ${tutorName}`;
    message += `\n2️⃣ *Animais:* ${petText}`;
    message += `\n3️⃣ *Bairro/Condomínio:* ${neighborhood}`;
    message += `\n4️⃣ *Datas:* ${formattedDate} às ${time}`;
    message += `\n5️⃣ *Serviço desejado:* ${service}`;

    if (notes) {
        message += `\n\n*Observações adicionais:*\n${notes}`;
    }

    message += `\n\nAguardo retorno para confirmar disponibilidade! 😊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PET_SITTER_WHATSAPP_NUMBER}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    msgBox.textContent = 'Mensagem pronta! Abrindo o WhatsApp em uma nova aba para você enviar o agendamento.';
    msgBox.classList.remove('hidden', 'bg-red-100', 'text-red-700');
    msgBox.classList.add('bg-green-100', 'text-green-700');

    setTimeout(() => {
        form.reset();
        msgBox.classList.add('hidden');
    }, 3000);
});

// --- JavaScript para Navegação Mobile ---
document.getElementById('menu-button').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

