'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { DataPoint } from '@/types'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'


const calculateDensity = (x: number, mu: number, sigma: number): number => {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * 
         Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2))
}

const generateSampleData = (
  sampleSize: number,
  mean: number,
  standardDev: number
): DataPoint[] => {
  return Array.from({ length: sampleSize }, () => {
    const u1 = Math.random()
    const u2 = Math.random()
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    return { x: z * standardDev + mean }
  })
}

const generateDensityCurve = (
  mean: number,
  standardDev: number,
  points: number = 100
): DataPoint[] => {
  const xMin = mean - 4 * standardDev
  const xMax = mean + 4 * standardDev
  const step = (xMax - xMin) / points

  return Array.from({ length: points + 1 }, (_, i) => {
    const x = xMin + step * i
    return {
      x,
      density: calculateDensity(x, mean, standardDev)
    }
  })
}

const calculateLogLikelihood = (
  data: DataPoint[],
  mean: number,
  standardDev: number
): number => {
  return data.reduce((sum, point) => {
    return sum + Math.log(calculateDensity(point.x, mean, standardDev))
  }, 0)
}

export interface MLEVisualizationProps {
  initialMean?: number
  initialStandardDev?: number
  sampleSize?: number
}


export default function MLEVisualization({
  initialMean = 0,
  initialStandardDev = 1,
  sampleSize = 100
}: MLEVisualizationProps) {
  const [mean, setMean] = useState(initialMean)
  const [standardDev, setStandardDev] = useState(initialStandardDev)
  const [densityCurve, setDensityCurve] = useState<DataPoint[]>([])
  const [sampleData, setSampleData] = useState<DataPoint[]>([])
  const [logLikelihood, setLogLikelihood] = useState<number>(0)

  useEffect(() => {
    setDensityCurve(generateDensityCurve(mean, standardDev))
    setLogLikelihood(calculateLogLikelihood(sampleData, mean, standardDev))
  }, [mean, standardDev, sampleData])

  useEffect(() => {
    setSampleData(generateSampleData(sampleSize, mean, standardDev))
  }, [sampleSize])

  const handleNewSample = () => {
    setSampleData(generateSampleData(sampleSize, mean, standardDev))
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Maximum Likelihood Estimation</h2>
        <p className="text-gray-600">
          Adjust the parameters to see how they affect the fit to the sample data.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Mean (μ)</label>
          <Slider
            value={[mean]}
            onValueChange={(value) => setMean(value[0])}
            min={-5}
            max={5}
            step={0.1}
          />
          <p className="text-sm text-gray-500">Current value: {mean.toFixed(2)}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Standard Deviation (σ)</label>
          <Slider
            value={[standardDev]}
            onValueChange={(value) => setStandardDev(value[0])}
            min={0.1}
            max={5}
            step={0.1}
          />
          <p className="text-sm text-gray-500">Current value: {standardDev.toFixed(2)}</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="value" 
                domain={['auto', 'auto']} 
              />
              <YAxis 
                type="number" 
                dataKey="density" 
                name="density"
                domain={[0, 'auto']} 
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter 
                name="Density Curve" 
                data={densityCurve} 
                line={{ stroke: '#8884d8', type: 'monotone' } as any} 
                fill="#8884d8" 
              />
              <Scatter 
                name="Sample Data" 
                data={sampleData.map(point => ({ ...point, density: 0 }))} 
                fill="#82ca9d"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Log Likelihood: {logLikelihood.toFixed(2)}</p>
          <Button 
            onClick={handleNewSample}
            className="w-full"
          >
            Generate New Sample
          </Button>
        </div>
      </div>
    </Card>
  )
}