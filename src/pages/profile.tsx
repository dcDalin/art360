import withUserAuthenticated from '@/HOC/withUserAuthenticated';

function ProfilePage() {
  return <h1>profile page</h1>;
}

export default withUserAuthenticated(ProfilePage);
