export interface StepInfo {
  id: number;
  shortLabel: string;
  title: string;
}

export const CAMPAIGN_STEPS: StepInfo[] = [
  { id: 1, shortLabel: 'Accueil', title: 'Accueil' },
  { id: 2, shortLabel: 'Comprendre', title: "Comprendre l'automatisation" },
  { id: 3, shortLabel: 'Démonstration', title: 'Démonstration interactive' },
  { id: 4, shortLabel: 'Avant / Après', title: 'Avant et après' },
  { id: 5, shortLabel: 'Mon expérience', title: "Ce que l'automatisation m'a apporté" },
  { id: 6, shortLabel: 'Limites & risques', title: 'Les limites et les risques' },
  { id: 7, shortLabel: 'Mini-quiz', title: 'Mini-quiz' },
  { id: 8, shortLabel: 'Votre avis', title: 'Participation du public' },
  { id: 9, shortLabel: 'Conclusion', title: 'Conclusion' },
];

export interface AutomationExample {
  id: string;
  title: string;
  summary: string;
  trigger: string;
  classicalAction: string;
  aiAction: string;
}

export const AUTOMATION_EXAMPLES: AutomationExample[] = [
  {
    id: 'organize',
    title: 'Organiser des informations',
    summary: 'Classer automatiquement des données reçues au bon endroit sans recopie manuelle.',
    trigger: 'Un formulaire d’inscription ou de contact est envoyé.',
    classicalAction: 'Les champs (nom, date, filière) sont ajoutés directement dans un tableau de suivi.',
    aiAction: "L'IA peut extraire les points clés d'un texte libre pour remplir les bonnes colonnes.",
  },
  {
    id: 'triage',
    title: 'Trier ou catégoriser des demandes',
    summary: 'Orienter chaque message vers le bon dossier ou le bon interlocuteur.',
    trigger: "Réception d'un e-mail dans une boîte partagée.",
    classicalAction: 'Si l’objet contient « Facture », le message va dans le dossier Comptabilité.',
    aiAction: "L'IA comprend l'intention d'un message même s'il n'utilise pas de mot-clé exact.",
  },
  {
    id: 'drafts',
    title: 'Préparer des brouillons',
    summary: 'Générer une première base de réponse ou de message à relire avant envoi.',
    trigger: 'Une question fréquente arrive par écrit.',
    classicalAction: 'Insertion d’un modèle de texte fixe avec le prénom du destinataire.',
    aiAction: "L'IA rédige un brouillon adapté à la question posée, prêt à être vérifié par un humain.",
  },
  {
    id: 'summarize',
    title: 'Résumer des documents',
    summary: 'Dégager rapidement l’essentiel d’un compte rendu ou d’un long dossier.',
    trigger: 'Un document ou un long échange est déposé dans un dossier dédié.',
    classicalAction: 'Notification envoyée aux personnes concernées pour signaler le nouveau fichier.',
    aiAction: "L'IA propose une synthèse structurée en quelques points clés pour faciliter la lecture.",
  },
  {
    id: 'repetitive',
    title: 'Automatiser certaines tâches répétitives',
    summary: 'Enchaîner plusieurs petites actions simples sans intervention entre chaque étape.',
    trigger: 'Une date limite approche ou un statut passe à « Validé ».',
    classicalAction: 'Création d’un rappel dans l’agenda et envoi d’une notification interne.',
    aiAction: "L'IA peut adapter le message de rappel selon le contexte du dossier.",
  },
];

export interface SimulationStep {
  stepNumber: number;
  title: string;
  actor: 'Déclencheur' | 'Système' | 'Intelligence artificielle' | 'Automatisation' | 'Humain';
  shortDescription: string;
  detailedExplanation: string;
  sampleTitle: string;
  sampleContent: string;
  keyTakeaway: string;
}

