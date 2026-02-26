# VS Code: stable workflow for frontend / admin / server

## 1) Install dependencies once

```powershell
npm install
npm --prefix admin install
npm --prefix server install
```

## 2) Open apps in separate VS Code windows

- Frontend: open `frontend.code-workspace`
- Admin: open `admin.code-workspace`
- Server: open `server.code-workspace`

This keeps Extension Host and language servers isolated per app.

## 3) Run each app in its own terminal

Frontend window:

```powershell
npm run dev:front
```

Admin window:

```powershell
npm --prefix admin run dev
```

Server window:

```powershell
npm --prefix server run dev
```

## 4) If VS Code starts lagging

- Command Palette -> `Developer: Reload Window`
- Command Palette -> `TypeScript: Restart TS Server`
- Check `Output -> Log (Extension Host)` for extension crashes
