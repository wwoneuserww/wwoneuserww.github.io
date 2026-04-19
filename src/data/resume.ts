export interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
  details?: string[];
}

export interface ProjectStep {
  label: string;
  description: string;
  outcome: "success" | "failure" | "ongoing";
}

export interface ProjectVideo {
  src: string;
  poster: string;
  title: string;
}

export interface Project {
  title: string;
  subtitle: string;
  role: string;
  period: string;
  location?: string;
  featured: boolean;
  image?: string;
  videos?: ProjectVideo[];
  motivation: string;
  approach?: string;
  result?: string;
  tags: string[];
  evolution?: ProjectStep[];
  highlights?: string[];
}

export interface ResearchExp {
  lab: string;
  topic: string;
  role: string;
  supervisor: string;
  period: string;
  location: string;
  bullets: { title: string; detail: string }[];
}

export interface Award {
  title: string;
  org: string;
  year: string;
  certificate?: string;
}

export const personal = {
  name: "WANG Ziyuan",
  nameCN: "王子元",
  tagline:
    "Depth-only 3D human sensing · agentic video understanding · physics-aware generative modelling",
  email: "1155211079@link.cuhk.edu.hk",
  phone: "+852 5665 8933",
  homepage: "https://wwoneuserww.github.io",
  github: "https://github.com/wwoneuserww",
  bio: "ELITE-stream undergraduate researcher at CUHK, working on privacy-preserving 3D human sensing and agentic activity understanding for elder care. Building systems that bootstrap depth-only pose models from RGB foundation models without manual labels, and LLM agents that turn continuous recordings into actionable clinician reports.",
};

export const education: Education[] = [
  {
    school: "The Chinese University of Hong Kong (CUHK)",
    degree: "B.Eng. in Information Engineering, ELITE Stream",
    period: "Aug 2023 — Jul 2027 (Expected)",
    location: "Hong Kong",
    details: [
      "ELITE Stream — CUHK Engineering's selective, research-oriented undergraduate track; graduation thesis (ESTR4998/4999) held to first-year MPhil standards.",
      "Major GPA: 3.949 / 4.000 · Cumulative GPA: 3.773 / 4.000",
      "Selected coursework (all A): Calculus, Linear Algebra, Discrete Math, Complex Variables; Signals & Systems, Probability Models, Communication Systems; Data Structures, Digital Circuits & Computing Systems, Microcontrollers & Embedded Systems; Computer Networks, Cyber Security, Cryptography.",
    ],
  },
];

