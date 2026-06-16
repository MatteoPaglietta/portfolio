export default function BtnAllProjects({ title, link, arrow = true, className = '' }) {
    return (
        <div className={`d-flex align-items-center justify-content-center more-projects-section more-projects-footer w-100 ${className}`}>
            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent hs-cta-btn d-inline-flex align-items-center justify-content-center project-btn more-projects-btn"
            >
                <span className="talk-inner d-flex justify-content-between align-items-center ">
                    <span className="project-text top">
                        {title}{arrow && <span className="arrow ms-3">&#8599;</span>}
                    </span>
                    <span className="project-text bottom">
                        {title}{arrow && <span className="arrow ms-3">&#8599;</span>}
                    </span>
                </span>
            </a>
        </div>
    );
}
