/** @type {import('tailwindcss').Config} */
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
				// Using CSS custom properties for theme switching
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
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
				medical: {
					stable: 'hsl(var(--medical-stable))',
					'stable-foreground': 'hsl(var(--medical-stable-foreground))',
					caution: 'hsl(var(--medical-caution))',
					'caution-foreground': 'hsl(var(--medical-caution-foreground))',
					critical: 'hsl(var(--medical-critical))',
					'critical-foreground': 'hsl(var(--medical-critical-foreground))'
				},
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addBase }) {
			addBase({
				':root': {
					// Light theme colors
					'--background': '0 0% 100%',
					'--foreground': '225 40% 15%',
					'--card': '0 0% 100%',
					'--card-foreground': '225 40% 15%',
					'--popover': '215 28% 97%',
					'--popover-foreground': '215 16% 12%',
					'--primary': '230 85% 55%',
					'--primary-foreground': '0 0% 100%',
					'--primary-glow': '235 90% 65%',
					'--secondary': '215 25% 95%',
					'--secondary-foreground': '215 16% 12%',
					'--muted': '215 25% 93%',
					'--muted-foreground': '215 12% 45%',
					'--accent': '215 85% 96%',
					'--accent-foreground': '215 85% 20%',
					'--destructive': '0 84% 60%',
					'--destructive-foreground': '0 0% 100%',
					'--border': '215 25% 88%',
					'--input': '215 25% 88%',
					'--ring': '230 85% 55%',
					'--radius': '1rem',
					
					// Medical colors
					'--medical-stable': '152 69% 48%',
					'--medical-stable-foreground': '0 0% 100%',
					'--medical-caution': '45 93% 58%',
					'--medical-caution-foreground': '0 0% 100%',
					'--medical-critical': '0 84% 60%',
					'--medical-critical-foreground': '0 0% 100%',
					
					// Glass system
					'--glass-bg': '0 0% 100% / 0.8',
					'--glass-border': '235 30% 85% / 0.4',
					
					// Sidebar
					'--sidebar-background': '0 0% 98%',
					'--sidebar-foreground': '240 5.3% 26.1%',
					'--sidebar-primary': '240 5.9% 10%',
					'--sidebar-primary-foreground': '0 0% 98%',
					'--sidebar-accent': '240 4.8% 95.9%',
					'--sidebar-accent-foreground': '240 5.9% 10%',
					'--sidebar-border': '220 13% 91%',
					'--sidebar-ring': '230 85% 55%',
					
					// Effects and animations
					'--backdrop-blur': 'blur(12px)',
					'--glass-shadow': '0 8px 32px hsl(215 25% 20% / 0.1)',
					'--glass-shadow-hover': '0 12px 40px hsl(215 25% 20% / 0.15)',
					'--glass-shadow-critical': '0 8px 32px hsl(0 84% 60% / 0.2)',
					'--transition-glass': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
					'--transition-smooth': 'all 0.2s ease-out',
				},
				'.dark': {
					// Dark theme color overrides
					'--background': '225 50% 8%',
					'--foreground': '225 20% 95%',
					'--card': '225 40% 12%',
					'--card-foreground': '225 20% 95%',
					'--popover': '225 40% 12%',
					'--popover-foreground': '225 20% 95%',
					'--secondary': '225 30% 18%',
					'--secondary-foreground': '225 20% 95%',
					'--muted': '225 30% 18%',
					'--muted-foreground': '225 15% 65%',
					'--accent': '230 70% 25%',
					'--accent-foreground': '230 70% 90%',
					'--border': '225 30% 18%',
					'--input': '225 30% 18%',
					'--glass-bg': '225 40% 15% / 0.8',
					'--glass-border': '235 30% 25% / 0.4',
					
					// Dark sidebar
					'--sidebar-background': '225 50% 8%',
					'--sidebar-foreground': '225 20% 95%',
					'--sidebar-primary': '230 85% 55%',
					'--sidebar-primary-foreground': '0 0% 100%',
					'--sidebar-accent': '225 30% 18%',
					'--sidebar-accent-foreground': '225 20% 95%',
					'--sidebar-border': '225 30% 18%',
				}
			})
		}
	],
};