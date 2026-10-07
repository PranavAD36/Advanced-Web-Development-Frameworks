// Practical 1 - renders an array passed in as a prop.
function Skills({ skills }) {
  return (
    <section className="card">
      <h2>Skills</h2>
      <ul className="skill-list">
        {skills.map((skill) => (
          <li key={skill} className="skill-pill">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
