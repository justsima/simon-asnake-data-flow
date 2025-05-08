
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				portfolio: {
					navy: '#162447',
					teal: '#1A7F8C',
					darkTeal: '#15697A',
					gray: '#1A1A1F',
					darkText: '#E0E0E2',
					mediumBlue: '#2A4073',
					deepTeal: '#15697A',
					darkBg: '#0D1117',
					darkCard: '#161B22',
					darkBorder: '#30363D',
					darkHighlight: '#242C37',
					accent1: '#1A7F8C',
					accent2: '#15697A',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-delay': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'50%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-longer-delay': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'70%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'draw-line': {
					'0%': {
						height: '0%'
					},
					'100%': {
						height: '100%'
					}
				},
				'blob-morph-1': {
					'0%, 100%': {
						borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%'
					},
					'25%': {
						borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%'
					},
					'50%': {
						borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%'
					},
					'75%': {
						borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%'
					}
				},
				'blob-morph-2': {
					'0%, 100%': {
						borderRadius: '40% 60% 70% 30%/40% 40% 60% 60%'
					},
					'25%': {
						borderRadius: '40% 60% 70% 30%/60% 30% 70% 40%'
					},
					'50%': {
						borderRadius: '40% 60% 70% 30%/60% 30% 70% 40%'
					},
					'75%': {
						borderRadius: '40% 60% 70% 30%/40% 40% 60% 60%'
					}
				},
				'blob-move-1': {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)'
					},
					'25%': {
						transform: 'translate(5%, 10%) scale(1.05)'
					},
					'50%': {
						transform: 'translate(10%, 5%) scale(1.1)'
					},
					'75%': {
						transform: 'translate(5%, 0%) scale(1.05)'
					}
				},
				'blob-move-2': {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)'
					},
					'25%': {
						transform: 'translate(-10%, 5%) scale(1.05)'
					},
					'50%': {
						transform: 'translate(-5%, 10%) scale(1.1)'
					},
					'75%': {
						transform: 'translate(-2%, 5%) scale(1.05)'
					}
				},
				'progress-fill': {
					'0%': {
						width: '0%'
					},
					'100%': {
						width: 'var(--progress-width)'
					}
				},
				'character-reveal': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'gradient-flow': {
					'0%, 100%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'blob-morph-slow': {
					'0%, 100%': {
						borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%'
					},
					'25%': {
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' 
					},
					'50%': {
						borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%'
					},
					'75%': {
						borderRadius: '60% 40% 40% 50% / 30% 50% 60% 70%'
					}
				},
				'blob-move-slow': {
					'0%, 100%': {
						transform: 'translate(0%, 0%) scale(1)'
					},
					'33%': {
						transform: 'translate(2%, -4%) scale(1.02)'
					},
					'66%': {
						transform: 'translate(-2%, 2%) scale(0.98)'
					}
				},
				'character-reveal-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'character-reveal-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'text-shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				'subtle-bounce': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out forwards',
				'fade-in-delay': 'fade-in-delay 1.2s ease-out forwards',
				'fade-in-longer-delay': 'fade-in-longer-delay 1.5s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'draw-line': 'draw-line 1s ease-out forwards',
				'blob-morph-1': 'blob-morph-1 25s ease-in-out infinite',
				'blob-morph-2': 'blob-morph-2 30s ease-in-out infinite',
				'blob-move-1': 'blob-move-1 25s ease-in-out infinite',
				'blob-move-2': 'blob-move-2 30s ease-in-out infinite',
				'progress-fill': 'progress-fill 1.5s ease-out forwards',
				'character-reveal': 'character-reveal 0.5s ease-out forwards',
				'gradient-flow': 'gradient-flow 8s ease infinite',
				'float': 'float 6s ease-in-out infinite',
				'blob-morph-slow': 'blob-morph-slow 25s ease-in-out infinite',
				'blob-move-slow': 'blob-move-slow 30s ease-in-out infinite',
				'character-reveal-up': 'character-reveal-up 0.7s ease-out forwards',
				'character-reveal-down': 'character-reveal-down 0.7s ease-out forwards',
				'text-shimmer': 'text-shimmer 6s infinite linear',
				'subtle-bounce': 'subtle-bounce 4s ease-in-out infinite',
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'playfair': ['"Playfair Display"', 'serif'],
				'raleway': ['Raleway', 'sans-serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
