import { PeakDetectorResults } from '@neurodevs/node-signal-processing'
import PpgPeakDetector from '../PpgPeakDetector'

export type PpgPeakDetectorClass = new (
	options: PpgPeakDetectorOptions
) => PpgPeakDetector

export interface PpgPeakDetectorOptions {
	sampleRate: number
	lowCutoffHz?: number
	highCutoffHz?: number
	numTaps?: number
	attenuation?: number
}

export interface PpgPeakDetectorResults extends PeakDetectorResults {
	rawData: number[]
}

export interface PpgAnalyzer {
	run(data: number[], timestamps: number[]): PpgAnalyzerResults
}

export interface PpgAnalyzerOptions {
	sampleRate: number
	ignoreRrIntervalThreshold?: number
}

export type PpgAnalyzerClass = new (options: PpgAnalyzerOptions) => PpgAnalyzer

export interface PpgAnalyzerResults {
	signals: PeakDetectorResults
	metrics: PpgMetrics
}

export interface PpgMetrics {
	rrIntervals: number[]
	hrvMean: number
	hrvPercentChange: number
	hrMean: number
	hrPercentChange: number
}

export interface CalculateHrvOptions {
	ignoreRrIntervalThreshold: number
}
