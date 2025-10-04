import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// import api from '@config/axios' // TODO: Uncomment when backend blog endpoint is ready
import MetaData from '@pages/noPage/metaData'
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft, FaShare, FaTag, FaHeart, FaBookmark, FaEye } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import './blog.css'
import 'prismjs/themes/prism-tomorrow.css'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Since the backend doesn't have a blog endpoint yet, we'll create mock data
      // TODO: Replace with actual API call when backend blog endpoint is ready
      // const response = await api.get(`/blog/${slug}`)
      
      const mockPost = generateMockPostDetail(slug)
      if (!mockPost) {
        setError('Blog post not found')
        return
      }
      
      setPost(mockPost)
      setRelatedPosts(generateRelatedPosts())
      setViewCount(Math.floor(Math.random() * 1500) + 100) // Mock view count
    } catch (err) {
      setError('Failed to fetch blog post. Please try again later.')
      console.error('Error fetching post:', err)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  // Reading progress tracker
  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.querySelector('.article-content')
      if (!article) return

      const totalHeight = article.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', updateReadingProgress)
    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [post])

  const generateMockPostDetail = (slug) => {
    const posts = {
      'understanding-earthquake-magnitude-scales': {
        id: 1,
        title: "Understanding Earthquake Magnitude Scales: A Deep Dive into Seismic Measurements",
        content: `# 🌍 Understanding Earthquake Magnitude Scales

> "The Earth speaks in many languages, but seismologists have learned to listen through the universal language of seismic waves."

Earthquake magnitude is a quantitative measure of the size or strength of an earthquake. Understanding these scales is crucial for assessing seismic risk and preparing for potential impacts.

## 📊 The Evolution of Magnitude Scales

### The Richter Scale (1935)

Developed by **Charles F. Richter** in 1935, this scale revolutionized how we measure earthquakes.

\`\`\`javascript
// Richter Scale Energy Calculation
const calculateRichterEnergy = (magnitude) => {
  // Energy in joules
  const logEnergy = 1.5 * magnitude + 4.8;
  return Math.pow(10, logEnergy);
};

// Compare two magnitudes
const mag6 = calculateRichterEnergy(6.0);
const mag7 = calculateRichterEnergy(7.0);

console.log(\`Magnitude 6.0: \${mag6.toExponential(2)} joules\`);
console.log(\`Magnitude 7.0: \${mag7.toExponential(2)} joules\`);
console.log(\`Ratio: \${(mag7/mag6).toFixed(1)}x more energy\`);
\`\`\`

**Output:**
- Magnitude 6.0: 6.31×10¹² joules
- Magnitude 7.0: 2.00×10¹⁴ joules  
- Ratio: 31.6x more energy

### 🎯 Key Features of Richter Scale:

| Feature | Description | Range |
|---------|-------------|-------|
| **Logarithmic** | Each unit = 10x wave amplitude | 0-10 |
| **Local Focus** | Best for regional earthquakes | < 400km |
| **Wave Based** | Uses P-wave amplitude | Wood-Anderson |

## 🔬 Modern Approach: Moment Magnitude (Mw)

The **Moment Magnitude Scale** addresses limitations of the Richter scale:

\`\`\`python
import numpy as np

def moment_magnitude(seismic_moment):
    """
    Calculate moment magnitude from seismic moment
    
    Args:
        seismic_moment: Seismic moment in Newton-meters (Nm)
    
    Returns:
        Moment magnitude (Mw)
    """
    return (2/3) * (np.log10(seismic_moment) - 9.1)

# Example: 2011 Tōhoku earthquake
tohoku_moment = 3.9e22  # Nm
tohoku_magnitude = moment_magnitude(tohoku_moment)

print(f"2011 Tōhoku earthquake: Mw {tohoku_magnitude:.1f}")
# Output: 2011 Tōhoku earthquake: Mw 9.1
\`\`\`

### 🌟 Advantages of Moment Magnitude:

- ✅ **Universal Application** - Works for all earthquake sizes
- ✅ **Physics-Based** - Uses actual fault slip measurements  
- ✅ **No Saturation** - Accurate for mega-earthquakes (Mw > 8)
- ✅ **Global Standard** - Used worldwide by seismologists

## 📈 Comparative Analysis

### Energy Release Comparison

\`\`\`javascript
// Energy comparison visualization
const magnitudes = [6.0, 7.0, 8.0, 9.0];
const energies = magnitudes.map(mag => ({
  magnitude: mag,
  energy: Math.pow(10, 1.5 * mag + 4.8),
  tntEquivalent: Math.pow(10, 1.5 * mag + 4.8) / 4.184e9 // Convert to tons of TNT
}));

console.table(energies.map(e => ({
  'Magnitude': e.magnitude,
  'Energy (Joules)': e.energy.toExponential(2),
  'TNT Equivalent (tons)': e.tntEquivalent.toExponential(2)
})));
\`\`\`

## 🏗️ Real-World Applications

### Building Codes and Safety

Different magnitude ranges require different engineering approaches:

| Magnitude Range | Building Response | Design Considerations |
|-----------------|-------------------|----------------------|
| **< 4.0** | Not felt | Standard construction |
| **4.0 - 5.9** | Light damage | Basic seismic design |
| **6.0 - 6.9** | Moderate damage | Enhanced seismic design |
| **7.0 - 7.9** | Severe damage | Special seismic provisions |
| **8.0+** | Devastating | Maximum seismic design |

### 🚨 Emergency Response Planning

\`\`\`python
def emergency_response_level(magnitude, population_density):
    """
    Determine emergency response level based on magnitude and population
    """
    if magnitude >= 7.0 and population_density > 1000:
        return "CRITICAL - International aid may be needed"
    elif magnitude >= 6.0 and population_density > 500:
        return "HIGH - Regional response required"
    elif magnitude >= 5.0:
        return "MODERATE - Local response sufficient"
    else:
        return "LOW - Monitor and assess"

# Example scenarios
scenarios = [
    (8.1, 2500, "Tokyo, Japan"),
    (7.2, 1200, "Los Angeles, USA"), 
    (6.8, 800, "Christchurch, NZ"),
    (5.9, 300, "Rural California")
]

for mag, pop, location in scenarios:
    level = emergency_response_level(mag, pop)
    print(f"{location}: M{mag} - {level}")
\`\`\`

## 🌍 Historical Perspective

### Largest Recorded Earthquakes

\`\`\`markdown
| Rank | Location | Year | Magnitude | Impact |
|------|----------|------|-----------|---------|
| 1 | Chile | 1960 | **9.5 Mw** | Tsunami across Pacific |
| 2 | Alaska | 1964 | **9.2 Mw** | Ground liquefaction |
| 3 | Sumatra | 2004 | **9.1 Mw** | Indian Ocean tsunami |
| 4 | Japan | 2011 | **9.1 Mw** | Fukushima disaster |
| 5 | Russia | 1952 | **9.0 Mw** | Pacific-wide tsunami |
\`\`\`

### 📊 Statistical Analysis

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Global earthquake frequency by magnitude (annual averages)
magnitudes = np.array([2, 3, 4, 5, 6, 7, 8, 9])
frequency = np.array([1300000, 130000, 13000, 1300, 130, 13, 1, 0.1])

# Gutenberg-Richter law: log(N) = a - b*M
# Where N = number of earthquakes ≥ magnitude M per year

plt.figure(figsize=(10, 6))
plt.semilogy(magnitudes, frequency, 'o-', linewidth=2, markersize=8)
plt.xlabel('Magnitude')
plt.ylabel('Annual Frequency (log scale)')
plt.title('Global Earthquake Frequency vs Magnitude')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

## 🔮 Future Developments

### Emerging Technologies

- **AI-Enhanced Detection**: Machine learning for faster, more accurate magnitude determination
- **Real-time Processing**: Sub-second magnitude calculations for early warning
- **Multi-Scale Integration**: Combining local and teleseismic data for improved accuracy

### 📱 Public Applications

Modern smartphone apps can now:
- Detect earthquakes using built-in accelerometers
- Provide magnitude estimates within seconds
- Create crowdsourced seismic networks

\`\`\`javascript
// Simplified smartphone earthquake detection
const detectEarthquake = (accelerometerData) => {
  const threshold = 0.1; // m/s² threshold
  const duration = 5000; // 5 seconds minimum
  
  const peaks = accelerometerData.filter(reading => 
    Math.abs(reading.acceleration) > threshold
  );
  
  if (peaks.length > 10 && peaks[0].timestamp - peaks[peaks.length-1].timestamp > duration) {
    return {
      detected: true,
      estimatedMagnitude: estimateMagnitudeFromPhone(peaks),
      confidence: calculateConfidence(peaks)
    };
  }
  
  return { detected: false };
};
\`\`\`

## 💡 Key Takeaways

1. **🎯 Magnitude scales are logarithmic** - Small number increases mean huge energy differences
2. **📏 Different scales for different purposes** - Richter for local, Moment for global
3. **🏗️ Engineering applications are critical** - Building codes save lives
4. **📊 Frequency follows predictable patterns** - Gutenberg-Richter relationship
5. **🔬 Technology continues to evolve** - AI and real-time processing improving rapidly

---

*Understanding magnitude scales is fundamental to earthquake science, engineering, and public safety. As our measurement techniques advance, our ability to assess and respond to seismic hazards continues to improve.*

## 🔗 Learn More

- [USGS Earthquake Magnitude Policy](https://earthquake.usgs.gov/learn/topics/measure.php)
- [Global Seismographic Network](https://earthquake.usgs.gov/monitoring/gsn/)
- [International Seismological Centre](http://www.isc.ac.uk/)`,
        author: "Dr. Elena Rodriguez",
        date: "2024-03-15T10:30:00Z",
        category: "Seismology",
        readTime: 15,
        tags: ["magnitude", "richter-scale", "seismology", "earthquake-measurement", "geophysics", "engineering"]
      },
      'science-behind-seismic-waves': {
        id: 2,
        title: "The Science Behind Seismic Waves: Earth's Hidden Language",
        content: `# 🌊 The Science Behind Seismic Waves

Seismic waves are nature's way of transmitting energy through our planet. They're the messengers that carry information about earthquakes and reveal secrets about Earth's internal structure.

## 🔬 Fundamental Physics

### Wave Equation Basics

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Basic wave equation: u(x,t) = A * sin(kx - ωt + φ)
def seismic_wave(x, t, amplitude=1, wavelength=100, frequency=0.1, phase=0):
    k = 2 * np.pi / wavelength  # Wave number
    omega = 2 * np.pi * frequency  # Angular frequency
    return amplitude * np.sin(k * x - omega * t + phase)

# Simulate P-wave propagation
x = np.linspace(0, 1000, 1000)  # Distance in km
t_values = [0, 5, 10, 15]  # Time in seconds

plt.figure(figsize=(12, 8))
for i, t in enumerate(t_values):
    plt.subplot(2, 2, i+1)
    wave = seismic_wave(x, t, amplitude=2, wavelength=50, frequency=0.2)
    plt.plot(x, wave, 'b-', linewidth=2)
    plt.title(f'P-wave at t = {t}s')
    plt.xlabel('Distance (km)')
    plt.ylabel('Amplitude')
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

## 🏔️ Types of Seismic Waves

### Body Waves: The Interior Messengers

#### P-waves (Primary/Compressional)
- **Motion**: Particle movement parallel to wave direction
- **Speed**: Fastest seismic waves (α = √[(K+4μ/3)/ρ])
- **Medium**: Travels through solids, liquids, and gases

\`\`\`javascript
// P-wave velocity calculation
class SeismicProperties {
  constructor(bulkModulus, shearModulus, density) {
    this.K = bulkModulus;  // Bulk modulus (GPa)
    this.G = shearModulus; // Shear modulus (GPa) 
    this.rho = density;    // Density (kg/m³)
  }
  
  pWaveVelocity() {
    return Math.sqrt((this.K + (4/3) * this.G) / this.rho);
  }
  
  sWaveVelocity() {
    return Math.sqrt(this.G / this.rho);
  }
  
  poissonRatio() {
    const vp = this.pWaveVelocity();
    const vs = this.sWaveVelocity();
    return 0.5 * ((vp/vs)**2 - 2) / ((vp/vs)**2 - 1);
  }
}

// Example: Granite properties
const granite = new SeismicProperties(37e9, 25e9, 2650);
console.log(\`Granite P-wave velocity: \${(granite.pWaveVelocity()/1000).toFixed(2)} km/s\`);
console.log(\`Granite S-wave velocity: \${(granite.sWaveVelocity()/1000).toFixed(2)} km/s\`);
console.log(\`Poisson's ratio: \${granite.poissonRatio().toFixed(3)}\`);
\`\`\`

#### S-waves (Secondary/Shear)
- **Motion**: Particle movement perpendicular to wave direction  
- **Speed**: ~60% of P-wave speed
- **Medium**: Only through solids (cannot pass through liquids)

> **🔍 Discovery Insight**: The inability of S-waves to travel through Earth's outer core led to the discovery that it's liquid!

### Surface Waves: The Destructive Forces

| Wave Type | Motion | Speed | Damage Characteristics |
|-----------|--------|-------|----------------------|
| **Love waves** | Horizontal shearing | ~90% of S-wave | Building sway, structural damage |
| **Rayleigh waves** | Elliptical (retrograde) | ~90% of S-wave | Ground rolling, foundation damage |

## 🌍 Wave Propagation Through Earth

### Velocity Structure

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Earth's radial velocity structure (simplified)
def earth_velocity_model():
    # Radius from center (km)
    radius = np.array([0, 1220, 3480, 5150, 5700, 6150, 6370])
    
    # P-wave velocities (km/s)
    vp = np.array([11.3, 11.3, 13.7, 8.1, 8.0, 6.8, 5.8])
    
    # S-wave velocities (km/s) 
    vs = np.array([3.6, 3.6, 0, 4.5, 4.4, 3.9, 3.2])
    
    return radius, vp, vs

radius, vp, vs = earth_velocity_model()

plt.figure(figsize=(10, 6))
plt.plot(radius, vp, 'b-', linewidth=3, label='P-wave velocity')
plt.plot(radius, vs, 'r-', linewidth=3, label='S-wave velocity')
plt.axvline(x=1220, color='gray', linestyle='--', alpha=0.7, label='Inner core')
plt.axvline(x=3480, color='gray', linestyle='--', alpha=0.7, label='Outer core')
plt.axvline(x=5150, color='orange', linestyle='--', alpha=0.7, label='Lower mantle')
plt.xlabel('Radius from center (km)')
plt.ylabel('Velocity (km/s)')
plt.title('Earth\\'s Seismic Velocity Structure')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### 🎯 Ray Path Calculations

\`\`\`python
def calculate_travel_time(distance_deg, depth_km, wave_type='P'):
    """
    Calculate seismic wave travel time using simplified Earth model
    
    Args:
        distance_deg: Epicentral distance in degrees
        depth_km: Source depth in kilometers
        wave_type: 'P' or 'S' wave
    
    Returns:
        Travel time in seconds
    """
    # Simplified velocity model
    velocities = {
        'P': {'crust': 6.0, 'mantle': 8.1, 'core': 11.0},
        'S': {'crust': 3.5, 'mantle': 4.5, 'core': 0}  # S-waves don't travel through liquid core
    }
    
    v = velocities[wave_type]
    
    # Convert distance to kilometers (rough approximation)
    distance_km = distance_deg * 111.0
    
    # Simplified travel time calculation
    if distance_deg < 30:  # Direct wave through crust/upper mantle
        avg_velocity = v['crust'] if depth_km < 50 else v['mantle']
        travel_time = distance_km / avg_velocity
    else:  # Wave travels through deeper Earth
        travel_time = distance_km / v['mantle'] + depth_km / v['crust']
    
    return travel_time

# Example: Earthquake in Japan detected in California
japan_to_california = 85  # degrees
earthquake_depth = 15     # km

p_time = calculate_travel_time(japan_to_california, earthquake_depth, 'P')
s_time = calculate_travel_time(japan_to_california, earthquake_depth, 'S')

print(f"P-wave arrival: {p_time/60:.1f} minutes")
print(f"S-wave arrival: {s_time/60:.1f} minutes") 
print(f"S-P time difference: {(s_time-p_time):.1f} seconds")
\`\`\`

## 📊 Seismic Wave Analysis

### Frequency Content Analysis

\`\`\`python
from scipy import signal
import numpy as np

def analyze_seismogram_frequency(data, sampling_rate):
    """
    Analyze frequency content of seismic data
    """
    # Calculate power spectral density
    frequencies, psd = signal.welch(data, sampling_rate, nperseg=1024)
    
    # Find dominant frequencies
    dominant_freq_idx = np.argmax(psd)
    dominant_frequency = frequencies[dominant_freq_idx]
    
    # Calculate frequency bands
    bands = {
        'Long Period': (0.033, 0.1),      # 10-30 seconds
        'Intermediate': (0.1, 1.0),       # 1-10 seconds  
        'Short Period': (1.0, 10.0),      # 0.1-1 seconds
        'High Frequency': (10.0, 50.0)    # < 0.1 seconds
    }
    
    band_energy = {}
    for band_name, (f_low, f_high) in bands.items():
        mask = (frequencies >= f_low) & (frequencies <= f_high)
        band_energy[band_name] = np.trapz(psd[mask], frequencies[mask])
    
    return {
        'dominant_frequency': dominant_frequency,
        'band_energy': band_energy,
        'total_energy': np.trapz(psd, frequencies)
    }

# Simulate seismic data
t = np.linspace(0, 100, 5000)  # 100 seconds at 50 Hz
# Combine multiple frequencies to simulate realistic seismogram
seismic_signal = (2 * np.sin(2*np.pi*0.5*t) +    # Long period
                 1.5 * np.sin(2*np.pi*2*t) +      # Intermediate  
                 1 * np.sin(2*np.pi*8*t) +        # Short period
                 0.5 * np.random.normal(0, 1, len(t)))  # Noise

analysis = analyze_seismogram_frequency(seismic_signal, 50)
print(f"Dominant frequency: {analysis['dominant_frequency']:.2f} Hz")
print("Energy distribution by frequency band:")
for band, energy in analysis['band_energy'].items():
    percentage = (energy / analysis['total_energy']) * 100
    print(f"  {band}: {percentage:.1f}%")
\`\`\`

## 🏗️ Engineering Applications

### Ground Motion Prediction

\`\`\`javascript
class GroundMotionPredictor {
  constructor() {
    // Simplified ground motion prediction equation coefficients
    this.coefficients = {
      a: 2.3,      // Base acceleration coefficient
      b: -0.8,     // Magnitude scaling
      c: -3.5,     // Distance scaling  
      d: 0.01,     // Site coefficient
      e: 0.2       // Standard deviation
    };
  }
  
  predictPGA(magnitude, distance, siteClass = 'C') {
    // Site factors
    const siteFactors = { 'A': 0.8, 'B': 1.0, 'C': 1.2, 'D': 1.4, 'E': 1.8 };
    const siteFactor = siteFactors[siteClass] || 1.0;
    
    // Ground motion prediction equation (simplified)
    const logPGA = this.coefficients.a + 
                   this.coefficients.b * magnitude +
                   this.coefficients.c * Math.log10(distance) +
                   this.coefficients.d * siteFactor;
    
    return Math.pow(10, logPGA); // Convert to g (gravity units)
  }
  
  predictResponse(magnitude, distance, periods) {
    // Predict response spectrum for multiple periods
    return periods.map(T => {
      const pga = this.predictPGA(magnitude, distance);
      // Simplified response spectrum shape
      if (T < 0.1) return pga;
      else if (T < 0.5) return pga * (2.5 * T / 0.1);
      else return pga * (2.5 * 0.5 / T);
    });
  }
}

// Example: Predict ground motion for M7.0 earthquake
const predictor = new GroundMotionPredictor();
const distances = [10, 50, 100, 200]; // km
const periods = [0.01, 0.1, 0.5, 1.0, 2.0]; // seconds

console.log("Ground Motion Predictions for M7.0 Earthquake:");
console.log("Distance (km) | PGA (g) | Response at T=1.0s (g)");
console.log("--------------|---------|----------------------");

distances.forEach(dist => {
  const pga = predictor.predictPGA(7.0, dist);
  const response = predictor.predictResponse(7.0, dist, [1.0])[0];
  console.log(\`\${dist.toString().padStart(12)} | \${pga.toFixed(3)} | \${response.toFixed(3)}\`);
});
\`\`\`

## 🔍 Modern Detection Networks

### Global Monitoring Systems

\`\`\`markdown
| Network | Stations | Coverage | Primary Use |
|---------|----------|----------|-------------|
| **GSN** | 150+ | Global | Research, monitoring |
| **IRIS** | 1000+ | Americas | Research, education |
| **GEOFON** | 75+ | Europe/Global | Real-time monitoring |
| **F-net** | 73 | Japan | High-sensitivity detection |
\`\`\`

### 📱 Smartphone Seismology

\`\`\`python
class SmartphoneSeismometer:
    def __init__(self, sensitivity=0.001):  # m/s² threshold
        self.sensitivity = sensitivity
        self.sample_rate = 100  # Hz
        self.detection_window = 30  # seconds
        
    def detect_earthquake(self, accelerometer_data):
        """
        Simple earthquake detection algorithm for smartphones
        """
        # Calculate signal characteristics
        mean_acceleration = np.mean(np.abs(accelerometer_data))
        peak_acceleration = np.max(np.abs(accelerometer_data))
        duration = len(accelerometer_data) / self.sample_rate
        
        # Detection criteria
        threshold_exceeded = peak_acceleration > self.sensitivity
        sustained_motion = mean_acceleration > self.sensitivity * 0.1
        sufficient_duration = duration > 5.0  # seconds
        
        if threshold_exceeded and sustained_motion and sufficient_duration:
            # Estimate magnitude (very simplified)
            estimated_magnitude = 2.0 + 2.0 * np.log10(peak_acceleration / 0.01)
            
            return {
                'earthquake_detected': True,
                'estimated_magnitude': max(2.0, min(8.0, estimated_magnitude)),
                'peak_acceleration': peak_acceleration,
                'confidence': min(1.0, mean_acceleration / self.sensitivity)
            }
        
        return {'earthquake_detected': False}

# Simulate smartphone detection
phone_seismo = SmartphoneSeismometer()

# Simulate earthquake signal
t = np.linspace(0, 30, 3000)
earthquake_signal = (0.02 * np.sin(2*np.pi*5*t) * np.exp(-t/10) + 
                    0.005 * np.random.normal(0, 1, len(t)))

detection = phone_seismo.detect_earthquake(earthquake_signal)
if detection['earthquake_detected']:
    print(f"🚨 Earthquake detected!")
    print(f"   Estimated magnitude: {detection['estimated_magnitude']:.1f}")
    print(f"   Peak acceleration: {detection['peak_acceleration']:.4f} m/s²")
    print(f"   Confidence: {detection['confidence']:.0%}")
\`\`\`

## 🌟 Future Directions

### Artificial Intelligence in Seismology

- **PhaseNet**: AI for automatic P/S wave picking
- **EQTransformer**: Deep learning for earthquake detection
- **FAST**: Real-time finite fault source imaging

### 🔮 Emerging Technologies

\`\`\`python
# Example: Machine learning approach to magnitude estimation
from sklearn.ensemble import RandomForestRegressor
import numpy as np

class MLMagnitudeEstimator:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.is_trained = False
    
    def extract_features(self, waveform, sampling_rate):
        """Extract features from seismic waveform"""
        # Peak ground acceleration
        pga = np.max(np.abs(waveform))
        
        # RMS amplitude
        rms = np.sqrt(np.mean(waveform**2))
        
        # Dominant frequency
        fft = np.fft.fft(waveform)
        freqs = np.fft.fftfreq(len(waveform), 1/sampling_rate)
        dominant_freq = freqs[np.argmax(np.abs(fft))]
        
        # Duration (simplified)
        threshold = 0.1 * pga
        above_threshold = np.where(np.abs(waveform) > threshold)[0]
        duration = (above_threshold[-1] - above_threshold[0]) / sampling_rate if len(above_threshold) > 0 else 0
        
        return np.array([pga, rms, abs(dominant_freq), duration])
    
    def train(self, training_waveforms, training_magnitudes, sampling_rate):
        """Train the model on labeled earthquake data"""
        features = np.array([self.extract_features(wf, sampling_rate) for wf in training_waveforms])
        self.model.fit(features, training_magnitudes)
        self.is_trained = True
    
    def predict_magnitude(self, waveform, sampling_rate):
        """Predict earthquake magnitude from waveform"""
        if not self.is_trained:
            raise ValueError("Model must be trained first")
        
        features = self.extract_features(waveform, sampling_rate).reshape(1, -1)
        predicted_magnitude = self.model.predict(features)[0]
        
        # Get prediction confidence (simplified)
        predictions = [tree.predict(features)[0] for tree in self.model.estimators_]
        confidence = 1.0 / (1.0 + np.std(predictions))
        
        return {
            'magnitude': predicted_magnitude,
            'confidence': confidence,
            'features_used': ['PGA', 'RMS', 'Dominant_Freq', 'Duration']
        }

# This would be used with real training data in practice
print("🤖 ML-based magnitude estimation ready for deployment")
print("   Features: Peak acceleration, RMS, frequency content, duration")
print("   Model: Random Forest with 100 decision trees")
\`\`\`

## 🎯 Key Takeaways

1. **🌊 Seismic waves are Earth's messengers** - They carry information about both earthquakes and planetary structure
2. **⚡ Different waves, different purposes** - P-waves for speed, S-waves for shake, surface waves for damage
3. **🌍 Global monitoring is essential** - Networks of sensors provide comprehensive coverage
4. **📱 Technology democratizes detection** - Smartphones can contribute to earthquake monitoring
5. **🤖 AI enhances capabilities** - Machine learning improves detection speed and accuracy

The science of seismic waves continues to evolve, with new technologies and methodologies constantly improving our ability to understand and respond to earthquakes.`,
        author: "Prof. Marco Antonelli",
        date: "2024-03-10T14:15:00Z",
        category: "Research",
        readTime: 20,
        tags: ["seismic-waves", "p-waves", "s-waves", "earthquake-science", "geophysics", "AI", "technology"]
      }
    }

    return posts[slug] || null
  }

  const generateRelatedPosts = () => {
    return [
      {
        id: 3,
        title: "Building Earthquake-Resistant Structures: Engineering for Safety",
        slug: "building-earthquake-resistant-structures",
        excerpt: "Discover the advanced engineering principles and cutting-edge techniques used to construct buildings that can withstand the most powerful seismic forces.",
        category: "Engineering",
        readTime: 12,
        image: "https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Engineering"
      },
      {
        id: 4,
        title: "Italy's Seismic History: Lessons from Major Earthquakes",
        slug: "italy-seismic-history-lessons",
        excerpt: "A comprehensive journey through Italy's most significant earthquakes and the invaluable lessons learned from each devastating event.",
        category: "History",
        readTime: 15,
        image: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=History"
      },
      {
        id: 5,
        title: "AI in Earthquake Detection: The Future of Seismology",
        slug: "ai-earthquake-detection-future",
        excerpt: "Exploring how artificial intelligence and machine learning are revolutionizing earthquake detection, prediction, and response systems.",
        category: "Technology",
        readTime: 10,
        image: "https://via.placeholder.com/300x200/10b981/ffffff?text=AI+Tech"
      }
    ]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this article about ${post.category.toLowerCase()}: ${post.title}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
      alert('Link copied to clipboard!')
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    // TODO: Send like to backend
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: Send bookmark to backend
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Loading..." description="Loading blog post" />
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-purple-400 opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Error" description="Error loading blog post" />
        <div className="container mx-auto px-4">
          <div className="text-center bg-red-900/20 border border-red-500/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                🔄 Try Again
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                📚 Back to Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Post Not Found" description="Blog post not found" />
        <div className="container mx-auto px-4">
          <div className="text-center bg-gray-900/50 border border-gray-600 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">📄 Post Not Found</h2>
            <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist or may have been moved.</p>
            <button
              onClick={() => navigate('/blog')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              🏠 Back to Blog Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <MetaData 
        title={`${post.title} - TerraQuake API Blog`} 
        description={post.content.replace(/[#*`]/g, '').substring(0, 160)} 
      />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      
      <div className="min-h-screen pt-24 pb-16 article-content">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/blog"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Blog
            </Link>
            
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <FaEye className="text-purple-400" />
              <span>{viewCount.toLocaleString()} views</span>
            </div>
          </div>

          {/* Article Header */}
          <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-8">
              {/* Category and Actions */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center text-sm font-semibold text-purple-400 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  {post.category}
                </span>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isLiked 
                        ? 'text-red-400 bg-red-500/10 border border-red-500/20' 
                        : 'text-gray-400 hover:text-red-400 hover:bg-red-500/5'
                    }`}
                  >
                    <FaHeart className={isLiked ? 'animate-pulse' : ''} />
                    <span className="text-sm">{isLiked ? 'Liked' : 'Like'}</span>
                  </button>
                  
                  <button
                    onClick={handleBookmark}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isBookmarked 
                        ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' 
                        : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/5'
                    }`}
                  >
                    <FaBookmark />
                    <span className="text-sm">{isBookmarked ? 'Saved' : 'Save'}</span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 px-3 py-2 rounded-lg hover:bg-purple-500/5 transition-all duration-200"
                  >
                    <FaShare />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xs" />
                  </div>
                  <div>
                    <span className="text-white font-medium">{post.author}</span>
                    <div className="text-xs text-gray-500">Seismology Expert</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-purple-400" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-purple-400" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert prose-purple max-w-none markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    // Custom components for better styling
                    h1: ({children}) => <h1 className="text-4xl font-bold text-white mb-8 border-b-2 border-purple-500 pb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-3xl font-bold text-white mb-6 mt-12 border-b border-purple-400 pb-3">{children}</h2>,
                    h3: ({children}) => <h3 className="text-2xl font-semibold text-white mb-4 mt-8">{children}</h3>,
                    h4: ({children}) => <h4 className="text-xl font-semibold text-purple-300 mb-3 mt-6">{children}</h4>,
                    p: ({children}) => <p className="text-gray-300 mb-6 leading-relaxed text-lg">{children}</p>,
                    strong: ({children}) => <strong className="text-purple-400 font-semibold">{children}</strong>,
                    em: ({children}) => <em className="text-purple-300 italic">{children}</em>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-6 space-y-3 text-gray-300 text-lg">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside mb-6 space-y-3 text-gray-300 text-lg">{children}</ol>,
                    li: ({children}) => <li className="text-gray-300">{children}</li>,
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-purple-500 pl-6 py-3 my-8 bg-gradient-to-r from-purple-900/20 to-transparent rounded-r-lg">
                        <div className="text-purple-200 italic text-lg">{children}</div>
                      </blockquote>
                    ),
                    code: ({inline, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <div className="relative my-8">
                          <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 px-3 py-1 text-sm rounded-bl-md rounded-tr-lg border-l border-b border-gray-600">
                            {match[1]}
                          </div>
                          <pre className="bg-gray-900 border border-gray-700 rounded-lg p-6 overflow-x-auto shadow-lg">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      )
                    },
                    table: ({children}) => (
                      <div className="overflow-x-auto mb-8 rounded-lg border border-gray-600 shadow-lg">
                        <table className="min-w-full">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({children}) => <thead className="bg-gradient-to-r from-purple-900 to-purple-800">{children}</thead>,
                    tbody: ({children}) => <tbody className="bg-gray-900/50">{children}</tbody>,
                    tr: ({children}) => <tr className="border-b border-gray-600 hover:bg-gray-800/30 transition-colors duration-200">{children}</tr>,
                    th: ({children}) => <th className="px-6 py-4 text-left text-purple-200 font-semibold">{children}</th>,
                    td: ({children}) => <td className="px-6 py-4 text-gray-300">{children}</td>,
                    img: ({src, alt}) => (
                      <div className="my-8">
                        <img src={src} alt={alt} className="rounded-lg shadow-lg max-w-full h-auto mx-auto border border-gray-600" />
                        {alt && <p className="text-center text-gray-500 text-sm mt-3 italic">{alt}</p>}
                      </div>
                    ),
                    a: ({href, children}) => (
                      <a href={href} className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200 hover:bg-purple-500/10 px-1 py-0.5 rounded" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Enhanced Tags Section */}
              {post.tags && (
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <div className="flex items-center mb-6">
                    <FaTag className="text-purple-400 mr-3 text-lg" />
                    <h4 className="text-xl font-bold text-white">Explore Related Topics</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {post.tags.map((tag, index) => (
                      <button 
                        key={tag}
                        className={`group relative overflow-hidden text-sm px-5 py-3 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          index % 4 === 0 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500 text-white hover:from-purple-500 hover:to-purple-600' 
                            : index % 4 === 1 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 text-white hover:from-blue-500 hover:to-blue-600'
                            : index % 4 === 2
                            ? 'bg-gradient-to-r from-green-600 to-green-700 border-green-500 text-white hover:from-green-500 hover:to-green-600'
                            : 'bg-gradient-to-r from-pink-600 to-pink-700 border-pink-500 text-white hover:from-pink-500 hover:to-pink-600'
                        }`}
                        onClick={() => {
                          // TODO: Navigate to tag filter page
                          console.log(`Searching for tag: ${tag}`)
                        }}
                      >
                        <span className="relative z-10 flex items-center font-medium">
                          <span className="mr-1">#</span>
                          {tag.replace('-', ' ').toUpperCase()}
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-4 flex items-center">
                    <span className="animate-pulse mr-2">💡</span>
                    Click on tags to discover more articles on these topics
                  </p>
                </div>
              )}
            </div>
          </article>

          {/* Enhanced Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">
                🔗 Continue Your Learning Journey
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article 
                    key={relatedPost.id}
                    className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-xs font-semibold text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {relatedPost.readTime} min
                        </span>
                        <span className="flex items-center">
                          <FaEye className="mr-1" />
                          {Math.floor(Math.random() * 500) + 50}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors duration-200">
                        <Link 
                          to={`/blog/${relatedPost.slug}`} 
                          className="hover:underline"
                        >
                          {relatedPost.title}
                        </Link>
                      </h4>
                      
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200 group"
                      >
                        Read Article
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}