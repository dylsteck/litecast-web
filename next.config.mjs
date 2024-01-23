/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["geist"],
    images: { 
        domains: [
            'raw.seadn.io',
            'i.seadn.io',
            'img.seadn.io',
            'i.imgur.com',
            'res.cloudinary.com',
            'pbs.twimg.com',
            'lh3.googleusercontent.com',
            'd2qbf73089ujv4.cloudfront.net',
            'explorer.farcaster.xyz',
            'openseauserdata.com',
            'media.discordapp.net',
            'user-images.githubusercontent.com',
            'github.com',
            'live.staticflickr.com',
            'ipfs.decentralized-content.com',
            'kyle-mann.com',
            'uploads-ssl.webflow.com',
            'dropbox.com',
          ],
    },
};

export default nextConfig;
