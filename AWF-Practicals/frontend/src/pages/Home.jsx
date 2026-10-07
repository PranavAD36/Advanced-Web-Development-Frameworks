import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Footer from '../components/Footer';

// Practical 1 - compose a single page layout from 4 reusable components.
const SKILLS = [
  'React',
  'JavaScript',
  'React Router',
  'HTML5',
  'CSS3',
  'REST APIs',
  'Node.js',
  'Express',
  'MongoDB',
  'Mongoose',
  'JWT Auth',
  'Git & GitHub',
];

const BIO =
  'I am Pranav Dabhi, a full-stack web developer and 5th semester IT student. ' +
  'I build modern, responsive web applications with React on the front end and ' +
  'Node.js, Express and MongoDB on the back end. I enjoy turning ideas into ' +
  'clean, fast and user-friendly products - from REST APIs and JWT authentication ' +
  'to fully responsive interfaces.';

function Home() {
  return (
    <div className="portfolio">
      <Header name="Pranav Dabhi" role="Full-Stack Web Developer" theme="light" />
      <div className="portfolio-body">
        <About bio={BIO} />
        <Skills skills={SKILLS} />
      </div>
      <Footer contact="pranav.dabhi9969@gmail.com" github="https://github.com/PranavAD36" />
    </div>
  );
}

export default Home;