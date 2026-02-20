import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Application, extend, useApplication, useTick } from '@pixi/react'
import { Circle, Container, Graphics } from 'pixi.js'
import { motion, AnimatePresence } from 'framer-motion'
import nevikAI from '../../../assets/NEVIK_TOUCH.png'
import nevikWeb from '../../../assets/NEVIK_FOR_SCND_SCREEN.png'
import nevikData from '../../../assets/NEVIK_WHAT_YOU_GET.png'
import nevikDesign from '../../../assets/NEVIK_WITH_CASE.png'
import nevikSecurity from '../../../assets/NEVIK_FOR_ABOUT_FIRST_SCREEN.png'
import nevikCloud from '../../../assets/nevik_cap.png'
import './ThirdScreen.css'

extend({ Container, Graphics })

const DIRECTIONS = [
	{
		id: 'ai',
		label: 'AI Systems',
		title: 'AI-системы',
		description:
			'Погружение в мир искусственного интеллекта: от нейросетей до генеративных моделей.',
		bullets: [
			'Машинное обучение и нейронные сети',
			'Обработка естественного языка (NLP)',
			'Компьютерное зрение и генеративный AI'
		],
		ctaLabel: 'Подробнее',
		color: '#5b8def',
		colorHex: 0x5b8def,
		mascotVariant: nevikAI,
		orbitX: 0.368,
		orbitY: 0.23,
		rotation: 0.15,
		speed: 0.08,
		phase: 0,
		orbitColor: 0xf4f8ff,
		nodeScale: 0.78
	},
	{
		id: 'web',
		label: 'Web Engineering',
		title: 'Веб-разработка',
		description:
			'Полный цикл создания современных веб-приложений — от фронтенда до бэкенда.',
		bullets: [
			'React, Vue и современные фреймворки',
			'Node.js и серверная архитектура',
			'REST API и базы данных'
		],
		ctaLabel: 'Подробнее',
		color: '#4a7fd4',
		colorHex: 0x4a7fd4,
		mascotVariant: nevikWeb,
		orbitX: 0.575,
		orbitY: 0.345,
		rotation: -0.32,
		speed: -0.09,
		phase: 1.2,
		orbitColor: 0xe8f1ff,
		nodeScale: 1
	},
	{
		id: 'data',
		label: 'Data Analytics',
		title: 'Аналитика данных',
		description:
			'Превращаем данные в решения: анализ, визуализация и предиктивные модели.',
		bullets: [
			'Python, Pandas и SQL для анализа',
			'Визуализация и дашборды',
			'Статистика и предиктивная аналитика'
		],
		ctaLabel: 'Подробнее',
		color: '#6b9ae8',
		colorHex: 0x6b9ae8,
		mascotVariant: nevikData,
		orbitX: 0.943,
		orbitY: 0.529,
		rotation: -0.18,
		speed: -0.07,
		phase: 3.1,
		orbitColor: 0xdce8fb,
		nodeScale: 1,
		nodeSizeOffset: 5
	},
	{
		id: 'design',
		label: 'Product Design',
		title: 'Продуктовый дизайн',
		description:
			'Проектирование интерфейсов, которые любят пользователи — UX/UI от идеи до прототипа.',
		bullets: [
			'UX-исследования и проектирование',
			'UI-дизайн и дизайн-системы',
			'Прототипирование в Figma'
		],
		ctaLabel: 'Подробнее',
		color: '#7da4e0',
		colorHex: 0x7da4e0,
		mascotVariant: nevikDesign,
		orbitX: 1.15,
		orbitY: 0.644,
		rotation: 0.3,
		speed: 0.09,
		phase: 4,
		orbitColor: 0xcfddf6,
		nodeScale: 1
	},
	{
		id: 'security',
		label: 'Cybersecurity',
		title: 'Кибербезопасность',
		description:
			'Защита цифровых систем: от анализа уязвимостей до построения защищённых архитектур.',
		bullets: [
			'Сетевая безопасность и пентест',
			'Криптография и защита данных',
			'Аудит и мониторинг инфраструктуры'
		],
		ctaLabel: 'Подробнее',
		color: '#5a82c9',
		colorHex: 0x5a82c9,
		mascotVariant: nevikSecurity,
		orbitX: 1.334,
		orbitY: 0.748,
		rotation: -0.46,
		speed: -0.06,
		phase: 4.9,
		orbitColor: 0xcfddf6,
		nodeScale: 1
	},
	{
		id: 'cloud',
		label: 'Cloud DevOps',
		title: 'Cloud и DevOps',
		description:
			'Облачные технологии и автоматизация: CI/CD, контейнеры и инфраструктура как код.',
		bullets: [
			'Docker, Kubernetes и оркестрация',
			'CI/CD пайплайны и автоматизация',
			'AWS / GCP и облачная архитектура'
		],
		ctaLabel: 'Подробнее',
		color: '#4f74b8',
		colorHex: 0x4f74b8,
		mascotVariant: nevikCloud,
		orbitX: 1.518,
		orbitY: 0.851,
		rotation: 0.08,
		speed: 0.08,
		phase: 5.7,
		orbitColor: 0xc8d8f3,
		nodeScale: 1
	}
]

