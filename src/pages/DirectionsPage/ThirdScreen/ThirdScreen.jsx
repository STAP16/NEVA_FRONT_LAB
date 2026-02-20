import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Application, extend, useApplication, useTick } from '@pixi/react'
import { Circle, Container, Graphics } from 'pixi.js'
import './ThirdScreen.css'

extend({ Container, Graphics })

const DIRECTIONS = [
	{
		id: 'ai',
		label: 'AI Systems',
		orbitX: 0.24,
		orbitY: 0.15,
		rotation: 0.15,
		speed: 0.08,
		phase: 0,
		orbitColor: 0xff6b6b,
	},
	{
		id: 'web',
		label: 'Web Engineering',
		orbitX: 0.38,
		orbitY: 0.23,
		rotation: -0.32,
		speed: -0.09,
		phase: 1.2,
		orbitColor: 0xfeca57,
	},
	{
		id: 'mobile',
		label: 'Mobile Apps',
		orbitX: 0.54,
		orbitY: 0.31,
		rotation: 0.52,
		speed: 0.1,
		phase: 2.4,
		orbitColor: 0x48dbfb,
	},
	{
		id: 'data',
		label: 'Data Analytics',
		orbitX: 0.7,
		orbitY: 0.4,
		rotation: -0.18,
		speed: -0.07,
		phase: 3.1,
		orbitColor: 0x1dd1a1,
	},
	{
		id: 'design',
		label: 'Product Design',
		orbitX: 0.86,
		orbitY: 0.5,
		rotation: 0.3,
		speed: 0.09,
		phase: 4,
		orbitColor: 0x5f27cd,
	},
	{
		id: 'security',
		label: 'Cybersecurity',
		orbitX: 1,
		orbitY: 0.59,
		rotation: -0.46,
		speed: -0.06,
		phase: 4.9,
		orbitColor: 0xff9ff3,
	},
	{
		id: 'cloud',
		label: 'Cloud DevOps',
		orbitX: 1.14,
		orbitY: 0.67,
		rotation: 0.08,
		speed: 0.05,
		phase: 5.7,
		orbitColor: 0x54a0ff,
	},
]

const STAR_COUNT = 120
const ORBIT_PADDING = 48
const ORBIT_BOUNDS = DIRECTIONS.reduce(
	(bounds, item) => {
		const cos = Math.cos(item.rotation)
		const sin = Math.sin(item.rotation)
		const extentX = Math.sqrt((item.orbitX * cos) ** 2 + (item.orbitY * sin) ** 2)
		const extentY = Math.sqrt((item.orbitX * sin) ** 2 + (item.orbitY * cos) ** 2)

		return {
			maxX: Math.max(bounds.maxX, extentX),
			maxY: Math.max(bounds.maxY, extentY),
		}
	},
	{ maxX: 1, maxY: 1 }
)

function pointOnOrbit(rx, ry, rotation, angle) {
	const x = Math.cos(angle) * rx
	const y = Math.sin(angle) * ry
	const cos = Math.cos(rotation)
	const sin = Math.sin(rotation)

	return {
		x: x * cos - y * sin,
		y: x * sin + y * cos,
	}
}

function drawEllipsePath(graphics, rx, ry, rotation, color = 0xffffff, alpha = 0.65) {
	const segments = 96
	const start = pointOnOrbit(rx, ry, rotation, 0)
	graphics.moveTo(start.x, start.y)

	for (let i = 1; i <= segments; i += 1) {
		const t = (i / segments) * Math.PI * 2
		const point = pointOnOrbit(rx, ry, rotation, t)
		graphics.lineTo(point.x, point.y)
	}

	graphics.stroke({ color, width: 1.5, alpha })
}

