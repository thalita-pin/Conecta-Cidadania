'use strict';

// Todas as atividades funcionam no próprio navegador. Não há envio a servidores.
const $ = (selector) => document.querySelector(selector);
const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Menu móvel.
const menuToggle = $('.menu-toggle');
const primaryNav = $('#primary-nav');
menuToggle.addEventListener('click', () => {
  const opened = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!opened));
  menuToggle.setAttribute('aria-label', opened ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
  primaryNav.classList.toggle('is-open', !opened);
});
primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  primaryNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
}));

// Acessibilidade.
let fontScale = 1;
$('#font-plus').addEventListener('click', () => {
  fontScale = fontScale >= 1.32 ? 1 : Math.round((fontScale + .08) * 100) / 100;
  document.documentElement.style.setProperty('--font-scale', fontScale);
  $('#font-plus').title = fontScale === 1 ? 'Aumentar letra' : `Tamanho atual: ${Math.round(fontScale * 100)}%`;
});
$('#font-reset').addEventListener('click', () => {
  fontScale = 1;
  document.documentElement.style.setProperty('--font-scale', '1');
});
$('#contrast-toggle').addEventListener('click', (event) => {
  const state = document.body.classList.toggle('high-contrast');
  event.currentTarget.setAttribute('aria-pressed', String(state));
});

// Filtra os tutoriais pelo texto de suas descrições e palavras-chave.
const lessonCards = Array.from(document.querySelectorAll('.lesson'));
$('#lesson-search').addEventListener('input', (event) => {
  const query = normalize(event.target.value.trim());
  let visible = 0;
  lessonCards.forEach((card) => {
    const content = normalize(card.textContent + ' ' + (card.dataset.keywords || ''));
    const show = !query || content.includes(query);
    card.hidden = !show;
    if (show) visible++;
  });
  $('#lesson-empty').hidden = visible !== 0;
  $('#lesson-search-status').textContent = query ? `${visible} tutorial(is) encontrado(s).` : '';
});

// Exercício de encontrar serviços: apenas uma lista demonstrativa com links oficiais.
const serviceCatalog = [
  { title: 'Serviços e informações do Brasil', subtitle: 'Pesquise qualquer área ou abra as categorias de serviços.', tags: 'servicos gov cidadania busca governo portal consulta', url: 'https://www.gov.br/pt-br/servicos' },
  { title: 'Criar uma conta Gov.br', subtitle: 'Consulte os passos e os requisitos de acesso.', tags: 'gov conta cpf cadastro identidade digital', url: 'https://www.gov.br/pt-br/servicos/criar-sua-conta-gov.br' },
  { title: 'Enem — informações e inscrição', subtitle: 'Leia as orientações do serviço e consulte o edital vigente.', tags: 'enem inep escola educacao ensino medio faculdade inscricao', url: 'https://www.gov.br/pt-br/servicos/fazer-o-exame-nacional-do-ensino-medio' },
  { title: 'Carteira de Trabalho Digital', subtitle: 'Saiba como acessar informações profissionais e contratos.', tags: 'trabalho carteira emprego profissional ctps', url: 'https://www.gov.br/pt-br/servicos/obter-a-carteira-de-trabalho' },
  { title: 'Meu SUS Digital', subtitle: 'Conheça os recursos de informações de saúde.', tags: 'sus saude atendimento documentos vacina', url: 'https://www.gov.br/saude/pt-br/composicao/seidigi/meususdigital/perguntas-e-respostas/cidadao/1-o-que-e-o' },
  { title: 'Cadastro Único — perguntas frequentes', subtitle: 'Entenda como consultar informações sobre o cadastro.', tags: 'cadunico bolsa familia assistencia social beneficio renda', url: 'https://www.gov.br/mds/pt-br/acoes-e-programas/cadastro-unico/perguntas-frequentes-cadastro-unico' },
];
$('#service-search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const term = normalize($('#service-term').value.trim());
  const box = $('#service-results');
  box.replaceChildren();
  if (!term) {
    const p = document.createElement('p'); p.className = 'muted';
    p.textContent = 'Digite um assunto, por exemplo “Enem” ou “saúde”, para ver resultados.';
    box.append(p); return;
  }
  const hits = serviceCatalog.filter((s) => normalize([s.title,s.subtitle,s.tags].join(' ')).includes(term));
  const heading = document.createElement('h4');
  heading.textContent = hits.length ? `${hits.length} resultado(s) de exemplo` : 'Nenhum exemplo encontrado';
  box.append(heading);
  if (!hits.length) {
    const p = document.createElement('p'); p.className = 'muted';
    p.textContent = 'Tente outra palavra. Para pesquisar todos os serviços, use o portal oficial Gov.br.';
    const a = document.createElement('a'); a.href = 'https://www.gov.br/pt-br/servicos';
    a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = 'Abrir Gov.br ↗';
    box.append(p,a); return;
  }
  for (const s of hits) {
    const row = document.createElement('div'); row.className = 'service-item';
    const title = document.createElement('strong'); title.textContent = s.title;
    const caption = document.createElement('small'); caption.textContent = s.subtitle;
    const link = document.createElement('a'); link.href=s.url; link.target='_blank'; link.rel='noopener noreferrer';
    link.textContent='Consultar fonte oficial ↗'; link.setAttribute('aria-label',`Consultar ${s.title} em nova aba`);
    row.append(title,caption,link); box.append(row);
  }
});

