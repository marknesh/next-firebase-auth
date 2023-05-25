import { checkIfLoggedIn } from '../utils/checkIfLoggedIn';

export default async function Home() {
  const user = await checkIfLoggedIn();
  return (
    <div>
      {user ? <h2>Hi {user?.email}</h2> : <h2>You are not logged in</h2>}
    </div>
  );
}
