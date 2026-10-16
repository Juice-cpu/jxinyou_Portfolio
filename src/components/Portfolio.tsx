"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Download, X, Copy } from "lucide-react";
import type { PortfolioProfile, PortfolioProject, PortfolioHonor, PortfolioNews, PortfolioPatent } from "@/types";
import { asset, cn } from "@/lib/utils";
const filters = ["全部", "具身智能", "自主导航", "感知与控制"] as const;

function ProjectMedia({ project, onPreview }: {
  project: PortfolioProject;
  onPreview: (preview: { src: string; title: string }) => void;
}) {
  const media = project.media;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Honor reduced motion by default, but always offer an explicit way to play.
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!media) return <NavigationSketch variant={project.id} />;
  if (media.type === "video") return <video className="project-media" src={asset(media.src)} poster={media.poster ? asset(media.poster) : undefined} controls playsInline preload="none" aria-label={media.alt} />;

  const animated = media.type === "gif" && !!media.poster;
  return <>
    <button className="project-image-button" aria-label={`放大图片：${project.title}`} onClick={() => onPreview({ src: media.src, title: media.alt })}>
      <img className={cn("project-media", animated && "project-media-gif")} src={asset(animated && !playing ? media.poster! : media.src)} alt={media.alt} loading="lazy" />
    </button>
    {animated && <div className="project-media-controls">
      <button className="gif-toggle" aria-label={`${playing ? "暂停" : "播放"}动画：${project.title}`} aria-pressed={playing} onClick={() => setPlaying(value => !value)}>{playing ? "暂停 GIF" : "播放 GIF"}</button>
      <a href={asset(media.src)} target="_blank" rel="noopener noreferrer">查看原始 GIF ↗</a>
    </div>}
  </>;
}

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

