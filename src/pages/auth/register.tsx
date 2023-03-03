import NoHeaderLayout from '@/components/layout/NoHeaderLayout';

import withoutAuthentication from '@/HOC/withoutAuthentication';

// TODO: Create user profile on registration
function RegisterPage() {
  return (
    <NoHeaderLayout templateTitle='New account'>login page here</NoHeaderLayout>
  );
}

export default withoutAuthentication(RegisterPage);
