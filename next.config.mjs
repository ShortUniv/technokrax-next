/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      domains: [
        'demos.themeselection.com',
        'i.ibb.co',
        'i.postimg.cc',
        'media.istockphoto.com',
        'images.unsplash.com',
        'plus.unsplash.com',
        'kpp1td2yze.execute-api.us-west-2.amazonaws.com'
      ],
    },
  };
  
  export default nextConfig;
  