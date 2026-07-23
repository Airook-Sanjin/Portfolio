# 🖥️ NothingOS-Inspired Portfolio

A modern, interactive portfolio designed as a desktop-like experience inspired by the minimalist aesthetic of Nothing OS. This project reimagines a personal portfolio as a fully functional UI environment, complete with draggable apps, window management, and a dynamic taskbar.

---

## Design Philosophy

This project focuses on:

- **Minimalism** — Inspired by Nothing OS clean design
- **Interactivity** — Making a portfolio feel like a system, not a page
- **Scalability** — Component-driven architecture for easy expansion
- **User Experience** — Smooth animations and intuitive controls

---

## 🛠️ Tech Stack

- **React** (Functional Components + Hooks)
- **Framer Motion** (`motion/react`) for animations
- **CSS Variables** + `light-dark()` for theming
- **LocalStorage** for persistence
- **Custom Hooks**
  - `useWindowManager`
  - `useIconDrag`
  - `useDate`

---

## 🚀 How It Works

### Window Management

Handles:

- opening apps
- tracking active windows
- minimizing/restoring
- z-index stacking

### Drag System

- Desktop icons and windows use shared drag logic
- Mouse events propagate through the desktop container

### Theme System

- Theme stored in `localStorage`
- Applied via:

  ```js
  document.documentElement.style.colorScheme = theme;
  ```

- CSS uses:

  ```css
  light-dark(lightValue, darkValue)
  ```

---

## 🔮 Future Improvements

- 🔊 Sound effects (OS-like feedback)
- 🧠 App state persistence (restore sessions)
- 🎞️ Window snapping / tiling system
- 📂 File explorer simulation
- 🌐 Real project apps (browser, terminal, etc.)
- 🎨 SVG-based adaptive icons (theme-aware)

---

## 📸 Inspiration

- Nothing OS UI/UX
- macOS Dock interactions
- Desktop operating systems (Windows / Linux environments)

---

## 👤 Author

Built by **Erick Sanjuan**
Computer Software Engineering Technology Student
Focused on front-end systems, UI/UX, and interactive web applications

---

## 💡 Final Thoughts

This project turns a portfolio into an **experience** — blending creativity, technical skill, and design thinking into a system users can explore.

---

⭐ If you like this project, feel free to star it or share feedback!
