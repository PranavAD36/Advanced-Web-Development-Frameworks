// Practical 1 - reusable component that receives its content as a prop.
function About({ bio }) {
  return (
    <section className="card">
      <h2>About</h2>
      <p>{bio}</p>
    </section>
  );
}

export default About;
