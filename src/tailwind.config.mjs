/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '600' }],
                xl: ['1.5rem', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '700' }],
                '2xl': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
                '3xl': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '800' }],
                '4xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
                '5xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '900' }],
                '6xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.05em', fontWeight: '900' }],
                '7xl': ['5.5rem', { lineHeight: '1.05', letterSpacing: '-0.06em', fontWeight: '900' }],
                '8xl': ['6.5rem', { lineHeight: '1', letterSpacing: '-0.07em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.08em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: '"Madefor Display", "Inter", "Helvetica Neue", "Arial", sans-serif',
                paragraph: '"Madefor Text", "Inter", "Helvetica Neue", "Arial", sans-serif'
            },
            colors: {
                // Primary Green Colors (updated to #00ff77)
                primary: '#00ff77',
                'primary-hover': '#00e066',
                'primary-foreground': '#FFFFFF',
                
                // Accent Colors
                accent: '#00ff77',
                'accent-foreground': '#FFFFFF',
                
                // Link Colors
                link: '#00ff77',
                
                // Text Colors (black theme)
                foreground: '#000000',
                'text-primary': '#000000',
                'text-secondary': '#333333',
                
                // Background Colors
                background: '#FFFFFF',
                'background-secondary': '#F8F9FA',
                'background-tertiary': '#F1F3F4',
                'hero-gradient-start': '#FFFFFF',
                'hero-gradient-end': '#F8FFF9',
                
                // Secondary Colors
                secondary: '#F8F9FA',
                'secondary-foreground': '#000000',
                
                // Border Colors
                border: '#E5E7EB',
                'border-secondary': '#D1D5DB',
                
                // Card Colors
                card: '#FFFFFF',
                'card-foreground': '#000000',
                
                // Muted Surface
                muted: '#F8F9FA',
                'muted-foreground': '#6B7280',
                
                // Legacy color mappings for compatibility
                subtleborder: '#E5E7EB',
                mutedgray: '#F8F9FA'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
