export default function BtnAllProjects() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center align-items-center more-projects-section more-projects-footer">
                        <a href="https://github.com/MatteoPaglietta?tab=repositories" target="_blank" rel="noreferrer" className="btn btn-accent hs-cta-btn d-inline-flex align-items-center project-btn more-projects-btn">
                            <span className="talk-inner d-flex justify-content-between">
                                <span className="project-text top">more projects<span className="arrow ms-3">&#8599;</span></span>
                                <span className="project-text bottom">more projects<span className="arrow ms-3">&#8599;</span></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
