/**
 * CONVITE DE CASAMENTO — ANA CLAUDIA & GABRIEL
 * Arquivo: script.js
 *
 * Funcionalidades:
 * 1. Mostrar os capítulos com uma animação ao rolar a página.
 * 2. Abrir o envelope e revelar o convite.
 * 3. Preparar uma mensagem de confirmação para o WhatsApp.
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
function initializeRsvp() {
  const rsvpButton = document.getElementById('rsvp');

  rsvpButton.addEventListener('click', () => {
    const name = prompt('Qual é o seu nome para a confirmação?');

    // Cancelar a pergunta ou deixar o nome vazio encerra a operação.
    if (!name) {
      return;
    }

    const going = confirm(
      'Você poderá comparecer ao casamento?\n\n' +
      'OK = Vou comparecer\n' +
      'Cancelar = Não poderei ir'
    );

    const message = going
      ? `Olá, Gabriel e Ana! Aqui é ${name}. Confirmo minha presença no casamento de vocês em 06/02/2027! 💙`
      : `Olá, Gabriel e Ana! Aqui é ${name}. Infelizmente não poderei comparecer ao casamento, mas desejo muitas felicidades! 💙`;

    // encodeURIComponent permite usar caracteres especiais na URL.
    const whatsappUrl = 'https://wa.me/5561981798938?s=p' + encodeURIComponent(message);

    window.open(whatsappUrl, '_blank', 'noopener');
  });
}

// -----------------------------------------------------------------------
// 04. Inicialização
// -----------------------------------------------------------------------
// O atributo defer no HTML garante que os elementos já foram carregados.
initializeScrollReveal();
initializeEnvelope();
initializeRsvp();
