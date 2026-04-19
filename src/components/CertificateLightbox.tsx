import { useState, useEffect } from "react";

interface Certificate {
  src: string;
  title: string;
}

interface Props {
  certificates: Certificate[];
}

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.92)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    cursor: "zoom-out",
  },
  content: {
    position: "relative" as const,
    maxWidth: "90vw",
    maxHeight: "90vh",
    cursor: "default",
  },
  img: {
    maxWidth: "100%",
    maxHeight: "85vh",
    objectFit: "contain" as const,
    borderRadius: "8px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
  },
  title: {
    textAlign: "center" as const,
    color: "#fff",
    fontSize: "14px",
    marginTop: "16px",
    fontWeight: 500,
  },
  closeBtn: {
    position: "absolute" as const,
    top: "-40px",
    right: "0",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "32px",
    cursor: "pointer",
    padding: "8px",
    lineHeight: 1,
    opacity: 0.8,
  },
  navBtn: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    padding: "16px 12px",
    borderRadius: "8px",
    opacity: 0.8,
  },
};

export default function CertificateLightbox({ certificates }: Props) {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<{ src: string; title: string }>) => {
      const idx = certificates.findIndex(c => c.src === e.detail.src);
      if (idx !== -1) {
        setCurrentIdx(idx);
        document.body.style.overflow = "hidden";
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setCurrentIdx((currentIdx + 1) % certificates.length);
      if (e.key === "ArrowLeft") setCurrentIdx((currentIdx - 1 + certificates.length) % certificates.length);
    };

    window.addEventListener("open-lightbox", handleOpen as EventListener);
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("open-lightbox", handleOpen as EventListener);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIdx, certificates]);

  const closeLightbox = () => {
    setCurrentIdx(null);
    document.body.style.overflow = "";
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIdx !== null) {
      setCurrentIdx((currentIdx + 1) % certificates.length);
    }
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIdx !== null) {
      setCurrentIdx((currentIdx - 1 + certificates.length) % certificates.length);
    }
  };

  if (currentIdx === null) return null;

  const cert = certificates[currentIdx];

  return (
    <div style={styles.overlay} onClick={closeLightbox}>
      <div style={styles.content} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={closeLightbox} aria-label="Close">
          ×
        </button>
        
        {certificates.length > 1 && (
          <>
            <button 
              style={{ ...styles.navBtn, left: "-60px" }}
              onClick={goPrev}
              aria-label="Previous"
            >
              ‹
            </button>
            <button 
              style={{ ...styles.navBtn, right: "-60px" }}
              onClick={goNext}
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}
        
        <img src={cert.src} alt={cert.title} style={styles.img} />
        <div style={styles.title}>
          {cert.title}
          {certificates.length > 1 && (
            <span style={{ opacity: 0.6, marginLeft: "8px" }}>
              ({currentIdx + 1} / {certificates.length})
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
