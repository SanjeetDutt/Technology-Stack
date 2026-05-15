import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	sassOptions: {
		implementation: 'sass',
	},

	turbopack:{
		rules:{
			"*.svg":{
				loaders:["@svgr/webpack"],
				as:"*.tsx"
			}
		}
	}
};

export default nextConfig;