export const SIMULATION_STEPS: SimulationStep[] = [
  {
    stepNumber: 1,
    title: "Réception d'un e-mail",
    actor: 'Déclencheur',
    shortDescription: 'Un visiteur ou futur apprenant envoie une demande d’information.',
    detailedExplanation:
      "Tout commence par un événement concret : un message arrive dans la boîte de réception. À ce stade, aucune action automatique n'a encore eu lieu.",
    sampleTitle: 'Boîte de réception · Nouveau message reçu',
    sampleContent:
      'Objet : Renseignements parcours numérique — « Bonjour, je souhaite connaître les prochaines dates de réunion d’information à BF Tremplin ainsi que les pièces à prévoir pour mon dossier. Merci d’avance. »',
    keyTakeaway: "C'est le point de départ (le déclencheur) du workflow.",
  },
  {
    stepNumber: 2,
    title: 'Détection du nouvel e-mail par le système',
    actor: 'Système',
    shortDescription: "L'outil d'automatisation repère l'arrivée du message selon une règle simple.",
    detailedExplanation:
      "Le système surveille la boîte de réception selon les règles définies (automatisation classique). Dès qu'un message répond aux critères prévus, il lance la suite du scénario.",
    sampleTitle: 'Règle de déclenchement activée',
    sampleContent:
      'Condition vérifiée : nouveau message entrant dans le dossier « Demandes d’information » · Transfert sécurisé du texte vers l’étape d’analyse.',
    keyTakeaway: 'Ici, il n’y a pas d’IA : ce sont des règles logiques exactes (« Si… alors… »).',
  },
  {
    stepNumber: 3,
    title: "Analyse et résumé du message par l'IA",
    actor: 'Intelligence artificielle',
    shortDescription: "L'IA identifie le sujet de la demande et en fait un résumé clair.",
    detailedExplanation:
      "L'intelligence artificielle lit le texte du message pour en extraire l'intention principale et les informations utiles, afin d'éviter une lecture longue ou un tri manuel fastidieux.",
    sampleTitle: 'Synthèse générée par l’IA (à vérifier)',
    sampleContent:
      'Thème détecté : Admission / Réunion d’information · Besoins exprimés : 1) Dates de réunion BF Tremplin, 2) Liste des pièces justificatives.',
    keyTakeaway: "L'IA aide à comprendre et structurer l'information, mais peut se tromper sur une nuance.",
  },
  {
    stepNumber: 4,
    title: "Préparation d'une réponse proposée",
    actor: 'Automatisation',
    shortDescription: 'Un brouillon de réponse est rédigé et enregistré sans être envoyé.',
    detailedExplanation:
      "À partir des informations de référence fournies par le centre, l'outil prépare un brouillon structuré dans la boîte mail. Le message reste en attente : rien ne part automatiquement.",
    sampleTitle: 'Brouillon en attente de validation',
    sampleContent:
      '« Bonjour, merci pour votre intérêt pour BF Tremplin. Nos réunions d’information ont lieu chaque mardi matin. Pour votre dossier, merci de prévoir une pièce d’identité et votre CV à jour… »',
    keyTakeaway: 'Le brouillon fait gagner en clarté et en préparation, tout en gardant un verrou de sécurité.',
  },
  {
    stepNumber: 5,
    title: 'Validation par un humain',
    actor: 'Humain',
    shortDescription: 'La personne responsable relit, ajuste si besoin et décide d’envoyer.',
    detailedExplanation:
      "C'est l'étape indispensable : l'humain vérifie l'exactitude des dates, le ton du message et l'absence d'erreur avant de cliquer sur Envoyer. La responsabilité reste humaine.",
    sampleTitle: 'Contrôle humain requis avant envoi',
    sampleContent:
      'Vérification : les dates du mardi sont-elles maintenues cette semaine ? Le ton est-il adapté à la situation de la personne ? Décision finale : approuver ou modifier.',
    keyTakeaway: "L'automatisation assiste le travail ; l'humain garde le contrôle et la décision.",
  },
];