export const researchProjects: Project[] = [
  {
    title: "Agentic Video Screening for Efficient Activity Understanding in Elder Care",
    subtitle: "ESTR4998 / 4999 ELITE Graduation Thesis",
    role: "Thesis Student",
    period: "2026 — 2027",
    featured: true,
    videos: [
      { src: "/videos/activity-pipeline.mp4", poster: "/videos/activity-pipeline-poster.jpg", title: "Activity Understanding Pipeline" },
    ],
    motivation:
      "Continuous elder-care recordings contain long stretches of inactivity, yet current HAR pipelines apply uniformly across every frame — compute-heavy and surfacing many low-value alerts. This project focuses on a comparatively under-explored question: which moments actually warrant deep analysis, and how should those moments be summarised into clinician-facing reports?",
    approach:
      "A four-layer agentic framework in which an LLM screening agent decides, for each active segment, whether to invoke skeleton-HAR, video–language captioning, or nothing at all — then maintains a per-resident behavioural memory and autonomously writes structured, context-aware reports.",
    tags: [
      "LLM Agents",
      "ReAct",
      "Video-LLaVA",
      "Skeleton HAR",
      "ASR",
      "Behavioural Memory",
    ],
    highlights: [
      "Targets order-of-magnitude reduction in full-pipeline compute while raising actionability of clinician alerts",
      "Per-resident behavioural memory for context-aware longitudinal reporting",
      "Envisioned role: turning raw continuous recordings into structured activity understanding that clinicians can act on",
    ],
  },
  {
    title: "Learning by Living: Self-Evolving 3D Human Sensing",
    subtitle: "Summer Research Project · Supervisor: Prof. Guoliang Xing",
    role: "Research Assistant",
    period: "Ongoing",
    featured: true,
    videos: [
      { src: "/videos/3d-sensing.mp4", poster: "/videos/3d-sensing-poster.jpg", title: "Depth-to-3D Pose Estimation" },
      { src: "/videos/3d-sensing-2.mp4", poster: "/videos/3d-sensing-2-poster.jpg", title: "3D Activity Understanding" },
      { src: "/videos/action-recognition.mp4", poster: "/videos/action-recognition-poster.jpg", title: "Single-Person Action Recognition" },
    ],
    motivation:
      "The lab's in-home platform is depth-only for privacy-compliant deployment across every room. But depth-based 3D sensing inherits two gaps RGB does not face: depth lacks the strong foundation-model stack RGB enjoys (SAM, DINOv2, PromptHMR, …), and no labelled 3D human dataset exists for frail elderly populations. Can a depth-only 3D sensor bootstrap itself from RGB foundation models on paired RGB-D, and then keep improving on its own unlabelled deployment data?",
    approach:
      "A self-evolving 3D sensing paradigm: (i) bootstrap a depth-to-SMPL model from an RGB foundation model with no manual labels, (ii) self-improve via physics-grounded depth–mesh re-rendering consistency loss, (iii) personalise per resident through persistent deployment.",
    tags: [
      "PromptHMR",
      "SMPL",
      "Depth-to-3D",
      "Knowledge Distillation",
      "Self-supervised",
      "NTU RGB+D 120",
    ],
    evolution: [
      {
        label: "RGB Foundation Models on Paired Data",
        description:
          "PromptHMR generates pseudo-labels on NTU RGB+D 120 (27,720 videos). Automated pseudo-label pipeline with cross-frame tracking, outlier smoothing, and bbox-guided depth alignment.",
        outcome: "success",
      },
      {
        label: "Depth-to-SMPL Distillation",
        description:
          "Progressive fine-tuning: Phase A (heads only, MPJPE ≈ 96mm) → Phase B (transformer) → Phase C (ViT last 6 layers). In-house evaluation dataset built for held-out validation.",
        outcome: "ongoing",
      },
      {
        label: "Self-Improvement & Personalisation",
        description:
          "Physics-grounded depth–mesh re-rendering consistency loss for self-improvement on unlabelled deployment data. Per-resident personalisation through persistent deployment.",
        outcome: "ongoing",
      },
    ],
    highlights: [
      "Current contribution: step (i) — the depth-to-SMPL distillation pipeline with automated pseudo-labels and in-house evaluation dataset",
      "Envisioned role: privacy-compatible 3D-motion primitive for activity understanding in settings where RGB is not an option",
    ],
  },
];

