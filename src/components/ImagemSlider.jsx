import { useState, useEffect } from 'react';

const ImageSlider = () => {
  // Carregar todas as imagens da pasta
  const images = Object.values(import.meta.glob('../assets/imgs/we/*.jpeg', { eager: true })).map(
    module => module.default
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Controle de animação

  // Avançar automaticamente a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval); // Limpar intervalo ao desmontar
  }, []);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }
  };

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false); // Permitir nova animação após o fim
  };

  return (
    <div className="relative w-52 h-96 mx-auto mt-6">
      {/* Card do slider */}
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-transparent">
        {images.length > 0 ? (
          <div
            className="w-full h-full flex transition-all duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Move as imagens para a esquerda com base no índice
              transition: isAnimating ? 'transform 1s ease-in-out' : 'none' // Adiciona transição só quando necessário
            }}
            onTransitionEnd={handleAnimationEnd} // Reseta o estado de animação ao terminar a transição
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover" // Garante que a imagem preencha o card
                style={{ width: '100%', height: '100%' }} // Garantir que o tamanho seja forçado a preencher o card
              />
            ))}
          </div>
        ) : (
          <p>Carregando imagens...</p>
        )}
      </div>

      {/* Botão anterior */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-white text-gray-800 p-1 rounded-full shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 w-3 h-3" /* Tamanho reduzido */
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Botão próximo */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white text-gray-800 p-1 rounded-full shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 w-3 h-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
