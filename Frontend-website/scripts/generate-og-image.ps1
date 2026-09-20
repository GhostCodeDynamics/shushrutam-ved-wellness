# Generates public/og-image.png (1200x630 social preview) using the clinic logo
# and brand palette. Requires Windows PowerShell with System.Drawing.
#
# Usage: powershell -File scripts/generate-og-image.ps1 -SiteUrl https://clinic.example

param(
  [string]$SiteUrl = "https://shushrutamvedcare.example.com"
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root "public"
$logoPath = Join-Path $publicDir "assets\logo\icon.png"
$outPath = Join-Path $publicDir "og-image.png"
$brandDeep = [System.Drawing.Color]::FromArgb(255, 15, 76, 41)
$brandSoft = [System.Drawing.Color]::FromArgb(255, 47, 143, 87)
$cream = [System.Drawing.Color]::FromArgb(255, 250, 247, 239)
$gold = [System.Drawing.Color]::FromArgb(255, 217, 164, 65)

foreach ($p in @($logoPath, $publicDir)) {
  if (-not (Test-Path -LiteralPath $p)) {
    Write-Error "Missing path: $p"
    exit 1
  }
}

$logo = [System.Drawing.Image]::FromFile($logoPath)
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear($brandDeep)

# subtle radial glow (soft green) at top-right
$glowBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(26, 47, 143, 87)
)
$g.FillEllipse($glowBrush, 700, -200, 800, 500)

# thin gold accent rule under the heading area
$lineBrush = New-Object System.Drawing.SolidBrush($gold)
$g.FillRectangle($lineBrush, 424, 360, 120, 4)

# logo at left, vertically centered
$pad = 84
$logoW = 260
$logoH = 260
$logoX = $pad
$logoY = ($h - $logoH) / 2
$g.DrawImage($logo, $logoX, $logoY, $logoW, $logoH)

# text to the right of the logo
$nameFont = New-Object System.Drawing.Font("Georgia", 46, [System.Drawing.FontStyle]::Bold)
$tagFont  = New-Object System.Drawing.Font("Segoe UI Semibold", 20, [System.Drawing.FontStyle]::Regular)
$urlFont  = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)

$nameBrush = New-Object System.Drawing.SolidBrush($cream)
$tagBrush  = New-Object System.Drawing.SolidBrush($gold)
$urlBrush  = New-Object System.Drawing.SolidBrush($cream)

$textX = $logoX + $logoW + 50
$baseY = 150

$g.DrawString("ShushrutamVed Care", $nameFont, $nameBrush, $textX, $baseY)
$g.DrawString("Naturopathy & Lifestyle Medicine", $tagFont, $tagBrush, $textX, $baseY + 84)
$g.DrawString($SiteUrl, $urlFont, $urlBrush, $textX, $baseY + 138)

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$logo.Dispose()

$fi = Get-Item $outPath
Write-Output "Created $($fi.FullName) - $($fi.Length) bytes"