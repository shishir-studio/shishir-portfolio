import Experience from "@/components/Experience";
import Form from "@/components/Form";
import Career from "@/components/Career";
import { bio, expertise, stats, process, why, stack } from "@/data/content";
import { contact } from "@/data/contact";

export default function Home() {
  const links = [["Facebook", contact.facebook], ["LinkedIn", contact.linkedin], ["Fiverr", contact.fiverr], ["WhatsApp", contact.whatsapp], ["Download CV", contact.cv]].filter(([, h]) => h);
  const mq = [...bio.tags, ...bio.tags];
  return (
    <>
      <Experience />
      <div className="bar" /><div className="cur"><i /></div>
      <header className="nav">
        <a href="#top" className="logo">Shishir<em>.</em></a>
        <nav><a href="#about">About</a><a href="#career">Career</a><a href="#stack">Stack</a><a href="#contact">Contact</a></nav>
      </header>
      <main id="top">
        <section className="hero">
          <h1><span>Shishir</span><em>.</em></h1>
          <p className="lead">Designing ideas. <i>Building digital experiences.</i></p>
          <div className="herofoot">
            <p>{bio.line}</p>
            <p className="avail"><b /> Available for freelance &amp; remote work</p>
          </div>
        </section>
        <div className="mq" aria-hidden="true"><div>{mq.map((t, i) => <span key={i}>{t}</span>)}</div></div>

        <section id="about" className="sec rv">
          <p className="eye">01 / About</p>
          <div className="about">
            <div className="ph">
              <img src="/images/shishir.jpg" alt="Shishir (Shariar Chowdhury)" width={340} height={340} />
              <span className="tag t1">Designer</span><span className="tag t2">Marketer</span><span className="tag t3">Developer</span>
            </div>
            <div>
              <h2>Creative work with a <i>business</i> brain.</h2>
              <p className="big">{bio.about}</p>
              <dl className="facts">{bio.facts.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
              <a className="btn" href="#contact">Work with me <span>→</span></a>
            </div>
          </div>
        </section>

        <section className="sec rv">
          <p className="eye">02 / What I do</p>
          <div className="rows">{expertise.map(([t, d], i) => (<div className="row" key={t}><em>0{i + 1}</em><h3>{t}</h3><p>{d}</p></div>))}</div>
        </section>

        <section className="sec rv">
          <div className="stats">{stats.map(([n, l]) => (<div key={l}><strong>{n}</strong><span>{l}</span></div>))}</div>
        </section>

        <section id="process" className="sec rv">
          <p className="eye">03 / How I work</p>
          <div className="cols">{process.map(([n, t, d]) => (<article key={n}><em>{n}</em><h3>{t}</h3><p>{d}</p></article>))}</div>
        </section>

        <section className="sec rv">
          <p className="eye">04 / Why work with me</p>
          <div className="rows">{why.map(([t, d], i) => (<div className="row" key={t}><em>0{i + 1}</em><h3>{t}</h3><p>{d}</p></div>))}</div>
        </section>

        <section id="career" className="sec rv">
          <p className="eye">05 / Career &amp; experience</p>
          <Career />
        </section>

        <section id="stack" className="sec rv">
          <p className="eye">06 / Tech stack</p>
          <div className="stack">{stack.map(([cat, items]) => (
            <div className="srow" key={cat}><h4>{cat}</h4>
              <p>{items.map(([n, u]) => (<a key={n} href={u} target="_blank" rel="noreferrer">{n}</a>))}</p></div>
          ))}</div>
        </section>

        <section id="contact" className="sec rv">
          <p className="eye">07 / Contact</p>
          <h2 className="mega">Let&apos;s build something <i>worth</i> remembering.</h2>
          <a className="mail" href={`mailto:${contact.email}`}>{contact.email}</a>
          <Form />
          <p className="links">{links.map(([n, h]) => (<a key={n} href={h as string} target="_blank" rel="noreferrer">{n} ↗</a>))}</p>
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} Shariar Chowdhury (Shishir)</span><span>Rangpur, Bangladesh</span></footer>
    </>
  );
}
