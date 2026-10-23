# Generates public/og-image.png (1200x630 social preview) using the clinic logo,
# doctor photo and brand palette. Requires Windows PowerShell with System.Drawing.
#
# Usage: powershell -File scripts/generate-og-image.ps1 -SiteUrl https://your-domain.example
# SiteUrl defaults to VITE_SITE_URL / SITE_URL from the environment, then the live site.

param(
  [string]$SiteUrl = $(if ($env:VITE_SITE_URL) { $env:VITE_SITE_URL } elseif ($env:SITE_URL) { $env:SITE_URL } else { "https://shushrutam-ved.vercel.app" }),
  [string]$PhotoPath = ""
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root "public"
$logoPath = Join-Path $publicDir "assets\logo\icon.png"
$outPath = Join-Path $publicDir "og-image.png"
if (-not $PhotoPath) { $PhotoPath = Join-Path $root "src\assets\doctor-hero-client.jpg" }

$brandDeep = [System.Drawing.Color]::FromArgb(255, 15, 76, 41)
$brandSoft = [System.Drawing.Color]::FromArgb(255, 47, 143, 87)
$cream = [System.Drawing.Color]::FromArgb(255, 250, 247, 239)
$gold = [System.Drawing.Color]::FromArgb(255, 217, 164, 65)

foreach ($p in @($logoPath, $PhotoPath, $publicDir)) {
  if (-not (Test-Path -LiteralPath $p)) {
    Write-Error "Missing path: $p"
    exit 1
  }
}

$logo = [System.Drawing.Image]::FromFile($logoPath)
$photo = [System.Drawing.Image]::FromFile($PhotoPath)
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear($brandDeep)

# subtle radial glow (soft green) behind the copy
$glowBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(30, 47, 143, 87)
)
$g.FillEllipse($glowBrush, 380, -220, 760, 540)

# Doctor photo on the right, centre-cropped to the 1200x630 canvas height
$photoX = 680
$photoW = 520
$photoH = 630
$sourceAspect = $photo.Width / $photo.Height
$targetAspect = $photoW / $photoH
if ($sourceAspect -gt $targetAspect) {
  $cropH = $photo.Height
  $cropW = [int]($cropH * $targetAspect)
} else {
  $cropW = $photo.Width
  $cropH = [int]($cropW / $targetAspect)
}
$cropX = [int](($photo.Width - $cropW) / 2)
$cropY = [int](($photo.Height - $cropH) / 2)
$srcRect = [System.Drawing.Rectangle]::new([int]$cropX, [int]$cropY, [int]$cropW, [int]$cropH)
$destRect = [System.Drawing.Rectangle]::new([int]$photoX, 0, [int]$photoW, [int]$photoH)
$g.DrawImage($photo, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

# Feather the photo's left edge into the brand-green background
$blendRect = [System.Drawing.Rectangle]::new([int]($photoX - 60), 0, [int]320, [int]$h)
$blend = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $blendRect,
  $brandDeep,
  [System.Drawing.Color]::FromArgb(0, 15, 76, 41),
  [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
)
$colorBlend = New-Object System.Drawing.Drawing2D.ColorBlend(3)
$colorBlend.Colors = @(
  $brandDeep,
  [System.Drawing.Color]::FromArgb(245, 15, 76, 41),
  [System.Drawing.Color]::FromArgb(0, 15, 76, 41)
)
$colorBlend.Positions = @(0.0, 0.2, 1.0)
$blend.InterpolationColors = $colorBlend
$g.FillRectangle($blend, $blendRect)

# Logo
$logoSize = 168
$g.DrawImage($logo, 80, 66, $logoSize, $logoSize)

# Copy block
$nameFont = New-Object System.Drawing.Font("Georgia", 44, [System.Drawing.FontStyle]::Bold)
$tagFont = New-Object System.Drawing.Font("Segoe UI Semibold", 20, [System.Drawing.FontStyle]::Regular)
$doctorFont = New-Object System.Drawing.Font("Segoe UI", 17, [System.Drawing.FontStyle]::Regular)
$urlFont = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Regular)
$footFont = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Regular)

$creamBrush = New-Object System.Drawing.SolidBrush($cream)
$goldBrush = New-Object System.Drawing.SolidBrush($gold)
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(205, 250, 247, 239))
$faintBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(160, 250, 247, 239))
$lineBrush = New-Object System.Drawing.SolidBrush($gold)

$g.DrawString("ShushrutamVed Care", $nameFont, $creamBrush, 78, 262)
$g.DrawString("Naturopathy & Holistic Wellness | Bhopal", $tagFont, $goldBrush, 82, 340)
$g.DrawString("Dr. Aarti Sen | M.Sc. Biotechnology", $doctorFont, $mutedBrush, 82, 382)
$g.FillRectangle($lineBrush, 82, 432, 120, 4)
$g.DrawString($SiteUrl, $urlFont, $faintBrush, 82, 454)
$g.DrawString("In-clinic in Bhopal | Online across India", $footFont, $faintBrush, 82, 520)

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$logo.Dispose()
$photo.Dispose()

$fi = Get-Item $outPath
Write-Output "Created $($fi.FullName) - $($fi.Length) bytes"
