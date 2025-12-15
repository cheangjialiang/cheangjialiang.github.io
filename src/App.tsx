import { useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type NavItem = { label: string; href: `#${string}` };

type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
};

type SkillGroup = {
  title: string;
  skills: string[];
};

const CV_PDF_HREF = `/${encodeURIComponent("Leo's CV.pdf")}`;

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const buttonBase =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer";
const buttonPrimary =
  "bg-amber-700 text-white hover:shadow-md focus-visible:outline-amber-700 dark:bg-amber-400 dark:text-slate-950 dark:focus-visible:outline-amber-300";
const buttonSecondary =
  "border border-amber-200 bg-white/70 text-amber-900 hover:border-amber-300 hover:bg-white hover:text-amber-900 focus-visible:outline-amber-700 dark:border-amber-300/40 dark:bg-amber-300/10 dark:text-amber-50 dark:hover:border-amber-200/60 dark:hover:bg-amber-300/15 dark:hover:text-white dark:focus-visible:outline-amber-200";

const impactBadges = [
  "MES reliability & HA",
  "Manufacturing BI dashboards",
  "Legacy -> modern web",
  "Shop-floor UX",
];

function Icon({
  name,
  className = "h-4 w-4",
}: {
  name: "mail" | "linkedin" | "github";
  className?: string;
}) {
  if (name === "mail") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
      >
        <path d="M4.98 3.5a2.49 2.49 0 1 1 0 4.98 2.49 2.49 0 0 1 0-4.98ZM5 9.23H2v11.27h3V9.23ZM9 9.23v11.27h3v-5.98c0-1.58.53-2.66 1.86-2.66 1.03 0 1.55.74 1.55 2.45v6.19h3v-6.64c0-2.94-1.5-4.32-3.5-4.32-1.6 0-2.47.88-2.88 1.62h-.04l.02-1.39H9Z" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.73 18.77.5 12 .5Z" />
    </svg>
  );
}
function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-7">
        <div className="mb-8">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-widest text-slate-500 dark:text-white/55">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 dark:border-amber-300/50 dark:bg-amber-300/10 dark:text-amber-50">
      {children}
    </span>
  );
}

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]",
        className,
      )}
      data-reveal
    >
      {children}
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950 hover:decoration-slate-400 dark:text-white/80 dark:decoration-white/20 dark:hover:text-white dark:hover:decoration-white/50"
    >
      {children}
    </a>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cx(buttonBase, buttonPrimary)}
    >
      {children}
    </a>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cx(buttonBase, buttonSecondary)}
    >
      {children}
    </a>
  );
}

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: Theme;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cx(
        buttonBase,
        "px-3 py-2",
        buttonSecondary,
        "shadow-sm hover:shadow-md",
      )}
    >
      {theme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
          <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 109.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <div className="text-base font-semibold text-slate-950 dark:text-white">
            {item.role}
          </div>
          <p className="text-sm text-slate-600 dark:text-white/70">
            {item.company}
          </p>
        </div>
        <div className="justify-self-end pt-1">
          <p className="text-xs font-medium text-slate-500 dark:text-white/55">
          {item.period}
        </p>
        </div>
        
      </div>
      {item.location ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-white/50">
          {item.location}
        </p>
      ) : null}
      <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-white/80">
        {item.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-slate-400 dark:bg-white/50" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ProjectCard({
  title,
  description,
  highlights,
}: {
  title: string;
  description: string;
  highlights: string[];
}) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex-1">
        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/75">
          {description}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {highlights.map((h) => (
          <Pill key={h}>{h}</Pill>
        ))}
      </div>
    </Card>
  );
}

