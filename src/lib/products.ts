/**
 * Product data for the reusable product-page architecture.
 *
 * HONESTY RULE: nothing in this file invents evidence. Every figure, award,
 * stack entry, and capability below is taken from the studio's own portfolio
 * record (krunal16-c.github.io/portfolio) or the studio brief. Where a real
 * screenshot, diagram, metric, or video is needed and does not exist, the entry
 * declares an asset request via `assets` / `outcomes[].evidence` instead of
 * fabricating a number or a mock UI.
 */

export type AssetRequest = {
  /** The uppercase request label rendered inside the slot. */
  label: string;
  /** What the asset should show, so whoever supplies it knows what to capture. */
  brief: string;
  /** Aspect ratio for the reserved slot. Reserving space keeps CLS at zero. */
  ratio: "16/10" | "16/9" | "4/3" | "1/1" | "21/9";
};

/**
 * Depth tier. This is an editorial decision, not a quality ranking: a flagship
 * has enough operational surface to justify a full argument, a project is a
 * shipped, self-contained system, and a lab entry is a focused agent that would
 * be padded out by the full treatment.
 */
export type Tier = "flagship" | "project" | "lab";

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** Groups the catalogue by the kind of operation the product acts on. */
  domain: string;
  /** One line. Renders as the product-page lead. */
  positioning: string;
  status: string;
  tier: Tier;
  /** Real technologies, as actually used. Rendered as the technical signature. */
  stack: string[];
  /** Supplied figures only. Never a projection, never a rounded-up estimate. */
  metrics?: { value: string; label: string }[];
  /** A supplied, verifiable distinction. */
  award?: string;
  /** Source, live demo, or paper. Only links that actually resolve. */
  links?: { label: string; href: string }[];
  /** The operational problem the product exists to solve. */
  problem: { headline: string; body: string };
  /** Who actually opens this product during a working day. */
  users?: { role: string; context: string }[];
  /** How it works, as an ordered system. Each step is a real stage, not a "Step 1" label. */
  mechanism: { title: string; body: string }[];
  /** Architecture layers, inner to outer. Drives the architecture diagram. */
  architecture: { layer: string; detail: string }[];
  /** What changes operationally. Evidence is requested, never invented. */
  outcomes?: { claim: string; evidence: string }[];
  capabilities: string[];
  assets?: AssetRequest[];
};

const GITHUB = "https://github.com/krunal16-c";

