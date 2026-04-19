import { useState } from "react";
import type { Project, ProjectStep } from "@/data/resume";
import VideoPlayer from "./VideoPlayer";

const styles = {
  card: {
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
    overflow: "hidden",
    transition: "box-shadow 0.2s ease",
  } as React.CSSProperties,
  cardFeatured: {
    borderLeft: "4px solid var(--color-accent)",
  } as React.CSSProperties,
  imageWrapper: {
    width: "100%",
    aspectRatio: "5/3",
    background: "var(--color-bg-muted)",
    borderBottom: "1px solid var(--color-border-light)",
    overflow: "hidden",
  } as React.CSSProperties,
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  } as React.CSSProperties,
  videoGallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    marginBottom: "16px",
  } as React.CSSProperties,
  videoGalleryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--color-muted)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  } as React.CSSProperties,
  cardContent: {
    padding: "24px",
  } as React.CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    marginBottom: "12px",
  },
  headerDesktop: {
    "@media (min-width: 768px)": {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "17px",
    fontWeight: 600,
    color: "var(--color-foreground)",
    margin: 0,
    lineHeight: 1.4,
  },
  subtitle: {
    fontFamily: "var(--font-heading)",
    fontStyle: "italic" as const,
    fontSize: "14px",
    color: "var(--color-muted)",
    margin: "4px 0 0 0",
  },
  date: {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--color-muted-light)",
    flexShrink: 0,
  },
  text: {
    fontSize: "14px",
    color: "var(--color-muted)",
    lineHeight: 1.75,
    marginBottom: "16px",
  },
  approach: {
    fontSize: "14px",
    color: "var(--color-muted)",
    lineHeight: 1.75,
    marginBottom: "16px",
  },
  approachLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--color-accent)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginRight: "6px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px",
    marginBottom: "16px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: "9999px",
    background: "var(--color-bg-muted)",
    color: "var(--color-muted)",
    border: "1px solid var(--color-border-light)",
  },
  expandBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--color-accent)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  details: {
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  detailsInner: {
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "1px solid var(--color-border-light)",
  },
  sectionLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--color-foreground)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "12px",
  },
  stepItem: {
    display: "flex",
    gap: "12px",
  },
  stepIconCol: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    paddingTop: "2px",
  },
  stepLine: {
    width: "1px",
    flex: 1,
    background: "var(--color-border)",
    margin: "6px 0",
    minHeight: "16px",
  },
  stepContent: {
    paddingBottom: "16px",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  stepLabel: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--color-foreground)",
  },
  stepOutcome: {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--color-muted-light)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  stepDesc: {
    fontSize: "13px",
    color: "var(--color-muted)",
    lineHeight: 1.7,
  },
  highlightList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  highlightItem: {
    fontSize: "13px",
    color: "var(--color-muted)",
    lineHeight: 1.7,
    paddingLeft: "16px",
    position: "relative" as const,
  },
  highlightDot: {
    position: "absolute" as const,
    left: 0,
    top: "0.6em",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--color-accent-muted)",
  },
};

function StepIcon({ outcome }: { outcome: ProjectStep["outcome"] }) {
  if (outcome === "success") {
    return (
      <svg width="16" height="16" fill="none" stroke="var(--color-accent)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (outcome === "ongoing") {
    return (
      <svg width="16" height="16" fill="none" stroke="var(--color-muted)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" fill="none" stroke="var(--color-muted-light)" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
    </svg>
  );
}

function EvolutionTimeline({ steps }: { steps: ProjectStep[] }) {
  return (
    <div>
      {steps.map((step, i) => (
        <div key={i} style={styles.stepItem}>
          <div style={styles.stepIconCol}>
            <StepIcon outcome={step.outcome} />
            {i < steps.length - 1 && <div style={styles.stepLine} />}
          </div>
          <div style={styles.stepContent}>
            <div style={styles.stepHeader}>
              <span style={styles.stepLabel}>{step.label}</span>
              <span style={styles.stepOutcome}>
                {step.outcome === "success" ? "completed" : step.outcome === "ongoing" ? "in progress" : "abandoned"}
              </span>
            </div>
            <p style={styles.stepDesc}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = project.evolution || project.highlights;

  const cardStyle = project.featured 
    ? { ...styles.card, ...styles.cardFeatured }
    : styles.card;

  return (
    <div style={cardStyle}>
      {/* Project Image */}
      {project.image && (
        <div style={styles.imageWrapper}>
          <img 
            src={project.image} 
            alt={`${project.title} visualization`}
            style={styles.image}
          />
        </div>
      )}
      
      <div style={styles.cardContent}>
        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>{project.title}</h3>
            <p style={styles.subtitle}>{project.subtitle}</p>
          </div>
          <span style={styles.date}>{project.period}</span>
        </div>

        <p style={styles.text}>{project.motivation}</p>

        {project.approach && (
          <div style={styles.approach}>
            <span style={styles.approachLabel}>Approach</span>
            {project.approach}
          </div>
        )}

        {/* Video Demos */}
        {project.videos && project.videos.length > 0 && (
          <div>
            <div style={styles.videoGalleryHeader}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              Demo Videos
            </div>
            <div style={styles.videoGallery}>
              {project.videos.map((video, idx) => (
                <VideoPlayer
                  key={idx}
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                />
              ))}
            </div>
          </div>
        )}

        <div style={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} style={styles.badge}>{tag}</span>
          ))}
        </div>

        {hasDetails && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              style={styles.expandBtn}
            >
              <svg 
                width="16" 
                height="16" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ 
                  transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {expanded ? "Hide Details" : "View Details"}
            </button>

            <div 
              style={{
                ...styles.details,
                maxHeight: expanded ? "1000px" : "0",
                opacity: expanded ? 1 : 0,
              }}
            >
              <div style={styles.detailsInner}>
                {project.evolution && (
                  <div style={{ marginBottom: "20px" }}>
                    <p style={styles.sectionLabel}>Research Trajectory</p>
                    <EvolutionTimeline steps={project.evolution} />
                  </div>
                )}

                {project.highlights && (
                  <div>
                    <p style={styles.sectionLabel}>Contributions</p>
                    <ul style={styles.highlightList}>
                      {project.highlights.map((h, i) => (
                        <li key={i} style={styles.highlightItem}>
                          <span style={styles.highlightDot} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
