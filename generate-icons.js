const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawIcon(canvas) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  
  // Fill background
  ctx.fillStyle = '#1e40af';
  ctx.fillRect(0, 0, size, size);
  
  // Draw rounded background
  const radius = size * 0.23;
  ctx.fillStyle = '#1e40af';
  roundRect(ctx, 0, 0, size, size, radius);
  ctx.fill();
  
  // Draw shield
  const shieldX = size * 0.3;
  const shieldY = size * 0.15;
  const shieldW = size * 0.4;
  const shieldH = size * 0.55;
  
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(shieldX + shieldW / 2, shieldY);
  ctx.lineTo(shieldX + shieldW, shieldY + shieldH * 0.3);
  ctx.lineTo(shieldX + shieldW, shieldY + shieldH * 0.6);
  ctx.bezierCurveTo(
    shieldX + shieldW,
    shieldY + shieldH,
    shieldX + shieldW / 2,
    shieldY + shieldH * 1.2,
    shieldX + shieldW / 2,
    shieldY + shieldH * 1.2
  );
  ctx.bezierCurveTo(
    shieldX,
    shieldY + shieldH * 1.2,
    shieldX,
    shieldY + shieldH,
    shieldX,
    shieldY + shieldH * 0.6
  );
  ctx.lineTo(shieldX, shieldY + shieldH * 0.3);
  ctx.closePath();
  ctx.fill();
  
  // Draw checkmark
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = size * 0.06;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(shieldX + shieldW * 0.25, shieldY + shieldH * 0.65);
  ctx.lineTo(shieldX + shieldW * 0.4, shieldY + shieldH * 0.8);
  ctx.lineTo(shieldX + shieldW * 0.75, shieldY + shieldH * 0.4);
  ctx.stroke();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const sizes = [192, 512];
const publicDir = path.join(__dirname, 'public');

console.log('🎨 Generating PWA icons...\n');

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  drawIcon(canvas);
  
  const filePath = path.join(publicDir, `icon-${size}x${size}.png`);
  const stream = fs.createWriteStream(filePath);
  const canvasStream = canvas.createPNGStream();
  
  canvasStream.pipe(stream);
  
  stream.on('finish', () => {
    console.log(`✓ Created icon-${size}x${size}.png`);
  });
  
  stream.on('error', (err) => {
    console.error(`✗ Failed to create icon-${size}x${size}.png:`, err);
  });
});

setTimeout(() => {
  console.log('\n✅ All icons generated successfully!');
  console.log('🚀 Your PWA is ready to install!\n');
}, 1000);
