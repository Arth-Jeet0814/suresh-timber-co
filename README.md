# Suresh Timber Company - Official Website

> **Pioneering Packaging Reliability Since 1986**  
> Vadodara, Gujarat, India | 67,000 Sq. Ft. Manufacturing Plant

A high-performance, responsive marketing website for **Suresh Timber Company**, Vadodara. Built strictly with standard HTML5, modern CSS3, and vanilla JavaScript (zero frameworks, zero build steps, zero external runtime dependencies).

---

## Architecture Overview

```
Suresh Wood/
|-- .gitignore                  # Production git ignore definitions
|-- .nojekyll                   # Static compatibility flag for GitHub Pages
|-- index.html                  # Instant root entry redirect to profile.html
|-- profile.html                # Comprehensive landing, factsheet & integrated enquiry
|-- README.md                   # Project documentation & deployment guide
|-- assets/
|   |-- ispm15-stamp.svg        # Official ISPM-15 IPPC stamp vector
|   |-- pallet-motif.svg        # Craft watermark background motif
|   `-- images/                 # Optimized photographic assets & official logos
|       |-- factory-facility.jpg
|       |-- favicon-32x32.png
|       |-- fumigation.jpg
|       |-- gallery-1.jpg to gallery-6.jpg
|       |-- heat-treatment.jpg
|       |-- hero-bg.jpg
|       |-- hero-wood.jpg
|       |-- logo.png
|       |-- team-craftsmen.jpg
|       `-- timber-texture-bg.jpg
|-- css/
|   `-- style.css               # Design tokens, typography, layout & animations
`-- js/
    `-- main.js                 # Sticky nav, scroll reveal, counters, form & lightbox
```

---

## Sections Included on `profile.html`

1. **Hero**: High-impact introduction, official logo, 67,000 sq. ft. facility badge, 4-pillar trust strip (ISPM-15, ISO 9001:2015, In-House Kiln, Private Fleet).
2. **About Company**: 38-year legacy narrative, leadership by Bharat Patel, facility photo, key operational pillars.
3. **Stats Band**: Animated metric counters (38+ Years, 5,000+ Units/Mo, 250+ Enterprise Clients, 100% ISPM-15 Compliance).
4. **Why Choose Us (`#whyUs`)**: 8 icon advantage cards highlighting precision engineering, on-time delivery, and kiln capacity.
5. **Aim, Vision & Mission**: Three structured corporate direction cards.
6. **ISPM-15 Treatment (`#ispm15`)**: Kiln heat-treatment chambers, chemical fumigation, official IPPC stamp specifications.
7. **Craftsmen & Engineering**: Human team profile, safety standards, continuous quality assurance.
8. **Industries Protected**: Specialized solutions across Solar Energy, Heavy Engineering, Automotive, Chemical & Pharma, Electrical, and Export Freight.
9. **Corporate Factsheet (`#factsheet`)**: Official business registrations, GSTIN, legal status, and facility data.
10. **Manufacturing Album (`#album`)**: 6-photo facility gallery with interactive keyboard-navigable Lightbox modal.
11. **Closing CTA Banner**: Action prompt for custom industrial specifications.
12. **Integrated Contact & Enquiry (`#contact`)**:
    - **Direct Factory Details**: Bharat Patel (Partner), address, phone, email, GSTIN, Google Maps directions button, and lazy-loaded Google Maps iframe.
    - **Enquiry Form**: Floating labels, client-side validation, requirement category selection, "Submit Enquiry", and "Send via WhatsApp" prefill integration.

---

## Quick Local Preview

Because there are no build steps or dependencies, you can run the site using any static server:

### Option 1: Python
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/profile.html`.

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `profile.html` and click **"Open with Live Server"**.

---

## Deployment Instructions

### 1. GitHub Pages
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial production release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository settings, navigate to **Settings -> Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. The site will be live within seconds at `https://<your-username>.github.io/<repo-name>/`.

### 2. Netlify
- Drag and drop this folder directly into the [Netlify Drop](https://app.netlify.com/drop) dashboard.
- Zero build configuration needed. Publish directory is the repository root `.`.

### 3. Vercel
- Import repository into Vercel and leave the Build Settings as **Other / Static**.
- Deploy instantly with zero configuration.

---

## Business Information

- **Company Name**: Suresh Timber Company
- **Established**: 1986
- **Key Executive**: Bharat Patel (Partner)
- **Plant Location**: Opp. GSFC Main Gate, NH No. 8, Baroda By Pass Road, Fertilizer Nagar, Vadodara - 391750, Gujarat, India
- **Phone**: +91-8045906574
- **Email**: bharatpatel@sureshwood.com
- **GSTIN**: 24AAQFS8574D1ZR
