export default function BtnAllProjects({ title, link, arrow = true, className = '', style = {} }) {
    return (
        <div className="row">
            <div className="col-12">
                <div className={`d-flex align-items-center more-projects-section more-projects-footer ${className}`}>
                    <a href={link} target="_blank" rel="noreferrer" className="btn btn-accent hs-cta-btn d-inline-flex align-items-center project-btn more-projects-btn" style={style}>
                        <span className="talk-inner d-flex justify-content-between">
                            <span className="project-text top">{title}{arrow && <span className="arrow ms-3">&#8599;</span>}</span>
                            <span className="project-text bottom">{title}{arrow && <span className="arrow ms-3">&#8599;</span>}</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
