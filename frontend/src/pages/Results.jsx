import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { planTrip } from '../services/api';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Expecting { result, initialFormData }
    const { result: initialResult, initialFormData } = location.state || {};

    const [result, setResult] = useState(initialResult);
    const [userNotes, setUserNotes] = useState(initialFormData?.notes || '');
    const [isRefining, setIsRefining] = useState(false);

    if (!result) {
        return (
            <div className="container text-center" style={{ paddingTop: 100 }}>
                <h2>No plan found.</h2>
                <button className="btn-primary" onClick={() => navigate('/plan')}>Start Over</button>
            </div>
        );
    }

    const { emotion, summary, destinations } = result;

    const handleRefine = async () => {
        setIsRefining(true);
        try {
            const newResult = await planTrip({
                ...initialFormData,
                emotion: initialFormData.emotion,
                notes: userNotes // Use updated notes
            });
            setResult(newResult);
        } catch (error) {
            alert("Could not refine trip. Please try again.");
        } finally {
            setIsRefining(false);
        }
    };

    return (
        <div className="results-page">
            <div className="container">
                <header className="results-header text-center fade-in">
                    <p className="overline">Because you are feeling {emotion.replace('_', ' ')}</p>
                    <h1>We curated this for you.</h1>
                    <p className="mood-desc">"{summary.moodDescription}"</p>
                </header>

                <div className="refine-section fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="refine-card">
                        <textarea
                            className="refine-input"
                            placeholder="Want to tweak this? e.g. 'Actually, I prefer mountains over beaches...'"
                            value={userNotes}
                            onChange={(e) => setUserNotes(e.target.value)}
                            rows={2}
                        />
                        <button className="btn-primary refine-btn" onClick={handleRefine} disabled={isRefining}>
                            {isRefining ? "Rethinking..." : "Refine / Load More"}
                        </button>
                    </div>
                </div>

                <div className="summary-cards fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="summary-item">
                        <label>Vibe</label>
                        <span>{summary.destinationType}</span>
                    </div>
                    <div className="summary-item">
                        <label>Pace</label>
                        <span>{summary.pace}</span>
                    </div>
                    <div className="summary-item">
                        <label>Stay</label>
                        <span>{summary.stay}</span>
                    </div>
                </div>

                <div className="destinations-section fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="section-header">
                        <h3>Recommended Places</h3>
                        <span className={`source-badge ${result.source?.includes('Mock') ? 'mock' : 'ai'}`}>
                            {result.source || 'AI'}
                        </span>
                    </div>
                    <div className="destination-list">
                        {destinations.map((dest, idx) => (
                            <div key={idx} className="destination-card">
                                <div className="dest-image">
                                    <img
                                        src={`https://image.pollinations.ai/prompt/${encodeURIComponent(dest.destination)}%20scenic%20travel%20photography%204k?width=800&height=400&nologo=true`}
                                        alt={dest.destination}
                                        loading="lazy"
                                    />
                                    <div className="dest-overlay">
                                        <h4>{dest.destination}</h4>
                                        <span className="duration-tag">{dest.best_duration}</span>
                                    </div>
                                </div>
                                <div className="dest-content">
                                    <p className="dest-why">{dest.why}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="actions text-center fade-in" style={{ animationDelay: '0.5s' }}>
                    <button className="btn-tertiary" onClick={() => navigate('/plan')}>
                        Try another emotion
                    </button>
                </div>
            </div>

            <style jsx>{`
                .results-page {
                    padding: 60px 0;
                    min-height: 100vh;
                }
                .overline {
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.8rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 10px;
                }
                .mood-desc {
                    font-size: 1.2rem;
                    color: var(--color-text-secondary);
                    font-style: italic;
                    max-width: 600px;
                    margin: 0 auto 40px;
                }
                
                /* Refine Section Styles */
                .refine-section {
                    max-width: 600px;
                    margin: 0 auto 40px;
                }
                .refine-card {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    padding: 20px;
                    border-radius: var(--radius-md);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }
                .refine-input {
                    flex: 1;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: var(--radius-md);
                    padding: 12px;
                    color: white;
                    font-family: var(--font-main);
                    resize: none;
                }
                .refine-input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }
                .refine-input:focus {
                    outline: none;
                    background: rgba(0, 0, 0, 0.3);
                    border-color: var(--color-accent);
                }
                .refine-btn {
                    padding: 10px 20px;
                    font-size: 0.9rem;
                    white-space: nowrap;
                }

                .summary-cards {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-bottom: 60px;
                    flex-wrap: wrap;
                }
                .summary-item {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 20px 30px;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-soft);
                    text-align: center;
                    min-width: 120px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .summary-item label {
                    display: block;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: var(--color-text-secondary);
                    margin-bottom: 5px;
                }
                .summary-item span {
                    font-weight: 500;
                    color: var(--color-accent);
                    font-size: 1.1rem;
                }
                .destinations-section {
                    max-width: 800px;
                    margin: 0 auto 60px;
                }
                .destination-list {
                    display: grid;
                    gap: 20px;
                    margin-top: 20px;
                }
                .destination-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-soft);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .dest-image {
                    position: relative;
                    height: 200px;
                    width: 100%;
                }
                .dest-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .dest-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 20px;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .dest-overlay h4 {
                    margin: 0;
                    color: white;
                    font-size: 1.5rem;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }
                .dest-content {
                    padding: 20px;
                }
                .dest-why {
                    color: rgba(255, 255, 255, 0.9);
                    margin: 0;
                    font-size: 1.05rem;
                    line-height: 1.5;
                }
                .duration-tag {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(5px);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                .section-header h3 {
                    margin: 0;
                }
                .source-badge {
                    font-size: 0.75rem;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .source-badge.ai {
                    background-color: #C6F6D5;
                    color: #22543D;
                    border: 1px solid #9AE6B4;
                }
                .source-badge.mock {
                    background-color: #FED7D7;
                    color: #822727;
                    border: 1px solid #FEB2B2;
                }
                .actions {
                    margin-top: 40px;
                }
                
                /* New tertiary button style */
                .btn-tertiary {
                    background-color: transparent;
                    color: var(--color-sunset); /* Different color as requested */
                    border: 2px solid var(--color-sunset);
                    padding: 10px 24px;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: var(--transition-fast);
                }
                .btn-tertiary:hover {
                    background-color: var(--color-sunset);
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default Results;
