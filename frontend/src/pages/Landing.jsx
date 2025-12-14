import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="content text-center fade-in">
                <h1 className="title">Travel that matches your <br /> <span className="highlight">state of mind</span>.</h1>
                <p className="subtitle">
                    Forget destinations. Tell us how you feel, and we'll tell you where to go.
                </p>
                <div className="cta-container">
                    <button className="btn-primary" onClick={() => navigate('/plan')}>
                        Start your Journey
                    </button>
                </div>
            </div>

            <style jsx>{`
                .landing-page {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                }
                .title {
                    font-size: 4rem;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    color: white;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                }
                .highlight {
                    color: var(--color-accent);
                }
                .subtitle {
                    font-size: 1.5rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 48px;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>
        </div>
    );
};

export default Landing;
