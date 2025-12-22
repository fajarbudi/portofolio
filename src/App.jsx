import React, { useEffect, useMemo, useRef, useState } from "react";

const PROFILE = {
  openToWork: true,
  role: "WEB & MOBILE DEVELOPER",
  name: "Fajar Budi Raharjo",
  desc: "Saya mengembangkan sistem dan aplikasi web & mobile end-to-end untuk kebutuhan bisnis: perancangan UI, implementasi frontend, backend service & API, serta optimalisasi performa dan keamanan aplikasi.",
  email: "fajarbudira@gmail.com",
  phone: "089605877717",
  location: "Yogyakarta, ID",
  cvUrl: "#",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/fajar-budi-770227266/",
      icon: "fa fa-linkedin",
    },
    { label: "GitHub", href: "https://github.com", icon: "fa fa-github" },
  ],
};

const TECH_CHIPS = ["Laravel", "Flutter", "React.js", "Next.js"];

const PROJECTS = [
  {
    title: "SMEP — Monitoring & Evaluasi Pembangunan Daerah",
    desc: "Sistem pelaporan berkala (mingguan/bulanan) untuk Perangkat Daerah yang mengelola paket/kegiatan beserta realisasinya, eviden foto lapangan, serta pencatatan kendala. Data terhimpun dalam Executive Dashboard yang dipantau Bagian Administrasi Pembangunan dan Pimpinan Daerah secara terpusat.",
    image: "/project/smep.png",
    href: "#projects",
  },
  {
    title: "Prakiraan Waktu Banjir (Flood Routing)",
    desc: "Peta interaktif untuk memilih titik hulu–hilir, menampilkan profil lokasi (koordinat, elevasi, desa/kecamatan), serta menghitung estimasi jarak dan waktu tempuh gelombang banjir menuju hilir.",
    image: "/project/floodRouting.png",
    href: "https://sih3.bbwsserayuopak.id/info/floodrouting",
  },
  {
    title: "Mobile Public Service",
    desc: "Aplikasi Flutter untuk layanan, notifikasi, tracking proses.",
    image: "/project/air.png",
    href: "#projects",
  },
  // {
  //   title: "Mobile Public Service",
  //   desc: "Aplikasi Flutter untuk layanan, notifikasi, tracking proses.",
  //   image: "/project/sih3Mobile.png",
  //   href: "#projects",
  // },
  // {
  //   title: "Company Profile + CMS",
  //   desc: "Website modern, SEO-ready, performa tinggi, dan panel admin konten.",
  //   image: "https://picsum.photos/seed/apex-project-03/1200/900",
  //   href: "#",
  // },
  // {
  //   title: "Admin Dashboard UI",
  //   desc: "Komponen reusable, data table, chart, dan layout konsisten untuk aplikasi internal.",
  //   image: "https://picsum.photos/seed/apex-project-04/1200/900",
  //   href: "#",
  // },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    org: "PT Anauri",
    period: "2024 — Now",
    text: "Membangun dan mengembangkan sistem aplikasi dari awal sampai siap digunakan, mulai dari pengelolaan data, tampilan dashboard, hingga terhubung dengan aplikasi mobile.",
    bullets: [
      "Menyusun fitur-fitur utama sesuai kebutuhan pengguna dan memastikan alurnya mudah dipakai.",
      "Menghubungkan aplikasi web dan mobile agar data tercatat rapi dan sinkron.",
      "Menjaga aplikasi tetap cepat, stabil, dan mudah dikembangkan untuk kebutuhan berikutnya.",
    ],
  },
  {
    role: "Mobile Developer",
    org: "PT Anauri",
    period: "2024",
    text: "Mengembangkan aplikasi mobile untuk kebutuhan operasional, dengan fokus pada kenyamanan pengguna dan kestabilan aplikasi.",
    bullets: [
      "Membuat aplikasi yang bisa digunakan oleh beberapa jenis pengguna (misalnya admin & petugas).",
      "Mengoptimalkan aplikasi agar tetap lancar, termasuk saat koneksi internet kurang stabil.",
      "Melakukan perbaikan dan penyempurnaan berdasarkan masukan pengguna.",
    ],
  },
  {
    role: "Front-End",
    org: "Freelance",
    period: "2023",
    text: "Membantu membuat tampilan website agar lebih menarik, rapi, dan mudah dipahami pengguna.",
    bullets: [
      "Membuat halaman website yang responsif (nyaman dibuka di HP maupun laptop).",
      "Menyusun tampilan sesuai kebutuhan klien dan memastikan informasinya mudah dibaca.",
      "Menyesuaikan dan memperbarui tampilan berdasarkan revisi dan kebutuhan baru.",
    ],
  },
];