export const BEFORE_ITEMS: string[] = [
  'Lire chaque demande manuellement.',
  'Identifier les informations utiles.',
  'Organiser les informations.',
  'Préparer une réponse.',
];

export const AFTER_ITEMS: string[] = [
  'Le workflow aide à traiter les étapes répétitives.',
  "L'IA aide à résumer ou à préparer un brouillon.",
  'L’humain vérifie et décide.',
];

export interface JournalFieldConfig {
  key: keyof ExperienceJournalData;
  label: string;
  helper: string;
  placeholder: string;
  multiline: boolean;
}

export interface ExperienceJournalData {
  discovered: string;
  automationTaught: string;
  simplifiedTasks: string;
  usefulPoints: string;
  discoveredLimits: string;
  problem: string;
  tool: string;
  automated: string;
  learned: string;
  benefit: string;
  manualCheck: string;
}

export const INITIAL_JOURNAL_DATA: ExperienceJournalData = {
  discovered: '',
  automationTaught: '',
  simplifiedTasks: '',
  usefulPoints: '',
  discoveredLimits: '',
  problem: '',
  tool: '',
  automated: '',
  learned: '',
  benefit: '',
  manualCheck: '',
};

export const REFLECTION_JOURNAL_FIELDS: JournalFieldConfig[] = [
  {
    key: 'discovered',
    label: 'Ce que j’ai découvert pendant ma formation',
    helper: 'Notions, principes ou outils découverts durant votre parcours.',
    placeholder: 'Zone à remplir : ex. ce qui était nouveau pour moi au début de la formation…',
    multiline: true,
  },
  {
    key: 'automationTaught',
    label: "Ce que l'automatisation m'a appris",
    helper: 'Nouvelle façon d’aborder une tâche ou un problème.',
    placeholder: 'Zone à remplir : ex. décomposer un processus étape par étape…',
    multiline: true,
  },
  {
    key: 'simplifiedTasks',
    label: 'Les tâches que j’ai appris à simplifier',
    helper: 'Exemples d’opérations répétitives rendues plus fluides.',
    placeholder: 'Zone à remplir : ex. classement, préparation de texte, suivi…',
    multiline: true,
  },
  {
    key: 'usefulPoints',
    label: 'Ce qui m’a été utile',
    helper: 'Ce qui vous aide concrètement aujourd’hui ou pour la suite.',
    placeholder: 'Zone à remplir : ex. une méthode de travail, un déclencheur simple…',
    multiline: true,
  },
  {
    key: 'discoveredLimits',
    label: 'Les limites que j’ai découvertes',
    helper: 'Points de vigilance ou tâches qu’il vaut mieux garder manuelles.',
    placeholder: 'Zone à remplir : ex. nécessité de relire, confidentialité des données…',
    multiline: true,
  },
];

export const JOURNAL_FIELDS: JournalFieldConfig[] = [
  {
    key: 'problem',
    label: 'Le problème ou la tâche répétitive rencontrée',
    helper: 'Décrivez la situation de départ sans jargon technique.',
    placeholder: 'Zone à remplir : ex. la tâche qui demandait beaucoup de manipulations manuelles…',
    multiline: true,
  },
  {
    key: 'tool',
    label: "L'outil que j'ai utilisé",
    helper: "Nom de l'outil ou du type de solution testé en formation.",
    placeholder: "Zone à remplir : ex. l'outil ou la plateforme utilisée…",
    multiline: false,
  },
  {
    key: 'automated',
    label: "Ce que j'ai automatisé",
    helper: 'Les étapes précises confiées au workflow.',
    placeholder: 'Zone à remplir : ex. le déclencheur et les actions enchaînées…',
    multiline: true,
  },
  {
    key: 'learned',
    label: "Ce que j'ai appris",
    helper: 'Compétence technique, logique ou méthodologique acquise.',
    placeholder: 'Zone à remplir : ex. comment structurer une règle claire ou formuler une consigne…',
    multiline: true,
  },
  {
    key: 'benefit',
    label: "Ce que cela m'a apporté",
    helper: 'Ressenti concret sur votre organisation ou votre confort de travail.',
    placeholder: 'Zone à remplir : ex. plus de sérénité, moins d’oublis, meilleur suivi…',
    multiline: true,
  },
  {
    key: 'manualCheck',
    label: 'Ce que je dois encore vérifier ou faire manuellement',
    helper: 'La part qui reste sous votre responsabilité directe.',
    placeholder: 'Zone à remplir : ex. relire les réponses, vérifier les données sensibles…',
    multiline: true,
  },
];

