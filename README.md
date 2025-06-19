# Portfolio Management System with Supabase

This is a modern portfolio website with a complete backend management system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Frontend Portfolio
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern UI**: Glassmorphism effects and smooth transitions
- **Dynamic Content**: All content is dynamically loaded from Supabase
- **Project Showcase**: Interactive project cards with detailed modals
- **Skills Visualization**: Animated progress bars and skill categories
- **Experience Timeline**: Professional work experience display
- **Certifications**: Education and professional certifications
- **Contact Form**: Functional contact form with validation

### Admin Management System
- **Dashboard**: Overview of all portfolio content with statistics
- **Project Manager**: Create, edit, and delete portfolio projects
- **Experience Manager**: Manage work experience entries
- **Certification Manager**: Handle education and certifications
- **Skills Manager**: Organize skills into categories with percentages
- **Personal Info Manager**: Update personal details and social links
- **Media Manager**: Upload and manage images and documents
- **Real-time Updates**: Changes reflect immediately on the portfolio

### Backend (Supabase)
- **PostgreSQL Database**: Robust relational database
- **Row Level Security**: Secure data access policies
- **File Storage**: Cloud storage for images and documents
- **Real-time Subscriptions**: Live updates across clients
- **Authentication Ready**: Built-in user management system

## Setup Instructions

### 1. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Get Your Credentials**
   - Go to Settings > API
   - Copy your Project URL and anon public key

3. **Update Environment Variables**
   - Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL="your-project-url"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   ```

4. **Run Database Migrations**
   - In your Supabase dashboard, go to SQL Editor
   - Copy and run the contents of `supabase/migrations/create_portfolio_tables.sql`
   - Then run `supabase/migrations/seed_initial_data.sql` to populate with sample data

5. **Set Up Storage**
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called `portfolio-media`
   - Set it to public access for file uploads

### 2. Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Portfolio: `http://localhost:8080`
   - Admin Panel: `http://localhost:8080/admin`

## Database Schema

### Tables Created
- `projects`: Portfolio projects with technologies, links, and details
- `certifications`: Education and professional certifications
- `experiences`: Work experience with responsibilities and achievements
- `skill_categories`: Organized skills with proficiency percentages
- `personal_info`: Personal details, bio, and social links
- `media`: Uploaded files with metadata

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access for portfolio display
- Authenticated write access for admin management
- Secure file upload and storage

## Key Features

### Data Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **File Uploads**: Secure file storage with Supabase Storage
- **Data Validation**: Form validation and error handling
- **Real-time Updates**: Changes reflect immediately

### User Experience
- **Responsive Design**: Works perfectly on all devices
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success and error feedback

### Performance
- **Optimized Queries**: Efficient database queries
- **Image Optimization**: Proper image handling and display
- **Lazy Loading**: Components load as needed
- **Caching**: Efficient data caching strategies

## Customization

### Adding New Sections
1. Create the database table in Supabase
2. Add the interface to `src/services/dataService.ts`
3. Create the admin manager component
4. Add the frontend display component
5. Update the navigation and routing

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Customize components in `src/components/`

### Content Management
- Use the admin panel at `/admin` to manage all content
- Upload media files through the Media Manager
- Update personal information and social links
- Add new projects, experiences, and certifications

## Deployment

### Frontend Deployment
- Build the project: `npm run build`
- Deploy to Netlify, Vercel, or any static hosting service
- Ensure environment variables are set in your hosting platform

### Database
- Your Supabase database is already hosted and managed
- No additional deployment needed for the backend
- Monitor usage in your Supabase dashboard

## Support

For issues or questions:
1. Check the Supabase documentation
2. Review the code comments and structure
3. Test the admin panel functionality
4. Verify environment variables are correct

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Storage, Auth)
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form with validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

This portfolio system provides a complete solution for showcasing professional work with an easy-to-use management interface.