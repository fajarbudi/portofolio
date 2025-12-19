import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Apex / Framer-like layout rewrite:
 * - Fullscreen hero (left copy, right image subject)
 * - Smooth bg blur on scroll (hero clear -> blur)
 * - Bottom pill nav (active = white)
 * - Sections appear after hero (Summary/About, Projects, Skills, Experience, Contact)
 * - Tailwind only, images via picsum
 */

const PROFILE = {
  openToWork: true,
  role: "WEB & MOBILE DEVELOPER",
  name: "Fajar Budi Raharjo",
  desc: "Saya membangun aplikasi web dan mobile end-to-end, dari UI sampai backend, dengan fokus pada performa, struktur yang rapi, dan pengalaman pengguna yang nyaman.",
  email: "fajarbudira@gmail.com",
  phone: "+62 89605877717",
  location: "Yogyakarta, ID",
  cvUrl: "#",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/fajar-budi-770227266/",
      icon: "linkedin",
    },
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "Twitter/X", href: "https://x.com", icon: "x" },
  ],
};

const TECH_CHIPS = ["Laravel", "Flutter", "React.js", "Next.js"];

const PROJECTS = [
  {
    title: "Monitoring & Evaluation System",
    desc: "Dashboard eksekutif, pelaporan berkala, dokumentasi realisasi, dan tracking kendala.",
    image: "https://picsum.photos/seed/apex-project-01/1200/900",
    href: "#",
  },
  {
    title: "Mobile Public Service",
    desc: "Aplikasi Flutter untuk layanan, notifikasi, tracking proses, dan offline-friendly.",
    image: "https://picsum.photos/seed/apex-project-02/1200/900",
    href: "#",
  },
  {
    title: "Company Profile + CMS",
    desc: "Website modern, SEO-ready, performa tinggi, dan panel admin konten.",
    image: "https://picsum.photos/seed/apex-project-03/1200/900",
    href: "#",
  },
  {
    title: "Admin Dashboard UI",
    desc: "Komponen reusable, data table, chart, dan layout konsisten untuk aplikasi internal.",
    image: "https://picsum.photos/seed/apex-project-04/1200/900",
    href: "#",
  },
];

const SKILLS = [
  { k: "Laravel", d: "Backend, REST API, Auth, RBAC" },
  { k: "Flutter", d: "Cross-platform mobile apps" },
  { k: "React.js", d: "Dashboard, SPA, components" },
  { k: "Next.js", d: "SSR/SSG, SEO, app router" },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    org: "PT Anauri",
    period: "2023 — Now",
    text: "Membangun sistem end-to-end: backend Laravel, dashboard React/Next, serta integrasi mobile Flutter.",
  },
  {
    role: "Mobile Developer",
    org: "PT Anauri",
    period: "2023 — 2024",
    text: "Membangun aplikasi Flutter multi-role, optimasi performa, caching, dan pola offline-first.",
  },
  {
    role: "Front-End",
    org: "Freelance",
    period: "2022 — 2023",
    text: "Membangun aplikasi Flutter multi-role, optimasi performa, caching, dan pola offline-first.",
  },
];

const SECTIONS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "summary", label: "Summary", icon: "summary" },
  { id: "experience", label: "Experience", icon: "bag" },
  { id: "projects", label: "Projects", icon: "summary" },
  { id: "skills", label: "Skills", icon: "bolt" },
  { id: "links", label: "Links", icon: "link" },
];

const SKILLS_TOOLS = [
  "API Design (REST)",
  "Authentication & RBAC",
  "Database Design",
  "Responsive Web Design",
  "Performance Optimization",
  "Reusable Component System",
  "State Management",
  "Testing & Debugging",
];

const TOOL_APPS = [
  { name: "Laravel", abbr: "La" },
  { name: "Flutter", abbr: "Fl" },
  { name: "React", abbr: "Re" },
  { name: "Next.js", abbr: "Ne" },
  { name: "Git", abbr: "Gt" },
  { name: "Docker", abbr: "Do" },
  { name: "Postman", abbr: "Po" },
  { name: "Figma", abbr: "Fi" },
];

