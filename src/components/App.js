import './App.css';
import { DeepChat } from 'deep-chat-react';

// When npm  run build, go to index.html add     <meta name="referrer" content="origin-when-cross-origin"> and change href link / into ./

function App() {


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
    }

      ;
  };

  return (
    <div className="App">
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
          borderRadius: '10px',
          height: '90svh',
          width: '90svw',
        }}

        messageStyles={{
          default: {
            shared: {
              bubble: {

                maxWidth: "100%", backgroundColor: "unset", marginTop: "15px", marginBottom: "15px", color: "#100339"
              }
            },
            user: {
              bubble: {
                marginLeft: "0px"
              }
            },
            ai: {
              outerContainer: {
                backgroundColor: "#f3f9ff", borderTop: "1px solid #100339", borderBottom: "1px solid #100339"
              },

            }
          }
        }}

        textInput={{ placeholder: { "text": "Posez-moi vos questions?", "style": {"color": "#100339"}},
                      styles: {
                                "container": {
                                  "width": "95%",
                                  "height": "2em",
                                  "border": "1px solid #100339"
                                },
                              }
        }}
        submitButtonStyles={{
          svg :{
            "styles":{
              "default":{
                "fill": "#100339"
              }
            }
          }
        }}
        introMessage={{ text: "Bonjour ! Je suis IdeaBot, l'assistant virtuel de l'agence Ideagency. Je suis là pour vous aider à choisir la licence HubSpot idéale. Quels sont vos besoins ? \n \n Découvrir les fonctionnalités ?\n \nTrouver la licence adaptée à vos objectifs ?\n \nObtenir une estimation de prix personnalisée ?\n \n Comment puis-je vous aider ?", "style": {"color": "#100339" }}} />
    </div>
  );
}

export default App;