// Formulário inteiramente fictício: os dados não são enviados nem salvos.
const practiceForm = $('#practice-form');
practiceForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = $('#form-feedback');
  const name = $('#fictional-name').value.trim();
  const school = $('#fictional-class').value;
  const topic = $('#fictional-topic').value;
  const confirmed = $('#fictional-confirm').checked;
  if (name.length < 2 || !school || !topic || !confirmed) {
    message.className = 'form-feedback error';
    message.textContent = 'Revise os campos obrigatórios (*) e marque a confirmação da simulação. Use somente dados inventados.';
    return;
  }
  message.className = 'form-feedback success';
  message.textContent = 'Muito bem! Você preencheu os campos obrigatórios e revisou sua escolha. Isto foi apenas um exercício; nenhuma inscrição foi enviada ou armazenada.';
});
practiceForm.addEventListener('reset', () => {
  const message = $('#form-feedback');
  message.textContent=''; message.className='form-feedback';
});

// Questionário objetivo. Cada resposta inclui uma explicação educativa.
const questions = [
  {
    question: 'Você precisa encontrar um serviço público pela internet. Qual é um bom primeiro passo?',
    options: ['Pedir o endereço a qualquer pessoa', 'Procurar pelo assunto no portal de serviços Gov.br', 'Preencher um formulário antes de ler sobre o serviço', 'Aguardar uma mensagem com um link'],
    answer: 1, explanation: 'O portal de serviços Gov.br permite pesquisar por assunto e oferece páginas com a descrição e as etapas de muitos serviços.'
  },
  {
    question: 'Ao abrir a página de um serviço público, que informação vale conferir antes de solicitá-lo?',
    options: ['A cor do botão principal', 'A quantidade de imagens da página', 'Quem pode utilizar, requisitos e etapas do serviço', 'O número de palavras do título'],
    answer: 2, explanation: 'A descrição, os requisitos e as etapas ajudam a entender se o serviço atende à necessidade e o que será preciso fazer.'
  },
  {
    question: 'Para que serve a conta Gov.br?',
    options: ['Para identificar o cidadão e acessar diferentes serviços digitais', 'Para substituir todas as matrículas escolares', 'Para comprar produtos em lojas virtuais', 'Para criar páginas em redes sociais'],
    answer: 0, explanation: 'A conta Gov.br permite a autenticação em diversos serviços públicos; cada serviço pode exigir um nível específico da conta.'
  },
  {
    question: 'Qual é a maneira adequada de consultar informações sobre a inscrição no Enem?',
    options: ['Seguir o calendário de qualquer ano anterior', 'Consultar apenas comentários de redes sociais', 'Usar um formulário de outro exame', 'Verificar o portal oficial do Inep e o edital da edição desejada'],
    answer: 3, explanation: 'Prazos, taxas e condições podem mudar a cada edição. O Inep e o edital vigente são as referências apropriadas.'
  },
  {
    question: 'O que pode ser consultado na Carteira de Trabalho Digital?',
    options: ['O boletim escolar completo', 'Informações da vida profissional e vínculos registrados', 'A lista de livros da biblioteca', 'Os horários do transporte escolar'],
    answer: 1, explanation: 'A Carteira de Trabalho Digital reúne informações profissionais e registros de contratos de trabalho, quando existentes.'
  },
  {
    question: 'Qual é a finalidade do Meu SUS Digital?',
    options: ['Oferecer cursos de direção', 'Inscrever estudantes em vestibulares', 'Reunir informações e documentos de saúde disponíveis em sistemas integrados ao SUS', 'Cadastrar empresas para emissão de notas fiscais'],
    answer: 2, explanation: 'A plataforma reúne informações relacionadas à saúde conforme os dados registrados nos sistemas integrados ao SUS.'
  },
  {
    question: 'Em um formulário digital, o que costuma indicar que um campo precisa ser preenchido?',
    options: ['A indicação “obrigatório” ou o símbolo *', 'O campo estar na primeira linha', 'O campo ter uma borda colorida', 'O campo possuir texto mais curto'],
    answer: 0, explanation: 'Muitos formulários identificam os campos obrigatórios com um asterisco ou uma indicação textual. Leia as instruções do formulário.'
  },
  {
    question: 'Antes de enviar um formulário on-line verdadeiro, qual atitude ajuda a evitar erros?',
    options: ['Preencher sem ler as perguntas', 'Enviar antes de verificar os anexos', 'Ignorar as instruções', 'Revisar as informações, opções e documentos exigidos'],
    answer: 3, explanation: 'Revisar o preenchimento e os anexos reduz a chance de deixar dados ou documentos necessários de fora.'
  },
  {
    question: 'Depois de solicitar um serviço público, como você pode acompanhar o pedido?',
    options: ['Fazendo uma nova solicitação todos os dias', 'Verificando o comprovante e as instruções de acompanhamento do serviço', 'Aguardando sem consultar orientações', 'Apagando o número de protocolo recebido'],
    answer: 1, explanation: 'Quando há comprovante ou protocolo, ele pode ser importante para consultar o andamento. O procedimento depende do serviço.'
  },
  {
    question: 'Por que tutoriais acessíveis ajudam a reduzir desigualdades digitais?',
    options: ['Porque substituem todos os órgãos públicos', 'Porque eliminam a necessidade de internet', 'Porque podem tornar mais compreensíveis as etapas de acesso aos serviços', 'Porque garantem a aprovação de qualquer solicitação'],
    answer: 2, explanation: 'Orientações claras ajudam pessoas com diferentes níveis de experiência a entender como acessar informações e serviços; não garantem aprovação nem dispensam requisitos oficiais.'
  }
];
let questionIndex=0;
let quizAnswers=[];
let answerChecked=false;
const questionArea = $('#quiz-question-area');
const feedbackArea = $('#quiz-feedback');
const nextButton = $('#quiz-next');
const restartButton = $('#quiz-restart');

