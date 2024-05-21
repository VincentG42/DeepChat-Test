
import './App.css';
import { DeepChat } from 'deep-chat-react';


function App() {


  const apiKey = process.env.REACT_APP_OPENAI;



  const initialMessages = [
    
    { role: 'ai', text: "Je suis ici pour vous aider à choisir l'offre HubSpot la plus adaptée à vos besoins. Comment puis-je vous aider?" },
  ];

  return (
    <div className="App">

        <div className='botContainer'>
            <DeepChat style={{ borderRadius: '10px',
                              boxShadow: '1px 8px 4px 4px #000000'
                            }} 
                      directConnection={{
                        openAI: {
                          key: apiKey, 
                          assistant: true,
                          chat: {"system_prompt": "Vous êtes un assistant virtuel spécialisé dans l'aide à la sélection du bon pack HubSpot pour les entreprises. Lorsque vous interagissez avec les utilisateurs, vous devez : 1. Comprendre les besoins spécifiques de l'entreprise : Posez des questions pour identifier les besoins et les objectifs principaux de l'utilisateur avec HubSpot. Précisez si l'utilisateur recherche des solutions pour le marketing, les ventes, le service client ou la gestion CRM. 2. Utiliser les informations disponibles sur HubSpot.fr : Dirigez l'utilisateur vers les ressources disponibles sur le site HubSpot.fr pour obtenir plus d'informations détaillées. Fournissez des liens utiles vers des pages spécifiques relatives aux services ou packs mentionnés. 3. Utiliser l'euro comme devise : Assurez-vous que toutes les informations tarifaires ou financières sont indiquées en euros, sauf demande explicite du client. 4. Limiter les réponses aux sujets pertinents : Répondez uniquement aux questions concernant HubSpot ou les besoins de l'entreprise de l'utilisateur. Si une question est hors sujet, informez poliment l'utilisateur que vous ne pouvez répondre qu'aux questions en rapport avec HubSpot ou leurs besoins d'entreprise. 5. Utiliser un ton courtois et le vouvoiement : Adoptez un ton poli et professionnel en vouvoiement lors de toutes les interactions. 6. Proposer un contact direct en conclusion : Terminez toujours chaque interaction en proposant à l'utilisateur de fournir son numéro de téléphone ou son adresse e-mail pour être contacté directement par Ideagency pour des précisions supplémentaires ou pour engager un processus de collaboration. Exemple de dialogue : Utilisateur : 'Quel pack HubSpot est le plus adapté pour une petite entreprise ?' Assistant : 'Pour identifier le pack HubSpot le plus adapté à votre petite entreprise, pourriez-vous m'en dire un peu plus sur vos besoins principaux ? Est-ce pour le marketing, les ventes, le service client ou la gestion CRM ? Vous pouvez également consulter les différents packs disponibles sur HubSpot.fr. N'hésitez pas à me fournir votre numéro de téléphone ou votre adresse e-mail, pour qu'un conseiller de Ideagency puisse vous contacter et vous apporter plus de précisions.'"}
                        }
                      }}
                      // demo={true} 
                      messageStyles={{
                        default: {
                          shared: {
                            bubble: {
                              maxWidth: "100%", backgroundColor: "unset", marginTop: "10px", marginBottom: "10px", color: "#100339"}},
                          user: {
                            bubble: {
                              marginLeft: "0px"}},
                          ai: {
                            outerContainer: {
                              backgroundColor: "rgba(247,247,248)", borderTop: "1px solid rgba(0,0,0,.1)", borderBottom: "1px solid rgba(0,0,0,.1)"
                            },
                            
                            }
                          }
                        }
                      }
                      textInput={{placeholder: {"text": "Posez-moi vos questions?"}}} 
                      initialMessages={initialMessages}/>
          </div>
      {/* } */}
    </div>
  );
}

export default App;
