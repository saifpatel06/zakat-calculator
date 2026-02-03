'use client';
import styles from '../../styles/Islamicmotif.module.css';

const IslamicMotif = ({ size = 'medium', variant = 'crescent', animated = true }) => {
  return (
    <div className={`${styles.motifContainer} ${styles[size]}`}>
      {variant === 'crescent' && (
        <svg 
          className={`${styles.motif} ${animated ? styles.animated : ''}`}
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crescent Moon */}
          <defs>
            <linearGradient id="crescentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#f4d03f', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main Crescent */}
          <path 
            d="M 100 40 Q 60 100 100 160 Q 120 140 120 100 Q 120 60 100 40 Z" 
            fill="url(#crescentGradient)"
            filter="url(#glow)"
            className={styles.crescent}
          />
          
          {/* Star */}
          <g transform="translate(140, 60)">
            <path 
              d="M 0,-15 L 4,-4 L 16,-4 L 6,4 L 10,15 L 0,8 L -10,15 L -6,4 L -16,-4 L -4,-4 Z" 
              fill="url(#crescentGradient)"
              filter="url(#glow)"
              className={styles.star}
            />
          </g>

          {/* Decorative particles */}
          <circle cx="130" cy="90" r="2" fill="#d4af37" opacity="0.6" className={styles.particle1}/>
          <circle cx="150" cy="80" r="1.5" fill="#f4d03f" opacity="0.5" className={styles.particle2}/>
          <circle cx="145" cy="100" r="1" fill="#d4af37" opacity="0.7" className={styles.particle3}/>
        </svg>
      )}

      {variant === 'lantern' && (
        <svg 
          className={`${styles.motif} ${animated ? styles.animated : ''}`}
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lanternGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#b8860b', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Lantern Top */}
          <ellipse cx="100" cy="60" rx="25" ry="8" fill="url(#lanternGradient)"/>
          
          {/* Lantern Body */}
          <path 
            d="M 75 60 L 70 130 Q 70 145 85 145 L 115 145 Q 130 145 130 130 L 125 60 Z" 
            fill="url(#lanternGradient)"
            opacity="0.3"
            className={styles.lanternBody}
          />
          
          {/* Lantern Frame */}
          <rect x="75" y="70" width="50" height="3" fill="#d4af37" rx="1"/>
          <rect x="75" y="90" width="50" height="2" fill="#d4af37" rx="1"/>
          <rect x="75" y="110" width="50" height="2" fill="#d4af37" rx="1"/>
          <rect x="75" y="130" width="50" height="3" fill="#d4af37" rx="1"/>

          {/* Vertical frames */}
          <rect x="90" y="60" width="2" height="85" fill="#d4af37"/>
          <rect x="108" y="60" width="2" height="85" fill="#d4af37"/>

          {/* Light glow */}
          <ellipse 
            cx="100" 
            cy="100" 
            rx="20" 
            ry="30" 
            fill="#f4d03f" 
            opacity="0.4"
            className={styles.lanternGlow}
          />

          {/* Lantern Bottom */}
          <ellipse cx="100" cy="145" rx="25" ry="8" fill="url(#lanternGradient)"/>
          
          {/* Hanging chain */}
          <line x1="100" y1="40" x2="100" y2="60" stroke="#d4af37" strokeWidth="2"/>
          <circle cx="100" cy="40" r="3" fill="#d4af37"/>
        </svg>
      )}

      {variant === 'dome' && (
        <svg 
          className={`${styles.motif} ${animated ? styles.animated : ''}`}
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="domeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#064e3b', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Dome */}
          <path 
            d="M 50 100 Q 50 60 100 60 Q 150 60 150 100 L 150 120 L 50 120 Z" 
            fill="url(#domeGradient)"
            className={styles.dome}
          />
          
          {/* Crescent on top */}
          <g transform="translate(100, 50)">
            <path 
              d="M 0,-15 Q -8,-7 0,0 Q 3,-2 3,-7 Q 3,-12 0,-15 Z" 
              fill="#d4af37"
            />
            <circle cx="5" cy="-12" r="2" fill="#d4af37"/>
          </g>

          {/* Base */}
          <rect x="45" y="120" width="110" height="5" fill="#047857" rx="2"/>
          
          {/* Windows */}
          <ellipse cx="75" cy="90" rx="8" ry="12" fill="#d4af37" opacity="0.6"/>
          <ellipse cx="100" cy="90" rx="8" ry="12" fill="#d4af37" opacity="0.6"/>
          <ellipse cx="125" cy="90" rx="8" ry="12" fill="#d4af37" opacity="0.6"/>
        </svg>
      )}
    </div>
  );
};

export default IslamicMotif;