export default function Portfolio({ profile, projects, honors, news, patents }: {
  profile: PortfolioProfile; projects: PortfolioProject[]; honors: PortfolioHonor[]; news: PortfolioNews[]; patents: PortfolioPatent[];
}) {
  const [filter, setFilter] = useState<string>("全部");
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  return <>
    <a href="#main-content" className="skip-link">跳至主要内容</a>
    <div className="page-shell">
      <main id="main-content" className="main-column">
        <section id="about" className="intro-section">
          <h1>{profile.nameEn}<span>「{profile.name}」</span></h1>
          <div className="intro-grid">
            <aside className="profile-column" aria-label="个人照片与链接">
              <button className="profile-photo-button" aria-label="放大个人照片" onClick={() => setPreview({ src: profile.photo, title: profile.name })}><img src={asset(profile.photo)} className="profile-photo" alt={`${profile.name}的个人照片`} width="220" height="275" /></button>
              <nav className="profile-links" aria-label="个人链接">
                <a href={asset(profile.resume)} download>CV</a>
                <a href={`mailto:${profile.email}`}>Email</a>
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={profile.codeUrl} target="_blank" rel="noopener noreferrer">Gitee</a>
              </nav>
            </aside>
            <div className="intro-copy">
            <p>你好！我是江心悠，广州航海学院<span className="quiet-text"> / 广州交通大学（筹）</span>车辆工程专业本科生（2024–2028），专业综测排名 <strong>1 / 34</strong>。目前在<span className="inline-emphasis">大湾区大学</span>担任访问学生，开展轮足机器人零样本物体导航研究。</p>
            <p>我曾担任 <strong>RoboMaster ICBK 破冰船战队导航组组长</strong>，从仿真搭建到实车部署，开发机器人自主导航、路径规划与感知系统；同时参与智能氢能无人船导航控制研究，关注算法在真实环境中的稳定运行。</p>
            <p><strong>研究兴趣：</strong>具身智能、机器人自主导航、多传感器融合与机器人控制。</p>
            <p><strong>实践方向：</strong>从感知到行动，从仿真到现实，探索机器人在真实环境中的自主运行。</p>
            <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
            </div>
          </div>
        </section>

        <section id="news" className="content-section news-section">
          <div className="section-heading"><h2>近期动态 <span>News</span></h2><span className="section-index">01</span></div>
          <ul className="news-list">{news.map((item, i) => <li key={i}><time>{item.date}</time><span>{item.text}{item.href && <a href={item.href} aria-label={`查看相关${item.href === "#honors" ? "荣誉" : "项目"}`} onClick={() => setFilter("全部")} className="news-arrow"><ArrowUpRight size={14} /></a>}</span></li>)}</ul>
        </section>

        <section id="projects" className="content-section projects-section">
          <div className="section-heading"><h2>项目与实践 <span>Selected Work</span></h2><span className="section-index">02</span></div>
          <div className="project-toolbar"><div className="project-filters" aria-label="筛选项目">{filters.map(item => <button key={item} className={cn("filter-button", filter === item && "selected")} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div><span className="project-count" aria-live="polite">{String(visibleProjects.length).padStart(2, "0")} 个项目</span></div>
          <div className="project-list">{visibleProjects.map(project => <article key={project.id} id={project.id} className="project-row">
            <div className="project-media-column">
              <ProjectMedia project={project} onPreview={setPreview} />
            </div>
            <div className="project-content"><h3>{project.title}</h3><p className="project-title-en">{project.titleEn}</p><p className="project-role">{project.role}</p><p className="project-description">{project.description}</p><p className="project-result"><span />{project.result}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="project-actions"><details><summary>项目详情 <ChevronDown size={13} /></summary><p>{project.details}</p></details>{project.links?.map(link => <a key={link.href} href={link.href.startsWith("/") ? asset(link.href) : link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={12} /></a>)}</div>
            </div>
          </article>)}</div>
        </section>

        <section id="honors" className="content-section">
          <div className="section-heading"><h2>荣誉与奖项 <span>Honors & Awards</span></h2><span className="section-index">03</span></div>
          <p className="section-description">在团队协作与竞赛实践中，将想法做成可以运行的系统。</p>
          <ul className="honor-list">{honors.map(honor => <li key={honor.id}><time>{honor.year}</time><div><p>{honor.title}</p><span className="honor-award">{honor.award}</span>{honor.detail && <p className="honor-detail">{honor.detail}</p>}</div>{honor.certificate ? <button className="certificate-button" onClick={() => setPreview({ src: honor.certificate!, title: `${honor.title} · ${honor.award}` })} aria-label={`查看证书：${honor.title}`}><span>证书</span><ArrowUpRight size={14} /></button> : <span className="honor-mark" title="该项见简历记录">—</span>}</li>)}</ul>
        </section>

        <section id="patents" className="content-section">
          <div className="section-heading"><h2>专利 <span>Patents</span></h2><span className="section-index">04</span></div>
          <div className="ip-summary">
            <div><h3>授权专利</h3><p><strong>{patents.filter(p => p.status === "已授权").length}</strong> 项</p></div>
            <div><h3>已受理申请</h3><p><strong>{patents.filter(p => p.status === "申请已受理").length}</strong> 项</p></div>
          </div>
          <ul className="patent-list">{patents.map(patent => <li key={patent.id}>
            <div className="patent-heading"><h3>{patent.title}</h3><span>{patent.type} · {patent.status}</span></div>
            <p>{patent.status === "已授权" ? "专利号：ZL " : "申请号："}{patent.applicationNumber}{patent.publicationNumber && ` · 授权公告号：${patent.publicationNumber}`}</p>
            <p>第{patent.inventorRank}发明人（共{patent.inventorCount}人） · {patent.status === "已授权" ? "专利权人" : "申请人"}：广州航海学院</p>
            <div className="patent-evidence"><time dateTime={patent.documentDate}>{patent.status === "已授权" ? "授权公告日" : "受理通知书发文日"}：{patent.documentDate}</time><button className="certificate-button" onClick={() => setPreview({ src: patent.certificate, title: `${patent.title} · ${patent.status}` })} aria-label={`查看${patent.status === "已授权" ? "专利证书" : "受理通知书"}：${patent.title}`}>{patent.status === "已授权" ? "查看证书" : "查看受理书"}<ArrowUpRight size={14} /></button></div>
          </li>)}</ul>
        </section>

        <section id="experience" className="content-section">
          <div className="section-heading"><h2>教育与经历 <span>Experience</span></h2><span className="section-index">05</span></div>
          <div className="experience-list">
            <article><time>2026.07 — 至今</time><div><h3>大湾区大学</h3><p className="experience-role">访问学生 · 轮足机器人导航</p><p>零样本物体目标导航、多楼层规划与动态行人避障。</p></div></article>
            <article><time>2024.09 — 2028.07</time><div><h3>广州航海学院 <span>/ 广州交通大学（筹）</span></h3><p className="experience-role">车辆工程 · 本科 · 专业综测排名 1 / 34</p><p>课程涵盖自动控制、车辆动力学、电气控制与 PLC、有限元法、微机原理与接口技术。</p></div></article>
            <article><time>2025.01 — 2025.03</time><div><h3>广州力生新能源科技有限公司</h3><p className="experience-role">项目助理 · 研发实习</p><p>参与测试流程优化、自动化数据采集脚本适配与吸放氢实验数据清洗，将实验数据处理效率提升 50%。</p></div></article>
          </div>
          <div className="skills-block"><h3>技术与工具 <span>Toolkit</span></h3><div className="toolkit-row"><span>机器人系统</span><p>ROS / ROS2 · Nav2 · Gazebo · RViz · URDF</p></div><div className="toolkit-row"><span>算法与开发</span><p>C / C++ · Python · SLAM · 路径规划 · 机器学习</p></div><div className="toolkit-row"><span>感知与控制</span><p>激光雷达 · 传感器融合 · TF · 弹道解算 · 自适应控制</p></div><div className="toolkit-row"><span>语言与协作</span><p>英语 CET-6 · 普通话 · 粤语 · 项目管理 · 技术文档</p></div></div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="section-heading"><h2>保持联系 <span>Get in Touch</span></h2><span className="section-index">06</span></div>
          <p>欢迎交流机器人自主导航、具身智能与控制算法相关的研究和项目。</p>
          <div className="contact-email-row"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<ArrowUpRight size={23} /></a><button onClick={copyEmail} aria-label="复制邮箱地址" className="copy-button">{copied ? <Check size={18} /> : <Copy size={18} />}</button></div><span role="status" className="copy-status">{copied ? "邮箱已复制" : ""}</span>
          <div className="contact-links"><a href={asset(profile.resume)} download>下载简历 <Download size={14} /></a><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">访问 GitHub <ArrowUpRight size={14} /></a><a href={profile.codeUrl} target="_blank" rel="noopener noreferrer">访问 Gitee <ArrowUpRight size={14} /></a></div>
        </section>
        <footer className="site-footer">
          <div className="footer-main"><span>© 2026 {profile.nameEn}</span><a href="#about">返回顶部 ↑</a></div>
          <p className="footer-credits">Layout inspired by <a href="https://tairanhe.com/" target="_blank" rel="noopener noreferrer">Tairan He（何泰然）</a>. Website template from <a href="http://www.cs.berkeley.edu/~barron/" target="_blank" rel="noopener noreferrer" aria-label="Website template reference: Jon Barron">here</a> and <a href="http://www.cs.cmu.edu/~dpathak/" target="_blank" rel="noopener noreferrer" aria-label="Website template reference: Deepak Pathak">here</a>.</p>
        </footer>
      </main>
    </div>
    <dialog ref={dialogRef} className="media-dialog" onCancel={() => setPreview(null)} onClose={() => setPreview(null)} onClick={event => { if (event.target === event.currentTarget) setPreview(null); }} aria-labelledby="preview-title">
      {preview && <div className="dialog-inner"><div className="dialog-header"><h2 id="preview-title">{preview.title}</h2><button onClick={() => setPreview(null)} aria-label="关闭预览" autoFocus><X size={22} /></button></div><img src={asset(preview.src)} alt={preview.title} className="dialog-image" /><a href={asset(preview.src)} target="_blank" rel="noopener noreferrer" className="dialog-original">查看原图 <ArrowUpRight size={14} /></a></div>}
    </dialog>
  </>;
}
