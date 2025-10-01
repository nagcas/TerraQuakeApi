import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// import api from '@config/axios' // TODO: Uncomment when backend blog endpoint is ready
import MetaData from '@pages/noPage/metaData'
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft, FaShare, FaTag } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import 'prismjs/themes/prism-tomorrow.css'

export default function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

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

  const generateMockPostDetail = (slug) => {
    const posts = {
      'understanding-earthquake-magnitude-scales': {
        id: 1,
        title: "Understanding Earthquake Magnitude Scales",
        content: `# Introduction to Earthquake Magnitude

Earthquake magnitude is a quantitative measure of the size or strength of an earthquake. Understanding these scales is crucial for assessing seismic risk and preparing for potential impacts.

> **Did you know?** The difference between each whole number on magnitude scales represents a dramatic increase in earthquake energy and potential damage.

## The Richter Scale

Developed by **Charles F. Richter** in 1935, the Richter scale was the first widely-used method for measuring earthquake magnitude. It uses a logarithmic scale, meaning each whole number increase represents a tenfold increase in measured amplitude.

### Key Features:
- Logarithmic scale (base 10)
- Measures amplitude of seismic waves
- Most effective for local earthquakes
- Range typically from 0 to 10

\`\`\`javascript
// Example: Calculating energy difference
const richterEnergy = (magnitude) => {
  return Math.pow(10, 1.5 * magnitude + 4.8);
};

const mag6Energy = richterEnergy(6.0);
const mag7Energy = richterEnergy(7.0);
const energyRatio = mag7Energy / mag6Energy;

console.log(\`A magnitude 7.0 releases \${energyRatio.toFixed(1)}x more energy than 6.0\`);
// Output: A magnitude 7.0 releases 31.6x more energy than 6.0
\`\`\`

## Moment Magnitude Scale (Mw)

The **moment magnitude scale**, introduced in the 1970s, is now the most commonly used scale for measuring large earthquakes. It provides more accurate measurements for very large earthquakes than the Richter scale.

### Advantages of Moment Magnitude:
1. **Accurate for all sizes** - Works for both small and very large earthquakes
2. **Based on physics** - Uses seismic moment calculation
3. **No saturation** - Unlike Richter, doesn't "max out" at high magnitudes
4. **Internationally standardized** - Used globally by seismologists

## Key Differences and Applications

| Scale | Best For | Range | Calculation Based On |
|-------|----------|-------|---------------------|
| Richter (ML) | Local earthquakes | 0-6.9 | Wave amplitude |
| Moment (Mw) | All earthquakes | 0-10+ | Seismic moment |
| Surface Wave (Ms) | Distant earthquakes | 0-8.5 | Surface wave amplitude |

Understanding these scales helps in:

- ✅ **Assessing building safety requirements**
- ✅ **Emergency response planning**
- ✅ **Insurance risk calculations** 
- ✅ **Public safety communications**
- ✅ **Scientific research and analysis**

## Real-World Implications

The exponential nature of magnitude scales means that:

\`\`\`python
import math

def energy_comparison(mag1, mag2):
    """Calculate energy difference between two magnitudes"""
    energy_ratio = 10 ** (1.5 * (mag2 - mag1))
    return energy_ratio

# Examples
print(f"Mag 7.0 vs 6.0: {energy_comparison(6.0, 7.0):.1f}x more energy")
print(f"Mag 8.0 vs 7.0: {energy_comparison(7.0, 8.0):.1f}x more energy")
print(f"Mag 9.0 vs 8.0: {energy_comparison(8.0, 9.0):.1f}x more energy")
\`\`\`

**Output:**
- Mag 7.0 vs 6.0: 31.6x more energy
- Mag 8.0 vs 7.0: 31.6x more energy  
- Mag 9.0 vs 8.0: 31.6x more energy

## Historical Context

Some of the most significant earthquakes in recorded history:

| Earthquake | Magnitude | Year | Impact |
|------------|-----------|------|--------|
| Chile | 9.5 Mw | 1960 | Largest recorded earthquake |
| Alaska | 9.2 Mw | 1964 | Generated devastating tsunami |
| Sumatra | 9.1 Mw | 2004 | Indian Ocean tsunami |
| Japan | 9.1 Mw | 2011 | Fukushima nuclear disaster |

## Conclusion

Understanding earthquake magnitude scales is essential for:
- **Scientists** conducting seismic research
- **Engineers** designing earthquake-resistant structures  
- **Emergency responders** planning disaster response
- **The public** understanding earthquake risks in their area

*The transition from Richter to Moment Magnitude represents our evolving understanding of seismic processes and the need for more accurate, universally applicable measurement systems.*`,
        author: "Dr. Elena Rodriguez",
        date: "2024-03-15T10:30:00Z",
        category: "Seismology",
        readTime: 8,
        tags: ["magnitude", "richter-scale", "seismology", "earthquake-measurement", "geophysics"]
      },
      'science-behind-seismic-waves': {
        id: 2,
        title: "The Science Behind Seismic Waves",
        content: `# Understanding Seismic Waves

Seismic waves are the energy waves that travel through the Earth as a result of earthquakes, explosions, or other disturbances. These waves provide valuable information about both the earthquake source and the Earth's internal structure.

![Seismic Waves Diagram](https://via.placeholder.com/600x300/8b5cf6/ffffff?text=Seismic+Waves+Propagation)

## Types of Seismic Waves

There are **two main categories** of seismic waves: body waves and surface waves.

### Body Waves 🌍

Body waves travel through the Earth's interior and are the first to arrive at seismic stations.

#### P-waves (Primary waves)
- **Speed**: Fastest seismic waves (6-8 km/s in crust)
- **Motion**: Compressional (push-pull)
- **Medium**: Can travel through solids, liquids, and gases
- **First to arrive**: Always detected first by seismographs

\`\`\`python
# P-wave velocity calculation
def p_wave_velocity(bulk_modulus, shear_modulus, density):
    """Calculate P-wave velocity using elastic moduli"""
    return ((bulk_modulus + (4/3) * shear_modulus) / density) ** 0.5

# Example for granite
K = 37e9  # Bulk modulus (Pa)
G = 25e9  # Shear modulus (Pa) 
rho = 2650  # Density (kg/m³)

vp = p_wave_velocity(K, G, rho)
print(f"P-wave velocity in granite: {vp/1000:.2f} km/s")
\`\`\`

#### S-waves (Secondary waves)
- **Speed**: Slower than P-waves (3-4 km/s in crust)
- **Motion**: Shear (side-to-side)
- **Medium**: Only travel through solids
- **Damage**: Often more destructive due to larger amplitudes

> **Key Insight**: S-waves cannot travel through liquids, which is how scientists discovered that Earth's outer core is liquid!

### Surface Waves 🌊

Surface waves travel along the Earth's surface and are typically the most destructive.

| Wave Type | Motion | Speed | Damage Potential |
|-----------|--------|-------|------------------|
| **Love waves** | Horizontal shearing | Slower than body waves | High (buildings) |
| **Rayleigh waves** | Elliptical rolling | Slowest | Very High (ground) |

## Wave Propagation Physics

The speed and behavior of seismic waves depend on the **elastic properties** of materials:

### Governing Equations

\`\`\`latex
P-wave velocity: V_p = \\sqrt{\\frac{K + \\frac{4}{3}G}{\\rho}}

S-wave velocity: V_s = \\sqrt{\\frac{G}{\\rho}}

Where:
- K = Bulk modulus
- G = Shear modulus  
- ρ = Density
\`\`\`

### Factors Affecting Wave Speed

1. **Density** (ρ)
   - Higher density → Lower velocity
   - Rock type matters significantly

2. **Temperature** 
   - Higher temperature → Lower velocity
   - Affects deep Earth propagation

3. **Pressure**
   - Higher pressure → Higher velocity
   - Important for deep waves

4. **Composition**
   - Different minerals = different velocities
   - Used for Earth structure studies

## Real-World Applications 🔬

### Earthquake Detection
\`\`\`javascript
// Simplified earthquake location using P-S time difference
function estimateDistance(pArrival, sArrival) {
  const timeDiff = sArrival - pArrival; // seconds
  const velocityDiff = 5.0; // km/s (approximate)
  return timeDiff * velocityDiff;
}

// Example
const pTime = new Date('2024-03-10T14:15:23.450Z');
const sTime = new Date('2024-03-10T14:15:31.680Z');
const distance = estimateDistance(pTime, sTime);

console.log(\`Earthquake distance: ~\${distance.toFixed(1)} km\`);
\`\`\`

### Earth's Internal Structure

Seismic waves revealed:
- ✅ **Crust thickness**: 5-70 km
- ✅ **Mantle composition**: Solid rock that flows
- ✅ **Outer core**: Liquid iron-nickel
- ✅ **Inner core**: Solid iron under extreme pressure

## Seismic Wave Analysis

### Wave Amplitude and Energy

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Simulate P-wave and S-wave arrival
time = np.linspace(0, 60, 1000)
distance = 100  # km

# Wave arrivals
p_arrival = distance / 6.0  # P-wave at 6 km/s
s_arrival = distance / 3.5  # S-wave at 3.5 km/s

# Create synthetic seismogram
p_wave = np.where(time >= p_arrival, 
                  2 * np.sin(2*np.pi*10*(time-p_arrival)) * 
                  np.exp(-(time-p_arrival)*0.5), 0)

s_wave = np.where(time >= s_arrival,
                  5 * np.sin(2*np.pi*5*(time-s_arrival)) * 
                  np.exp(-(time-s_arrival)*0.3), 0)

seismogram = p_wave + s_wave
\`\`\`

## Modern Seismology Tools

### Global Seismic Networks
- **IRIS**: Incorporated Research Institutions for Seismology
- **GEOFON**: German seismic network
- **INGV**: Italian National Institute of Geophysics

### Detection Technology
- Digital seismometers with 24-bit resolution
- Real-time data transmission via satellite
- AI-powered earthquake detection algorithms

## Conclusion

Understanding seismic waves is fundamental to:
- 🔬 **Scientific research** into Earth's structure
- 🏗️ **Engineering** earthquake-resistant buildings
- 🚨 **Early warning systems** for tsunami and earthquake alerts
- 🔍 **Resource exploration** for oil, gas, and minerals

The study of seismic waves continues to evolve with new technologies, providing deeper insights into our planet's dynamic processes and helping us better prepare for seismic hazards.

---

*Next: Learn about how seismic networks detect and locate earthquakes in real-time using these wave principles.*`,
        author: "Prof. Marco Antonelli",
        date: "2024-03-10T14:15:00Z",
        category: "Research",
        readTime: 12,
        tags: ["seismic-waves", "p-waves", "s-waves", "earthquake-science", "geophysics", "research"]
      }
    }

    return posts[slug] || null
  }

  const generateRelatedPosts = () => {
    return [
      {
        id: 3,
        title: "Building Earthquake-Resistant Structures",
        slug: "building-earthquake-resistant-structures",
        excerpt: "Discover the engineering principles and techniques used to construct buildings that can withstand seismic forces.",
        category: "Engineering",
        readTime: 7
      },
      {
        id: 4,
        title: "Italy's Seismic History: Lessons from Major Earthquakes",
        slug: "italy-seismic-history-lessons",
        excerpt: "A comprehensive overview of Italy's most significant earthquakes and the valuable lessons learned from each event.",
        category: "History",
        readTime: 9
      },
      {
        id: 5,
        title: "Modern Seismology: Technology and Innovation",
        slug: "modern-seismology-technology-innovation",
        excerpt: "Exploring the latest technologies and methodologies used by seismologists to monitor and study earthquake activity.",
        category: "Technology",
        readTime: 5
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
          text: post.title,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Loading..." description="Loading blog post" />
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
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
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => navigate('/blog')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Back to Blog
            </button>
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
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Post Not Found</h2>
            <p className="text-gray-400 mb-4">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Back to Blog
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
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} 
      />
      
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back to Blog Button */}
          <Link 
            to="/blog"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-8">
              {/* Category and Share */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaShare className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-purple-400" />
                  <span>{post.author}</span>
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
                    h1: ({children}) => <h1 className="text-3xl font-bold text-white mb-6 border-b-2 border-purple-500 pb-3">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-bold text-white mb-4 mt-8 border-b border-purple-400 pb-2">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>,
                    h4: ({children}) => <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">{children}</h4>,
                    p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    strong: ({children}) => <strong className="text-purple-400 font-semibold">{children}</strong>,
                    em: ({children}) => <em className="text-purple-300 italic">{children}</em>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>,
                    li: ({children}) => <li className="text-gray-300">{children}</li>,
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-900/20 rounded-r-lg">
                        <div className="text-purple-200 italic">{children}</div>
                      </blockquote>
                    ),
                    code: ({inline, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <div className="relative">
                          <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded-bl-md rounded-tr-md">
                            {match[1]}
                          </div>
                          <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto mb-4 mt-2">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm" {...props}>
                          {children}
                        </code>
                      )
                    },
                    table: ({children}) => (
                      <div className="overflow-x-auto mb-6">
                        <table className="min-w-full border border-gray-600 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({children}) => <thead className="bg-purple-900/50">{children}</thead>,
                    tbody: ({children}) => <tbody className="bg-gray-900/50">{children}</tbody>,
                    tr: ({children}) => <tr className="border-b border-gray-600">{children}</tr>,
                    th: ({children}) => <th className="px-4 py-3 text-left text-purple-300 font-semibold">{children}</th>,
                    td: ({children}) => <td className="px-4 py-3 text-gray-300">{children}</td>,
                    img: ({src, alt}) => (
                      <div className="my-6">
                        <img src={src} alt={alt} className="rounded-lg shadow-lg max-w-full h-auto mx-auto" />
                        {alt && <p className="text-center text-gray-500 text-sm mt-2">{alt}</p>}
                      </div>
                    ),
                    a: ({href, children}) => (
                      <a href={href} className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="flex items-center mb-4">
                    <FaTag className="text-purple-400 mr-2" />
                    <h4 className="text-white font-semibold">Related Topics</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, index) => (
                      <button 
                        key={tag}
                        className={`group relative overflow-hidden text-sm px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 ${
                          index % 3 === 0 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500 text-white hover:from-purple-500 hover:to-purple-600' 
                            : index % 3 === 1 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 text-white hover:from-blue-500 hover:to-blue-600'
                            : 'bg-gradient-to-r from-green-600 to-green-700 border-green-500 text-white hover:from-green-500 hover:to-green-600'
                        }`}
                        onClick={() => {
                          // TODO: Navigate to tag filter page
                          console.log(`Searching for tag: ${tag}`)
                        }}
                      >
                        <span className="relative z-10 flex items-center">
                          <span className="mr-1">#</span>
                          {tag.replace('-', ' ')}
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mt-3">Click on tags to explore related articles</p>
                </div>
              )}
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article 
                    key={relatedPost.id}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {relatedPost.readTime} min
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-3 line-clamp-2">
                      <Link 
                        to={`/blog/${relatedPost.slug}`} 
                        className="hover:text-purple-400 transition-colors duration-200"
                      >
                        {relatedPost.title}
                      </Link>
                    </h4>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
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