export interface SectionDiscoveryItem {
  step: number;
  title: string;
  description: string;
}

export const SECTION_DISCOVERY_ITEMS: SectionDiscoveryItem[] = [
  {
    step: 2,
    title: "Comprendre l'automatisation",
    description: "Différence entre règles classiques et aide de l'IA avec des exemples concrets.",
  },
  {
    step: 3,
    title: 'Démonstration',
    description: 'Simulation visuelle étape par étape du traitement d’un e-mail fictif.',
  },
  {
    step: 4,
    title: 'Avant et après',
    description: 'Comparaison claire entre travail manuel et workflow avec contrôle humain.',
  },
  {
    step: 5,
    title: 'Mon expérience',
    description: 'Espace modifiable pour partager mon vécu réel de formation à BF Tremplin.',
  },
  {
    step: 6,
    title: 'Avantages et limites',
    description: 'Les 6 points de vigilance essentiels : erreurs, biais, confidentialité et contrôle.',
  },
  {
    step: 7,
    title: 'Quiz',
    description: '5 questions interactives avec explications immédiates et score final.',
  },
  {
    step: 8,
    title: 'Participation du public',
    description: 'Choisissez la tâche que vous aimeriez simplifier, sans aucune collecte de données.',
  },
  {
    step: 9,
    title: 'Conclusion',
    description: 'Le message clé à retenir et votre récapitulatif de parcours.',
  },
];

export interface RiskItem {
  id: string;
  title: string;
  riskDescription: string;
  goodPractice: string;
}

