import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  FileText,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Calendar,
  Play,
  Pause,
  RotateCcw,
  Send,
  Copy,
  Check,
  ShieldAlert,
  TrendingUp,
  Layers,
  Zap,
  ChevronRight,
  RefreshCw,
  Trash2,
  GraduationCap,
  HeartPulse,
  Eye,
  EyeOff,
  HelpCircle,
  ListChecks,
  PenTool,
  ArrowRight
} from 'lucide-react';

// ============================================================================
// TEMAS OFICIAIS CURADOS (PADRÃO SÃO CAMILO - EDITAL 084/2026)
// ============================================================================
const INITIAL_THEMES = [
  {
    id: 'tema-1',
    daySuggestion: 'Dia 1 (19/10)',
    category: 'Saúde Pública, Ética & Redes Sociais',
    title: 'Automedicação, infodemia e os riscos do consumo de medicamentos influenciados pelas redes sociais',
    baseText: `Nos últimos anos, a popularização de conteúdos sobre saúde e bem-estar nas plataformas digitais transformou a relação da população brasileira com o uso de fármacos. Segundo levantamento do Conselho Federal de Farmácia (CFF), cerca de 77% dos brasileiros têm o hábito de se automedicar, comportamento que passou a ser amplificado pela atuação de influenciadores digitais que recomendam vitaminas, ansiolíticos, medicamentos para emagrecimento e substâncias manipuladas sem respaldo clínico individualizado. Esse fenômeno, associado à chamada "infodemia" — a circulação massiva de informações imprecisas ou descontextualizadas —, cria uma falsa sensação de segurança e autonomia terapêutica. Especialistas alertam que a banalização farmacológica não apenas mascara sintomas de doenças graves e provoca intoxicações ou interações medicamentosas perigosas, mas também enfraquece a relação ética entre pacientes e profissionais de saúde qualificados.`,
    problemSituation: `A partir da leitura do texto-base e de seus conhecimentos de mundo, redija um texto dissertativo-argumentativo (entre 250 e 450 palavras) posicionando-se sobre a seguinte situação-problema: Como combater a banalização da automedicação impulsionada pelas redes sociais e promover o uso racional e ético de medicamentos na sociedade contemporânea?`
  },
  {
    id: 'tema-2',
    daySuggestion: 'Dia 2 (20/10)',
    category: 'Meio Ambiente, Ciência & Saúde Única (One Health)',
    title: 'Descarte incorreto de resíduos farmacêuticos e seus impactos na Saúde Única (One Health)',
    baseText: `O avanço da indústria farmacêutica ampliou significativamente a expectativa e a qualidade de vida da humanidade. Entretanto, o destino final de medicamentos vencidos ou em desuso tornou-se um grave dilema ambiental e sanitário no século XXI. Estima-se que milhares de toneladas de fármacos — incluindo antibióticos, hormônios e anti-inflamatórios — sejam descartadas anualmente no lixo comum ou diretamente na rede de esgoto doméstica. Como as estações tradicionais de tratamento de água não conseguem filtrar integralmente essas moléculas químicas, tais substâncias contaminam rios, solos e lençóis freáticos. De acordo com a Organização Mundial da Saúde (OMS), sob a ótica do conceito de "Saúde Única" (One Health), a contaminação ambiental por resíduos farmacêuticos acelera o surgimento de superbactérias resistentes a antibióticos, ameaçando simultaneamente os ecossistemas, a fauna e a própria saúde humana.`,
    problemSituation: `Considerando a situação-problema apresentada no texto-base, produza um texto dissertativo-argumentativo (entre 250 e 450 palavras) analisando os caminhos éticos, educacionais e sociais necessários para frear o descarte inadequado de medicamentos e proteger o equilíbrio entre saúde humana e meio ambiente.`
  },
  {
    id: 'tema-3',
    daySuggestion: 'Dia 3 (21/10)',
    category: 'Comportamento, Tecnologia & Saúde Mental',
    title: 'Esgotamento mental, hiperconectividade e a necessidade de pausas na sociedade contemporânea',
    baseText: `A sociedade contemporânea vivencia um paradoxo tecnológico: embora os dispositivos móveis e a conectividade instantânea tenham sido criados para otimizar o tempo e aproximar indivíduos, observa-se um crescimento alarmante dos quadros de ansiedade, insônia e exaustão cognitiva, sobretudo entre jovens e estudantes. O filósofo contemporâneo Byung-Chul Han denomina esse cenário de "Sociedade do Cansaço", na qual o excesso de estímulos luminosos, notificações ininterruptas e a cobrança interna por produtividade constante eliminam os momentos de contemplação e silêncio. Sem pausas para o descanso mental, o cérebro humano permanece em estado contínuo de alerta, prejudicando a empatia, a capacidade de concentração profunda e o equilíbrio biopsicossocial.`,
    problemSituation: `Com base no texto motivador e em sua visão crítica, desenvolva uma dissertação argumentativa (entre 250 e 450 palavras) discutindo a seguinte situação-problema: De que maneira a cultura da hiperconectividade compromete a saúde mental na atualidade e por que resgatar espaços de pausa e equilíbrio tornou-se urgente para a qualidade de vida?`
  },
  {
    id: 'tema-4',
    daySuggestion: 'Dia 4 (22/10 - Simulado Final)',
    category: 'Cidadania, Direitos Humanos & Saúde Coletiva',
    title: 'Desafios éticos e sociais para garantir a humanização e o acesso equitativo à saúde no Brasil',
    baseText: `A Constituição Federal de 1988 consagrou a saúde como um direito fundamental de todos e um dever do Estado, pautado na universalidade e na dignidade da pessoa humana. Contudo, a realidade cotidiana brasileira ainda revela profundas assimetrias no acesso ao cuidado integral: enquanto parcelas privilegiadas da população usufruem de tecnologias biomédicas de ponta, grupos vulneráveis enfrentam filas, desinformação e escassez de atenção básica e assistência farmacêutica. Além da barreira socioeconômica, observa-se o desafio de preservar o atendimento humanizado diante de rotinas hospitalares e ambulatoriais cada vez mais mecanizadas e apressadas. Garantir saúde plena, portanto, exige unir excelência técnico-científica e sensibilidade ética voltada ao acolhimento do ser humano em sua totalidade.`,
    problemSituation: `Diante do cenário exposto no texto-base, elabore um texto dissertativo-argumentativo (entre 250 e 450 palavras) refletindo sobre a situação-problema: Como superar a desigualdade no acesso aos cuidados em saúde no Brasil e assegurar que o avanço científico caminhe lado a lado com a humanização do atendimento?`
  }
];

// ============================================================================
// CRONOGRAMA DOS 4 DIAS + DESCANSO + DIA DA PROVA
// ============================================================================
const STUDY_PLAN_DAYS = [
  {
    id: 'day-18',
    date: 'Hoje (18/10)',
    title: 'Noite de Descanso & Organização Mental',
    badge: 'Descanso Planejado',
    color: 'slate',
    tasks: [
      { id: 't18-1', text: 'Conhecer o aplicativo CamiloPrep e visualizar o plano dos 4 dias (sem estudar pesado hoje!).' },
      { id: 't18-2', text: 'Dormir bem para começar a segunda-feira (19/10) com energia total.' }
    ]
  },
  {
    id: 'day-19',
    date: 'Dia 1 • Segunda (19/10)',
    title: 'Domínio do Esqueleto de 4 Parágrafos & Calibragem de Palavras',
    badge: 'Dia Intensivo 1/4',
    color: 'emerald',
    tasks: [
      { id: 't19-1', text: 'Ler na aba "Folha de Ouro" a estrutura dos 4 parágrafos e os 4 repertórios coringas.' },
      { id: 't19-2', text: 'Digitar a Redação Treino #1 (Tema 1: Automedicação e Redes Sociais) com cronômetro de 60 min.' },
      { id: 't19-3', text: 'Calibrar o texto para ficar na Zona de Ouro (320 a 400 palavras) e corrigir na Banca IA.' }
    ]
  },
  {
    id: 'day-20',
    date: 'Dia 2 • Terça (20/10)',
    title: 'Técnica de Paráfrase (Zero Plágio) & Situação-Problema',
    badge: 'Dia Intensivo 2/4',
    color: 'emerald',
    tasks: [
      { id: 't20-1', text: 'Praticar 15 minutos no "Laboratório de Paráfrase" para nunca copiar frases do texto-base.' },
      { id: 't20-2', text: 'Digitar a Redação Treino #2 (Tema 2: Descarte de Fármacos / One Health) em 60 min.' },
      { id: 't20-3', text: 'Verificar no Detector de Plágio se há 0 trechos copiados e analisar o feedback da IA.' }
    ]
  },
  {
    id: 'day-21',
    date: 'Dia 3 • Quarta (21/10)',
    title: 'Refinamento Gramatical, Coesão e Ritmo de Digitação',
    badge: 'Dia Intensivo 3/4',
    color: 'emerald',
    tasks: [
      { id: 't21-1', text: 'Revisar os erros apontados pela IA nos Dias 1 e 2 (vírgulas, crase e repetições).' },
      { id: 't21-2', text: 'Digitar a Redação Treino #3 (Tema 3: Hiperconectividade e Saúde Mental) em 55 minutos.' },
      { id: 't21-3', text: 'Usar pelo menos 1 conectivo interparágrafo e 2 intraparágrafos em cada bloco.' }
    ]
  },
  {
    id: 'day-22',
    date: 'Dia 4 • Quinta (22/10)',
    title: 'Simulado Real Oficial São Camilo (Fechamento do Ciclo)',
    badge: 'Dia Intensivo 4/4',
    color: 'teal',
    tasks: [
      { id: 't22-1', text: 'Fazer a Redação Treino #4 (Tema 4 ou Tema Inédito IA) sem consulta em exatos 60 minutos.' },
      { id: 't22-2', text: 'Atingir nota acima de 85/100 no Simulador da Banca São Camilo.' },
      { id: 't22-3', text: 'Revisar a aba "Folha de Ouro" para encerrar os estudos tranquila antes da pausa.' }
    ]
  },
  {
    id: 'day-23-25',
    date: 'Sexta a Domingo (23, 24 e 25/10)',
    title: 'Pausa Programada (Zero Estudo • Consolidação da Memória)',
    badge: 'Pausa Obrigatória',
    color: 'amber',
    tasks: [
      { id: 't23-1', text: 'Aproveitar os compromissos dos dias 23, 24 e 25 sem culpa: o treino prático já foi consolidado!' },
      { id: 't23-2', text: 'Separar documento de identidade original com foto e confirmar endereço/horário do campus.' }
    ]
  },
  {
    id: 'day-26',
    date: 'Segunda-feira (26/10) • DIA DA PROVA!',
    title: 'Ativação de 5 Minutos & Aprovação em Farmácia na São Camilo',
    badge: 'Grande Dia!',
    color: 'amber',
    tasks: [
      { id: 't26-1', text: 'Ler a aba "Folha de Ouro (Dia 26)" por apenas 5 minutos antes de sair para a prova.' },
      { id: 't26-2', text: 'Seguir a divisão de 60 min na prova: 10m Planejamento | 35m Digitação | 15m Revisão Fina.' }
    ]
  }
];

// ============================================================================
// REPERTÓRIOS CORINGAS E CONECTIVOS
// ============================================================================
const WILDCARD_REPERTORIES = [
  {
    title: '1. Conceito "One Health" (Saúde Única — OMS)',
    axis: 'Saúde, Farmácia, Meio Ambiente e Ciência',
    quote: 'Segundo a Organização Mundial da Saúde (OMS), sob o paradigma da "Saúde Única" (One Health), o bem-estar humano, o equilíbrio ambiental e a saúde coletiva são indissociáveis.',
    howToUse: 'Perfeito para temas sobre sustentabilidade, descarte de resíduos, epidemias, biotecnologia, qualidade de vida ou avanços científicos.'
  },
  {
    title: '2. "Sociedade do Cansaço" (Byung-Chul Han)',
    axis: 'Tecnologia, Redes Sociais, Jovens e Saúde Mental',
    quote: 'O filósofo contemporâneo Byung-Chul Han, na obra "Sociedade do Cansaço", analisa como o excesso de estímulos digitais e a pressão por desempenho contínuo geram esgotamento psíquico.',
    howToUse: 'Encaixa em qualquer tema sobre hiperconectividade, redes sociais, automedicação por ansiedade, falta de silêncio/pausa ou relações humanas.'
  },
  {
    title: '3. Ética do Cuidado & Uso Racional da Ciência (São Camilo / OMS)',
    axis: 'Ética em Saúde, Automedicação e Desinformação',
    quote: 'De acordo com diretrizes bioéticas e da Organização Mundial da Saúde, o progresso técnico-científico só cumpre seu papel social quando orientado pela educação em saúde e pela responsabilidade ética.',
    howToUse: 'Excelente para temas de automedicação, fake news científicas, estética, envelhecimento ou humanização da saúde.'
  },
  {
    title: '4. "Cidadania de Papel" (Gilberto Dimenstein) & Art. 196 da CF/88',
    axis: 'Desigualdade Social, Direitos Humanos e Acesso à Saúde',
    quote: 'Embora o Artigo 196 da Constituição Federal de 1988 assegure a saúde e a dignidade como direitos universais, persiste no Brasil aquilo que o escritor Gilberto Dimenstein denominou "cidadania de papel".',
    howToUse: 'Coringa para qualquer problema social brasileiro, exclusão, vulnerabilidade, saúde pública ou direitos fundamentais.'
  }
];

const CONNECTIVES_BANK = {
  intro: [
    'Sob a ótica de...',
    'No contexto contemporâneo, observa-se que...',
    'Nesse cenário, torna-se imperativo analisar...',
    'Diante dessa realidade, cabe discutir...'
  ],
  dev1: [
    'Em primeira análise, cumpre destacar que...',
    'Primeiramente, é fundamental pontuar que...',
    'Isso ocorre porque, historicamente,...',
    'Como consequência direta desse quadro,...'
  ],
  dev2: [
    'Ademais, sob outra perspectiva, nota-se que...',
    'Outrossim, soma-se a essa problemática o fato de que...',
    'Paralelamente a isso, a ausência de...',
    'Nesse sentido, evidencia-se que...'
  ],
  conclusion: [
    'Depreende-se, portanto, que a superação desse impasse exige...',
    'Portanto, fica evidente a necessidade de...',
    'Em suma, articular o rigor científico à consciência ética é o caminho para...',
    'Dessa forma, será possível consolidar uma sociedade mais...'
  ]
};

// ============================================================================
// ACESSO À IA PELA FUNÇÃO DO SUPABASE
// ============================================================================
const AI_ACCESS_STORAGE_KEY = 'camiloprep-ai-password';
let aiAccessPasswordInMemory = '';

