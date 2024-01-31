import {
	Grapher,
	SubplotGrapher,
	SubplotGrapherOptions,
} from '@neurodevs/node-server-plots'
import { PpgPeakDetectorResults } from './types/nodeBiometrics.types'

export default class PpgPeakDetectionGrapher {
	public static GrapherClass: SubplotGrapherClass = SubplotGrapher

	public async run(savePath: string, signals: PpgPeakDetectorResults) {
		const grapher = new PpgPeakDetectionGrapher.GrapherClass({
			subplotHeight: 300,
			subplotWidth: 800,
		})

		await grapher.generate({
			savePath,
			plotConfigs: this.generatePlotConfigs(signals),
		})
	}

	private generatePlotConfigs(signals: PpgPeakDetectorResults) {
		return [
			{
				title: 'Raw PPG Data',
				datasets: [{ label: 'Raw PPG Data', data: signals.rawData }],
			},
			{
				title: 'Filtered PPG Data (0.4-4 Hz Bandpass)',
				datasets: [{ label: 'Filtered PPG Data', data: signals.filteredData }],
			},
			{
				title: 'Upper Envelope (Hilbert)',
				datasets: [
					{ label: 'Filtered PPG Data', data: signals.filteredData },
					{ label: 'Upper Envelope', data: signals.upperEnvelope },
				],
			},
			{
				title: 'Lower Envelope (Hilbert)',
				datasets: [
					{ label: 'Filtered PPG Data', data: signals.filteredData },
					{ label: 'Upper Envelope', data: signals.upperEnvelope },
					{ label: 'Lower Envelope', data: signals.lowerEnvelope },
				],
			},
			{
				title: 'Thresholded PPG Data by Lower Envelope',
				datasets: [
					{ label: 'Thresholded PPG Data', data: signals.thresholdedData },
					{ label: 'Lower Envelope', data: signals.lowerEnvelope },
				],
			},
			{
				title: 'Peak Detection',
				datasets: [
					{ label: 'Thresholded PPG Data', data: signals.thresholdedData },
					{ label: 'Lower Envelope', data: signals.lowerEnvelope },
				],
			},
			{
				title: 'Peak Detection Overlay on Raw Data',
				datasets: [
					{ label: 'Raw PPG Data', data: signals.rawData },
					{ label: 'Lower Envelope', data: signals.lowerEnvelope },
				],
			},
		]
	}
}

type SubplotGrapherClass = new (options: SubplotGrapherOptions) => Grapher
