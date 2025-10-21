import { PeakDetectorResults } from '@neurodevs/node-signal-processing'
import PpgPeakDetector from './impl/PpgPeakDetector'

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
    rawSignal: number[]
}

export interface PpgAnalyzer {
    run(signal: number[], timestamps: number[]): PpgAnalyzerResults
}

export interface PpgAnalyzerOptions {
    sampleRate: number
    ignoreRrIntervalThresholdPercent?: number
}

export type PpgAnalyzerClass = new (options: PpgAnalyzerOptions) => PpgAnalyzer

export interface PpgAnalyzerResults {
    signals: PpgPeakDetectorResults
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
    ignoreRrIntervalThresholdPercent: number
}

export type CsvRow = Record<string, string>
