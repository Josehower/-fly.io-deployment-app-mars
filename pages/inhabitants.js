import { getInhabitants } from '../utils/database';

export default function Home(props) {
  return (
    <>
      <h1>Mars Planet Inhabitants:</h1>
      <ul>
        {props.inhabitants.map((inhabitant) => (
          <li key={`inhabitant-${inhabitant.id}`}>
            Name: {inhabitant.name}
            <ul>
              <li>Age: {inhabitant.age} Mars years</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  return { props: { inhabitants: await getInhabitants() } };
}
