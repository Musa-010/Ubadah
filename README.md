# FiberLink - ISP Landing Page

A modern, futuristic 3D glassmorphism landing page for an Internet Service Provider built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### Design
- **Glassmorphism Effects**: Semi-transparent glass cards with backdrop blur
- **3D Animations**: Floating blob shapes with smooth animations
- **Gradient Design**: Teal → Purple → Pink color scheme
- **Responsive Layout**: Mobile-first design with breakpoints
- **Modern Typography**: Inter font family with various weights

### Interactions
- **Live Counter**: Animated active connections counter with real-time fluctuation
- **Parallax Effects**: Mouse movement parallax for background blobs
- **Hero Card Tilt**: 3D tilt effect on hero card hover
- **Ripple Effects**: Button click ripple animations
- **Smooth Scrolling**: Smooth navigation between sections
- **Hover Animations**: Card lift effects and micro-interactions

### Accessibility
- **Keyboard Navigation**: Full keyboard support with focus states
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Accessible color combinations
- **Mobile Responsive**: Touch-friendly on all devices

## 📁 Project Structure

```
Ubadah/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styling and responsive design
├── js/
│   └── main.js         # Interactive functionality
└── assets/             # Images and other assets (ready for future use)
```

## 🎨 Color Tokens

```css
--teal: #14B8A6
--purple: #7C3AED
--pink: #FF6BA6
--dark: #0F172A
--glass: rgba(255, 255, 255, 0.1)
--glass-border: rgba(255, 255, 255, 0.2)
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Adjusted grid)
- **Mobile**: 320px - 767px (Stacked layout)

## ⚡ Performance Features

- **Optimized Animations**: GPU-accelerated transforms
- **Debounced Events**: Optimized scroll and resize handlers
- **Intersection Observer**: Efficient scroll-based animations
- **Reduced Bundle Size**: No external dependencies
- **Fast Loading**: Minimal CSS and JS footprint

## 🛠️ Technical Implementation

### CSS Features
- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- Backdrop Filter for glassmorphism
- CSS Animations and Transforms
- Media queries for responsive design

### JavaScript Features
- Vanilla JS (no frameworks)
- ES6+ syntax with proper fallbacks
- Intersection Observer API
- Performance-optimized event handling
- Modular function structure

### HTML Features
- Semantic HTML5 structure
- Proper ARIA labels
- Meta tags for SEO
- Progressive enhancement

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Or serve** using a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 🔧 Customization

### Colors
Edit the CSS custom properties in `css/style.css`:
```css
:root {
    --teal: #your-color;
    --purple: #your-color;
    --pink: #your-color;
}
```

### Content
- Update text content in `index.html`
- Modify pricing plans in the plans section
- Change company information in the footer

### Animations
- Adjust animation durations in `css/style.css`
- Modify JavaScript timing in `js/main.js`
- Enable/disable effects based on user preferences

## 📊 Browser Support

- **Chrome**: 88+ ✅
- **Firefox**: 85+ ✅
- **Safari**: 14+ ✅
- **Edge**: 88+ ✅

### Required Features
- CSS backdrop-filter
- CSS Grid and Flexbox
- Intersection Observer API
- ES6 JavaScript

## 🔮 Future Enhancements

Ready for additional features:
- Contact form integration
- CMS integration
- A/B testing framework
- Analytics integration
- Advanced animations
- Progressive Web App features

## 📄 License

This project is ready for commercial use. Feel free to customize and deploy for your ISP business.

## 🤝 Contributing

This is a starter template. Feel free to:
- Add new features
- Improve accessibility
- Optimize performance
- Add new sections
- Enhance animations

---

**Built with ❤️ for modern web experiences**