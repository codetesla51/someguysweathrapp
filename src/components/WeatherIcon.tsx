import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudFog, CloudDrizzle, Droplets, Wind 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherIconProps {
  weatherId: number;
  size?: number;
  color?: string;
  animated?: boolean;
}

const WeatherIcon = ({ 
  weatherId, 
  size = 28,
  color = 'currentColor',
  animated = true 
}: WeatherIconProps) => {
  // Animation variants
  const iconVariants = {
    rain: {
      y: [0, 5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut"
        }
      }
    },
    sun: {
      rotate: [0, 360],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }
      }
    },
    cloud: {
      x: [-2, 2, -2],
      transition: {
        x: {
          repeat: Infinity,
          duration: a2,
          ease: "easeInOut"
        }
      }
    },
    snow: {
      y: [0, 5, 0],
      rotate: [0, 10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        },
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    },
    lightning: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        scale: {
          repeat: Infinity,
          duration: 0.5,
          repeatType: "reverse"
        },
        opacity: {
          repeat: Infinity,
          duration: 0.5,
          repeatType: "reverse"
        }
      }
    },
    fog: {
      x: [-3, 3, -3],
      transition: {
        x: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }
    },
    default: {
      scale: [1, 1.05, 1],
      transition: {
        scale: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  };
  
  // Select variant based on weather condition
  const getAnimationVariant = () => {
    // Clear sky
    if (weatherId === 800) return "sun";
    
    // Clouds
    if (weatherId >= 801 && weatherId <= 804) return "cloud";
    
    // Rain
    if ((weatherId >= 500 && weatherId <= 531) || 
        (weatherId >= 300 && weatherId <= 321)) return "rain";
    
    // Snow
    if (weatherId >= 600 && weatherId <= 622) return "snow";
    
    // Thunderstorm
    if (weatherId >= 200 && weatherId <= 232) return "lightning";
    
    // Fog, mist, etc.
    if (weatherId >= 700 && weatherId <= 781) return "fog";
    
    return "default";
  };

  // Get appropriate icon based on weather condition code
  const getIcon = () => {
    // Clear sky
    if (weatherId === 800) {
      return <Sun size={size} color={color} />;
    }
    
    // Few clouds, scattered clouds
    if (weatherId >= 801 && weatherId <= 802) {
      return <Cloud size={size} color={color} />;
    }
    
    // Broken clouds, overcast
    if (weatherId >= 803 && weatherId <= 804) {
      return <Cloud size={size} color={color} />;
    }
    
    // Drizzle
    if (weatherId >= 300 && weatherId <= 321) {
      return <CloudDrizzle size={size} color={color} />;
    }
    
    // Rain
    if (weatherId >= 500 && weatherId <= 531) {
      return <CloudRain size={size} color={color} />;
    }
    
    // Snow
    if (weatherId >= 600 && weatherId <= 622) {
      return <CloudSnow size={size} color={color} />;
    }
    
    // Thunderstorm
    if (weatherId >= 200 && weatherId <= 232) {
      return <CloudLightning size={size} color={color} />;
    }
    
    // Mist, smoke, haze, fog
    if (weatherId >= 700 && weatherId <= 750) {
      return <CloudFog size={size} color={color} />;
    }
    
    // Tornado, squalls
    if (weatherId > 750 && weatherId < 800) {
      return <Wind size={size} color={color} />;
    }
    
    // Default
    return <Droplets size={size} color={color} />;
  };

  if (!animated) {
    return getIcon();
  }

  return (
    <motion.div
      variants={iconVariants}
      animate={getAnimationVariant()}
      style={{ display: 'inline-flex' }}
    >
      {getIcon()}
    </motion.div>
  );
};

export default WeatherIcon;