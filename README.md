# Simon Asnake - Data Scientist Portfolio

A modern, responsive single-page portfolio website showcasing data science expertise, projects, and professional experience.

## Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern UI**: Glassmorphism effects and smooth transitions
- **Project Showcase**: Interactive project cards with detailed modals
- **Skills Visualization**: Animated progress bars and skill categories
- **Experience Timeline**: Professional work experience display
- **Certifications**: Education and professional certifications
- **Contact Form**: Functional contact form with validation
- **Fast Loading**: Static site with no backend dependencies

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application
- Portfolio: `http://localhost:8080`

## Customization

### Updating Content

All content is stored in local JSON files that you can edit directly:

- **Personal Information**: `src/data/personal.json`
- **Projects**: `src/data/projects.json`
- **Skills**: `src/data/skills.json`
- **Certifications**: `src/data/certifications.json`
- **Experience**: `src/components/experience/experienceData.ts`

### Adding New Projects

Edit `src/data/projects.json` and add a new project object:

```json
{
  "id": 7,
  "title": "Your Project Title",
  "description": "Brief description of your project",
  "challenge": "What problem did you solve?",
  "solution": "How did you solve it?",
  "impact": "What was the business impact?",
  "technologies": ["Python", "SQL", "Power BI"],
  "image": "https://images.pexels.com/photos/your-image.jpeg",
  "category": "Power BI",
  "liveUrl": "https://your-live-demo.com"
}
```

### Updating Personal Information

Edit `src/data/personal.json`:

```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "email": "your.email@example.com",
  "phone": "+1 XXX XXX XXXX",
  "location": "Your City, Country",
  "profileImage": "https://your-profile-image.jpg",
  "bio": "Your professional bio",
  "resume": "/your-resume.pdf",
  "social": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourusername"
  },
  "aboutDescription": "Detailed description about yourself"
}
```

### Styling

- Modify `src/index.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Customize components in `src/components/`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `dist` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Bolt Hosting
- Any CDN or static file server

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── projects/       # Project-specific components
│   └── experience/     # Experience-related components
├── data/               # Static data files
│   ├── personal.json   # Personal information
│   ├── projects.json   # Portfolio projects
│   ├── skills.json     # Technical skills
│   └── certifications.json # Certifications
├── pages/              # Main page component
├── services/           # Data service (simplified)
├── styles/             # CSS files
└── types/              # TypeScript type definitions
```

## Performance

This static portfolio is optimized for:
- Fast loading times (no database queries)
- Minimal bundle size
- Smooth animations and interactions
- Mobile-first responsive design
- SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.