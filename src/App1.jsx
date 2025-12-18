import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Portfolio Modern (JSX + Tailwind)
 * - Sections: Hero, About, Projects, Skills, Experience, Contact
 * - Interaktif: navbar active section, filter project, modal detail, smooth scroll, copy email
 * - Dark gradient UI
 */

const socialLinks = [
  { label: "GitHub", href: "https://github.com/USERNAME", icon: "🐙" },
  { label: "LinkedIn", href: "https://linkedin.com/in/USERNAME", icon: "💼" },
  { label: "Twitter/X", href: "https://x.com/USERNAME", icon: "𝕏" },
  { label: "Email", href: "mailto:you@example.com", icon: "✉️" },
];

const skills = [
  { group: "Backend", items: ["Laravel", "REST API", "Auth/JWT", "MySQL/PostgreSQL"] },
  { group: "Mobile", items: ["Flutter", "Dart", "State Management", "Firebase"] },
  { group: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "TypeScript (opsional)"] },
  { group: "Tools", items: ["Git/GitHub", "CI/CD (opsional)", "Docker (opsional)", "Figma (opsional)"] },
];

const projectsData = [
  {
    title: "SMEP Dashboard",
    role: "Fullstack",
    stack: ["Laravel", "React", "MySQL"],
    type: "Web App",
    year: "2025",
    desc:
      "Aplikasi monitoring & evaluasi kegiatan, executive report, pelaporan berkala, dan dokumentasi realisasi.",
    highlights: ["Role-based access", "Executive dashboard", "Export laporan", "Upload foto bukti"],
    links: {
      demo: "#",
      repo: "#",
    },
  },
  {
    title: "NAWIGI Mobile",
    role: "Mobile Developer",
    stack: ["Flutter", "Firebase"],
    type: "Mobile App",
    year: "2025",
    desc:
      "Aplikasi layanan digital untuk warga: administrasi, informasi, UMKM, dan integrasi notifikasi.",
    highlights: ["Push notification", "Offline-first (opsional)", "Analytics", "Modular architecture"],
    links: { demo: "#", repo: "#" },
  },
  {
    title: "Company Profile + CMS",
    role: "Frontend/Backend",
    stack: ["Next.js", "Laravel"],
    type: "Website",
    year: "2024",
    desc:
      "Website company profile modern dengan CMS sederhana untuk mengelola konten, blog, dan portfolio.",
    highlights: ["SEO-ready", "Fast performance", "Reusable components", "Admin panel"],
    links: { demo: "#", repo: "#" },
  },
];

const experienceData = [
  {
    company: "Freelance / Consultant",
    title: "Web & Mobile Developer",
    period: "2022 — Sekarang",
    points: [
      "Membangun aplikasi web berbasis Laravel (API, dashboard, RBAC).",
      "Mengembangkan aplikasi Flutter untuk kebutuhan layanan publik & bisnis.",
      "Menerapkan UI modern (React/Next) dengan fokus performa & UX.",
    ],
  },
  {
    company: "In-house Project",
    title: "Fullstack Developer",
    period: "2020 — 2022",
    points: [
      "Mengembangkan sistem internal: modul data, pelaporan, dan integrasi layanan.",
      "Kolaborasi lintas fungsi: analisis kebutuhan, delivery, dan maintenance.",
    ],
  },
];

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pilih yang paling terlihat
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65, 0.8], rootMargin: "-15% 0px -70% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

