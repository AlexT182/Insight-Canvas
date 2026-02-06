# Insight Canvas

Insight Canvas is a powerful SaaS tool for creating stunning infographics in seconds. Transform your data into beautiful visual stories with no design skills required.

## Features

- **Intuitive Editor**: Drag-and-drop interface for easy infographic creation.
- **Smart Templates**: Professional templates (Vertical Story, Report, Stats Spotlight, etc.).
- **Cloud Storage**: Save designs to the cloud (Supabase) and access them anywhere.
- **Premium Subscription**: Unlock exclusive templates and high-res exports via Lemon Squeezy.
- **Bilingual Support**: Full English and Vietnamese (Tiếng Việt) support.
- **Export**: Download as PNG or PDF.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS.
- **UI Components**: Shadcn UI, Radix UI.
- **Icons**: Lucide React, Phosphor Icons.
- **Backend/Auth**: Supabase.
- **Payments**: Lemon Squeezy.
- **Internationalization**: react-i18next.

## Setup & run

1.  **Clone the repo**:
    ```bash
    git clone https://github.com/your-username/insight-canvas.git
    cd insight-canvas
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_LEMON_SQUEEZY_CHECKOUT_URL=your_lemon_squeezy_url
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Deployment

Refer to `DEPLOYMENT.md` for detailed instructions on deploying to Vercel.

## License

MIT
