import './App.css';
import { DeepChat } from 'deep-chat-react';
import { useState } from 'react';
import { TbMessageChatbot } from "react-icons/tb";
import FeedbackWindow from './FeedbackWindow';

// When npm  run build, go to index.html add     <meta name="referrer" content="origin-when-cross-origin"> and change href link "/"" into ""./""
//If you change introMessage, please consider changing the open ai assistant instructions prompt

function App() {
  const [chatVisible, setChatVisible] = useState(false);
  const [openTime, setOpenTime] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const requestInterceptor = (request) => {
    // console.log('Requête DeepChat interceptée:', request);

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
    // console.log('Réponse DeepChat interceptée:', response);
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
      <a href="link" onClick={handleRefresh} style={{
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
              height: '100%',
              width: '50svw',
              position: 'relative',
              paddingTop: "10px",
              borderRadius: "20px",
              backgroundColor:"#F4F6FC"
            }}
            messageStyles={{
              default: {
                shared: {bubble: {"maxWidth": "100%", "backgroundColor": "unset", "marginTop": "10px", "marginBottom": "10px"}},
                user: {bubble: {"marginLeft": "0px", "color": "black"}},
                ai: {innerContainer: {"borderRadius": "20px", "backgroundColor": "white"}}
              }
          }}
            textInput={{
              placeholder: { "text": "Posez-moi vos questions", "style": { "color": "#100339" } },
              styles: {
                container: { "borderRadius": "10px", "border": "1px solid #969696", "boxShadow": "unset", "width": "90%", "marginLeft": "-15px" },
              }
            }}

            introMessage={{ text: "Bonjour ! Je suis IdeaBot, l'assistant virtuel de l'agence Ideagency. Je suis là pour vous aider à choisir la licence HubSpot idéale. Quels sont vos besoins ? \n \n Découvrir les fonctionnalités ?\n \nTrouver la licence adaptée à vos objectifs ?\n \nObtenir une estimation de prix personnalisée ?\n \n Comment puis-je vous aider ?", role: "ai" }}
          />
          <a href="link" onClick={toggleChatVisibility}>Fermer</a>

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