export const researchExperience: ResearchExp[] = [
  {
    lab: "CUHK AIoT Lab",
    topic: "AI for Health",
    role: "UG Research Assistant",
    supervisor: "Prof. Guoliang Xing; with Xinyan Wang (Ph.D. student)",
    period: "Sep 2025 — Present",
    location: "Hong Kong",
    bullets: [
      {
        title: "3D body-pose sensing from depth",
        detail:
          "Extending the lab's ADMarker (MobiCom '24) platform with a label-free, depth-only 3D pose pipeline: a depth-to-SMPL model distilled from a strong RGB pose foundation model on paired RGB-D, then self-improved on unlabelled in-home depth data. Enables whole-home 3D sensing.",
      },
      {
        title: "Behavioural understanding & cross-modal review",
        detail:
          "Built an end-to-end perception stack (skeleton-based action recognition, video–language captioning, speaker-aware ASR + emotion), plus the temporal aligner and clinician dashboards now used for biomarker validation. Validated on ~21,600 depth-video and ~14,400 audio clips.",
      },
      {
        title: "Edge device management",
        detail:
          "Co-maintain 30+ Jetson Orin Nano / Xavier NX nodes within the lab's multi-site field deployment — remote fleet management, periodic state audits, and device-registry upkeep.",
      },
    ],
  },
  {
    lab: "CUHK Dept. of CSE",
    topic: "Deep Learning-based Mask Optimization",
    role: "Summer Research Intern",
    supervisor: "Prof. Bei Yu",
    period: "Jun 2025 — Aug 2025",
    location: "Hong Kong",
    bullets: [
      {
        title: "Conditional diffusion for physics-constrained generation",
        detail:
          "Built an end-to-end generative pipeline — conditional DDPM training, DDIM sampling, and classifier-free guidance (CFG++) — that synthesises images satisfying a known physical forward model, cast as conditional image-to-image translation.",
      },
      {
        title: "Physics-in-the-loss training",
        detail:
          "Paired standard generative losses (pixel, SSIM, Dice, edge) with a simulation-grounded consistency term that runs generated images through a pre-characterised physical forward model.",
      },
      {
        title: "Outcome",
        detail:
          "Outperformed iterative and GAN-based baselines on the standard inverse-lithography benchmark. Built working-level familiarity with modern conditional generative modelling — diffusion training, guided sampling, and physics-grounded losses.",
      },
    ],
  },
];

export const techStack = {
  "LLM, Agents & Generative AI": [
    "Ollama",
    "OpenAI JSON-mode",
    "ReAct",
    "RAG",
    "Conditional Diffusion",
    "Classifier-free Guidance",
    "Physics-grounded Losses",
    "Video-LLaVA",
    "MotionLLM",
  ],
  "Vision, Audio & Perception": [
    "SAM-3D",
    "OpenMMLab",
    "RTMPose",
    "MMAction2",
    "DINOv2",
    "PromptHMR",
    "Depth-to-SMPL",
    "Pyannote",
    "WhisperX",
    "Speech Emotion",
    "ffmpeg",
  ],
  "Edge & Systems": [
    "Jetson Orin/Xavier NX",
    "CUDA",
    "TensorRT",
    "Docker",
    "STM32",
    "Embedded C",
  ],
  "Web & Tools": [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Three.js",
    "Bun",
    "Python",
    "Git",
    "Linux",
  ],
};

export const openSource = {
  name: "agentic-video-understanding",
  url: "https://github.com/wwoneuserww/agentic-video-understanding",
  description:
    "Modular tooling for agentic LLM-driven long-form video understanding — clip segmentation, multimodal fusion, structured screening reports.",
};

export const awards: Award[] = [
  { title: "Dean's List", org: "Faculty of Engineering, CUHK", year: "2024–2025", certificate: "/images/awards/deans-list-2024-25.jpg" },
  { title: "College Head's List", org: "Shaw College, CUHK", year: "2024–2025", certificate: "/images/awards/college-heads-list-2024-25.jpg" },
  { title: "College Head's List", org: "Shaw College, CUHK", year: "2023–2024" },
  { title: "Department / Programme Scholarship", org: "Dept. of Information Engineering, CUHK", year: "2024–2025", certificate: "/images/awards/dept-scholarship-2024-25.jpg" },
  { title: "Department / Programme Scholarship", org: "Dept. of Information Engineering, CUHK", year: "2023–2024" },
  { title: "Summer Research Scholarship", org: "CUHK Faculty of Engineering", year: "Summer 2025" },
  { title: "First-Class Prize", org: "National High School Mathematics League, China", year: "2022", certificate: "/images/awards/math-league-2022.png" },
  { title: "First-Class Prize", org: "National High School Mathematics League, China", year: "2021", certificate: "/images/awards/math-league-2021.png" },
];