const STAR_COUNT = 120
const ORBIT_PADDING = 48
const DRAW_SCALE = 1.2
const OUTER_NODE_GLOW_RADIUS = 50
const SAFE_EDGE_MARGIN = ORBIT_PADDING + OUTER_NODE_GLOW_RADIUS + 8
const ORBIT_BOUNDS = DIRECTIONS.reduce(
	(bounds, item) => {
		const cos = Math.cos(item.rotation)
		const sin = Math.sin(item.rotation)
		const extentX = Math.sqrt((item.orbitX * cos) ** 2 + (item.orbitY * sin) ** 2)
		const extentY = Math.sqrt((item.orbitX * sin) ** 2 + (item.orbitY * cos) ** 2)

		return {
			maxX: Math.max(bounds.maxX, extentX),
			maxY: Math.max(bounds.maxY, extentY)
		}
	},
	{ maxX: 1, maxY: 1 }
)

function pointOnOrbit(centerX, centerY, rx, ry, rotation, angle) {
	const x = Math.cos(angle) * rx
	const y = Math.sin(angle) * ry
	const cos = Math.cos(rotation)
	const sin = Math.sin(rotation)

	return {
		x: centerX + x * cos - y * sin,
		y: centerY + x * sin + y * cos
	}
}

function drawEllipsePath(
	graphics,
	centerX,
	centerY,
	rx,
	ry,
	rotation,
	color = 0xffffff,
	alpha = 0.65,
	lineWidth = 1.5
) {
	const segments = 96
	const start = pointOnOrbit(centerX, centerY, rx, ry, rotation, 0)
	graphics.moveTo(start.x, start.y)

	for (let i = 1; i <= segments; i += 1) {
		const t = (i / segments) * Math.PI * 2
		const point = pointOnOrbit(centerX, centerY, rx, ry, rotation, t)
		graphics.lineTo(point.x, point.y)
	}

	graphics.stroke({ color, width: lineWidth, alpha })
}

function getDynamicRadius(screenWidth, screenHeight) {
	const halfWidth = Math.max(0, screenWidth * 0.5 - SAFE_EDGE_MARGIN)
	const halfHeight = Math.max(0, screenHeight * 0.5 - SAFE_EDGE_MARGIN)
	const fitByWidth = halfWidth / ORBIT_BOUNDS.maxX
	const fitByHeight = halfHeight / ORBIT_BOUNDS.maxY
	const baseRadius = Math.min(fitByWidth, fitByHeight)

	return Math.max(0, baseRadius / DRAW_SCALE)
}

