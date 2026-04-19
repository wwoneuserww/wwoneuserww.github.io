import { useState } from "react";

interface Props {
  src: string;
  poster: string;
  title: string;
}

const styles = {
  container: {
    position: "relative" as const,
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#000",
    aspectRatio: "16 / 9",
  },
  poster: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    cursor: "pointer",
  },
  playOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  playButton: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.2s ease",
  },
  playIcon: {
    width: "24px",
    height: "24px",
    marginLeft: "4px",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
  },
  title: {
    position: "absolute" as const,
    bottom: "0",
    left: "0",
    right: "0",
    padding: "24px 12px 8px",
    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
    color: "#fff",
    fontSize: "12px",
    fontWeight: 500,
  },
};

export default function VideoPlayer({ src, poster, title }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      style={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isPlaying ? (
        <>
          <img src={poster} alt={title} style={styles.poster} onClick={handlePlay} />
          <div 
            style={{
              ...styles.playOverlay,
              background: isHovered ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.3)",
            }}
            onClick={handlePlay}
          >
            <div 
              style={{
                ...styles.playButton,
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="#1A1A2E" style={styles.playIcon}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div style={styles.title}>{title}</div>
        </>
      ) : (
        <video
          src={src}
          style={styles.video}
          controls
          autoPlay
          playsInline
        />
      )}
    </div>
  );
}
