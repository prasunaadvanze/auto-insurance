# PowerShell script to generate PWA icons
# This script requires ImageMagick to be installed

# Check if ImageMagick is installed
$imPath = Get-Command convert -ErrorAction SilentlyContinue

if (-not $imPath) {
    Write-Host "ImageMagick is not installed or 'convert' command not found." -ForegroundColor Red
    Write-Host "`nTo install ImageMagick on Windows, run:" -ForegroundColor Yellow
    Write-Host "  choco install imagemagick`n"
    
    Write-Host "Or download from: https://imagemagick.org/script/download.php`n"
    
    Write-Host "Alternative: Use an online converter:" -ForegroundColor Yellow
    Write-Host "  1. Go to https://icoconvert.com/"
    Write-Host "  2. Upload public/icon.svg"
    Write-Host "  3. Convert to PNG with sizes 192x192 and 512x512"
    Write-Host "  4. Save files to public/ folder`n"
    
    exit 1
}

Write-Host "Generating PNG icons from SVG..." -ForegroundColor Cyan

$sizes = @(192, 512)

foreach ($size in $sizes) {
    $outputPath = "public/icon-${size}x${size}.png"
    Write-Host "Creating $outputPath..."
    
    & convert "public/icon.svg" -resize "${size}x${size}" $outputPath
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Created $outputPath" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to create $outputPath" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n✓ All icons generated successfully!" -ForegroundColor Green
Write-Host "Your PWA is ready to install!`n" -ForegroundColor Green
