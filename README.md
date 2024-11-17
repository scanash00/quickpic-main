## QuickPic - Tools For Pictures (By Theo forked by Scan)

I wanted a better way to upscale svgs as pngs so I built it. Also wanted a better way to make images into squares. Open source because why not. Free because it only runs on client.
This fork adds new features.
https://tools.scanash.com


Original by Theo:
https://github.com/t3dotgg/quickpic


## Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/scanash00/quickpic-main
cd quickpic-main
```

2. Install dependencies:
```bash
npm install
```

3. Install required UI packages:
```bash
npm install class-variance-authority @radix-ui/react-label @radix-ui/react-slider tailwind-merge
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3001
```

### Building for Production

To create a production build:
```bash
npm run build
```

To start the production server:
```bash
npm start
```
## Features
- Image upscaling
- Square image conversion
- Watermark addition
- Image effects
- Drag and drop support
- Paste image support
