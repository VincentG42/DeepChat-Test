import React from 'react';

const FeedbackWindow = ({ onFeedback, duration }) => {
    const handleFeedback = (isPositive) => {
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': isPositive ? 'chatbot_positive_feedback' : 'chatbot_negative_feedback',
                'bot': 'IdeaBot',
                'duration': duration
            });
        }
        onFeedback(isPositive);
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            zIndex: 1001,
            textAlign: 'center'
        }}>
            <h3 style={{ marginBottom: '15px' }}>Votre avis nous intéresse</h3>
            <p style={{ marginBottom: '20px' }}>L'utilisation du chatbot a-t-elle été utile ?</p>
            <div>
                <button
                    onClick={() => handleFeedback(true)}
                    style={{
                        padding: '10px 20px',
                        margin: '0 10px',
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Oui
                </button>
                <button
                    onClick={() => handleFeedback(false)}
                    style={{
                        padding: '10px 20px',
                        margin: '0 10px',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Non
                </button>
            </div>
        </div>
    );
};

export default FeedbackWindow;