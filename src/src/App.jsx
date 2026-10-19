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
