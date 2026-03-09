/**
 * Full topic index for the intro page. Name + problem only. Language-agnostic.
 */
export interface IndexTopic {
  name: string;
  problem: string;
}

export interface IndexSection {
  section: string;
  topics: IndexTopic[];
}

export const topicIndexSections: IndexSection[] = [
  {
    section: "Mindset & Foundation",
    topics: [
      { name: "AI as a pair programmer, not a replacement", problem: "Reframing fear into leverage." },
      { name: "The \"trust but verify\" mental model", problem: "Why AI output always needs a human review gate, especially in fintech." },
      { name: "Understanding AI hallucinations in code", problem: "What breaks, why, and how to catch it." },
      { name: "Prompting fundamentals", problem: "Zero-shot vs few-shot, context windows, system prompts." },
      { name: "How LLMs \"understand\" code", problem: "Enough internals to build intuition without the math." },
      { name: "The 10x leverage mindset", problem: "What changes when AI handles boilerplate and you focus on architecture." },
    ],
  },
  {
    section: "Developer Tooling Upgrades",
    topics: [
      { name: "IDE modernization", problem: "Cursor, VS Code + Copilot, AI-assisted editors." },
      { name: "Git basics to Git best practices", problem: "Branching strategies, meaningful commits, PR culture." },
      { name: "Local dev environment with Docker", problem: "Parity between dev/prod without touching production DB." },
      { name: "Secret management basics", problem: ".env files, Vault, cloud secret stores — no hardcoded credentials." },
      { name: "Linting + formatting automation", problem: "EditorConfig, language analyzers, formatters." },
      { name: "Dependency management hygiene", problem: "Package auditing, keeping dependencies current safely." },
    ],
  },
  {
    section: "CI/CD from Scratch",
    topics: [
      { name: "Why CI/CD exists", problem: "The \"it works on my machine\" problem." },
      { name: "GitHub Actions fundamentals", problem: "First pipeline: build → test → deploy." },
      { name: "Cloud DevOps Pipelines", problem: "Pipelines in your ecosystem (e.g. Azure DevOps, GitLab CI)." },
      { name: "Build vs. release pipelines", problem: "Mental model difference." },
      { name: "Environment promotion gates", problem: "Dev → staging → prod with manual approval (critical for fintech)." },
      { name: "Rolling vs. blue/green vs. canary", problem: "Which is right for a small team." },
      { name: "Automated rollbacks", problem: "What happens when a deploy goes wrong at 2am." },
      { name: "Pipeline security", problem: "Secrets in CI, SAST, dependency vulnerability checks." },
    ],
  },
  {
    section: "Testing Culture",
    topics: [
      { name: "Why fear of AI breaking business logic is correct", problem: "And how tests solve it." },
      { name: "Unit testing fundamentals", problem: "Frameworks, structure, naming." },
      { name: "Testing accounting/financial logic", problem: "Precision, edge cases, rounding rules." },
      { name: "The testing pyramid", problem: "Unit vs integration vs E2E and where to invest." },
      { name: "TDD lite", problem: "Writing tests before AI-generated code, not religious TDD." },
      { name: "Property-based testing", problem: "Great for financial invariants (e.g. debits balance credits)." },
      { name: "Mocking and faking dependencies", problem: "Testing without hitting real DBs or APIs." },
      { name: "Mutation testing", problem: "Verifying your tests actually catch bugs." },
      { name: "Code coverage as safety net, not metric", problem: "What 80% coverage means and doesn't mean." },
      { name: "Golden master / snapshot testing", problem: "For legacy code with no tests yet." },
      { name: "Testing with AI", problem: "Prompting AI to generate test cases you hadn't thought of." },
    ],
  },
  {
    section: "Software Architecture & Design",
    topics: [
      { name: "SOLID principles revisited", problem: "Applying them to an existing codebase." },
      { name: "Layered architecture → Clean Architecture", problem: "Migration path, not a rewrite." },
      { name: "Domain-Driven Design basics", problem: "Ubiquitous language, bounded contexts (e.g. loans, accounting, clients)." },
      { name: "Strangler Fig pattern", problem: "Modernize without a risky big-bang rewrite." },
      { name: "CQRS basics", problem: "Separating reads from writes — huge for reporting." },
      { name: "Event Sourcing lite", problem: "Append-only audit logs, often mandatory in financial systems." },
      { name: "Outbox pattern", problem: "Reliable event publishing without distributed transactions." },
      { name: "API design best practices", problem: "REST conventions, versioning, idempotency (critical for disbursements)." },
    ],
  },
  {
    section: "AI-Assisted Development (Practical)",
    topics: [
      { name: "Copilot / Cursor workflow", problem: "Autocomplete vs. chat vs. agent mode; when to use which." },
      { name: "Prompting for typed, enterprise languages", problem: "Getting good output from your stack." },
      { name: "Using AI to understand unfamiliar code", problem: "\"Explain this method,\" \"what are the edge cases?\"" },
      { name: "Using AI to write tests for existing code", problem: "Killer use case for legacy systems." },
      { name: "Using AI for code review", problem: "PR review prompts, catching what humans miss." },
      { name: "Using AI for documentation", problem: "Generated docs, ADRs, READMEs." },
      { name: "Using AI for SQL and DB work", problem: "Query optimization, index suggestions, migration scripts." },
      { name: "Using AI for refactoring safely", problem: "Extract method, rename, restructure with tests as safety net." },
      { name: "AI for debugging", problem: "Rubber duck on steroids; paste the stack trace." },
      { name: "Building internal tools with AI", problem: "Rapid prototyping of admin UIs, report generators." },
      { name: "Agentic coding", problem: "What it is, when it's ready for production." },
      { name: "The \"AI diff review\" habit", problem: "Never accepting AI output without reading every line." },
    ],
  },
  {
    section: "Database & Legacy DB Modernization",
    topics: [
      { name: "DB-specific AI tooling", problem: "Using AI to write stored procedures, optimize queries." },
      { name: "Database migrations as code", problem: "Flyway, Liquibase — version control your schema." },
      { name: "Read replicas and reporting DBs", problem: "Stop hammering the transactional DB for reports." },
      { name: "Indexing strategy with AI assistance", problem: "Letting AI suggest and explain index choices." },
      { name: "Data archiving strategies", problem: "Retention, regulatory compliance." },
      { name: "Legacy DB → alternatives path", problem: "Migration considerations (e.g. PostgreSQL)." },
    ],
  },
  {
    section: "Security Fundamentals",
    topics: [
      { name: "OWASP Top 10 for financial APIs", problem: "Injection, broken auth, excessive data exposure." },
      { name: "Input validation", problem: "Validation libraries, data annotations." },
      { name: "Authentication modernization", problem: "JWT, OAuth2/OIDC, moving off session-only auth." },
      { name: "Role-based access control (RBAC)", problem: "Who can disburse vs. who can view reports." },
      { name: "Audit logging", problem: "Immutable logs for every financial transaction (regulatory)." },
      { name: "Penetration testing basics", problem: "What it is, how to get it done for a small shop." },
      { name: "Mobile API security", problem: "Certificate pinning, token refresh, rate limiting." },
      { name: "Secrets scanning in git history", problem: "Finding and rotating accidentally committed credentials." },
    ],
  },
  {
    section: "Observability & Operations",
    topics: [
      { name: "Logging properly", problem: "Structured logging, correlation IDs across requests." },
      { name: "The three pillars: logs, metrics, traces", problem: "Conceptual foundation." },
      { name: "Application Performance Monitoring (APM)", problem: "Commercial or open-source (Seq, Grafana)." },
      { name: "Alerting strategy", problem: "What should wake someone at 3am vs. what can wait." },
      { name: "Health checks and readiness probes", problem: "Knowing your service is alive before users tell you." },
      { name: "Error budgets and SLOs", problem: "Lightweight version for a small team." },
      { name: "Incident response basics", problem: "Runbooks, postmortems, blameless culture." },
    ],
  },
  {
    section: "Cloud & Infrastructure",
    topics: [
      { name: "Cloud fundamentals", problem: "Compute, storage, networking mental models." },
      { name: "Infrastructure as Code intro", problem: "Terraform or cloud-native; stop clicking in the portal." },
      { name: "Containerization with Docker", problem: "Dockerizing an app from scratch." },
      { name: "Container orchestration lite", problem: "Kubernetes concepts vs. simpler managed options." },
      { name: "Managed vs. self-hosted", problem: "When to let the cloud handle it." },
      { name: "Cost management basics", problem: "Tagging, budgets, right-sizing." },
      { name: "Disaster recovery planning", problem: "RTO/RPO, backup strategies." },
    ],
  },
  {
    section: "Team & Process",
    topics: [
      { name: "Code review culture", problem: "Giving and receiving feedback; AI as first reviewer." },
      { name: "Trunk-based vs. Gitflow", problem: "What works for a 2–3 person team." },
      { name: "Architecture Decision Records (ADRs)", problem: "Lightweight documentation that lasts." },
      { name: "Technical debt as a financial metaphor", problem: "Interest and principal." },
      { name: "On-call rotation and runbooks", problem: "Someone needs to be responsible even on a small team." },
      { name: "Pair and mob programming", problem: "Especially useful during AI-assisted sessions." },
      { name: "Definition of Done", problem: "Formalizing what \"finished\" means." },
    ],
  },
  {
    section: "Internal Tool Project (Applied)",
    topics: [
      { name: "Scoping the internal tool", problem: "What problem to solve, success criteria." },
      { name: "Standing up a new project with modern conventions", problem: "From day one." },
      { name: "Building the first CI pipeline together", problem: "Hands-on (e.g. GitHub Actions)." },
      { name: "Writing the first tests before logic", problem: "TDD demo on a financial calculation." },
      { name: "First AI-assisted feature", problem: "Build something real with Copilot/Cursor, review output together." },
      { name: "Deploying to a cloud environment", problem: "Even a small VM at first." },
      { name: "Connecting to legacy DB safely", problem: "Connection pooling, read-only credentials for reporting." },
    ],
  },
];
