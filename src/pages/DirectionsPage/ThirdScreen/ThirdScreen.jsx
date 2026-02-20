import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Application, extend, useApplication, useTick } from '@pixi/react'
import { Circle, Container, Graphics } from 'pixi.js'
import './ThirdScreen.css'

extend({ Container, Graphics })

const DIRECTIONS = [
	{
		id: 'ai',
		label: 'AI Systems',
		orbitX: 0.368,
		orbitY: 0.23,
		rotation: 0.15,
		speed: 0.08,
		phase: 0,
		orbitColor: 0xff6b6b
	},
	{
		id: 'web',
		label: 'Web Engineering',
		orbitX: 0.575,
		orbitY: 0.345,
		rotation: -0.32,
		speed: -0.09,
		phase: 1.2,
		orbitColor: 0xfeca57
	},
	{
		id: 'data',
		label: 'Data Analytics',
		orbitX: 0.943,
		orbitY: 0.529,
		rotation: -0.18,
		speed: -0.07,
		phase: 3.1,
		orbitColor: 0x1dd1a1
	},
	{
		id: 'design',
		label: 'Product Design',
		orbitX: 1.15,
		orbitY: 0.644,
		rotation: 0.3,
		speed: 0.09,
		phase: 4,
		orbitColor: 0x5f27cd
	},
	{
		id: 'security',
		label: 'Cybersecurity',
		orbitX: 1.334,
		orbitY: 0.748,
		rotation: -0.46,
		speed: -0.06,
		phase: 4.9,
		orbitColor: 0xff9ff3
	},
	{
		id: 'cloud',
		label: 'Cloud DevOps',
		orbitX: 1.518,
		orbitY: 0.851,
		rotation: 0.08,
		speed: 0.05,
		phase: 5.7,
		orbitColor: 0x54a0ff
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
	alpha = 0.65
) {
	const segments = 96
	const start = pointOnOrbit(centerX, centerY, rx, ry, rotation, 0)
	graphics.moveTo(start.x, start.y)

	for (let i = 1; i <= segments; i += 1) {
		const t = (i / segments) * Math.PI * 2
		const point = pointOnOrbit(centerX, centerY, rx, ry, rotation, t)
		graphics.lineTo(point.x, point.y)
	}

	graphics.stroke({ color, width: 1.5, alpha })
}

function getDynamicRadius(screenWidth, screenHeight) {
	const halfWidth = Math.max(0, screenWidth * 0.5 - SAFE_EDGE_MARGIN)
	const halfHeight = Math.max(0, screenHeight * 0.5 - SAFE_EDGE_MARGIN)
	const fitByWidth = halfWidth / ORBIT_BOUNDS.maxX
	const fitByHeight = halfHeight / ORBIT_BOUNDS.maxY
	const baseRadius = Math.min(fitByWidth, fitByHeight)

	return Math.max(0, baseRadius / DRAW_SCALE)
}

function OrbitField({ width, height, activeId, onHover, onSelect }) {
	const { app } = useApplication()
	const nodesRef = useRef([])
	const anglesRef = useRef(DIRECTIONS.map(item => item.phase))

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

	const drawStars = useCallback(
		graphics => {
			graphics.clear()
			for (const star of stars) {
				graphics.circle(star.x, star.y, star.r).fill({ color: 0xffffff, alpha: star.a })
			}
		},
		[stars]
	)

	const drawOrbits = useCallback(
		graphics => {
			const screenWidth = app?.screen?.width ?? width
			const screenHeight = app?.screen?.height ?? height
			const centerX = screenWidth * 0.5
			const centerY = screenHeight * 0.5
			const dynamicRadius = getDynamicRadius(screenWidth, screenHeight) * DRAW_SCALE

			graphics.clear()

			for (const item of DIRECTIONS) {
				drawEllipsePath(
					graphics,
					centerX,
					centerY,
					dynamicRadius * item.orbitX,
					dynamicRadius * item.orbitY,
					item.rotation,
					item.orbitColor,
					0.52
				)
			}

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

	const drawCore = useCallback(
		graphics => {
			const screenWidth = app?.screen?.width ?? width
			const screenHeight = app?.screen?.height ?? height
			const centerX = screenWidth * 0.5
			const centerY = screenHeight * 0.5

			graphics.clear()
			graphics.circle(centerX, centerY, 84).fill({ color: 0xffffff, alpha: 0.2 })
			graphics.circle(centerX, centerY, 46).fill({ color: 0xffffff, alpha: 0.36 })
			graphics.circle(centerX, centerY, 16).fill({ color: 0xffffff, alpha: 0.95 })
		},
		[app, height, width]
	)

	useTick(ticker => {
		const elapsed = ticker.deltaMS / 1000
		const screenWidth = app?.screen?.width ?? width
		const screenHeight = app?.screen?.height ?? height
		const centerX = screenWidth * 0.5
		const centerY = screenHeight * 0.5
		const dynamicRadius = getDynamicRadius(screenWidth, screenHeight) * DRAW_SCALE

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

			if (node) {
				node.x = point.x
				node.y = point.y
			}
		})
	})

	return (
		<>
			<pixiGraphics draw={drawStars} />
			<pixiGraphics draw={drawOrbits} />
			<pixiGraphics draw={drawCore} />
			{DIRECTIONS.map((item, index) => {
				const isActive = activeId === item.id
				const glowRadius = isActive ? 50 : 41
				const nodeRadius = isActive ? 24 : 19
				const strokeWidth = isActive ? 2.2 : 1.5

				return (
					<pixiContainer
						key={item.id}
						ref={node => {
							nodesRef.current[index] = node
						}}
						eventMode="static"
						cursor="pointer"
						hitArea={new Circle(0, 0, nodeRadius + 10)}
						pointerover={() => onHover(item.id)}
						pointerout={() => onHover(null)}
						pointertap={() => onSelect(item.id)}
					>
						<pixiGraphics
							draw={graphics => {
								graphics.clear()
								graphics
									.circle(0, 0, glowRadius)
									.fill({ color: 0xffffff, alpha: isActive ? 0.34 : 0.24 })
								graphics.circle(0, 0, nodeRadius).fill({ color: 0xa8c8ff, alpha: 0.74 })
								graphics.circle(0, 0, nodeRadius * 0.7).fill({ color: 0xcfe2ff, alpha: 0.48 })
								graphics
									.circle(0, 0, nodeRadius + 5)
									.stroke({ color: 0xffffff, width: strokeWidth, alpha: 0.76 })
							}}
						/>
					</pixiContainer>
				)
			})}
		</>
	)
}

function ThirdScreen() {
	const sceneHostRef = useRef(null)
	const [sceneSize, setSceneSize] = useState({ width: 1500, height: 1000 })
	const [selectedId, setSelectedId] = useState(DIRECTIONS[0].id)
	const [hoveredId, setHoveredId] = useState(null)

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

	const activeId = hoveredId ?? selectedId
	const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1

	return (
		<section className="directions-page-third-screen">
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
						onHover={setHoveredId}
						onSelect={setSelectedId}
					/>
				</Application>
			</div>
		</section>
	)
}

export { ThirdScreen }
