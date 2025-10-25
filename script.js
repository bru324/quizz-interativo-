document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos ---
  const telaInicial = document.getElementById('tela-inicial');
  const telaQuiz = document.getElementById('tela-quiz');
  const telaFinal = document.getElementById('tela-final');
  const botoesSerie = document.querySelectorAll('#botoes-series .btn');
  const nomeJogadorInput = document.getElementById('nomeJogador');
  const perguntaEl = document.getElementById('pergunta');
  const opcoesEl = document.getElementById('opcoes');
  const feedbackEl = document.getElementById('feedback');
  const numPerguntaEl = document.getElementById('numPergunta');
  const totalPerguntasEl = document.getElementById('totalPerguntas');
  const resultadoEl = document.getElementById('resultado');
  const btnVoltar = document.getElementById('btnVoltar');
  const barraProgressoInner = document.getElementById('barra-progresso-inner');
  const rankingEl = document.getElementById('ranking');
  const btnResetRanking = document.getElementById('btnResetRanking');

  // --- Perguntas por série ---
  const perguntasPorSerie = {
    "6":[
      {q:"Qual parte do computador processa as informações?", op:["HD","Processador","Monitor","Placa de vídeo"], a:"Processador"},
      {q:"Onde armazenamos arquivos permanentemente?", op:["RAM","HD","Teclado","SSD"], a:"HD"},
      {q:"Qual software usamos para criar apresentações?", op:["PowerPoint","Photoshop","Chrome","VS Code"], a:"PowerPoint"},
      {q:"Qual é o sistema que controla o computador?", op:["Sistema Operacional","Word","Placa de vídeo","Excel"], a:"Sistema Operacional"},
      {q:"Qual dispositivo usamos para digitar?", op:["Teclado","Mouse","Monitor","Pen Drive"], a:"Teclado"}
    ],
    "7":[
      {q:"Qual memória temporária usamos para rodar programas?", op:["RAM","HD","Monitor","SSD"], a:"RAM"},
      {q:"Qual software permite edição de planilhas?", op:["Excel","Word","Paint","VS Code"], a:"Excel"},
      {q:"Qual componente é responsável pelo vídeo?", op:["Placa de vídeo","Processador","Fonte","Mouse"], a:"Placa de vídeo"},
      {q:"O que significa CPU?", op:["Unidade Central de Processamento","Central de Programas","Computador Pessoal","Controle de Processos"], a:"Unidade Central de Processamento"},
      {q:"Qual software usamos para navegar na internet?", op:["Chrome","Word","Excel","Notepad"], a:"Chrome"}
    ],
    "8":[
      {q:"Qual porta conecta dispositivos como pendrive e mouse?", op:["USB","HDMI","Ethernet","VGA"], a:"USB"},
      {q:"Qual componente fornece energia ao computador?", op:["Fonte","Placa de vídeo","SSD","RAM"], a:"Fonte"},
      {q:"Qual software é usado para edição de imagens?", op:["Photoshop","Word","Excel","Chrome"], a:"Photoshop"},
      {q:"Qual dispositivo de saída produz som?", op:["Alto-falante","Monitor","Teclado","Mouse"], a:"Alto-falante"},
      {q:"Qual parte guarda dados temporariamente enquanto o computador está ligado?", op:["RAM","HD","SSD","GPU"], a:"RAM"}
    ],
    "9":[
      {q:"Qual a função da placa-mãe?", op:["Conectar componentes","Armazenar arquivos","Processar dados","Controlar rede"], a:"Conectar componentes"},
      {q:"Qual dispositivo permite apontar e clicar?", op:["Mouse","Teclado","Monitor","Scanner"], a:"Mouse"},
      {q:"Qual software é usado para criar planilhas?", op:["Excel","Word","Photoshop","PowerPoint"], a:"Excel"},
      {q:"Qual dispositivo de entrada lê códigos de barras?", op:["Leitor de código","Monitor","Teclado","Mouse"], a:"Leitor de código"},
      {q:"O que significa BIOS?", op:["Basic Input Output System","Binary Input Output System","Basic Internet Operating System","Central Processor"], a:"Basic Input Output System"}
    ],
    "1M":[
      {q:"Qual é a função de uma GPU dedicada?", op:["Processar gráficos","Armazenar dados","Controlar teclado","Gerenciar rede"], a:"Processar gráficos"},
      {q:"O que significa SSD?", op:["Solid State Drive","Super Speed Disk","System Storage Device","Single Storage Disk"], a:"Solid State Drive"},
      {q:"Qual software usamos para proteger o computador de vírus?", op:["Antivírus","Word","Excel","Photoshop"], a:"Antivírus"},
      {q:"O que é overclock?", op:["Aumentar desempenho do processador","Instalar memória","Atualizar sistema","Trocar placa-mãe"], a:"Aumentar desempenho do processador"},
      {q:"Qual cabo é usado para internet cabeada?", op:["Ethernet","USB","HDMI","VGA"], a:"Ethernet"}
    ],
    "2M":[
      {q:"O que faz um cooler no computador?", op:["Resfria componentes","Armazena arquivos","Processa dados","Conecta dispositivos"], a:"Resfria componentes"},
      {q:"Qual a função do sistema operacional?", op:["Gerenciar hardware e software","Editar vídeos","Armazenar arquivos","Proteger BIOS"], a:"Gerenciar hardware e software"},
      {q:"O que é uma rede LAN?", op:["Rede local","Rede global","Tipo de software","Hardware"], a:"Rede local"},
      {q:"Qual protocolo é usado para acessar sites HTTPS?", op:["HTTP/HTTPS","FTP","SMTP","POP3"], a:"HTTP/HTTPS"},
      {q:"Qual dispositivo conecta diferentes redes?", op:["Roteador","Mouse","HD","Teclado"], a:"Roteador"}
    ],
    "3M":[
      {q:"O que é virtualização de computadores?", op:["Rodar múltiplos sistemas em uma máquina","Armazenar arquivos em nuvem","Editar imagens","Proteger contra vírus"], a:"Rodar múltiplos sistemas em uma máquina"},
      {q:"O que é um hypervisor?", op:["Software de virtualização","Memória RAM","Placa-mãe","Processador"], a:"Software de virtualização"},
      {q:"O que significa RAID?", op:["Redundant Array of Independent Disks","Random Access of Internal Data","Real-time Access Internet Data","Read And Install Disk"], a:"Redundant Array of Independent Disks"},
      {q:"O que é um servidor?", op:["Computador que fornece serviços","Computador pessoal","Teclado","Monitor"], a:"Computador que fornece serviços"},
      {q:"O que é cloud computing?", op:["Uso de servidores remotos","Usar mais memória RAM","Placa de vídeo externa","Sistema operacional alternativo"], a:"Uso de servidores remotos"}
    ]
  };

  let perguntas = [];
  let perguntaAtual = 0;
  let acertos = 0;
  let jogador = "";
  let serieAtual = "";
  const rankingKey = 'rankingQuiz';

  // --- Funções úteis ---
  function shuffleArray(array) { return array.sort(() => Math.random() - 0.5); }

  function mostrarRanking() {
    let ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];
    rankingEl.innerHTML = "<h3>Ranking Top 5</h3>";
    let lista = document.createElement('ol');
    ranking.forEach(j => {
      let li = document.createElement('li');
      li.innerHTML = `<strong>${j.nome}</strong> (${j.serie}) - <span class="acertos">${j.acertos} acertos</span>`;
      lista.appendChild(li);
    });
    rankingEl.appendChild(lista);
  }

  function atualizarRanking(nome, serie, acertos) {
    let ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];
    ranking.push({nome, serie, acertos});
    ranking.sort((a,b) => b.acertos - a.acertos);
    localStorage.setItem(rankingKey, JSON.stringify(ranking.slice(0,5)));
    mostrarRanking();
  }

  // --- Reset ranking ---
  if(btnResetRanking){
    btnResetRanking.addEventListener('click', () => {
      if(confirm("Tem certeza que deseja resetar o ranking?")) {
        localStorage.removeItem(rankingKey);
        mostrarRanking();
      }
    });
  }

  // --- Escolher série e iniciar quiz ---
  botoesSerie.forEach(btn => {
    btn.addEventListener('click', () => {
      jogador = nomeJogadorInput.value.trim();
      if(jogador === "") return alert("Digite seu nome antes de iniciar o quiz!");
      serieAtual = btn.getAttribute('data-serie');
      perguntas = perguntasPorSerie[serieAtual];
      if(!perguntas || perguntas.length === 0) return alert("Não há perguntas para esta série!");

      perguntas = shuffleArray(perguntas.map(p => ({ ...p, op: shuffleArray(p.op) })));
      perguntaAtual = 0;
      acertos = 0;

      telaInicial.classList.add('hidden');
      telaQuiz.classList.remove('hidden');
      totalPerguntasEl.textContent = perguntas.length;
      mostrarPergunta();
    });
  });

  // --- Mostrar pergunta ---
  function mostrarPergunta() {
    const p = perguntas[perguntaAtual];
    perguntaEl.textContent = p.q;
    perguntaEl.style.color = "#000";
    opcoesEl.innerHTML = "";

    p.op.forEach(opcao => {
      const btn = document.createElement('button');
      btn.classList.add('opcao');
      btn.textContent = opcao;
      btn.addEventListener('click', () => checarResposta(opcao));
      opcoesEl.appendChild(btn);
    });

    numPerguntaEl.textContent = perguntaAtual + 1;
    barraProgressoInner.style.width = `${(perguntaAtual / perguntas.length)*100}%`;
    feedbackEl.classList.remove('show');
  }

  function checarResposta(resposta) {
    const correta = perguntas[perguntaAtual].a;
    if(resposta === correta){
      acertos++;
      feedbackEl.textContent = "Correto!";
      feedbackEl.style.color = "green";
    } else {
      feedbackEl.textContent = `Errado! A resposta correta é: ${correta}`;
      feedbackEl.style.color = "red";
    }
    feedbackEl.classList.add('show');
    perguntaAtual++;
    setTimeout(() => {
      if(perguntaAtual < perguntas.length) mostrarPergunta();
      else finalizarQuiz();
    }, 1500);
  }

  function finalizarQuiz() {
    telaQuiz.classList.add('hidden');
    telaFinal.classList.remove('hidden');
    resultadoEl.textContent = `${jogador} (${serieAtual}), você acertou ${acertos} de ${perguntas.length} perguntas.`;
    barraProgressoInner.style.width = "100%";
    atualizarRanking(jogador, serieAtual, acertos);
  }

  btnVoltar.addEventListener('click', () => {
    telaFinal.classList.add('hidden');
    telaInicial.classList.remove('hidden');
    nomeJogadorInput.value = "";
    barraProgressoInner.style.width = "0%";
  });

  mostrarRanking();
});
function atualizarRanking(nome, serie, acertos) {
  let ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];

  // Procura se já existe um jogador para essa série
  const idx = ranking.findIndex(j => j.nome === nome && j.serie === serie);
  if(idx > -1){
    // Atualiza somente se o novo acerto for maior
    if(acertos > ranking[idx].acertos){
      ranking[idx].acertos = acertos;
    }
  } else {
    ranking.push({nome, serie, acertos});
  }

  ranking.sort((a,b) => b.acertos - a.acertos);
  localStorage.setItem(rankingKey, JSON.stringify(ranking.slice(0,5)));
  mostrarRanking();
}
