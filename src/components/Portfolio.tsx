"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Download, Mail, Menu, X, Copy } from "lucide-react";
import type { PortfolioProfile, PortfolioProject, PortfolioHonor, PortfolioNews } from "@/types";
import { asset, cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const sections = [
  { id: "about", label: "关于" }, { id: "news", label: "动态" },
  { id: "projects", label: "项目" }, { id: "honors", label: "荣誉" },
  { id: "experience", label: "经历" }, { id: "contact", label: "联系" },
];
const sectionIds = sections.map(section => section.id);
const filters = ["全部", "具身智能", "自主导航", "感知与控制"] as const;

function NavigationSketch({ variant }: { variant: string }) {
  const boat = variant === "usv";
  if (variant === "onero") return <div className="navigation-sketch">
    <svg viewBox="0 0 260 172" role="img" aria-label="onero A1 机械臂示意图">
      <path d="M29 143 H230" stroke="#ccd9df" fill="none" />
      <g stroke="currentColor" fill="none" strokeWidth="11" strokeLinecap="round"><path d="M75 136 V100 L120 63 L158 83 L184 65" /></g>
      <g fill="#fff" stroke="currentColor" strokeWidth="2"><circle cx="75" cy="100" r="8" /><circle cx="120" cy="63" r="8" /><circle cx="158" cy="83" r="7" /></g>
      <path d="M182 59 L196 59 L200 71 M185 70 L193 79 L203 76" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="56" y="134" width="39" height="8" rx="2" fill="currentColor" />
      <rect x="194" y="118" width="17" height="24" rx="3" fill="currentColor" opacity=".25" />
      <path d="M206 93 Q223 104 205 115" stroke="currentColor" fill="none" strokeDasharray="3 3" />
    </svg>
  </div>;
  return <div className={cn("navigation-sketch", boat && "water-sketch")}>
    <svg viewBox="0 0 260 172" role="img" aria-label={boat ? "无人船路径跟踪示意图" : "机器人目标导航示意图"}>
      <defs><pattern id={`grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth=".5" opacity=".15" /></pattern></defs>
      <rect width="260" height="172" fill={`url(#grid-${variant})`} />
      {!boat && <g fill="#fff" stroke="#ccd9df" strokeWidth="1.5"><rect x="42" y="32" width="46" height="38" rx="3" /><rect x="134" y="66" width="42" height="51" rx="3" /><rect x="187" y="22" width="37" height="30" rx="3" /></g>}
      <path d={boat ? "M24 132 C70 132 58 47 115 75 S160 125 208 38" : "M25 138 L105 138 Q117 138 117 124 L117 51 Q117 41 135 41 L174 41 Q185 41 185 69 L218 92"} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="25" cy={boat ? "132" : "138"} r="11" fill="white" stroke="currentColor" strokeWidth="1.5" />
      <path d={boat ? "M20 135 L25 127 L30 135 Z" : "M20 141 L25 133 L30 141 Z"} fill="currentColor" />
      <circle cx={boat ? "208" : "218"} cy={boat ? "38" : "92"} r="12" fill="currentColor" opacity=".12" />
      <circle cx={boat ? "208" : "218"} cy={boat ? "38" : "92"} r="4" fill="currentColor" />
    </svg>
  </div>;
}

export default function Portfolio({ profile, projects, honors, news }: {
  profile: PortfolioProfile; projects: PortfolioProject[]; honors: PortfolioHonor[]; news: PortfolioNews[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<string>("全部");
  const [allHonors, setAllHonors] = useState(false);
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    if (preview) { dialogRef.current?.showModal(); document.body.style.overflow = "hidden"; }
    else { dialogRef.current?.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [preview]);

  useEffect(() => {
    const onHash = () => { if (projects.some(p => `#${p.id}` === window.location.hash)) setFilter("全部"); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [projects]);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); }
    catch { window.location.href = `mailto:${profile.email}`; }
  }
  useEffect(() => { if (!copied) return; const timeout = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(timeout); }, [copied]);

  const visibleProjects = projects.filter(p => filter === "全部" || p.category === filter);
  const visibleHonors = allHonors ? honors : honors.slice(0, 6);

  return <>
    <a href="#main-content" className="skip-link">跳至主要内容</a>
    <header className="site-header">
      <div className="header-inner">
        <a href="#about" className="wordmark" aria-label="江心悠 首页">XJ<span className="wordmark-dot">.</span></a>
        <nav id="primary-navigation" aria-label="主导航" className={cn("header-nav", mobileOpen && "is-open")}>
          {sections.map(s => <a key={s.id} href={`#${s.id}`} onClick={() => setMobileOpen(false)} className={cn(activeId === s.id && "active")} aria-current={activeId === s.id ? "location" : undefined}>{s.label}</a>)}
        </nav>
        <a href={asset(profile.resume)} download className="header-resume">CV <ArrowUpRight size={14} /></a>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "关闭导航" : "打开导航"} aria-expanded={mobileOpen} aria-controls="primary-navigation">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </header>

    <div className="page-shell">
      <aside className="profile-column" aria-label="个人信息">
        <div className="profile-sticky">
          <img src={asset(profile.photo)} className="profile-photo" alt={`${profile.name}的个人照片`} width="160" height="204" />
          <div className="profile-identity"><p className="profile-name">{profile.name}</p><p className="profile-name-en">{profile.nameEn}</p></div>
          <p className="profile-role">车辆工程本科生<br />Robotics & Navigation</p>
          <p className="profile-affiliation">广州航海学院<br /><span>大湾区大学 · 访问学生</span></p>
          <div className="profile-links">
            <a href={`mailto:${profile.email}`}><Mail size={15} /> Email <ArrowUpRight size={12} /></a>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><span className="code-symbol">GH</span> GitHub <ArrowUpRight size={12} /></a>
            <a href={profile.codeUrl} target="_blank" rel="noopener noreferrer"><span className="code-symbol">&lt;/&gt;</span> Gitee <ArrowUpRight size={12} /></a>
            <a href={asset(profile.resume)} download><Download size={15} /> 简历 <ArrowDown size={12} /></a>
          </div>
          <a className="profile-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="profile-note"><span className="status-dot" /> 学习、探索，持续实践。</div>
        </div>
      </aside>

      <main id="main-content" className="main-column">
        <section id="about" className="intro-section">
          <p className="eyebrow">ROBOTICS · NAVIGATION · EMBODIED INTELLIGENCE</p>
          <h1>{profile.nameEn}<span>「{profile.name}」</span></h1>
          <p className="intro-lead">探索机器人的感知、导航与控制。</p>
          <div className="intro-copy">
            <p>你好！我是江心悠，广州航海学院<span className="quiet-text"> / 广州交通大学（筹）</span>车辆工程专业本科生（2024–2028），专业综测排名 <strong>1 / 34</strong>。目前在<span className="inline-emphasis">大湾区大学</span>担任访问学生，开展轮足机器人零样本物体导航研究。</p>
            <p>我曾担任 <strong>RoboMaster ICBK 破冰船战队导航组组长</strong>，从仿真搭建到实车部署，开发机器人自主导航、路径规划与感知系统；同时参与智能氢能无人船导航控制研究，关注算法在真实环境中的稳定运行。</p>
            <p className="research-line"><span>研究兴趣</span>具身智能 · 自主导航 · 多传感器融合 · 机器人控制</p>
          </div>
          <div className="intro-bottom"><a href="#projects" className="text-link" onClick={() => setFilter("全部")}>查看我的项目 <ArrowDown size={14} /></a><span>从感知到行动，从仿真到现实。</span></div>
        </section>

        <section id="news" className="content-section news-section">
          <div className="section-heading"><h2>近期动态 <span>News</span></h2><span className="section-index">01</span></div>
          <ul className="news-list">{news.map((item, i) => <li key={i}><time>{item.date}</time><span>{item.text}{item.href && <a href={item.href} aria-label={`查看相关${item.href === "#honors" ? "荣誉" : "项目"}`} onClick={() => setFilter("全部")} className="news-arrow"><ArrowUpRight size={14} /></a>}</span></li>)}</ul>
        </section>

        <section id="projects" className="content-section projects-section">
          <div className="section-heading"><h2>项目与实践 <span>Selected Work</span></h2><span className="section-index">02</span></div>
          <div className="project-toolbar"><div className="project-filters" aria-label="筛选项目">{filters.map(item => <button key={item} className={cn("filter-button", filter === item && "selected")} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div><span className="project-count" aria-live="polite">{String(visibleProjects.length).padStart(2, "0")} 个项目</span></div>
          <div className="project-list">{visibleProjects.map((project, index) => <article key={project.id} id={project.id} className="project-row">
            <div className="project-media-column">
              {project.media ? project.media.type === "video" ? <video className="project-media" src={asset(project.media.src)} poster={project.media.poster ? asset(project.media.poster) : undefined} controls playsInline preload="none" aria-label={project.media.alt} /> : <button className="project-image-button" aria-label={`放大图片：${project.title}`} onClick={() => setPreview({ src: project.media!.src, title: project.media!.alt })}><picture>{project.media.type === "gif" && project.media.poster && <source media="(prefers-reduced-motion: reduce)" srcSet={asset(project.media.poster)} />}<img className={cn("project-media", project.media.type === "gif" && "project-media-gif")} src={asset(project.media.src)} alt={project.media.alt} loading="lazy" /></picture></button> : <NavigationSketch variant={project.id} />}
            </div>
            <div className="project-content"><h3>{project.title}</h3><p className="project-title-en">{project.titleEn}</p><p className="project-role">{project.role}</p><p className="project-description">{project.description}</p><p className="project-result"><span />{project.result}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="project-actions"><details><summary>项目详情 <ChevronDown size={13} /></summary><p>{project.details}</p></details>{project.links?.map(link => <a key={link.href} href={link.href.startsWith("/") ? asset(link.href) : link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={12} /></a>)}</div>
            </div>
          </article>)}</div>
        </section>

        <section id="honors" className="content-section">
          <div className="section-heading"><h2>荣誉与奖项 <span>Honors & Awards</span></h2><span className="section-index">03</span></div>
          <p className="section-description">在团队协作与竞赛实践中，将想法做成可以运行的系统。</p>
          <ul className="honor-list">{visibleHonors.map(honor => <li key={honor.id}><time>{honor.year}</time><div><p>{honor.title}</p><span className="honor-award">{honor.award}</span></div>{honor.certificate ? <button className="certificate-button" onClick={() => setPreview({ src: honor.certificate!, title: `${honor.title} · ${honor.award}` })} aria-label={`查看证书：${honor.title}`}><span>证书</span><ArrowUpRight size={14} /></button> : <span className="honor-mark">—</span>}</li>)}</ul>
          <button className="show-more" onClick={() => setAllHonors(!allHonors)} aria-expanded={allHonors}>{allHonors ? "收起奖项" : `查看全部 ${honors.length} 项荣誉`}<ChevronDown size={14} className={cn(allHonors && "rotate")} /></button>
        </section>

        <section id="experience" className="content-section">
          <div className="section-heading"><h2>教育与经历 <span>Experience</span></h2><span className="section-index">04</span></div>
          <div className="experience-list">
            <article><time>2026.07 — 至今</time><div><h3>大湾区大学</h3><p className="experience-role">访问学生 · 轮足机器人导航</p><p>零样本物体目标导航、多楼层规划与动态行人避障。</p></div></article>
            <article><time>2024.09 — 2028.07</time><div><h3>广州航海学院 <span>/ 广州交通大学（筹）</span></h3><p className="experience-role">车辆工程 · 本科 · 专业综测排名 1 / 34</p><p>课程涵盖自动控制、车辆动力学、电气控制与 PLC、有限元法、微机原理与接口技术。</p></div></article>
            <article><time>2025.01 — 2025.03</time><div><h3>广州力生新能源科技有限公司</h3><p className="experience-role">项目助理 · 研发实习</p><p>参与测试流程优化、自动化数据采集脚本适配与吸放氢实验数据清洗，将实验数据处理效率提升 50%。</p></div></article>
          </div>
          <div className="skills-block"><h3>技术与工具 <span>Toolkit</span></h3><div className="toolkit-row"><span>机器人系统</span><p>ROS / ROS2 · Nav2 · Gazebo · RViz · URDF</p></div><div className="toolkit-row"><span>算法与开发</span><p>C / C++ · Python · SLAM · 路径规划 · 机器学习</p></div><div className="toolkit-row"><span>感知与控制</span><p>激光雷达 · 传感器融合 · TF · 弹道解算 · 自适应控制</p></div><div className="toolkit-row"><span>语言与协作</span><p>英语 CET-6 · 普通话 · 粤语 · 项目管理 · 技术文档</p></div></div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="section-heading"><h2>保持联系 <span>Get in Touch</span></h2><span className="section-index">05</span></div>
          <p>欢迎交流机器人自主导航、具身智能与控制算法相关的研究和项目。</p>
          <div className="contact-email-row"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<ArrowUpRight size={23} /></a><button onClick={copyEmail} aria-label="复制邮箱地址" className="copy-button">{copied ? <Check size={18} /> : <Copy size={18} />}</button></div><span role="status" className="copy-status">{copied ? "邮箱已复制" : ""}</span>
          <div className="contact-links"><a href={asset(profile.resume)} download>下载简历 <Download size={14} /></a><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">访问 GitHub <ArrowUpRight size={14} /></a><a href={profile.codeUrl} target="_blank" rel="noopener noreferrer">访问 Gitee <ArrowUpRight size={14} /></a></div>
        </section>
        <footer className="site-footer"><span>© 2026 {profile.nameEn}</span><a href="#about">返回顶部 ↑</a></footer>
      </main>
    </div>
    <dialog ref={dialogRef} className="media-dialog" onCancel={() => setPreview(null)} onClose={() => setPreview(null)} onClick={event => { if (event.target === event.currentTarget) setPreview(null); }} aria-labelledby="preview-title">
      {preview && <div className="dialog-inner"><div className="dialog-header"><h2 id="preview-title">{preview.title}</h2><button onClick={() => setPreview(null)} aria-label="关闭预览" autoFocus><X size={22} /></button></div><img src={asset(preview.src)} alt={preview.title} className="dialog-image" /><a href={asset(preview.src)} target="_blank" rel="noopener noreferrer" className="dialog-original">查看原图 <ArrowUpRight size={14} /></a></div>}
    </dialog>
  </>;
}
