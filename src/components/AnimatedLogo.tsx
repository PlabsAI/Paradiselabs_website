const AnimatedLogo = () => {
  // Define styles within the component
  const styles = `
    .animated-logo-hover {
      content: attr(data-text);
    }
    
    .animated-logo-button:hover .hover-text {
      width: 100%;
      filter: drop-shadow(0 0 23px var(--logoAnimation));
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <button
        className="animated-logo-button m-0 h-auto bg-transparent p-0 border-none cursor-pointer text-sm font-semibold relative"
        data-text="Veyron"
      >
        <span className="actual-text inline-block font-inherit text-[var(--header-text)]">
          Veyron
        </span>
        <span 
          aria-hidden="true" 
          className="hover-text absolute box-border text-[var(--logoAnimation)] w-0 inset-0 overflow-hidden transition-[width] duration-500 font-inherit animated-logo-hover"
        >
          Veyron
        </span>
      </button>
    </>
  );
};

export default AnimatedLogo;