function readAiAccessPassword(storageName) {
  try {
    return window[storageName].getItem(AI_ACCESS_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function rememberAiAccessPassword(password) {
  // A memória evita novas perguntas nesta página se o navegador bloquear o armazenamento.
  aiAccessPasswordInMemory = password;
  let savedPermanently = false;
  try {
    window.localStorage.setItem(AI_ACCESS_STORAGE_KEY, password);
    savedPermanently = true;
  } catch {
    // Ainda podemos manter o acesso na sessão ou na memória desta página.
  }
  try {
    if (savedPermanently) {
      window.sessionStorage.removeItem(AI_ACCESS_STORAGE_KEY);
    } else {
      window.sessionStorage.setItem(AI_ACCESS_STORAGE_KEY, password);
    }
  } catch {
    // O acesso em memória continua disponível para todas as ferramentas de IA.
  }
}

function forgetRejectedAiAccessPassword(password) {
  if (aiAccessPasswordInMemory === password) aiAccessPasswordInMemory = '';
  for (const storageName of ['localStorage', 'sessionStorage']) {
    try {
      // Uma resposta antiga não deve apagar uma senha mais nova salva em outra aba.
      if (window[storageName].getItem(AI_ACCESS_STORAGE_KEY) === password) {
        window[storageName].removeItem(AI_ACCESS_STORAGE_KEY);
      }
    } catch {
      // O armazenamento pode estar indisponível neste navegador.
    }
  }
}

async function callGeminiAPI(payload) {
  const functionUrl = "https://vejldzbaigkgdyxmelzj.supabase.co/functions/v1/camiloprep-ai";
  const supabasePublishableKey = "sb_publishable_iZ1QP705THl1tmKl_U9orQ_LXOyvfoi";
  let accessPassword = readAiAccessPassword('localStorage') ||
    readAiAccessPassword('sessionStorage') || aiAccessPasswordInMemory;

  if (!accessPassword) {
    accessPassword = window.prompt("Digite sua senha de acesso à IA uma vez. Este navegador vai lembrar o acesso para os próximos usos:");

    if (!accessPassword) {
      throw new Error("A senha de acesso não foi informada.");
    }
  }
  // Também migra automaticamente a senha guardada pela versão anterior.
  rememberAiAccessPassword(accessPassword);

  const response = await fetch(functionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabasePublishableKey,
      "x-app-password": accessPassword,
    },
    body: JSON.stringify({ payload }),
  });

  const result = await response.json().catch(() => ({}));

  if (response.status === 403) {
    forgetRejectedAiAccessPassword(accessPassword);
    throw new Error("A senha de acesso à IA foi recusada. Clique novamente e informe a senha atual.");
  }

  if (!response.ok) {
    throw new Error(result.error || `Erro HTTP ${response.status}`);
  }

  if (typeof result.text !== "string") {
    throw new Error("A função não retornou texto.");
  }

  return result.text;
}

// Catálogo editorial: links e resumos conferidos em 19/10/2026.
// A IA retorna IDs; URLs, títulos, instituições, datas e resumos vêm somente daqui.
// Não há pesquisa web em tempo real nesta versão. Revisar o catálogo periodicamente.
const SOURCE_CATALOG_CHECKED_AT = '19/10/2026';
const SOURCE_PURPOSES = {
  entender: '1. Entender o problema',
  evidencias: '2. Consultar evidências',
  argumentar: '3. Construir seu argumento'
};

const SOURCE_LIBRARY = [
  {
    id: 'cff-internet',
    title: 'Uso de medicamentos por influência da internet preocupa farmacêuticos',
    institution: 'Conselho Federal de Farmácia (CFF)',
    publisher: 'cff', date: '18/05/2026', language: 'Português',
    kind: 'Comunicação institucional', purposes: ['entender', 'argumentar'],
    summary: 'O CFF discute os riscos de usar medicamentos por indicação de influenciadores e o papel da orientação profissional na educação em saúde.',
    caution: 'É uma análise institucional. Esta notícia não comprova um percentual de pessoas que se automedicam.',
    url: 'https://site.cff.org.br/noticia/Noticias-gerais/18/05/2026/uso-de-medicamentos-por-influencia-da-internet-preocupa-farmaceuticos'
  },
  {
    id: 'anvisa-uso-racional',
    title: 'Hoje é Dia Nacional do Uso Racional de Medicamentos',
    institution: 'Agência Nacional de Vigilância Sanitária (Anvisa)',
    publisher: 'anvisa', date: '05/05/2023', language: 'Português',
    kind: 'Orientação institucional', purposes: ['entender', 'argumentar'],
    summary: 'Material educativo da Anvisa sobre uso racional de medicamentos e prevenção de problemas associados ao uso desses produtos.',
    caution: 'Orientação educativa, não pesquisa populacional. Para dados sobre descarte, consulte uma fonte específica sobre resíduos.',
    url: 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2023/hoje-e-dia-nacional-do-uso-racional-de-medicamentos'
  },
  {
    id: 'oms-saude-unica',
    title: 'One Health — Saúde Única',
    institution: 'Organização Mundial da Saúde (OMS)',
    publisher: 'oms', date: '08/05/2026', language: 'Inglês',
    kind: 'Síntese técnica e conceito', purposes: ['entender', 'evidencias', 'argumentar'],
    summary: 'A abordagem Saúde Única integra saúde humana, animal, vegetal e ambiental. A OMS relaciona essa integração à prevenção de doenças, à resistência antimicrobiana e aos riscos ambientais.',
    caution: 'É uma abordagem conceitual e técnica; não é uma medição de resíduos em rios brasileiros.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/one-health'
  },
  {
    id: 'oms-adolescentes',
    title: 'Mental health of adolescents — Saúde mental dos adolescentes',
    institution: 'Organização Mundial da Saúde (OMS)',
    publisher: 'oms', date: '01/09/2025', language: 'Inglês',
    kind: 'Síntese de evidências', purposes: ['entender', 'evidencias', 'argumentar'],
    summary: 'A OMS apresenta fatores sociais, familiares e escolares associados à saúde mental na adolescência, incluindo pressões dos pares e influência da mídia.',
    caution: 'O foco são adolescentes. Não atribua todo sofrimento mental às telas nem generalize os dados para adultos.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health'
  },
  {
    id: 'constituicao-saude',
    title: 'Constituição Federal — artigo 196',
    institution: 'Câmara dos Deputados — texto constitucional atualizado',
    publisher: 'camara', date: '1988 — consulte o texto atualizado', language: 'Português',
    kind: 'Texto legal', purposes: ['argumentar'],
    summary: 'O artigo 196 atribui ao Estado o dever de garantir o direito à saúde por políticas que reduzam riscos e assegurem acesso universal e igualitário aos serviços.',
    caution: 'Localize “Art. 196” no documento. A previsão do direito, por si só, não demonstra que ele já foi efetivado.',
    url: 'https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html'
  },
  {
    id: 'cff-datafolha',
    title: 'Pesquisa CFF/Datafolha sobre uso e descarte de medicamentos',
    institution: 'CFF / Instituto Datafolha — divulgação oficial no CRF-PE',
    publisher: 'cff', date: '2019 — coleta de 13 a 20 de março', language: 'Português',
    kind: 'Pesquisa com divulgação institucional', purposes: ['evidencias'],
    summary: 'A pesquisa entrevistou 2.074 pessoas de 16 anos ou mais que haviam usado medicamentos nos seis meses anteriores. Investigou automedicação, orientação e descarte; 77% relataram o hábito de se automedicar e 76% indicaram formas incorretas de descarte.',
    caution: 'Dados de 2019, desse público específico. Não apresente os percentuais como retrato atual de toda a população brasileira.',
    url: 'https://pe.cff.org.br/noticia/noticias-do-crf-pe/27/04/2019/quase-metade-dos-brasileiros-que-usaram-medicamentos-nos-ultimos-seis-meses-se-automedicou-ate-uma-v'
  },
  {
    id: 'sinir-medicamentos',
    title: 'Medicamentos, seus Resíduos e Embalagens',
    institution: 'Ministério do Meio Ambiente — SINIR',
    publisher: 'mma', date: 'Página sem data; inclui resultados de 2023', language: 'Português',
    kind: 'Política pública e resultados administrativos', purposes: ['entender', 'evidencias', 'argumentar'],
    summary: 'O SINIR explica a logística reversa de medicamentos domiciliares, as responsabilidades na coleta e na destinação e os riscos de descarte no solo e no esgoto.',
    caution: 'Os resultados de coleta se referem ao período indicado no portal. Não equivalem ao total de medicamentos descartados no país.',
    url: 'https://sinir.gov.br/perfis/logistica-reversa/logistica-reversa/medicamentos-seus-residuos-e-embalagens/'
  },
  {
    id: 'oms-resistencia',
    title: 'Antimicrobial resistance — Resistência antimicrobiana',
    institution: 'Organização Mundial da Saúde (OMS)',
    publisher: 'oms', date: '16/07/2026', language: 'Inglês',
    kind: 'Síntese de evidências', purposes: ['entender', 'evidencias'],
    summary: 'A OMS explica como a resistência dos microrganismos dificulta o tratamento de infecções e relaciona o problema ao uso inadequado e excessivo de antimicrobianos.',
    caution: 'O foco são antimicrobianos. Não estenda automaticamente essa explicação a todas as classes de medicamentos.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance'
  },
  {
    id: 'oms-hbsc',
    title: 'Pesquisa HBSC — uso de redes sociais e jogos por adolescentes (volume 6)',
    institution: 'OMS — Escritório Regional para a Europa / HBSC',
    publisher: 'oms', date: '24/09/2024 — dados de 2021/2022', language: 'Inglês',
    kind: 'Relatório de pesquisa', purposes: ['evidencias'],
    summary: 'O relatório investiga o uso de redes sociais e jogos por estudantes de 11, 13 e 15 anos em 44 países e regiões da Europa, Ásia Central e Canadá, considerando idade, gênero e desigualdade social.',
    caution: 'A pesquisa não representa o Brasil. Associação entre comportamentos e saúde não demonstra, sozinha, uma relação de causa e efeito.',
    url: 'https://www.who.int/europe/publications/i/item/9789289061322'
  },
  {
    id: 'ibge-pns',
    title: 'PNS 2019 — acesso e utilização dos serviços de saúde',
    institution: 'Instituto Brasileiro de Geografia e Estatística (IBGE)',
    publisher: 'ibge', date: '04/09/2020 — dados de 2019', language: 'Português',
    kind: 'Pesquisa estatística nacional', purposes: ['evidencias'],
    summary: 'A Pesquisa Nacional de Saúde apresenta informações sobre procura por atendimento, rede pública, planos de saúde e diferenças de utilização entre grupos da população brasileira.',
    caution: 'Os resultados descrevem 2019. Ao usar um dado, preserve o ano, o grupo analisado e a definição do indicador.',
    url: 'https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/28793-pns-2019-sete-em-cada-dez-pessoas-que-procuram-o-mesmo-servico-de-saude-vao-a-rede-publica'
  },
  {
    id: 'ms-acolhimento',
    title: 'Acolhimento — Política Nacional de Humanização',
    institution: 'Ministério da Saúde — Biblioteca Virtual em Saúde',
    publisher: 'ms', date: 'Novembro de 2008', language: 'Português',
    kind: 'Conceito e diretriz de política pública', purposes: ['entender', 'argumentar'],
    summary: 'O acolhimento envolve escuta, reconhecimento das necessidades do usuário e responsabilidade pela resposta oferecida pelos serviços. Integra a Política Nacional de Humanização.',
    caution: 'Use o conceito de acolhimento. A página é histórica e não deve servir como referência atual sobre competências legais de profissões.',
    url: 'https://bvsms.saude.gov.br/acolhimento/'
  },
  {
    id: 'ms-ciencia',
    title: 'Saúde com Ciência',
    institution: 'Ministério da Saúde',
    publisher: 'ms', date: 'Página sem data de publicação indicada', language: 'Português',
    kind: 'Iniciativa pública de informação em saúde', purposes: ['entender', 'argumentar'],
    summary: 'A iniciativa acompanha a desinformação em saúde e reúne comunicação, capacitação e cooperação institucional, com atenção a conteúdos relacionados à vacinação.',
    caution: 'A existência da iniciativa não comprova, por si só, uma redução da desinformação. Não invente resultados de eficácia.',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-com-ciencia'
  },
  {
    id: 'oms-envelhecimento',
    title: 'Ageing and health — Envelhecimento e saúde',
    institution: 'Organização Mundial da Saúde (OMS)',
    publisher: 'oms', date: '01/10/2025', language: 'Inglês',
    kind: 'Síntese de evidências', purposes: ['entender', 'evidencias', 'argumentar'],
    summary: 'A OMS apresenta o envelhecimento populacional e os desafios de adaptar os sistemas de saúde e de cuidado às necessidades das pessoas idosas.',
    caution: 'Diferencie projeções futuras de dados já observados e não trate o envelhecimento como uma experiência igual para todas as pessoas.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/ageing-and-health'
  },
  {
    id: 'oms-vacinacao',
    title: 'Immunization coverage — Cobertura vacinal',
    institution: 'Organização Mundial da Saúde (OMS)',
    publisher: 'oms', date: '15/07/2026 — dados de 2025', language: 'Inglês',
    kind: 'Síntese de indicadores de vacinação', purposes: ['entender', 'evidencias'],
    summary: 'A OMS reúne indicadores de vacinação e discute desigualdades de cobertura e acesso entre países. O panorama permite estudar lacunas na proteção coletiva.',
    caution: 'Dados globais não são dados do Brasil. Identifique a vacina, a dose, o público, o território e o ano antes de citar percentuais.',
    url: 'https://www.who.int/en/news-room/fact-sheets/detail/immunization-coverage'
  },
  {
    id: 'oms-determinantes',
    title: 'Social determinants of health — Determinantes sociais da saúde',
    institution: 'Organização Mundial da Saúde (OMS)',
    publisher: 'oms', date: '06/05/2025', language: 'Inglês',
    kind: 'Síntese técnica e conceito', purposes: ['entender', 'evidencias', 'argumentar'],
    summary: 'Condições de moradia, educação, trabalho e distribuição de recursos influenciam a saúde. A OMS usa essa perspectiva para discutir desigualdades e políticas além do atendimento médico.',
    caution: 'O conceito ajuda a analisar causas sociais. Ele não prova, sozinho, uma causa específica no caso escolhido para a redação.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/social-determinants-of-health'
  },
  {
    id: 'ms-saude-mental',
    title: 'Saúde Mental — cuidado e Rede de Atenção Psicossocial',
    institution: 'Ministério da Saúde',
    publisher: 'ms', date: 'Página sem data de publicação indicada', language: 'Português',
    kind: 'Política pública e orientação institucional', purposes: ['entender', 'argumentar'],
    summary: 'O Ministério da Saúde apresenta a Rede de Atenção Psicossocial, o cuidado integral e a influência do contexto social e do estigma no acesso à atenção em saúde mental.',
    caution: 'É uma apresentação da política de cuidado, não um estudo que mede efeitos do uso de telas.',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental'
  }
];

const SOURCE_BY_ID = new Map(SOURCE_LIBRARY.map((source) => [source.id, source]));
const THEME_GENERATION_AXES = [
  { label: 'Saúde pública, ética e práticas farmacêuticas', sourceIds: ['cff-internet', 'cff-datafolha', 'anvisa-uso-racional', 'oms-resistencia', 'oms-determinantes', 'constituicao-saude'] },
  { label: 'Saúde mental, tecnologia e sociedade', sourceIds: ['oms-adolescentes', 'oms-hbsc', 'ms-saude-mental', 'oms-determinantes', 'ms-acolhimento'] },
  { label: 'Meio ambiente, medicamentos e Saúde Única', sourceIds: ['oms-saude-unica', 'sinir-medicamentos', 'cff-datafolha', 'oms-resistencia', 'constituicao-saude'] },
  { label: 'Acesso à saúde, equidade e humanização', sourceIds: ['oms-determinantes', 'ibge-pns', 'ms-acolhimento', 'constituicao-saude', 'oms-envelhecimento'] },
  { label: 'Ciência, desinformação e responsabilidade social', sourceIds: ['cff-internet', 'cff-datafolha', 'ms-ciencia', 'oms-vacinacao', 'oms-hbsc', 'anvisa-uso-racional'] },
  { label: 'Envelhecimento, cuidado e políticas públicas', sourceIds: ['oms-envelhecimento', 'ibge-pns', 'oms-determinantes', 'ms-acolhimento', 'constituicao-saude', 'ms-saude-mental'] },
  { label: 'Vacinação, saúde coletiva e confiança social', sourceIds: ['oms-vacinacao', 'ms-ciencia', 'oms-determinantes', 'constituicao-saude', 'ms-acolhimento'] }
];

// Guias dos temas iniciais; os temas novos recebem seus próprios guias na resposta da IA.
const INITIAL_THEME_SOURCE_GUIDES = {
  'tema-1': [
    { sourceId: 'cff-internet', purpose: 'entender', connection: 'Apresenta o conflito entre popularidade nas redes e orientação qualificada sobre medicamentos.', howToUse: 'Identifique o problema da autoridade de quem divulga orientações de saúde.', readingQuestion: 'Por que uma recomendação popular pode parecer segura mesmo sem avaliação profissional?' },
    { sourceId: 'cff-datafolha', purpose: 'evidencias', connection: 'Oferece uma pesquisa sobre automedicação e fontes de orientação usadas pelos entrevistados.', howToUse: 'Se usar um percentual, informe que ele vem de 2019 e de pessoas que haviam utilizado medicamentos.', readingQuestion: 'Quem participou da pesquisa e o que ela permite afirmar sobre automedicação?' },
    { sourceId: 'anvisa-uso-racional', purpose: 'argumentar', connection: 'Ajuda a relacionar educação em saúde e responsabilidade no uso de medicamentos.', howToUse: 'Explique com suas palavras o papel da orientação e da prevenção de problemas.', readingQuestion: 'Como a educação em saúde pode ajudar a transformar informação em decisões responsáveis?' }
  ],
  'tema-2': [
    { sourceId: 'oms-saude-unica', purpose: 'entender', connection: 'Oferece a ideia de integração entre ambiente e saúde necessária para analisar os resíduos farmacêuticos.', howToUse: 'Explique a relação entre proteção ambiental e proteção da saúde.', readingQuestion: 'Por que o descarte de um medicamento pode interessar a diferentes áreas da saúde?' },
    { sourceId: 'cff-datafolha', purpose: 'evidencias', connection: 'A pesquisa investigou também as formas de descarte relatadas pelos participantes.', howToUse: 'Procure a seção sobre descarte e mantenha o ano e o público da pesquisa ao citar um resultado.', readingQuestion: 'O que os hábitos de descarte relatados sugerem investigar sobre informação e acesso à coleta?' },
    { sourceId: 'sinir-medicamentos', purpose: 'argumentar', connection: 'Apresenta responsabilidades de consumidores e empresas na destinação de medicamentos.', howToUse: 'Compare o funcionamento da logística reversa com os desafios de informação e participação da população.', readingQuestion: 'Como as responsabilidades se distribuem entre consumidores, comerciantes, distribuidores e fabricantes?' }
  ],
  'tema-3': [
    { sourceId: 'oms-adolescentes', purpose: 'entender', connection: 'Situa a influência da mídia em um conjunto de fatores que afetam a saúde mental dos jovens.', howToUse: 'Construa uma análise que considere também escola, família e condições sociais.', readingQuestion: 'Que fatores, além do tempo de tela, precisam entrar na discussão?' },
    { sourceId: 'oms-hbsc', purpose: 'evidencias', connection: 'Investiga o uso de redes sociais e jogos em adolescentes de diferentes países e regiões.', howToUse: 'Use a pesquisa como referência internacional e diferencie associação de causa.', readingQuestion: 'Quem foi pesquisado e por que esses resultados não podem ser apresentados como dados brasileiros?' },
    { sourceId: 'ms-saude-mental', purpose: 'argumentar', connection: 'Permite discutir cuidado coletivo, acolhimento e acesso ao apoio em saúde mental.', howToUse: 'Relacione a discussão sobre hábitos digitais à importância de redes de cuidado.', readingQuestion: 'Como evitar que a responsabilidade pela saúde mental recaia somente sobre o indivíduo?' }
  ],
  'tema-4': [
    { sourceId: 'oms-determinantes', purpose: 'entender', connection: 'Ajuda a explicar por que condições sociais distintas produzem barreiras diferentes ao cuidado.', howToUse: 'Escolha uma condição social e explique como ela pode dificultar o acesso.', readingQuestion: 'Que obstáculos existem antes mesmo de uma pessoa chegar ao serviço de saúde?' },
    { sourceId: 'ibge-pns', purpose: 'evidencias', connection: 'Oferece dados brasileiros sobre acesso e utilização dos serviços de saúde.', howToUse: 'Procure um indicador pertinente e preserve seu ano e grupo populacional.', readingQuestion: 'Qual indicador ajuda a discutir a desigualdade mencionada na situação-problema?' },
    { sourceId: 'constituicao-saude', purpose: 'argumentar', connection: 'Fornece a referência jurídica para discutir o direito de acesso universal e igualitário.', howToUse: 'Compare a garantia constitucional com uma barreira concreta discutida no tema.', readingQuestion: 'O que precisa acontecer para que um direito previsto em lei se realize no atendimento?' }
  ]
};

function validateStudySources(items, allowedIds) {
  const fail = () => { throw new Error('A IA não entregou as três leituras com fontes válidas. O tema e as fontes anteriores foram mantidos. Tente gerar novamente.'); };
  if (!Array.isArray(items) || items.length !== 3) return fail();
  const allowed = new Set(allowedIds);
  const seenSources = new Set();
  const seenPurposes = new Set();
  const validated = items.map((item) => {
    if (!item || typeof item !== 'object') return fail();
    const source = SOURCE_BY_ID.get(item.sourceId);
    if (!source || !allowed.has(source.id) || seenSources.has(source.id) ||
        !Object.prototype.hasOwnProperty.call(SOURCE_PURPOSES, item.purpose) ||
        !source.purposes.includes(item.purpose) || seenPurposes.has(item.purpose)) return fail();
    const values = ['connection', 'howToUse', 'readingQuestion'].map((field) => {
      if (typeof item[field] !== 'string' || item[field].trim().length < 15 ||
          item[field].length > 700 || /https?:\/\/|www\./i.test(item[field])) return fail();
      return item[field].trim();
    });
    seenSources.add(source.id);
    seenPurposes.add(item.purpose);
    // Nunca incorporar metadados ou URLs devolvidos pelo modelo.
    return { sourceId: source.id, purpose: item.purpose, connection: values[0], howToUse: values[1], readingQuestion: values[2] };
  });
  if (new Set(validated.map((item) => SOURCE_BY_ID.get(item.sourceId).publisher)).size < 2) return fail();
  const order = Object.keys(SOURCE_PURPOSES);
  return validated.sort((a, b) => order.indexOf(a.purpose) - order.indexOf(b.purpose));
}

function getThemeStudySources(theme) {
  const guides = theme.studySources || INITIAL_THEME_SOURCE_GUIDES[theme.id] || [];
  return guides.flatMap((guide) => {
    const source = SOURCE_BY_ID.get(guide.sourceId);
    return source ? [{ ...guide, source }] : [];
  });
}

const EMPTY_WRITING_PLAN = {
  problem: '',
  thesis: '',
  argumentOne: '',
  argumentTwo: ''
};

function getAdaptiveFocus(essayHistory) {
  const latestEssay = essayHistory?.[0];
  if (!latestEssay) {
    return {
      criterion: 'argumentacao',
      title: 'Tese e argumentação',
      score: null,
      exercise: 'Responda à situação-problema em uma frase e indique dois motivos diferentes que sustentem sua posição.'
    };
  }

  const criteria = [
    {
      key: 'c1',
      criterion: 'adequacao',
      title: 'Resposta à situação-problema',
      exercise: 'Reescreva a situação-problema com suas palavras e formule uma frase que mostre claramente sua posição.'
    },
    {
      key: 'c2',
      criterion: 'argumentacao',
      title: 'Coerência e argumentação',
      exercise: 'Escolha um argumento e desenvolva-o em três passos: afirmação, explicação da causa e consequência para a sociedade.'
    },
    {
      key: 'c3',
      criterion: 'coesao',
      title: 'Coesão e repertório',
      exercise: 'Explique uma ideia do texto-base com suas próprias palavras e conecte-a à sua tese sem copiar a frase original.'
    },
    {
      key: 'c4',
      criterion: 'norma',
      title: 'Norma-padrão e clareza',
      exercise: 'Escreva duas frases sobre o tema. Depois revise pontuação, concordância e repetições, mantendo o sentido original.'
    }
  ].filter((item) => {
    const score = latestEssay[item.key];
    return score !== null && score !== undefined && score !== '' && Number.isFinite(Number(score));
  });

  if (!criteria.length) {
    return {
      criterion: 'argumentacao',
      title: 'Tese e argumentação',
      score: null,
      exercise: 'Responda à situação-problema em uma frase e indique dois motivos diferentes que sustentem sua posição.'
    };
  }

  return criteria.reduce((lowest, current) =>
    Number(current.score ?? latestEssay[current.key]) < Number(lowest.score ?? latestEssay[lowest.key])
      ? { ...current, score: Number(latestEssay[current.key]) }
      : { ...lowest, score: Number(latestEssay[lowest.key]) }
  );
}

function ProfessorVirtual({ selectedTheme, essayHistory, onStartMockExam, onGenerateNewSituationProblem, isGeneratingTheme, themeGenerationError }) {
  const storageKey = `camiloprep_plano_${selectedTheme.id}`;
  const [plan, setPlan] = useState(() => {
    try {
      return { ...EMPTY_WRITING_PLAN, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
    } catch {
      return EMPTY_WRITING_PLAN;
    }
  });
  const [coachResult, setCoachResult] = useState(null);
  const [coachError, setCoachError] = useState('');
  const [isCoaching, setIsCoaching] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState(null);
  const [practiceError, setPracticeError] = useState('');
  const [isCheckingPractice, setIsCheckingPractice] = useState(false);

  const adaptiveFocus = useMemo(() => getAdaptiveFocus(essayHistory), [essayHistory]);
  const studySources = useMemo(() => getThemeStudySources(selectedTheme), [selectedTheme]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(plan));
    } catch {
      // O planejamento continua disponível nesta sessão mesmo se o navegador bloquear o armazenamento.
    }
  }, [plan, storageKey]);

  const updatePlan = (field, value) => {
    setPlan((current) => ({ ...current, [field]: value }));
    setCoachResult(null);
  };

  const askProfessor = async (level = 1) => {
    if (!plan.problem.trim() || !plan.thesis.trim() || !plan.argumentOne.trim() || !plan.argumentTwo.trim()) {
      setCoachError('Preencha o problema, a tese e os dois argumentos antes de pedir uma pista.');
      return;
    }

    setCoachError('');
    setIsCoaching(true);
    setHintLevel(level);

    try {
      const systemInstruction = `Você é uma professora paciente de redação dissertativo-argumentativa. Ensine por perguntas, sem escrever a redação pela estudante. Não forneça uma tese pronta, parágrafos prontos ou frases para copiar. Avalie se o plano responde ao recorte da situação-problema e se os argumentos são distintos e explicáveis. Dê um elogio específico, uma pergunta orientadora, uma pista proporcional ao nível solicitado e uma próxima ação pequena. Seja gentil, direta e use português brasileiro.`;
      const userPrompt = `Tema: ${selectedTheme.title}\nTexto-base: ${selectedTheme.baseText}\nSituação-problema: ${selectedTheme.problemSituation}\n\nPlano da estudante:\nProblema entendido: ${plan.problem}\nTese: ${plan.thesis}\nArgumento 1: ${plan.argumentOne}\nArgumento 2: ${plan.argumentTwo}\n\nNível de ajuda solicitado: ${level} de 3. No nível 1, faça uma pergunta que a ajude a perceber um ponto por conta própria. No nível 2, seja mais explícita sobre o aspecto a revisar, mas não dê a resposta. No nível 3, explique o princípio e ofereça um exemplo curto sobre outro assunto, nunca uma resposta pronta para este tema.`;
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              whatWorks: { type: 'STRING' },
              guidingQuestion: { type: 'STRING' },
              hint: { type: 'STRING' },
              nextStep: { type: 'STRING' }
            },
            required: ['whatWorks', 'guidingQuestion', 'hint', 'nextStep']
          }
        }
      };

      const result = JSON.parse(await callGeminiAPI(payload));
      setCoachResult(result);
    } catch (error) {
      setCoachError(error.message || 'Não consegui chamar a professora agora. Tente novamente.');
    } finally {
      setIsCoaching(false);
    }
  };

  const evaluatePractice = async () => {
    if (!practiceAnswer.trim()) {
      setPracticeError('Escreva sua tentativa antes de pedir o retorno.');
      return;
    }

    setPracticeError('');
    setIsCheckingPractice(true);
    setPracticeFeedback(null);

    try {
      const systemInstruction = `Você é uma professora de redação acolhedora e objetiva. Avalie somente o exercício curto da estudante. Não escreva a resposta por ela. Dê um ponto forte específico, uma orientação concreta para melhorar e uma pergunta para ela tentar novamente. Não invente fatos nem alegue que a avaliação é oficial.`;
      const userPrompt = `Tema de treino: ${selectedTheme.title}\nHabilidade para praticar: ${adaptiveFocus.title}\nExercício: ${adaptiveFocus.exercise}\nResposta da estudante: ${practiceAnswer}`;
      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              strength: { type: 'STRING' },
              improvement: { type: 'STRING' },
              retryQuestion: { type: 'STRING' }
            },
            required: ['strength', 'improvement', 'retryQuestion']
          }
        }
      };

      setPracticeFeedback(JSON.parse(await callGeminiAPI(payload)));
    } catch (error) {
      setPracticeError(error.message || 'Não consegui avaliar esse exercício agora. Tente novamente.');
    } finally {
      setIsCheckingPractice(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="cp-professor-hero" aria-labelledby="professor-heading">
        <div className="cp-professor-intro">
          <span className="cp-eyebrow"><GraduationCap size={17} /> PÁGINA 05 · PROFESSOR VIRTUAL</span>
          <h1 id="professor-heading">Sua ideia tem<br /><span>muito potencial.</span></h1>
          <p>Vamos transformar o que você pensa em uma redação com clareza, repertório e a sua voz.</p>
          <div className="cp-teacher-sign"><span className="cp-teacher-avatar" aria-hidden="true"><PenTool size={21} /></span><span>Uma pista de cada vez.<br /><strong>A autoria é sempre sua.</strong></span></div>
        </div>
        <div className="cp-teacher-action-card">
          <span className="cp-action-star" aria-hidden="true">✳</span>
          <span className="cp-eyebrow">DO PLANEJAMENTO À PRÁTICA</span>
          <h2>Vamos escrever<br />o próximo passo?</h2>
          <div className="cp-professor-actions flex w-full flex-col gap-3">
            <button type="button" onClick={onStartMockExam} disabled={isGeneratingTheme}
              className="cp-button cp-button-dark">
              <Clock className="h-4 w-4" /> Começar simulado de 60 min
            </button>
            <button id="gerar-situacao-professor" type="button" onClick={onGenerateNewSituationProblem}
              disabled={isGeneratingTheme} aria-busy={isGeneratingTheme} className="cp-button cp-button-lime">
              <Sparkles aria-hidden="true" className={`h-5 w-5 shrink-0 ${isGeneratingTheme ? 'animate-pulse' : ''}`} />
              <span>{isGeneratingTheme ? 'Gerando situação-problema...' : 'Gerar situação-problema inédita com IA'}</span>
            </button>
          </div>
          <p>A IA prepara o texto-base, a situação-problema e os repertórios com fonte da etapa 3. Tudo é atualizado junto para o novo tema.</p>
        </div>
        {themeGenerationError && <p role="alert" className="cp-teacher-error rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{themeGenerationError}</p>}
      </section>
      <div className="cp-current-theme"><span className="cp-current-theme-icon" aria-hidden="true"><BookOpen size={21} /></span><p>Tema de hoje: {selectedTheme.title}</p><span className="cp-mini-label">LEIA · PLANEJE · ARGUMENTE</span></div>
      <p className="cp-save-note">O planejamento fica salvo neste navegador. Só é enviado à IA quando você pede uma pista ou feedback.</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section id="etapa-1-planejamento" aria-busy={isGeneratingTheme} className="cp-card rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Etapa 1 • Planejamento</span>
            <h3 className="mt-1 text-lg font-extrabold text-slate-900">Monte suas ideias antes de escrever</h3>
            <p className="mt-1 text-sm text-slate-600">Responda com suas palavras. Não precisa ficar perfeito na primeira tentativa.</p>
          </div>

          <div id="professor-texto-base" role="region" aria-labelledby="titulo-texto-base-professor" className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-800">
            <h4 id="titulo-texto-base-professor" className="font-bold">Texto-base</h4>
            <p className="mt-2 whitespace-pre-line leading-relaxed">{selectedTheme.baseText}</p>
          </div>

          <div id="professor-situacao-problema" className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-950">
            <strong>Situação-problema:</strong> {selectedTheme.problemSituation}
          </div>

          {[
            { key: 'problem', label: '1. Qual problema o tema pede para discutir?', placeholder: 'Resuma o desafio central com suas palavras.' },
            { key: 'thesis', label: '2. Qual é a sua posição (tese)?', placeholder: 'Escreva uma frase que responda diretamente à pergunta.' },
            { key: 'argumentOne', label: '3. Primeiro motivo que sustenta sua tese', placeholder: 'Que causa, contexto ou responsabilidade explica o problema?' },
            { key: 'argumentTwo', label: '4. Segundo motivo, diferente do primeiro', placeholder: 'Que outra consequência ou perspectiva fortalece sua posição?' }
          ].map((field) => (
            <label key={field.key} className="block space-y-1.5">
              <span className="text-xs font-bold text-slate-700">{field.label}</span>
              <textarea
                value={plan[field.key]}
                onChange={(event) => updatePlan(field.key, event.target.value)}
                rows={2}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </label>
          ))}

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => askProfessor(1)}
              disabled={isCoaching}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              <Sparkles className={`h-4 w-4 ${isCoaching ? 'animate-pulse' : ''}`} />
              {isCoaching ? 'A professora está lendo...' : 'Pedir uma pista'}
            </button>
            <button
              onClick={() => setPlan(EMPTY_WRITING_PLAN)}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Limpar planejamento
            </button>
          </div>

          {coachError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{coachError}</p>}

          {coachResult && (
            <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">O que já está funcionando</div>
                <p className="mt-1 text-sm text-emerald-950">{coachResult.whatWorks}</p>
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">Pergunta para você pensar</div>
                <p className="mt-1 text-sm font-semibold text-slate-900">{coachResult.guidingQuestion}</p>
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">Pista nível {hintLevel}</div>
                <p className="mt-1 text-sm text-slate-800">{coachResult.hint}</p>
              </div>
              <div className="border-t border-emerald-200 pt-3 text-sm text-slate-800">
                <strong>Próximo passo:</strong> {coachResult.nextStep}
              </div>
              {hintLevel < 3 && (
                <button
                  onClick={() => askProfessor(hintLevel + 1)}
                  disabled={isCoaching}
                  className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-bold text-emerald-900 hover:bg-emerald-50 disabled:opacity-60"
                >
                  {isCoaching ? 'Preparando outra pista...' : 'Ainda preciso de uma pista mais direta'}
                </button>
              )}
            </div>
          )}
        </section>

        <div className="space-y-6">
          <section className="cp-card rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-800"><Zap className="h-5 w-5" /></div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">Etapa 2 • Exercício personalizado</span>
                <h3 className="mt-1 text-lg font-extrabold text-slate-900">Seu foco: {adaptiveFocus.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{Number.isFinite(adaptiveFocus.score) ? `Baseado no critério mais fraco da sua correção mais recente (${adaptiveFocus.score}/25).` : 'Seu foco inicial é tese e argumentação. Após uma correção com notas por critério, o treino se adapta ao ponto que mais precisa de atenção.'}</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3.5 text-sm text-slate-800">{adaptiveFocus.exercise}</div>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-slate-700">Faça sua tentativa</span>
              <textarea
                value={practiceAnswer}
                onChange={(event) => setPracticeAnswer(event.target.value)}
                rows={4}
                placeholder="Escreva aqui. A professora vai comentar sua tentativa sem fazer o exercício por você."
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </label>
            <button
              onClick={evaluatePractice}
              disabled={isCheckingPractice}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              <BookOpen className="h-4 w-4" /> {isCheckingPractice ? 'Lendo sua tentativa...' : 'Receber feedback do exercício'}
            </button>
            {practiceError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{practiceError}</p>}
            {practiceFeedback && (
              <div className="space-y-2 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-slate-800">
                <p><strong className="text-sky-900">Ponto forte:</strong> {practiceFeedback.strength}</p>
                <p><strong className="text-sky-900">Para melhorar:</strong> {practiceFeedback.improvement}</p>
                <p><strong className="text-sky-900">Tente de novo:</strong> {practiceFeedback.retryQuestion}</p>
              </div>
            )}
          </section>

          <section id="etapa-3-fontes" aria-labelledby="titulo-repertorio" aria-busy={isGeneratingTheme} className="cp-card rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Etapa 3 • Repertório com fonte</span>
              <h3 id="titulo-repertorio" className="mt-1 text-lg font-extrabold text-slate-900">Leia antes de usar um dado</h3>
              <p className="mt-1 text-sm text-slate-600">Use as fontes para entender uma ideia e depois explique-a com suas palavras. Os links abrem os materiais originais.</p>
            </div>
            {isGeneratingTheme && <p role="status" className="sr-only">Preparando a nova proposta e suas leituras. A seleção abaixo ainda pertence ao tema atual.</p>}
            <div className="space-y-3">
              {studySources.map(({ source, connection, purpose }) => (
                <article key={source.id} data-source-id={source.id} className="cp-source-card rounded-xl border border-slate-200 p-3.5">
                  <span className="cp-source-purpose">{SOURCE_PURPOSES[purpose]}</span>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-800">{source.institution} • {source.date}</div>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" title={`Fonte do catálogo conferido em ${SOURCE_CATALOG_CHECKED_AT}. ${source.caution}`} className="mt-1 inline-flex items-start gap-1 text-sm font-bold text-slate-900 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-800">
                    {source.title}<ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  </a>
                  <p className="mt-1 text-xs text-slate-600">Pode ajudar em: {connection}</p>
                </article>
              ))}
              {studySources.length === 0 && <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Este tema ainda não tem leituras vinculadas. Use “Gerar situação-problema inédita com IA” para criar uma proposta com fontes.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


// Componentes exclusivamente visuais. Os recursos de estudo mantêm o mesmo estado.
function StudyIllustration() {
  return (
    <div className="cp-study-art" aria-hidden="true">
      <div className="cp-art-orbit" />
      <span className="cp-art-spark cp-spark-one">✳</span><span className="cp-art-spark cp-spark-two">✦</span>
      <div className="cp-art-paper">
        <span className="cp-paper-tag">PROJETO DE TEXTO</span>
        <span className="cp-paper-title">Grandes ideias.<br />Suas palavras.</span>
        <span className="cp-paper-line" /><span className="cp-paper-line cp-paper-line-short" />
        <span className="cp-paper-highlight">tese + argumento + autoria</span>
        <span className="cp-paper-line" /><span className="cp-paper-line" /><span className="cp-paper-line cp-paper-line-short" />
        <span className="cp-paper-check"><Check size={16} /> um passo de cada vez</span>
      </div>
      <div className="cp-art-pencil"><span /><i /></div>
      <span className="cp-art-sticker"><Sparkles size={18} /><span>Sua voz<br /><strong>faz a diferença.</strong></span></span>
      <svg className="cp-art-arrow" viewBox="0 0 130 76"><path d="M5 10C100-20 122 45 56 59m0 0 16-17M56 59l25 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}

function WorkspaceHero({ page, progress, completed, total, isMockExam }) {
  const content = {
    simulador: { tag: 'PÁGINA 01 · SIMULADOR DE REDAÇÃO', title: <>Seu futuro.<br />Suas ideias.<br /><span>Sua escrita.</span></>, description: 'Um espaço para treinar, descobrir sua voz e chegar mais confiante à redação da São Camilo.' },
    plano: { tag: 'PÁGINA 02 · PLANO DE ESTUDOS', title: <>Um passo por dia.<br /><span>Uma escrita melhor.</span></>, description: 'De 19 a 22/10: quatro dias de prática, com espaço para descansar. Acompanhe suas metas e veja sua evolução.' },
    parafrase: { tag: 'PÁGINA 03 · LABORATÓRIO', title: <>Boas ideias.<br /><span>Com a sua voz.</span></>, description: 'Aprenda a transformar uma referência em argumento autoral. Experimente, receba feedback e conecte suas ideias.' },
    'folha-ouro': { tag: 'PÁGINA 04 · FOLHA DE OURO', title: <>Leve o essencial.<br /><span>Confie no treino.</span></>, description: 'Seu repertório de bolso para a revisão de cinco minutos no dia 26/10. Respire: uma ideia de cada vez.' }
  }[page];
  if (isMockExam) return <section className="cp-focus-banner"><span className="cp-eyebrow"><Clock size={16} /> MODO SIMULADO</span><h1>Agora é você e a sua escrita.</h1><p>Leia a proposta, organize suas ideias e acompanhe o tempo abaixo.</p></section>;
  return (
    <section className={`cp-workspace-hero ${page === 'simulador' ? 'cp-home-hero' : 'cp-compact-hero'}`} aria-labelledby="workspace-title">
      <div className="cp-hero-copy">
        <span className="cp-eyebrow"><span className="cp-small-star">✳</span> {content.tag}</span>
        <h1 id="workspace-title">{content.title}</h1>
        <p>{content.description}</p>
        {page === 'simulador' && <div className="cp-hero-facts"><span><Clock size={15} /><strong>60 min</strong> para praticar</span><span><FileText size={15} /><strong>250–450</strong> palavras</span></div>}
      </div>
      {page === 'simulador' ? <StudyIllustration /> : page === 'plano' ? (
        <div className="cp-plan-progress"><span className="cp-eyebrow">SEU CAMINHO ATÉ A PROVA</span><strong>{progress}<small>%</small></strong><div role="progressbar" aria-label="Metas concluídas" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="cp-progress-track"><span style={{width: `${progress}%`}} /></div><span>{completed} de {total} metas concluídas</span></div>
      ) : <div className="cp-section-seal" aria-hidden="true">{page === 'parafrase' ? <PenTool size={57} strokeWidth={1.5} /> : <Award size={62} strokeWidth={1.5} />}<span>{page === 'parafrase' ? 'AUTORIA SE TREINA' : 'SEU REPERTÓRIO VALE OURO'}</span><span className="cp-seal-star">✦</span></div>}
    </section>
  );
}

export default function App() {
  // Navegação principal
  const [activeTab, setActiveTab] = useState('simulador');

  // Estado dos Temas e Proposta Selecionada
  const [themes, setThemes] = useState(INITIAL_THEMES);
  const [selectedThemeId, setSelectedThemeId] = useState(INITIAL_THEMES[0].id);
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);
  const [themeGenerationError, setThemeGenerationError] = useState('');
  const [customThemeAxis, setCustomThemeAxis] = useState('Saúde, Farmácia e Sociedade');

  // Estado do Editor de Redação
  const [essayTitle, setEssayTitle] = useState('');
  const [essayText, setEssayText] = useState('');
  const [showSkeletonHelper, setShowSkeletonHelper] = useState(true);
  const [copiedConnective, setCopiedConnective] = useState('');

  // Cronômetro de 60 minutos (3600 segundos)
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isMockExam, setIsMockExam] = useState(false);

  // Estado do Checklist do Plano de 4 Dias (Persistido no localStorage)
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('camiloprep_tasks_v1');
      return saved ? JSON.parse(saved) : { 't18-1': true };
    } catch {
      return { 't18-1': true };
    }
  });

  // Histórico de Redações Corrigidas (Persistido no localStorage)
  const [essayHistory, setEssayHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('camiloprep_history_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Estado da Avaliação da IA (Banca São Camilo)
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [evalError, setEvalError] = useState('');

  // Estado do Laboratório de Paráfrase
  const [paraphraseInput, setParaphraseInput] = useState(
    'Segundo levantamento do Conselho Federal de Farmácia (CFF), cerca de 77% dos brasileiros têm o hábito de se automedicar, comportamento amplificado por influenciadores digitais.'
  );
  const [studentParaphrase, setStudentParaphrase] = useState('');
  const [isCheckingParaphrase, setIsCheckingParaphrase] = useState(false);
  const [paraphraseFeedback, setParaphraseFeedback] = useState(null);

  const selectedTheme = useMemo(
    () => themes.find((t) => t.id === selectedThemeId) || themes[0],
    [themes, selectedThemeId]
  );

  // Salvar tarefas no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('camiloprep_tasks_v1', JSON.stringify(completedTasks));
    } catch (e) {
      // Ignorar erros de storage
    }
  }, [completedTasks]);

  // Salvar histórico no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('camiloprep_history_v1', JSON.stringify(essayHistory));
    } catch (e) {
      // Ignorar erros de storage
    }
  }, [essayHistory]);

  // Efeito do Cronômetro de 60 minutos
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Formatação do Cronômetro
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartMockExam = () => {
    if (essayText.trim() || essayTitle.trim()) {
      setEvalError('Para começar um simulado novo sem apagar seu texto, vá ao Simulador, salve o que quiser guardar e use “Limpar Editor”. Depois volte aqui para iniciar.');
      setActiveTab('simulador');
      return;
    }
    setEvalError('');
    setEvaluationResult(null);
    setSecondsLeft(3600);
    setIsMockExam(true);
    setTimerRunning(true);
    setActiveTab('simulador');
  };

  const handleEndMockExam = () => {
    setTimerRunning(false);
    setIsMockExam(false);
  };

  // Fase atual da prova de 60 minutos
  const examPhase = useMemo(() => {
    const elapsedMinutes = (3600 - secondsLeft) / 60;
    if (elapsedMinutes < 10) {
      return {
        label: 'Fase 1 (0–10 min): Leitura da Situação-Problema & Projeto de Texto',
        color: 'text-sky-700 bg-sky-50 border-sky-200'
      };
    }
    if (elapsedMinutes < 45) {
      return {
        label: 'Fase 2 (10–45 min): Digitação Focada dos 4 Parágrafos (Meta: 340–380 palavras)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      };
    }
    if (elapsedMinutes < 55) {
      return {
        label: 'Fase 3 (45–55 min): Fechamento Cíclico & Ajuste do Limite de Palavras',
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      };
    }
    return {
      label: 'Fase 4 (Últimos 5 min): Revisão Fina de Vírgulas, Crase e Digitação!',
      color: 'text-rose-700 bg-rose-50 border-rose-200'
    };
  }, [secondsLeft]);

  // ============================================================================
  // ANÁLISE EM TEMPO REAL DA REDAÇÃO (PALAVRAS, PARÁGRAFOS, PLÁGIO E REPETIÇÕES)
  // ============================================================================
  const textMetrics = useMemo(() => {
    const cleanText = essayText.trim();
    const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    // Divisão em parágrafos
    const paragraphs = cleanText
      ? cleanText
          .split(/\n+/)
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const paragraphCounts = paragraphs.map((p, idx) => {
      const count = p.split(/\s+/).filter(Boolean).length;
      const targets = [
        { name: 'P1 • Introdução', idealMin: 65, idealMax: 95 },
        { name: 'P2 • Desenvolvimento 1', idealMin: 85, idealMax: 120 },
        { name: 'P3 • Desenvolvimento 2', idealMin: 85, idealMax: 120 },
        { name: 'P4 • Conclusão Reflexiva', idealMin: 65, idealMax: 95 }
      ];
      const target = targets[idx] || { name: `Parágrafo ${idx + 1}`, idealMin: 60, idealMax: 110 };
      return {
        index: idx + 1,
        name: target.name,
        count,
        idealMin: target.idealMin,
        idealMax: target.idealMax
      };
    });

    // Status do limite oficial do Edital 084/2026 (250 a 450 palavras)
    let status = {
      zone: 'abaixo',
      label: 'Abaixo do Mínimo Oficial (< 250 palavras)',
      sublabel: `Faltam ${Math.max(0, 250 - wordCount)} palavras para o mínimo exigido no Edital 084/2026.`,
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      barClass: 'bg-rose-500'
    };

    if (wordCount >= 250 && wordCount < 320) {
      status = {
        zone: 'minimo-seguro',
        label: 'Dentro do Limite (250–319 palavras)',
        sublabel: `Mais ${320 - wordCount} palavras para entrar na Zona de Ouro Nota 100 (320–400).`,
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        barClass: 'bg-amber-500'
      };
    } else if (wordCount >= 320 && wordCount <= 400) {
      status = {
        zone: 'ouro',
        label: 'ZONA DE OURO NOTA 100 (320–400 palavras)',
        sublabel: 'Extensão perfeita para desenvolver tese + 2 argumentos profundos sem risco de exceder.',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-400',
        barClass: 'bg-emerald-600'
      };
    } else if (wordCount > 400 && wordCount <= 450) {
      status = {
        zone: 'alerta-teto',
        label: 'Atenção: Próximo ao Teto Máximo (401–450 palavras)',
        sublabel: `Restam apenas ${450 - wordCount} palavras antes do limite máximo do edital.`,
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        barClass: 'bg-amber-500'
      };
    } else if (wordCount > 450) {
      status = {
        zone: 'excedeu',
        label: 'LIMITE EXCEDIDO (> 450 palavras)',
        sublabel: `Corte ${wordCount - 450} palavras! O Edital 084/2026 penaliza textos acima de 450 palavras.`,
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-400',
        barClass: 'bg-rose-600'
      };
    }

    // Detector de Cópia Literal (Plágio de sequências de 5+ palavras do texto-base)
    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const baseWords = normalize(selectedTheme.baseText).split(' ').filter(Boolean);
    const essayWordsNorm = normalize(essayText).split(' ').filter(Boolean);

    const copiedPhrases = [];
    if (essayWordsNorm.length >= 5 && baseWords.length >= 5) {
      const baseNgrams = new Set();
      for (let i = 0; i <= baseWords.length - 5; i++) {
        baseNgrams.add(baseWords.slice(i, i + 5).join(' '));
      }
      for (let j = 0; j <= essayWordsNorm.length - 5; j++) {
        const candidate = essayWordsNorm.slice(j, j + 5).join(' ');
        if (baseNgrams.has(candidate) && !copiedPhrases.includes(candidate)) {
          copiedPhrases.push(candidate);
        }
      }
    }

    // Detector de palavras longas repetidas excessivamente
    const stopWords = new Set([
      'como', 'para', 'pela', 'pelo', 'pelos', 'pelas', 'isso', 'essa', 'esse',
      'este', 'esta', 'mais', 'muito', 'pode', 'sobre', 'entre', 'onde', 'quando',
      'ainda', 'tambem', 'assim', 'sendo', 'cada', 'todo', 'toda', 'todos', 'todas',
      'outro', 'outra', 'mesmo', 'mesma', 'alem', 'disso', 'dessa', 'desse'
    ]);
    const freq = {};
    essayWordsNorm.forEach((w) => {
      if (w.length >= 5 && !stopWords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });
    const repeatedWords = Object.entries(freq)
      .filter(([, count]) => count >= 4)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      wordCount,
      paragraphCount: paragraphs.length,
      paragraphCounts,
      status,
      copiedPhrases,
      repeatedWords
    };
  }, [essayText, selectedTheme]);

  // ============================================================================
  // AÇÃO: GERAR NOVO TEMA COM IA PELA FUNÇÃO DO SUPABASE
  // ============================================================================
  const handleGenerateCustomTheme = async ({ randomizeAxis = false } = {}) => {
    if (randomizeAxis && (essayText.trim() || essayTitle.trim())) {
      setThemeGenerationError('Há uma redação no simulador. Na página 1, salve uma cópia do título e do texto e depois esvazie os dois campos. Volte aqui para gerar outra situação-problema.');
      return;
    }

    const axisConfig = randomizeAxis
      ? THEME_GENERATION_AXES[Math.floor(Math.random() * THEME_GENERATION_AXES.length)]
      : { label: customThemeAxis, sourceIds: SOURCE_LIBRARY.map((source) => source.id) };
    const generationAxis = axisConfig.label;
    const sourceCatalogForPrompt = axisConfig.sourceIds.map((id) => {
      const source = SOURCE_BY_ID.get(id);
      return {
        id: source.id, title: source.title, institution: source.institution,
        publisher: source.publisher, date: source.date, kind: source.kind,
        allowedPurposes: source.purposes, verifiedSummary: source.summary, limitation: source.caution
      };
    });
    const recentThemeTitles = themes
      .slice(0, 8)
      .map((theme) => `- ${theme.title}`)
      .join('\n');

    setThemeGenerationError('');
    setIsGeneratingTheme(true);
    try {
      const prompt = `Você é uma professora de redação que prepara exercícios de treino para uma estudante interessada na São Camilo. Não alegue representar a instituição ou uma banca oficial.
Crie uma proposta de redação INÉDITA sobre o eixo: "${generationAxis}", com um roteiro de leitura fundamentado EXCLUSIVAMENTE no catálogo abaixo.
Não repita os títulos nem o recorte das propostas recentes abaixo; escolha um problema social ou de saúde diferente dentro do eixo indicado:
${recentThemeTitles || '- Nenhum tema anterior'}
A proposta deve conter:
1. category e um title claro.
2. baseText: um texto-base completo e contextualizado, entre 110 e 150 palavras, que apresente o problema antes do comando. Use apenas fatos e conceitos dos resumos das três fontes que selecionar em studySources. Pode descrever uma situação hipotética, identificada como tal. Não invente estatísticas, pesquisas, citações ou notícias. Preserve ano, território e público de qualquer dado. Não apresente uma pesquisa antiga como atual. O texto-base deve ajudar a compreender o contexto; não deve repetir o comando nem ser uma redação pronta.
3. problemSituation: um comando claro para produzir um texto dissertativo-argumentativo entre 250 e 450 palavras, sem dar a resposta pronta. O comando deve se referir ao texto-base gerado nesta mesma resposta e tratar do mesmo recorte.
4. studySources: EXATAMENTE três leituras diferentes, pertinentes ao recorte específico que você criou. Defina o recorte de forma que haja suporte em três materiais do catálogo. Use pelo menos dois publishers diferentes.
Cada leitura contém somente sourceId, purpose, connection, howToUse e readingQuestion.
- Use um sourceId existente no catálogo; não crie links, títulos, autores ou metadados. A aplicação acrescentará o link original e o resumo conferido.
- Distribua as três finalidades sem repetir: entender, evidencias, argumentar. Respeite allowedPurposes de cada material.
- entender: uma leitura para compreender as causas, o contexto ou um conceito central.
- evidencias: uma pesquisa, um relatório ou uma síntese técnica relevante. Não chame orientação institucional de pesquisa. Não trate associação como prova de causalidade.
- argumentar: um conceito, direito ou política que ajude a construir um raciocínio autoral sobre o tema.
- connection: explique a ligação específica com a situação-problema, em uma ou duas frases.
- howToUse: oriente o que observar ou comparar, sem redigir tese ou parágrafo pronto.
- readingQuestion: uma pergunta concreta para guiar a leitura.
- As orientações devem se apoiar apenas no verifiedSummary e respeitar limitation. Não acrescente fatos novos, números, citações literais ou URLs às orientações. Escreva cada campo com 15 a 700 caracteres.
- Não force uma referência só por ser conhecida. Não afirme ter pesquisado a internet ou lido o texto integral.
CATÁLOGO CONFERIDO:
${JSON.stringify(sourceCatalogForPrompt)}`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              category: { type: 'STRING' },
              title: { type: 'STRING' },
              baseText: { type: 'STRING' },
              problemSituation: { type: 'STRING' },
              studySources: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    sourceId: { type: 'STRING' },
                    purpose: { type: 'STRING' },
                    connection: { type: 'STRING' },
                    howToUse: { type: 'STRING' },
                    readingQuestion: { type: 'STRING' }
                  },
                  required: ['sourceId', 'purpose', 'connection', 'howToUse', 'readingQuestion']
                }
              }
            },
            required: ['category', 'title', 'baseText', 'problemSituation', 'studySources']
          }
        }
      };

      const rawJson = await callGeminiAPI(payload);
      const parsed = JSON.parse(rawJson);

      if (!parsed || ['title', 'baseText', 'problemSituation'].some((field) =>
        typeof parsed[field] !== 'string' || !parsed[field].trim()
      )) {
        throw new Error('A IA retornou uma proposta incompleta. O tema anterior foi mantido. Tente gerar novamente.');
      }
      const studySources = validateStudySources(parsed.studySources, axisConfig.sourceIds);

      const newTheme = {
        id: `tema-ia-${Date.now()}`,
        daySuggestion: 'Tema Inédito IA',
        category: typeof parsed.category === 'string' && parsed.category.trim() ? parsed.category.trim() : generationAxis,
        title: parsed.title.trim(),
        baseText: parsed.baseText.trim(),
        problemSituation: parsed.problemSituation.trim(),
        studySources
      };

      setThemes((prev) => [newTheme, ...prev]);
      setSelectedThemeId(newTheme.id);
      setThemeGenerationError('');
    } catch (error) {
      setThemeGenerationError(error.message || 'Não foi possível gerar o tema agora. Tente novamente em instantes.');
    } finally {
      setIsGeneratingTheme(false);
    }
  };

  // ============================================================================
  // AÇÃO: AVALIAR REDAÇÃO NA BANCA SÃO CAMILO (0 A 100 PONTOS)
  // ============================================================================
  const handleEvaluateEssay = async () => {
    if (textMetrics.wordCount < 80) {
      setEvalError('Digite pelo menos um rascunho de 80 palavras para que a Banca IA possa avaliar detalhadamente.');
      return;
    }
    setEvalError('');
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const systemInstruction = `Você é o corretor titular da Banca Oficial de Redação Agendada do Centro Universitário São Camilo (Edital nº 084/2026 - Curso de Farmácia).
Avalie a redação da candidata de 0 a 100 pontos com rigor técnico e acolhimento pedagógico, considerando:
- Regra de extensão oficial: mínimo de 250 palavras e máximo de 450 palavras (Zona ideal: 320 a 400 palavras).
- Proibição de plágio/cópia literal do texto-base (item 5.1.2.9 do Edital).
- Gênero dissertativo-argumentativo com posicionamento crítico diante da situação-problema apresentada (não exige proposta de intervenção com 5 elementos do ENEM, mas valoriza síntese ética/reflexiva coerente na conclusão).

Divida a nota (0 a 100) em 4 critérios de 0 a 25 pontos cada:
1. criterio1_adequacao (0-25): Atendimento à situação-problema, gênero dissertativo e extensão (250-450 palavras).
2. criterio2_argumentacao (0-25): Clareza da tese, equilíbrio dos 4 parágrafos, coerência e profundidade crítica.
3. criterio3_coesao_repertorio (0-25): Uso de conectivos, articulação de ideias, paráfrase autoral e repertório sociocultural produtivo.
4. criterio4_norma_padrao (0-25): Gramática, regência, crase, pontuação, ortografia e precisão vocabular.`;

      const userPrompt = `PROPOSTA DE REDAÇÃO:
Título do Tema: ${selectedTheme.title}
Texto-Base: ${selectedTheme.baseText}
Situação-Problema: ${selectedTheme.problemSituation}

MÉTRICAS AUTOMÁTICAS DA CANDIDATA:
- Contagem exata de palavras: ${textMetrics.wordCount} palavras (Regra Edital: 250 a 450 palavras)
- Quantidade de parágrafos: ${textMetrics.paragraphCount}
- Trechos de 5+ palavras idênticos ao texto-base detectados: ${
        textMetrics.copiedPhrases.length > 0 ? textMetrics.copiedPhrases.join(' | ') : 'Nenhum (0 plágio)'
      }

TEXTO DIGITADO PELA CANDIDATA:
Título: ${essayTitle || '(Sem título - opcional)'}
${essayText}`;

      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              totalScore: { type: 'INTEGER' },
              criterio1_adequacao: { type: 'INTEGER' },
              criterio2_argumentacao: { type: 'INTEGER' },
              criterio3_coesao_repertorio: { type: 'INTEGER' },
              criterio4_norma_padrao: { type: 'INTEGER' },
              verdictTitle: { type: 'STRING' },
              generalSummary: { type: 'STRING' },
              strengths: {
                type: 'ARRAY',
                items: { type: 'STRING' }
              },
              grammarAndStyleCorrections: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    originalSnippet: { type: 'STRING' },
                    correctedSnippet: { type: 'STRING' },
                    explanation: { type: 'STRING' }
                  },
                  required: ['originalSnippet', 'correctedSnippet', 'explanation']
                }
              },
              rewrittenModelParagraph: { type: 'STRING' },
              nextStepActionForDay26: { type: 'STRING' }
            },
            required: [
              'totalScore',
              'criterio1_adequacao',
              'criterio2_argumentacao',
              'criterio3_coesao_repertorio',
              'criterio4_norma_padrao',
              'verdictTitle',
              'generalSummary',
              'strengths',
              'grammarAndStyleCorrections',
              'rewrittenModelParagraph',
              'nextStepActionForDay26'
            ]
          }
        }
      };

      const rawResponse = await callGeminiAPI(payload);
      const parsed = JSON.parse(rawResponse);
      setEvaluationResult(parsed);

      // Salvar no histórico de evolução
      const historyItem = {
        id: `eval-${Date.now()}`,
        date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
        themeTitle: selectedTheme.title,
        wordCount: textMetrics.wordCount,
        totalScore: parsed.totalScore,
        c1: parsed.criterio1_adequacao,
        c2: parsed.criterio2_argumentacao,
        c3: parsed.criterio3_coesao_repertorio,
        c4: parsed.criterio4_norma_padrao
      };
      setEssayHistory((prev) => [historyItem, ...prev.slice(0, 14)]);
    } catch (err) {
      setEvalError('Erro ao conectar com a Banca IA. Verifique sua conexão e clique em avaliar novamente.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // ============================================================================
  // AÇÃO: AVALIAR PARÁFRASE NO LABORATÓRIO
  // ============================================================================
  const handleCheckParaphrase = async () => {
    if (!studentParaphrase.trim()) return;
    setIsCheckingParaphrase(true);
    setParaphraseFeedback(null);

    try {
      const prompt = `Trecho Original do Texto-Base: "${paraphraseInput}"
Tentativa de Paráfrase da Estudante: "${studentParaphrase}"

Avalie se a estudante conseguiu parafrasear sem cometer plágio (Edital São Camilo 084/2026) e ofereça 2 versões nota 100 prontas para usar em uma redação de Farmácia/Saúde.`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              isOriginalEnough: { type: 'BOOLEAN' },
              feedback: { type: 'STRING' },
              version1_academic: { type: 'STRING' },
              version2_critical: { type: 'STRING' }
            },
            required: ['isOriginalEnough', 'feedback', 'version1_academic', 'version2_critical']
          }
        }
      };

      const raw = await callGeminiAPI(payload);
      setParaphraseFeedback(JSON.parse(raw));
    } catch (e) {
      setParaphraseFeedback({
        isOriginalEnough: true,
        feedback: 'Continue substituindo os verbos e transformando dados percentuais em expressões como "mais de três quartos da população".',
        version1_academic: 'Dados divulgados pelo Conselho Federal de Farmácia evidenciam que mais de três quartos da população brasileira recorrem ao uso autônomo de fármacos, prática intensificada pela cultura digital.',
        version2_critical: 'A expressiva adesão de quase oito em cada dez brasileiros à automedicação, conforme aponta o CFF, revela como a influência das redes sociais tem fragilizado o cuidado farmacêutico seguro.'
      });
    } finally {
      setIsCheckingParaphrase(false);
    }
  };

  // Inserir esqueleto guiado no editor
  const handleInsertTemplate = () => {
    const template = `Sob a ótica do conceito de [insira repertório: Saúde Única da OMS / Sociedade do Cansaço de Byung-Chul Han], o equilíbrio entre o avanço técnico e o bem-estar humano depende diretamente da responsabilidade ética coletiva. No entanto, no cenário contemporâneo, observa-se [apresente a situação-problema do tema com suas próprias palavras]. Nesse contexto, torna-se urgente analisar como [Argumento 1: ex. a desinformação / negligência] e [Argumento 2: ex. a falta de consciência cidadã] agravam esse impasse.

Em primeira análise, cumpre destacar que [desenvolva o Argumento 1]. De acordo com informações contextualizadas sobre o tema, [parafraseie um dado ou ideia do texto-base sem copiar frases prontas]. Isso ocorre porque a busca por soluções imediatistas frequentemente substitui a orientação técnica qualificada, gerando riscos severos à saúde individual e coletiva.

Ademais, sob outra perspectiva, nota-se que [desenvolva o Argumento 2]. Quando a sociedade naturaliza [cite o comportamento problemático], compromete-se não apenas a qualidade de vida presente, mas também a sustentabilidade das relações humanas e sanitárias, contrariando o direito fundamental à dignidade previsto na Constituição Federal.

Depreende-se, portanto, que superar os desafios ligados a [retome o tema central] exige articular rigor científico, educação crítica e responsabilidade social. Dessa forma, ao substituir a negligência pela conscientização ética, será possível honrar o verdadeiro sentido do cuidado integral em saúde.`;
    setEssayText(template);
  };

  // Copiar ou inserir conectivo no texto
  const handleUseConnective = (conn) => {
    setCopiedConnective(conn);
    setEssayText((prev) => (prev ? `${prev.trimEnd()} ${conn} ` : `${conn} `));
    setTimeout(() => setCopiedConnective(''), 1800);
  };

  // Progresso total do cronograma
  const totalTasksCount = STUDY_PLAN_DAYS.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasksCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedTasksCount / totalTasksCount) * 100);

  return (
    <div className="cp-app" data-page={activeTab}>
      <style>{CAMILOPREP_DESIGN_CSS}</style>
      <a className="cp-skip" href="#conteudo-estudo">Pular para o conteúdo</a>
      <header className="cp-header">
        <div className="cp-topbar">
          <div className="cp-brand" aria-label="CamiloPrep">
            <span className="cp-brand-symbol" aria-hidden="true"><PenTool size={24} strokeWidth={2.5} /></span>
            <span>camilo<span className="cp-brand-bottom">prep<span className="cp-brand-dot">.</span></span></span>
          </div>
          <nav className="cp-navigation" aria-label="Páginas de estudo">
            {[
              { id: 'simulador', number: '01', short: 'Simulador', label: '1. Simulador Oficial (Prova Digitada)', icon: PenTool },
              { id: 'plano', number: '02', short: 'Meu plano', label: `2. Plano 4 Dias (19 a 22/10) • ${progressPercent}%`, icon: ListChecks },
              { id: 'parafrase', number: '03', short: 'Laboratório', label: '3. Laboratório Anti-Plágio & Conectivos', icon: Layers },
              { id: 'folha-ouro', number: '04', short: 'Folha de ouro', label: '4. Folha de Ouro (Revisão 5 min Dia 26)', icon: Sparkles },
              { id: 'professor', number: '05', short: 'Professor virtual', label: '5. Professor Virtual', icon: GraduationCap }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                  disabled={isMockExam && tab.id !== 'simulador'}
                  aria-label={tab.label} aria-current={activeTab === tab.id ? 'page' : undefined}
                  aria-controls="conteudo-estudo" className={`cp-nav-item ${activeTab === tab.id ? 'is-active' : ''}`}>
                  <span className="cp-nav-number" aria-hidden="true">{tab.number}</span>
                  <Icon size={16} aria-hidden="true" /><span>{tab.short}</span>
                  {tab.id === 'plano' && <span className="cp-nav-progress" aria-hidden="true">{progressPercent}%</span>}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="cp-context-line">
          <span><span className="cp-status-dot" /> Seu espaço de preparação para a São Camilo</span>
          <span><Calendar size={13} /> Farmácia · Prova em 26/10</span>
        </div>
      </header>

      <main id="conteudo-estudo" tabIndex={-1} className="cp-main">
        {activeTab !== 'professor' && <WorkspaceHero page={activeTab} progress={progressPercent}
          completed={completedTasksCount} total={totalTasksCount} isMockExam={isMockExam} />}
        {/* =====================================================================
            ABA 1: SIMULADOR OFICIAL DE PROVA DIGITADA SÃO CAMILO
           ===================================================================== */}
        {activeTab === 'simulador' && (
          <div className="space-y-6">
            {/* BARRA DE CONTROLE DE TEMPO E SELETOR DE TEMA */}
            <div className="cp-card cp-control-panel bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5">
              <div className="flex flex-col gap-4">
                {/* Seletor de Proposta */}
                <div className="w-full space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Proposta de Situação-Problema (Padrão São Camilo):
                  </label>
                  <div className="flex flex-col md:flex-row gap-2">
                    <select
                      id="seletor-tema" aria-label="Escolha a proposta de redação"
                      value={selectedThemeId}
                      onChange={(e) => setSelectedThemeId(e.target.value)}
                      disabled={isMockExam}
                      className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      {themes.map((t) => (
                        <option key={t.id} value={t.id}>
                          [{t.daySuggestion}] {t.title}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleGenerateCustomTheme()}
                      disabled={isGeneratingTheme || isMockExam}
                      className="cp-generate-theme inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs border border-emerald-200 transition shrink-0"
                    >
                      <RefreshCw className={`w-4 h-4 text-emerald-700 ${isGeneratingTheme ? 'animate-spin' : ''}`} />
                      {isGeneratingTheme ? 'Criando Proposta...' : '+ Gerar Tema Inédito IA'}
                    </button>
                  </div>
                  {themeGenerationError && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">{themeGenerationError}</p>}
                </div>

                {/* Cronômetro Oficial de 60 Minutos */}
               <div className="cp-timer flex flex-wrap items-center justify-between gap-3  bg-rose-100 text-rose-800 px-4 py-3 rounded-2xl border boborder-rose-300 w-full sm:w-fit self-start sm:self-end">
                  <Clock className={`w-6 h-6 ${timerRunning ? 'text-rose-800 animate-pulse' : 'text-rose-400'}`} />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-rose-800 font-semibold">
                      {isMockExam ? (timerRunning ? 'Simulado em andamento' : 'Tempo encerrado') : 'Tempo Oficial (60 min)'}
                    </div>
                    <div className="text-2xl font-mono font-extrabold tracking-wider text-white">
                      {formatTime(secondsLeft)}
                    </div>
                  </div>
                  {!isMockExam && <div className="flex items-center gap-1.5 ml-2">
                    <button
                      onClick={() => setTimerRunning((prev) => !prev)}
                      className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                        timerRunning
                          ? 'bg-rose-500 hover:bg-rose-600 text-white-950'
                          : 'bg-lime-500 hover:bg-lime-600 text-white-950'
                      }`}
                      title={timerRunning ? 'Pausar Cronômetro' : 'Iniciar Cronômetro de 60 min'}
                    >
                      {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{timerRunning ? 'Pausar' : 'Iniciar'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setSecondsLeft(3600);
                      }}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Reiniciar 60 minutos"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>}
                </div>
              </div>

              {isMockExam && (
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-3 text-sm text-amber-950">
                  <span className="font-semibold">
                    {secondsLeft > 0
                      ? 'Modo simulado ativo: dicas e conectivos rápidos estão ocultos.'
                      : 'Tempo encerrado. Faça uma revisão final e depois corrija sua redação.'}
                  </span>
                  <button
                    onClick={handleEndMockExam}
                    className="shrink-0 rounded-lg border border-amber-400 bg-white px-3 py-2 text-xs font-bold text-amber-950 hover:bg-amber-100"
                  >
                    Encerrar simulado
                  </button>
                </div>
              )}

              {/* Guia de Fase do Tempo */}
              {(!isMockExam || !timerRunning) && <div className={`mt-3 px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between ${examPhase.color}`}>
                <span>{examPhase.label}</span>
                <span className="hidden sm:inline opacity-80">
                  Meta ideal: 10m Rascunho Mental • 35m Digitação • 15m Revisão
                </span>
              </div>}
            </div>

            {/* GRID PRINCIPAL: PROPOSTA + EDITOR DE DIGITAÇÃO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* COLUNA ESQUERDA (5 cols): TEXTO-BASE, SITUAÇÃO-PROBLEMA & MONITOR DE PARÁGRAFOS */}
              <div className="lg:col-span-5 space-y-5">
                {/* Card da Proposta Oficial */}
                <div className="cp-card bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="cp-proposal-heading bg-emerald-900 text-white px-5 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                      {selectedTheme.category}
                    </span>
                    <span className="text-xs bg-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                      {selectedTheme.daySuggestion}
                    </span>
                  </div>
                  <div className="p-5 space-y-4">
                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {selectedTheme.title}
                    </h2>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Texto-Base (Leia e Parafraseie — Não copie trechos!)
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed text-justify">
                        {selectedTheme.baseText}
                      </p>
                    </div>

                    <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-4 space-y-1.5">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        Comando da Situação-Problema:
                      </div>
                      <p className="text-sm font-medium text-amber-950 leading-relaxed">
                        {selectedTheme.problemSituation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Monitor de Equilíbrio dos 4 Parágrafos */}
                <div className={`${isMockExam && timerRunning ? 'hidden' : ''} bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      Termômetro de Equilíbrio por Parágrafo
                    </h3>
                    <span className="text-xs font-semibold text-slate-500">
                      {textMetrics.paragraphCount}/4 parágrafos
                    </span>
                  </div>

                  {textMetrics.paragraphCounts.length === 0 ? (
                    <p className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-dashed border-slate-200">
                      Comece a digitar sua redação ao lado. Pule uma linha (Enter) para separar cada um dos 4 parágrafos e ver o equilíbrio em tempo real.
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {textMetrics.paragraphCounts.map((p) => {
                        const isBalanced = p.count >= p.idealMin && p.count <= p.idealMax;
                        const isShort = p.count < p.idealMin;
                        return (
                          <div key={p.index} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                            <div className="flex items-center justify-between text-xs font-bold mb-1">
                              <span className="text-slate-800">{p.name}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full ${
                                  isBalanced
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isShort
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {p.count} palavras (Meta: {p.idealMin}–{p.idealMax})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all ${
                                  isBalanced ? 'bg-emerald-500' : isShort ? 'bg-amber-400' : 'bg-rose-500'
                                }`}
                                style={{ width: `${Math.min(100, Math.round((p.count / p.idealMax) * 100))}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Detector Automático de Plágio do Texto-Base */}
                  <div
                    className={`rounded-xl p-3.5 border text-xs ${
                      textMetrics.copiedPhrases.length === 0
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                    }`}
                  >
                    <div className="font-extrabold flex items-center gap-1.5 mb-1">
                      {textMetrics.copiedPhrases.length === 0 ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Detector Anti-Plágio (Edital Item 5.1.2.9): 100% Original
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                          Atenção! Sequência idêntica ao Texto-Base detectada:
                        </>
                      )}
                    </div>
                    {textMetrics.copiedPhrases.length === 0 ? (
                      <p className="text-emerald-800/90">
                        Nenhuma sequência de 5+ palavras copiada literalmente do texto motivador. Continue parafraseando!
                      </p>
                    ) : (
                      <div className="space-y-1">
                        <p>Substitua com suas próprias palavras os seguintes trechos:</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {textMetrics.copiedPhrases.map((phrase, idx) => (
                            <span
                              key={idx}
                              className="bg-rose-200/80 text-rose-950 px-2 py-0.5 rounded font-mono text-[11px]"
                            >
                              "{phrase}..."
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* COLUNA DIREITA (7 cols): TERMINAL DE DIGITAÇÃO OFICIAL SÃO CAMILO */}
              <div className="lg:col-span-7 space-y-5">
                <div className="cp-card cp-editor-card bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  <div className="cp-editor-title"><span><PenTool size={19} /> Seu espaço de escrita</span><span className="cp-mini-label">UMA IDEIA POR VEZ</span></div>
                  {/* Barra de Status de Palavras (250 a 450 palavras) */}
                  <div className={`${isMockExam && timerRunning ? 'hidden' : ''} p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-3`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Contador Oficial São Camilo (250 a 450 palavras)
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-3xl font-extrabold text-slate-900">
                            {textMetrics.wordCount}
                          </span>
                          <span className="text-sm font-semibold text-slate-600">
                            palavras digitadas
                          </span>
                        </div>
                      </div>

                      <div className={`px-3.5 py-2 rounded-xl border text-xs font-extrabold ${textMetrics.status.badgeClass}`}>
                        <div>{textMetrics.status.label}</div>
                        <div className="font-normal opacity-90 mt-0.5">{textMetrics.status.sublabel}</div>
                      </div>
                    </div>

                    {/* Barra Visual com Marcações de 250, 320, 400 e 450 */}
                    <div className="space-y-1">
                      <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        {/* Faixa Zona de Ouro demarcada */}
                        <div
                          className="absolute top-0 bottom-0 bg-emerald-200/60 border-x border-emerald-500/40"
                          style={{ left: `${(320 / 500) * 100}%`, width: `${((400 - 320) / 500) * 100}%` }}
                          title="Zona de Ouro: 320 a 400 palavras"
                        />
                        <div
                          className={`h-full transition-all duration-300 ${textMetrics.status.barClass}`}
                          style={{ width: `${Math.min(100, (textMetrics.wordCount / 500) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500 px-1">
                        <span>0</span>
                        <span className="text-amber-700">250 (Mínimo)</span>
                        <span className="text-emerald-700 font-bold">★ 320–400 (Zona Nota 100)</span>
                        <span className="text-rose-700">450 (Máximo)</span>
                      </div>
                    </div>
                  </div>

                  {/* Atalhos Rápidos de Conectivos e Esqueleto */}
                  <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {!isMockExam && (
                      <button
                        onClick={handleInsertTemplate}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Carregar Esqueleto Guiado (4 Parágrafos)
                      </button>
                      )}
                      {!isMockExam && (
                      <button
                        onClick={() => setShowSkeletonHelper((prev) => !prev)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1"
                      >
                        {showSkeletonHelper ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {showSkeletonHelper ? 'Ocultar Conectivos Rápidos' : 'Mostrar Conectivos Rápidos'}
                      </button>
                      )}
                    </div>

                    {!isMockExam && <button
                      onClick={() => {
                        setEssayText('');
                        setEssayTitle('');
                        setEvaluationResult(null);
                      }}
                      className="text-xs text-slate-500 hover:text-rose-600 font-semibold px-2 py-1 rounded transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Limpar Editor
                    </button>}
                  </div>

                  {/* Barra de Conectivos Clicáveis (Insere no cursor) */}
                  {showSkeletonHelper && !isMockExam && (
                    <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase">
                        <span>Clique em um conectivo para inserir na redação:</span>
                        {copiedConnective && (
                          <span className="text-emerald-700 font-bold">Inserido: "{copiedConnective}"</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Sob a ótica de',
                          'Nesse contexto, torna-se imperativo analisar',
                          'Em primeira análise, cumpre destacar que',
                          'Isso ocorre porque',
                          'Ademais, sob outra perspectiva, nota-se que',
                          'Soma-se a essa problemática o fato de que',
                          'Depreende-se, portanto, que',
                          'Dessa forma, será possível consolidar'
                        ].map((conn) => (
                          <button
                            key={conn}
                            onClick={() => handleUseConnective(conn)}
                            className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 font-medium transition shadow-2xs"
                          >
                            + {conn}...
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Área de Digitação (Simulando Computador da Prova) */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <input
                      type="text"
                      id="titulo-redacao" aria-label="Título da redação (opcional)"
                      value={essayTitle}
                      onChange={(e) => setEssayTitle(e.target.value)}
                      placeholder="Título da Redação (Opcional na São Camilo — não deixe linha em branco se não usar)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                    />

                    <textarea
                      id="texto-redacao" aria-label="Sua redação"
                      value={essayText}
                      onChange={(e) => setEssayText(e.target.value)}
                      rows={16}
                      spellCheck="false"
                      placeholder={isMockExam
                        ? 'Digite sua redação. Ela permanece no editor enquanto esta página estiver aberta.'
                        : `Digite sua redação aqui (Exatamente como no computador da São Camilo no dia 26/10)...\n\n• Parágrafo 1 (Introdução ~80 palavras): Repertório + Situação-Problema + Tese com 2 argumentos.\n• Parágrafo 2 (Desenvolvimento 1 ~100 palavras): Tópico frasal + Paráfrase de dado/fato + Crítica.\n• Parágrafo 3 (Desenvolvimento 2 ~100 palavras): "Ademais..." + Consequência ética/social.\n• Parágrafo 4 (Conclusão ~80 palavras): "Depreende-se, portanto..." + Síntese reflexiva retomando o repertório.\n\n(Dica: O corretor ortográfico automático do navegador está desativado neste campo para treinar sua atenção real de prova!)`}
                      className="cp-essay-input w-full p-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-base leading-relaxed font-serif focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-y"
                    />

                    {/* Alerta de Repetição de Palavras */}
                    {(!isMockExam || !timerRunning) && textMetrics.repeatedWords.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 text-xs bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-amber-900">
                        <span className="font-bold">Palavras repetidas 4+ vezes (use sinônimos):</span>
                        {textMetrics.repeatedWords.map(([word, count]) => (
                          <span key={word} className="bg-amber-200/70 px-2 py-0.5 rounded-md font-semibold">
                            "{word}" ({count}x)
                          </span>
                        ))}
                      </div>
                    )}

                    {evalError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                        {evalError}
                      </div>
                    )}

                    {/* Botão de Correção Oficial pela Banca IA */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        Avaliação segundo os 4 critérios do Edital 084/2026 (Escala 0 a 100 pontos • Mínimo aprovação: 50 pts).
                      </div>
                      <button
                        onClick={handleEvaluateEssay}
                        disabled={isEvaluating || (isMockExam && timerRunning)}
                        className="cp-correct-button inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition disabled:opacity-60 shrink-0"
                      >
                        {isEvaluating ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Corrigindo na Banca São Camilo...
                          </>
                        ) : (
                          <>
                            <Award className="w-5 h-5 text-amber-300" />
                            {isMockExam && timerRunning ? 'A correção libera ao terminar' : 'Corrigir Redação (0 a 100 pts)'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* =================================================================
                    RELATÓRIO DE CORREÇÃO DA BANCA SÃO CAMILO (0 A 100 PONTOS)
                   ================================================================= */}
                {evaluationResult && (
                  <div className="cp-card bg-white rounded-2xl shadow-md border-2 border-emerald-600/30 overflow-hidden space-y-5 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Laudo Oficial Simulado • Edital nº 084/2026
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-1.5">
                          {evaluationResult.verdictTitle}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">{evaluationResult.generalSummary}</p>
                      </div>

                      <div className="bg-emerald-950 text-white px-6 py-4 rounded-2xl text-center shrink-0 border border-emerald-800">
                        <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                          Nota Final São Camilo
                        </div>
                        <div className="text-4xl font-extrabold text-amber-400 mt-0.5">
                          {evaluationResult.totalScore}
                          <span className="text-lg text-emerald-200 font-normal">/100</span>
                        </div>
                        <div className="text-[11px] text-emerald-200 mt-1">
                          {evaluationResult.totalScore >= 85
                            ? 'Excelente! Nível Aprovação Farmácia'
                            : evaluationResult.totalScore >= 50
                            ? 'Classificada (Acima do mínimo de 50 pts)'
                            : 'Atenção: Abaixo de 50 pts'}
                        </div>
                      </div>
                    </div>

                    {/* 4 Critérios de 25 pontos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        {
                          title: '1. Situação-Problema & Gênero',
                          score: evaluationResult.criterio1_adequacao
                        },
                        {
                          title: '2. Coerência & Argumentação',
                          score: evaluationResult.criterio2_argumentacao
                        },
                        {
                          title: '3. Coesão & Repertório Autoral',
                          score: evaluationResult.criterio3_coesao_repertorio
                        },
                        {
                          title: '4. Norma-Padrão da Língua',
                          score: evaluationResult.criterio4_norma_padrao
                        }
                      ].map((crit, i) => (
                        <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                          <div className="text-xs font-bold text-slate-600">{crit.title}</div>
                          <div className="text-2xl font-extrabold text-emerald-800 mt-1">
                            {crit.score} <span className="text-xs font-normal text-slate-500">/ 25 pts</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pontos Fortes */}
                    {evaluationResult.strengths?.length > 0 && (
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Pontos Fortes da sua Redação:
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-emerald-950 list-disc list-inside">
                          {evaluationResult.strengths.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Correções Gramaticais e de Estilo */}
                    {evaluationResult.grammarAndStyleCorrections?.length > 0 && (
                      <div className="space-y-2.5">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                          Ajustes Específicos de Gramática, Coesão e Precisão:
                        </div>
                        <div className="space-y-2">
                          {evaluationResult.grammarAndStyleCorrections.map((item, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="line-through text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-medium">
                                  {item.originalSnippet}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                                  {item.correctedSnippet}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600">{item.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Parágrafo Reescrito Nível Nota 100 */}
                    {evaluationResult.rewrittenModelParagraph && (
                      <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 space-y-2">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          Exemplo de Parágrafo Elevado à Nota 100 (Baseado no seu texto):
                        </div>
                        <p className="text-sm text-slate-800 font-serif italic leading-relaxed">
                          "{evaluationResult.rewrittenModelParagraph}"
                        </p>
                      </div>
                    )}

                    {/* Próximo Passo */}
                    {evaluationResult.nextStepActionForDay26 && (
                      <div className="bg-slate-900 text-white p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3">
                        <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-300">Foco para o seu próximo treino: </span>
                          {evaluationResult.nextStepActionForDay26}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            ABA 2: PLANO DE GUERRA DOS 4 DIAS (19 A 22/10) + HISTÓRICO
           ===================================================================== */}
        {activeTab === 'plano' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <div className="cp-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Seu Cronograma Realista até o Dia 26/10 (Farmácia São Camilo)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Projetado respeitando sua noite de descanso hoje (18/10) e seus dias livres sem estudo (23, 24 e 25/10).
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-extrabold text-emerald-700">{progressPercent}%</div>
                  <div className="text-xs text-slate-500">
                    {completedTasksCount} de {totalTasksCount} metas concluídas
                  </div>
                </div>
              </div>

              {STUDY_PLAN_DAYS.map((day) => (
                <div
                  key={day.id}
                  className="cp-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                        {day.date}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">{day.title}</h3>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {day.badge}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {day.tasks.map((task) => {
                      const checked = !!completedTasks[task.id];
                      return (
                        <label
                          key={task.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                            checked
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                              : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setCompletedTasks((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                            }
                            className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className={`text-sm ${checked ? 'line-through opacity-75 font-medium' : 'font-medium'}`}>
                            {task.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Coluna Lateral: Histórico de Simulados */}
            <div className="lg:col-span-4 space-y-4">
              <div className="cp-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Seu Histórico de Evolução (Meta: 4 Redações)
                </h3>

                {essayHistory.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                    <p className="text-xs text-slate-600 font-medium">
                      Suas redações corrigidas na aba "Simulador Oficial" aparecerão salvas aqui com a nota de 0 a 100.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {essayHistory.map((item) => (
                      <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500">{item.date}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900">
                            Nota: {item.totalScore}/100
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-800 line-clamp-2">{item.themeTitle}</div>
                        <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200/80">
                          <span>{item.wordCount} palavras</span>
                          <span>
                            C1:{item.c1} | C2:{item.c2} | C3:{item.c3} | C4:{item.c4}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'professor' && (
          <ProfessorVirtual
            key={selectedTheme.id}
            selectedTheme={selectedTheme}
            essayHistory={essayHistory}
            onStartMockExam={handleStartMockExam}
            onGenerateNewSituationProblem={() => handleGenerateCustomTheme({ randomizeAxis: true })}
            isGeneratingTheme={isGeneratingTheme}
            themeGenerationError={themeGenerationError}
          />
        )}

        {/* =====================================================================
            ABA 3: LABORATÓRIO DE PARÁFRASE (ANTI-PLÁGIO) & BANCO DE CONECTIVOS
           ===================================================================== */}
        {activeTab === 'parafrase' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Treinador de Paráfrase com IA */}
            <div className="cp-card cp-lab-writing lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Blindagem contra o Item 5.1.2.9 do Edital
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 mt-2">
                  Laboratório de Paráfrase (Como usar o Texto-Base sem cometer plágio)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Na São Camilo, copiar trechos do texto-base zera ou desconta muitos pontos. Treine transformar um trecho motivador em uma frase 100% autoral:
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500">
                  1. Frase do Texto-Base (Original):
                </label>
                <textarea
                  aria-label="Frase original do texto-base"
                  value={paraphraseInput}
                  onChange={(e) => setParaphraseInput(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500">
                  2. Sua Paráfrase (Reescreva com suas palavras + verbo crítico):
                </label>
                <textarea
                  aria-label="Sua paráfrase"
                  value={studentParaphrase}
                  onChange={(e) => setStudentParaphrase(e.target.value)}
                  rows={3}
                  placeholder="Ex: Levantamentos do Conselho Federal de Farmácia apontam que mais de três quartos da população brasileira utilizam fármacos sem prescrição, hábito intensificado pelas mídias digitais..."
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <button
                onClick={handleCheckParaphrase}
                disabled={isCheckingParaphrase}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                {isCheckingParaphrase ? 'Analisando Paráfrase...' : 'Avaliar Minha Paráfrase & Gerar 2 Modelos Nota 100'}
              </button>

              {paraphraseFeedback && (
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3 text-xs sm:text-sm">
                  <div className="font-bold text-emerald-950">{paraphraseFeedback.feedback}</div>
                  <div className="space-y-2 pt-2 border-t border-emerald-200">
                    <div>
                      <span className="font-extrabold text-emerald-800">Modelo Autoral 1: </span>
                      <span className="text-slate-800 italic">"{paraphraseFeedback.version1_academic}"</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-emerald-800">Modelo Crítico 2: </span>
                      <span className="text-slate-800 italic">"{paraphraseFeedback.version2_critical}"</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Regra de Ouro dos Dados */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-extrabold uppercase text-slate-700">
                  Truque Rápido para Traduzir Porcentagens sem Copiar:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong>"77% dos brasileiros"</strong> → <em>"mais de três quartos da população nacional"</em>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong>"50% dos jovens"</strong> → <em>"metade do público juvenil contemporâneo"</em>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong>"80% dos casos"</strong> → <em>"oito em cada dez ocorrências registradas"</em>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong>"A OMS alerta que..."</strong> → <em>"Diretrizes da Organização Mundial da Saúde evidenciam..."</em>
                  </div>
                </div>
              </div>
            </div>

            {/* Banco de Conectivos por Parágrafo */}
            <div className="cp-card cp-connectives lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">
                Mapa de Conectivos de Alto Impacto (Banca São Camilo)
              </h3>
              <p className="text-xs text-slate-600">
                Clique em qualquer conectivo abaixo para enviá-lo diretamente para sua redação na aba Simulador:
              </p>

              {[
                { title: '1. Introdução (Contextualização & Tese)', items: CONNECTIVES_BANK.intro },
                { title: '2. Desenvolvimento 1 (Causa Principal)', items: CONNECTIVES_BANK.dev1 },
                { title: '3. Desenvolvimento 2 (Consequência / Ética)', items: CONNECTIVES_BANK.dev2 },
                { title: '4. Conclusão Reflexiva (Síntese Cíclica)', items: CONNECTIVES_BANK.conclusion }
              ].map((group, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="text-xs font-extrabold text-emerald-800 uppercase">{group.title}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((conn) => (
                      <button
                        key={conn}
                        onClick={() => {
                          handleUseConnective(conn);
                          setActiveTab('simulador');
                        }}
                        className="text-left text-xs px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 transition"
                      >
                        {conn}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            ABA 4: FOLHA DE OURO (REVISÃO DE 5 MINUTOS PARA A MANHÃ DO DIA 26/10)
           ===================================================================== */}
        {activeTab === 'folha-ouro' && (
          <div className="space-y-6">
            <div className="cp-gold-intro bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-300 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/30 text-amber-950 border border-amber-400">
                    Resumo Oficial para a Manhã de 26 de Outubro
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    Sua "Folha de Ouro" de 5 Minutos — Farmácia São Camilo
                  </h2>
                  <p className="text-sm text-slate-700 mt-1">
                    Nos dias 23, 24 e 25 você não vai estudar. No dia 26, basta ler esta página por 5 minutos antes de entrar na prova!
                  </p>
                </div>
              </div>
            </div>

            {/* Os 4 Repertórios Coringas Prontos para Usar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WILDCARD_REPERTORIES.map((rep, i) => (
                <div key={i} className="cp-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {rep.axis}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{rep.title}</h3>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-serif italic text-slate-800">
                    "{rep.quote}"
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Quando aplicar: </strong>
                    {rep.howToUse}
                  </p>
                </div>
              ))}
            </div>

            {/* Checklist de Bolso para os 60 Minutos no Laboratório de Informática da São Camilo */}
            <div className="cp-exam-protocol bg-slate-900 text-white rounded-2xl p-6 space-y-4">
              <h3 className="text-base sm:text-lg font-extrabold text-amber-300 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Protocolo Exato dos 60 Minutos no Computador da São Camilo (Dia 26/10)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
                <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 space-y-1">
                  <div className="font-extrabold text-emerald-400">Minutos 0 a 10</div>
                  <div className="font-bold text-white">Leitura & Esqueleto</div>
                  <p className="text-slate-300 text-xs">
                    Identifique a situação-problema, escolha 1 dos 4 repertórios coringas acima e defina Argumento 1 e Argumento 2.
                  </p>
                </div>
                <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 space-y-1">
                  <div className="font-extrabold text-emerald-400">Minutos 10 a 40</div>
                  <div className="font-bold text-white">Digitação de P1, P2 e P3</div>
                  <p className="text-slate-300 text-xs">
                    Digite a Introdução (~80 palavras) e os dois Desenvolvimentos (~100 palavras cada) parafraseando o texto-base.
                  </p>
                </div>
                <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 space-y-1">
                  <div className="font-extrabold text-emerald-400">Minutos 40 a 50</div>
                  <div className="font-bold text-white">Conclusão Cíclica (P4)</div>
                  <p className="text-slate-300 text-xs">
                    Inicie com "Depreende-se, portanto, que...", amarre os 2 argumentos e retome o repertório da introdução (~80 palavras).
                  </p>
                </div>
                <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 space-y-1">
                  <div className="font-extrabold text-amber-400">Minutos 50 a 60</div>
                  <div className="font-bold text-white">Pente-Fino Nota 100</div>
                  <p className="text-slate-300 text-xs">
                    Confirme que tem entre 320 e 400 palavras, elimine palavras repetidas e verifique se não há vírgula entre sujeito e verbo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="cp-footer"><span className="cp-footer-brand">camilo<strong>prep.</strong></span><span>Clareza para pensar. Confiança para escrever.</span><span>Seu treino para a São Camilo <ArrowRight size={15} /></span></footer>
    </div>
  );
}


// Tema visual autocontido: basta substituir este App.jsx no projeto existente.
const CAMILOPREP_DESIGN_CSS = `
.cp-app {
  --cp-ink: #22251f; --cp-muted: #64665d; --cp-paper: #fffef9;
  --cp-canvas: #f5f2eb; --cp-peach: #eacbae; --cp-pink: #bd3079;
  --cp-lime: #d9f963; --cp-line: #dedfd3;
  min-height:100vh; background:var(--cp-canvas); color:var(--cp-ink);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  -webkit-font-smoothing:antialiased; padding:18px 0 0; overflow-wrap:break-word;
}
.cp-app *, .cp-app *::before, .cp-app *::after { box-sizing:border-box; }
.cp-app button, .cp-app input, .cp-app select, .cp-app textarea { font-family:inherit; }
.cp-app button { cursor:pointer; transition:background-color .18s ease, color .18s ease, border-color .18s ease, box-shadow .18s ease; }
.cp-app button:disabled { cursor:not-allowed; opacity:.55; }
.cp-app button:focus-visible, .cp-app a:focus-visible, .cp-app input:focus-visible, .cp-app textarea:focus-visible, .cp-app select:focus-visible { outline:3px solid #9d2665; outline-offset:4px; }
.cp-app button:not(.cp-nav-item) { border-radius:999px; }
.cp-app input[type="checkbox"] { accent-color:#526730; }
.cp-app ::selection { background:#e6efa9; color:#20231f; }
.cp-app h1, .cp-app h2, .cp-app h3, .cp-app h4 { text-wrap:balance; }
.cp-app h2, .cp-app h3 { letter-spacing:-.035em; }
.cp-skip { position:absolute; top:8px; left:16px; z-index:100; transform:translateY(-180%); background:var(--cp-ink); color:white; padding:12px 20px; border-radius:12px; }
.cp-skip:focus { transform:translateY(0); }
.cp-header, .cp-main, .cp-footer { width:min(1280px,calc(100% - 64px)); margin-inline:auto; }
.cp-topbar { display:flex; align-items:center; justify-content:space-between; gap:32px; padding:20px 24px; background:#fffef9; border:1px solid #e4dfd5; border-radius:20px; box-shadow:0 3px 12px #27291b06; }
.cp-brand { display:flex; gap:11px; align-items:center; font-size:26px; font-weight:850; line-height:.8; letter-spacing:-1.4px; flex-shrink:0; }
.cp-brand-bottom { display:block; }
.cp-brand-dot { color:var(--cp-pink); }
.cp-brand-symbol { width:44px; height:44px; display:grid; place-items:center; border-radius:50%; background:var(--cp-lime); transform:rotate(-13deg); }
.cp-navigation { display:flex; align-items:center; gap:5px; min-width:0; }
.cp-nav-item { display:flex; align-items:center; justify-content:center; gap:7px; min-height:48px; border-radius:999px; padding:10px 13px; background:transparent; font-size:12px; font-weight:650; white-space:nowrap; color:#55584d; }
.cp-nav-number { font-size:10px; font-weight:800; color:#838778; }
.cp-nav-item > svg { display:none; }
.cp-nav-item:hover { background:#efefe6; }
.cp-nav-item.is-active { background:#23261f; color:#fffef9; }
.cp-nav-item.is-active .cp-nav-number { color:var(--cp-lime); }
.cp-nav-progress { font-size:10px; padding:2px 5px; background:#e9eecf; color:#455329; border-radius:6px; }
.cp-nav-item.is-active .cp-nav-progress { background:var(--cp-lime); color:#23261f; }
.cp-context-line { display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px 20px; padding:13px 6px 19px; font-size:11px; font-weight:550; color:#66685d; }
.cp-context-line > span { display:flex; align-items:center; gap:7px; }
.cp-status-dot { width:6px; height:6px; border-radius:50%; background:#6a7e43; }
.cp-main { outline:none; }
.cp-workspace-hero { position:relative; display:grid; align-items:center; gap:32px; margin-bottom:28px; border-radius:30px; padding:42px 48px; background:var(--cp-peach); }
.cp-home-hero { grid-template-columns:1.05fr 1fr; min-height:432px; }
.cp-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:10px; font-weight:800; letter-spacing:.12em; line-height:1.5; }
.cp-small-star { font-size:20px; color:var(--cp-pink); line-height:1; }
.cp-hero-copy h1 { margin:17px 0 20px; font-family:Arial,Helvetica,sans-serif; font-weight:900; font-size:clamp(48px,6.1vw,80px); line-height:.96; letter-spacing:-.065em; }
.cp-hero-copy h1 > span { color:var(--cp-pink); }
.cp-hero-copy > p { max-width:420px; font-size:14px; line-height:1.65; color:#4c4b3f; }
.cp-hero-facts { display:flex; flex-wrap:wrap; gap:10px 22px; margin-top:25px; }
.cp-hero-facts > span { display:flex; align-items:center; gap:6px; font-size:11px; color:#4e4a3e; }
.cp-hero-facts strong { color:#24261f; }
.cp-study-art { position:relative; isolation:isolate; min-height:348px; width:100%; max-width:500px; justify-self:center; pointer-events:none; }
.cp-art-orbit { position:absolute; width:300px; height:300px; border-radius:50%; left:14%; top:32px; background:var(--cp-lime); }
.cp-art-paper { position:absolute; left:18%; top:14px; width:245px; min-height:292px; padding:26px 22px 20px; display:flex; flex-direction:column; gap:12px; background:var(--cp-paper); border:1px solid #e0d5c5; border-radius:4px 17px 17px 4px; transform:rotate(-8deg); box-shadow:9px 15px 0 #3b452215,0 16px 24px #6a4f3521; }
.cp-art-paper::before { content:''; position:absolute; top:0; bottom:0; left:12px; width:1px; background:#e7a7ad; opacity:.6; }
.cp-paper-tag { font-size:7px; font-weight:800; letter-spacing:.15em; color:#7a7d6f; }
.cp-paper-title { font-family:Arial,sans-serif; font-size:26px; line-height:1; font-weight:900; letter-spacing:-.05em; margin-bottom:4px; }
.cp-paper-line { height:2px; width:100%; background:#deded1; }
.cp-paper-line-short { width:67%; }
.cp-paper-highlight { font-size:9px; background:#e7f6af; align-self:flex-start; padding:4px 6px; transform:rotate(-1deg); font-weight:650; }
.cp-paper-check { display:flex; align-items:center; gap:4px; margin-top:3px; font-size:8px; font-weight:650; color:#5c7140; }
.cp-art-pencil { position:absolute; left:72%; top:78px; width:22px; height:215px; border:2px solid #292b25; background:#db75ac; border-radius:6px 6px 0 0; transform:rotate(23deg); box-shadow:6px 5px 0 #28261c12; }
.cp-art-pencil::before { content:''; display:block; position:absolute; bottom:-27px; left:-2px; width:22px; height:28px; background:#24261f; clip-path:polygon(0 0,100% 0,50% 100%); }
.cp-art-pencil::after { content:''; display:block; position:absolute; bottom:-20px; left:1px; width:16px; height:20px; background:#eccc9a; clip-path:polygon(0 0,100% 0,50% 100%); }
.cp-art-pencil > span { position:absolute; inset:25px 6px 0 auto; width:2px; background:#ae437f; }
.cp-art-pencil > i { position:absolute; top:14px; height:12px; width:100%; background:#f5e5ed; border-block:2px solid #292b25; }
.cp-art-sticker { position:absolute; display:flex; align-items:center; gap:9px; left:2%; bottom:6px; padding:14px 18px; font-size:12px; line-height:1.35; color:#593952; background:#ecd6ee; border:1px solid #ccafc7; border-radius:14px; box-shadow:4px 5px 0 #885b7712; transform:rotate(6deg); }
.cp-art-sticker strong { font-weight:800; }
.cp-art-spark { position:absolute; color:var(--cp-pink); }
.cp-spark-one { top:0; right:6%; font-size:73px; line-height:1; transform:rotate(8deg); }
.cp-spark-two { left:0; top:80px; font-size:37px; color:#272b24; }
.cp-art-arrow { position:absolute; width:105px; height:70px; right:0; bottom:0; color:#414e27; transform:rotate(17deg); }
.cp-compact-hero { grid-template-columns:1fr 275px; min-height:240px; padding-block:32px; }
.cp-compact-hero h1 { font-size:clamp(34px,4.2vw,55px); line-height:1; margin-block:13px; }
.cp-compact-hero .cp-hero-copy > p { max-width:600px; }
.cp-app[data-page="plano"] .cp-compact-hero { background:#e1e9ce; }
.cp-app[data-page="plano"] .cp-hero-copy h1 > span { color:#546b32; }
.cp-app[data-page="parafrase"] .cp-compact-hero { background:#eddfeb; }
.cp-app[data-page="folha-ouro"] .cp-compact-hero { background:#efdda4; }
.cp-app[data-page="folha-ouro"] .cp-hero-copy h1 > span { color:#84611f; }
.cp-plan-progress { background:#fffef9b3; padding:22px 25px; border-radius:21px; display:flex; flex-direction:column; gap:9px; }
.cp-plan-progress > strong { font-size:64px; line-height:1; font-weight:850; letter-spacing:-.07em; }
.cp-plan-progress small { font-size:30px; }
.cp-plan-progress > span:last-child { font-size:11px; color:#626854; }
.cp-progress-track { height:6px; background:#d7decb; border-radius:6px; overflow:hidden; }
.cp-progress-track > span { display:block; height:100%; background:#667e38; border-radius:6px; transition:width .2s ease; }
.cp-section-seal { position:relative; width:164px; height:164px; margin:auto; border-radius:50%; background:#fffef9ad; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; transform:rotate(8deg); color:#524047; }
.cp-section-seal > span:not(.cp-seal-star) { font-size:8px; font-weight:800; letter-spacing:.08em; }
.cp-section-seal .cp-seal-star { position:absolute; top:-20px; right:0; font-size:47px; color:#a6447a; }
.cp-focus-banner { padding:24px 28px; background:#e4ebd4; border-radius:24px; margin-bottom:24px; }
.cp-focus-banner h1 { font-size:25px; font-weight:800; letter-spacing:-.04em; margin:6px 0; }
.cp-focus-banner p { font-size:13px; color:#59614d; }
.cp-app .cp-card { border-radius:23px; background:var(--cp-paper); border-color:var(--cp-line); box-shadow:0 2px 0 #252b1603; }
.cp-app .cp-card h2 { font-size:20px; line-height:1.35; }
.cp-app .cp-card h3 { line-height:1.4; }
.cp-main > div, .cp-main section, .cp-main .grid > div { min-width:0; }
.cp-app .bg-slate-50 { background-color:#f5f5ee; }
.cp-app .bg-slate-100 { background-color:#ebede3; }
.cp-app .bg-slate-200 { background-color:#e0e4d6; }
.cp-app .bg-slate-900 { background-color:#272c23; }
.cp-app .bg-slate-800 { background-color:#3a4033; }
.cp-app .border-slate-200 { border-color:#dfe2d5; }
.cp-app .border-slate-300 { border-color:#cfd5c4; }
.cp-app .text-slate-900 { color:#252a21; }
.cp-app .text-slate-800 { color:#343b2d; }
.cp-app .text-slate-700 { color:#46503e; }
.cp-app .text-slate-600 { color:#5d6656; }
.cp-app .text-slate-500 { color:#68705e; }
.cp-app .text-emerald-700 { color:#526832; }
.cp-app .text-emerald-800 { color:#45592d; }
.cp-app .text-emerald-900 { color:#374829; }
.cp-app .text-emerald-950 { color:#2c3b24; }
.cp-app .bg-emerald-50 { background-color:#edf3e1; }
.cp-app .bg-emerald-100 { background-color:#e0edcd; }
.cp-app .border-emerald-200 { border-color:#d1dfba; }
.cp-app .border-emerald-300 { border-color:#bacb9d; }
.cp-app .cp-main button.bg-emerald-700 { background:#2e3724; color:#fffef9; min-height:44px; }
.cp-app .cp-main button.bg-emerald-700:hover { background:#475b30; }
.cp-app .cp-main button.bg-slate-900 { min-height:44px; }
.cp-app .cp-main button.text-xs { min-height:36px; }
.cp-app .cp-control-panel { padding:22px 24px; }
.cp-control-panel > div:first-child { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:end; gap:22px; }
.cp-control-panel > div:first-child > div:first-child > div { flex-direction:column; align-items:flex-start; }
.cp-control-panel select { width:100%; min-width:0; max-width:100%; text-overflow:ellipsis; min-height:44px; background:#f8f7ef; font-size:13px; }
.cp-control-panel .cp-generate-theme { border:0; background:transparent; padding:3px 0; color:#526832; font-weight:750; min-height:32px; font-size:11px; }
.cp-control-panel .cp-generate-theme:hover { color:#a52b6b; background:transparent; text-decoration:underline; text-underline-offset:4px; }
.cp-app .cp-timer { border:0; border-radius:18px; margin:0; padding:15px 17px; gap:12px; min-height:103px; align-self:start; }
.cp-timer > svg { color:var(--cp-lime); width:21px; }
.cp-timer .text-slate-400 { color:#bec8ae; }
.cp-timer .text-2xl { font-size:27px; }
.cp-timer button.bg-emerald-500 { background:var(--cp-lime); }
.cp-timer button.bg-emerald-500:hover { background:#cdeb62; }
.cp-control-panel > div:last-child:not(:first-child) { font-size:10px; gap:10px; flex-wrap:wrap; border:0; background:#f0f4e5; color:#506133; margin-top:14px; }
.cp-app .cp-proposal-heading { background:#e6edda; color:#3b4b28; gap:12px; align-items:flex-start; }
.cp-proposal-heading > span { color:#45562e; }
.cp-proposal-heading > span:last-child { background:#f6f8ec; color:#5d6a4a; font-size:10px; white-space:nowrap; }
.cp-app .text-justify { text-align:left; }
.cp-app p.leading-relaxed { line-height:1.8; }
.cp-editor-title { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:19px 22px; border-bottom:1px solid #e0e4d6; }
.cp-editor-title > span:first-child { display:flex; align-items:center; gap:9px; font-weight:800; font-size:16px; letter-spacing:-.035em; }
.cp-mini-label { font-size:8px; letter-spacing:.1em; font-weight:750; color:#60694e; }
.cp-app .cp-essay-input { border-color:#e1e4d6; border-radius:16px; line-height:1.9; font-family:Georgia,"Times New Roman",serif; min-height:410px; padding:20px; background-color:#fffffd; }
.cp-app .cp-essay-input::placeholder { font-size:14px; color:#888e7e; line-height:1.85; }
.cp-app .cp-correct-button { background:var(--cp-lime); color:#28301d; box-shadow:none; border:1px solid #c9df72; font-size:12px; padding-inline:20px; }
.cp-app .cp-correct-button svg { color:#52612d; }
.cp-app .cp-correct-button:hover { background:#cce853; box-shadow:0 3px 0 #69754123; }
.cp-editor-card .pt-2.flex { flex-wrap:wrap; }
.cp-editor-card .pt-2.flex > div { flex:1 1 160px; }
.cp-professor-hero { display:grid; grid-template-columns:1.1fr 1fr; gap:30px; padding:40px 42px; background:#eddbe7; border-radius:30px; }
.cp-professor-intro h1 { font-family:Arial,Helvetica,sans-serif; font-size:clamp(36px,4.6vw,62px); line-height:1.01; letter-spacing:-.065em; font-weight:900; margin:21px 0 18px; }
.cp-professor-intro h1 > span { color:#a92e6d; }
.cp-professor-intro > p { max-width:360px; color:#685060; font-size:14px; line-height:1.7; }
.cp-teacher-sign { display:flex; align-items:center; gap:12px; margin-top:24px; font-size:11px; color:#6a5261; line-height:1.5; }
.cp-teacher-avatar { display:grid; place-items:center; width:45px; height:45px; background:#f8f2ed; border:1px solid #dbc6d3; border-radius:50%; color:#a02f69; transform:rotate(-10deg); }
.cp-teacher-action-card { position:relative; background:#fffef9; border:1px solid #e2cfda; border-radius:22px; padding:27px 28px; align-self:center; }
.cp-teacher-action-card > h2 { font-size:24px; line-height:1.1; font-weight:800; margin:10px 0 20px; letter-spacing:-.045em; }
.cp-action-star { position:absolute; right:25px; top:20px; font-size:51px; line-height:1; color:#bd6397; transform:rotate(12deg); pointer-events:none; }
.cp-teacher-action-card > .cp-eyebrow { font-size:8px; max-width:calc(100% - 50px); color:#777464; }
.cp-professor-actions { display:flex; flex-direction:column; }
.cp-app .cp-button { display:flex; align-items:center; justify-content:center; gap:8px; min-height:48px; padding:13px 17px; font-size:12px; font-weight:750; line-height:1.4; border:1px solid transparent; }
.cp-app .cp-button-dark { background:#272c23; color:#fffef9; }
.cp-app .cp-button-dark:hover { background:#404c32; }
.cp-app .cp-button-lime { background:var(--cp-lime); border-color:#cbe37b; color:#303b22; }
.cp-app .cp-button-lime:hover { background:#cce853; }
.cp-teacher-action-card > p { font-size:10px; color:#646553; line-height:1.6; margin-top:12px; }
.cp-teacher-error { grid-column:1/-1; }
.cp-current-theme { display:flex; align-items:center; gap:15px; border-block:1px solid #dcdfd2; padding:19px 4px; }
.cp-current-theme-icon { width:39px; height:39px; border-radius:12px; display:grid; place-items:center; flex-shrink:0; background:#e6edda; color:#5a6d3d; }
.cp-current-theme p { font-weight:650; font-size:14px; line-height:1.6; flex:1; }
.cp-current-theme .cp-mini-label { width:90px; text-align:right; line-height:1.8; flex-shrink:0; }
.cp-save-note { font-size:11px; color:#626b55; margin-top:12px !important; }
.cp-app #etapa-1-planejamento, .cp-app #etapa-3-fontes { padding:26px; }
.cp-app #professor-texto-base { background:#f6f6ed; border-color:#e4e5d7; border-radius:16px; padding:20px; }
.cp-app #professor-texto-base h4 { font-size:12px; letter-spacing:.03em; }
.cp-app #professor-texto-base p { font-size:14px; }
.cp-app #professor-situacao-problema { background:#f4ebcc; border-color:#e6dba8; color:#625327; padding:18px; line-height:1.8; border-radius:16px; }
.cp-app .cp-source-card { background:#f7f7ef; border:1px solid #e3e6d7; border-radius:16px; padding:17px; }
.cp-source-purpose { display:inline-flex; border-radius:999px; font-size:9px; font-weight:750; padding:4px 8px; margin-bottom:10px; background:#e3eccf; color:#536b32; }
.cp-source-card:nth-child(2) .cp-source-purpose { background:#f3e4c0; color:#7b612c; }
.cp-source-card:nth-child(3) .cp-source-purpose { background:#ebdfeb; color:#7d4c74; }
.cp-source-card a { line-height:1.55; text-decoration-color:#b6c295; text-underline-offset:4px; }
.cp-source-card p { line-height:1.7; margin-top:8px; }
.cp-app .cp-gold-intro { background:#f7f0d9; border-color:#e3d7ac; box-shadow:none; border-radius:23px; }
.cp-app .cp-exam-protocol { background:#2b3025; border-radius:24px; }
.cp-exam-protocol > h3 { color:#e5edb6; }
.cp-exam-protocol .grid > div { background:#363e2d; border-color:#505b41; border-radius:16px; }
.cp-exam-protocol .text-emerald-400 { color:#cce58c; }
.cp-exam-protocol .text-slate-300 { color:#c6cebb; }
.cp-footer { display:flex; justify-content:space-between; align-items:center; gap:20px; margin-top:48px; padding:24px 4px 30px; border-top:1px solid #daddcf; color:#626757; font-size:10px; }
.cp-footer-brand { font-size:21px; font-weight:500; letter-spacing:-1.3px; color:#484d3e; }
.cp-footer-brand strong { font-weight:850; }
.cp-footer > span:last-child { display:flex; align-items:center; gap:8px; }
@media (min-width:1100px) {
  .cp-professor-hero + .cp-current-theme ~ .grid { grid-template-columns:1.07fr 1fr; }
}
@media (max-width:1150px) {
  .cp-header,.cp-main,.cp-footer { width:calc(100% - 40px); }
  .cp-topbar { gap:14px; padding:18px; }
  .cp-nav-item { padding:10px; gap:5px; font-size:11px; }
  .cp-nav-progress { display:none; }
  .cp-home-hero { padding:32px; min-height:405px; }
  .cp-study-art { transform:scale(.88); transform-origin:center; }
  .cp-home-hero .cp-hero-copy h1 { font-size:68px; }
  .cp-control-panel > div:first-child { gap:16px; }
  .cp-app .cp-timer { padding:12px; }
  .cp-professor-hero { padding:32px; gap:24px; }
}
@media (max-width:900px) {
  .cp-topbar { flex-direction:column; align-items:stretch; gap:15px; padding:18px; }
  .cp-brand { align-self:center; font-size:24px; }
  .cp-brand-symbol { width:40px; height:40px; }
  .cp-navigation { justify-content:space-between; }
  .cp-nav-item { flex:1; min-width:0; }
  .cp-context-line { padding-bottom:15px; }
  .cp-home-hero { grid-template-columns:1fr .85fr; gap:0; }
  .cp-home-hero .cp-hero-copy h1 { font-size:58px; }
  .cp-study-art { transform:scale(.78); width:380px; justify-self:center; }
  .cp-home-hero { overflow:hidden; }
  .cp-hero-copy { position:relative; z-index:2; min-width:0; }
  .cp-hero-copy > p { font-size:13px; }
  .cp-compact-hero { grid-template-columns:1fr 210px; padding:28px; }
  .cp-plan-progress { padding:20px; }
  .cp-professor-hero { grid-template-columns:1fr 1fr; gap:22px; padding:28px; }
  .cp-professor-intro h1 { font-size:41px; }
  .cp-teacher-action-card { padding:22px 20px; }
  .cp-app .cp-button { font-size:11px; padding-inline:12px; }
}
@media (max-width:680px) {
  .cp-app { padding-top:12px; }
  .cp-header,.cp-main,.cp-footer { width:calc(100% - 28px); }
  .cp-topbar { gap:15px; border-radius:19px; padding:17px 12px 12px; }
  .cp-brand { flex-direction:row; font-size:24px; line-height:1; gap:9px; }
  .cp-brand-bottom { display:inline; }
  .cp-brand-symbol { width:34px; height:34px; }
  .cp-brand-symbol > svg { width:19px; }
  .cp-navigation { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; }
  .cp-nav-item { border-radius:12px; padding:9px 5px; min-height:43px; gap:5px; font-size:10px; background:#f2f3e9; }
  .cp-nav-item:nth-child(5) { grid-column:2/4; }
  .cp-nav-number { font-size:8px; }
  .cp-nav-item:nth-child(5) > svg { display:block; }
  .cp-context-line { font-size:9px; padding:12px 2px 15px; gap:5px; }
  .cp-context-line > span:last-child { display:none; }
  .cp-workspace-hero { padding:28px 24px; border-radius:23px; margin-bottom:20px; }
  .cp-home-hero { grid-template-columns:minmax(0,1fr); gap:9px; min-height:0; }
  .cp-eyebrow { font-size:8px; letter-spacing:.1em; }
  .cp-small-star { font-size:16px; }
  .cp-home-hero .cp-hero-copy h1 { font-size:clamp(49px,13vw,72px); margin:18px 0; }
  .cp-hero-copy > p { max-width:400px; font-size:13px; }
  .cp-hero-facts { margin-top:19px; gap:10px 17px; }
  .cp-hero-facts > span { font-size:10px; }
  .cp-study-art { display:none; }
  .cp-compact-hero { grid-template-columns:1fr; gap:22px; }
  .cp-compact-hero h1 { font-size:38px; margin:15px 0; }
  .cp-plan-progress { width:100%; gap:8px; }
  .cp-plan-progress > strong { font-size:48px; }
  .cp-section-seal { display:none; }
  .cp-app .cp-control-panel { padding:18px; }
  .cp-control-panel > div:first-child { grid-template-columns:1fr; gap:15px; }
  .cp-control-panel > div:first-child > div:first-child > label { font-size:9px; }
  .cp-control-panel select { font-size:12px; }
  .cp-control-panel .cp-generate-theme { min-height:40px; }
  .cp-app .cp-timer { width:100%; min-height:0; padding:14px 16px; justify-content:space-between; }
  .cp-app .cp-timer > svg { display:none; }
  .cp-control-panel > div:last-child:not(:first-child) { line-height:1.7; }
  .cp-app .cp-card { border-radius:20px; }
  .cp-app .cp-card h2 { font-size:18px; }
  .cp-proposal-heading { flex-direction:column; gap:8px; }
  .cp-proposal-heading > span:first-child { font-size:10px; line-height:1.6; }
  .cp-editor-title { padding:17px; }
  .cp-editor-title > span:first-child { font-size:15px; }
  .cp-editor-title .cp-mini-label { display:none; }
  .cp-app .cp-essay-input { min-height:400px; padding:16px; }
  .cp-main input:not([type="checkbox"]), .cp-main textarea, .cp-main select { font-size:16px; }
  .cp-main input::placeholder, .cp-main textarea::placeholder { font-size:13px; }
  .cp-app .cp-correct-button { width:100%; min-height:48px; }
  .cp-professor-hero { grid-template-columns:1fr; padding:28px 22px; border-radius:23px; gap:24px; }
  .cp-professor-intro h1 { font-size:clamp(37px,10.3vw,55px); margin:18px 0; }
  .cp-professor-intro > p { font-size:13px; }
  .cp-teacher-sign { margin-top:18px; }
  .cp-teacher-action-card { padding:24px 19px; border-radius:18px; }
  .cp-app .cp-button { font-size:12px; min-height:49px; padding-inline:14px; }
  .cp-action-star { font-size:42px; right:20px; }
  .cp-current-theme { align-items:flex-start; gap:11px; padding:16px 0; }
  .cp-current-theme p { font-size:12px; }
  .cp-current-theme .cp-mini-label { display:none; }
  .cp-save-note { line-height:1.7; font-size:10px; }
  .cp-app #etapa-1-planejamento, .cp-app #etapa-3-fontes { padding:20px; }
  .cp-app #professor-texto-base { padding:16px; }
  .cp-app #professor-texto-base p { font-size:14px; }
  .cp-app #professor-situacao-problema { padding:16px; font-size:13px; }
  .cp-app .cp-source-card { padding:16px; }
  .cp-footer { flex-wrap:wrap; gap:13px; margin-top:32px; padding-top:22px; }
  .cp-footer > span:last-child { width:100%; font-size:9px; }
  .cp-footer > span:nth-child(2) { max-width:180px; font-size:9px; text-align:right; }
}
@media (prefers-reduced-motion:reduce) {
  .cp-app *, .cp-app *::before, .cp-app *::after { animation:none !important; transition:none !important; scroll-behavior:auto !important; }
}
@media print {
  .cp-app { background:white; }
  .cp-header, .cp-footer, .cp-workspace-hero, .cp-professor-actions { display:none; }
  .cp-main { width:100%; }
  .cp-app .cp-card { box-shadow:none; break-inside:avoid; }
}
`;
