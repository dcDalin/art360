import RegisterForm from '@/components/forms/AuthForms/RegisterForm';
import CardLayout from '@/components/layout/CardLayout';
import NoHeaderLayout from '@/components/layout/NoHeaderLayout';

import withoutAuthentication from '@/HOC/withoutAuthentication';

function RegisterPage() {
  return (
    <NoHeaderLayout templateTitle='Register'>
      <CardLayout title='Create your account' footerText='Art360'>
        <RegisterForm />
      </CardLayout>
    </NoHeaderLayout>
  );
}

export default withoutAuthentication(RegisterPage);
