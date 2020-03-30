import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    let [secs, setSecs] = React.useState(0);
    let [playing, setPlaying] = React.useState(false);
    let [descanso, setDescanso] = React.useState(false);

    //deixar o número bonito
    const prettifyNumber = (number) => {
        let numString = number+"";
        if (numString.length < 2) {
            return "0"+numString;
        }
        return number;
    }

    //Contar
    React.useEffect( () => {
        let int = setInterval(() => {}, 1000);
        if (playing) {
            if (descanso) {
                if (secs === 25 * 60) {
                    onClickReset();
                    pushNotification('PomodoroTimer', 'Seu tempo de descanso acabou! Você agora pode voltar descansado para o trabalho!');
                    setDescanso(false);
                }
            } else {
                if (secs === 5 * 60) {
                    onClickReset();
                    pushNotification('PomodoroTimer', 'Seu tempo de trabalho acabou! Você agora pode descansar por 5 minutos!');
                    setDescanso(true);
                }
            }
            int = setInterval(() => {
                setSecs(secs + 1);
            }, 1000);
        }
        return () => clearInterval(int);
    });

    const onClickStart = () => {
        setPlaying(true);
    }

    const onClickPause = () => {
        setPlaying(false);
    }

    const onClickReset = () => {
        onClickPause();
        setSecs(0);
    }

    const pushNotification = (title, body) => {
        let NotificationObj = {
            title: title,
            body: body,
        }
        if (Notification.permission == 'granted') {
            new Notification(NotificationObj.title, NotificationObj);
        } else {
            Notification.requestPermission(perm => {
                if (perm == 'granted') {
                    new Notification(NotificationObj.title, NotificationObj);
                }
            })
        }
    }

    const status = () => {
        if (playing && !descanso) {
            return 'HORA DE TRABALHAR!';
        } else if (playing && descanso) {
            return 'HORA DE DESCANSAR...';
        } else {
            return 'PAUSADO';
        }
    }

  return (
    <div className="App" style={descanso ? {backgroundColor: '#A4CA5C'} : {}}>
        <div className={'container_logo'}>
            <img src={require('./assets/backgroundPath.png')} />
            <div className={'logo'}>
                <img src={require('./assets/logo.svg')} />
            </div>
        </div>
        <div className={'content'}>
            <p>{status()}</p>
            <h1>
                {prettifyNumber(Math.floor(secs / 60 / 60))}
                :{prettifyNumber(Math.floor(secs / 60))}
                :{prettifyNumber(secs % 60)}
            </h1>
            <div className={'buttons'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <h2 onClick={() => {
                    playing ?  onClickPause(): onClickStart()
                }}>{playing ? "Pausar" : "Começar"}</h2>
                <h2 onClick={() => {
                    onClickReset();
                }}>Parar</h2>
            </div>
            <button onClick={() => {
                    if (descanso) {
                        setDescanso(false);
                        onClickReset();
                    } else {
                        setDescanso(true);
                        onClickReset();
                    }
                }} style={descanso ? {color: '#A4CA5C'} : {}}>
                {descanso ? "Pular para Trabalho" : "Pular para Descanso"}
            </button>
        </div>
        <div className={'footer'}>
            <p>Criado por Brian, Quem se Importa Ldta.</p>
        </div>
    </div>
  );
};

export default App;
