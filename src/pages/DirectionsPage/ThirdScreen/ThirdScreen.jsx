import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Application, extend, useTick } from '@pixi/react'
import { Circle, Container, Graphics } from 'pixi.js'
import './ThirdScreen.css'

extend({ Container, Graphics })

const DIRECTIONS = [
	{
		id: 'ai',
		label: 'AI Systems',
		orbitX: 0.28,
		orbitY: 0.17,
		rotation: 0.15,
		speed: 0.08,
		phase: 0,
		orbitColor: 0xff6b6b,
	},
	{
		id: 'web',
		label: 'Web Engineering',
		orbitX: 0.44,
		orbitY: 0.26,
		rotation: -0.32,
		speed: -0.09,
		phase: 1.2,
		orbitColor: 0xfeca57,
	},
	{
		id: 'mobile',
		label: 'Mobile Apps',
		orbitX: 0.62,
		orbitY: 0.36,
		rotation: 0.52,
		speed: 0.1,
		phase: 2.4,
		orbitColor: 0x48dbfb,
	},
	{
		id: 'data',
		label: 'Data Analytics',
		orbitX: 0.82,
		orbitY: 0.46,
		rotation: -0.18,
		speed: -0.07,
		phase: 3.1,
		orbitColor: 0x1dd1a1,
	},
	{
		id: 'design',
		label: 'Product Design',
		orbitX: 1.02,
		orbitY: 0.57,
		rotation: 0.3,
		speed: 0.09,
		phase: 4,
		orbitColor: 0x5f27cd,
	},
	{
		id: 'security',
		label: 'Cybersecurity',
		orbitX: 1.22,
		orbitY: 0.68,
		rotation: -0.46,
		speed: -0.06,
		phase: 4.9,
		orbitColor: 0xff9ff3,
	},
	{
		id: 'cloud',
		label: 'Cloud DevOps',
		orbitX: 1.4,
		orbitY: 0.78,
		rotation: 0.08,
		speed: 0.05,
		phase: 5.7,
		orbitColor: 0x54a0ff,
	},
]

const STAR_COUNT = 120

function pointOnOrbit(center, rx, ry, rotation, angle) {
	const x = Math.cos(angle) * rx
	const y = Math.sin(angle) * ry
	const cos = Math.cos(rotation)
	const sin = Math.sin(rotation)

	return {
		x: center.x + x * cos - y * sin,
		y: center.y + x * sin + y * cos,
	}
}

function drawEllipsePath(graphics, center, rx, ry, rotation, color = 0xffffff, alpha = 0.65) {
	const segments = 96
	const start = pointOnOrbit(center, rx, ry, rotation, 0)
	graphics.moveTo(start.x, start.y)

	for (let i = 1; i <= segments; i += 1) {
		const t = (i / segments) * Math.PI * 2
		const point = pointOnOrbit(center, rx, ry, rotation, t)
		graphics.lineTo(point.x, point.y)
	}

	graphics.stroke({ color, width: 1.5, alpha })
}

function OrbitField({ width, height, activeId, onHover, onSelect }) {
	const nodesRef = useRef([])
	const anglesRef = useRef(DIRECTIONS.map((item) => item.phase))

	const center = useMemo(
		() => ({
			x: width * 0.5,
			y: height * 0.5,
		}),
		[width, height]
	)

	const maxRadius = useMemo(() => Math.min(width, height) * 0.52, [width, height])
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
			graphics.clear()

			for (const item of DIRECTIONS) {
				drawEllipsePath(
					graphics,
					center,
					maxRadius * item.orbitX,
					maxRadius * item.orbitY,
					item.rotation,
					item.orbitColor,
					0.52
				)
			}

			graphics.moveTo(center.x, center.y - maxRadius * 0.95)
			graphics.lineTo(center.x, center.y + maxRadius * 0.95)
			graphics.stroke({ color: 0xffffff, width: 1.2, alpha: 0.26 })

			graphics.moveTo(center.x - maxRadius * 0.95, center.y)
			graphics.lineTo(center.x + maxRadius * 0.95, center.y)
			graphics.stroke({ color: 0xffffff, width: 1.2, alpha: 0.22 })

			for (const ray of rays) {
				graphics.moveTo(center.x, center.y)
				graphics.lineTo(
					center.x + Math.cos(ray.angle) * maxRadius * 0.76,
					center.y + Math.sin(ray.angle) * maxRadius * 0.76
				)
				graphics.stroke({ color: 0xffffff, width: 0.9, alpha: ray.alpha })
			}
		},
		[center, maxRadius, rays]
	)

	const drawCore = useCallback(
		(graphics) => {
			graphics.clear()
			graphics.circle(center.x, center.y, 70).fill({ color: 0xffffff, alpha: 0.2 })
			graphics.circle(center.x, center.y, 38).fill({ color: 0xffffff, alpha: 0.36 })
			graphics.circle(center.x, center.y, 13).fill({ color: 0xffffff, alpha: 0.95 })
		},
		[center.x, center.y]
	)

	useTick((ticker) => {
		const elapsed = ticker.deltaMS / 1000

		DIRECTIONS.forEach((item, index) => {
			anglesRef.current[index] += item.speed * elapsed
			const point = pointOnOrbit(
				center,
				maxRadius * item.orbitX,
				maxRadius * item.orbitY,
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

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0]
			if (!entry) {
				return
			}

			const width = Math.max(320, Math.floor(entry.contentRect.width))
			const height = Math.max(420, Math.floor(width * 0.62))
			setSceneSize({ width, height })
		})

		observer.observe(sceneHostRef.current)
		return () => observer.disconnect()
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