function OrbitField({ width, height, activeId, onHover, onSelect }) {
	const { app } = useApplication()
	const nodesRef = useRef([])
	const anglesRef = useRef(DIRECTIONS.map((item) => item.phase))

	const stars = useMemo(
		() =>
			Array.from({ length: STAR_COUNT }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				r: 0.6 + Math.random() * 1.8,
				a: 0.2 + Math.random() * 0.55,
			})),
		[width, height]
	)

	const rays = useMemo(
		() =>
			Array.from({ length: 8 }, (_, index) => ({
				angle: (Math.PI / 4) * index,
				alpha: index % 2 === 0 ? 0.32 : 0.2,
			})),
		[]
	)

	const drawStars = useCallback(
		(graphics) => {
			graphics.clear()
			for (const star of stars) {
				graphics.circle(star.x, star.y, star.r).fill({ color: 0xffffff, alpha: star.a })
			}
		},
		[stars]
	)

	const drawOrbits = useCallback(
		(graphics) => {
			const screenWidth = app?.screen?.width ?? width
			const screenHeight = app?.screen?.height ?? height
			const centerX = screenWidth * 0.5
			const centerY = screenHeight * 0.5
			const fitByWidth = (screenWidth * 0.5 - ORBIT_PADDING) / ORBIT_BOUNDS.maxX
			const fitByHeight = (screenHeight * 0.5 - ORBIT_PADDING) / ORBIT_BOUNDS.maxY
			const dynamicRadius = Math.max(120, Math.min(fitByWidth, fitByHeight))

			graphics.clear()

			for (const item of DIRECTIONS) {
				drawEllipsePath(
					graphics,
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
		(graphics) => {
			const screenWidth = app?.screen?.width ?? width
			const screenHeight = app?.screen?.height ?? height
			const centerX = screenWidth * 0.5
			const centerY = screenHeight * 0.5

			graphics.clear()
			graphics.circle(centerX, centerY, 70).fill({ color: 0xffffff, alpha: 0.2 })
			graphics.circle(centerX, centerY, 38).fill({ color: 0xffffff, alpha: 0.36 })
			graphics.circle(centerX, centerY, 13).fill({ color: 0xffffff, alpha: 0.95 })
		},
		[app, height, width]
	)

	useTick((ticker) => {
		const elapsed = ticker.deltaMS / 1000
		const screenWidth = app?.screen?.width ?? width
		const screenHeight = app?.screen?.height ?? height
		const centerX = screenWidth * 0.5
		const centerY = screenHeight * 0.5
		const fitByWidth = (screenWidth * 0.5 - ORBIT_PADDING) / ORBIT_BOUNDS.maxX
		const fitByHeight = (screenHeight * 0.5 - ORBIT_PADDING) / ORBIT_BOUNDS.maxY
		const dynamicRadius = Math.max(120, Math.min(fitByWidth, fitByHeight))

		DIRECTIONS.forEach((item, index) => {
			anglesRef.current[index] += item.speed * elapsed
			const point = pointOnOrbit(
				dynamicRadius * item.orbitX,
				dynamicRadius * item.orbitY,
				item.rotation,
				anglesRef.current[index]
			)
			const node = nodesRef.current[index]

			if (node) {
				node.x = centerX + point.x
				node.y = centerY + point.y
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
				const glowRadius = isActive ? 42 : 34
				const nodeRadius = isActive ? 20 : 16
				const strokeWidth = isActive ? 2.2 : 1.5

				return (
					<pixiContainer
						key={item.id}
						ref={(node) => {
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
							draw={(graphics) => {
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
	const [sceneSize, setSceneSize] = useState({ width: 1200, height: 740 })
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
			setSceneSize((prev) => {
				if (prev.width === width && prev.height === height) {
					return prev
				}
				return { width, height }
			})
		}

		const observer = new ResizeObserver((entries) => {
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
	const activeDirection = DIRECTIONS.find((item) => item.id === activeId) ?? DIRECTIONS[0]
	const dpr =
		typeof window !== 'undefined'
			? Math.min(window.devicePixelRatio || 1, 2)
			: 1

	return (
		<section className="directions-page-third-screen">
			<div className="directions-page-third-screen__content">
				<div className="directions-page-third-screen__scene" ref={sceneHostRef}>
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

					<div className="directions-page-third-screen__overlay">
						<p>Направления</p>
						<h2>{activeDirection.label}</h2>
					</div>
				</div>
			</div>
		</section>
	)
}

export { ThirdScreen }
