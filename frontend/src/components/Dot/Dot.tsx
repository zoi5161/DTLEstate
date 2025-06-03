import React, { useState } from 'react';
import styles from './Dot.module.css';
import { useNavigate } from 'react-router-dom';

interface DotProps {
  name: string;
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
  name,
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Estate/${id}`, { state: { name } });
  };


  return (
    <div
      id={id}
      className={styles.dotWrapper}
      style={{ position: 'absolute', top, left }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
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
