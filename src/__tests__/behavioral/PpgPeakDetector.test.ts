import { randomInt } from 'crypto'
import AbstractSpruceTest, {
	test,
	assert,
	errorAssert,
} from '@sprucelabs/test-utils'
import { SpyFirBandpassFilter } from '@neurodevs/node-signal-processing'
import PpgPeakDetector from '../../PpgPeakDetector'
import SpyPpgPeakDetector from '../../testDoubles/SpyPpgPeakDetector'
import { PpgPeakDetectorOptions } from '../../types/nodeBiometrics.types'

export default class PpgPeakDetectorTest extends AbstractSpruceTest {
	private static randomDetector: SpyPpgPeakDetector
	private static randomOptions: PpgPeakDetectorOptions
	private static rawData: number[]
	private static timestamps: number[]

	protected static async beforeEach() {
		PpgPeakDetector.FilterClass = SpyFirBandpassFilter
		SpyFirBandpassFilter.clear()

		this.randomOptions = this.generateRandomOptions()
		this.randomDetector = new SpyPpgPeakDetector(this.randomOptions)

		this.rawData = [1, 2, 3, 4]
		this.timestamps = [4, 5, 6, 7]
	}

	@test()
	protected static async throwsWithMissingRequiredOptions() {
		// @ts-ignore
		const err = assert.doesThrow(() => new PpgPeakDetector())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['sampleRate'],
		})
	}

	@test()
	protected static async numTapsEqualsSampleRateTimesFourPlusOne() {
		const detector1 = new SpyPpgPeakDetector({ sampleRate: 100 })
		assert.isEqual(detector1.getNumTaps(), 401)
		const detector2 = new SpyPpgPeakDetector({ sampleRate: 100.5 })
		assert.isEqual(detector2.getNumTaps(), 401)
	}

	@test()
	protected static async runCallsDependenciesAsExpected() {
		this.run()
		assert.isEqual(SpyFirBandpassFilter.runHitCount, 1)
	}

	@test()
	protected static async runReturnsRawData() {
		const result = this.run()
		assert.isEqualDeep(result.rawData, this.rawData)
	}

	private static run() {
		return this.randomDetector.run(this.rawData, this.timestamps)
	}

	private static generateRandomOptions() {
		const lowCutoffHz = Math.random()
		const highCutoffHz = randomInt(2, 10) * lowCutoffHz

		let numTaps = randomInt(51, 101)
		if (numTaps % 2 === 0) {
			// numTaps must be odd
			numTaps++
		}

		return {
			sampleRate: 100 * Math.random(),
			lowCutoffHz,
			highCutoffHz,
			numTaps,
			attenuation: 100 * Math.random(),
		}
	}
}