const SECTIONS = [
  { id: "home", label: "Home", icon: "fa fa-home" },
  { id: "summary", label: "Summary", icon: "fa fa-address-card-o" },
  { id: "experience", label: "Experience", icon: "fa fa-bars" },
  { id: "projects", label: "Projects", icon: "fa fa-tags" },
  { id: "skills", label: "Skills", icon: "fa fa-bolt" },
  { id: "links", label: "Links", icon: "fa fa-share-alt" },
];

// const SKILLS_TOOLS = [
//   "Pengembangan Aplikasi End-to-End (dari kebutuhan sampai rilis)",
//   "Integrasi Aplikasi Web & Mobile",
//   "Perancangan Alur & Pengalaman Pengguna (UX sederhana)",
//   "Pengelolaan Data & Struktur Database",
//   "Pembuatan API & Integrasi Layanan",
//   "Keamanan Dasar Aplikasi (login, hak akses pengguna)",
//   "Optimasi Performa & Kecepatan Aplikasi",
//   "Testing & Perbaikan Bug (quality dan stabilitas)",
// ];

const SKILLS_TOOLS = [
  "End-to-End App Development",
  "Authentication & User Access",
  "Web & Mobile Integration",
  "Responsive UI (Web & Mobile)",
  "Database & Data Management",
  "UI Component & Reusable Layout",
  "API Development & Integration",
  "Testing & Bug Fixing",
  "Performance & Reliability",
  "Deployment & Maintenance",
  "Documentation & Handover",
  "Team Collaboration",
];

const TOOL_APPS = [
  { name: "Laravel", abbr: "/laravel.png" },
  { name: "Flutter", abbr: "/flutter.png" },
  { name: "React", abbr: "/react.png" },
  { name: "Next.js", abbr: "/nextJs.png" },
  { name: "Vite", abbr: "/vite.png" },
  { name: "Git", abbr: "/git.png" },
  { name: "Docker", abbr: "/docker.png" },
  { name: "Node.js", abbr: "/nodeJs.png" },
  { name: "Bootstrap", abbr: "/bootstrap.png" },
  { name: "Tailwind", abbr: "/tailwind.png" },
  { name: "Javascript", abbr: "/js.png" },
  { name: "PHP", abbr: "/php.png" },
  { name: "Dart", abbr: "/dart.png" },
];

const LANGUAGES = [
  { name: "Indonesia", value: 95 },
  { name: "English", value: 70 },
];

