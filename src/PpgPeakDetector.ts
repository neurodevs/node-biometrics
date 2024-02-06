import { assertOptions } from '@sprucelabs/schema'
import {
	HilbertPeakDetector,
	FirBandpassFilter,
	FirBandpassFilterClass,
	HilbertPeakDetectorClass,
	PeakDetector,
	Filter,
} from '@neurodevs/node-signal-processing'
import { PpgPeakDetectorOptions } from './types/nodeBiometrics.types'

export default class PpgPeakDetector {
	protected sampleRate: number
	protected lowCutoffHz: number
	protected highCutoffHz: number
	protected numTaps: number
	protected attenuation: number

	public static FilterClass: FirBandpassFilterClass = FirBandpassFilter
	private filter: Filter

	public static DetectorClass: HilbertPeakDetectorClass = HilbertPeakDetector
	private detector: PeakDetector

	public constructor(options: PpgPeakDetectorOptions) {
		let {
			sampleRate,
			lowCutoffHz = 0.4,
			highCutoffHz = 4.0,
			numTaps = null,
			attenuation = 50,
		} = assertOptions(options, ['sampleRate'])

		if (!numTaps) {
			numTaps = 4 * Math.floor(sampleRate) + 1
		}

		this.sampleRate = sampleRate
		this.lowCutoffHz = lowCutoffHz
		this.highCutoffHz = highCutoffHz
		this.numTaps = numTaps
		this.attenuation = attenuation

		this.filter = new PpgPeakDetector.FilterClass({
			sampleRate,
			lowCutoffHz,
			highCutoffHz,
			numTaps,
			attenuation,
		})

		this.detector = new PpgPeakDetector.DetectorClass()
	}

	public run(rawData: number[], timestamps: number[]) {
		const rawDataWithoutFirstSample = rawData.slice(1)
		const timestampsWithoutFirstSample = timestamps.slice(1)

		const filtered = this.filter.run(rawDataWithoutFirstSample)
		const result = this.detector.run(filtered, timestampsWithoutFirstSample)
		return {
			...result,
			rawData: rawDataWithoutFirstSample,
		}
	}
}
