'use client';
import styles from '../../styles/IslamicPatterns.module.css';

const IslamicPatterns = ({ variant = 'header', opacity = 0.08 }) => {
  return (
    <div className={styles.patternContainer} style={{ opacity }}>
      {/* Geometric Star Pattern */}
      {variant === 'header' && (
        <svg className={styles.pattern} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamicPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* 8-pointed star */}
              <g transform="translate(50, 50)">
                <path d="M 0,-30 L 8,-8 L 30,0 L 8,8 L 0,30 L -8,8 L -30,0 L -8,-8 Z" 
                      fill="currentColor" opacity="0.4"/>
                <circle cx="0" cy="0" r="12" fill="currentColor" opacity="0.6"/>
                
                {/* Corner decorations */}
                <path d="M -45,-45 L -40,-35 L -35,-40 Z" fill="currentColor" opacity="0.3"/>
                <path d="M 45,-45 L 40,-35 L 35,-40 Z" fill="currentColor" opacity="0.3"/>
                <path d="M -45,45 L -40,35 L -35,40 Z" fill="currentColor" opacity="0.3"/>
                <path d="M 45,45 L 40,35 L 35,40 Z" fill="currentColor" opacity="0.3"/>
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamicPattern)"/>
        </svg>
      )}

      {/* Arabesque Pattern */}
      {variant === 'arabesque' && (
        <svg className={styles.pattern} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arabesquePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40,0 Q60,20 40,40 Q20,60 40,80 M40,0 Q20,20 40,40 Q60,60 40,80" 
                    stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <path d="M0,40 Q20,60 40,40 Q60,20 80,40 M0,40 Q20,20 40,40 Q60,60 80,40" 
                    stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arabesquePattern)"/>
        </svg>
      )}

      {/* Mandala Pattern */}
      {variant === 'mandala' && (
        <svg className={styles.pattern} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <g id="petalGroup" transform="translate(150, 150)">
              {[...Array(8)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 45})`}>
                  <ellipse cx="0" cy="-60" rx="15" ry="40" fill="currentColor" opacity="0.25"/>
                  <ellipse cx="0" cy="-40" rx="10" ry="25" fill="currentColor" opacity="0.35"/>
                </g>
              ))}
              <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
              <circle cx="0" cy="0" r="15" fill="currentColor" opacity="0.3"/>
            </g>
          </defs>
          <use href="#petalGroup"/>
        </svg>
      )}
    </div>
  );
};

export default IslamicPatterns;