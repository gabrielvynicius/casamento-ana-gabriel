/**
 * CONVITE DE CASAMENTO — ANA CLAUDIA & GABRIEL
 * Arquivo: script.js
 *
 * Funcionalidades:
 * 1. Mostrar os capítulos com uma animação ao rolar a página.
 * 2. Abrir o envelope e revelar o convite.
 * 3. Preparar uma mensagem de confirmação para o WhatsApp.
 * 4. Exibir a contagem regressiva para o casamento.
 *
 * O site não utiliza bibliotecas JavaScript externas.
 */

// -----------------------------------------------------------------------
// 01. Animação de entrada dos capítulos
// -----------------------------------------------------------------------

/**
 * Observa os elementos com a classe .reveal.
 * Quando um elemento aparece na tela, a classe .visible ativa a animação
 * definida no CSS. Depois disso, não precisamos mais observá-lo.
 */
function initializeScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });
}

// -----------------------------------------------------------------------
// 02. Abertura do envelope
// -----------------------------------------------------------------------

/**
 * Abre o envelope uma única vez e revela a carta depois da animação.
 *
 * Tempos mantidos do código original:
 * - 950 ms: aguarda a abertura do envelope;
 * - 350 ms: aguarda um pouco antes de rolar até o convite.
 */
function initializeEnvelope() {
  const envelope = document.getElementById('envelope');
  const invitation = document.getElementById('invitation');
  const hint = document.getElementById('hint');

  envelope.addEventListener('click', () => {
    // Evita repetir a animação em cliques posteriores.
    if (envelope.classList.contains('open')) {
      return;
    }

    envelope.classList.add('open');
    hint.textContent = 'Com carinho, para você ♡';

    // Primeiro deixa a carta visível; depois ativa sua transição de entrada.
    setTimeout(() => {
      invitation.style.display = 'block';

      requestAnimationFrame(() => {
        invitation.classList.add('show');
      });

      // Centraliza o convite na tela para facilitar a leitura.
      setTimeout(() => {
        invitation.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 350);
    }, 950);
  });
}

// -----------------------------------------------------------------------
// 03. Confirmação de presença pelo WhatsApp
// -----------------------------------------------------------------------

/**
 * Pede o nome e a resposta do convidado.
 * Depois, abre o WhatsApp com uma mensagem previamente preenchida.
 *
 * Importante: o usuário ainda precisa escolher um contato e enviar
 * a mensagem. Este botão não envia mensagens automaticamente.
 */
// Redirecionamento direto para confirmação pelo WhatsApp
function initializeRsvp() {
  const rsvpButton = document.getElementById('rsvp');

  rsvpButton.addEventListener('click', () => {

    // Mensagem automática de confirmação
    const message = 
      'Olá, Ana Claudia e Gabriel! 💙 Confirmo minha presença no casamento de vocês em 06/02/2027!';

    // Número que receberá as confirmações
    const phone = '5561981798938';

    // Cria o link do WhatsApp com a mensagem preenchida
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Redireciona diretamente, sem popups
    window.location.href = whatsappUrl;

  });
}

// -----------------------------------------------------------------------
// 04. Contagem regressiva até a cerimônia
// -----------------------------------------------------------------------

/**
 * Atualiza os quatro números da contagem a cada segundo.
 *
 * COMO MUDAR A DATA: altere a constante weddingDate abaixo.
 * Formato: AAAA-MM-DDTHH:mm:ss-03:00.
 * O fuso -03:00 é o horário de Brasília em fevereiro de 2027.
 * O cálculo não depende do fuso horário do celular do convidado.
 */
function initializeCountdown() {
  const weddingDate = new Date('2027-02-06T16:00:00-03:00').getTime();
  const countdown = document.getElementById('countdown');
  const finishedMessage = document.getElementById('countdown-finished');

  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  // Insere um zero à esquerda em números de um dígito (ex.: 8 → 08).
  const twoDigits = (number) => String(number).padStart(2, '0');

  function updateCountdown() {
    const remainingMilliseconds = weddingDate - Date.now();

    // No dia do casamento, a contagem para e aparece uma mensagem.
    if (remainingMilliseconds <= 0) {
      countdown.classList.add('finished');
      finishedMessage.hidden = false;
      clearInterval(intervalId);
      return;
    }

    const totalSeconds = Math.floor(remainingMilliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = String(days);
    hoursElement.textContent = twoDigits(hours);
    minutesElement.textContent = twoDigits(minutes);
    secondsElement.textContent = twoDigits(seconds);
  }

  // Primeira atualização é imediata, sem esperar um segundo.
  // A próxima ocorre automaticamente a cada 1.000 milissegundos.
  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// -----------------------------------------------------------------------
// 05. Inicialização
// -----------------------------------------------------------------------
// O atributo defer no HTML garante que os elementos já foram carregados.
initializeScrollReveal();
initializeEnvelope();
initializeRsvp();
initializeCountdown();