function QuoteCard({
  imageSrc,
  quote,
  author,
}: {
  imageSrc: string;
  quote: string;
  author: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm sm:min-h-[250px] dark:border-white/10 dark:bg-white/5"
      data-reveal
    >
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={quote}
          className="h-full w-full object-fill opacity-90 transition duration-700 group-hover:scale-[1.03] dark:opacity-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/25 to-white/5 dark:from-slate-950/70 dark:via-slate-950/35 dark:to-slate-950/10" />
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      ? "dark"
      : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const experiences: Experience[] = [
    {
      company: "Thermo Fisher Scientific",
      role: "IT Infrastructure & Application Sr Engineer",
      period: "May 2019 - Present",
      location: "Singapore",
      bullets: [
        "Own MES administration: performance tuning, enhancements, maintenance, and real-time monitoring.",
        "Delivered OEE and manufacturing KPI dashboards for real-time operational visibility.",
        "Designed and implemented a High Availability module to improve MES reliability and uptime.",
        "Modernized Legacy -> modern web tools with Node.js/Bun + Astro and TailwindCSS.",
        "Recognized as Power BI/Power Query SME; led trainings and cross-site GenAI adoption as an AI Ambassador.",
      ],
    },
    {
      company: "ams AG",
      role: "IT Business Service Staff Engineer",
      period: "Jul 2017 — Apr 2019",
      location: "Singapore (Tampines & Ang Mo Kio)",
      bullets: [
        "Pioneer IT member for fab startup; drove infrastructure coordination and enterprise app integration.",
        "System administrator for MES applications (PROMIS and related ecosystem).",
        "Built enterprise interfaces and workflows (MES ↔ ERP/SAP; BPM; HR time management).",
        "Managed site-level projects and budgets; served as technical consultant to the local IT team.",
      ],
    },
    {
      company: "GlobalFoundries Pte. Ltd.",
      role: "Senior CIM Engineer (Computer Integrated Manufacturing)",
      period: "Oct 2014 — Jun 2017",
      location: "Singapore",
      bullets: [
        "Delivered MES enhancements and operations support: troubleshooting, monitoring, patches/releases.",
        "Built and maintained interfaces between MES, equipment automation, and reporting teams.",
        "Worked across mixed environments (Unix/Linux/Windows) and stacks (C/C++, shell, Oracle, JSP, VB.NET).",
      ],
    },
    {
      company: "AU Optronics Corporation",
      role: "Senior Engineer (Equipment Software, CIM Engineering)",
      period: "Sep 2010 — Sep 2014",
      location: "Taiwan / Xiamen (project work)",
      bullets: [
        "Developed factory software for functional test control and production automation.",
        "Delivered yield improvement systems (e.g., De‑Mura) integrating PLC/cameras and production tooling.",
        "Owned requirement gathering, design, implementation, and rollout with cross-site teams.",
      ],
    },
  ];

  const skills: SkillGroup[] = [
    {
      title: "Software & Data",
      skills: [
        "Python",
        "Oracle PL/SQL",
        "JavaScript/TypeScript",
        "Node.js/Bun",
        "TailwindCSS",
        "Power BI",
        "SSRS/SSIS",
        "Oracle APEX",
      ],
    },
    {
      title: "Manufacturing IT / MES",
      skills: [
        "MES administration",
        "System integration",
        "Monitoring & uptime",
        "Change management",
      ],
    },
    {
      title: "ML / GenAI",
      skills: [
        "TensorFlow",
        "LightGBM",
        "LSTM",
        "Ultralytics YOLO",
        "AWS SageMaker",
        "Rapid prototyping",
      ],
    },
    {
      title: "Infra & Ops",
      skills: [
        "Windows/Linux",
        "Databases",
        "Servers",
        "Dashboards & reporting",
        "Stakeholder management",
      ],
    },
  ];

  return (
    <div className="min-h-dvh bg-amber-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="bg-grid-slate" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-amber-300/70 blur-3xl dark:bg-amber-500/25" />
        <div className="absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-orange-300/70 blur-3xl dark:bg-orange-500/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.06),rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0)_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,251,235,0.0),rgba(255,251,235,1))] dark:bg-[linear-gradient(to_bottom,rgba(15,23,42,0.0),rgba(15,23,42,1))]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-7">
          <a href="#" className="group inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/5 text-sm font-bold tracking-tight text-slate-900 ring-1 ring-slate-900/10 dark:bg-white/10 dark:text-white/90 dark:ring-white/15">
              LC
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-slate-950 dark:text-white/90 dark:group-hover:text-white">
              Cheang Jia Liang
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 hover:text-slate-950 dark:text-white/70 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            />
            <SecondaryButton href={CV_PDF_HREF}>Download CV</SecondaryButton>
            <PrimaryButton href="#contact">Let’s talk</PrimaryButton>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/60 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm md:hidden dark:border-white/10 dark:bg-white/5 dark:text-white/90"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-950/25 backdrop-blur dark:bg-slate-950/70"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs border-l border-slate-200/70 bg-white p-6 dark:border-white/10 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-white/90">
                Navigation
              </p>
              <button
                className="rounded-lg border border-slate-300 bg-white/60 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/90"
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-900/5 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-semibold text-slate-900 dark:text-white/85">
                  Theme
                </p>
                <ThemeToggle
                  theme={theme}
                  onToggle={() =>
                    setTheme((t) => (t === "dark" ? "light" : "dark"))
                  }
                />
              </div>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={CV_PDF_HREF}
                className="mt-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-7 sm:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1.25fr,0.75fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                Manufacturing IT • MES • BI • Modern Web Apps
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                Leo Cheang
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-white/75">
                I build reliable manufacturing systems and modern tools that help
                operations move faster—combining MES expertise, pragmatic
                engineering, and data-driven decision support.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {impactBadges.map((badge) => (
                  <Pill key={badge}>{badge}</Pill>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <PrimaryButton href={CV_PDF_HREF}>Download CV (PDF)</PrimaryButton>
                <SecondaryButton href="mailto:jialiang.cheang@gmail.com">
                  <span className="flex items-center gap-2">
                    <Icon name="mail" />
                    Email
                  </span>
                </SecondaryButton>
                <SecondaryButton href="https://www.linkedin.com/in/leocheang/">
                  <span className="flex items-center gap-2">
                    <Icon name="linkedin" />
                    LinkedIn
                  </span>
                </SecondaryButton>
                <SecondaryButton href="https://github.com/cheangjialiang">
                  <span className="flex items-center gap-2">
                    <Icon name="github" />
                    GitHub
                  </span>
                </SecondaryButton>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <Card>
                  <p className="text-3xl font-semibold text-slate-950 dark:text-white">
                    15+
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                    Years in Manufacturing IT
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                    Reliability first
                  </p>
                </Card>
                <Card>
                  <p className="text-3xl font-semibold text-slate-950 dark:text-white">
                    24/7
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                    MES admin, integration & uptime
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                    HA + monitoring
                  </p>
                </Card>
                <Card>
                  <p className="text-3xl font-semibold text-slate-950 dark:text-white">
                    Live
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                    Dashboards & decision support
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">
                    KPI visibility
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Section id="about" title="About" eyebrow="Summary">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-white/80">
                I’m a Singapore-based engineer specializing in Manufacturing IT,
                with deep experience in MES administration, system integration,
                and business intelligence solutions. I’m known for being highly
                adaptable, dependable, and effective in cross-functional
                environments—bridging business needs with technical execution.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>MES administration</Pill>
                <Pill>Manufacturing dashboards</Pill>
                <Pill>System reliability</Pill>
                <Pill>Digital transformation</Pill>
                <Pill>Modern web apps</Pill>
              </div>
            </Card>

            <Card>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-white/80">
                I also enjoy rapid prototyping and applied ML/GenAI in
                manufacturing contexts—from hackathons to internal training—so
                teams can explore practical automation and smarter workflows.
              </p>
              <div className="mt-5 space-y-2 text-sm text-slate-700/85 dark:text-white/75">
                <p>
                  <span className="text-slate-900 dark:text-white/90">
                    Email:
                  </span>{" "}
                  <ExternalLink href="mailto:jialiang.cheang@gmail.com">
                    <span className="inline-flex items-center gap-2">
                      <Icon name="mail" />
                      jialiang.cheang@gmail.com
                    </span>
                  </ExternalLink>
                </p>
                <p>
                  <span className="text-slate-900 dark:text-white/90">
                    LinkedIn:
                  </span>{" "}
                  <ExternalLink href="https://www.linkedin.com/in/leocheang/">
                    <span className="inline-flex items-center gap-2">
                      <Icon name="linkedin" />
                      linkedin.com/in/leocheang
                    </span>
                  </ExternalLink>
                </p>
                <p>
                  <span className="text-slate-900 dark:text-white/90">
                    GitHub:
                  </span>{" "}
                  <ExternalLink href="https://github.com/cheangjialiang">
                    <span className="inline-flex items-center gap-2">
                      <Icon name="github" />
                      github.com/cheangjialiang
                    </span>
                  </ExternalLink>
                </p>
              </div>
            </Card>
          </div>

          <div className="grid mt-6 grid-cols-1 gap-4 lg:grid-cols-3">
              <QuoteCard
                imageSrc="/images/If-I-cannot-do-great-things-I-can-do-small-things-in-a-great-way.jpg"
                quote="If I cannot do great things, I can do small things in a great way."
                author="Martin Luther King Jr."
              />
              <QuoteCard
                imageSrc="/images/life-is-like-riding-a-bicycle-in-order-to-keep-your-balance-you-must-keep-moving.jpg"
                quote="Life is like riding a bicycle; to keep your balance, you must keep moving."
                author="Albert Einstein"
              />
              <QuoteCard
                imageSrc="/images/My-mission-in-life-is-not-to-survive-but-to-thrive.jpg"
                quote="My mission is not to survive, but to thrive—with passion, compassion, humour and style."
                author="Maya Angelou"
              />
            </div>
        </Section>

        <Section id="experience" title="Experience" eyebrow="Timeline">
          <div className="relative mt-6 space-y-8">
            <div className="absolute left-4 top-2 h-full w-px bg-amber-200/90 dark:bg-amber-300/30" aria-hidden />
            {experiences.map((item) => (
              <div
                key={`${item.company}-${item.role}`}
                className="relative pl-10"
                data-reveal
              >
                <span className="absolute left-[6px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 ring-4 ring-white/70 dark:ring-amber-300/30" />
                <div className="rounded relative overflow-hidden bg-gradient-to-r from-amber-50/90 via-amber-200/20 to-amber-200/30 p-5 ring-1 ring-amber-200/80 backdrop-blur dark:from-amber-900/25 dark:via-amber-900/20 dark:to-amber-900/10 dark:ring-amber-300/25">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(234,179,8,0.08),transparent_30%)]" aria-hidden />
                  <div className="relative flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-white/70">
                        {item.company}
                        {item.location ? ` • ${item.location}` : ""}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/90 dark:bg-white/10 dark:text-white/85 dark:ring-white/10 opacity-95">
                      {item.period}
                    </span>
                  </div>
                  <ul className="relative mt-4 space-y-2 text-sm text-slate-700 dark:text-white/80">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-slate-400 dark:bg-white/50" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>
        
        <Section id="skills" title="Skills" eyebrow="Toolbox">
          <div className="grid gap-6 lg:grid-cols-2">
            {skills.map((g) => (
              <Card key={g.title}>
                <h3 className="text-base font-semibold dark:text-white">{g.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="education"
          title="Education & Recognition"
          eyebrow="Background"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                Education
              </h3>
              <div className="mt-4 space-y-4 text-sm text-slate-700 dark:text-white/80">
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white/90">
                    Master of Computer Science & Information Engineering
                  </p>
                  <p className="text-slate-600 dark:text-white/70">
                    National Ji‑Nan University (Taiwan), Jul 2010
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white/90">
                    Bachelor of Computer Science & Information Engineering
                  </p>
                  <p className="text-slate-600 dark:text-white/70">
                    National Ji‑Nan University (Taiwan), Sep 2008
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                Awards & certificates
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-white/80">
                <li className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-slate-400 dark:bg-white/50" />
                  <span>
                    Power BI / Power Query training SME award (Thermo Fisher
                    Scientific).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-slate-400 dark:bg-white/50" />
                  <span>Applied Materials PROMIS MES system administrator (2019).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-slate-400 dark:bg-white/50" />
                  <span>
                    AUO Tech Fair most voted award – Smart Factory project (2013).
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section id="contact" title="Contact" eyebrow="Let’s build something reliable">
          <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
            <Card>
              <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                Open to collaborations & opportunities
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/75">
                If you’re building manufacturing systems, modernizing legacy
                tooling, or improving operational visibility with dashboards and
                data products, I’d love to connect.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="mailto:jialiang.cheang@gmail.com">
                  <span className="flex items-center gap-2">
                    <Icon name="mail" />
                    Email me
                  </span>
                </PrimaryButton>
                <SecondaryButton href="https://www.linkedin.com/in/leocheang/">
                  <span className="flex items-center gap-2">
                    <Icon name="linkedin" />
                    Message on LinkedIn
                  </span>
                </SecondaryButton>
                <SecondaryButton href="https://github.com/cheangjialiang">
                  <span className="flex items-center gap-2">
                    <Icon name="github" />
                    GitHub
                  </span>
                </SecondaryButton>
                <SecondaryButton href={CV_PDF_HREF}>Download CV</SecondaryButton>
              </div>
            </Card>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200/70 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:text-white/60">
          <p>© {new Date().getFullYear()} Cheang Jia Liang.</p>
          <p className="text-slate-500 dark:text-white/50">
            Built with React + TailwindCSS. Deployed via GitHub Actions.
          </p>
        </div>
      </footer>
    </div>
  );
}
