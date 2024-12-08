'use client'

import { useEffect, useState } from 'react';
import {
    LineChart,
    ResponsiveContainer, 
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Line,
    Dot
} from 'recharts';
import { Card } from '@/app/components/card';
import { Slider } from '@/app/components/slider'
import { Button } from '../button';

function linspace(start: number, stop: number, num: number, endpoint: boolean = true): number[] {
  if (num <= 0) {
    return [];
  }
  
  const step = endpoint ? (stop - start) / (num - 1) : (stop - start) / num;
  return Array.from({ length: num }, (_, i) => start + i * step);
}

function calculateLikelihoods(thetas: number[], numHeads: number, numTails: number): number[] {
    const likelihoods: number[] = []
    for (const theta of thetas) {
        const likelihood = Math.pow(theta, numHeads) * Math.pow(1 - theta, numTails)
        likelihoods.push(likelihood)
    }

    return likelihoods
}

function calculateLogLikelihoods(thetas: number[], numHeads: number, numTails: number): number[] {
    const logLikelihoods: number[] = []
    for (const theta of thetas) {
        const logLikelihood = numHeads * Math.log(theta) + numTails * Math.log(1 - theta)
        logLikelihoods.push(logLikelihood)
    }
    return logLikelihoods
}

const getData = (numHeads: number=4, numTails: number=1, numThetas:number=200): DataPoint[] => {
    const data: DataPoint[] = []
    if(numHeads + numTails === 0) return data;

    //Can't be 0 or 1 because the log(0) is undefined. 
    const thetaVals = linspace(.01, .99, numThetas);
    const likelihoods = calculateLikelihoods(thetaVals, numHeads, numTails)
    const logLikelihoods = calculateLogLikelihoods(thetaVals, numHeads, numTails)
    for(let i =0; i < thetaVals.length; i++) {
        data.push({ x: thetaVals[i], likelihood: likelihoods[i], logLikelihood: logLikelihoods[i] })
    }
    return data
}



interface DataPoint {
    x: number;
    likelihood: number;
    logLikelihood: number;
}


export default function CoinFlip() {

    const [numHeads, setNumHeads] = useState<number>(0)
    const [numTails, setNumTails] = useState<number>(0)
    const [thetaStar, setThetaStar] = useState<number>(.5)
    const [data, setData] = useState<DataPoint[]>(getData(numHeads, numTails))
    const [maxIndex, setMaxIndex] = useState<number>(-1)
    const [thetaHat, setThetaHat] = useState<number>()


    useEffect(() => {
        setData(getData(numHeads, numTails))
        setThetaHat(() => {
            if(numHeads + numTails === 0) return -1
            return numHeads / (numHeads + numTails)
        })
    }, [numHeads, numTails])


    useEffect(() => {
        setMaxIndex(() => {
            let mi = -1
             let max = -Infinity

            for(let i = 0; i < data.length; i++) {
                if(data[i].logLikelihood > max) {
                    max = data[i].logLikelihood
                    mi = i
                }
            }

            return mi;

        })
    }, [data])


    function flipCoin() {
        if (Math.random() < thetaStar) {
            setNumHeads(numHeads + 1)
        } else {
            setNumTails(numTails + 1)
        }
    }

    const CustomDot = (props: any) => {
        const { cx, cy, index } = props; // Use `index` to determine the specific dot
        if (index === maxIndex) {
            return <Dot cx={cx} cy={cy} r={6} fill='none' stroke='black' strokeWidth={2} />; // Customize the dot appearance here
        }
        return null; // Hide all other dots
    };


    return (
        <Card className="p-6 space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">True Parameter</label>
                    <Slider
                        value={[thetaStar]}
                        onValueChange={(value) => {
                                setThetaStar(value[0])
                                setNumHeads(0)
                                setNumTails(0)
                                setData([])
                            }}
                        min={0.01}
                        max={.99}
                        step={0.01}
                    />
                    <p className="text-sm text-gray-500">Current value: {thetaStar.toFixed(2)}</p>
                    <p className="text-sm font-medium text-center">Estimated Parameter: {thetaHat != null && thetaHat >= 0 ? thetaHat.toFixed(2) : ''}</p>

                </div>
            </div>

            <div className='w-full flex flex-row content-between items-center justify-between'>
                <Button 
                    //This is how events are handled. Functions aren't executed directly. Instead the functions are passed in and will be called when the event occurs.
                    onClick={flipCoin}
                    className="w-28"
                >
                    Flip Coin
                </Button>
                <p className="text-sm text-gray-500 w-fit">Number of heads: {numHeads}</p>
                <p className="text-sm text-gray-500 w-fit">Number of tails: {numTails}</p>
            </div>



            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={730} height={250} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="x"
                            type="number"
                            name="value"
                            domain={[0, 1]} />
                        <YAxis />
                        <Legend />
                        <Line type="monotone" dataKey="likelihood" stroke="#8884d8" dot={<CustomDot />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={730} height={250} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="x"
                            type="number"
                            name="value"
                            domain={[0, 1]} />
                        <YAxis />
                        <Legend />
                        <Line type="monotone" dataKey="logLikelihood" name="log-likelihood" stroke="#82ca9d" dot={<CustomDot />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>

    )
}