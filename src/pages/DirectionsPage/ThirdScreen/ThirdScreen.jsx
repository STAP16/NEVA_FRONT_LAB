import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Application, extend, useApplication, useTick } from '@pixi/react'
import { Circle, Container, Graphics } from 'pixi.js'
import { motion, AnimatePresence } from 'framer-motion'
import nevikAI from '../../../assets/NEVIK_AI.png'
import nevikWeb from '../../../assets/NEVIK_WEB.png'
import nevikData from '../../../assets/NEVIK_DATA_SCINCE.png'
import nevikDesign from '../../../assets/NEVIK_DESIGN.png'
import nevikSecurity from '../../../assets/NEVIK_BACKEND.png'
import nevikCloud from '../../../assets/NEVIK_DEVOPS.png'
import './ThirdScreen.css'

extend({ Container, Graphics })

const DIRECTIONS = [
	{
		id: 'ai',
		label: 'AI Systems',
		title: 'AI-системы',
		description: 'Освоение искусственного интеллекта как основовного инструмента 2026 года',
		bullets: [
			'Работа с современными моделями и API',
			'Оркестрирование AI-агентов и построение workflow',
			'Разработка решений и сервисов'
		],
		ctaLabel: 'Подробнее',
		colorPrimary: '#8A78EE',
		colorPrimaryHex: 0x8a78ee,
		colorSoft: 'rgba(201, 189, 252, 0.28)',
		colorGlow: 'rgba(138, 120, 238, 0.24)',
		colorGlowHex: 0x8a78ee,
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
		description: 'Полный цикл создания современных веб-приложений — от фронтенда до бэкенда.',
		bullets: [
			'React, Vue и современные фреймворки',
			'Node.js и серверная архитектура',
			'REST API и базы данных'
		],
		ctaLabel: 'Подробнее',
		colorPrimary: '#5F9FE8',
		colorPrimaryHex: 0x5f9fe8,
		colorSoft: 'rgba(181, 215, 250, 0.28)',
		colorGlow: 'rgba(95, 159, 232, 0.24)',
		colorGlowHex: 0x5f9fe8,
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
		description: 'Превращаем данные в решения: анализ, визуализация и предиктивные модели.',
		bullets: [
			'Python, Pandas и SQL для анализа',
			'Визуализация и дашборды',
			'Статистика и предиктивная аналитика'
		],
		ctaLabel: 'Подробнее',
		colorPrimary: '#39C2E6',
		colorPrimaryHex: 0x39c2e6,
		colorSoft: 'rgba(170, 237, 250, 0.28)',
		colorGlow: 'rgba(57, 194, 230, 0.24)',
		colorGlowHex: 0x39c2e6,
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
			'Прототипирование в Figma',
			'Поиск идей с AI'
		],
		ctaLabel: 'Подробнее',
		colorPrimary: '#9A8CF2',
		colorPrimaryHex: 0x9a8cf2,
		colorSoft: 'rgba(214, 205, 252, 0.3)',
		colorGlow: 'rgba(154, 140, 242, 0.23)',
		colorGlowHex: 0x9a8cf2,
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
		label: 'Бекенд инженерия',
		title: 'Бекенд инженерия',
		description: 'Серверная разработка и инженерный подход надёжной backend-инфраструктуры.',
		bullets: [
			'Python и проектирование серверной логики',
			'REST API, базы данных и интеграции',
			'Архитектура и надёжность сервисов'
		],
		ctaLabel: 'Подробнее',
		colorPrimary: '#40CBC7',
		colorPrimaryHex: 0x40cbc7,
		colorSoft: 'rgba(201, 236, 235, 0.28)',
		colorGlow: 'rgba(64, 203, 199, 0.24)',
		colorGlowHex: 0x40cbc7,
		nodeBaseHex: 0x9fd8d6,
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
		description: 'Облачные технологии и автоматизация: CI/CD, контейнеры и инфраструктура.',
		bullets: [
			'Docker, Kubernetes и оркестрация',
			'CI/CD пайплайны и автоматизация',
			'Настройка серверов и облачная архитектура'
		],
		ctaLabel: 'Подробнее',
		colorPrimary: '#3E8FD8',
		colorPrimaryHex: 0x3e8fd8,
		colorSoft: 'rgba(170, 211, 246, 0.28)',
		colorGlow: 'rgba(62, 143, 216, 0.24)',
		colorGlowHex: 0x3e8fd8,
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

function OrbitField({ width, height, activeId, hoveredId, onHover, onSelect }) {
	const { app } = useApplication()
	const nodesRef = useRef([])
	const coreRef = useRef(null)
	const orbitsRef = useRef(null)
	const nodeGraphicsRefs = useRef([])
	const anglesRef = useRef(DIRECTIONS.map(item => item.phase))

	// Smooth transition state per node & orbit
	const nodeAnimRef = useRef(DIRECTIONS.map(() => ({ t: 0, h: 0, alpha: 1 })))
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
					0xe7f1ff,
					0.5,
					1.35
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

			const isActive = activeId === item.id
			const isHovered = hoveredId === item.id

			// Active transition
			const targetT = isActive ? 1 : 0
			anim.t += (targetT - anim.t) * lerpFactor

			// Hover transition for non-active nodes
			const targetH = isHovered && !isActive ? 1 : 0
			anim.h += (targetH - anim.h) * lerpFactor

			// Keep active node dominant, but allow hovered inactive node to lift a bit
			const hasActive = activeId != null
			const targetAlpha = hasActive ? (isActive ? 1 : isHovered ? 0.94 : 0.72) : isHovered ? 1 : 1
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
				const pActive = anim.t
				const pHover = anim.h
				const p = pActive + (1 - pActive) * pHover * 0.78

				const glowR = (36 + 4 * p) * scale + sizeOff
				const nodeR = (19 + 2 * p) * scale + sizeOff

				// Interpolate colors/alphas between inactive and active
				const glowExtraR = 4 * p
				const glowColorAlpha = 0.14 * pActive + 0.14 * pHover
				const whiteGlowAlpha = 0.2 + 0.08 * p

				const fillAlpha = 0.62 + 0.11 * p
				const innerR = nodeR * 0.7
				const innerBaseAlpha = item.nodeInnerBaseAlpha ?? 0.36
				const innerAlpha = innerBaseAlpha + (0.42 - innerBaseAlpha) * p

				const ringOuterR = nodeR + 4 + 0.4 * p
				const ringOuterW = 1.4 + 0.15 * p
				const ringOuterAlpha = 0.58 + 0.05 * p

				ng.clear()

				// Color glow (fades in for active)
				if (p > 0.01) {
					ng.circle(0, 0, glowR + glowExtraR).fill({
						color: item.colorGlowHex,
						alpha: glowColorAlpha
					})
				}

				// White glow
				ng.circle(0, 0, glowR).fill({ color: 0xffffff, alpha: whiteGlowAlpha })

				// Node fill — smooth blend from neutral blue to direction color
				const baseFillColor = item.nodeBaseHex ?? 0xa8c8ff
				const fillColor = lerpColor(baseFillColor, item.colorPrimaryHex, p * 0.82)
				ng.circle(0, 0, nodeR).fill({ color: fillColor, alpha: fillAlpha })

				// Inner highlight
				const innerColor = item.nodeInnerHex ?? 0xcfe2ff
				ng.circle(0, 0, innerR).fill({ color: innerColor, alpha: innerAlpha })

				// Outer ring (white)
				ng.circle(0, 0, ringOuterR).stroke({
					color: 0xffffff,
					width: ringOuterW,
					alpha: ringOuterAlpha
				})

				// Inner color ring (fades in for active)
				if (p > 0.1) {
					ng.circle(0, 0, nodeR + 3 * p).stroke({
						color: item.colorPrimaryHex,
						width: 0.95 * p,
						alpha: 0.2 * pActive + 0.18 * pHover
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
			style={{
				'--dir-color': direction.colorPrimary,
				'--dir-soft': direction.colorSoft,
				'--dir-glow': direction.colorGlow
			}}
		>
			<motion.div
				className="direction-panel__content direction-panel__content--with-mascot"
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
								style={{ color: direction.colorPrimary }}
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
						background: `linear-gradient(135deg, ${direction.colorPrimary}, ${direction.colorPrimary})`
					}}
				>
					{direction.ctaLabel}
				</button>
				<div className="direction-panel__mascot-wrap direction-panel__mascot-wrap--card">
					<img
						className="direction-panel__mascot direction-panel__mascot--card"
						src={direction.mascotVariant}
						alt={direction.title}
					/>
				</div>
			</motion.div>
		</motion.div>
	)
}

function lerpColor(from, to, t) {
	const clamped = Math.max(0, Math.min(1, t))
	const r1 = (from >> 16) & 0xff
	const g1 = (from >> 8) & 0xff
	const b1 = from & 0xff
	const r2 = (to >> 16) & 0xff
	const g2 = (to >> 8) & 0xff
	const b2 = to & 0xff
	const r = Math.round(r1 + (r2 - r1) * clamped)
	const g = Math.round(g1 + (g2 - g1) * clamped)
	const b = Math.round(b1 + (b2 - b1) * clamped)

	return (r << 16) | (g << 8) | b
}

function ChoiceDirection() {
	const sceneHostRef = useRef(null)
	const [sceneSize, setSceneSize] = useState({ width: 1500, height: 1000 })
	const [activeId, setActiveId] = useState(null)
	const [hoveredId, setHoveredId] = useState(null)
	const [panelOpen, setPanelOpen] = useState(false)
	const [hasSphereInteraction, setHasSphereInteraction] = useState(false)

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
			setHasSphereInteraction(true)
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
		setActiveId(null)
		setHoveredId(null)
	}, [])

	const handleBackgroundClick = useCallback(
		e => {
			if (panelOpen && e.target === e.currentTarget) {
				handleClosePanel()
			}
		},
		[panelOpen, handleClosePanel]
	)

	const activeDirection = activeId ? DIRECTIONS.find(d => d.id === activeId) : null
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
						activeId={activeId}
						hoveredId={hoveredId}
						onHover={setHoveredId}
						onSelect={handleSelect}
					/>
				</Application>

				<AnimatePresence>
					{!hasSphereInteraction && (
						<motion.div
							className="directions-page-third-screen__headline"
							initial={{ opacity: 0, y: -14 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.35, ease: 'easeOut' }}
						>
							<p className="directions-page-third-screen__subtitle">
								Нажмите на сферу, чтобы изучить направление
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	)
}

export { ChoiceDirection }