const LANGUAGES = [
  { name: "Indonesia", value: 95 },
  { name: "English", value: 70 },
];

const EDUCATION_CERTS = [
  {
    title: "Software Developer Certificate",
    subtitle: "Hacker Rank",
    meta: "2025",
  },
  {
    title: "Frontend Developer Certificate",
    subtitle: "Hacker Rank",
    meta: "2025",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const refs = useRef({});
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);

  // Picsum hero subject (portrait-ish). Change seed if you want a better subject.
  // const HERO_IMG = "/background.png";
  const HERO_IMG = "https://picsum.photos/seed/apex-portrait-77/1600/2000";

  // Active section observer (nav highlight)
  useEffect(() => {
    const obs = [];
    ids.forEach((id) => {
      const el = refs.current[id];
      if (!el) return;
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { threshold: [0.35, 0.55] }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, [ids]);

  // Scroll-driven blur/dim (Framer-like: clear on home, blur when scrolling down)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--p", "0");
    root.style.setProperty("--blur", "0px");
    root.style.setProperty("--dim", "0.10");
    root.style.setProperty("--fade", "0");
    root.style.setProperty("--scale", "1");

    let raf = 0;

    const update = () => {
      const y = window.scrollY || 0;

      // blur kicks shortly after leaving hero area
      const start = 60;
      const range = 520;
      const t = clamp01((y - start) / range);
      const e = easeOutCubic(t);

      root.style.setProperty("--p", String(e));
      root.style.setProperty("--blur", `${e * 26}px`);
      root.style.setProperty("--dim", `${0.1 + e * 0.28}`); // 0.10 -> 0.38
      root.style.setProperty("--fade", `${e}`);
      root.style.setProperty("--scale", `${1 + e * 0.03}`);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* BACKGROUND LAYERS (fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* base */}
        <div className="absolute inset-0 bg-neutral-950" />

        {/* clear bg */}
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: `calc(1 - (var(--p, 0) * 0.55))`,
            transform: "scale(1.02)",
            transition: "opacity 180ms ease",
          }}
        />

        {/* blurred bg */}
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: "var(--fade, 0)",
            filter: "blur(var(--blur, 0px)) saturate(0.95)",
            transform: "scale(var(--scale, 1))",
            transition:
              "opacity 180ms ease, filter 180ms ease, transform 180ms ease",
          }}
        />

        {/* orange glow behind subject (center-right) */}
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_68%_42%,rgba(249,115,22,0.55),transparent_62%)]" />

        {/* dim on scroll */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: "var(--dim, 0.10)" }}
        />

        {/* left haze for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_18%,rgba(255,255,255,0.06),transparent_65%)]" />
      </div>

      {/* TOP BAR */}
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="pointer-events-auto flex items-center gap-3 text-sm text-white/85">
            <span
              className={[
                "h-2 w-2 rounded-full",
                PROFILE.openToWork ? "bg-emerald-400" : "bg-white/30",
              ].join(" ")}
            />
            <span className="font-medium">Open to work</span>
          </div>

          <a
            href={PROFILE.cvUrl}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-[0_14px_55px_-25px_rgba(250,204,21,0.95)] hover:bg-yellow-300 transition"
          >
            Download CV
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10">
        {/* HERO FULLSCREEN */}
        <section
          id="home"
          ref={(el) => (refs.current.home = el)}
          className="min-h-screen scroll-mt-28"
        >
          <div className="mx-auto max-w-6xl px-6 pt-24 pb-10">
            <div className="grid items-center gap-12 md:grid-cols-12">
              {/* LEFT COPY */}
              <div className="md:col-span-7">
                <div className="text-yellow-400/90 text-sm font-semibold tracking-widest">
                  {PROFILE.role}
                </div>

                <h1 className="mt-4 text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                  {PROFILE.name}
                </h1>

                <p className="mt-6 max-w-[560px] text-white/80 leading-relaxed">
                  {PROFILE.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {TECH_CHIPS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 text-sm text-white/85 md:grid-cols-2 max-w-[520px]">
                  <InfoRow icon="mail" text={PROFILE.email} />
                  <InfoRow icon="phone" text={PROFILE.phone} />
                  <InfoRow
                    icon="linkedin"
                    text="www.linkedin.com/in/fajar-budi-770227266/"
                  />
                  <InfoRow icon="pin" text={PROFILE.location} />
                </div>
              </div>

              {/* RIGHT SUBJECT (like Framer) */}
              <div className="relative md:col-span-5 hidden md:block">
                <div className="relative h-[72vh] min-h-[520px] w-full">
                  {/* subject image clipped */}
                  {/* <img
                    src={HERO_IMG}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      // push subject to right
                      objectPosition: "70% 30%",
                      // soften edges like template
                      WebkitMaskImage:
                        "radial-gradient(70% 80% at 55% 40%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 78%)",
                      maskImage:
                        "radial-gradient(70% 80% at 55% 40%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 78%)",
                      opacity: 0.95,
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT AFTER HERO */}
        <div className="mx-auto max-w-6xl px-6 pb-40">
          {/* SUMMARY */}
          <section
            id="summary"
            ref={(el) => (refs.current.summary = el)}
            className="scroll-mt-28"
          >
            <h2 className="text-5xl font-extrabold text-yellow-400 tracking-tight">
              Summary
            </h2>

            <div className="mt-6 max-w-[720px] space-y-5 text-white/80 leading-relaxed">
              <p>
                Saya berpengalaman membangun aplikasi web & mobile yang rapi,
                scalable, dan mudah dirawat. Saya mengutamakan struktur kode,
                performa, dan UX yang konsisten lintas platform.
              </p>
              <p>
                Saya terbiasa bekerja dengan kebutuhan pemerintahan maupun
                bisnis: modul pelaporan, dashboard eksekutif, manajemen data,
                hingga integrasi API untuk mobile.
              </p>
            </div>

            {/* Big quote box like template */}
            <div className="mt-8 max-w-[760px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-7">
              <div className="flex gap-6">
                <div className="w-1 rounded-full bg-yellow-400" />
                <div className="text-2xl md:text-3xl font-extrabold leading-snug">
                  Saya senang membangun produk yang{" "}
                  <span className="text-white">cepat</span>,{" "}
                  <span className="text-white">terukur</span>, dan{" "}
                  <span className="text-white">mudah digunakan</span> — dari ide
                  sampai rilis.
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section
            id="experience"
            ref={(el) => (refs.current.experience = el)}
            className="mt-16 scroll-mt-28"
          >
            <h2 className="text-5xl font-extrabold text-yellow-400 tracking-tight">
              Work Experience
            </h2>

            <div className="mt-10 max-w-[860px] space-y-6">
              {EXPERIENCE.map((e) => (
                <div
                  key={e.role}
                  className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-6"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-white font-semibold text-lg">
                        {e.role}
                      </div>
                      <div className="text-sm text-white/65">{e.org}</div>
                    </div>
                    <div className="text-sm text-white/55">{e.period}</div>
                  </div>

                  <p className="mt-4 text-white/75 leading-relaxed">{e.text}</p>

                  {/* optional bullets: bikin lebih hidup */}
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      Membangun modul, API, dan integrasi lintas platform.
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      Fokus pada struktur, performa, dan maintainability.
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section
            id="projects"
            ref={(el) => (refs.current.projects = el)}
            className="mt-16 scroll-mt-28"
          >
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-5xl font-extrabold text-yellow-400 tracking-tight">
                Projects
              </h2>

              <a
                href="#links"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("links");
                }}
                className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/15 transition"
              >
                Hire / Contact →
              </a>
            </div>

            <p className="mt-4 max-w-[720px] text-white/70 leading-relaxed">
              Beberapa project pilihan untuk menunjukkan flow kerja end-to-end:
              backend, dashboard web, hingga mobile apps.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {PROJECTS.map((p) => (
                <ProjectCardWide key={p.title} {...p} />
              ))}
            </div>
          </section>

          <section
            id="skills"
            ref={(el) => (refs.current.skills = el)}
            className="mt-16 scroll-mt-28"
          >
            <SectionSkillsTools />
            <SectionToolGrid />
            {/* <SectionLanguages /> */}
            <SectionEducationCerts />
          </section>

          {/* SKILLS */}
          {/* <section
            id="skills"
            ref={(el) => (refs.current.skills = el)}
            className="mt-16 scroll-mt-28"
          >
            <h2 className="text-5xl font-extrabold text-yellow-400 tracking-tight">
              Skills
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {SKILLS.map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-sm font-bold">
                    {s.k.slice(0, 2)}
                  </div>
                  <div className="mt-4 font-semibold">{s.k}</div>
                  <div className="mt-1 text-xs text-white/70">{s.d}</div>
                </div>
              ))}
            </div>
          </section> */}

          {/* LINKS / CONTACT */}
          <section
            id="links"
            ref={(el) => (refs.current.links = el)}
            className="mt-16 scroll-mt-28"
          >
            <h2 className="text-5xl font-extrabold text-yellow-400 tracking-tight">
              Links
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {PROFILE.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur hover:bg-white/15 transition"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                  {s.label}
                </a>
              ))}
            </div>

            <div className="mt-10 max-w-[760px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-6">
              <div className="text-white font-semibold">Contact</div>
              <p className="mt-2 text-sm text-white/70">
                Default memakai mailto (nanti bisa kamu sambungkan ke Laravel).
              </p>
              <ContactForm emailTo={PROFILE.email} />
            </div>

            <div className="mt-10 text-sm text-white/55">
              © {new Date().getFullYear()} • Portfolio
            </div>
          </section>
        </div>
      </main>

      {/* RIGHT-BOTTOM like template */}
      <div className="fixed bottom-24 right-6 z-20 hidden md:flex flex-col gap-2">
        <a
          href="#links"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("links");
          }}
          className="rounded-xl bg-yellow-400 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-[0_18px_70px_-35px_rgba(250,204,21,0.95)] hover:bg-yellow-300 transition"
        >
          Get in Touch
        </a>
        <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950">
          Made with Tailwind
        </div>
      </div>

      {/* BOTTOM PILL NAV (Framer-like) */}
      <nav className="fixed bottom-6 left-1/2 z-30 w-[min(920px,92vw)] -translate-x-1/2">
        <div className="rounded-full bg-white/12 border border-white/10 backdrop-blur-xl shadow-[0_30px_100px_-60px_rgba(0,0,0,0.95)] px-2 py-2">
          <div className="flex items-center gap-2">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={[
                    "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-white text-neutral-900 shadow-[0_16px_55px_-35px_rgba(255,255,255,0.85)]"
                      : "text-white/85 hover:bg-white/10",
                  ].join(" ")}
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