export const PRODUCTS: Product[] = [
  /* ---------------------------------------------------------------------
     GOVERNMENT OPERATIONS
     --------------------------------------------------------------------- */
  {
    slug: "glaucon",
    name: "Glaucon",
    category: "Government Operations Intelligence",
    domain: "Government Operations",
    positioning:
      "A multi-agent government relations research system, built for teams whose decisions depend on knowing what policy is about to do.",
    status: "Built at Edwards School of Business, University of Saskatchewan",
    tier: "flagship",
    stack: ["Multi-Agent", "Retrieval", "Entity Resolution", "Python"],
    metrics: [{ value: "60%", label: "Reduction in preparation time" }],
    problem: {
      headline: "Government relations still runs on manual reading.",
      body: "Policy moves through committees, consultations, filings, and transcripts faster than any team can read it. Analysts spend their week finding the documents that matter and have very little week left for judgement. By the time a position paper is drafted, the decision window has usually moved.",
    },
    users: [
      { role: "Government relations leads", context: "Tracking legislation across multiple jurisdictions at once." },
      { role: "Policy analysts", context: "Building evidence for a position before a consultation closes." },
      { role: "Public affairs teams", context: "Mapping which stakeholders actually influence a given file." },
      { role: "Strategy and regulatory counsel", context: "Assessing exposure before a rule is finalised." },
    ],
    mechanism: [
      {
        title: "Ingest the public record",
        body: "Legislative texts, committee proceedings, consultations, and public filings are pulled continuously and normalised into a single searchable corpus.",
      },
      {
        title: "Resolve entities and stakeholders",
        body: "People, offices, committees, and organisations are linked across documents so a name in a transcript connects to the file it belongs to.",
      },
      {
        title: "Research against the corpus",
        body: "Analysts ask real research questions and receive answers grounded in cited source documents rather than model recall.",
      },
      {
        title: "Surface what changed",
        body: "Movement on a tracked file raises a signal, so the team reads because something happened, not on a schedule.",
      },
    ],
    architecture: [
      { layer: "Sources", detail: "Legislative registers, committee records, consultations, public filings" },
      { layer: "Ingestion", detail: "Scheduled collection, normalisation, deduplication, change detection" },
      { layer: "Knowledge", detail: "Entity resolution, stakeholder graph, document embeddings, citations" },
      { layer: "Reasoning", detail: "Coordinated research agents with source attribution" },
      { layer: "Surface", detail: "Research workspace, stakeholder views, tracked-file alerts" },
    ],
    outcomes: [
      {
        claim: "Research time moves from finding documents to forming a position.",
        evidence: "Measured in deployment: 60% reduction in preparation time.",
      },
      {
        claim: "Every answer carries its source, so it survives internal review.",
        evidence: "Citation coverage is a product guarantee, verifiable in the interface.",
      },
      {
        claim: "Stakeholder maps stay current instead of ageing in a slide deck.",
        evidence: "PILOT MEASUREMENT REQUIRED: staleness of stakeholder records over a quarter.",
      },
    ],
    capabilities: [
      "Continuous legislative and consultation monitoring",
      "Entity and stakeholder resolution across sources",
      "Retrieval-grounded research with citations",
      "Tracked-file change detection and alerting",
      "Multi-jurisdiction corpus support",
      "Export to briefing and position-paper formats",
    ],
    assets: [
      { label: "Product screenshot required", brief: "Glaucon main dashboard, signed out of any client data.", ratio: "16/10" },
      { label: "Product screenshot required", brief: "Research screen mid-query, with a cited answer visible.", ratio: "16/10" },
      { label: "Product screenshot required", brief: "Stakeholder intelligence view showing the entity graph.", ratio: "4/3" },
      { label: "Demo video required", brief: "Sixty to ninety seconds, one research question start to finish.", ratio: "16/9" },
    ],
  },

  /* ---------------------------------------------------------------------
     WORKPLACE OPERATIONS
     --------------------------------------------------------------------- */
  {
    slug: "safetyfirst",
    name: "SafetyFirst",
    category: "Occupational Health and Safety",
    domain: "Workplace Operations",
    positioning:
      "An OH&S platform that predicts workplace incident probability over the next seven days, so prevention has somewhere specific to go.",
    status: "Deployed on IBM Watson",
    tier: "flagship",
    stack: ["Python", "XGBoost", "IBM Watson", "FastAPI"],
    award: "People's Choice Award, SaskHack 2026",
    metrics: [{ value: "7 days", label: "Forward prediction window" }],
    links: [{ label: "Source", href: `${GITHUB}/safetyfirst` }],
    problem: {
      headline: "Safety programs are measured on incidents that already happened.",
      body: "Lagging indicators tell an organisation where it failed, months after the failure. The information that would have predicted the incident — who was on shift, what the conditions were, what the site's history looks like — exists at the time it would have been useful, and is never assembled into a probability anyone can act on.",
    },
    users: [
      { role: "Safety officers", context: "Deciding where to focus a limited number of interventions this week." },
      { role: "Site supervisors", context: "Adjusting crew and task assignment against current conditions." },
      { role: "Operations leadership", context: "Seeing risk concentration across sites before it becomes a claim." },
    ],
    mechanism: [
      {
        title: "Assemble the real inputs",
        body: "Worker characteristics, current conditions, and historical patterns are brought together as one feature set rather than three separate reports.",
      },
      {
        title: "Model the probability",
        body: "An XGBoost model trained and deployed on IBM Watson scores incident probability over the following seven days.",
      },
      {
        title: "Serve it where work is planned",
        body: "Predictions are exposed through a FastAPI REST API, so the score reaches scheduling and briefing tools rather than a dashboard nobody opens.",
      },
      {
        title: "Act inside the window",
        body: "A seven-day horizon is chosen because it matches how shifts and site work are actually planned.",
      },
    ],
    architecture: [
      { layer: "Inputs", detail: "Worker characteristics, current site conditions, historical incident patterns" },
      { layer: "Features", detail: "Combined feature set aligned to a seven-day forward window" },
      { layer: "Model", detail: "XGBoost, trained and deployed on IBM Watson" },
      { layer: "Serving", detail: "FastAPI REST API returning incident probability" },
      { layer: "Surface", detail: "Predictions delivered into planning and briefing workflows" },
    ],
    outcomes: [
      {
        claim: "Safety attention is allocated by predicted risk rather than by last quarter's incident log.",
        evidence: "The model outputs a seven-day probability per context; the score is inspectable.",
      },
      {
        claim: "The prediction lands inside the planning window it is meant to change.",
        evidence: "Verifiable directly: predictions are served over a REST API at planning time.",
      },
      {
        claim: "The approach holds up to outside scrutiny.",
        evidence: "People's Choice Award, SaskHack 2026.",
      },
    ],
    capabilities: [
      "Seven-day incident probability prediction",
      "Worker, condition, and history feature modelling",
      "XGBoost model training and deployment",
      "IBM Watson hosted inference",
      "FastAPI REST prediction service",
      "Integration into existing planning workflows",
    ],
    assets: [
      { label: "Product screenshot required", brief: "Risk view for one site across the seven-day window.", ratio: "16/10" },
      { label: "Sample output required", brief: "A real prediction response from the REST API, redacted.", ratio: "16/9" },
    ],
  },

  /* ---------------------------------------------------------------------
     KNOWLEDGE OPERATIONS
     --------------------------------------------------------------------- */
  {
    slug: "skillsclaw",
    name: "SkillsClaw",
    category: "Operational Knowledge",
    domain: "Knowledge Operations",
    positioning:
      "Turn recorded workflows and standard operating procedures into production-ready AI skill definitions that agents can actually run.",
    status: "In active development",
    tier: "flagship",
    stack: ["React", "Claude", "Video Analysis", "Document Parsing"],
    links: [{ label: "Source", href: `${GITHUB}/skillsclaw` }],
    problem: {
      headline: "Operational knowledge is trapped in formats machines cannot use.",
      body: "The way an organisation actually works lives in SOP documents, training recordings, and the heads of the people who have done the job longest. None of that is executable. Every attempt to automate the work starts by re-deriving knowledge that already exists, which is why automation projects stall before they reach the floor.",
    },
    users: [
      { role: "Operations leads", context: "Encoding a process once instead of retraining it every quarter." },
      { role: "Training and enablement teams", context: "Turning existing SOP libraries into something operational." },
      { role: "Automation engineers", context: "Starting from real procedure rather than a blank definition." },
      { role: "Quality and compliance", context: "Keeping the executable version and the written version in step." },
    ],
    mechanism: [
      {
        title: "Take the material that already exists",
        body: "Recorded workflows, screen captures, and SOP documents go in as they are. No rewriting the procedure first.",
      },
      {
        title: "Analyse the actual procedure",
        body: "The system extracts the steps, decision points, inputs, and tools that the recording or document describes.",
      },
      {
        title: "Generate a structured skill",
        body: "Output is a structured SKILL.md definition: named, scoped, and specific enough for an agent to execute.",
      },
      {
        title: "Review and deploy",
        body: "A human who knows the process confirms the definition before it goes into production.",
      },
    ],
    architecture: [
      { layer: "Input", detail: "Screen recordings, video walkthroughs, SOP documents, procedure exports" },
      { layer: "Extraction", detail: "Transcription, action detection, document parsing, step segmentation" },
      { layer: "Structuring", detail: "Decision points, inputs, tool calls, preconditions, success criteria" },
      { layer: "Generation", detail: "Structured SKILL.md definition with scope and invocation triggers" },
      { layer: "Deployment", detail: "Human review, versioning, publication to the agent runtime" },
    ],
    outcomes: [
      {
        claim: "Existing SOP libraries become the starting point for automation rather than an obstacle.",
        evidence: "Verifiable directly: the input is the organisation's own SOP corpus.",
      },
      {
        claim: "The written procedure and the executable procedure stop diverging.",
        evidence: "Versioned skill definitions are diffable against their source document.",
      },
      {
        claim: "Automation work starts at review rather than at discovery.",
        evidence: "PILOT MEASUREMENT REQUIRED: time from SOP to first deployed skill.",
      },
    ],
    capabilities: [
      "Video and screen-recording workflow analysis",
      "SOP and procedure document parsing",
      "Step, decision point, and tool extraction",
      "Structured SKILL.md generation",
      "Human review and approval gate",
      "Skill versioning and deployment",
    ],
    assets: [
      { label: "Product screenshot required", brief: "Upload and input screen with a recording queued.", ratio: "16/10" },
      { label: "Product screenshot required", brief: "Workflow analysis screen showing extracted steps.", ratio: "16/10" },
      { label: "Sample output required", brief: "A real generated SKILL.md, rendered as it appears in product.", ratio: "4/3" },
      { label: "Demo video required", brief: "Recording in, deployable skill out.", ratio: "16/9" },
    ],
  },

  /* ---------------------------------------------------------------------
     BUSINESS OPERATIONS
     --------------------------------------------------------------------- */
  {
    slug: "rfq-agent",
    name: "RFQ Agent",
    category: "Procurement Automation",
    domain: "Business Operations",
    positioning:
      "A multi-agent procurement system that watches public tender sources, scores every opportunity against fit, and drafts the proposal.",
    status: "In active development",
    tier: "flagship",
    stack: ["LangGraph", "LangChain", "OpenAI", "FastAPI", "PostgreSQL", "Next.js 14", "TanStack Query"],
    metrics: [{ value: "0–100", label: "LLM fit score per opportunity" }],
    problem: {
      headline: "Most tenders are lost before anyone reads them.",
      body: "Public procurement opportunities are published across separate portals on their own schedules. A team either assigns someone to check all of them daily, or accepts that it will miss the ones it was best positioned to win. The qualifying work — reading the requirement, judging fit, starting a draft — is the same every time and is exactly the work that gets skipped when the queue is long.",
    },
    users: [
      { role: "Bid and proposal teams", context: "Deciding which of this week's tenders is worth a response." },
      { role: "Business development leads", context: "Seeing the pipeline before a competitor has already answered." },
      { role: "Capture managers", context: "Starting a draft from a scored requirement rather than a blank page." },
    ],
    mechanism: [
      {
        title: "Monitor the real sources",
        body: "CanadaBuys, SAM.gov, and MERX are watched continuously by scheduled collection rather than checked manually.",
      },
      {
        title: "Score against fit",
        body: "Each opportunity is matched by an LLM and scored 0 to 100, so the queue arrives ordered by whether it is worth the team's time.",
      },
      {
        title: "Draft the response",
        body: "Coordinated agents build a first proposal draft from the requirement, which turns qualification into editing.",
      },
      {
        title: "Alert where the team already is",
        body: "Scored opportunities are pushed to Slack, so the signal arrives in the working channel rather than in another dashboard.",
      },
    ],
    architecture: [
      { layer: "Sources", detail: "CanadaBuys, SAM.gov, MERX tender feeds" },
      { layer: "Collection", detail: "APScheduler-driven monitoring into PostgreSQL" },
      { layer: "Scoring", detail: "LLM matching producing a 0–100 fit score per opportunity" },
      { layer: "Agents", detail: "LangGraph and LangChain orchestration over OpenAI models for drafting" },
      { layer: "Surface", detail: "Next.js 14 with TanStack Query, FastAPI service, Slack alerts" },
    ],
    outcomes: [
      {
        claim: "The team sees every relevant tender rather than the ones it had time to check.",
        evidence: "Three sources are monitored on a schedule; coverage is inspectable in the pipeline.",
      },
      {
        claim: "Qualification becomes a review step instead of a research step.",
        evidence: "Every opportunity carries a 0–100 fit score before a human opens it.",
      },
      {
        claim: "Proposal work starts from a draft rather than a blank document.",
        evidence: "PILOT MEASUREMENT REQUIRED: hours from tender publication to first submitted draft.",
      },
    ],
    capabilities: [
      "Continuous monitoring of CanadaBuys, SAM.gov, and MERX",
      "LLM opportunity matching with 0–100 fit scoring",
      "Multi-agent proposal drafting",
      "Scheduled collection via APScheduler",
      "Slack alerting into the working channel",
      "PostgreSQL-backed opportunity pipeline",
    ],
    assets: [
      { label: "Product screenshot required", brief: "Opportunity pipeline with fit scores visible.", ratio: "16/10" },
      { label: "Sample output required", brief: "One scored opportunity and its generated draft, redacted.", ratio: "16/9" },
    ],
  },
  {
    slug: "renzo",
    name: "Renzo",
    category: "Engineering Operations",
    domain: "Business Operations",
    positioning:
      "An AI-first engineering system that accelerates frontend delivery for services teams working across many concurrent client codebases.",
    status: "In active development",
    tier: "flagship",
    stack: ["Agentic Execution", "Static Analysis", "TypeScript"],
    problem: {
      headline: "Frontend delivery is where services teams lose their margin.",
      body: "An IT services company runs many frontends at once, each with a different stack, a different design language, and a different definition of done. Senior engineers spend their time on scaffolding, translation from design, and review rather than on the work only they can do. Throughput is capped by the review queue, not by the number of developers.",
    },
    users: [
      { role: "Frontend engineers", context: "Turning a design into working, reviewable components." },
      { role: "Engineering managers", context: "Holding quality constant across parallel client projects." },
      { role: "Delivery leads", context: "Committing to timelines they can actually hold." },
      { role: "Technical architects", context: "Keeping conventions consistent across every repository." },
    ],
    mechanism: [
      {
        title: "Read the codebase as it is",
        body: "Renzo works against the project's existing conventions, component library, and typing rules rather than generating in a vacuum.",
      },
      {
        title: "Take a task, not a prompt",
        body: "Work enters as a scoped engineering task tied to a design or a ticket, with the acceptance criteria attached.",
      },
      {
        title: "Execute and show the work",
        body: "The system produces the change, the reasoning, and the diff together, so review starts from an argument rather than a guess.",
      },
      {
        title: "Return to the engineer",
        body: "Output lands in the normal review path. Renzo is a throughput layer inside the existing process, not a replacement for it.",
      },
    ],
    architecture: [
      { layer: "Repository", detail: "Existing codebase, component library, lint and type configuration" },
      { layer: "Context", detail: "Convention extraction, dependency graph, design token mapping" },
      { layer: "Task", detail: "Scoped work items with acceptance criteria and linked designs" },
      { layer: "Execution", detail: "Agentic build, self-review, test and type verification" },
      { layer: "Review", detail: "Diff, rationale, and verification output in the normal review path" },
    ],
    outcomes: [
      {
        claim: "Senior engineers spend review time on architecture rather than scaffolding.",
        evidence: "PILOT MEASUREMENT REQUIRED: review hours per merged change, before and after.",
      },
      {
        claim: "Convention drift between concurrent client projects narrows.",
        evidence: "PILOT MEASUREMENT REQUIRED: lint and convention violations per repository over time.",
      },
      {
        claim: "Delivery estimates hold because the variable step becomes a measured one.",
        evidence: "PILOT MEASUREMENT REQUIRED: estimate accuracy across a delivery quarter.",
      },
    ],
    capabilities: [
      "Codebase convention extraction and enforcement",
      "Design-to-component execution",
      "Task-scoped agentic development",
      "Type and test verification before handoff",
      "Multi-repository operation",
      "Standard pull-request review integration",
    ],
    assets: [
      { label: "Product screenshot required", brief: "Renzo main interface at rest.", ratio: "16/10" },
      { label: "Product screenshot required", brief: "Task execution view, mid-run.", ratio: "4/3" },
      { label: "Diagram required", brief: "Developer workflow before and after Renzo, as a real diagram.", ratio: "16/9" },
    ],
  },

  /* ---------------------------------------------------------------------
     RESEARCH AND DATA
     --------------------------------------------------------------------- */
  {
    slug: "iota",
    name: "Iota",
    category: "Research Funding Discovery",
    domain: "Research and Data",
    positioning:
      "Personalised grant discovery that surfaces the funding opportunities a specific researcher is actually eligible for.",
    status: "Prototype",
    tier: "lab",
    stack: ["LangChain", "Tavily", "gpt-4o-mini"],
    problem: {
      headline: "Researchers miss funding they qualify for.",
      body: "Grant opportunities are scattered across agencies, foundations, and institutional portals with inconsistent formats and deadlines. Finding the relevant ones is a research project in itself, competing directly with the research the funding is meant to support.",
    },
    mechanism: [
      {
        title: "Search the live landscape",
        body: "Tavily API search reaches current funding sources rather than a static list that ages between updates.",
      },
      {
        title: "Reason about fit",
        body: "gpt-4o-mini evaluates each opportunity against the researcher's actual profile and field.",
      },
      {
        title: "Return what is relevant",
        body: "Output is a personalised shortlist, which is the only form of this answer that saves anyone time.",
      },
    ],
    architecture: [
      { layer: "Search", detail: "Tavily API live retrieval across funding sources" },
      { layer: "Reasoning", detail: "gpt-4o-mini relevance evaluation against researcher profile" },
      { layer: "Orchestration", detail: "LangChain pipeline from query to shortlist" },
    ],
    capabilities: [
      "Live funding opportunity search",
      "Researcher profile matching",
      "Relevance reasoning over results",
      "Personalised opportunity shortlist",
    ],
  },

  /* ---------------------------------------------------------------------
     FIELD OPERATIONS
     --------------------------------------------------------------------- */
  {
    slug: "wildtrack",
    name: "WildTrack",
    category: "Field Data Collection",
    domain: "Field Operations",
    positioning:
      "Wildlife tracking and reporting that routes field observations to the authority responsible for acting on them.",
    status: "Shipped",
    tier: "project",
    stack: ["Flutter", "Firebase", "GIS"],
    award: "2nd Prize, Eco Hack 2022",
    links: [{ label: "Source", href: `${GITHUB}/wildtrack` }],
    problem: {
      headline: "Field observations rarely reach the desk that can act.",
      body: "Someone in the field sees something that matters. The report is written down, photographed, or remembered, and then has to find its way through an unclear chain to whichever authority is responsible for that species and that location. Most of the value decays in transit.",
    },
    mechanism: [
      {
        title: "Collect in the field",
        body: "A Flutter mobile app captures the observation where it happens, including location, rather than after the fact.",
      },
      {
        title: "Resolve responsibility geographically",
        body: "GIS determines which authority owns the location, so routing is derived rather than guessed.",
      },
      {
        title: "Route and record",
        body: "Firebase carries the report to the relevant authority and keeps the record queryable afterwards.",
      },
    ],
    architecture: [
      { layer: "Capture", detail: "Flutter mobile field collection with location" },
      { layer: "Geography", detail: "GIS resolution of jurisdiction and responsible authority" },
      { layer: "Routing", detail: "Firebase delivery to the relevant authority" },
      { layer: "Record", detail: "Persistent, queryable observation history" },
    ],
    capabilities: [
      "Mobile field data collection",
      "Location-aware observation capture",
      "GIS-based authority routing",
      "Firebase-backed reporting and storage",
    ],
  },

  /* ---------------------------------------------------------------------
     APPLIED INTERFACES
     --------------------------------------------------------------------- */
  {
    slug: "aurora",
    name: "Aurora",
    category: "Conversational Training",
    domain: "Applied Interfaces",
    positioning:
      "A voice AI training tool that simulates donor conversations, so teams can practise the interaction before it costs them a relationship.",
    status: "Deployed",
    tier: "project",
    stack: ["Google ADK", "Voice AI", "Conversational Agents"],
    metrics: [{ value: "30%", label: "Increase in donor conversions" }],
    problem: {
      headline: "The only way to get better at a high-stakes conversation is to have one.",
      body: "Fundraising teams learn donor conversations by doing them live, which means every training repetition is spent on a real relationship. Role-play with a colleague does not hold up, because the colleague already agrees with you.",
    },
    mechanism: [
      {
        title: "Simulate a real counterpart",
        body: "Google ADK drives a conversational agent that behaves like a donor rather than a scripted prompt.",
      },
      {
        title: "Practise without exposure",
        body: "Teams refine communication in a setting where a poor repetition costs nothing.",
      },
      {
        title: "Carry it into live work",
        body: "The practised interaction is the same one the team runs with an actual donor.",
      },
    ],
    architecture: [
      { layer: "Agent", detail: "Google ADK conversational simulation of donor interaction" },
      { layer: "Session", detail: "Repeatable practice conversations without live engagement risk" },
      { layer: "Outcome", detail: "Communication skills applied to real donor conversations" },
    ],
    outcomes: [
      {
        claim: "Practice converts into results in live conversations.",
        evidence: "Measured in deployment: 30% more donor conversions.",
      },
    ],
    capabilities: [
      "Conversational donor simulation",
      "Voice-based interaction practice",
      "Zero-risk repetition",
      "Google ADK agent runtime",
    ],
  },
  {
    slug: "foodlens",
    name: "FoodLens Agent",
    category: "Applied Vision",
    domain: "Applied Interfaces",
    positioning:
      "A restaurant photo enhancement agent: a dish photo goes in, marketing-ready imagery comes out.",
    status: "Prototype",
    tier: "lab",
    stack: ["Google Gemini", "FastAPI", "React", "Vite"],
    metrics: [
      { value: "6", label: "Style presets" },
      { value: "21", label: "Pytest tests, TDD throughout" },
    ],
    problem: {
      headline: "Small restaurants photograph their own food and it shows.",
      body: "Marketing imagery is a professional service priced for chains. An independent restaurant has a phone, a dish, and no realistic path from one to the other.",
    },
    mechanism: [
      {
        title: "Take the photo that exists",
        body: "A phone photo of the dish is the input. No lighting rig, no reshoot.",
      },
      {
        title: "Enhance against cuisine",
        body: "Google Gemini applies cuisine-specific prompting across six style presets rather than one generic filter.",
      },
      {
        title: "Export where it will be posted",
        body: "Output is Instagram-ready, which is the actual destination for this image.",
      },
    ],
    architecture: [
      { layer: "Input", detail: "Dish photograph uploaded from the restaurant" },
      { layer: "Generation", detail: "Google Gemini with cuisine-specific prompts across 6 style presets" },
      { layer: "Service", detail: "FastAPI backend, 21 pytest tests written test-first" },
      { layer: "Surface", detail: "React and Vite interface with Instagram-ready export" },
    ],
    capabilities: [
      "Dish photo enhancement",
      "Six cuisine-aware style presets",
      "Instagram-ready export",
      "Test-driven FastAPI service",
    ],
  },
  {
    slug: "style-me",
    name: "Style Me Agent",
    category: "Applied Vision",
    domain: "Applied Interfaces",
    positioning:
      "AI hairstyle recommendation that reasons from face shape rather than from whatever is trending.",
    status: "Prototype",
    tier: "lab",
    stack: ["Google Gemini", "Vision"],
    metrics: [
      { value: "7", label: "Face shapes analysed" },
      { value: "4", label: "Style directions per result" },
    ],
    problem: {
      headline: "Style advice is generic because the input is generic.",
      body: "Recommendations are made against trends and celebrity reference images, not against the specific face they are meant to suit. The person asking has to translate the advice themselves, which is the hard part.",
    },
    mechanism: [
      {
        title: "Analyse the actual face",
        body: "Google Gemini classifies across seven face shapes from an uploaded reference photo.",
      },
      {
        title: "Generate across intent",
        body: "Four suggestions are returned — Safe, Trendy, Bold, and Classic — because a single recommendation assumes an appetite the system cannot know.",
      },
      {
        title: "Include colour",
        body: "Hair colour recommendations accompany the cut, since the two decisions are made together in practice.",
      },
    ],
    architecture: [
      { layer: "Input", detail: "Reference photograph upload" },
      { layer: "Analysis", detail: "Google Gemini face shape classification across 7 shapes" },
      { layer: "Generation", detail: "Four style directions: Safe, Trendy, Bold, Classic" },
      { layer: "Surface", detail: "Style and hair colour recommendations returned together" },
    ],
    capabilities: [
      "Face shape analysis across seven shapes",
      "Four differentiated style directions",
      "Hair colour recommendation",
      "Reference photo upload",
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Catalogue order for the index. Government work leads because it is the deepest. */
export const DOMAIN_ORDER = [
  "Government Operations",
  "Workplace Operations",
  "Knowledge Operations",
  "Business Operations",
  "Research and Data",
  "Field Operations",
  "Applied Interfaces",
] as const;

export type Domain = (typeof DOMAIN_ORDER)[number];

/** Groups the catalogue for the index page, preserving DOMAIN_ORDER. */
export function productsByDomain() {
  return DOMAIN_ORDER.map((domain) => ({
    domain,
    items: PRODUCTS.filter((p) => p.domain === domain),
  })).filter((g) => g.items.length > 0);
}

/** Adjacent-product navigation at the foot of a product page. */
export function siblings(slug: string) {
  const i = PRODUCTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? PRODUCTS[i - 1] : PRODUCTS[PRODUCTS.length - 1],
    next: i < PRODUCTS.length - 1 ? PRODUCTS[i + 1] : PRODUCTS[0],
  };
}
