import StackedCarousel from './StackedCarousel';
import PhotoLabel from './PhotoLabel';

export default function About() {
  const carouselImages = [
    { src: '/images/about/image1.jpeg', alt: 'Photo 1' },
    { src: '/images/about/image2.jpeg', alt: 'Photo 2' },
    { src: '/images/about/image3.jpeg', alt: 'Photo 3' },
    { src: '/images/about/photo4.jpeg', alt: 'Photo 4' },
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
        fontFamily: "'Roboto Mono', monospace",
        color: '#272622',
        flex: 1,
      }}>
        <div style={{
          fontSize: '0.8rem',
          lineHeight: '1.8',
          textAlign: 'left',
          marginTop: '13rem',
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Hi! Welcome to M.Y space!

            I'm Melody Yang, a multidisciplinary software engineer passionate about creating
            meaningful digital experiences that blend creativity with technology.
            I believe in the power of design to tell stories and connect people.
          </p>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginTop: '2rem',
            marginBottom: '1rem',
          }}>
            Current Adventure
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Currently studying Computer Science at Purdue University with minors in Mathematics and Management!
          </p>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginTop: '2rem',
            marginBottom: '1rem',
          }}>
            Philosophies
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            • Design should feel effortless, even when it's complex<br/>
            • Every detail matters, from pixels to interactions<br/>
            • The best work comes from curiosity and experimentation<br/>
            • Technology is a tool for human connection, not a replacement for it
          </p>
        </div>
      </div>
    </main>
  );
}
