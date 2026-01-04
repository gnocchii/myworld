import StackedCarousel from './StackedCarousel';
import PhotoLabel from './PhotoLabel';

export default function About() {
  const carouselImages = [
    { src: '/images/about/image2.jpeg', alt: 'Photo 1' },
    { src: '/images/about/image1.jpeg', alt: 'Photo 2' },
    { src: '/images/about/photo4.jpeg', alt: 'Photo 3' },
    { src: '/images/about/image3.jpeg', alt: 'Photo 4' },
    { src: '/images/about/photo5.jpeg', alt: 'Photo 5' },
  ];

  return (
    <main className="content" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '2rem',
      maxWidth: '1100px',
      margin: '0 auto',
      gap: '3rem',
    }}>
      {/* Stacked Carousel */}
      <div style={{
        flexShrink: 0,
        paddingTop: '13rem',
        marginLeft: '-10rem',
      }}>
        <div style={{
          fontSize: '0.0001rem',
          marginLeft: '3rem',
          marginBottom: '0.5rem',
        }}>
          <PhotoLabel count={5} />
        </div>
        <StackedCarousel images={carouselImages} />
      </div>

      {/* Text Content */}
      <div style={{
        fontFamily: "'Relationship of Melodrame', monospace",
        color: '#272622',
        flex: 1,
      }}>
        <div style={{
          fontFamily: "'relationship of melodrame', serif",
          fontSize: '2.5rem',
          textAlign: 'left',
          marginTop: '13rem',
          marginBottom: '2rem',
        }}>
          Hi, welcome to m.y world!
        </div>
        <div style={{
          fontSize: '0.8rem',
          lineHeight: '1.8',
          textAlign: 'left',
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm Melody, a software engineer passionate about creating
            meaningful digital experiences at the intersection of creativity and technology.
            I believe in the power of design to tell stories and connect people.
          </p>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginTop: '2rem',
            marginBottom: '1rem',
          }}>
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm currently studying Computer Science at Purdue University with minors in Mathematics and Management! I'm interested in
            fullstack development (more frontend), AI research, and creative problem solving.
          </p>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginTop: '2rem',
            marginBottom: '1rem',
          }}>
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Outside of work you can find me milking my music taste, at the cinema, playing Celeste, skiing, sightreading Rachmaninoff, or destroying my digestive tracts with spicy snacks and kombucha!
          </p>
        </div>
      </div>
    </main>
  );
}
