import { NhostClient } from '@nhost/nextjs';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'hqgvidhnlbykeqlgeglh',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'eu-central-1',
});

export default nhost;