function renderQuestion(){
  answerChecked = false;
  const item = questions[questionIndex];
  questionArea.replaceChildren(); feedbackArea.replaceChildren();
  $('#quiz-progress-label').textContent = `Pergunta ${questionIndex+1} de ${questions.length}`;
  $('#quiz-progress').setAttribute('aria-valuenow', String(questionIndex));
  $('#quiz-progress-fill').style.width = `${100 * questionIndex / questions.length}%`;
  const p = document.createElement('p'); p.className = 'quiz-question'; p.textContent=item.question;
  const optionList = document.createElement('div'); optionList.className = 'quiz-options'; optionList.setAttribute('role','radiogroup'); optionList.setAttribute('aria-label','Escolha uma resposta');
  item.options.forEach((choice, index) => {
    const label = document.createElement('label'); label.className='quiz-option';
    const radio = document.createElement('input'); radio.type='radio'; radio.name='quiz-choice'; radio.value=String(index);
    radio.addEventListener('change',() => { nextButton.disabled=false; });
    const text = document.createElement('span'); text.textContent=choice;
    label.append(radio,text); optionList.append(label);
  });
  questionArea.append(p,optionList);
  nextButton.hidden=false; nextButton.disabled=true; nextButton.textContent='Conferir resposta →';
  restartButton.hidden=true;
}
function saveAnonymousCount(score){
  try {
    const stored = JSON.parse(localStorage.getItem('conecta-quiz-totais') || '{}');
    const total = Number(stored.total)||0;
    const sum = Number(stored.sum)||0;
    localStorage.setItem('conecta-quiz-totais',JSON.stringify({total:total+1,sum:sum+score}));
  } catch (_) { /* modo privado ou armazenamento bloqueado: tudo continua funcionando */ }
}
function showLocalCount(){
  try {
    const stored = JSON.parse(localStorage.getItem('conecta-quiz-totais') || '{}');
    if (stored.total) $('#quiz-local-note').textContent = `Neste navegador: ${stored.total} questionário(s) concluído(s). Não representa o total de visitantes do site.`;
  } catch (_) { /* sem armazenamento local */ }
}
function evaluateAnswer(){
  const selected=questionArea.querySelector('input[name="quiz-choice"]:checked');
  if(!selected) return;
  const choice=Number(selected.value); const item=questions[questionIndex];
  quizAnswers[questionIndex]=choice; answerChecked=true;
  const correct=choice===item.answer;
  questionArea.querySelectorAll('input').forEach((radio) => {radio.disabled=true; const row=radio.closest('.quiz-option'); if(Number(radio.value)===item.answer) row.classList.add('is-correct'); else if(Number(radio.value)===choice) row.classList.add('is-wrong'); });
  const note=document.createElement('div'); note.className=correct?'feedback-positive':'feedback-negative';
  const strong=document.createElement('strong'); strong.textContent=correct?'Resposta correta! ':'Vamos revisar: ';
  note.append(strong,document.createTextNode(item.explanation)); feedbackArea.append(note);
  nextButton.textContent=questionIndex===questions.length-1?'Ver meu resultado →':'Próxima pergunta →';
}
function showResults(){
  const score=quizAnswers.reduce((total,choice,index)=>total+(choice===questions[index].answer?1:0),0);
  saveAnonymousCount(score);
  $('#quiz-progress-label').textContent='Questionário concluído';
  $('#quiz-progress').setAttribute('aria-valuenow',String(questions.length));
  $('#quiz-progress-fill').style.width='100%';
  questionArea.replaceChildren();feedbackArea.replaceChildren();
  const article=document.createElement('div');article.className='result-card';
  const icon=document.createElement('div');icon.className='result-icon';icon.textContent=score>=7?'★':'✦';
  const amount=document.createElement('div');amount.className='result-score';
  amount.textContent=`${score}`; const small=document.createElement('small');small.textContent=` / ${questions.length}`;amount.append(small);
  const heading=document.createElement('h3');heading.textContent=score>=7?'Muito bem! Continue explorando.':'Você aprendeu algo novo!';
  const para=document.createElement('p');para.textContent=score>=7?'Você acertou pelo menos 70% das questões. Releia os tutoriais sempre que precisar.':'Revise os tutoriais e tente novamente. Aprender leva prática!';
  article.append(icon,amount,heading,para);
  const exportButton=document.createElement('button');exportButton.type='button';exportButton.className='button button-ghost';exportButton.textContent='Salvar resultado em texto ↓';
  exportButton.addEventListener('click',()=>{
    const content=`Conecta Cidadania — Questionário de aprendizagem\nPontuação: ${score} de ${questions.length}\nPercentual: ${Math.round(score/questions.length*100)}%\nData: ${new Date().toLocaleDateString('pt-BR')}\n\nResultado pessoal para estudo. Não são coletados dados de identificação.\n`;
    const blob=new Blob([content],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='resultado-conecta-cidadania.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  article.append(exportButton);
  const review=document.createElement('div');review.className='review-list';
  const title=document.createElement('h4');title.textContent='Revisão das respostas';review.append(title);
  questions.forEach((q,index)=>{
    const details=document.createElement('details'); const summary=document.createElement('summary');
    const isCorrect=quizAnswers[index]===q.answer;
    summary.textContent=`${index+1}. ${isCorrect?'✓':'↻'} ${q.question}`;
    const answer=document.createElement('p');answer.textContent=`Resposta indicada: ${q.options[q.answer]}. ${q.explanation}`;
    details.append(summary,answer);review.append(details);
  });
  article.append(review);questionArea.append(article);
  nextButton.hidden=true;restartButton.hidden=false;showLocalCount();
}
nextButton.addEventListener('click',()=>{
  if(!answerChecked){evaluateAnswer();return;}
  if(questionIndex<questions.length-1){questionIndex++;renderQuestion();}else{showResults();}
});
restartButton.addEventListener('click',()=>{questionIndex=0;quizAnswers=[];renderQuestion();$('#questionario').scrollIntoView({behavior:'smooth',block:'start'});});
renderQuestion();showLocalCount();
