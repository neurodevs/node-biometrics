import {
	SubplotGrapher,
	SubplotGrapherClass,
} from '@neurodevs/node-server-plots'
import { PpgPeakDetectorResults } from './types/nodeBiometrics.types'

export default class PpgPeakDetectionGrapher {
	public static GrapherClass: SubplotGrapherClass = SubplotGrapher

	public async run(savePath: string, signals: PpgPeakDetectorResults) {
		const grapher = new PpgPeakDetectionGrapher.GrapherClass({
			subplotHeight: 600,
			subplotWidth: 4000,
		})

		const plotConfigs = this.generatePlotConfigs(signals)

		await grapher.generate({
			savePath,
			plotConfigs: plotConfigs as any, // Incompatible types for data.x,
		})
	}

	private generatePlotConfigs(signals: PpgPeakDetectorResults) {
		const {
			rawDataset,
			filteredDataset,
			upperEnvelopeDataset,
			lowerEnvelopeDataset,
			thresholdedDataset,
		} = this.generateDatasets(signals)

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
			},
			{
				title: 'Peak Detection Overlay on Raw Data',
				datasets: [rawDataset],
			},
		]
	}

	private generateDatasets(signals: PpgPeakDetectorResults) {
		const {
			rawData,
			filteredData,
			upperEnvelope,
			lowerEnvelope,
			thresholdedData,
			timestamps,
		} = signals

		const rawDataFormatted = this.formatData(rawData, timestamps)
		const filteredDataFormatted = this.formatData(filteredData, timestamps)
		const upperEnvelopeFormatted = this.formatData(upperEnvelope, timestamps)
		const lowerEnvelopeFormatted = this.formatData(lowerEnvelope, timestamps)
		const thresholdedDataFormatted = this.formatData(
			thresholdedData,
			timestamps
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
				x: timestamps[i] ? timestamps[i].toString() : '',
				y: value,
			}
		})
	}
}
