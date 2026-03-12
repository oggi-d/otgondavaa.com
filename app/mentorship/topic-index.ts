/**
 * Topic index: sections → main topic groups → detailed sub-topics.
 * Intro shows only main groups; detail pages show full nested list.
 */

export interface IndexTopic {
  name: string;
  problem: string;
}

export interface IndexTopicGroup {
  /** Stable unique id for anchors/keys/analytics. */
  id: string;
  /** Main topic name (shown on intro and as heading in detail). */
  name: string;
  /** Optional short problem statement for the group. */
  problem?: string;
  /** Detailed sub-topics (shown only on detail view). */
  topics: IndexTopic[];
}

export interface IndexSection {
  /** Stable unique id for anchors/keys/analytics. */
  id: string;
  section: string;
  /** Optional description for the section (shown under the section title). */
  description?: string;
  groups: IndexTopicGroup[];
}

export function getSectionById(id: string): IndexSection {
  const section = topicIndexSections.find((s) => s.id === id);
  if (!section) {
    throw new Error(`Section with id ${id} not found`);
  }
  return section;
}

export const topicIndexSections: IndexSection[] = [
  {
    id: "mindset-ai-foundation",
    section: "Mindset & AI Foundation",
    description: "AI/LLM-ийн суурь ойлголт, промт, хамтын ажиллагааны mindset.",
    groups: [
      {
        id: "mindset-ai-foundation--ai-llm-what-is",
        name: "AI/LLM гэж юу вэ?",
        problem: "LLM-ийн дотоод бүтээгдэхүүн, хэрхэн ажилладаг вэ?",
        topics: [
          {
            name: "Ерөнхий ойлголт",
            problem: "Түүх, үндэс, ажиллах зарчим, анхаарал",
          },
          {
            name: "Сургалтын дата ба чанар",
            problem:
              "Хэн, хэзээ, хэрхэн дата цуглуулсан бэ? Яаж чанарыг нь хэмждэг вэ?",
          },
          {
            name: "Англи бус хэлүүдийн ба моделуудын уялдаа",
            problem: "Монгол хэл үү? Англи бус хэлүү? Өртөг ба контекст",
          },
          {
            name: "Hallucinations буюу хий юм харах",
            problem: "Яагаад тохиолддог вэ? Хэрхэн хамгаалах вэ?",
          },
          {
            name: "Моделуудын ялгаа",
            problem: "Хэзээ ямар моделийг ашиглах вэ? хурд, чадвар, өртөг",
          },
        ],
      },
      {
        id: "mindset-ai-foundation--prompt-engineering",
        name: "Промт гэж юу вэ? & Промт инженерчлэл",
        problem: "One-shot vs few-shot, context windows, system prompts.",
        topics: [
          {
            name: "Промт яагаад хамгийн чухал вэ?",
            problem: "Чанартай үр дүнд хөтлөх хамгийн чухал зүйл.",
          },
        ],
      },
      {
        id: "mindset-ai-foundation--working-with-ai",
        name: "AI-тай хамт ажиллах",
        problem: "Айдасаа өөрчлөх замаар давуу тал үүсгэх.",
        topics: [
          {
            name: "AI as a pair programmer, not a replacement",
            problem: "Reframing fear into leverage.",
          },
          {
            name: 'The "trust but verify" mental model',
            problem:
              "Why AI output always needs a human review gate, especially in fintech.",
          },
          {
            name: "The 10x leverage mindset",
            problem:
              "What changes when AI handles boilerplate and you focus on architecture.",
          },
          {
            name: "Cursor cloud agent with recording",
            problem:
              "Using Cursor's cloud agent and session recording for review.",
          },
        ],
      },
      {
        id: "mindset-ai-foundation--tools-rag-finetune-cursor",
        name: "AI-ийг хөгжүүлэх",
        problem: "Өөрийн датагаар LLM-ийг цэнэглэх.",
        topics: [
          {
            name: "RAG",
            problem:
              "Retrieval-augmented generation; grounding LLMs with your data.",
          },
          {
            name: "Fine-tuning",
            problem:
              "When to fine-tune vs prompt; custom models for your domain.",
          },
          {
            name: "About AI wrapper products",
            problem:
              "Thin wrappers around LLMs; defensibility and when they make sense.",
          },
        ],
      },
      {
        id: "mindset-ai-foundation--sdd-vibe-coding",
        name: "SDD & Vibe Coding",
        problem: "Specification-driven development; specs as source of truth.",
        topics: [
          {
            name: "Speckit",
            problem: "Speckit for tooling and structured requirements.",
          },
          {
            name: "Augment intent",
            problem:
              "Augment intent for clarifying and refining user intent before calling the model.",
          },
          {
            name: "What happened to vibe coder PMs",
            problem:
              "Shift from vibe-based to specification-driven product work.",
          },
          {
            name: "Cursor Plan Mode",
            problem: "Хэзээ ашиглах вэ? Хэрхэн ажилладаг вэ?",
          },
        ],
      },
    ],
  },
  {
    id: "developer-tooling-upgrades",
    section: "Developer Tooling Upgrades",
    description: "Хөгжүүлэгчийн хэрэгсэл, workflow, орчны сайжруулалт.",
    groups: [
      {
        id: "developer-tooling-upgrades--ide-editor",
        name: "IDE & Editor",
        problem: "Cursor, VS Code + Copilot/Claude/Codex, AI-assisted editors.",
        topics: [
          {
            name: "Cursor",
            problem: "Хэзээ ашиглах вэ? Хэрхэн ажилладаг вэ?",
          },
          {
            name: "VS Code + AI Plugins (Copilot/Claude/Codex)",
            problem: "Хэзээ ашиглах вэ? Хэрхэн ажилладаг вэ?",
          },
          {
            name: "Claude/Codex - AI-first editors",
            problem: "Хэзээ ашиглах вэ? Хэрхэн ажилладаг вэ?",
          },
        ],
      },
      {
        id: "developer-tooling-upgrades--git-best-practices",
        name: "Git & Github/Gitlab/Bitbucket — Best practices",
        problem: "Branching strategies, meaningful commits, PR culture.",
        topics: [
          {
            name: "Git basics & Branching strategies",
            problem: "Commit, Branch, Merge, Rebase, Squash, etc.",
          },
          {
            name: "Git worktrees",
            problem: "Хэрхэн өөр өөр зүйл дээр зэрэг ажиллах вэ?",
          },
          {
            name: "Github & Pull Request",
            problem: "Review, Bugbot, Merging?.",
          },
        ],
      },
      {
        id: "developer-tooling-upgrades--local-dev-environment",
        name: "Local dev environment",
        problem: "Parity between dev/prod without touching production DB.",
        topics: [
          {
            name: "Local dev environment with Docker",
            problem: "Parity between dev/prod without touching production DB.",
          },
        ],
      },
      {
        id: "developer-tooling-upgrades--security-automation",
        name: "Аюулгүй байдал ба автоматжуулалт",
        problem: "Secrets, linting, dependencies.",
        topics: [
          {
            name: "Secret management basics",
            problem:
              ".env files, Vault, cloud secret stores — no hardcoded credentials.",
          },
          {
            name: "Linting + formatting automation",
            problem: "EditorConfig, language analyzers, formatters.",
          },
          {
            name: "Dependency management hygiene",
            problem: "Package auditing, keeping dependencies current safely.",
          },
        ],
      },
    ],
  },
  {
    id: "testing-culture",
    section: "Testing Culture",
    description: "Тестийн соёл, пирамид, TDD болон AI-тай тест бичих.",
    groups: [
      {
        id: "testing-culture--why-tests",
        name: "Яагаад тест хэрэгтэй вэ?",
        problem:
          "Why fear of AI breaking business logic is correct; how tests solve it.",
        topics: [
          {
            name: "Why fear of AI breaking business logic is correct",
            problem: "And how tests solve it.",
          },
        ],
      },
      {
        id: "testing-culture--unit-testing",
        name: "Types testing",
        problem: "Frameworks, structure, naming; accounting/financial logic.",
        topics: [
          {
            name: "Unit testing fundamentals",
            problem:
              "Frameworks, structure, naming, precision, edge cases, rounding rules",
          },
          {
            name: "Integration testing",
            problem: "Integration testing frameworks, structure, naming.",
          },
          {
            name: "End-to-end testing",
            problem: "End-to-end testing frameworks, structure, naming.",
          },
          {
            name: "User acceptance testing",
            problem: "User acceptance testing frameworks, structure, naming.",
          },
        ],
      },
      {
        id: "testing-culture--testing-pyramid-tdd",
        name: "Testing pyramid ба TDD",
        problem:
          "Unit vs integration vs E2E; writing tests before AI-generated code.",
        topics: [
          {
            name: "The testing pyramid",
            problem: "Unit vs integration vs E2E and where to invest.",
          },
          {
            name: "TDD lite",
            problem:
              "Writing tests before AI-generated code, not religious TDD.",
          },
        ],
      },
      {
        id: "testing-culture--advanced-methods",
        name: "Дэвшилтэт аргууд",
        problem: "Property-based, mocking, mutation, coverage, snapshot.",
        topics: [
          {
            name: "Property-based testing",
            problem:
              "Great for financial invariants (e.g. debits balance credits).",
          },
          {
            name: "Mocking and faking dependencies",
            problem: "Testing without hitting real DBs or APIs.",
          },
          {
            name: "Mutation testing",
            problem: "Verifying your tests actually catch bugs.",
          },
          {
            name: "Code coverage as safety net, not metric",
            problem: "What 80% coverage means and doesn't mean.",
          },
          {
            name: "Golden master / snapshot testing",
            problem: "For legacy code with no tests yet.",
          },
        ],
      },
      {
        id: "testing-culture--testing-with-ai",
        name: "Testing with AI",
        problem: "Prompting AI to generate test cases you hadn't thought of.",
        topics: [
          {
            name: "Testing with AI",
            problem:
              "Prompting AI to generate test cases you hadn't thought of.",
          },
        ],
      },
    ],
  },
  {
    id: "ci-cd-from-scratch",
    section: "CI/CD from Scratch",
    description:
      "CI/CD-ийн үндэс, pipeline, deploy стратеги ба аюулгүй байдал.",
    groups: [
      {
        id: "ci-cd-from-scratch--what-why",
        name: "CI/CD гэж юу вэ, яагаад хэрэгтэй вэ?",
        problem: '"It works on my machine" problem.',
        topics: [
          {
            name: "Why CI/CD exists",
            problem: 'The "it works on my machine" problem.',
          },
        ],
      },
      {
        id: "ci-cd-from-scratch--pipeline-basics",
        name: "Pipeline үндэс",
        problem: "Build, test, deploy; first pipeline.",
        topics: [
          {
            name: "GitHub Actions fundamentals",
            problem: "First pipeline: build → test → deploy.",
          },
          {
            name: "Build vs. release pipelines",
            problem: "Mental model difference.",
          },
        ],
      },
      {
        id: "ci-cd-from-scratch--promotion-deploy-strategy",
        name: "Environment promotion ба deploy стратеги",
        problem: "Dev → staging → prod; rollbacks; security.",
        topics: [
          {
            name: "Environment promotion gates",
            problem:
              "Dev → staging → prod with manual approval (critical for fintech).",
          },
          {
            name: "Rolling vs. blue/green vs. canary",
            problem: "Which is right for a small team.",
          },
          {
            name: "Automated rollbacks",
            problem: "What happens when a deploy goes wrong at 2am.",
          },
          {
            name: "Pipeline security",
            problem: "Secrets in CI, SAST, dependency vulnerability checks.",
          },
        ],
      },
    ],
  },
  {
    id: "software-design-best-practices",
    section: "Software Design & Techniques & Best Practices",
    description: "Нийтлэг хэрэглэгддэг архитектур дизайний ойлголтууд",
    groups: [
      {
        id: "software-design-best-practices--event-driven-architecture",
        name: "Event Driven Architecture",
        problem: "Queues, async processing, DLQ.",
        topics: [
          {
            name: "Event Driven Architecture (queue, dead letter queue)",
            problem:
              "Queues, async processing, DLQ for failed or poison messages.",
          },
          {
            name: "RabbitMQ vs Kafka vs AWS SQS (Cloud Based) vs Upstash (Dedicated Service)",
            problem: "RabbitMQ vs Kafka vs AWS SQS, when to use which.",
          },
        ],
      },
      {
        id: "software-design-best-practices--concurrency-locking",
        name: "Concurrency ба lock-ууд",
        problem: "Idempotency, optimistic/pessimistic locking.",
        topics: [
          {
            name: "Idempotency",
            problem:
              "Safe retries and duplicate requests; critical for disbursements and payments.",
          },
          {
            name: "Optimistic locking",
            problem:
              "Version/timestamp-based concurrency; detect conflicts before commit.",
          },
          {
            name: "Pessimistic locking",
            problem:
              "Lock rows or sections to prevent concurrent updates; when to use.",
          },
        ],
      },
      {
        id: "software-design-best-practices--api-design",
        name: "API design",
        problem: "REST conventions, versioning, idempotency.",
        topics: [
          {
            name: "API design best practices",
            problem:
              "REST conventions, versioning, idempotency (critical for disbursements).",
          },
          {
            name: "Breaking changes vs. backward compatibility",
            problem: "When to break backward compatibility.",
          },
          {
            name: "Incremental changes & Obsoletion",
            problem: "Database schema changes, API changes, obsoletion, etc.",
          },
          {
            name: "GraphQL vs REST",
            problem: "GraphQL vs REST, when to use which.",
          },
        ],
      },
      {
        id: "software-design-best-practices--microservices-vs-monolith",
        name: "Microservices vs Monolith",
        problem: "Microservices vs Monolith, when to use which.",
        topics: [
          {
            name: "Microservices - How micro do I need?",
            problem: "How microservices work. How to scale?",
          },
          {
            name: "Monolith - How monolithic do I need?",
            problem: "How monolithic works. How to scale?",
          },
          {
            name: "Modular Monolith & Mono-repo?",
            problem: "How to combine and get the best of both worlds.",
          },
        ],
      },
      {
        id: "software-design-best-practices--data-science",
        name: "Data Science",
        problem: "Data science & Data Warehouse & Data Pipeline & Tools.",
        topics: [
          {
            name: "Data & Data science",
            problem: "Data science гэж юу вэ? Хэрхэн ашиглагддаг вэ?",
          },
          {
            name: "Data Warehouse",
            problem:
              "BigQuery & Business Intelligence Platforms (Metabase, Lightdash, Apache Superset, etc.)",
          },
          {
            name: "Data Pipeline",
            problem: "Airflow, Fivetran, etc.",
          },
        ],
      },
    ],
  },
  {
    id: "observability-operations",
    section: "Observability & Operations",
    description: "Logs/metrics/traces, alerting/SLO, incident response.",
    groups: [
      {
        id: "observability-operations--logs-metrics-traces",
        name: "Logs, metrics, traces",
        problem: "Three pillars; structured logging; APM.",
        topics: [
          {
            name: "Logging properly",
            problem: "Structured logging, correlation IDs across requests.",
          },
          {
            name: "The three pillars: logs, metrics, traces",
            problem: "Conceptual foundation.",
          },
          {
            name: "Application Performance Monitoring (APM)",
            problem: "Commercial or open-source (Seq, Grafana).",
          },
        ],
      },
      {
        id: "observability-operations--alerting-slo",
        name: "Alerting ба SLO",
        problem: "What wakes someone at 3am; health checks; error budgets.",
        topics: [
          {
            name: "Alerting strategy",
            problem: "What should wake someone at 3am vs. what can wait.",
          },
          {
            name: "Health checks and readiness probes",
            problem: "Knowing your service is alive before users tell you.",
          },
          {
            name: "Error budgets and SLOs",
            problem: "Lightweight version for a small team.",
          },
        ],
      },
      {
        id: "observability-operations--incident-response",
        name: "Incident response",
        problem: "Runbooks, postmortems, blameless culture.",
        topics: [
          {
            name: "Incident response basics",
            problem: "Runbooks, postmortems, blameless culture.",
          },
        ],
      },
    ],
  },
  {
    id: "team-process",
    section: "Team & Process",
    description: "Team-ийн процесс: code review, бичиг баримт, on-call, DoD.",
    groups: [
      {
        id: "team-process--code-review-git-workflow",
        name: "Code review ба Git workflow",
        problem: "Giving and receiving feedback; trunk-based vs Gitflow.",
        topics: [
          {
            name: "Code review culture",
            problem: "Giving and receiving feedback; AI as first reviewer.",
          },
          {
            name: "Trunk-based vs. Gitflow",
            problem: "What works for a 2–3 person team.",
          },
          {
            name: "Feature flags & A/B testing",
            problem:
              "Safer rollouts, kill switches, experiments, and measuring impact without risking production.",
          },
        ],
      },
      {
        id: "team-process--documentation-tech-debt",
        name: "Documentation ба technical debt",
        problem: "ADRs; technical debt as financial metaphor.",
        topics: [
          {
            name: "Architecture Decision Records (ADRs)",
            problem: "Lightweight documentation that lasts.",
          },
          {
            name: "Technical debt as a financial metaphor",
            problem: "Interest and principal.",
          },
        ],
      },
      {
        id: "team-process--oncall-pair-mob-dod",
        name: "On-call, pair/mob, Definition of Done",
        problem: "Runbooks, pairing during AI sessions, formalizing done.",
        topics: [
          {
            name: "On-call rotation and runbooks",
            problem: "Someone needs to be responsible even on a small team.",
          },
          {
            name: "Pair and mob programming",
            problem: "Especially useful during AI-assisted sessions.",
          },
          {
            name: "Definition of Done",
            problem: 'Formalizing what "finished" means.',
          },
        ],
      },
    ],
  },
  {
    id: "legacy-code-modernization",
    section: "Хуучин кодоо яах вэ?",
    description:
      "Одоо хүртэл ажиллаж байгаа чухал системүүдээ хэрхэн орчин үеийн болгох эсвэл хэзээ халах вэ?",
    groups: [
      {
        id: "legacy-code-modernization--fire-slowly-new-services",
        name: "Fire slowly by moving things to new services",
        problem:
          "Strangler fig pattern; extract to new services; incremental migration.",
        topics: [
          {
            name: "Strangler fig pattern",
            problem:
              "Replace legacy in slices by routing traffic to new services over time.",
          },
          {
            name: "Extract to new services",
            problem:
              "When and how to move bounded contexts out of the monolith.",
          },
          {
            name: "Incremental migration without big bang",
            problem: "Rollout and feature flags; coexistence of old and new.",
          },
        ],
      },
      {
        id: "legacy-code-modernization--upgrade-within-itself",
        name: "Start upgrading within itself",
        problem: "In-place refactoring; modernize inside the monolith first.",
        topics: [
          {
            name: "In-place refactoring",
            problem:
              "Improve structure, tests, and dependencies without moving code out.",
          },
          {
            name: "Modernize dependencies and runtime",
            problem:
              "Upgrade frameworks, language version, and libraries safely.",
          },
          {
            name: "Modularize before extracting",
            problem: "Clear boundaries inside the monolith before splitting.",
          },
        ],
      },
      {
        id: "legacy-code-modernization--must-mention",
        name: "When to rewrite, risk, and testing",
        problem:
          "Rewrite vs. refactor; risk and rollout; testing legacy before touching.",
        topics: [
          {
            name: "When to rewrite vs. refactor",
            problem:
              "Cost and risk of full rewrite; when incremental is better.",
          },
          {
            name: "Risk and rollout strategy",
            problem:
              "Canary, feature flags, rollback; not breaking production.",
          },
          {
            name: "Testing the legacy before touching it",
            problem:
              "Characterization tests, safety net, and regression coverage.",
          },
        ],
      },
    ],
  },
];
