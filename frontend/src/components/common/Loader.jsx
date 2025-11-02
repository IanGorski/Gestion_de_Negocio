import "./Loader.css";

const Loader = ({ fullScreen = false, text = "Cargando..." }) => {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader"></div>
        {text && <p className="loader-text">{text}</p>}
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className="loader"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
