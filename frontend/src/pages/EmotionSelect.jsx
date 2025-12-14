import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmotionCard from '../components/EmotionCard';
import { planTrip } from '../services/api';

const emotions = [
    { id: 'tired', icon: '😴', label: 'Tired' },
    { id: 'stressed', icon: '🤯', label: 'Stressed' },
    { id: 'happy', icon: '🤩', label: 'Happy' },
    { id: 'overthinking', icon: '🤔', label: 'Overthinking' },
    { id: 'adventurous', icon: '🤠', label: 'Adventurous' },
    { id: 'burnt_out', icon: '🔥', label: 'Burnt Out' },
];

const EmotionSelect = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        budget: 'medium',
        duration: 'short',
        people: 'solo'
    });

    const handleEmotionSelect = (emotionId) => {
        setSelectedEmotion(emotionId);
        setTimeout(() => setStep(2), 300); // Smooth transition
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await planTrip({
                emotion: selectedEmotion,
                ...formData
            });
            navigate('/results', {
                state: {
                    result,
                    initialFormData: { ...formData, emotion: selectedEmotion } // Pass inputs for refinement
                }
            });
        } catch (error) {
            alert("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <div className="header text-center fade-in">
                <h2>{step === 1 ? "How are you feeling right now?" : "A few more details..."}</h2>
                <p className="sub-header">
                    {step === 1 ? "Be honest. We'll match the vibe." : "To tailor the experience perfectly."}
                </p>
            </div>

            {step === 1 && (
                <div className="emotion-grid fade-in">
                    {emotions.map(e => (
                        <EmotionCard
                            key={e.id}
                            emotion={e.id}
                            icon={e.icon}
                            selected={selectedEmotion === e.id}
                            onClick={() => handleEmotionSelect(e.id)}
                        />
                    ))}
                </div>
            )}

            {step === 2 && (
                <div className="form-section fade-in">
                    <div className="selected-summary" onClick={() => setStep(1)}>
                        Running away from being <strong>{selectedEmotion.replace('_', ' ')}</strong> (Change)
                    </div>

                    <div className="form-group">
                        <label>Budget</label>
                        <div className="options">
                            {['Low', 'Medium', 'High'].map(opt => (
                                <button
                                    key={opt}
                                    className={`option-btn ${formData.budget === opt.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, budget: opt.toLowerCase() })}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Duration</label>
                        <div className="options">
                            {['Short (1-3 days)', 'Medium (4-7 days)', 'Long (8+ days)'].map((opt, i) => {
                                const val = ['short', 'medium', 'long'][i];
                                return (
                                    <button
                                        key={val}
                                        className={`option-btn ${formData.duration === val ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, duration: val })}
                                    >
                                        {opt.split(' ')[0]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Who's going?</label>
                        <div className="options">
                            {['Solo', 'Couple', 'Group'].map(opt => (
                                <button
                                    key={opt}
                                    className={`option-btn ${formData.people === opt.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, people: opt.toLowerCase() })}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Travel Context (Optional)</label>
                        <textarea
                            className="context-input"
                            placeholder="e.g. I'm in Mumbai, looking for a driveable getaway. I love hiking but hate cold weather."
                            value={formData.notes || ''}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="action-area text-center">
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Dreaming up plans..." : "Find my Trip"}
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .emotion-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 20px;
                    margin-top: 40px;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .sub-header {
                    color: var(--color-text-secondary);
                    margin-bottom: 40px;
                }
                .form-section {
                    max-width: 500px;
                    margin: 40px auto;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 40px;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-soft);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .selected-summary {
                    text-align: center;
                    margin-bottom: 30px;
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    font-size: 0.9rem;
                }
                .form-group {
                    margin-bottom: 24px;
                }
                .form-group label {
                    display: block;
                    font-weight: 500;
                    margin-bottom: 12px;
                    color: white;
                }
                .options {
                    display: flex;
                    gap: 10px;
                }
                .option-btn {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: var(--radius-md);
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.8);
                    transition: all 0.2s;
                }
                .option-btn.active {
                    background: var(--color-accent);
                    color: white;
                    border-color: var(--color-accent);
                    opacity: 1;
                }
                .option-btn:hover:not(.active) {
                    background: rgba(255, 255, 255, 0.2);
                }
                .context-input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--color-ocean);
                    border-radius: var(--radius-md);
                    font-family: var(--font-main);
                    font-size: 1rem;
                    resize: vertical;
                    min-height: 80px;
                    transition: border-color 0.2s;
                }
                .context-input:focus {
                    outline: none;
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.1);
                }
                .action-area {
                    margin-top: 40px;
                }
            `}</style>
        </div>
    );
};

export default EmotionSelect;
