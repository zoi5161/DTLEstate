import React, { useState } from 'react';
import styles from './Dot.module.css';

interface DotProps {
  id: string;
  top: string | number;
  left: string | number;
  color?: string;
  size?: number;
  infoImage?: string;  // URL ảnh
  infoTitle?: string;
  infoPrice?: string | number;
}

const Dot: React.FC<DotProps> = ({
  id,
  top,
  left,
  color = 'black',
  size = 7,
  infoImage,
  infoTitle,
  infoPrice,
}) => {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: color,
    top,
    left,
  };

  return (
    <div
      id={id}
      className={styles.dotWrapper}
      style={{ position: 'absolute', top, left }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.dot} style={style} title={id} />
      <div className={`${styles.tooltip} ${hovered ? styles.show : ''}`}>
        {infoImage && <img src={infoImage} alt={infoTitle} className={styles.tooltipImage} />}
        <div className={styles.groupInfo}>
          <div className={styles.tooltipTitle}>{infoTitle}</div>
          <div className={styles.tooltipPrice}>{infoPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default Dot;
