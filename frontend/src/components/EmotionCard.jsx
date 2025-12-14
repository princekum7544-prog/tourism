import React from 'react';

const EmotionCard = ({ emotion, icon, selected, onClick }) => {
    return (
        <div
            className={`emotion-card ${selected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="icon">{icon}</div>
            <div className="label">{emotion.charAt(0).toUpperCase() + emotion.slice(1).replace('_', ' ')}</div>

            <style jsx>{`
                .emotion-card {
                    background: var(--color-bg-card);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    box-shadow: var(--shadow-soft);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }
                .emotion-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-hover);
                }
                .emotion-card.selected {
                    border-color: var(--color-accent);
                    background-color: #F8FAFC;
                }
                .icon {
                    font-size: 2.5rem;
                }
                .label {
                    font-weight: 500;
                    color: var(--color-text-primary);
                }
            `}</style>
        </div>
    );
};

export default EmotionCard;
