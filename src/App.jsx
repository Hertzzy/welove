import { useState, useEffect } from 'react';
import ImageSlider from './components/ImagemSlider';

const App = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2023-08-25');
    const intervalId = setInterval(() => {
      const currentDate = new Date();

      // Calculando a diferença em anos
      const years = currentDate.getFullYear() - startDate.getFullYear();

      // Calculando a diferença em meses
      let months = currentDate.getMonth() - startDate.getMonth() + years * 12;
      if (currentDate.getDate() < startDate.getDate()) {
        months--; // Ajusta se o dia atual for menor que o dia da data inicial
      }

      // Calculando a diferença de dias
      const startDateAdjusted = new Date(startDate);
      startDateAdjusted.setMonth(startDate.getMonth() + months); // Ajusta a data inicial com o número de meses
      const days = Math.floor((currentDate - startDateAdjusted) / (1000 * 60 * 60 * 24)); // Calcula os dias restantes

      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      setTimeRemaining({
        years,
        months: months % 12,
        days, // Agora calculando corretamente os dias
        hours,
        minutes,
        seconds
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const addHeart = () => {
      setHearts(prev => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: Math.random() * 3 + 3,
          delay: Math.random() * 5
        }
      ]);
    };

    const intervalId = setInterval(addHeart, 500);

    return () => clearInterval(intervalId);
  }, []);

  const removeHeart = id => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
  };

  return (
    <div>
      <div className="hearts-container">
        {hearts.map(heart => (
          <div
            className="heart"
            key={heart.id}
            style={{
              left: `${heart.left}vw`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`
            }}
            onAnimationEnd={() => removeHeart(heart.id)}
          >
            &#10084;
          </div>
        ))}
      </div>

      <ImageSlider />

      <div className="count">
        <span className="mt-6 text-gray-400">Juntos: </span>
        <div className="mt-2 timer">
          <div>
            <p>
              {timeRemaining.years} Ano{timeRemaining.years !== 1 ? 's' : ''}, {timeRemaining.months} mês
              {timeRemaining.months !== 1 ? 'es' : ''}, {timeRemaining.days} dia{timeRemaining.days !== 1 ? 's' : ''}
            </p>
          </div>
          <div>
            <p>
              {timeRemaining.hours} Hora{timeRemaining.hours !== 1 ? 's' : ''}, {timeRemaining.minutes} Minuto
              {timeRemaining.minutes !== 1 ? 's' : ''}, {timeRemaining.seconds} Segundo
              {timeRemaining.seconds !== 1 ? 's' : ''}
            </p>
          </div>
          &#10084;
        </div>
      </div>

      <div className="border"></div>

      <div className="text">
        <p>
          Oii minha gatinha. <br /> Sou grato a Deus por ter você em minha vida <br />
          Você é o amor da minha &#10084;&#10084;
        </p>
      </div>

      <div className="bible">
        <a href="https://www.bibliaonline.com.br/nvi/pv/31/10-31" target="blank">
          Provérvios 31: 10-30
        </a>
      </div>

      <div className="video mt-6">
        <iframe
          width="550"
          height="190"
          src="https://www.youtube.com/embed/L_LT23d96KE?autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default App;