/* ---------------- helpers ---------------- */
function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ---------------- components ---------------- */
function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 backdrop-blur">
        <Icon name={icon} className="h-5 w-5 text-yellow-400" />
      </span>
      <span className="truncate">{text}</span>
    </div>
  );
}

function MiniProject({ title, desc, image, href }) {
  return (
    <a
      href={href}
      className="group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/10 to-transparent" />
        <div className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-black/40 border border-white/10">
          <Icon name="arrow" className="h-4 w-4 text-white/85" />
        </div>
      </div>
      <div className="p-5">
        <div className="font-semibold">{title}</div>
        <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>
      </div>
    </a>
  );
}

function SectionSkillsTools() {
  return (
    <section className="mt-16 scroll-mt-28">
      <h2 className="text-5xl font-extrabold text-yellow-400 tracking-tight">
        Skills & Tools
      </h2>

      <div className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2 max-w-[760px]">
        {SKILLS_TOOLS.map((s) => (
          <div key={s} className="flex items-center gap-3 text-white/85">
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="text-sm font-medium">{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionToolGrid() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-5 max-w-[760px]">
        {TOOL_APPS.map((t) => (
          <div key={t.name} className="flex flex-col items-start gap-2">
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/10 backdrop-blur flex items-center justify-center">
              <span className="text-sm font-extrabold text-white/90">
                {t.abbr}
              </span>
            </div>
            <div className="text-xs text-white/70">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionLanguages() {
  return (
    <section className="mt-12">
      <div className="text-yellow-400/90 text-sm font-semibold tracking-widest">
        LANGUAGES
      </div>

      <div className="mt-5 max-w-[520px] space-y-4">
        {LANGUAGES.map((l) => (
          <div key={l.name} className="grid gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/85 font-medium">{l.name}</span>
              <span className="text-white/45">{l.value}%</span>
            </div>

            <div className="h-2 rounded-full bg-white/10 border border-white/10 overflow-hidden">
              <div
                className="h-full bg-yellow-400"
                style={{ width: `${l.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionEducationCerts() {
  return (
    <section className="mt-12">
      <div className="text-yellow-400/90 text-sm font-semibold tracking-widest">
        CERTIFICATES
      </div>

      <div className="mt-5 max-w-[760px] space-y-6">
        {EDUCATION_CERTS.map((e) => (
          <div key={e.title} className="flex gap-4">
            <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400" />

            <div className="min-w-0">
              <div className="text-white font-semibold">{e.title}</div>
              <div className="text-sm text-white/65">{e.subtitle}</div>
              <div className="text-sm text-yellow-400/90 mt-1">{e.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCardWide({ title, desc, image, href }) {
  return (
    <a
      href={href}
      className="group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
        <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/40 border border-white/10">
          <Icon name="arrow" className="h-4 w-4 text-white/85" />
        </div>
      </div>

      <div className="p-6">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>

        <div className="mt-4 inline-flex items-center gap-2 text-sm text-yellow-400/90">
          View case study{" "}
          <span className="translate-x-0 group-hover:translate-x-1 transition">
            →
          </span>
        </div>
      </div>
    </a>
  );
}

function ContactForm({ emailTo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Contact — ${name || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`
    );
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="mt-5 grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400/60"
            placeholder="Nama Anda"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400/60"
            placeholder="email@domain.com"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-white/70">Message</span>
        <textarea
          rows={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full resize-none rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400/60"
          placeholder="Tulis pesan Anda..."
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-yellow-300 transition"
      >
        <Icon name="send" className="h-5 w-5" />
        Send Message
      </button>
    </form>
  );
}

/* ---------------- icons ---------------- */
function Icon({ name, className = "h-5 w-5" }) {
  const stroke = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "home":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "summary":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M8 6h13" />
          <path d="M8 12h13" />
          <path d="M8 18h13" />
          <path d="M3 6h.01" />
          <path d="M3 12h.01" />
          <path d="M3 18h.01" />
        </svg>
      );
    case "bag":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M6 7V6a6 6 0 0 1 12 0v1" />
          <rect x="4" y="7" width="16" height="14" rx="2" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />
        </svg>
      );
    case "link":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
          <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M7 17 17 7" />
          <path d="M10 7h7v7" />
        </svg>
      );
    case "mail":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" />
          <path d="M4 6l8 7 8-7" />
        </svg>
      );
    case "phone":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "send":
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <path d="M22 2 11 13" />
          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      );

    // socials (filled)
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23h-4V8.5z" />
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.5.11-3.13 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.18 3.17-1.18.63 1.63.23 2.83.12 3.13.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.28 5.69.41.35.78 1.04.78 2.1v3.12c0 .31.2.67.8.56 4.57-1.53 7.86-5.86 7.86-10.96C23.5 5.74 18.27.5 12 .5z" />
        </svg>
      );
    case "x":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.5l-5.1-6.7L5.8 22H2.7l7.3-8.4L1 2h6.7l4.6 6.1L18.9 2zm-1.1 18h1.7L6.7 3.9H4.9L17.8 20z" />
        </svg>
      );
    default:
      return (
        <svg {...stroke} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