function OrbitField({
	width,
	height,
	activeId,
	hoveredId,
	onHover,
	onSelect
}) {
	const { app } = useApplication()
	const nodesRef = useRef([])
	const coreRef = useRef(null)
	const orbitsRef = useRef(null)
	const nodeGraphicsRefs = useRef([])
	const anglesRef = useRef(DIRECTIONS.map(item => item.phase))
	const displayId = hoveredId ?? activeId

	// Smooth transition state per node & orbit
	const nodeAnimRef = useRef(
		DIRECTIONS.map(() => ({ t: 0, alpha: 1 }))
	)
	const stars = useMemo(
		() =>
			Array.from({ length: STAR_COUNT }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				r: 0.6 + Math.random() * 1.8,
				a: 0.2 + Math.random() * 0.55
			})),
		[width, height]
	)

	const rays = useMemo(
		() =>
			Array.from({ length: 8 }, (_, index) => ({
				angle: (Math.PI / 4) * index,
				alpha: index % 2 === 0 ? 0.32 : 0.2
			})),
		[]
	)

	const drawStaticGrid = useCallback(
		graphics => {
			const screenWidth = app?.screen?.width ?? width
			const screenHeight = app?.screen?.height ?? height
			const centerX = screenWidth * 0.5
			const centerY = screenHeight * 0.5
			const dynamicRadius = getDynamicRadius(screenWidth, screenHeight) * DRAW_SCALE

			graphics.clear()

			graphics.moveTo(centerX, centerY - dynamicRadius * 0.95)
			graphics.lineTo(centerX, centerY + dynamicRadius * 0.95)
			graphics.stroke({ color: 0xffffff, width: 1.2, alpha: 0.26 })

			graphics.moveTo(centerX - dynamicRadius * 0.95, centerY)
			graphics.lineTo(centerX + dynamicRadius * 0.95, centerY)
			graphics.stroke({ color: 0xffffff, width: 1.2, alpha: 0.22 })

			for (const ray of rays) {
				graphics.moveTo(centerX, centerY)
				graphics.lineTo(
					centerX + Math.cos(ray.angle) * dynamicRadius * 0.76,
					centerY + Math.sin(ray.angle) * dynamicRadius * 0.76
				)
				graphics.stroke({ color: 0xffffff, width: 0.9, alpha: ray.alpha })
			}
		},
		[app, height, rays, width]
	)

	const drawStars = useCallback(
		graphics => {
			graphics.clear()
			for (const star of stars) {
				graphics.circle(star.x, star.y, star.r).fill({ color: 0xffffff, alpha: star.a })
			}
		},
		[stars]
	)

	const drawCore = useCallback(
		graphics => {
			const screenWidth = app?.screen?.width ?? width
			const screenHeight = app?.screen?.height ?? height
			const centerX = screenWidth * 0.5
			const centerY = screenHeight * 0.5

			graphics.clear()
			graphics.circle(centerX, centerY, 84).fill({ color: 0xffffff, alpha: 0.18 })
			graphics.circle(centerX, centerY, 46).fill({ color: 0xffffff, alpha: 0.34 })
			graphics.circle(centerX, centerY, 16).fill({ color: 0xffffff, alpha: 0.95 })
		},
		[app, height, width]
	)

	useTick(ticker => {
		const elapsed = ticker.deltaMS / 1000
		const t = ticker.lastTime / 1000
		const screenWidth = app?.screen?.width ?? width
		const screenHeight = app?.screen?.height ?? height
		const centerX = screenWidth * 0.5
		const centerY = screenHeight * 0.5
		const dynamicRadius = getDynamicRadius(screenWidth, screenHeight) * DRAW_SCALE
		const pulse = (Math.sin(t * 2.2) + 1) * 0.15

		// Lerp speed — higher = faster transition (6 ≈ ~170ms to 90%)
		const lerpSpeed = 6
		const lerpFactor = 1 - Math.exp(-lerpSpeed * elapsed)

		if (coreRef.current) {
			const g = coreRef.current
			g.clear()
			g.circle(centerX, centerY, 82 + pulse * 16).fill({
				color: 0xffffff,
				alpha: 0.14 + pulse * 0.08
			})
			g.circle(centerX, centerY, 44 + pulse * 10).fill({
				color: 0xffffff,
				alpha: 0.28 + pulse * 0.08
			})
			g.circle(centerX, centerY, 16).fill({ color: 0xffffff, alpha: 0.95 })
		}

		// Animated orbit lines
		if (orbitsRef.current) {
			const og = orbitsRef.current
			og.clear()

			DIRECTIONS.forEach(item => {
				drawEllipsePath(
					og,
					centerX,
					centerY,
					dynamicRadius * item.orbitX,
					dynamicRadius * item.orbitY,
					item.rotation,
					item.orbitColor,
					0.52,
					1.5
				)
			})
		}

		DIRECTIONS.forEach((item, index) => {
			anglesRef.current[index] += item.speed * elapsed
			const point = pointOnOrbit(
				centerX,
				centerY,
				dynamicRadius * item.orbitX,
				dynamicRadius * item.orbitY,
				item.rotation,
				anglesRef.current[index]
			)
			const node = nodesRef.current[index]
			const anim = nodeAnimRef.current[index]

			// Smooth activation: t lerps 0→1 (active) or 1→0 (inactive)
			const isActive = displayId === item.id
			const targetT = isActive ? 1 : 0
			anim.t += (targetT - anim.t) * lerpFactor

			// Smooth alpha for dimming inactive nodes
			const hasActive = displayId != null
			const targetAlpha = hasActive && !isActive ? 0.72 : 1
			anim.alpha += (targetAlpha - anim.alpha) * lerpFactor

			if (node) {
				node.x = point.x
				node.y = point.y
				node.alpha = anim.alpha
			}

			// Redraw node graphics with interpolated sizes
			const ng = nodeGraphicsRefs.current[index]
			if (ng) {
				const scale = item.nodeScale ?? 1
				const sizeOff = item.nodeSizeOffset ?? 0
				const p = anim.t // 0 = inactive, 1 = active

				const glowR = (41 + 11 * p) * scale + sizeOff
				const nodeR = (19 + 5 * p) * scale + sizeOff

				// Interpolate colors/alphas between inactive and active
				const glowExtraR = 8 * p
				const glowColorAlpha = 0.18 * p
				const whiteGlowAlpha = 0.2 + 0.1 * p

				const fillAlpha = 0.65
				const innerR = nodeR * (0.7 - 0.05 * p)
				const innerAlpha = 0.4 + 0.1 * p

				const ringOuterR = nodeR + 5 + 1 * p
				const ringOuterW = 1.5 + 0.3 * p
				const ringOuterAlpha = 0.6 + 0.1 * p

				ng.clear()

				// Color glow (fades in for active)
				if (p > 0.01) {
					ng.circle(0, 0, glowR + glowExtraR).fill({
						color: item.colorHex,
						alpha: glowColorAlpha
					})
				}

				// White glow
				ng.circle(0, 0, glowR).fill({ color: 0xffffff, alpha: whiteGlowAlpha })

				// Node fill — blend from neutral blue to direction color
				const fillColor = p > 0.5 ? item.colorHex : 0xa8c8ff
				ng.circle(0, 0, nodeR).fill({ color: fillColor, alpha: fillAlpha })

				// Inner highlight
				ng.circle(0, 0, innerR).fill({ color: 0xcfe2ff, alpha: innerAlpha })

				// Outer ring (white)
				ng.circle(0, 0, ringOuterR).stroke({
					color: 0xffffff,
					width: ringOuterW,
					alpha: ringOuterAlpha
				})

				// Inner color ring (fades in for active)
				if (p > 0.1) {
					ng.circle(0, 0, nodeR + 3 * p).stroke({
						color: item.colorHex,
						width: 1.2 * p,
						alpha: 0.5 * p
					})
				}
			}
		})

	})

	return (
		<>
			<pixiGraphics draw={drawStars} />
			<pixiGraphics draw={drawStaticGrid} />
			<pixiGraphics
				ref={orbitsRef}
				draw={g => g.clear()}
			/>
			<pixiGraphics
				ref={coreRef}
				draw={drawCore}
			/>
			{DIRECTIONS.map((item, index) => {
				const scale = item.nodeScale ?? 1
				const nodeSizeOffset = item.nodeSizeOffset ?? 0
				const hitRadius = 24 * scale + nodeSizeOffset + 10

				return (
					<pixiContainer
						key={item.id}
						ref={node => {
							nodesRef.current[index] = node
						}}
						eventMode="static"
						cursor="pointer"
						hitArea={new Circle(0, 0, hitRadius)}
						onPointerOver={() => onHover(item.id)}
						onPointerOut={() => onHover(null)}
						onPointerTap={() => onSelect(item.id)}
					>
						<pixiGraphics
							ref={g => {
								nodeGraphicsRefs.current[index] = g
							}}
							draw={g => g.clear()}
						/>
					</pixiContainer>
				)
			})}
		</>
	)
}