export const RISK_ITEMS: RiskItem[] = [
  {
    id: 'errors',
    title: 'Les erreurs produites par l’IA',
    riskDescription:
      "Une IA peut inventer une information, mal interpréter une demande ambiguë ou formuler une réponse inexacte avec un ton très assuré.",
    goodPractice: 'Toujours relire les faits, les dates et les chiffres avant toute utilisation.',
  },
  {
    id: 'bias',
    title: 'Les biais',
    riskDescription:
      "Les modèles reproduisent parfois des préjugés ou des raccourcis présents dans les données sur lesquelles ils ont été entraînés.",
    goodPractice: "Garder un regard critique et veiller à l'équité envers chaque personne.",
  },
  {
    id: 'confidentiality',
    title: 'La confidentialité des données',
    riskDescription:
      "Ce qui est saisi dans certains outils en ligne peut être conservé, analysé ou réutilisé si l'outil n'est pas encadré.",
    goodPractice: 'Utiliser uniquement des outils validés par sa structure et connaître leurs règles.',
  },
  {
    id: 'personal-data',
    title: 'Les données personnelles et les informations sensibles',
    riskDescription:
      "Noms, coordonnées, numéros de dossier, données de santé ou mots de passe ne doivent pas circuler sans précaution.",
    goodPractice: 'Anonymiser les exemples et ne jamais copier-coller de données sensibles dans un outil non autorisé.',
  },
  {
    id: 'dependency',
    title: 'La dépendance aux outils',
    riskDescription:
      'Si un service change de tarif, tombe en panne ou modifie ses règles, une organisation trop dépendante peut se retrouver bloquée.',
    goodPractice: 'Conserver une compréhension claire du processus pour savoir agir même sans l’outil.',
  },
  {
    id: 'human-control',
    title: 'Le besoin de contrôle et de validation humaine',
    riskDescription:
      'Laisser une automatisation agir sans supervision augmente le risque d’erreurs répétées à grande échelle.',
    goodPractice: "Placer un point de contrôle humain avant toute décision ou envoi important.",
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "L'automatisation nécessite-t-elle toujours de l'intelligence artificielle ?",
    options: ['Oui', 'Non'],
    correctAnswer: 'Non',
    explanation:
      "De nombreuses automatisations reposent uniquement sur des règles logiques simples (« si tel événement arrive, alors effectuer telle action »), sans aucune IA.",
  },
  {
    id: 2,
    question: "L'IA peut-elle produire des erreurs ?",
    options: ['Oui', 'Non'],
    correctAnswer: 'Oui',
    explanation:
      "Oui. L'IA fonctionne par probabilités et peut mal comprendre un contexte ou générer des informations inexactes.",
  },
  {
    id: 3,
    question: 'Peut-on automatiser certaines tâches répétitives ?',
    options: ['Oui', 'Non'],
    correctAnswer: 'Oui',
    explanation:
      "Oui, c'est même l'un des principaux usages utiles : trier, classer, notifier ou préparer des éléments récurrents.",
  },
  {
    id: 4,
    question: "Est-il prudent de partager des données confidentielles dans un outil d'IA non autorisé ?",
    options: ['Oui', 'Non'],
    correctAnswer: 'Non',
    explanation:
      "Non. Les données personnelles ou confidentielles doivent être protégées et ne jamais être envoyées vers des outils non approuvés.",
  },
  {
    id: 5,
    question: 'Qui doit vérifier une réponse préparée par une IA dans un contexte professionnel ?',
    options: [
      "Personne, l'IA l'envoie directement",
      "L'utilisateur ou la personne responsable doit la vérifier",
      'Uniquement le destinataire final',
    ],
    correctAnswer: "L'utilisateur ou la personne responsable doit la vérifier",
    explanation:
      "L'IA prépare une proposition, mais seule la personne responsable garantit la justesse, le respect des règles et la qualité de la réponse.",
  },
];

export interface ParticipationOption {
  id: string;
  label: string;
  reflectionTip: string;
  approachType: string;
}

export const PARTICIPATION_OPTIONS: ParticipationOption[] = [
  {
    id: 'emails',
    label: 'Organiser mes e-mails',
    approachType: 'Règles de tri + brouillon assisté',
    reflectionTip:
      'Vous pouvez commencer par de simples filtres de classement par sujet, puis utiliser un brouillon préparé à relire avant envoi.',
  },
  {
    id: 'summarize',
    label: 'Résumer des documents',
    approachType: 'Synthèse assistée par IA + vérification',
    reflectionTip:
      'Utile pour obtenir un premier aperçu d’un long support, à condition de toujours vérifier les points importants sur le document original.',
  },
  {
    id: 'reports',
    label: 'Préparer des comptes rendus',
    approachType: 'Structuration de notes + relecture humaine',
    reflectionTip:
      'Un outil peut organiser vos notes brutes par thèmes et actions à mener, mais vous validez le sens final et les engagements pris.',
  },
  {
    id: 'tasks',
    label: 'Organiser des tâches',
    approachType: 'Automatisation classique par déclencheurs',
    reflectionTip:
      'Pas forcément besoin d’IA : des rappels automatiques ou la création d’une tâche dès qu’un formulaire est rempli suffisent souvent.',
  },
  {
    id: 'other',
    label: 'Autre',
    approachType: 'Analyse du besoin avant choix d’outil',
    reflectionTip:
      'Posez-vous trois questions : la tâche est-elle répétitive ? Quelles données sont en jeu ? Qui garde le contrôle final ?',
  },
];
