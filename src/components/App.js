import './App.css';
import { DeepChat } from 'deep-chat-react';
import { useState } from 'react';
import { TbMessageChatbot } from "react-icons/tb";
import FeedbackWindow from './FeedbackWindow';

function App() {
  const [chatVisible, setChatVisible] = useState(false);
  const [openTime, setOpenTime] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const requestInterceptor = (request) => {
    console.log('Requête DeepChat interceptée:', request);

    if (request.body && request.body.messages) {
      request.body.messages = request.body.messages.map(msg => ({
        role: msg.role || 'user',
        content: msg.text || '',
      }));
      request.body.thread_id = localStorage.getItem('thread_id');
    }

    return request;
  };

  async function responseInterceptor(response) {
    console.log('Réponse DeepChat interceptée:', response);
    if (response.thread_id) {
      localStorage.setItem('thread_id', response.thread_id);
    }

    return {
      text: response.text
    };
  }

  const handleRefresh = () => {
    localStorage.removeItem('thread_id');
    window.location.reload();
  };

  const sendChatbotOpenEvent = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'chatbot_opened',
        'bot': 'IdeaBot'
      });
    }
  };

  const sendChatbotCloseEvent = (duration) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'chatbot_closed',
        'bot': 'IdeaBot',
        'duration': duration
      });
    }
  };

  const sendPositiveFeedbackEvent = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'chatbot_positive_feedback',
        'bot': 'IdeaBot'
      });
    }
  };

  const toggleChatVisibility = () => {
    if (!chatVisible) {
      sendChatbotOpenEvent();
      setOpenTime(Date.now());
      setChatVisible(true);
    } else {
      const duration = Math.round((Date.now() - openTime) / 1000);
      console.log('duration', duration);
      sendChatbotCloseEvent(duration);
      setFeedbackVisible(true);
    }
  };

  const handleFeedbackCompletion = (isPositive) => {
    if (isPositive) {
      sendPositiveFeedbackEvent();
    }
    setFeedbackVisible(false);
    setChatVisible(false);
  };

  return (
    <div className="App">
      <button onClick={toggleChatVisibility}
        style={{
          zIndex: 1000,
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          height: '5rem',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
        {!chatVisible && <TbMessageChatbot size={70} />}
      </button>
      <a href="#" onClick={handleRefresh} style={{
        zIndex: 1000,
        position: 'fixed',
        top: '1rem',
        right: '50%',
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }}>Nouvelle conversation</a>

      {chatVisible && (
        <>
          <DeepChat
            request={{
              url: "/chatbot-idea/completion",
              method: "post",
              headers: {
                "Content-Type": "application/json"
              }
            }}
            requestInterceptor={requestInterceptor}
            responseInterceptor={responseInterceptor}
            style={{
              borderRadius: '2px',
              height: '100%',
              width: '90svw',
              position: 'relative',
              paddingTop: "10px",
              backgroundImage: "linear-gradient(to bottom right, #0306fe, #a6e9ea)"
            }}
            textInput={{
              placeholder: { "text": "Posez-moi vos questions", "style": { "color": "#100339" } },
              styles: {
                "container": {
                  "width": "95%",
                }
              }
            }}
            introMessage={{ text: "Bonjour ! Je suis IdeaBot, l'assistant virtuel de l'agence Ideagency. Je suis là pour vous aider à choisir la licence HubSpot idéale. Quels sont vos besoins ? \n \n Découvrir les fonctionnalités ?\n \nTrouver la licence adaptée à vos objectifs ?\n \nObtenir une estimation de prix personnalisée ?\n \n Comment puis-je vous aider ?", role: "ai" }}
          />
          <a href="#" onClick={toggleChatVisibility}>Fermer</a>
        </>
      )}
      
      {feedbackVisible && 
        <FeedbackWindow 
          onFeedback={handleFeedbackCompletion} 
          duration={Math.round((Date.now() - openTime) / 1000)}
        />
      }
    </div>
  );
}

export default App;