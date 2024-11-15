import {
    Grapher,
    SubplotGrapher,
    SubplotGrapherClass,
} from '@neurodevs/node-server-plots'
import { PpgPeakDetectorResults } from '../types'

export default class PpgPeakDetectionGrapher {
    public static GrapherClass: SubplotGrapherClass = SubplotGrapher
    private grapher: Grapher

    private static subplotHeight = 600
    private static subplotWidth = 4000

    public constructor() {
        this.grapher = PpgPeakDetectionGrapher.Grapher()
    }

    public async run(savePath: string, signals: PpgPeakDetectorResults) {
        const plotConfigs = this.generatePlotConfigs(signals)

        await this.grapher.generate({
            savePath,
            plotConfigs: plotConfigs as any,
        })
    }

    private static Grapher() {
        return new PpgPeakDetectionGrapher.GrapherClass({
            subplotHeight: PpgPeakDetectionGrapher.subplotHeight,
            subplotWidth: PpgPeakDetectionGrapher.subplotWidth,
        })
    }

    private generatePlotConfigs(signals: PpgPeakDetectorResults) {
        const { timestamps: timestampsInMs } = signals
        const minTimestampMs = Math.min(...timestampsInMs)

        const normalizedTimestamps = this.normalizeTimestamps(
            timestampsInMs,
            minTimestampMs
        )

        const peakTimestamps = signals.peaks.map((peak) =>
            ((peak.timestamp - minTimestampMs) / 1000)?.toString()
        )

        const {
            rawDataset,
            filteredDataset,
            upperEnvelopeDataset,
            lowerEnvelopeDataset,
            thresholdedDataset,
        } = this.generateDatasets(signals, normalizedTimestamps)

        return [
            {
                title: 'Raw PPG Signal',
                datasets: [rawDataset],
            },
            {
                title: 'Filtered PPG Signal (0.4-4 Hz Bandpass)',
                datasets: [filteredDataset],
            },
            {
                title: 'Upper Envelope (Hilbert)',
                datasets: [filteredDataset, upperEnvelopeDataset],
            },
            {
                title: 'Lower Envelope (Hilbert)',
                datasets: [
                    filteredDataset,
                    upperEnvelopeDataset,
                    lowerEnvelopeDataset,
                ],
            },
            {
                title: 'Thresholded PPG Signal by Lower Envelope',
                datasets: [thresholdedDataset, lowerEnvelopeDataset],
            },
            {
                title: 'Peak Detection on Thresholded Signal',
                datasets: [thresholdedDataset],
                verticalLines: peakTimestamps,
            },
            {
                title: 'Peak Detection on Raw Signal',
                datasets: [rawDataset],
                verticalLines: peakTimestamps,
            },
        ]
    }

    private normalizeTimestamps(
        timestampsInMs: number[],
        minTimestampMs: number
    ) {
        const msPerSecond = 1000

        const normalizedTimestampsInSecs = timestampsInMs.map(
            (timestampMs) => (timestampMs - minTimestampMs) / msPerSecond
        )
        return normalizedTimestampsInSecs
    }

    private generateDatasets(
        signals: PpgPeakDetectorResults,
        normalizedTimestamps: number[]
    ) {
        const {
            rawSignal,
            filteredSignal,
            upperEnvelope,
            lowerEnvelope,
            thresholdedSignal,
        } = signals

        const formattedRawSignal = this.formatSignal(
            rawSignal,
            normalizedTimestamps
        )
        const formattedFilteredSignal = this.formatSignal(
            filteredSignal,
            normalizedTimestamps
        )
        const formattedUpperEnvelope = this.formatSignal(
            upperEnvelope,
            normalizedTimestamps
        )
        const formattedLowerEnvelope = this.formatSignal(
            lowerEnvelope,
            normalizedTimestamps
        )
        const formattedThresholdedSignal = this.formatSignal(
            thresholdedSignal,
            normalizedTimestamps
        )

        return {
            rawDataset: {
                label: 'Raw PPG Signal',
                data: formattedRawSignal,
                color: 'cornflowerblue',
            },
            filteredDataset: {
                label: 'Filtered PPG Signal',
                data: formattedFilteredSignal,
                color: 'cornflowerblue',
            },
            upperEnvelopeDataset: {
                label: 'Upper Envelope',
                data: formattedUpperEnvelope,
                color: 'forestgreen',
            },
            lowerEnvelopeDataset: {
                label: 'Lower Envelope',
                data: formattedLowerEnvelope,
                color: 'goldenrod',
            },
            thresholdedDataset: {
                label: 'Thresholded PPG Signal',
                data: formattedThresholdedSignal,
                color: 'salmon',
            },
        }
    }

    private formatSignal(signal: number[], timestamps: number[]) {
        return signal.map((value, i) => {
            return {
                x: timestamps[i]?.toString() ?? '',
                y: value,
            }
        })
    }
}
