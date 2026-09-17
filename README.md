# Studio 89 — Webentwickler-Portfolio

Statische Website (React, Vite, TypeScript) für GitHub Pages.

Live nach dem Deploy: https://web-developer89.github.io/web-developer/

## Lokal starten

```bash
npm install
npm run dev
```

Produktion bauen:

```bash
npm run build
npm run preview
```

`preview` nutzt den GitHub-Pages-Pfad `/web-developer/`.

## Inhalte anpassen

Die meisten Texte, Kontakte, Budgets und das Kleinanzeigen-Profil stehen in:

- `src/siteConfig.ts`
- `src/data/` (Leistungen, FAQ, Demos, Konfigurator-Optionen)

Wichtig:

- `ebayKleinanzeigenUrl` durch die echte Profil- oder Anzeigen-URL ersetzen
- `email`, `phone`, `whatsapp` und `legal` mit echten Angaben füllen
- `formEndpoint` setzen, wenn später Formspree, Basin oder ein eigenes Backend drankommt

## GitHub Pages

1. Repo `web-developer` unter dem Account `web-developer89`
2. Settings → Pages → Source: **GitHub Actions**
3. Push auf `main` löst `.github/workflows/deploy.yml` aus

Die Workflow-Datei lädt den `dist`-Ordner als Pages-Artefakt hoch. Für SPA-Routen (`/impressum`) wird beim Build zusätzlich `404.html` erzeugt.
