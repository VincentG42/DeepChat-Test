
import './App.css';
import { DeepChat } from 'deep-chat-react-dev';


function App() {

  const assistantId = process.env.REACT_APP_ASSISTANT_V1_ID;
  const apiKey = process.env.REACT_APP_OPENAI;




  const initialMessages = [

    { role: 'ai', text: "Je suis ici pour vous aider à choisir l'offre HubSpot la plus adaptée à vos besoins. Comment puis-je vous aider?" },
  ];

  return (
    <div className="App">
      <DeepChat
        directConnection={{
          openAI: {
            key: apiKey,
            assistant: {
              assistant_id: assistantId,
            }
          },
          chat: {
            system_prompt: `Vous êtes un assistant virtuel spécialisé dans l'aide à la sélection du bon pack HubSpot pour les entreprises. Fournissez des réponses claires et précises aux questions des utilisateurs concernant HubSpot en utilisant les documents fournis. Répondez uniquement en français.`
          }
        }
        }
        style={{
          borderRadius: '10px',
          boxShadow: '1px 8px 4px 4px #000000'
        }}
        messageStyles={{
          default: {
            shared: {
              bubble: {
                maxWidth: "100%", backgroundColor: "unset", marginTop: "10px", marginBottom: "10px", color: "#100339"
              }
            },
            user: {
              bubble: {
                marginLeft: "0px"
              }
            },
            ai: {
              outerContainer: {
                backgroundColor: "rgba(247,247,248)", borderTop: "1px solid rgba(0,0,0,.1)", borderBottom: "1px solid rgba(0,0,0,.1)"
              },

            }
          }
        }
        }
        textInput={{ placeholder: { "text": "Posez-moi vos questions?" } }}
        initialMessages={initialMessages} />
    </div>
  );
}

export default App;
