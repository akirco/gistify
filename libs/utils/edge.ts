import { createClient } from '@vercel/edge-config';

const edgeConfigClient =
  global.edgeConfigClient || createClient(process.env['EDGE_CONFIG']);

if (process.env.NODE_ENV === 'production')
  global.edgeConfigClient = edgeConfigClient;

export { edgeConfigClient };
