'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function AddCheers() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(160)
  const [scale, setScale] = useState(0.35)
  const [offsetTheta, setOffsetTheta] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  const chadEyes = '/images/eyes.png'

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const context = canvas?.getContext('2d')
    if (context) {
      context.beginPath()
      if (image) {
        canvas.width = imgWidth
        canvas.height = imgHeight
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, image.width, image.height)
        const download = new Image()
        download.src = chadEyes

        download.onload = () => {
          context.translate(offsetX, offsetY)
          context.rotate(offsetTheta * Math.PI / 180)
          context.drawImage(download, offsetX, offsetY, download.width * scale, download.height * scale)
          context.closePath()
        }
      }
    }
  }, [image, offsetX, offsetY, scale, offsetTheta])

  return (
    <div className='flex flex-col gap-4 max-w-[500px] mx-auto'>
			<input type="file" accept="image/*" onChange={(event) => {
				const file = event.target.files?.[0]
				if (!file) return
				const reader = new FileReader()
				reader.onload = () => {
					const img = new Image()
					if (typeof reader.result === 'string') {
						img.src = reader.result
					}
					img.onload = () => {
						setOffsetX(0)
						setOffsetY(160)
						setScale(0.35)
						setOffsetTheta(0)
						setImgWidth(img.width)
						setImgHeight(img.height)
						setImage(img)
					}
				}
				reader.readAsDataURL(file)
			}} />
			<canvas id="canvas" width="800" height="800" style={{
				border: '1px solid #333',
				borderRadius: 10,
				width: '100%',
				height: 'auto',
				margin: '20px 0'
			}} />
			<div className='flex flex-col gap-2'>
				<label>
					Offset X
				</label>
				<input type="range" min={-(imgWidth * 1.5)} max={(imgWidth * 1.5)} value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} />
				<label>
					Offset Y
				</label>
				<input type="range" min={-(imgHeight * 1.5)} max={(imgHeight * 1.5)} value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} />
				<label>
					Scale
				</label>
				<input type="range" min={0.01} max={1} step={0.0001} value={scale} onChange={(e) => setScale(Number(e.target.value))} />
				<label>
					Rotate
				</label>
				<input type="range" min={-90} max={90} value={offsetTheta} onChange={(e) => setOffsetTheta(Number(e.target.value))} />
			</div>
			<div className='flex justify-center m-4'>
				<Button
					onClick={() => {
					const canvas = document.getElementById('canvas') as HTMLCanvasElement
					const dataURL = canvas.toDataURL('image/png')
					const a = document.createElement('a')
					a.href = dataURL
					a.download = `cheerschad-${Date.now()}.png`
					a.click()
				}}>
					Download Image
				</Button>
			</div>
    </div>
  )
}