import './App.css';
import { DeepChat } from 'deep-chat-react';

function App() {

  // const assistantId = process.env.REACT_APP_ASSISTANT_V1_ID;
  // const apiKey = process.env.REACT_APP_OPENAI; 

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
        // directConnection={{
        //   openAI: {
        //     key: apiKey,
        //     assistant: {
        //       assistant_id: assistantId,
        //     }
        //   },
        //   chat: {
        //     system_prompt: `Vous êtes un assistant virtuel spécialisé dans l'aide à la sélection du bon pack HubSpot pour les entreprises. Fournissez des réponses claires et précises aux questions des utilisateurs concernant HubSpot en utilisant les documents fournis. Répondez uniquement en français.`
        //   }
        // }}
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
        introMessage={{ text: "Bonjour et bienvenue sur notre site ! Je suis votre assistant virtuel et je suis là pour vous aider à choisir la licence HubSpot qui correspond parfaitement à vos besoins. Éprouvé pour optimiser la gestion de vos contacts et améliorer votre expérience client, HubSpot offre plusieurs licences adaptées à différents objectifs. \n \n Que cherchez-vous à accomplir ? \n \n Découvrir les fonctionnalités de chaque licence ? \n \n Trouver une licence appropriée à vos objectifs spécifiques ? \n \n Obtenir une estimation de prix personnalisée selon vos besoins ? \n \n \nJe suis là pour vous guider. Dites-moi comment je peux vous aider !", "style": {"color": "#100339" }}} />
    </div>
  );
}

export default App;