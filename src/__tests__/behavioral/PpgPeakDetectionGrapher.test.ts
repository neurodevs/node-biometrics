import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import {
	FakeChartJSNodeCanvas,
	SubplotGrapher,
	fakeSharp,
} from '@neurodevs/node-server-plots'
import PpgPeakDetectionGrapher from '../../PpgPeakDetectionGrapher'
import { PpgPeakDetectorResults } from '../../types/nodeBiometrics.types'

export default class PpgPeakDetectionGrapherTest extends AbstractSpruceTest {
	private static grapher: PpgPeakDetectionGrapher
	private static signals: PpgPeakDetectorResults
	private static dataLength: number

	protected static async beforeEach() {
		await super.beforeEach()

		SubplotGrapher.CanvasClass = FakeChartJSNodeCanvas
		SubplotGrapher.sharp = fakeSharp

		this.dataLength = 4

		this.signals = {
			rawData: this.generateRandomArray(this.dataLength),
			filteredData: this.generateRandomArray(this.dataLength),
			timestamps: this.generateRandomArray(this.dataLength),
			upperAnalyticSignal: this.generateRandomArray(this.dataLength),
			upperEnvelope: this.generateRandomArray(this.dataLength),
			lowerAnalyticSignal: this.generateRandomArray(this.dataLength),
			lowerEnvelope: this.generateRandomArray(this.dataLength),
			thresholdedData: this.generateRandomArray(this.dataLength),
			segmentedData: [],
			peaks: [],
		} as PpgPeakDetectorResults

		this.grapher = this.Grapher()
		assert.isTruthy(this.grapher)
	}

	@test()
	protected static async extendsSubplotGrapher() {
		assert.isInstanceOf(this.grapher, SubplotGrapher)
	}

	@test()
	protected static async generatesExpectedPlotConfigs() {}

	private static Grapher() {
		return new PpgPeakDetectionGrapher({
			subplotHeight: 300,
			subplotWidth: 800,
		})
	}

	@test()
	protected static async createsExpectedPlotConfigs() {
		assert.isTruthy(this.plotConfigs)
	}

	private static generateRandomArray(length: number) {
		return Array.from({ length }, () => Math.random())
	}

	private static get plotConfigs() {
		return [
			{
				title: 'Raw PPG Data',
				datasets: [{ label: 'Raw PPG Data', data: this.signals.rawData }],
			},
			{
				title: 'Filtered PPG Data (0.4-4 Hz Bandpass)',
				datasets: [
					{ label: 'Filtered PPG Data', data: this.signals.filteredData },
				],
			},
			{
				title: 'Upper Envelope (Hilbert)',
				datasets: [
					{ label: 'Filtered PPG Data', data: this.signals.filteredData },
					{ label: 'Upper Envelope', data: this.signals.upperEnvelope },
				],
			},
			{
				title: 'Lower Envelope (Hilbert)',
				datasets: [
					{ label: 'Filtered PPG Data', data: this.signals.filteredData },
					{ label: 'Upper Envelope', data: this.signals.upperEnvelope },
					{ label: 'Lower Envelope', data: this.signals.lowerEnvelope },
				],
			},
			{
				title: 'Thresholded PPG Data by Lower Envelope',
				datasets: [
					{ label: 'Thresholded PPG Data', data: this.signals.thresholdedData },
					{ label: 'Lower Envelope', data: this.signals.lowerEnvelope },
				],
			},
			{
				title: 'Peak Detection',
				datasets: [
					{ label: 'Thresholded PPG Data', data: this.signals.thresholdedData },
					{ label: 'Lower Envelope', data: this.signals.lowerEnvelope },
				],
			},
			{
				title: 'Peak Detection Overlay on Raw Data',
				datasets: [
					{ label: 'Raw PPG Data', data: this.signals.rawData },
					{ label: 'Lower Envelope', data: this.signals.lowerEnvelope },
				],
			},
		]
	}
}
