import LoginForm from '@/components/forms/AuthForms/LoginForm';
import CardLayout from '@/components/layout/CardLayout';
import NoHeaderLayout from '@/components/layout/NoHeaderLayout';

import withoutAuthentication from '@/HOC/withoutAuthentication';

function LoginPage() {
  return (
    <NoHeaderLayout templateTitle='Login'>
      <CardLayout title='Log in' footerText='Art360'>
        <LoginForm />
      </CardLayout>
    </NoHeaderLayout>
  );
}

export default withoutAuthentication(LoginPage);
