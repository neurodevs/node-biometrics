import {
	Grapher,
	SubplotGrapher,
	SubplotGrapherClass,
} from '@neurodevs/node-server-plots'
import { PpgPeakDetectorResults } from './types/nodeBiometrics.types'

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
				title: 'Raw PPG Data',
				datasets: [rawDataset],
			},
			{
				title: 'Filtered PPG Data (0.4-4 Hz Bandpass)',
				datasets: [filteredDataset],
			},
			{
				title: 'Upper Envelope (Hilbert)',
				datasets: [filteredDataset, upperEnvelopeDataset],
			},
			{
				title: 'Lower Envelope (Hilbert)',
				datasets: [filteredDataset, upperEnvelopeDataset, lowerEnvelopeDataset],
			},
			{
				title: 'Thresholded PPG Data by Lower Envelope',
				datasets: [thresholdedDataset, lowerEnvelopeDataset],
			},
			{
				title: 'Peak Detection',
				datasets: [thresholdedDataset],
				verticalLines: peakTimestamps,
			},
			{
				title: 'Peak Detection Overlay on Raw Data',
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
			rawData,
			filteredData,
			upperEnvelope,
			lowerEnvelope,
			thresholdedData,
		} = signals

		const rawDataFormatted = this.formatData(rawData, normalizedTimestamps)
		const filteredDataFormatted = this.formatData(
			filteredData,
			normalizedTimestamps
		)
		const upperEnvelopeFormatted = this.formatData(
			upperEnvelope,
			normalizedTimestamps
		)
		const lowerEnvelopeFormatted = this.formatData(
			lowerEnvelope,
			normalizedTimestamps
		)
		const thresholdedDataFormatted = this.formatData(
			thresholdedData,
			normalizedTimestamps
		)

		return {
			rawDataset: {
				label: 'Raw PPG Data',
				data: rawDataFormatted,
				color: 'cornflowerblue',
			},
			filteredDataset: {
				label: 'Filtered PPG Data',
				data: filteredDataFormatted,
				color: 'cornflowerblue',
			},
			upperEnvelopeDataset: {
				label: 'Upper Envelope',
				data: upperEnvelopeFormatted,
				color: 'forestgreen',
			},
			lowerEnvelopeDataset: {
				label: 'Lower Envelope',
				data: lowerEnvelopeFormatted,
				color: 'goldenrod',
			},
			thresholdedDataset: {
				label: 'Thresholded PPG Data',
				data: thresholdedDataFormatted,
				color: 'salmon',
			},
		}
	}

	private formatData(data: number[], timestamps: number[]) {
		return data.map((value, i) => {
			return {
				x: timestamps[i]?.toString() ?? '',
				y: value,
			}
		})
	}
}