export default function PortfolioPage() {
  const sectionIds = useMemo(
    () => ["home", "about", "projects", "skills", "experience", "contact"],
    []
  );
  const active = useActiveSection(sectionIds);

  const [query, setQuery] = useState("");
  const [chip, setChip] = useState("All");
  const [openProject, setOpenProject] = useState(null);
  const [copied, setCopied] = useState(false);

  const allChips = useMemo(() => {
    const set = new Set(["All"]);
    projectsData.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projectsData.filter((p) => {
      const matchChip = chip === "All" ? true : p.stack.includes(chip);
      const hay = `${p.title} ${p.role} ${p.type} ${p.year} ${p.desc} ${p.stack.join(" ")}`.toLowerCase();
      const matchQuery = !q ? true : hay.includes(q);
      return matchChip && matchQuery;
    });
  }, [chip, query]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("you@example.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback
      window.location.href = "mailto:you@example.com";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-fuchsia-500/30 selection:text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollTo("home")}
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-white/5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20">
              ⚡
            </span>
            <div className="leading-tight text-left">
              <div className="text-sm font-semibold tracking-tight">Your Name</div>
              <div className="text-xs text-zinc-400">Web & Mobile Developer</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={classNames(
                  "rounded-xl px-3 py-2 text-sm transition",
                  active === id ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {id === "home"
                  ? "Home"
                  : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/10 transition hover:bg-white/15 hover:ring-white/20"
            >
              {copied ? "Copied!" : "Copy Email"}
              <span className="text-zinc-300">📋</span>
            </button>
            <a
              href="#"
              className="hidden rounded-xl bg-gradient-to-r from-fuchsia-500/90 to-cyan-400/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:opacity-95 md:inline-flex"
            >
              Download CV
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4">
        {/* HERO */}
        <section id="home" className="pt-14 md:pt-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
                Available for freelance / project-based
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Web & Mobile Developer
                <span className="block bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                  Laravel • Flutter • React • Next.js
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-zinc-300">
                Saya membangun aplikasi yang cepat, rapi, dan siap scale —
                dari backend API (Laravel) sampai mobile (Flutter) dan frontend modern (React/Next).
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 transition hover:bg-white/15 hover:ring-white/20"
                >
                  Lihat Project
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-xl bg-gradient-to-r from-fuchsia-500/90 to-cyan-400/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:opacity-95"
                >
                  Hubungi Saya
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <span className="text-base">{s.icon}</span>
                    <span className="text-xs text-zinc-300">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-300">Quick Snapshot</p>
                    <p className="mt-1 text-xl font-semibold">Build. Ship. Iterate.</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-zinc-300 ring-1 ring-white/10">
                    Jakarta / Remote
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { k: "Focus", v: "Fullstack & Mobile" },
                    { k: "Backend", v: "Laravel API" },
                    { k: "Frontend", v: "React / Next" },
                    { k: "Mobile", v: "Flutter" },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-2xl bg-zinc-950/40 p-4 ring-1 ring-white/10 transition hover:bg-zinc-950/55"
                    >
                      <div className="text-xs text-zinc-400">{x.k}</div>
                      <div className="mt-1 font-semibold">{x.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-400/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-zinc-200">
                    “Saya suka membangun sistem yang modular, mudah dipelihara, dan punya UX yang enak dipakai.”
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-r from-fuchsia-500/15 to-cyan-400/15 blur-xl" />
            </div>
          </div>

          <div className="mt-12 border-t border-white/10" />
        </section>

        {/* ABOUT */}
        <section id="about" className="py-14">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">About Me</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Ringkas, profesional, dan relevan untuk klien/instansi.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-zinc-200 leading-relaxed">
                  Saya adalah <span className="font-semibold">Web Developer</span> dan{" "}
                  <span className="font-semibold">Mobile Developer</span> yang fokus pada pengembangan
                  aplikasi end-to-end: perancangan arsitektur, implementasi API, dashboard interaktif,
                  hingga aplikasi mobile yang stabil dan responsif.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    { title: "Quality", desc: "Clean code & maintainable structure" },
                    { title: "Performance", desc: "Fast load, efficient state & API" },
                    { title: "Delivery", desc: "Iterative, jelas milestone & target" },
                  ].map((b) => (
                    <div key={b.title} className="rounded-2xl bg-zinc-950/40 p-4 ring-1 ring-white/10">
                      <div className="font-semibold">{b.title}</div>
                      <div className="mt-1 text-sm text-zinc-400">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Filter berdasarkan tech stack dan cari cepat.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {allChips.slice(0, 8).map((c) => (
                  <button
                    key={c}
                    onClick={() => setChip(c)}
                    className={classNames(
                      "rounded-full px-3 py-1 text-xs ring-1 transition",
                      chip === c
                        ? "bg-white/10 text-white ring-white/20"
                        : "bg-white/5 text-zinc-300 ring-white/10 hover:bg-white/10 hover:ring-white/20"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search project…"
                className="w-full sm:w-64 rounded-xl bg-zinc-950/40 px-4 py-2 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-500 outline-none focus:ring-white/20"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {filteredProjects.map((p) => (
              <button
                key={p.title}
                onClick={() => setOpenProject(p)}
                className="group text-left rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7 hover:border-white/15"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
                        {p.type}
                      </span>
                      <span className="text-xs text-zinc-500">{p.year}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{p.desc}</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/10 group-hover:ring-white/20">
                    ↗
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-zinc-950/40 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Modal */}
          {openProject && (
            <div
              className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4"
              role="dialog"
              aria-modal="true"
              onClick={() => setOpenProject(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
                        {openProject.type}
                      </span>
                      <span className="text-xs text-zinc-500">{openProject.year}</span>
                      <span className="text-xs text-zinc-500">•</span>
                      <span className="text-xs text-zinc-400">{openProject.role}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{openProject.title}</h3>
                    <p className="mt-3 text-sm text-zinc-300">{openProject.desc}</p>
                  </div>
                  <button
                    onClick={() => setOpenProject(null)}
                    className="rounded-2xl bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-sm font-semibold">Tech Stack</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {openProject.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-zinc-950/40 px-3 py-1 text-xs text-zinc-200 ring-1 ring-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-sm font-semibold">Highlights</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                      {openProject.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={openProject.links.demo}
                    className="rounded-xl bg-gradient-to-r from-fuchsia-500/90 to-cyan-400/90 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:opacity-95"
                  >
                    Live Demo
                  </a>
                  <a
                    href={openProject.links.repo}
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 transition hover:bg-white/15 hover:ring-white/20"
                  >
                    Repository
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-14">
          <h2 className="text-2xl font-semibold tracking-tight">Skills & Tech Stack</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Fokus utama: Laravel, Flutter, React.js, Next.js.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{s.group}</h3>
                  <span className="text-xs text-zinc-500">Stack</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full bg-zinc-950/40 px-3 py-1 text-xs text-zinc-200 ring-1 ring-white/10"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-14">
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Ringkasan pengalaman kerja & kontribusi.
          </p>

          <div className="mt-8 space-y-4">
            {experienceData.map((e) => (
              <div key={e.company + e.period} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{e.title}</h3>
                    <p className="text-sm text-zinc-300">{e.company}</p>
                  </div>
                  <div className="text-sm text-zinc-400">{e.period}</div>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Kirim pesan untuk kerja sama, project, atau konsultasi.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  onClick={copyEmail}
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-left text-sm ring-1 ring-white/10 transition hover:bg-white/15 hover:ring-white/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-200">you@example.com</span>
                    <span className="text-zinc-400">{copied ? "Copied!" : "Copy"}</span>
                  </div>
                </button>

                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
                    >
                      <span>{s.icon}</span>
                      <span className="text-xs text-zinc-300">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Terima kasih! (Demo) Hubungkan ke backend/API email service untuk produksi.");
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-zinc-300">Nama</label>
                  <input
                    required
                    className="mt-2 w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 ring-1 ring-white/10 outline-none focus:ring-white/20"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-300">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-2 w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 ring-1 ring-white/10 outline-none focus:ring-white/20"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-300">Pesan</label>
                  <textarea
                    required
                    rows={5}
                    className="mt-2 w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 ring-1 ring-white/10 outline-none focus:ring-white/20"
                    placeholder="Ceritakan kebutuhan project Anda…"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-to-r from-fuchsia-500/90 to-cyan-400/90 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-95"
                >
                  Kirim Pesan
                </button>

                <p className="text-xs text-zinc-500">
                  *Untuk produksi: hubungkan ke API (Laravel), Email service (Resend/SMTP), atau Google Forms.
                </p>
              </div>
            </form>
          </div>
        </section>

        <footer className="pb-10 pt-8">
          <div className="border-t border-white/10 pt-6 text-sm text-zinc-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Your Name — Portfolio</span>
            <span className="text-zinc-600">Built with JSX + Tailwind</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
