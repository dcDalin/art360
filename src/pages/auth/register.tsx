import NoHeaderLayout from '@/components/layout/NoHeaderLayout';

import withoutAuthentication from '@/HOC/withoutAuthentication';

function RegisterPage() {
  return (
    <NoHeaderLayout templateTitle='New account'>login page here</NoHeaderLayout>
  );
}

export default withoutAuthentication(RegisterPage);