const panelVariants = {
	hidden: { x: -80, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.28, ease: [0.33, 1, 0.68, 1] }
	},
	exit: {
		x: -80,
		opacity: 0,
		transition: { duration: 0.2, ease: 'easeIn' }
	}
}

const contentVariants = {
	enter: { opacity: 0, y: 6 },
	center: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.16, ease: 'easeOut' }
	},
	exit: {
		opacity: 0,
		y: -4,
		transition: { duration: 0.12, ease: 'easeIn' }
	}
}

function DirectionPanel({ direction }) {
	if (!direction) return null

	return (
		<motion.div
			className="direction-panel"
			variants={panelVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			style={{ '--dir-color': direction.color }}
		>
			<motion.div
				className="direction-panel__content"
				variants={contentVariants}
				initial="enter"
				animate="center"
				exit="exit"
			>
				<h3 className="direction-panel__title">{direction.title}</h3>
				<p className="direction-panel__description">{direction.description}</p>
				<ul className="direction-panel__bullets">
					{direction.bullets.map((bullet, i) => (
						<li
							key={i}
							className="direction-panel__bullet"
						>
							<span
								className="direction-panel__bullet-icon"
								style={{ color: direction.color }}
							>
								✓
							</span>
							{bullet}
						</li>
					))}
				</ul>
				<button
					className="direction-panel__cta"
					style={{
						background: `linear-gradient(135deg, ${direction.color}, ${direction.color}dd)`
					}}
				>
					{direction.ctaLabel}
				</button>
				<div className="direction-panel__mascot-wrap">
					<img
						className="direction-panel__mascot"
						src={direction.mascotVariant}
						alt={direction.title}
					/>
				</div>
			</motion.div>
		</motion.div>
	)
}

function ThirdScreen() {
	const sceneHostRef = useRef(null)
	const [sceneSize, setSceneSize] = useState({ width: 1500, height: 1000 })
	const [activeId, setActiveId] = useState(null)
	const [hoveredId, setHoveredId] = useState(null)
	const [panelOpen, setPanelOpen] = useState(false)

	useEffect(() => {
		if (!sceneHostRef.current) {
			return undefined
		}

		const syncSceneSize = () => {
			if (!sceneHostRef.current) {
				return
			}

			const rect = sceneHostRef.current.getBoundingClientRect()
			const width = Math.max(320, Math.floor(rect.width))
			const height = Math.max(320, Math.floor(rect.height))
			setSceneSize(prev => {
				if (prev.width === width && prev.height === height) {
					return prev
				}
				return { width, height }
			})
		}

		const observer = new ResizeObserver(entries => {
			const entry = entries[0]
			if (!entry) {
				return
			}
			syncSceneSize()
		})

		observer.observe(sceneHostRef.current)
		window.addEventListener('resize', syncSceneSize)
		window.visualViewport?.addEventListener('resize', syncSceneSize)
		syncSceneSize()

		return () => {
			observer.disconnect()
			window.removeEventListener('resize', syncSceneSize)
			window.visualViewport?.removeEventListener('resize', syncSceneSize)
		}
	}, [])

	const handleSelect = useCallback(
		id => {
			if (id === activeId && panelOpen) {
				// Variant A: do nothing on re-click
				return
			}
			setActiveId(id)
			setPanelOpen(true)
		},
		[activeId, panelOpen]
	)

	const handleClosePanel = useCallback(() => {
		setPanelOpen(false)
		// Keep activeId for context preservation
	}, [])

	const handleBackgroundClick = useCallback(
		e => {
			if (
				panelOpen &&
				e.target === e.currentTarget
			) {
				handleClosePanel()
			}
		},
		[panelOpen, handleClosePanel]
	)

	const activeDirection = activeId ? DIRECTIONS.find(d => d.id === activeId) : null
	const displayId = hoveredId ?? activeId
	const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1

	return (
		<section
			className="directions-page-third-screen"
			onClick={handleBackgroundClick}
		>
			<AnimatePresence
				mode="wait"
				initial={false}
			>
				{panelOpen && activeDirection && (
					<DirectionPanel
						key={activeDirection.id}
						direction={activeDirection}
					/>
				)}
			</AnimatePresence>

			<div
				className="directions-page-third-screen__canvas-host"
				ref={sceneHostRef}
			>
				<Application
					width={sceneSize.width}
					height={sceneSize.height}
					backgroundAlpha={0}
					antialias
					autoDensity
					resolution={dpr}
				>
					<OrbitField
						width={sceneSize.width}
						height={sceneSize.height}
						activeId={displayId}
						hoveredId={hoveredId}
						onHover={setHoveredId}
						onSelect={handleSelect}
					/>
				</Application>
			</div>
		</section>
	)
}

export { ThirdScreen }
