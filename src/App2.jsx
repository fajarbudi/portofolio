import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  LayoutGroup,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  Sparkles,
  ExternalLink,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";

export default function PortfolioInteractive() {
  // ===== DATA (edit sesuai kamu) =====
  const profile = useMemo(
    () => ({
      name: "Heri",
      role: "Web & Mobile Developer",
      tagline:
        "Saya bikin web & mobile app yang terasa hidup—animasi halus, UX enak, dan performa kencang.",
      email: "heri@email.com",
      socials: [
        { label: "GitHub", icon: Github, href: "https://github.com/username" },
        { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/username" },
        { label: "Twitter", icon: Twitter, href: "https://twitter.com/username" },
      ],
      tech: ["Laravel", "Flutter", "React.js", "Next.js", "REST API", "UI Motion", "RBAC", "Performance"],
    }),
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "SMEP Dashboard",
        subtitle: "Executive dashboard realtime + laporan periodik",
        tags: ["Next.js", "Tailwind", "Charts", "API"],
        desc:
          "Filtering cepat, ringkasan executive, dan pelaporan berkala. Fokus UX dan akses role-based.",
        links: [{ label: "Live Demo", href: "https://example.com" }],
      },
      {
        title: "Village Digital Platform",
        subtitle: "Modular platform untuk layanan & data terintegrasi",
        tags: ["Laravel", "MySQL", "Auth", "REST API"],
        desc:
          "Struktur modular, RBAC, logging, dan integrasi pelaporan lintas unit.",
        links: [{ label: "Case Study", href: "https://example.com" }],
      },
      {
        title: "Mobile Service App",
        subtitle: "Aplikasi layanan cepat lintas platform",
        tags: ["Flutter", "Firebase", "Push Notif"],
        desc:
          "UX responsif, notifikasi, dan integrasi API. Stabil di device low-mid.",
        links: [{ label: "Play Store", href: "https://example.com" }],
      },
      {
        title: "Company Profile Landing",
        subtitle: "Landing modern + SEO + animasi halus",
        tags: ["React.js", "Motion", "SEO"],
        desc:
          "LCP ringan, struktur komponen rapi, dan animasi micro-interactions.",
        links: [{ label: "Preview", href: "https://example.com" }],
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      { group: "Frontend", items: ["React.js", "Next.js", "Tailwind", "Framer Motion"] },
      { group: "Backend", items: ["Laravel", "REST API", "RBAC", "MySQL", "Caching"] },
      { group: "Mobile", items: ["Flutter", "State Mgmt", "Firebase", "Push Notif"] },
      { group: "Workflow", items: ["Git", "Deploy", "Testing (basic)", "CI/CD (basic)"] },
    ],
    []
  );

  const experiences = useMemo(
    () => [
      {
        role: "Web & Mobile Developer",
        org: "Freelance / Consultant",
        period: "2022 — Now",
        points: [
          "End-to-end: UI → API → DB → deploy.",
          "Optimasi performa: caching, pagination, lazy load.",
          "Milestone jelas + komunikasi terukur.",
        ],
      },
      {
        role: "Software Developer",
        org: "Startup / Agency",
        period: "2020 — 2022",
        points: ["Build modul, integrasi API, dan maintainability.", "Komponen reusable + standardisasi UI."],
      },
    ],
    []
  );

  // ===== Cursor Spotlight (biar nggak kaku) =====
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const smy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // ===== Scroll progress bar =====
  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // ===== Sections + active =====
  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
    []
  );
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((en) => en.isIntersecting && setActive(s.id)),
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // ===== Projects filter + drawer =====
  const allTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [tag, setTag] = useState("All");
  const filtered = useMemo(() => (tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag))), [tag, projects]);
  const [openProject, setOpenProject] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-white/5">
        <motion.div style={{ width: progressW }} className="h-full bg-white/70" />
      </div>

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          background: useTransform([smx, smy], ([x, y]) =>
            `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 55%)`
          ),
        }}
      />

      {/* NAV (lebih hidup) */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button onClick={() => scrollTo("home")} className="group inline-flex items-center gap-2 rounded-2xl px-3 py-2 hover:bg-white/5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 group-hover:bg-white/15">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="text-left leading-tight">
              <div className="text-sm font-semibold">{profile.name}</div>
              <div className="text-xs text-zinc-400">{profile.role}</div>
            </div>
          </button>

          <LayoutGroup>
            <div className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="relative rounded-2xl px-3 py-2 text-sm text-zinc-300 hover:text-white"
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-2xl bg-white/10"
                      transition={{ type: "spring", stiffness: 250, damping: 22 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              {profile.socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10"
                    aria-label={s.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Hire Me <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* HERO (orb + draggable chips) */}
      <section id="home" className="relative z-10 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight"
              >
                Portfolio yang{" "}
                <span className="relative">
                  <span className="absolute -inset-1 rounded-2xl bg-white/10 blur" />
                  <span className="relative rounded-2xl bg-white/10 px-2">interaktif</span>
                </span>{" "}
                dan modern.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="mt-5 max-w-xl text-zinc-300 leading-relaxed md:text-lg"
              >
                {profile.tagline}
              </motion.p>

              <div className="mt-7 flex flex-wrap gap-3">
                <MagneticButton onClick={() => scrollTo("projects")}>
                  Explore Projects <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <a
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
                  href={`mailto:${profile.email}?subject=Project%20Inquiry&body=Halo%20${profile.name},%20saya%20ingin%20diskusi%20project...`}
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>

              {/* draggable tech chips */}
              <div className="mt-8">
                <div className="text-xs text-zinc-400 mb-3">Drag the stack 👇</div>
                <div className="flex flex-wrap gap-2">
                  {profile.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      drag
                      dragElastic={0.12}
                      dragConstraints={{ left: -20, right: 20, top: -12, bottom: 12 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="cursor-grab active:cursor-grabbing rounded-2xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-200"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* orb interactive card */}
            <TiltCard className="md:col-span-5 rounded-[32px] border border-white/10 bg-white/5 p-6 overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-zinc-400">Now building</div>
                  <div className="mt-1 text-xl font-semibold">Web + Mobile Products</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 rounded-[28px] border border-white/10 bg-zinc-950/40 p-5 relative overflow-hidden">
                <motion.div
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
                  animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/5 blur-2xl"
                  animate={{ x: [0, 14, 0], y: [0, -18, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative">
                  <div className="text-sm text-zinc-200 font-semibold">Micro-interactions matter</div>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                    Hover, scroll, drag, dan transisi state bikin portofolio terasa “hidup” dan premium.
                  </p>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => scrollTo("contact")}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-200 hover:text-white"
                  >
                    Let’s build something <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {profile.socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-white/10"
                    >
                      <Icon className="h-4 w-4" /> {s.label} <ExternalLink className="h-4 w-4 opacity-60" />
                    </a>
                  );
                })}
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* PROJECTS (filter + hover preview + click drawer) */}
      <Section id="projects" title="Projects" subtitle="Hover untuk preview, klik untuk detail.">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
            <Filter className="h-4 w-4" /> Filter
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={[
                  "rounded-2xl border px-3 py-2 text-xs transition",
                  tag === t
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid gap-5 md:grid-cols-12">
            {filtered.map((p, i) => (
              <motion.button
                layout
                key={p.title}
                onClick={() => setOpenProject(p)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={[
                  "text-left group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition",
                  i % 3 === 0 ? "md:col-span-7" : "md:col-span-5",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{p.subtitle}</p>
                  </div>
                  <motion.div
                    className="rounded-2xl bg-white/10 p-3"
                    whileHover={{ rotate: 8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                </div>

                <p className="mt-4 text-zinc-300 leading-relaxed">{p.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-2xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-xs text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* hover preview overlay */}
                <motion.div
                  initial={false}
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                </motion.div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-200">
                  Click for details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </LayoutGroup>

        <ProjectDrawer project={openProject} onClose={() => setOpenProject(null)} />
      </Section>

      {/* SKILLS (meters anim + tilt) */}
      <Section id="skills" title="Skills" subtitle="Animasi meter muncul saat discroll.">
        <div className="grid gap-5 md:grid-cols-12">
          <TiltCard className="md:col-span-5 rounded-[32px] border border-white/10 bg-white/5 p-7">
            <div className="text-xs text-zinc-400">Core approach</div>
            <div className="mt-2 text-xl font-semibold">Ship clean, feel smooth.</div>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              Fokus ke UX, performa, dan struktur yang siap berkembang. Animasi ada, tapi tetap ringan.
            </p>
            <div className="mt-6 space-y-3">
              <SkillMeter label="UI/UX" value={88} />
              <SkillMeter label="Performance" value={82} />
              <SkillMeter label="API & Backend" value={84} />
              <SkillMeter label="Mobile" value={78} />
            </div>
          </TiltCard>

          <div className="md:col-span-7 grid gap-5 md:grid-cols-2">
            {skills.map((s) => (
              <TiltCard key={s.group} className="rounded-[32px] border border-white/10 bg-white/5 p-7">
                <div className="text-lg font-semibold">{s.group}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <motion.span
                      key={it}
                      drag
                      dragElastic={0.15}
                      dragConstraints={{ left: -14, right: 14, top: -10, bottom: 10 }}
                      whileHover={{ scale: 1.06 }}
                      className="cursor-grab active:cursor-grabbing rounded-2xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-200"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCE (accordion) */}
      <Section id="experience" title="Experience" subtitle="Klik untuk expand detail.">
        <div className="space-y-4">
          {experiences.map((e, idx) => (
            <ExperienceAccordion key={e.role + idx} item={e} />
          ))}
        </div>
      </Section>

      {/* CONTACT (validasi live + button anim) */}
      <Section id="contact" title="Contact" subtitle="Kirim brief, saya balas cepat.">
        <div className="grid gap-5 md:grid-cols-12">
          <div className="md:col-span-5 rounded-[32px] border border-white/10 bg-white/5 p-7">
            <div className="text-xl font-semibold">Quick contact</div>
            <p className="mt-2 text-zinc-300">
              Email paling cepat. Atau DM lewat sosial.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4" /> {s.label}
                  </a>
                );
              })}
            </div>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-zinc-950/40 p-5 text-sm text-zinc-300">
              <div className="text-xs text-zinc-400">Email</div>
              <div className="mt-1 font-semibold text-zinc-100">{profile.email}</div>
            </div>
          </div>

          <div className="md:col-span-7 rounded-[32px] border border-white/10 bg-white/5 p-7">
            <ContactForm toEmail={profile.email} />
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-zinc-400 flex items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> interactive motion UI
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ================= Components ================= */

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative z-10 mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-2xl text-zinc-400">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function MagneticButton({ children, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.3 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.12);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.98 }}
      style={{ x: sx, y: sy }}
      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
    >
      {children}
    </motion.button>
  );
}

function TiltCard({ className = "", children }) {
  const ref = useRef(null);
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);
  const sX = useSpring(rX, { stiffness: 120, damping: 14, mass: 0.3 });
  const sY = useSpring(rY, { stiffness: 120, damping: 14, mass: 0.3 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rY.set(px * 10);
    rX.set(-py * 10);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rX.set(0); rY.set(0); }}
      style={{ rotateX: sX, rotateY: sY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(18px)" }}>{children}</div>
    </motion.div>
  );
}

function SkillMeter({ label, value = 70 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-200 font-semibold">{label}</span>
        <span className="text-zinc-400">{value}%</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full bg-white/60"
        />
      </div>
    </motion.div>
  );
}

function ExperienceAccordion({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5"
      >
        <div>
          <div className="text-lg font-semibold">{item.role}</div>
          <div className="text-sm text-zinc-400">{item.org} • {item.period}</div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="rounded-2xl bg-white/10 p-2">
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-6 pb-6"
          >
            <div className="rounded-[22px] border border-white/10 bg-zinc-950/40 p-5">
              <ul className="space-y-2 text-zinc-300">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-white/60" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectDrawer({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[90]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 mx-auto max-w-4xl rounded-t-[36px] border border-white/10 bg-zinc-950"
          >
            <div className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{project.subtitle}</p>
                </div>
                <button onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-zinc-200 leading-relaxed">{project.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.links?.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    {l.label} <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactForm({ toEmail }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const errors = {
    name: !form.name.trim() ? "Nama wajib diisi" : "",
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? "Email tidak valid" : "",
    message: form.message.trim().length < 10 ? "Pesan minimal 10 karakter" : "",
  };

  const canSubmit = !errors.name && !errors.email && !errors.message;

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!canSubmit) return;
    const subject = encodeURIComponent(`Project Inquiry - ${form.name}`);
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}\n`);
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Nama" name="name" value={form.name} onChange={onChange} onBlur={onBlur} error={touched.name ? errors.name : ""} />
      <Field label="Email" name="email" value={form.email} onChange={onChange} onBlur={onBlur} error={touched.email ? errors.email : ""} type="email" />
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Pesan</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          onBlur={onBlur}
          rows={7}
          className={[
            "w-full rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none",
            touched.message && errors.message ? "border-red-400/40" : "border-white/10 focus:border-white/20",
          ].join(" ")}
          placeholder="Ceritakan kebutuhan project-mu..."
        />
        {touched.message && errors.message && <p className="mt-2 text-xs text-red-300">{errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        whileHover={canSubmit ? { scale: 1.02 } : {}}
        whileTap={canSubmit ? { scale: 0.98 } : {}}
        className={[
          "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
          canSubmit ? "bg-white text-zinc-950 hover:bg-zinc-200" : "bg-white/10 text-zinc-400 cursor-not-allowed",
        ].join(" ")}
      >
        Kirim <ArrowRight className="h-4 w-4" />
      </motion.button>
    </form>
  );
}

function Field({ label, name, value, onChange, onBlur, error, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-300">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        className={[
          "w-full rounded-2xl border bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none",
          error ? "border-red-400/40" : "border-white/10 focus:border-white/20",
        ].join(" ")}
        placeholder={label}
      />
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
}