const EDUCATION_CERTS = [
  {
    title: "Software Engineer",
    subtitle: "Hacker Rank",
    meta: "2025",
    lampiran: "https://www.hackerrank.com/certificates/iframe/b872b52cce31",
  },
  {
    title: "Frontend Developer",
    subtitle: "Hacker Rank",
    meta: "2025",
    lampiran: "https://www.hackerrank.com/certificates/iframe/b0546ed25a67",
  },
  {
    title: "Javascript",
    subtitle: "Hacker Rank",
    meta: "2025",
    lampiran: "https://www.hackerrank.com/certificates/iframe/b2d77eeaa692",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const refs = useRef({});
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);

  // Picsum hero subject (portrait-ish). Change seed if you want a better subject.
  const HERO_IMG = "/background.png";
  // const HERO_IMG = "https://picsum.photos/seed/apex-portrait-77/1600/2000";

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
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
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

                <p className="mt-6 max-w-140 text-white/80 leading-relaxed">
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

                <div className="mt-8 grid gap-3 text-sm text-white/85 md:grid-cols-2 max-w-130">
                  {/* <a href="mailto: fajarbudira@gmail.com">
                    <InfoRow icon="mail" text={PROFILE.email} />
                  </a> */}
                  <a href={`https://wa.me/089605877717`}>
                    <InfoRow
                      icon="fa fa-whatsapp text-yellow-400/90"
                      text={PROFILE.phone}
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fajar-budi-770227266/"
                    target="_blank"
                  >
                    <InfoRow
                      icon="fa fa-linkedin text-yellow-400/90"
                      text="Fajar budi"
                    />
                  </a>
                  <a
                    href="https://maps.app.goo.gl/hGYXTUJGrHM6PQpF9"
                    target="_blank"
                  >
                    <InfoRow
                      icon="fa fa-compass text-yellow-400/90"
                      text={PROFILE.location}
                    />
                  </a>
                </div>
              </div>

              {/* RIGHT SUBJECT (like Framer) */}
              <div className="relative md:col-span-5 hidden md:block">
                <div className="relative h-[72vh] min-h-130 w-full">
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

            <div className="mt-6 max-w-180 space-y-5 text-white/80 leading-relaxed">
              <p>
                Full-Stack Web Developer dengan fokus utama pada Laravel dan
                Next.js untuk pengembangan aplikasi web end-to-end—mulai dari
                perancangan antarmuka, implementasi frontend dan backend,
                pengembangan REST API, hingga deployment. Prioritas utama
                meliputi performa, struktur kode yang terjaga, arsitektur yang
                skalabel, serta konsistensi pengalaman pengguna.
              </p>
              <p>
                Memiliki kemampuan pengembangan aplikasi mobile menggunakan
                Flutter, terutama untuk kebutuhan integrasi API dan implementasi
                fitur lintas platform.
              </p>
              <p>
                Berpengalaman menangani kebutuhan pemerintahan maupun bisnis,
                termasuk dashboard eksekutif, modul pelaporan, manajemen data,
                serta integrasi sistem secara terukur.
              </p>
            </div>

            {/* Big quote box like template */}
            <div className="mt-8 max-w-190 rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-7">
              <div className="flex gap-6">
                <div className="w-1 rounded-full bg-yellow-400" />
                <div className="text-2xl md:text-3xl font-extrabold leading-snug">
                  Berkomitmen membangun produk yang cepat, terukur, dan mudah
                  digunakan—dari perencanaan hingga rilis.
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

            <div className="mt-10 max-w-215 space-y-6">
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
                    {e.bullets &&
                      e.bullets.map((b) => (
                        <li className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                          {b}
                        </li>
                      ))}
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

            <p className="mt-4 max-w-180 text-white/70 leading-relaxed">
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
                  <i class={s.icon} aria-hidden="true"></i>
                  {s.label}
                </a>
              ))}
            </div>

            <div className="mt-10 max-w-190 rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-6">
              <div className="text-white font-semibold">Contact</div>
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
        {/* <a
          href="#links"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("links");
          }}
          className="rounded-xl bg-yellow-400 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-[0_18px_70px_-35px_rgba(250,204,21,0.95)] hover:bg-yellow-300 transition"
        >
          Get in Touch
        </a> */}
        <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950">
          Made with React.Js
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
                  <i class={s.icon} aria-hidden="true"></i>
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
      {/* <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 backdrop-blur">
        <Icon name={icon} className="h-5 w-5 text-yellow-400" />
      </span> */}
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 backdrop-blur">
        <i className={icon} style={{ fontSize: 20 }}></i>
      </span>
      <span className="truncate">{text}</span>
    </div>
  );
}

function SectionSkillsTools() {
  return (
    <section className="mt-16 scroll-mt-28">
      <h2 className="text-5xl font-extrabold text-yellow-400 tracking-tight">
        Skills & Tools
      </h2>

      <div className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2 max-w-190">
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
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 max-w-190">
        {TOOL_APPS.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2">
            <div
              className={`h-11 w-12 ${
                t.name == "Next.js" || t.name == "Node.js" ? "bg-white" : ""
              }`}
            >
              <img src={t.abbr} alt="a" className="w-full h-full" />
            </div>
            <div className="text-xs text-white/70 text-center">{t.name}</div>
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

      <div className="mt-5 max-w-130 space-y-4">
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

      <div className="mt-5 max-w-190 space-y-6">
        {EDUCATION_CERTS.map((e) => (
          <div key={e.title} className="flex gap-4">
            <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400" />

            <div className="min-w-0">
              <div className="text-white font-semibold">{e.title}</div>
              <div className="text-sm text-white/65">
                {e.subtitle} <span className="mx-1">-</span> {e.meta}
              </div>
              <a
                href={e.lampiran}
                className="text-sm text-yellow-400/90"
                target="_blank"
              >
                Lampiran
              </a>
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
      target="_blank"
      className="group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-fill transition duration-300 group-hover:scale-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
        <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/40 border border-white/10">
          <i class="fa fa-hand-o-up" aria-hidden="true"></i>
        </div>
      </div>

      <div className="p-6">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>

        <div className="mt-4 inline-flex items-center gap-2 text-sm text-yellow-400/90">
          View case study
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
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
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
        Send Message
      </button>
    </form>
  );
}
